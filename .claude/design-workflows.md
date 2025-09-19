# Design Agent Workflows

This document outlines the automated workflows and processes that the Design Agent uses to provide comprehensive UI/UX feedback and visual testing.

## Core Workflows

### 1. Component Screenshot Analysis

**Trigger**: New component created or modified
**Process**:
1. Take responsive screenshots (mobile, tablet, desktop)
2. Analyze visual elements and design consistency
3. Check accessibility compliance
4. Generate improvement recommendations
5. Create visual comparison reports

**MCP Servers Used**: `playwright-visual`, `design-analyzer`, `accessibility-checker`

### 2. Design System Compliance Check

**Trigger**: Component styling changes
**Process**:
1. Extract component styles and measurements
2. Compare against design system guidelines
3. Identify deviations from established patterns
4. Suggest corrections for consistency
5. Generate compliance report

### 3. Accessibility Audit Workflow

**Trigger**: New pages or components
**Process**:
1. Run automated accessibility scan (axe-core)
2. Test keyboard navigation flow
3. Check color contrast ratios
4. Validate ARIA labels and roles
5. Generate WCAG compliance report

### 4. Visual Regression Testing

**Trigger**: Component updates or styling changes
**Process**:
1. Take new screenshots across devices
2. Compare with baseline screenshots
3. Identify visual differences
4. Flag potential regressions
5. Update baseline if changes are approved

## Automated Feedback Categories

### Visual Design Feedback

#### Color Analysis
- **Contrast Ratios**: WCAG AA/AAA compliance checking
- **Color Harmony**: Adherence to design system palette
- **Brand Consistency**: Proper use of primary/secondary colors

#### Typography Assessment
- **Hierarchy**: Proper heading structure and sizing
- **Readability**: Font size, line height, and spacing analysis
- **Consistency**: Uniform font usage across components

#### Layout Evaluation
- **Spacing**: Grid system compliance and consistent margins
- **Alignment**: Visual alignment and component positioning
- **Responsiveness**: Behavior across different screen sizes

### User Experience Analysis

#### Interactive Elements
- **Touch Targets**: Minimum 44px size for mobile interactions
- **Focus States**: Clear visual indicators for keyboard navigation
- **Loading States**: Appropriate feedback during data loading

#### Component Usability
- **Visual Hierarchy**: Clear information prioritization
- **Affordances**: Intuitive interaction indicators
- **Error States**: Clear error messaging and recovery paths

## Screenshot Configuration

### Viewport Testing Matrix

```json
{
  "viewports": [
    { "name": "mobile", "width": 375, "height": 667 },
    { "name": "tablet", "width": 768, "height": 1024 },
    { "name": "desktop", "width": 1920, "height": 1080 }
  ],
  "browsers": ["chromium", "firefox", "webkit"],
  "component_states": ["default", "hover", "focus", "active", "disabled"]
}
```

### Screenshot Automation Rules

1. **Full Page Screenshots**: For layout and page-level analysis
2. **Component Screenshots**: Isolated component testing
3. **State Screenshots**: All interactive states captured
4. **Cross-Browser**: Consistency across browser engines
5. **Animation Disabled**: Consistent timing for comparisons

## Design Feedback Templates

### Component Review Template

```markdown
## Component: [ComponentName]

### ✅ Strengths
- [List positive design aspects]

### ⚠️ Areas for Improvement
- [List specific improvement recommendations]

### 🎯 Priority Fixes
- [Critical issues requiring immediate attention]

### 📱 Responsive Behavior
- [Mobile/tablet/desktop specific feedback]

### ♿ Accessibility
- [WCAG compliance status and recommendations]

### 🎨 Design System Compliance
- [Adherence to established design patterns]
```

### Accessibility Report Template

```markdown
## Accessibility Audit: [Page/Component]

### WCAG Compliance Level: [AA/AAA]

### Critical Issues (Fix Immediately)
- [List critical accessibility violations]

### Moderate Issues
- [List moderate priority issues]

### Recommendations
- [Specific improvement suggestions]

### Testing Results
- Color Contrast: [Pass/Fail with ratios]
- Keyboard Navigation: [Pass/Fail with details]
- Screen Reader: [Pass/Fail with notes]
```

## Integration with Development Workflow

### Pre-Commit Hooks
- Automated screenshot capture on component changes
- Quick accessibility scan for modified files
- Design system compliance check

### Pull Request Integration
- Visual regression report generation
- Accessibility audit summary
- Design feedback comments

### Continuous Integration
- Comprehensive design system compliance reports
- Cross-browser visual testing
- Performance impact of styling changes

## Component-Specific Analysis

### Health Calculators
- **Input Validation**: Visual feedback for form errors
- **Result Display**: Clear, prominent result presentation
- **Progress Indicators**: Visual feedback during calculations
- **Responsive Layout**: Proper scaling on all devices

### Navigation Components
- **Active States**: Clear indication of current page/section
- **Hover Effects**: Smooth transitions and visual feedback
- **Mobile Menu**: Proper hamburger menu implementation
- **Accessibility**: Keyboard navigation and screen reader support

### Form Components
- **Field States**: Default, focus, error, disabled states
- **Validation**: Clear error messages and success indicators
- **Labels**: Proper association and visual hierarchy
- **Layout**: Consistent spacing and alignment

## Performance Considerations

### Image Optimization
- Screenshot compression and format optimization
- Lazy loading for large screenshot galleries
- Progressive image enhancement

### Analysis Efficiency
- Parallel processing of multiple screenshots
- Caching of analysis results
- Incremental updates for unchanged components

## Reporting and Documentation

### Daily Design Reports
- New component screenshots and analysis
- Accessibility compliance status
- Design system adherence metrics

### Weekly Design Reviews
- Visual regression analysis
- User experience improvement suggestions
- Design system evolution recommendations

### Release Design Audits
- Comprehensive visual testing across all components
- Full accessibility audit
- Brand consistency verification
- Performance impact assessment

## Tools and Dependencies

### Required npm Packages
```bash
npm install playwright @playwright/test axe-core canvas
```

### Environment Setup
```bash
# Install Playwright browsers
npx playwright install

# Create screenshot directories
mkdir -p .claude/screenshots/{mobile,tablet,desktop}
```

### MCP Server Dependencies
- **playwright-visual**: Screenshot automation and visual testing
- **design-analyzer**: Image analysis and design feedback generation
- **accessibility-checker**: WCAG compliance testing and reporting

This workflow ensures comprehensive design quality while maintaining consistency with the established green/dark theme design system of the Diet & Fitness website.