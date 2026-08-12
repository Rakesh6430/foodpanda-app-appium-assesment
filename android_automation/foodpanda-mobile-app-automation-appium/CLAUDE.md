# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Shikho Android app UI test automation: **JavaScript + WebdriverIO 9 + Appium (UiAutomator2) + Mocha + Allure**. Tests run against a physical Android device (`8BGY0ZH96`, Pixel, Android 12 — set in [wdio.conf.js](wdio.conf.js)). Current APK: `[DEV]Shikho - 5.6.3-563-22-Apr-2026 09-46-00 AM.apk` (~137 MB). App package: `tech.shikho.android`, main activity: `DashBoardActivity`. Note: other team-member device serials are commented out in `wdio.conf.js` — uncomment as needed.

## Commands

```bash
npm test                                                          # clean results, run all specs, generate + open Allure report
npm run wdio                                                      # run all specs without cleaning results
npx wdio run wdio.conf.js --spec test/specs/login.e2e.js          # run a single spec file
npm run report                                                    # regenerate and open Allure HTML report
npm run server                                                    # start Express runner at http://localhost:3000 — pick + run specs from a web UI, streams logs via SSE
```

**Before running:** connect the Android device whose serial is in `wdio.conf.js`, then start Appium v2.x server on port 4723 (the WDIO config does **not** auto-start Appium — `services: []`).

## Architecture

```
test/
  specs/          # Mocha test suites (*.e2e.js) — one file per feature
  pageobjects/    # Page Object classes — one per screen
  data/
    util.js                  # BasePage singleton with scroll/keyboard/app-lifecycle helpers
    testdata.js              # All test data: credentials, Bengali UI strings, course/payment data
    generatePhoneNumber.js   # Generates random BD phone numbers for registration tests
    lastRegisteredNumber.json  # Persisted across runs by saveRegisteredNumber()
    routineData.js             # Locator strings and expected text for the Class Routine screen
  resources/      # APK file
wdio.conf.js      # WDIO + Appium capabilities, hooks, reporters
server.js         # Express runner — exposes /api/specs + /api/run (SSE) for the web UI
public/index.html # Web UI served by server.js
```

**Spec files (12):** `login.e2e.js`, `student-registration.e2e.js`, `parent-registration.e2e.js`, `forget-password-page.e2e.js`, `logout.e2e.js`, `freeUser-Homepage.e2e.js`, `paid-user-homepage.e2e.js`, `purchase-flow.e2e.js`, `completeProfile.e2e.js`, `subjectlist.e2e.js`, `live_Class.e2e.js`, `routine.e2e.js`.

**Test flow pattern:** Each spec's `before()` calls `BasePage.dismissNotificationPopup()` → `SplashScreen.skipOnboarding()`. Specs that need a logged-in state also call `LoginPage.login(number, password)` → `BasePage.handleLocationSharing()` → `SchoolFormPage.fillSchoolFormIfVisible()`. (The location-sharing call is required even on accounts that have completed the school form — the dialog can reappear.) Individual `it()` blocks then navigate and assert.

**Conditional-content pattern:** Specs that depend on backend state ([paid-user-homepage.e2e.js](test/specs/paid-user-homepage.e2e.js), [live_Class.e2e.js](test/specs/live_Class.e2e.js)) use **discovery `it()` blocks** that probe the screen and set module-scoped booleans (`hasScheduledClass`, `isEmptyState`, `hasHomework`, `isOngoing`). Downstream `it()` blocks early-`return` if the flag is false rather than calling `this.skip()`. New tests touching variable-state screens should follow this convention so a missing live class / empty homework section is a pass, not a failure.

**Page Objects** (`test/pageobjects/*.page.js`): define locators as `get` properties and expose action/validation methods. They do not extend `BasePage` — each imports `util.js` directly when shared helpers are needed. All methods are `async`. Exported as singletons (`module.exports = new ClassName()`). Note: [test/pageobjects/calendar.page.js](test/pageobjects/calendar.page.js) is currently an empty 0-byte stub — no class is exported and no spec consumes it yet.

**`BasePage` (util.js):** Singleton (`module.exports = new BasePage()`). Key methods:

- `launchApp()` — terminate → clear → activate with retry logic for AccessibilityNodeInfo timeouts
- `dismissNotificationPopup()` — handles Android permission dialog on first launch
- `handleLocationSharing()` — uses `getPageSource()` + coordinate tap; avoids stale elements from Compose transitions
- `scrollToElement(text)` — `UiScrollable.scrollIntoView` for vertical
- `scrollHoritonallyToElement(text, maxScrolls)` — loop-based horizontal scroll
- `scrollVerticalByPartial()` — W3C Actions API swipe when UiScrollable is unreliable
- `scrollToEndByForward(maxScrolls)` — scrolls to end via UiScrollable.scrollForward
- `scrollUpToElement(text)` — scrolls backward (up) via UiScrollable.scrollBackward

## Device Configuration

The active device serial is set in `wdio.conf.js` under `appium:deviceName`. Commented-out alternatives:

- `8BGY0ZH96` — Pixel (currently active), Android 12
- `CNXYD21329205542` — Mostakim's device
- `CNXNU20C09207554` — Arif's device
- `Medium_Phone_API_36.1` — emulator

To switch devices, comment/uncomment the relevant `appium:deviceName` line in `wdio.conf.js`. **Coordinate taps are hardcoded to the Pixel's resolution** — if switching devices, all `mobile: clickGesture` calls in page objects will need recalibration.

To update the APK, change `appium:app` in `wdio.conf.js`. WebView tests require Chromedriver; set `chromedriverExecutable` in capabilities if needed (e.g., `/opt/homebrew/bin/chromedriver` for Homebrew Chrome 134).

## UiAutomator2 Selector Patterns

```javascript
// Preferred order:
$('android=new UiSelector().resourceId("tech.shikho.android:id/some_id")');
$("~AccessibilityId");
$('android=new UiSelector().text("exact text")');
$('android=new UiSelector().textContains("partial")');
$('android=new UiSelector().className("android.widget.EditText").instance(0)');
```

XPath only as last resort. **Exception:** Compose fields nested inside `tech.shikho.android:id/school_edit_compose_view` (e.g. guardian name, guardian mobile, education medium in `completeProfile.page.js`) cannot be reached by any other strategy — XPath is the only option there. Bengali text matching via `getText()` is more reliable than XPath or page source for Jetpack Compose screens. The `wdio.conf.js` `before` hook sets implicit wait to `0` — always use explicit waits (`waitForDisplayed`, `waitForExist`). Mocha test timeout is 120000ms.

## Key Gotchas

- **Compose elements**: `button.enabled` always returns `true`; verify disabled state functionally. Stale elements are common during screen transitions — wrap in try/catch.
- **Bengali text in Compose**: `getPageSource()` may not include text visible via `getText()`. Iterate TextViews directly using `$$('android.widget.TextView')`.
- **Coordinate taps**: Use `driver.execute('mobile: clickGesture', { x, y })` when Compose onClick handlers don't fire after UiScrollable interactions. Bounds in page object comments indicate the source UI hierarchy coordinates used.
- **Keyboard**: `driver.pressKeyCode(4)` (BACK) is more reliable than `driver.hideKeyboard()`. Use `driver.pressKeyCode(66)` to send Enter/search.
- **`UiScrollable` on home page**: Accidentally clicks elements while scrolling — use `scrollVerticalByPartial()` (W3C swipe gesture) instead.
- **`driver.pause()`**: Used liberally for Compose transition stability. Prefer explicit waits where possible but some pauses are unavoidable.
- **Modal detection**: Use `driver.getPageSource()` with `src.includes(bengaliText)` to detect Compose modals — element queries on Compose overlays produce stale references.
- **School form submit**: Button element has empty text; submit by clicking `android.widget.Button` class selector, not by text. `fillSchoolFormIfVisible()` both verifies content AND fills the form.
- **Dropdown items in Compose**: Not directly clickable via element `.click()`. Locate item text, get its bounds, then coordinate-tap the center.
- **Checkbox selection near Compose text**: When a CheckBox lacks a direct label, use proximity matching — find the text element, get its Y center, then iterate all `$$('android.widget.CheckBox')` and pick the one with the closest Y center. See `_getCheckboxForOption()` in `completeProfile.page.js`.
- **Date picker dismiss**: The "ঠিক আছে" confirm button in the date picker (`android.view.View.instance(7)`) must be tapped via computed bounds (`getLocation` + `getSize`) rather than a direct `.click()` — Compose wraps it in a non-standard view.

## Test Data

Defined in [test/data/testdata.js](test/data/testdata.js). Exported buckets:

- `loginData` — `validNumber: '01478957171'`, `validPassword: '111111'`, plus `trialEnrollNumber`, `freeCourseEnrollNumber`, `purchasedNumber` (the paid-user account used by `paid-user-homepage`, `subjectlist`, `live_Class`)
- `registrationData` — name/password defaults for new sign-ups
- `invalidData` — invalid number / OTP `2345` / wrong password / wrong promo code / wrong bKash number
- `contentText` — Bengali UI strings keyed by screen (splash, numberInput, otp, userType, studentForm, parentForm, passwordSet, registrationSuccess, password, forgetPassword, passwordModal)
- `schoolFormData` — Division `Dhaka`, District `Dhaka`, school name prefix `ideal`
- `courseData` — `freeTrialData`, `freeCourseData`, `otherCourse` (used by free-user homepage + purchase-flow)
- `subjectListData` — course title `অটোমেশন এপি কোর্স`, expected quarter + subject list (used by `subjectlist.e2e.js`)
- `liveClassData` — `scheduleData`, `classResourceData`, `chapterResourceData`, `subjectResourceData`, `ongoingData` (used by `live_Class.e2e.js`)
- `checkoutData`, `paymentMethodData` — checkout form, bKash flow data
- `purchasedUserData`, `freetrialUserData` — paid/trial homepage section strings
- `mandatoryProfileData`, `completeProfilePageData`, `completeProfileModalData`, `shareLocationModalData` — complete-profile flow

**Valid OTP `1234` only works for the `0186700000X` range** in the DEV app. But [test/data/generatePhoneNumber.js](test/data/generatePhoneNumber.js) currently generates a **random** BD prefix (`013`–`019` + 8 random digits) — so a generated number will almost never fall in the OTP-`1234` window. Registration specs that call `generatePhoneNumber()` will fail at the OTP step unless the generator is changed or a known-good number is plugged in. `saveRegisteredNumber()` persists the last number to `lastRegisteredNumber.json` for cross-run inspection.

## Reporting

Allure results are written to `allure-results/` (auto-cleaned by `onPrepare` hook when running `npm test`). Failed tests auto-capture screenshots via the `afterTest` hook. The `onComplete` hook auto-generates and opens the HTML report at `allure-report/`. Set `SKIP_ALLURE_OPEN=1` env var to suppress auto-open (used by `server.js`).
