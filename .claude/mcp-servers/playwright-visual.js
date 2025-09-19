#!/usr/bin/env node

const { chromium, firefox, webkit } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

class PlaywrightVisualMCP {
  constructor() {
    this.browsers = new Map();
    this.frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    this.screenshotDir = process.env.SCREENSHOT_DIR || '.claude/screenshots';

    this.viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1920, height: 1080, name: 'desktop' }
    ];

    this.browserTypes = { chromium, firefox, webkit };
  }

  async ensureScreenshotDir() {
    try {
      await fs.access(this.screenshotDir);
    } catch {
      await fs.mkdir(this.screenshotDir, { recursive: true });
    }
  }

  async launchBrowser(browserName = 'chromium') {
    if (!this.browsers.has(browserName)) {
      const browserType = this.browserTypes[browserName];
      if (!browserType) {
        throw new Error(`Unsupported browser: ${browserName}`);
      }

      const browser = await browserType.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      this.browsers.set(browserName, browser);
    }
    return this.browsers.get(browserName);
  }

  async takeScreenshot(options = {}) {
    const {
      url = this.frontendUrl,
      selector = null,
      viewport = this.viewports[2], // desktop by default
      browser = 'chromium',
      filename = null,
      fullPage = true,
      waitForSelector = null,
      animations = 'disabled'
    } = options;

    try {
      await this.ensureScreenshotDir();
      const browserInstance = await this.launchBrowser(browser);
      const page = await browserInstance.newPage();

      // Set viewport
      await page.setViewportSize(viewport);

      // Disable animations for consistent screenshots
      if (animations === 'disabled') {
        await page.addStyleTag({
          content: `
            *, *::before, *::after {
              animation-delay: -1ms !important;
              animation-duration: 1ms !important;
              animation-iteration-count: 1 !important;
              background-attachment: initial !important;
              scroll-behavior: auto !important;
              transition-duration: 0s !important;
              transition-delay: 0s !important;
            }
          `
        });
      }

      // Navigate to URL
      await page.goto(url, { waitUntil: 'networkidle' });

      // Wait for specific selector if provided
      if (waitForSelector) {
        await page.waitForSelector(waitForSelector, { timeout: 10000 });
      }

      // Generate filename if not provided
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const screenshotName = filename ||
        `screenshot-${viewport.name}-${browser}-${timestamp}.png`;

      const screenshotPath = path.join(this.screenshotDir, screenshotName);

      // Take screenshot
      const screenshotOptions = {
        path: screenshotPath,
        fullPage,
        quality: 90
      };

      if (selector) {
        const element = await page.locator(selector);
        await element.screenshot(screenshotOptions);
      } else {
        await page.screenshot(screenshotOptions);
      }

      await page.close();

      return {
        success: true,
        screenshotPath,
        filename: screenshotName,
        viewport,
        browser,
        url,
        selector,
        timestamp
      };

    } catch (error) {
      return {
        success: false,
        error: error.message,
        url,
        viewport,
        browser
      };
    }
  }

  async takeResponsiveScreenshots(options = {}) {
    const {
      url = this.frontendUrl,
      selector = null,
      browsers = ['chromium'],
      filename = null,
      waitForSelector = null
    } = options;

    const results = [];

    for (const browser of browsers) {
      for (const viewport of this.viewports) {
        const screenshotOptions = {
          url,
          selector,
          viewport,
          browser,
          filename: filename ? `${filename}-${viewport.name}-${browser}.png` : null,
          waitForSelector
        };

        const result = await this.takeScreenshot(screenshotOptions);
        results.push(result);
      }
    }

    return {
      success: results.every(r => r.success),
      results,
      totalScreenshots: results.length,
      successCount: results.filter(r => r.success).length
    };
  }

  async testComponent(componentPath, options = {}) {
    const {
      browsers = ['chromium'],
      interactions = [],
      states = ['default', 'hover', 'focus', 'active']
    } = options;

    const componentUrl = `${this.frontendUrl}${componentPath}`;
    const results = [];

    for (const browser of browsers) {
      const browserInstance = await this.launchBrowser(browser);
      const page = await browserInstance.newPage();

      try {
        await page.goto(componentUrl, { waitUntil: 'networkidle' });

        // Test different states
        for (const state of states) {
          for (const viewport of this.viewports) {
            await page.setViewportSize(viewport);

            let screenshotOptions = {
              path: path.join(
                this.screenshotDir,
                `component-${path.basename(componentPath)}-${state}-${viewport.name}-${browser}.png`
              ),
              fullPage: false,
              quality: 90
            };

            // Apply state-specific interactions
            if (state === 'hover' && interactions.hoverSelector) {
              await page.hover(interactions.hoverSelector);
            } else if (state === 'focus' && interactions.focusSelector) {
              await page.focus(interactions.focusSelector);
            }

            const result = await page.screenshot(screenshotOptions);

            results.push({
              success: true,
              state,
              viewport: viewport.name,
              browser,
              screenshotPath: screenshotOptions.path
            });
          }
        }

        await page.close();

      } catch (error) {
        results.push({
          success: false,
          error: error.message,
          browser,
          componentPath
        });
        await page.close();
      }
    }

    return {
      success: results.every(r => r.success),
      results,
      componentPath
    };
  }

  async getPerformanceMetrics(url = this.frontendUrl) {
    try {
      const browser = await this.launchBrowser('chromium');
      const page = await browser.newPage();

      await page.goto(url, { waitUntil: 'networkidle' });

      const metrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');

        return {
          loadTime: navigation.loadEventEnd - navigation.fetchStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
          firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
          firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
          resourceCount: performance.getEntriesByType('resource').length
        };
      });

      await page.close();

      return {
        success: true,
        url,
        metrics,
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

  async close() {
    for (const [name, browser] of this.browsers) {
      await browser.close();
    }
    this.browsers.clear();
  }
}

// MCP Server Protocol Implementation
const server = new PlaywrightVisualMCP();

process.stdin.on('data', async (data) => {
  try {
    const request = JSON.parse(data.toString());
    let response;

    switch (request.method) {
      case 'take_screenshots':
        response = await server.takeScreenshot(request.params);
        break;
      case 'take_responsive_screenshots':
        response = await server.takeResponsiveScreenshots(request.params);
        break;
      case 'test_component':
        response = await server.testComponent(
          request.params.componentPath,
          request.params.options
        );
        break;
      case 'performance_metrics':
        response = await server.getPerformanceMetrics(request.params.url);
        break;
      case 'visual_comparison':
        // Placeholder for visual comparison functionality
        response = { success: false, error: 'Visual comparison not yet implemented' };
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