#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

class SecurityScannerMCP {
  constructor() {
    this.vulnerabilityPatterns = {
      sql_injection: [
        /Statement.*executeQuery.*\+/g,
        /String.*sql.*\+.*\"/g,
        /\".*SELECT.*\".*\+/g
      ],
      xss_vulnerability: [
        /innerHTML.*=.*[^sanitize]/g,
        /document\.write.*\(/g,
        /eval\s*\(/g
      ],
      hardcoded_secrets: [
        /password\s*=\s*['\"][^'\"]+['\"]/gi,
        /api[_-]?key\s*=\s*['\"][^'\"]+['\"]/gi,
        /secret\s*=\s*['\"][^'\"]+['\"]/gi,
        /token\s*=\s*['\"][^'\"]+['\"]/gi
      ],
      jwt_issues: [
        /jwt\.sign\([^,]*,\s*null/g,
        /jwt\.verify\([^,]*,\s*null/g,
        /Algorithm\.NONE/g
      ],
      cors_issues: [
        /allowedOrigins.*\*\*\*/g,
        /Access-Control-Allow-Origin.*\*/g
      ]
    };

    this.securePatterns = {
      prepared_statements: /PreparedStatement/g,
      password_hashing: /BCrypt\.hashpw/g,
      input_sanitization: /HtmlSanitizer|sanitize/g,
      jwt_proper: /jwt\.sign\([^,]*,\s*[^null]/g
    };
  }

  async scanFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const vulnerabilities = [];
      const securityFeatures = [];

      // Check for vulnerabilities
      for (const [category, patterns] of Object.entries(this.vulnerabilityPatterns)) {
        for (const pattern of patterns) {
          const matches = [...content.matchAll(pattern)];
          if (matches.length > 0) {
            vulnerabilities.push({
              category,
              pattern: pattern.source,
              matches: matches.length,
              lines: this.getLineNumbers(content, matches)
            });
          }
        }
      }

      // Check for security features
      for (const [feature, pattern] of Object.entries(this.securePatterns)) {
        const matches = [...content.matchAll(pattern)];
        if (matches.length > 0) {
          securityFeatures.push({
            feature,
            matches: matches.length,
            lines: this.getLineNumbers(content, matches)
          });
        }
      }

      return {
        success: true,
        file: filePath,
        vulnerabilities,
        securityFeatures,
        riskLevel: this.calculateRiskLevel(vulnerabilities, securityFeatures)
      };

    } catch (error) {
      return {
        success: false,
        error: error.message,
        file: filePath
      };
    }
  }

  getLineNumbers(content, matches) {
    const lines = content.split('\n');
    return matches.map(match => {
      const beforeMatch = content.substring(0, match.index);
      return beforeMatch.split('\n').length;
    });
  }

  calculateRiskLevel(vulnerabilities, securityFeatures) {
    const vulnScore = vulnerabilities.reduce((score, vuln) => {
      const weights = {
        sql_injection: 10,
        xss_vulnerability: 8,
        hardcoded_secrets: 9,
        jwt_issues: 7,
        cors_issues: 6
      };
      return score + (weights[vuln.category] || 5) * vuln.matches;
    }, 0);

    const securityScore = securityFeatures.reduce((score, feature) => {
      return score + feature.matches * 2;
    }, 0);

    const totalScore = vulnScore - securityScore;

    if (totalScore > 20) return 'HIGH';
    if (totalScore > 10) return 'MEDIUM';
    if (totalScore > 0) return 'LOW';
    return 'SECURE';
  }

  async scanDirectory(dirPath, extensions = ['.java', '.js', '.jsx', '.properties']) {
    try {
      const results = [];
      const files = await this.getFiles(dirPath, extensions);

      for (const file of files) {
        const result = await this.scanFile(file);
        results.push(result);
      }

      return {
        success: true,
        directory: dirPath,
        filesScanned: results.length,
        results,
        summary: this.generateSummary(results)
      };

    } catch (error) {
      return {
        success: false,
        error: error.message,
        directory: dirPath
      };
    }
  }

  async getFiles(dir, extensions, files = []) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await this.getFiles(fullPath, extensions, files);
      } else if (extensions.some(ext => entry.name.endsWith(ext))) {
        files.push(fullPath);
      }
    }

    return files;
  }

  generateSummary(results) {
    const summary = {
      totalFiles: results.length,
      filesWithVulnerabilities: 0,
      totalVulnerabilities: 0,
      riskDistribution: { HIGH: 0, MEDIUM: 0, LOW: 0, SECURE: 0 },
      topVulnerabilities: {}
    };

    results.forEach(result => {
      if (result.success) {
        if (result.vulnerabilities.length > 0) {
          summary.filesWithVulnerabilities++;
        }
        summary.totalVulnerabilities += result.vulnerabilities.length;
        summary.riskDistribution[result.riskLevel]++;

        result.vulnerabilities.forEach(vuln => {
          summary.topVulnerabilities[vuln.category] =
            (summary.topVulnerabilities[vuln.category] || 0) + vuln.matches;
        });
      }
    });

    return summary;
  }

  async validateJWT(token, secret) {
    // JWT validation logic would go here
    return {
      success: true,
      valid: true,
      payload: {},
      expiresAt: new Date(Date.now() + 300000) // 5 minutes
    };
  }
}

// MCP Server Protocol Implementation
const server = new SecurityScannerMCP();

process.stdin.on('data', async (data) => {
  try {
    const request = JSON.parse(data.toString());
    let response;

    switch (request.method) {
      case 'scan_file':
        response = await server.scanFile(request.params.filePath);
        break;
      case 'scan_directory':
        response = await server.scanDirectory(
          request.params.dirPath,
          request.params.extensions
        );
        break;
      case 'vulnerability_scan':
        response = await server.scanDirectory(
          request.params.path || process.cwd(),
          request.params.extensions
        );
        break;
      case 'jwt_validation':
        response = await server.validateJWT(
          request.params.token,
          request.params.secret
        );
        break;
      default:
        response = { success: false, error: 'Unknown method' };
    }

    process.stdout.write(JSON.stringify({ id: request.id, result: response }) + '\n');
  } catch (error) {
    process.stdout.write(JSON.stringify({
      id: request.id || 0,
      error: { message: error.message }
    }) + '\n');
  }
});