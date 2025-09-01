# Test Configuration Notes

## Quick Start Guide

### 1. First Time Setup
```bash
cd d:\WebApp\Automation
npm install
npx playwright install
```

### 2. Verify Setup
```bash
# Check TypeScript compilation
npm run lint

# List all tests
npx playwright test --list

# Run a quick validation test
npm run test:admin
```

### 3. Common Commands
```bash
# Run all tests with browser UI (recommended for first run)
npm run test:headed

# Run specific test
npx playwright test --grep "Complete Admin Login Journey"

# Debug a test step by step
npm run test:debug

# View test report
npm run test:report
```

## Configuration Notes

### Test Credentials (Pre-configured)
- **Admin/Patient**: test@test.com / password
- **Provider**: dr.johnson@healthcare.com / password  
- **Family**: mary.smith@family.com / password

### Environment Settings
- **Target URL**: https://nuturepath.netlify.app/
- **Browser**: Chrome (headed mode by default)
- **Viewport**: 1280x720
- **Timeouts**: 30s actions, 60s navigation

### Customization
- Edit `config/test-config.ts` to modify URLs, timeouts, or credentials
- Update `playwright.config.ts` for browser settings
- Modify selectors in `config/test-config.ts` if UI changes

## Troubleshooting

### Common Issues
1. **Application not accessible**: Verify https://nuturepath.netlify.app/ is reachable
2. **Test timeouts**: Increase timeouts in `config/test-config.ts`
3. **Element not found**: Check if selectors need updating
4. **Credentials invalid**: Verify test accounts exist in the system

### Debug Mode
Use `npm run test:debug` to step through tests manually and inspect elements.
