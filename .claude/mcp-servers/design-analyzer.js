#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

class DesignAnalyzerMCP {
  constructor() {
    this.screenshotDir = process.env.SCREENSHOT_DIR || '.claude/screenshots';
    this.designGuidelinesPath = process.env.DESIGN_GUIDELINES || '.claude/design-system.json';

    // Design principles and standards
    this.designCriteria = {
      colorContrast: {
        wcagAA: 4.5,
        wcagAAA: 7.0
      },
      typography: {
        minFontSize: 16,
        maxLineLength: 75,
        optimalLineHeight: 1.5
      },
      spacing: {
        minTouchTarget: 44,
        gridBaseline: 8
      },
      layout: {
        maxContentWidth: 1200,
        minMargin: 16
      }
    };

    // Common design issues to detect
    this.commonIssues = [
      'insufficient-color-contrast',
      'small-text-size',
      'poor-spacing',
      'misaligned-elements',
      'inconsistent-typography',
      'accessibility-violations',
      'responsive-issues',
      'visual-hierarchy-problems'
    ];
  }

  async loadDesignGuidelines() {
    try {
      const guidelines = await fs.readFile(this.designGuidelinesPath, 'utf-8');
      return JSON.parse(guidelines);
    } catch (error) {
      // Return default guidelines if file doesn't exist
      return this.getDefaultGuidelines();
    }
  }

  getDefaultGuidelines() {
    return {
      colors: {
        primary: '#069626',
        secondary: '#0f1f0a',
        background: '#0f1f0a',
        text: '#ffffff',
        accent: 'rgba(9, 105, 38, 0.2)'
      },
      typography: {
        fontFamily: 'system-ui, -apple-system, sans-serif',
        baseFontSize: 16,
        headingScale: [48, 40, 32, 24, 20, 18],
        lineHeight: 1.5
      },
      spacing: {
        base: 8,
        scale: [4, 8, 12, 16, 24, 32, 48, 64, 96]
      },
      layout: {
        maxWidth: 1200,
        breakpoints: {
          mobile: 375,
          tablet: 768,
          desktop: 1920
        }
      }
    };
  }

  async analyzeScreenshot(screenshotPath) {
    try {
      const image = await loadImage(screenshotPath);
      const canvas = createCanvas(image.width, image.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0);

      const analysis = {
        dimensions: { width: image.width, height: image.height },
        colorAnalysis: await this.analyzeColors(ctx, image.width, image.height),
        layoutAnalysis: this.analyzeLayout(image.width, image.height),
        designFeedback: []
      };

      // Generate design feedback based on analysis
      analysis.designFeedback = this.generateDesignFeedback(analysis);

      return {
        success: true,
        screenshotPath,
        analysis,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      return {
        success: false,
        error: error.message,
        screenshotPath
      };
    }
  }

  analyzeColors(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    const colorMap = new Map();
    const sampleSize = Math.min(10000, pixels.length / 4); // Sample for performance

    // Sample pixels to analyze dominant colors
    for (let i = 0; i < sampleSize * 4; i += 16) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = pixels[i + 3];

      if (a > 128) { // Only consider non-transparent pixels
        const color = `rgb(${r},${g},${b})`;
        colorMap.set(color, (colorMap.get(color) || 0) + 1);
      }
    }

    // Get dominant colors
    const sortedColors = Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([color, count]) => ({ color, count, percentage: (count / sampleSize) * 100 }));

    return {
      dominantColors: sortedColors,
      totalColors: colorMap.size,
      contrastIssues: this.detectContrastIssues(sortedColors)
    };
  }

  detectContrastIssues(colors) {
    const issues = [];

    // Simple contrast detection (would need more sophisticated color analysis in practice)
    const darkColors = colors.filter(c => this.isColorDark(c.color));
    const lightColors = colors.filter(c => !this.isColorDark(c.color));

    if (darkColors.length > 0 && lightColors.length > 0) {
      // Check if there's sufficient contrast between most common dark and light colors
      const primaryDark = darkColors[0];
      const primaryLight = lightColors[0];

      if (this.calculateSimpleContrast(primaryDark.color, primaryLight.color) < this.designCriteria.colorContrast.wcagAA) {
        issues.push({
          type: 'insufficient-contrast',
          severity: 'high',
          colors: [primaryDark.color, primaryLight.color],
          recommendation: 'Increase contrast between foreground and background colors'
        });
      }
    }

    return issues;
  }

  isColorDark(rgbColor) {
    const rgb = rgbColor.match(/\d+/g);
    if (!rgb) return false;

    const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
    return brightness < 128;
  }

  calculateSimpleContrast(color1, color2) {
    // Simplified contrast calculation (real implementation would use WCAG formula)
    const brightness1 = this.getColorBrightness(color1);
    const brightness2 = this.getColorBrightness(color2);

    const lighter = Math.max(brightness1, brightness2);
    const darker = Math.min(brightness1, brightness2);

    return (lighter + 0.05) / (darker + 0.05);
  }

  getColorBrightness(rgbColor) {
    const rgb = rgbColor.match(/\d+/g);
    if (!rgb) return 0;

    return (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
  }

  analyzeLayout(width, height) {
    const aspectRatio = width / height;
    const guidelines = this.getDefaultGuidelines();

    return {
      aspectRatio,
      viewport: this.categorizeViewport(width),
      responsive: {
        isResponsive: width <= guidelines.layout.maxWidth,
        breakpointCategory: this.getBreakpointCategory(width)
      },
      layoutFeedback: this.generateLayoutFeedback(width, height, aspectRatio)
    };
  }

  categorizeViewport(width) {
    if (width <= 480) return 'mobile';
    if (width <= 768) return 'tablet';
    return 'desktop';
  }

  getBreakpointCategory(width) {
    const guidelines = this.getDefaultGuidelines();

    if (width <= guidelines.layout.breakpoints.mobile) return 'mobile';
    if (width <= guidelines.layout.breakpoints.tablet) return 'tablet';
    return 'desktop';
  }

  generateLayoutFeedback(width, height, aspectRatio) {
    const feedback = [];
    const guidelines = this.getDefaultGuidelines();

    if (width > guidelines.layout.maxWidth) {
      feedback.push({
        type: 'layout-width',
        severity: 'medium',
        message: `Content width (${width}px) exceeds recommended maximum (${guidelines.layout.maxWidth}px)`,
        recommendation: 'Consider constraining content width for better readability'
      });
    }

    if (aspectRatio < 0.5) {
      feedback.push({
        type: 'aspect-ratio',
        severity: 'low',
        message: 'Very tall aspect ratio detected',
        recommendation: 'Consider breaking content into sections or using pagination'
      });
    }

    return feedback;
  }

  generateDesignFeedback(analysis) {
    const feedback = [];
    const guidelines = this.getDefaultGuidelines();

    // Color feedback
    if (analysis.colorAnalysis.contrastIssues.length > 0) {
      feedback.push(...analysis.colorAnalysis.contrastIssues);
    }

    // Layout feedback
    if (analysis.layoutAnalysis.layoutFeedback.length > 0) {
      feedback.push(...analysis.layoutAnalysis.layoutFeedback);
    }

    // General design recommendations
    feedback.push(...this.generateGeneralRecommendations(analysis));

    return feedback;
  }

  generateGeneralRecommendations(analysis) {
    const recommendations = [];

    // Typography recommendations
    recommendations.push({
      type: 'typography',
      severity: 'low',
      message: 'Typography analysis',
      recommendation: 'Ensure font sizes are at least 16px for body text and maintain consistent line heights of 1.4-1.6'
    });

    // Spacing recommendations
    recommendations.push({
      type: 'spacing',
      severity: 'low',
      message: 'Spacing consistency',
      recommendation: 'Use consistent spacing based on 8px grid system for better visual rhythm'
    });

    // Accessibility recommendations
    recommendations.push({
      type: 'accessibility',
      severity: 'medium',
      message: 'Accessibility considerations',
      recommendation: 'Ensure interactive elements are at least 44px in size and have clear focus states'
    });

    return recommendations;
  }

  async generateDesignReport(screenshotPaths) {
    const analyses = [];

    for (const screenshotPath of screenshotPaths) {
      const analysis = await this.analyzeScreenshot(screenshotPath);
      if (analysis.success) {
        analyses.push(analysis);
      }
    }

    const report = {
      summary: {
        totalScreenshots: screenshotPaths.length,
        analyzedScreenshots: analyses.length,
        totalIssues: analyses.reduce((sum, a) => sum + a.analysis.designFeedback.length, 0)
      },
      analyses,
      overallRecommendations: this.generateOverallRecommendations(analyses),
      timestamp: new Date().toISOString()
    };

    return {
      success: true,
      report
    };
  }

  generateOverallRecommendations(analyses) {
    const allFeedback = analyses.flatMap(a => a.analysis.designFeedback);
    const issueTypes = {};

    // Count issue types
    allFeedback.forEach(feedback => {
      issueTypes[feedback.type] = (issueTypes[feedback.type] || 0) + 1;
    });

    // Generate prioritized recommendations
    const recommendations = [];

    Object.entries(issueTypes)
      .sort((a, b) => b[1] - a[1])
      .forEach(([type, count]) => {
        recommendations.push({
          type,
          occurrences: count,
          priority: count > analyses.length * 0.5 ? 'high' : 'medium',
          recommendation: this.getRecommendationForType(type)
        });
      });

    return recommendations;
  }

  getRecommendationForType(type) {
    const recommendations = {
      'insufficient-contrast': 'Improve color contrast ratios to meet WCAG AA standards',
      'layout-width': 'Implement responsive design with proper max-width constraints',
      'typography': 'Establish consistent typography scale and improve readability',
      'spacing': 'Implement consistent spacing system based on grid principles',
      'accessibility': 'Enhance accessibility features including focus states and touch targets'
    };

    return recommendations[type] || 'Review and improve this design aspect';
  }
}

// MCP Server Protocol Implementation
const server = new DesignAnalyzerMCP();

process.stdin.on('data', async (data) => {
  try {
    const request = JSON.parse(data.toString());
    let response;

    switch (request.method) {
      case 'analyze_screenshots':
        response = await server.analyzeScreenshot(request.params.screenshotPath);
        break;
      case 'generate_design_report':
        response = await server.generateDesignReport(request.params.screenshotPaths);
        break;
      case 'color_analysis':
        response = await server.analyzeScreenshot(request.params.screenshotPath);
        break;
      case 'layout_assessment':
        response = await server.analyzeScreenshot(request.params.screenshotPath);
        break;
      case 'design_feedback':
        response = await server.generateDesignReport([request.params.screenshotPath]);
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