# Playwright Automation Framework

![Playwright Tests](https://github.com/sinemayk/playwright-automation-framework/actions/workflows/playwright.yml/badge.svg)

📊 [Live Test Report (Allure)](https://sinemayk.github.io/playwright-automation-framework/)

A test automation framework built from scratch using Playwright and TypeScript, designed to closely resemble a production environment. It combines the Page Object Model, custom fixtures, API testing, network simulation, CI/CD and automated notification (n8n + Slack) integrations.

## Why Does This Repo Exist?

This project is an example project built from scratch with a clean architecture, building upon the learning process from the [playwright_code](https://github.com/sinemayk/playwright_code), [playwright-pom](https://github.com/sinemayk/playwright-pom) and [playwright_bdd](https://github.com/sinemayk/playwright_bdd) repositories, built from scratch with a clean architecture. Whilst the other three repositories demonstrate the learning stages, this repository showcases the consolidated, production-ready version of the practices gained.

## Topics Covered

- **Page Object Model**: Page objects derived from the common `BasePage` class
- **Custom Fixtures**: Automatic injection of page objects using `test.extend()`
- **Data-Driven Testing**: Generating multiple scenarios from separate data files
- **API Testing**: Token-based authentication flow, dynamic test data with Faker
- **Network Simulation**: Simulating real network requests with `page.route()`
- **CI/CD**: Running automated tests on every push with GitHub Actions
- **CI/CD**: Running automated tests with every push using GitHub Actions
- **Reporting**: Allure reports are published live via GitHub Pages
- **Notification Automation**: CI results are sent to Slack via an n8n workflow
  
## Project Structure

```
playwright-automation-framework/
├── .github/workflows/
│   └── playwright.yml
├── src/
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   └── InventoryPage.ts
│   ├── fixtures/
│   │   └── page-fixtures.ts
│   ├── test-data/
│   │   └── login-cases.ts
│   └── utils/
│       └── date-helper.ts
├── tests/
│   ├── ui/
│   │   ├── login.spec.ts
│   │   └── mocked-api.spec.ts
│   └── api/
│       └── booking.spec.ts
├── .env.example
├── playwright.config.ts
└── README.md
```

## Installation

```bash
git clone https://github.com/sinemayk/playwright-automation-framework.git
cd playwright-automation-framework
npm install
npx playwright install --with-deps
cp .env.example .env
```
Open the `.env` file and fill in the required values ​​(all values ​​used in this project are public demo/test data and do not contain sensitive information):

```
BASE_URL=https://www.saucedemo.com
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce
BOOKER_BASE_URL=https://restful-booker.herokuapp.com
BOOKER_USERNAME=admin
BOOKER_PASSWORD=password123
```

## Running Tests

All tests:
```bash
npx playwright test
```

UI tests only:
```bash
npx playwright test tests/ui
```

API tests only:
```bash
npx playwright test tests/api
```

In a specific browser:
```bash
npx playwright test --project=chromium
```

## Reporting

Playwright's built-in HTML report:
```bash
npx playwright show-report
```

Allure report (local):
```bash
npx allure serve allure-results
```

You can use the "Live Test Report" link above to directly access the latest report generated in CI.

## Architecture Notes

### Page Object Model + Custom Fixtures
Each page object extends `BasePage` and shares common methods like `goto` and `getTitle`. Instead of instantiating page objects manually, tests automatically receive them via `src/fixtures/page-fixtures.ts`:

```ts
test("example", async ({ loginPage, inventoryPage }) => {
// loginPage and inventoryPage are provided automatically; no need to write new LoginPage(page)
});
```

### API Testing and Dynamic Data
`tests/api/booking.spec.ts` tests the workflow of obtaining a token and creating a booking against the restful-booker API. Reservation dates are generated dynamically on each run using `@faker-js/faker` to ensure they always fall in the future (`src/utils/date-helper.ts`); this prevents the test from failing due to "past date" errors over time.

### Network Mocking
`tests/ui/mocked-api.spec.ts` mocks an API request using `page.route()` without ever hitting the actual server. This enables testing of error scenarios (such as 500 errors or timeouts) without relying on a real backend. For demonstration purposes, the request is triggered directly from within the browser context; the same technique can be applied exactly as-is to `fetch` or `XHR` calls made by a real application.

## CI/CD

On every push to the `main` branch, GitHub Actions automatically:
1. Installs dependencies
2. Installs Playwright browsers (Chromium, Firefox, WebKit)
3. Runs the entire test suite
4. Generates HTML and Allure reports
5. Publishes the Allure report to GitHub Pages
6. Notifies a Slack channel of the result (success/failure) via n8n

## Known Environment Limitation (Windows)

In local development environments on Windows, the **Smart App Control** feature sometimes prevents the Firefox and WebKit browser binaries from executing (as unsigned executables are blocked by this feature). Consequently, local testing was limited to Chromium. **This limitation does not exist in the CI environment (GitHub Actions, Ubuntu), where all three browsers run without issues**—please check the Actions tab or the live report above for the latest results. ## Related Projects

- [playwright_code](https://github.com/sinemayk/playwright_code) — Advanced fixture/auth strategies and API tests
- [playwright-pom](https://github.com/sinemayk/playwright-pom) — A clean implementation of the Page Object Model
- [playwright_bdd](https://github.com/sinemayk/playwright_bdd) — Business-focused scenario writing using BDD/Gherkin

## License

This project was created for learning and portfolio purposes.
