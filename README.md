# LA NACION Playwright Test Suite

Automated end-to-end tests for [LA NACION](https://www.lanacion.com.ar/) website validation.

## Key Features
- Header & footer visibility tests
- First article content validation
- Network request monitoring
- HTML test reports

## Installation

1. **Prerequisites**
   - Node.js v18+
   - npm v9+

2. **Clone repository**
   ```bash
   git clone git@github.com:ernestoalbarez/lanacion.git
   cd lanacion
   ```

2. **Install dependencies**
    ```bash
    npm install
    npx playwright install
    ```

## Running Tests
```bash
npm run test
```

## Test Reports
HTML Report
```bash
npx playwright show-report
```



## Test Structure
```bash
src/
├── pages/
├── fixtures/
└── tests/
    ├── e2e/
    └── network/
```

## Key Test Cases
1. **Header Validation**
    - Main logo visibility
    - Navigation links functionality

2. **Home Article Validation**
    - First article presence
    - Title/content validation
    - Article link verification

3. **Article Validation**
    - Article title presence
    - Article content validation
    - Article header validation
    - Article footer validation

4. **Network Validation**
    - All lanacion.com.ar requests return 2xx status from homepage
    - All lanacion.com.ar requests return 2xx status from article
