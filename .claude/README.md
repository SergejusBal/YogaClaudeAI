# Yoga Website Development Team Configuration

This directory contains the configuration for a specialized development team with role-based agents and MCP servers for yoga website development.

## Team Structure

### 🔧 Agents
- **Frontend Agent**: React components, UI/UX, client-side logic for yoga website
- **Backend Agent**: Future backend development (currently frontend-only)
- **Database Agent**: Future database management (when backend is added)
- **DevOps Agent**: CI/CD, deployment, infrastructure management
- **Testing Agent**: Automated testing for the yoga website
- **Security Agent**: Security audits, vulnerability assessment
- **Design Agent**: Visual design analysis, UI/UX feedback, accessibility testing

### 🔌 MCP Servers
- **node-tools**: Node.js and npm development utilities
- **vite-helper**: Vite build system and React development
- **playwright-visual**: Screenshot automation and visual testing
- **design-analyzer**: Design analysis and UI/UX feedback generation
- **accessibility-checker**: WCAG compliance and accessibility testing
- **security-scanner**: Automated security vulnerability detection
- **deployment-helper**: Infrastructure and deployment automation
- **mysql-connector**: Future MySQL database operations (when backend is added)
- **maven-helper**: Future Maven and Spring Boot project management
- **redis-tools**: Future Redis caching and session management
- **junit-runner**: Future Java testing framework integration

## Setup Instructions

### 1. Install Dependencies
```bash
# For MCP servers
npm install playwright @playwright/test axe-core canvas

# Install Playwright browsers
npx playwright install

# Ensure project dependencies are installed
cd "front end" && npm install

# Future backend dependencies (when backend is added)
# npm install mysql2 redis
```

### 2. Environment Variables (Future)
Create a `.env` file in the project root when backend is added:
```env
# Future configuration for backend integration
# JWT_SECRET=your_jwt_secret
# API keys for external services when needed
```

### 3. Enable MCP Servers
Add to your Claude Code configuration:
```json
{
  "mcpServers": {
    "vite-helper": {
      "command": "node",
      "args": [".claude/mcp-servers/vite-helper.js"]
    },
    "playwright-visual": {
      "command": "node",
      "args": [".claude/mcp-servers/playwright-visual.js"]
    },
    "accessibility-checker": {
      "command": "node",
      "args": [".claude/mcp-servers/accessibility-checker.js"]
    },
    "design-analyzer": {
      "command": "node",
      "args": [".claude/mcp-servers/design-analyzer.js"]
    }
  }
}
```

## Agent Capabilities

### Frontend Agent
- ✅ React component creation and optimization for yoga website
- ✅ CSS Modules and responsive design
- ✅ Yoga-specific component implementations (poses, routines, timers)
- ✅ Authentication flow management (ready for backend)
- ✅ State management and routing
- ❌ Backend API implementation
- ❌ Database schema design

### Backend Agent (Future)
- ✅ Future Spring Boot application development
- ✅ Future REST API endpoints for yoga content
- ✅ Future authentication and security implementation
- ❌ Frontend component development
- ❌ UI/UX design decisions

### Database Agent (Future)
- ✅ Future database schema design for yoga content
- ✅ Future query optimization for yoga poses/routines
- ✅ Future caching strategies
- ❌ Frontend state management
- ❌ UI component development

### DevOps Agent
- ✅ CI/CD pipeline configuration
- ✅ Docker containerization
- ✅ Infrastructure provisioning
- ✅ Monitoring and logging setup
- ✅ Security hardening
- ❌ Business logic implementation
- ❌ UI/UX development

### Testing Agent
- ✅ Unit and integration testing for yoga website
- ✅ React component testing
- ✅ E2E testing with Playwright
- ✅ Accessibility testing for yoga content
- ✅ Performance testing
- ❌ Production deployment decisions
- ❌ Backend implementation (when added)

### Security Agent
- ✅ Security vulnerability scanning
- ✅ Code review and best practices
- ✅ JWT and authentication audits
- ✅ OWASP compliance verification
- ✅ Third-party integration security
- ❌ Feature development
- ❌ Performance optimization

### Design Agent
- ✅ Visual design analysis for yoga website UI
- ✅ Automated screenshot capture across devices
- ✅ UI/UX improvement recommendations for yoga content
- ✅ Accessibility compliance testing (WCAG 2.1)
- ✅ Yoga-themed design system consistency
- ✅ Color contrast and typography analysis
- ✅ Cross-browser visual testing
- ❌ Backend API development
- ❌ Database schema design

## Usage Examples

### Assign Work to Specific Agents
```
@frontend-agent: Create a yoga pose library component
@frontend-agent: Build a meditation timer with ambient sounds
@design-agent: Analyze yoga homepage visual design and provide UX improvements
@testing-agent: Add E2E tests for the yoga routine features
@security-agent: Review the authentication implementation
@devops-agent: Set up staging environment deployment
```

### Cross-Agent Collaboration
- Frontend + Design: Yoga UI/UX improvements with component implementation
- Testing + Frontend: Comprehensive testing for yoga components
- Security + All: Security review of authentication features
- Design + Testing: Accessibility compliance and visual regression testing
- Future: Backend + Frontend collaboration when backend is added

## File Access Patterns

Each agent has restricted access to ensure separation of concerns:
- **Frontend Agent**: Can modify `front end/**` files
- **Backend Agent**: Future access to backend files when created
- **Database Agent**: Future database-related files when backend is added
- **DevOps Agent**: Configuration files and deployment scripts
- **Testing Agent**: All files for comprehensive testing
- **Security Agent**: Read access to all files for security review
- **Design Agent**: Frontend components, styles, and assets for visual analysis

## MCP Server Capabilities

### Vite Helper
```javascript
// Start development server
await vite.devServer();

// Build for production
await vite.build();

// Preview production build
await vite.preview();
```

### Design & Accessibility Tools
```javascript
// Take responsive screenshots of yoga components
await playwright.takeResponsiveScreenshots({
  url: 'http://localhost:5173/yoga-poses',
  browsers: ['chromium', 'firefox'],
  waitForSelector: '.pose-library'
});

// Analyze yoga website design
await design.analyzeScreenshot('.claude/screenshots/yoga-homepage-desktop.png');

// Run accessibility audit on yoga content
await accessibility.runAccessibilityAudit('http://localhost:5173/meditation');

// Check color contrast for yoga theme
await accessibility.checkColorContrast('http://localhost:5173');
```

### Security Scanner
```javascript
// Scan React components for security issues
await security.scanFile('front end/src/Components/YogaPoses.jsx');

// Scan entire frontend directory
await security.scanDirectory('front end/', ['.js', '.jsx']);

// Future: Validate JWT tokens when backend is added
// await security.validateJWT(token, secret);
```

### Future Backend Tools
```javascript
// When backend is added:
// await mysql.executeQuery('SELECT * FROM yoga_poses WHERE difficulty = ?', ['beginner']);
// await maven.test('YogaPoseControllerTest');
// await redis.cacheYogaRoutines(routines);
```

This configuration ensures each team member has the right tools and access levels to be productive while maintaining security and separation of concerns for yoga website development.