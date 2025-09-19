# Full-Stack Development Team Configuration

This directory contains the configuration for a specialized development team with role-based agents and MCP servers.

## Team Structure

### 🔧 Agents
- **Backend Agent**: Spring Boot, REST APIs, database operations
- **Frontend Agent**: React components, UI/UX, client-side logic
- **Database Agent**: MySQL management, query optimization, caching
- **DevOps Agent**: CI/CD, deployment, infrastructure management
- **Testing Agent**: Automated testing across the full stack
- **Security Agent**: Security audits, vulnerability assessment
- **Design Agent**: Visual design analysis, UI/UX feedback, accessibility testing

### 🔌 MCP Servers
- **mysql-connector**: Direct MySQL database operations
- **maven-helper**: Maven and Spring Boot project management
- **node-tools**: Node.js and npm development utilities
- **redis-tools**: Redis caching and session management
- **security-scanner**: Automated security vulnerability detection
- **deployment-helper**: Infrastructure and deployment automation
- **junit-runner**: Java testing framework integration
- **vite-helper**: Vite build system and React development
- **playwright-visual**: Screenshot automation and visual testing
- **design-analyzer**: Design analysis and UI/UX feedback generation
- **accessibility-checker**: WCAG compliance and accessibility testing

## Setup Instructions

### 1. Install Dependencies
```bash
# For MCP servers
npm install mysql2 redis playwright @playwright/test axe-core canvas

# Install Playwright browsers
npx playwright install

# Ensure project dependencies are installed
cd "back end" && ./mvnw dependency:resolve
cd "../front end" && npm install
```

### 2. Environment Variables
Create a `.env` file in the project root with:
```env
# Database
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
REDIS_PASSWORD=your_redis_password

# Application Secrets
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
STRIPE_SECRET_KEY=your_stripe_key
SENDGRID_API_KEY=your_sendgrid_key

# Optional Security Tools
SNYK_TOKEN=your_snyk_token
GITHUB_TOKEN=your_github_token
```

### 3. Enable MCP Servers
Add to your Claude Code configuration:
```json
{
  "mcpServers": {
    "mysql-connector": {
      "command": "node",
      "args": [".claude/mcp-servers/mysql-connector.js"]
    },
    "maven-helper": {
      "command": "node",
      "args": [".claude/mcp-servers/maven-helper.js"]
    },
    "security-scanner": {
      "command": "node",
      "args": [".claude/mcp-servers/security-scanner.js"]
    }
  }
}
```

## Agent Capabilities

### Backend Agent
- ✅ Spring Boot application development
- ✅ REST API endpoints and controllers
- ✅ JDBC repository pattern implementation
- ✅ JWT authentication and security filters
- ✅ External service integration (Redis, RabbitMQ, APIs)
- ❌ Frontend component development
- ❌ UI/UX design decisions

### Frontend Agent
- ✅ React component creation and optimization
- ✅ CSS Modules and responsive design
- ✅ Health calculator implementations
- ✅ Authentication flow management
- ✅ API integration and state management
- ❌ Backend API implementation
- ❌ Database schema design

### Database Agent
- ✅ MySQL schema design and optimization
- ✅ Query performance analysis
- ✅ Redis caching strategies
- ✅ Database security configuration
- ✅ Repository pattern guidance
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
- ✅ Unit and integration testing
- ✅ Selenium E2E testing
- ✅ Performance and load testing
- ✅ Security vulnerability testing
- ✅ Code coverage analysis
- ❌ Production deployment decisions
- ❌ Database schema changes

### Security Agent
- ✅ Security vulnerability scanning
- ✅ Code review and best practices
- ✅ JWT and authentication audits
- ✅ OWASP compliance verification
- ✅ Third-party integration security
- ❌ Feature development
- ❌ Performance optimization

### Design Agent
- ✅ Visual design analysis and feedback
- ✅ Automated screenshot capture across devices
- ✅ UI/UX improvement recommendations
- ✅ Accessibility compliance testing (WCAG 2.1)
- ✅ Design system consistency validation
- ✅ Color contrast and typography analysis
- ✅ Cross-browser visual testing
- ❌ Backend API development
- ❌ Database schema design

## Usage Examples

### Assign Work to Specific Agents
```
@backend-agent: Implement a new nutrition tracking endpoint
@frontend-agent: Create a meal planning component
@database-agent: Optimize the food search queries
@devops-agent: Set up staging environment deployment
@testing-agent: Add E2E tests for the calculator features
@security-agent: Review the authentication implementation
@design-agent: Analyze BMI calculator visual design and provide UX improvements
```

### Cross-Agent Collaboration
- Backend + Database: API endpoint with optimized queries
- Frontend + Backend: New feature with full-stack implementation
- Testing + All: Comprehensive testing across all components
- Security + All: Security review of new features
- Design + Frontend: UI/UX improvements with component implementation
- Design + Testing: Accessibility compliance and visual regression testing

## File Access Patterns

Each agent has restricted access to ensure separation of concerns:
- **Backend Agent**: Can only modify `back end/**` files
- **Frontend Agent**: Can only modify `front end/**` files
- **Database Agent**: Focus on repositories and models
- **DevOps Agent**: Configuration files and deployment scripts
- **Testing Agent**: All files for comprehensive testing
- **Security Agent**: Read access to all files for security review
- **Design Agent**: Frontend components, styles, and assets for visual analysis

## MCP Server Capabilities

### MySQL Connector
```javascript
// Execute queries with parameters
await mysql.executeQuery('SELECT * FROM users WHERE id = ?', [userId]);

// Get database schema information
await mysql.getSchema('food_items');

// Analyze query performance
await mysql.analyzePerformance('SELECT * FROM products WHERE category = ?');
```

### Security Scanner
```javascript
// Scan individual files
await security.scanFile('back end/src/main/java/Controller/UserController.java');

// Scan entire directories
await security.scanDirectory('back end/', ['.java']);

// Validate JWT tokens
await security.validateJWT(token, secret);
```

### Maven Helper
```javascript
// Run tests
await maven.test('UserControllerTest');

// Build with profile
await maven.springBootRun('dev');

// Analyze dependencies
await maven.analyzeDependencies();
```

### Design & Accessibility Tools
```javascript
// Take responsive screenshots
await playwright.takeResponsiveScreenshots({
  url: 'http://localhost:5173/calculators/bmi',
  browsers: ['chromium', 'firefox'],
  waitForSelector: '.bmi-calculator'
});

// Analyze component design
await design.analyzeScreenshot('.claude/screenshots/bmi-calculator-desktop.png');

// Run accessibility audit
await accessibility.runAccessibilityAudit('http://localhost:5173/calculators');

// Check color contrast
await accessibility.checkColorContrast('http://localhost:5173');
```

This configuration ensures each team member has the right tools and access levels to be productive while maintaining security and separation of concerns.