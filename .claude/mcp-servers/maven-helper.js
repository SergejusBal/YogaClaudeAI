#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

class MavenHelperMCP {
  constructor() {
    this.mavenPath = process.platform === 'win32' ? 'mvnw.cmd' : './mvnw';
    this.backendPath = path.join(process.cwd(), 'back end');
  }

  async runMavenCommand(command, args = [], options = {}) {
    return new Promise((resolve, reject) => {
      const maven = spawn(this.mavenPath, [command, ...args], {
        cwd: this.backendPath,
        stdio: ['pipe', 'pipe', 'pipe'],
        ...options
      });

      let stdout = '';
      let stderr = '';

      maven.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      maven.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      maven.on('close', (code) => {
        resolve({
          success: code === 0,
          code,
          stdout,
          stderr,
          command: `${this.mavenPath} ${command} ${args.join(' ')}`
        });
      });

      maven.on('error', (error) => {
        reject({
          success: false,
          error: error.message,
          command: `${this.mavenPath} ${command} ${args.join(' ')}`
        });
      });
    });
  }

  async compile() {
    return await this.runMavenCommand('compile');
  }

  async test(testClass = null) {
    const args = testClass ? ['-Dtest=' + testClass] : [];
    return await this.runMavenCommand('test', args);
  }

  async package(skipTests = false) {
    const args = skipTests ? ['-DskipTests'] : [];
    return await this.runMavenCommand('package', args);
  }

  async springBootRun(profile = null) {
    const args = profile ? ['-Dspring-boot.run.profiles=' + profile] : [];
    return await this.runMavenCommand('spring-boot:run', args);
  }

  async analyzeDependencies() {
    return await this.runMavenCommand('dependency:tree');
  }

  async clean() {
    return await this.runMavenCommand('clean');
  }

  async verify() {
    return await this.runMavenCommand('verify');
  }
}

// MCP Server Protocol Implementation
const server = new MavenHelperMCP();

process.stdin.on('data', async (data) => {
  try {
    const request = JSON.parse(data.toString());
    let response;

    switch (request.method) {
      case 'compile':
        response = await server.compile();
        break;
      case 'test':
        response = await server.test(request.params?.testClass);
        break;
      case 'package':
        response = await server.package(request.params?.skipTests);
        break;
      case 'spring_boot_run':
        response = await server.springBootRun(request.params?.profile);
        break;
      case 'analyze_dependencies':
        response = await server.analyzeDependencies();
        break;
      case 'clean':
        response = await server.clean();
        break;
      case 'verify':
        response = await server.verify();
        break;
      case 'run_maven_commands':
        response = await server.runMavenCommand(
          request.params.command,
          request.params.args || []
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