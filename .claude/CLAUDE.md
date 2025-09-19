# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

```
YogaWebsite/
└── front end/                            # React + Vite frontend application
    ├── src/
    │   ├── Components/
    │   │   ├── general/                   # Shared/common components
    │   │   │   └── Confirm.jsx            # Confirmation dialogs
    │   │   ├── Providers/                 # React context providers
    │   │   │   ├── AuthProvider.jsx       # Authentication state management
    │   │   │   ├── ConfirmProvider.jsx    # Confirmation dialog provider
    │   │   │   ├── SignInProvider.jsx     # Sign-in modal provider
    │   │   │   └── Providers.jsx          # Global state management
    │   │   ├── NavigationBar.jsx          # Main navigation component
    │   │   ├── NavigationBar.module.css   # Navigation styling
    │   │   ├── SignInPopUp.jsx            # Authentication modal (currently commented out)
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

This is a Yoga website built with React and Vite. Currently it's a frontend-only application with placeholder routes ready for yoga-specific content.

### Frontend (React + Vite)
- **Architecture**: React 19 with React Router for navigation
- **Components**: Organized by feature (general utilities, state providers)
- **Current Features**:
  - Navigation system ready for yoga content
  - Authentication infrastructure (ready for future backend)
  - State management providers
  - Placeholder routes for yoga sections
- **Future Ready**: Authentication utilities and API communication helpers prepared for backend integration

## Development Commands

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

- Frontend development server runs on port 5173 (Vite default)
- Authentication infrastructure is ready for future backend integration
- Environment configuration in `config.js` for easy setup

## Key Implementation Details

### Frontend State Management
- React Context providers for global state management
- Authentication provider ready for future backend integration
- Confirmation dialog provider for user interactions
- Sign-in modal provider for authentication UI

### Future Authentication Infrastructure
- JWT token utilities prepared in `userHelper.js`
- API communication helpers in `APIcoms.js`
- Cookie management for token storage
- Ready for backend integration when needed

## Current Route Structure

### Frontend Routes
- `/` - Home page (placeholder for yoga content)
- `/meal_calculator` - Placeholder (can be repurposed for yoga nutrition)
- `/tdee_calculator` - Placeholder (can be repurposed for yoga fitness)
- `/bmi_calculator` - Placeholder (can be repurposed for yoga health)
- `/bodyfat_calculator` - Placeholder (can be repurposed for yoga fitness)
- `/calorie_burn` - Placeholder (can be repurposed for yoga exercise)
- `/sleep_calculator` - Placeholder (can be repurposed for yoga wellness)
- `/recipe` - Placeholder (can be repurposed for yoga nutrition)
- `/products` - Placeholder (can be repurposed for yoga equipment/gear)
- `/aboutus` - About page placeholder
- `/profile` - User profile placeholder
- `/admin` - Admin functionality placeholder

## Key Dependencies

### Frontend (npm)
- **React 19** - UI framework
- **React Router 7.5.2** - Client-side routing
- **Vite 6.3.1** - Build tool and dev server

## Environment Configuration

### Development
- Frontend: `http://localhost:5173` (Vite dev server)
- Ready for backend integration at any port when needed

## Common Patterns

### Frontend API Communication
- Centralized API utilities in `js/utils/APIcoms.js`
- Prepared for JWT token inclusion in headers
- Cookie-based token storage system ready
- Environment-based URL configuration in `config.js`

## Code Style Guidelines

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
- **Error Handling**: Always use try-catch blocks for async operations
- **Null Checks**: Validate inputs before processing
- **Imports**: Group by type (React, external libraries, project imports)
- **Spacing**: Consistent indentation and blank lines between functions
- **Future Authentication**: Structure ready for JWT token validation when backend is added

## Git Repository Configuration

This project is connected to a GitHub repository:
- **Repository URL**: https://github.com/SergejusBal/YogaClaudeAI.git
- **Username**: SergejusBal
- **Email**: Sergejus.balciunas@gmail.com

### Automatic Git Commits
Claude Code will automatically commit changes after significant modifications using:
```bash
git add .
git commit -m "Descriptive commit message with 🤖 Generated with [Claude Code](https://claude.ai/code)"
git push origin master
```

## Troubleshooting

### Common Issues
1. **Build Failures** - Run `npm install` in the front end directory
2. **Port Conflicts** - Default dev server runs on port 5173
3. **Import Errors** - Check file paths and component exports
4. **Git Push Failed** - Check GitHub authentication and network connection