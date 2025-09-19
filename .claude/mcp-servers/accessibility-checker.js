#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('fs').promises;

class AccessibilityCheckerMCP {
  constructor() {
    this.frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    this.wcagLevel = process.env.WCAG_LEVEL || 'AA';
    this.browser = null;
  }

  async launchBrowser() {
    if (!this.browser) {
      this.browser = await chromium.launch({ headless: true });
    }
    return this.browser;
  }

  async runAccessibilityAudit(url = this.frontendUrl, options = {}) {
    try {
      const browser = await this.launchBrowser();
      const page = await browser.newPage();

      await page.goto(url, { waitUntil: 'networkidle' });

      // Inject axe-core for accessibility testing
      await page.addScriptTag({
        url: 'https://unpkg.com/axe-core@4.6.3/axe.min.js'
      });

      // Run axe accessibility scan
      const results = await page.evaluate(async (wcagLevel) => {
        return new Promise((resolve) => {
          window.axe.run({
            tags: [`wcag${wcagLevel.toLowerCase()}`, 'best-practice']
          }, (err, results) => {
            if (err) {
              resolve({ error: err.message });
            } else {
              resolve(results);
            }
          });
        });
      }, this.wcagLevel);

      await page.close();

      if (results.error) {
        return {
          success: false,
          error: results.error,
          url
        };
      }

      // Process and categorize results
      const processedResults = this.processAxeResults(results);

      return {
        success: true,
        url,
        wcagLevel: this.wcagLevel,
        audit: processedResults,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      return {
        success: false,
        error: error.message,
        url
      };
    }
  }

  processAxeResults(axeResults) {
    return {
      violations: axeResults.violations.map(violation => ({
        id: violation.id,
        description: violation.description,
        impact: violation.impact,
        tags: violation.tags,
        nodes: violation.nodes.length,
        helpUrl: violation.helpUrl,
        wcagCriteria: violation.tags.filter(tag => tag.startsWith('wcag')),
        elements: violation.nodes.map(node => ({
          target: node.target.join(', '),
          html: node.html,
          failureSummary: node.failureSummary
        }))
      })),
      passes: axeResults.passes.map(pass => ({
        id: pass.id,
        description: pass.description,
        nodes: pass.nodes.length
      })),
      summary: {
        violationCount: axeResults.violations.length,
        passCount: axeResults.passes.length,
        incompleteCount: axeResults.incomplete.length,
        inapplicableCount: axeResults.inapplicable.length,
        criticalIssues: axeResults.violations.filter(v => v.impact === 'critical').length,
        seriousIssues: axeResults.violations.filter(v => v.impact === 'serious').length,
        moderateIssues: axeResults.violations.filter(v => v.impact === 'moderate').length,
        minorIssues: axeResults.violations.filter(v => v.impact === 'minor').length
      }
    };
  }

  async checkColorContrast(url = this.frontendUrl) {
    try {
      const browser = await this.launchBrowser();
      const page = await browser.newPage();

      await page.goto(url, { waitUntil: 'networkidle' });

      // Get all text elements and their computed styles
      const contrastResults = await page.evaluate(() => {
        const textElements = Array.from(document.querySelectorAll('*')).filter(el => {
          const text = el.innerText?.trim();
          return text && text.length > 0 && !['SCRIPT', 'STYLE', 'META', 'TITLE'].includes(el.tagName);
        });

        return textElements.slice(0, 50).map(el => { // Limit to first 50 elements
          const styles = window.getComputedStyle(el);
          const rect = el.getBoundingClientRect();

          return {
            tag: el.tagName.toLowerCase(),
            text: el.innerText?.substring(0, 50) || '',
            color: styles.color,
            backgroundColor: styles.backgroundColor,
            fontSize: styles.fontSize,
            fontWeight: styles.fontWeight,
            position: {
              top: Math.round(rect.top),
              left: Math.round(rect.left),
              width: Math.round(rect.width),
              height: Math.round(rect.height)
            }
          };
        });
      });

      await page.close();

      // Analyze contrast ratios
      const contrastAnalysis = contrastResults.map(element => {
        const contrastRatio = this.calculateContrastRatio(element.color, element.backgroundColor);
        const meetsWCAG_AA = contrastRatio >= 4.5;
        const meetsWCAG_AAA = contrastRatio >= 7.0;

        return {
          ...element,
          contrastRatio: contrastRatio.toFixed(2),
          meetsWCAG_AA,
          meetsWCAG_AAA,
          recommendation: this.getContrastRecommendation(contrastRatio, element.fontSize)
        };
      });

      return {
        success: true,
        url,
        contrastAnalysis,
        summary: {
          totalElements: contrastAnalysis.length,
          passingAA: contrastAnalysis.filter(el => el.meetsWCAG_AA).length,
          passingAAA: contrastAnalysis.filter(el => el.meetsWCAG_AAA).length,
          averageContrast: (contrastAnalysis.reduce((sum, el) => sum + parseFloat(el.contrastRatio), 0) / contrastAnalysis.length).toFixed(2)
        }
      };

    } catch (error) {
      return {
        success: false,
        error: error.message,
        url
      };
    }
  }

  calculateContrastRatio(color1, color2) {
    // Simplified contrast calculation
    // In a real implementation, you'd properly parse RGB/RGBA values and use the WCAG formula
    const brightness1 = this.getColorBrightness(color1);
    const brightness2 = this.getColorBrightness(color2);

    const lighter = Math.max(brightness1, brightness2);
    const darker = Math.min(brightness1, brightness2);

    return (lighter + 0.05) / (darker + 0.05);
  }

  getColorBrightness(color) {
    // Extract RGB values (simplified)
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return 0;

    const r = parseInt(rgb[0]) / 255;
    const g = parseInt(rgb[1]) / 255;
    const b = parseInt(rgb[2]) / 255;

    // Convert to relative luminance (simplified)
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }

  getContrastRecommendation(ratio, fontSize) {
    const size = parseInt(fontSize);
    const isLargeText = size >= 18 || (size >= 14 && fontSize.includes('bold'));

    if (isLargeText) {
      if (ratio >= 3.0) return 'Good contrast for large text';
      return 'Increase contrast for large text (minimum 3:1 ratio)';
    } else {
      if (ratio >= 4.5) return 'Good contrast for normal text';
      if (ratio >= 3.0) return 'Consider increasing contrast for better readability';
      return 'Poor contrast - increase contrast ratio (minimum 4.5:1)';
    }
  }

  async testKeyboardNavigation(url = this.frontendUrl) {
    try {
      const browser = await this.launchBrowser();
      const page = await browser.newPage();

      await page.goto(url, { waitUntil: 'networkidle' });

      // Test basic keyboard navigation
      const navigationResults = await page.evaluate(() => {
        const focusableElements = Array.from(document.querySelectorAll(
          'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        ));

        return focusableElements.map((el, index) => ({
          index,
          tag: el.tagName.toLowerCase(),
          type: el.type || null,
          hasTabIndex: el.hasAttribute('tabindex'),
          tabIndex: el.tabIndex,
          ariaLabel: el.getAttribute('aria-label'),
          role: el.getAttribute('role'),
          text: el.innerText?.substring(0, 30) || el.value || '',
          id: el.id,
          className: el.className
        }));
      });

      // Test Tab navigation sequence
      const tabSequence = [];
      let currentIndex = 0;

      while (currentIndex < Math.min(navigationResults.length, 20)) { // Limit to 20 elements
        await page.keyboard.press('Tab');
        const activeElement = await page.evaluate(() => {
          const el = document.activeElement;
          return {
            tag: el.tagName.toLowerCase(),
            id: el.id,
            className: el.className,
            text: el.innerText?.substring(0, 30) || ''
          };
        });

        tabSequence.push(activeElement);
        currentIndex++;
      }

      await page.close();

      return {
        success: true,
        url,
        focusableElements: navigationResults,
        tabSequence,
        analysis: {
          totalFocusableElements: navigationResults.length,
          elementsWithAriaLabels: navigationResults.filter(el => el.ariaLabel).length,
          elementsWithCustomTabIndex: navigationResults.filter(el => el.hasTabIndex && el.tabIndex !== 0).length,
          recommendations: this.generateKeyboardRecommendations(navigationResults)
        }
      };

    } catch (error) {
      return {
        success: false,
        error: error.message,
        url
      };
    }
  }

  generateKeyboardRecommendations(elements) {
    const recommendations = [];

    const elementsWithoutLabels = elements.filter(el =>
      ['button', 'input', 'a'].includes(el.tag) && !el.ariaLabel && !el.text
    );

    if (elementsWithoutLabels.length > 0) {
      recommendations.push({
        type: 'missing-labels',
        count: elementsWithoutLabels.length,
        recommendation: 'Add aria-label or visible text to interactive elements'
      });
    }

    const customTabIndexElements = elements.filter(el => el.tabIndex > 0);
    if (customTabIndexElements.length > 0) {
      recommendations.push({
        type: 'custom-tab-order',
        count: customTabIndexElements.length,
        recommendation: 'Consider using natural DOM order instead of custom tabindex values'
      });
    }

    return recommendations;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

// MCP Server Protocol Implementation
const server = new AccessibilityCheckerMCP();

process.stdin.on('data', async (data) => {
  try {
    const request = JSON.parse(data.toString());
    let response;

    switch (request.method) {
      case 'accessibility_audit':
        response = await server.runAccessibilityAudit(
          request.params.url,
          request.params.options
        );
        break;
      case 'color_contrast_check':
        response = await server.checkColorContrast(request.params.url);
        break;
      case 'keyboard_navigation_test':
        response = await server.testKeyboardNavigation(request.params.url);
        break;
      case 'wcag_compliance_report':
        const auditResult = await server.runAccessibilityAudit(request.params.url);
        const contrastResult = await server.checkColorContrast(request.params.url);
        const keyboardResult = await server.testKeyboardNavigation(request.params.url);

        response = {
          success: auditResult.success && contrastResult.success && keyboardResult.success,
          url: request.params.url,
          wcagLevel: server.wcagLevel,
          audit: auditResult.success ? auditResult.audit : null,
          colorContrast: contrastResult.success ? contrastResult : null,
          keyboardNavigation: keyboardResult.success ? keyboardResult : null,
          overallScore: this.calculateOverallScore(auditResult, contrastResult, keyboardResult)
        };
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

process.on('SIGTERM', async () => {
  await server.close();
  process.exit(0);
});