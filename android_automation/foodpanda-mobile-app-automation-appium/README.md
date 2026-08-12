# Android App Automation

UI test automation for an Android app: **JavaScript + WebdriverIO 9 + Appium (UiAutomator2) + Mocha + Allure**.

Tests run against a physical Android device. Device serial and APK path are configured in [wdio.conf.js](wdio.conf.js).

## Prerequisites

- Node.js and npm
- Android device connected via ADB with the serial configured in `wdio.conf.js`
- Appium v2.x server running on port 4723 (not auto-started — `services: []` in the WDIO config)

## Setup

```bash
npm install
```

## Running Tests

```bash
npm test                                                          # clean results, run all specs, generate + open Allure report
npm run wdio                                                      # run all specs without cleaning results
npx wdio run wdio.conf.js --spec test/specs/login.e2e.js          # run a single spec file
npm run report                                                    # regenerate and open Allure HTML report
npm run server                                                    # start web UI at http://localhost:3000 to pick + run specs, streams logs live
```

**Before running:** connect the target Android device and start the Appium server (`appium`) on port 4723.

## Project Structure

```
test/
  specs/          # Mocha test suites (*.e2e.js) — one file per feature
  pageobjects/    # Page Object classes — one per screen
  data/
    util.js                  # BasePage singleton with scroll/keyboard/app-lifecycle helpers
    testdata.js              # Test data: credentials, UI strings, course/payment data
    generatePhoneNumber.js   # Generates random phone numbers for registration tests
    lastRegisteredNumber.json  # Persisted across runs
    routineData.js             # Locators/expected text for the Class Routine screen
  resources/      # APK file
wdio.conf.js      # WDIO + Appium capabilities, hooks, reporters
server.js         # Express runner — exposes /api/specs + /api/run (SSE) for the web UI
public/index.html # Web UI served by server.js
```

**Test suites (12):** login, student registration, parent registration, forget password, logout, free-user homepage, paid-user homepage, purchase flow, complete profile, subject list, live class, class routine.

## Switching Devices

The active device serial is set under `appium:deviceName` in `wdio.conf.js`, with alternate device serials commented out alongside it. Coordinate taps in page objects are hardcoded to the current device's screen resolution — recalibration is needed when switching devices.

## Reporting

Allure results are written to `allure-results/` (auto-cleaned on `npm test`). Failed tests auto-capture screenshots. Set `SKIP_ALLURE_OPEN=1` to suppress the automatic report opening.

## More Details

See [CLAUDE.md](CLAUDE.md) for architecture notes, selector strategy, test-data reference, and known gotchas.
