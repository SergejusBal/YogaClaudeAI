# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

```
DietWebsite/
├── back end/                               # Spring Boot backend application
│   ├── src/main/java/Sergejus/DietFitnessWebsiteBackEnd/
│   │   ├── Controllers/                    # REST API endpoints
│   │   │   ├── AdminController.java        # Admin management endpoints
│   │   │   ├── FoodController.java         # Food item operations
│   │   │   ├── GuestController.java        # Public access endpoints
│   │   │   ├── NoFilterController.java     # Unfiltered endpoints (JWT refresh)
│   │   │   ├── PostController.java         # Blog/post management
│   │   │   ├── ProductController.java      # Product catalog operations
│   │   │   ├── RecipeController.java       # Recipe management
│   │   │   ├── ReferenceProductController.java # Reference product data
│   │   │   └── UserController.java         # User account operations
│   │   ├── Services/                       # Business logic layer
│   │   ├── Repositories/                   # Data access layer (JDBC-based)
│   │   │   ├── FoodRepository.java         # Food item data access
│   │   │   ├── UserRepository.java         # User data operations
│   │   │   ├── ProductRepository.java      # Product catalog access
│   │   │   ├── PostRepository.java         # Blog/post data access
│   │   │   ├── RecipeRepository.java       # Recipe data operations
│   │   │   ├── IPRepository.java           # IP tracking for security
│   │   │   └── ReferenceProductRepository.java # Reference product data
│   │   ├── Model/                          # Entity/DTO classes
│   │   │   ├── Users/                      # User-related models
│   │   │   ├── FoodItem.java              # Food nutrition data model
│   │   │   ├── Product.java               # Product catalog model
│   │   │   ├── Recipe.java                # Recipe data model
│   │   │   ├── Post.java                  # Blog post model
│   │   │   ├── ReferenceProduct.java      # Reference product model
│   │   │   └── PasswordChangeDTO.java     # Password change request
│   │   ├── Security/                       # Authentication & authorization
│   │   │   ├── Filter/                     # Security filters
│   │   │   ├── FilterConfig.java           # Security configuration
│   │   │   ├── JWT.java                   # JWT token utilities
│   │   │   ├── WebSocketConfig.java       # WebSocket security config
│   │   │   └── WebSocketMessageInterceptor.java # WebSocket auth
│   │   ├── Integration/                    # External service integrations
│   │   │   ├── ChatGPD/                   # OpenAI API integration
│   │   │   ├── RabbitMQ.java             # Message queue service
│   │   │   ├── RabbitMQMessageProcessor.java # Message processing
│   │   │   └── Redis.java                # Caching service
│   │   ├── Utilities/                      # Helper classes and utilities
│   │   ├── Componets/                     # Spring components
│   │   │   ├── ScheduledTasks.java        # Scheduled background tasks
│   │   │   └── StartUpTasks.java          # Application startup tasks
│   │   └── DietFitnessWebsiteBackEndApplication.java # Main Spring Boot class
│   ├── src/main/resources/
│   │   └── application.properties         # Configuration (DB, Redis, JWT, API keys)
│   ├── pom.xml                           # Maven dependencies and build config
│   ├── mvnw                              # Maven wrapper (Unix)
│   └── mvnw.cmd                          # Maven wrapper (Windows)
└── front end/                            # React + Vite frontend application
    ├── src/
    │   ├── Components/
    │   │   ├── calculators/               # Health & fitness calculators
    │   │   │   ├── BMICalculator.jsx      # Body Mass Index calculator
    │   │   │   ├── TDEECalculator.jsx     # Total Daily Energy Expenditure
    │   │   │   ├── FatPercentageCalculator.jsx # Body fat percentage
    │   │   │   ├── BurnCalculator.jsx     # Calorie burn calculator
    │   │   │   ├── SleepCalculator.jsx    # Sleep cycle calculator
    │   │   │   └── NutritionPlanner.jsx   # Meal planning tool
    │   │   ├── admin/                     # Admin panel components
    │   │   │   └── AdminPage.jsx          # Admin dashboard
    │   │   ├── general/                   # Shared/common components
    │   │   │   └── Confirm.jsx            # Confirmation dialogs
    │   │   ├── Providers/                 # React context providers
    │   │   │   └── Providers.jsx          # Global state management
    │   │   ├── NavigationBar.jsx          # Main navigation component
    │   │   ├── NavigationBar.module.css   # Navigation styling
    │   │   ├── SignInPopUp.jsx            # Authentication modal
    │   │   └── SignInPopUp.module.css     # Sign-in modal styling
    │   ├── js/utils/                      # JavaScript utilities
    │   │   ├── APIcoms.js                 # API communication helpers
    │   │   ├── cookies.js                 # Cookie management
    │   │   └── userHelper.js              # User-related utilities
    │   ├── assets/                        # Static assets
    │   ├── config.js                      # Environment configuration
    │   ├── App.jsx                        # Main React application
    │   ├── main.jsx                       # React entry point
    │   └── index.css                      # Global styles
    ├── public/                            # Static public files
    ├── package.json                       # npm dependencies and scripts
    ├── package-lock.json                  # npm lockfile
    ├── vite.config.js                     # Vite build configuration
    ├── eslint.config.js                   # ESLint configuration
    └── index.html                         # HTML entry point
```

## Project Architecture

This is a full-stack Diet & Fitness website with a Spring Boot backend and React frontend.

### Backend (Spring Boot)
- **Main Application**: `DietFitnessWebsiteBackEndApplication.java` - runs on port 8079
- **Architecture**: Standard Spring Boot layered architecture
  - Controllers: REST API endpoints (`/admin`, `/food`, `/guest`, `/noFilter`, `/post`, `/product`, `/recipe`, `/user`, `/referenceProduct`)
  - Services: Business logic layer
  - Repositories: Data access layer with direct JDBC connections (not JPA repositories)
  - Models: Entity classes (User, Product, FoodItem, Recipe, Post, ReferenceProduct)
  - Security: JWT authentication with custom filters, WebSocket support
  - Integration: Redis caching, RabbitMQ messaging, ChatGPT integration, Stripe payments

### Frontend (React + Vite)
- **Architecture**: React 19 with React Router for navigation
- **Components**: Organized by feature (calculators, admin, general, providers)
- **Key Features**:
  - Health calculators (BMI, TDEE, body fat, calorie burn, sleep)
  - Nutrition planner and meal calculator
  - User authentication with JWT
  - Admin panel
- **API Communication**: Custom utility functions in `js/utils/APIcoms.js`

### Database & External Services
- **MySQL Database**: `diet_fitness_mysql` on localhost:3306
- **Redis**: localhost:6379 for caching
- **RabbitMQ**: localhost for messaging
- **External APIs**: OpenAI, Stripe payments, SendGrid email

## Development Commands

### Backend Development
```bash
cd "back end"
# Run the application
./mvnw spring-boot:run
# Or on Windows
mvnw.cmd spring-boot:run

# Build
./mvnw clean package
```

### Frontend Development
```bash
cd "front end"
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Configuration Notes

- Backend runs on port 8079
- Frontend development server runs on port 5173 (Vite default)
- CORS is configured for multiple origins including localhost:5173, localhost:3000
- JWT tokens expire in 300 seconds with 600-second refresh intervals
- Database credentials are in `application.properties`

## Key Implementation Details

### Authentication Flow
- JWT-based authentication with refresh token mechanism
- Custom security filters handle token validation
- User roles supported (admin functionality exists)
- WebSocket connections also use JWT authentication

### Repository Pattern
- Repositories use direct JDBC connections rather than Spring Data JPA
- Connection details injected via `@Value` annotations from application.properties
- Manual SQL query execution for database operations

### Frontend State Management
- React Context providers for global state
- JWT token stored in cookies with automatic refresh
- API utilities handle authentication headers automatically

### Integration Architecture
- Redis for caching user sessions and IP tracking
- RabbitMQ for asynchronous message processing
- ChatGPT integration for AI-powered features
- Stripe integration for payment processing
- SendGrid for email services

## API Endpoints Structure

### Backend Controller Routes
- `/admin/*` - Administrative operations (requires admin role)
- `/food/*` - Food item management and nutrition data
- `/guest/*` - Public endpoints (no authentication required)
- `/noFilter/*` - Unfiltered endpoints (JWT refresh, public data)
- `/post/*` - Blog/content management
- `/product/*` - Product catalog operations
- `/recipe/*` - Recipe management
- `/user/*` - User account operations
- `/referenceProduct/*` - Reference product data management

### Authentication Flow
1. User login via frontend → JWT token returned
2. Token stored in cookies with 300-second expiration
3. Auto-refresh every 600 seconds via `/noFilter/refresh`
4. All protected endpoints validate JWT in security filters
5. IP-based rate limiting (200 requests max before ban)

## Key Dependencies

### Backend (Maven)
- **Spring Boot 3.4.3** - Main framework
- **MySQL Connector 8.0.31** - Database driver
- **JWT (jjwt) 0.11.5** - Token authentication
- **Redis Jedis 4.2.3** - Caching
- **RabbitMQ 5.16.0** - Message queuing
- **Stripe 22.12.0** - Payment processing
- **SendGrid 4.10.1** - Email service
- **Selenium 4.15.0** - Web scraping
- **BCrypt 0.4** - Password hashing

### Frontend (npm)
- **React 19** - UI framework
- **React Router 7.5.2** - Client-side routing
- **Vite 6.3.1** - Build tool and dev server

## Database Schema (MySQL)

Key entities based on model classes:
- **Users** - User accounts with authentication
- **FoodItem** - Nutrition database (calories, macros per 100g)
- **Product** - Product catalog with nutritional info
- **Recipe** - Recipe collection with ingredients
- **Post** - Blog/content posts
- **ReferenceProduct** - Reference nutrition data

## Security Implementation

### JWT Configuration
- Secret key stored in `application.properties`
- Token max size: 2048 bytes
- Expiration: 300 seconds
- Claims include: userUUID, role

### IP Protection
- Redis-based IP tracking
- Request limit: 200 per IP before ban
- Startup task loads banned IPs from MySQL to Redis cache

### WebSocket Security
- JWT-based authentication for WebSocket connections
- Custom message interceptor validates tokens

## Environment Configuration

### Development
- Backend: `http://localhost:8079`
- Frontend: `http://localhost:5173` (Vite dev server)
- Database: Local MySQL on port 3306
- Redis: Local Redis on port 6379

### CORS Configuration
Multiple allowed origins for development and production:
- localhost:3000, localhost:5173, localhost:7778
- 127.0.0.1:5500, 127.0.0.1:5501
- smartdietlog.com, api.smartdietlog.com

## Common Patterns

### Repository Pattern
- Direct JDBC connections (not Spring Data JPA)
- Connection credentials injected via `@Value` from properties
- Manual SQL execution with try-catch error handling
- Returns string messages for operation status

### Frontend API Communication
- Centralized API utilities in `js/utils/APIcoms.js`
- Automatic JWT token inclusion in headers
- Cookie-based token storage and management
- Base URL switching between dev/prod environments

## Code Style Guidelines

### Backend Java Conventions
- **Package Structure**: Follow existing `Sergejus.DietFitnessWebsiteBackEnd.*` pattern
- **Class Names**: PascalCase (ProductController, UserService, ProductRepository)
- **Method Names**: camelCase with descriptive names (getProductById, registerProduct)
- **Variable Names**: camelCase (productService, authorizationHeader)
- **Constants**: ALL_CAPS with underscores
- **Annotations**: Use Spring annotations (@RestController, @Service, @Repository, @Autowired)

**Controller Pattern:**
```java
@RestController
@RequestMapping("/endpoint")
public class ExampleController {

    @Autowired
    private ExampleService exampleService;

    @GetMapping("/public/{id}")
    public ResponseEntity<Object> getById(@PathVariable int id) {
        Object result = exampleService.getById(id);

        if (result != null) return new ResponseEntity<>(result, HttpStatus.OK);
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
```

**Repository Pattern:**
```java
@Repository
public class ExampleRepository {

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    public boolean createRecord(Object data) {
        String sql = "INSERT INTO table (column1, column2) VALUES (?, ?);";

        try (Connection connection = DriverManager.getConnection(url, username, password);
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setString(1, data.getValue1());
            preparedStatement.setString(2, data.getValue2());

            int rowsCreated = preparedStatement.executeUpdate();
            return rowsCreated > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
```

### Frontend React/JS Conventions
- **Component Names**: PascalCase (NavigationBar, SignInPopUp)
- **File Names**: Match component names (NavigationBar.jsx)
- **CSS Modules**: ComponentName.module.css with kebab-case classes
- **Function Names**: camelCase (handleOpenSignIn, showSignIn)
- **Variable Names**: camelCase (authorizationHeader, productService)
- **Hook Usage**: Consistent destructuring pattern

**Component Pattern:**
```jsx
import styles from "./ComponentName.module.css";
import { useContext } from "react";
import { useCustomHook } from "./Providers/CustomProvider";

function ComponentName() {
  const { value, setValue } = useCustomHook();

  function handleAction() {
    // Handle logic here
  }

  return (
    <div className={styles["component-container"]}>
      <button onClick={handleAction}>
        Action Button
      </button>
    </div>
  );
}

export default ComponentName;
```

**CSS Module Pattern:**
```css
.component-container {
  display: flex;
  flex-direction: column;
  background-color: #0f1f0a;
  border: 1px solid rgba(9, 105, 38, 0.2);
  box-shadow: 1px 0 2px rgba(0, 0, 0, 0.6);
}

.nav-left,
.nav-right {
  /* Use kebab-case for class names */
  background-color: #0f1f0a;
}
```

### General Coding Standards
- **Error Handling**: Always use try-catch blocks for database operations
- **Null Checks**: Validate inputs before processing
- **Response Patterns**: Use ResponseEntity with appropriate HTTP status codes
- **SQL**: Use PreparedStatements to prevent SQL injection
- **Imports**: Group by type (Java standard, Spring, project imports)
- **Spacing**: Consistent indentation and blank lines between methods
- **Authentication**: Always validate JWT tokens for secured endpoints

## Git Repository Configuration

This project is connected to a private GitHub repository:
- **Repository URL**: https://github.com/SergejusBal/DietClaudeAI.git
- **Username**: SergejusBal
- **Email**: Sergejus.balciunas@gmail.com
- **Authentication**: Personal Access Token (stored in Git credential manager)

### Automatic Git Commits
Claude Code will automatically commit changes after significant modifications using:
```bash
git add .
git commit -m "Descriptive commit message with 🤖 Generated with [Claude Code](https://claude.ai/code)"
git push origin main
```

## Troubleshooting

### Common Issues
1. **Database Connection Failed** - Check MySQL service and credentials in `application.properties`
2. **CORS Errors** - Verify frontend URL is in `cors.allowed.origins`
3. **JWT Token Expired** - Check token refresh mechanism and expiration settings
4. **Redis Connection Issues** - Ensure Redis server is running on localhost:6379
5. **Build Failures** - Check Java 21 compatibility and Maven wrapper permissions
6. **Git Push Failed** - Check GitHub authentication and network connection