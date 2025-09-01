# NurturePath E2E Test Automation

Comprehensive end-to-end test automation for the NurturePath healthcare communication platform using Playwright with TypeScript.

## 🚀 Project Overview

This automation framework provides comprehensive testing coverage for:
- **Admin/Provider Login Flow**: Complete authentication journey testing
- **Dashboard Functionality**: Verification of admin-specific UI elements and navigation
- **Cross-browser Compatibility**: Chrome, Firefox, Safari support
- **Responsive Design**: Mobile and desktop viewport testing
- **Error Handling**: Invalid credentials and validation testing

## 📁 Project Structure

```
Automation/
├── config/
│   ├── global-setup.ts      # Global test setup and environment verification
│   ├── global-teardown.ts   # Global test cleanup
│   └── test-config.ts       # Test configuration and constants
├── src/
│   └── pages/
│       ├── BasePage.ts      # Base page object with common functionality
│       ├── LoginPage.ts     # Login page object model
│       └── DashboardPage.ts # Dashboard page object model
├── tests/
│   └── admin-login.spec.ts  # Comprehensive admin login test suite
├── reports/                 # Test reports and screenshots (generated)
├── playwright.config.ts     # Playwright configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)

### Installation

1. **Navigate to the Automation directory:**
   ```bash
   cd d:\WebApp\Automation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

4. **Verify installation:**
   ```bash
   npx playwright --version
   ```

## 🎯 Test Configuration

### Environment Settings
- **Base URL**: `https://nuturepath.netlify.app/`
- **Browser**: Chrome (headed mode for development)
- **Viewport**: 1280x720 (desktop), 375x667 (mobile)
- **Timeouts**: Configurable via `config/test-config.ts`

### Test Credentials
The framework uses predefined test accounts:

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| Patient (Admin) | `test@test.com` | `password` | Primary test account |
| Provider | `dr.johnson@healthcare.com` | `password` | Healthcare provider account |
| Family | `mary.smith@family.com` | `password` | Family member account |

## 🧪 Running Tests

### Basic Test Execution

1. **Run all tests:**
   ```bash
   npx playwright test
   ```

2. **Run specific test file:**
   ```bash
   npx playwright test admin-login.spec.ts
   ```

3. **Run tests in headed mode (with browser UI):**
   ```bash
   npx playwright test --headed
   ```

4. **Run tests with specific browser:**
   ```bash
   npx playwright test --project=chromium
   ```

### Advanced Options

1. **Debug mode (step-by-step execution):**
   ```bash
   npx playwright test --debug
   ```

2. **Run specific test by name:**
   ```bash
   npx playwright test -g "Complete Admin Login Journey"
   ```

3. **Run tests in parallel:**
   ```bash
   npx playwright test --workers=4
   ```

4. **Generate and view test report:**
   ```bash
   npx playwright test
   npx playwright show-report
   ```

## 📊 Test Reports

### Report Types
- **HTML Report**: Interactive report with screenshots and traces
- **JSON Report**: Machine-readable test results
- **JUnit Report**: CI/CD integration compatible

### Viewing Reports
```bash
# View HTML report
npx playwright show-report

# Reports are generated in ./reports/ directory:
# - ./reports/html-report/     (HTML report)
# - ./reports/results.json     (JSON results)
# - ./reports/results.xml      (JUnit XML)
# - ./reports/screenshots/     (Failure screenshots)
```

## 🎮 Test Scenarios

### 1. Complete Admin Login Journey
**File**: `tests/admin-login.spec.ts`
**Test**: `Complete Admin Login Journey - Valid Credentials`

**Scope**:
- ✅ Navigate to login page
- ✅ Fill valid admin credentials
- ✅ Submit login form with loading state verification
- ✅ Verify successful authentication and dashboard redirect
- ✅ Validate admin-specific UI elements
- ✅ Test navigation accessibility
- ✅ Verify responsive design (mobile/desktop)
- ✅ Error-free completion

### 2. Credential Validation Tests
**Tests**:
- `Login Validation - Invalid Credentials`
- `Login Form Validation - Empty Fields`

**Scope**:
- ❌ Invalid credential error handling
- 🔍 Client-side form validation
- 🚫 Empty field submission prevention

### 3. Role-Based Access Tests
**Tests**:
- `Provider Login Flow`
- Multi-role authentication verification

### 4. Session Management Tests
**Tests**:
- `Logout Functionality`
- `Session Persistence - Remember Me`

## 🔧 Configuration

### Browser Settings
```typescript
// playwright.config.ts
use: {
  headless: false,        // Use headed browser for development
  viewport: { width: 1280, height: 720 },
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'on-first-retry'
}
```

### Timeout Configuration
```typescript
// config/test-config.ts
timeouts: {
  action: 30000,          // 30s for clicks, form fills
  navigation: 60000,      // 60s for page loads
  assertion: 10000,       // 10s for assertions
  longRunning: 120000     // 2m for complex operations
}
```

### Custom Selectors
All selectors are centralized in `config/test-config.ts` for easy maintenance.

## 🐛 Debugging

### Debug Failed Tests
1. **View failure screenshots** in `./reports/screenshots/`
2. **Analyze test traces** in HTML report
3. **Run in debug mode**:
   ```bash
   npx playwright test --debug admin-login.spec.ts
   ```

### Common Issues

| Issue | Solution |
|-------|----------|
| Timeout errors | Increase timeouts in `test-config.ts` |
| Element not found | Update selectors in configuration |
| Network failures | Check application availability |
| Browser crashes | Update Playwright: `npx playwright install` |

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
- name: Run Playwright Tests
  run: |
    cd Automation
    npm ci
    npx playwright install --with-deps
    npx playwright test
```

### Report Artifacts
- HTML reports can be published as CI artifacts
- Screenshots and videos preserved for failure analysis
- JUnit XML for test result integration

## 📈 Test Metrics

### Coverage Areas
- ✅ **Authentication**: Login/logout flows
- ✅ **Authorization**: Role-based access control
- ✅ **Navigation**: Inter-page routing
- ✅ **UI Components**: Form validation, error handling
- ✅ **Responsive Design**: Multi-viewport testing
- ✅ **Error Scenarios**: Invalid input handling

### Performance
- Average test execution: ~2-3 minutes per suite
- Parallel execution support for faster CI runs
- Automatic retries for flaky test resilience

## 🤝 Contributing

### Adding New Tests
1. Create page objects in `src/pages/`
2. Add test scenarios in `tests/`
3. Update selectors in `config/test-config.ts`
4. Follow the Page Object Model pattern

### Best Practices
- Use descriptive test names and step descriptions
- Implement proper wait strategies (avoid hard waits)
- Capture screenshots for debugging
- Keep selectors maintainable and readable
- Add assertions for both positive and negative scenarios

## 📝 Changelog

### Version 1.0.0 (September 1, 2025)
- ✅ Initial Playwright setup with TypeScript
- ✅ Complete admin login test implementation
- ✅ Page Object Model architecture
- ✅ Comprehensive test configuration
- ✅ Multi-browser support (Chrome focused)
- ✅ Responsive design testing
- ✅ Error handling and validation tests
- ✅ Report generation and screenshots

---

**Framework Author**: GitHub Copilot  
**Generated**: September 1, 2025  
**Platform**: NurturePath Healthcare Communication Platform
