#!/bin/bash

# Full-Stack Development Team Setup Script

echo "🚀 Setting up Full-Stack Development Team..."

# Create necessary directories
mkdir -p .claude/logs
mkdir -p .claude/temp

# Make MCP servers executable
chmod +x .claude/mcp-servers/*.js

# Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required for MCP servers"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Install MCP server dependencies
echo "📦 Installing MCP server dependencies..."
npm install --prefix .claude mysql2 redis

# Check Java installation
if ! command -v java &> /dev/null; then
    echo "❌ Java is required for backend development"
    echo "Please install Java 21 or later"
    exit 1
fi

echo "✅ Java found: $(java --version | head -n 1)"

# Check Maven
BACKEND_DIR="back end"
if [ -f "$BACKEND_DIR/mvnw" ]; then
    echo "✅ Maven wrapper found"
    chmod +x "$BACKEND_DIR/mvnw"
else
    echo "❌ Maven wrapper not found in $BACKEND_DIR"
fi

# Check npm for frontend
FRONTEND_DIR="front end"
if [ -f "$FRONTEND_DIR/package.json" ]; then
    echo "✅ Frontend package.json found"
else
    echo "❌ Frontend package.json not found in $FRONTEND_DIR"
fi

# Create environment template
if [ ! -f ".env" ]; then
    echo "📝 Creating .env template..."
    cat > .env << EOL
# Database Configuration
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
REDIS_PASSWORD=your_redis_password

# Application Secrets (DO NOT COMMIT THESE)
JWT_SECRET=your_jwt_secret_here
OPENAI_API_KEY=your_openai_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
SENDGRID_API_KEY=your_sendgrid_api_key

# Optional Security Tools
SNYK_TOKEN=your_snyk_token
GITHUB_TOKEN=your_github_token

# Development Settings
NODE_ENV=development
VITE_API_URL=http://localhost:8079
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=diet_fitness_mysql
REDIS_HOST=localhost
REDIS_PORT=6379
EOL
    echo "✅ Created .env template - please fill in your actual values"
else
    echo "✅ .env file already exists"
fi

# Add .env to .gitignore if not already there
if ! grep -q "\.env" .gitignore 2>/dev/null; then
    echo ".env" >> .gitignore
    echo "✅ Added .env to .gitignore"
fi

# Test MCP servers
echo "🔧 Testing MCP servers..."

# Test MySQL connector (if credentials are available)
if [ -n "$MYSQL_USER" ] && [ -n "$MYSQL_PASSWORD" ]; then
    echo "Testing MySQL connection..."
    # Test connection here
else
    echo "⚠️  MySQL credentials not set - skipping connection test"
fi

# Validate agent configurations
echo "🤖 Validating agent configurations..."
for agent in .claude/agents/*.json; do
    if node -e "JSON.parse(require('fs').readFileSync('$agent'))" 2>/dev/null; then
        echo "✅ $(basename "$agent" .json) configuration valid"
    else
        echo "❌ $(basename "$agent" .json) configuration invalid"
    fi
done

# Validate MCP server configurations
echo "🔌 Validating MCP server configurations..."
for server in .claude/mcp-servers/*.json; do
    if node -e "JSON.parse(require('fs').readFileSync('$server'))" 2>/dev/null; then
        echo "✅ $(basename "$server" .json) MCP server configuration valid"
    else
        echo "❌ $(basename "$server" .json) MCP server configuration invalid"
    fi
done

echo ""
echo "🎉 Full-Stack Development Team setup complete!"
echo ""
echo "Next steps:"
echo "1. Fill in your actual values in .env file"
echo "2. Start your MySQL and Redis servers"
echo "3. Configure Claude Code to use the MCP servers in .claude/mcp-servers/"
echo "4. Assign tasks to specific agents using @agent-name syntax"
echo ""
echo "Team members ready:"
echo "- @backend-agent: Spring Boot and REST API development"
echo "- @frontend-agent: React components and UI development"
echo "- @database-agent: MySQL optimization and caching"
echo "- @devops-agent: Infrastructure and deployment"
echo "- @testing-agent: Automated testing and QA"
echo "- @security-agent: Security audits and code review"
echo ""
echo "See .claude/README.md for detailed usage instructions."