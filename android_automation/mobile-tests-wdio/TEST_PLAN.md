# Shikho App - Test Automation Plan

## 1. Regression Doc Summary

Source: `[Template] Regression Test Report for Shikho App.xlsx` — 35 sheets, ~3,500 manual test cases.

| # | Sheet | Cases | Automatable | Notes |
|---|-------|-------|-------------|-------|
| 1 | New Registration | 185 | High | Onboarding, signup, OTP, identity, class/group selection |
| 2 | Login | 170 | High | Phone entry, password, forgot password, validation |
| 3 | Home | 103 | High | Page sections, cards, navigation, stories, practice quiz |
| 4 | Academic program details page | 34 | High | Course detail page content, buttons |
| 5 | Animated Course details page | 65 | Medium | Course cards, content, navigation |
| 6 | Purchase Flow | 83 | Medium | Program cards, enrollment, checkout, payment |
| 7 | Coupon(New) | 160 | Low | CMS/admin-side coupon management |
| 8 | Animated Homework | 25 | Medium | Requires paid user with assigned homework |
| 9 | Quiz Homework | 60 | Medium | Requires paid user with assigned homework |
| 10 | Live class | 72 | Low | Requires scheduled live class on server |
| 11 | Live Exam | 71 | Low | Requires scheduled live exam on server |
| 12 | Class Routine | 85 | Medium | Requires paid user with routine data |
| 13 | Report Card | 54 | Medium | Requires paid user with report data |
| 14 | Subject Details Page | 119 | High | Subject list, chapter index, content |
| 15 | Course Menu | 144 | High | Bottom tab navigation, course listing, filters |
| 16 | Animated Card from Home | 78 | Medium | Animated course cards on home |
| 17 | Online Coaching Course | 77 | Medium | Online course detail and purchase |
| 18 | Bundle Course | 280 | Medium | Bundle course flows for paid users |
| 19 | Syllabus Change | 48 | Medium | Requires paid user |
| 20 | Video Download | 61 | Low | Download + offline playback, device storage dependent |
| 21 | Mandatory Form | 112 | High | School form, profile completion modal |
| 22 | Profile | 170 | High | Profile page, edit, settings, logout |
| 23 | Location | 10 | High | Location permission and sharing |
| 24 | PDF Live Exam Session | 67 | Low | Requires completed live exam with PDF |
| 25 | One way inbox | 35 | Low | CMS-driven inbox messages |
| 26 | CQ (Subject+Chapter) | 31 | Medium | Practice CQ PDF download |
| 27 | Multiple Program Switch | 52 | Medium | Requires multi-program paid user |
| 28 | Same Program Multiple Class | 34 | Low | CMS configuration |
| 29 | Adding group Support | 40 | Medium | Group selection during registration |
| 30 | Same live class multiple program | 8 | Low | Server-side tagging |
| 31 | Model Test | 114 | Low | Requires scheduled model test |
| 32 | Model test CQ flow | 243 | Low | Requires active model test session |
| 33 | Installment | 130 | Medium | Installment payment for paid users |
| 34 | Admission exam | 493 | Low | Requires scheduled admission exam slots |
| 35 | Free Trial | 25 | High | Free trial card, enrollment |

Automatable ratings:
- **High** = Fully client-side, deterministic, no server scheduling needed
- **Medium** = Needs specific user state (paid account) or semi-dynamic content
- **Low** = Requires server-scheduled content, CMS setup, or admin actions


## 2. Current Coverage

| Test File | Sheet Mapped | Tests | What It Covers |
|-----------|-------------|-------|----------------|
| login.test.js | Login | 4 | Display, country code, privacy checkbox, login |
| signup.test.js | New Registration | 1 | Full signup happy path |
| school.test.js | Mandatory Form | 1 | Signup + school form |
| quiz.test.js | Home (practice quiz) | 1 | Practice quiz 10 questions + submit |
| freetrial.test.js | Purchase Flow / Free Trial | 1 | Enrollment flow to payment page |
| stories.test.js | Home (stories) | 1 | Stories scroll + shorts view |
| shikho-ai.test.js | (not in doc) | 1 | AI tab, video dialog, ask question |

**Total: 7 files, ~10 test cases covering ~3% of the regression doc.**


## 3. What Cannot Be Automated (Skip)

These sheets require server-side scheduling, CMS admin actions, or are not app-side:

| Sheet | Reason |
|-------|--------|
| Coupon(New) | CMS admin panel, not app |
| Live class | Needs scheduled live class at exact time |
| Live Exam | Needs scheduled live exam |
| PDF Live Exam Session | Needs completed live exam with generated PDF |
| One way inbox | CMS-pushed messages |
| Same Program Multiple Class | CMS configuration |
| Same live class multiple program | Server-side tagging |
| Model Test | Needs scheduled model test |
| Model test CQ flow | Needs active model test session |
| Admission exam | Needs scheduled exam slots from admin |

**~1,200 cases skipped** — these are better covered by manual testing or require a staging environment with API-driven test data setup.


## 4. Priority Tiers

### P0 — Smoke (run every build, <5 min total)
Core user journeys that must never break.

| Test | Source Sheet | Scope |
|------|-------------|-------|
| Registration (happy path) | New Registration | Signup with OTP, identity, info, password |
| Login (happy path) | Login | Phone + password login to home |
| Home page loads | Home | Home screen sections visible, bottom tabs work |

### P1 — Core (run daily, <20 min total)
Key features that define the app experience.

| Test | Source Sheet | Scope |
|------|-------------|-------|
| Login (extended) | Login | Wrong password, empty fields, forgot password link |
| Registration (extended) | New Registration | Onboarding screens, validation, class/group selection |
| Home navigation | Home | Scroll sections, stories, practice quiz entry, Shikho AI |
| Profile | Profile | View profile, edit name, change password, logout |
| Course menu | Course Menu | Bottom tab, course listing, filters, search |
| Purchase flow | Purchase Flow + Free Trial | Program card, enrollment, checkout |
| Mandatory form | Mandatory Form | School form, profile completion |

### P2 — Feature (run per release, <40 min total)
Feature-specific flows for enrolled/paid users.

| Test | Source Sheet | Scope |
|------|-------------|-------|
| Academic program details | Academic program details | Course detail page content, buttons |
| Animated course | Animated Course details + Animated Card | Course cards, details, navigation |
| Subject details | Subject Details Page | Subject list, chapter index |
| Quiz homework | Quiz Homework | Homework card, quiz flow |
| Animated homework | Animated Homework | Homework card, lesson flow |
| Class routine | Class Routine | Routine page, day navigation |
| Report card | Report Card | Report card sections |
| Video download | Video Download | Download initiation (not full offline test) |
| Location | Location | Permission flows |
| Syllabus change | Syllabus Change | Syllabus selection |
| Online coaching | Online Coaching Course | Course detail, purchase |
| Bundle course | Bundle Course | Bundle listing, details |
| Installment | Installment | Installment plan flow |
| Program switch | Multiple Program Switch | Switch between programs |
| Group support | Adding group Support | Group selection in registration |
| CQ download | CQ (Subject+Chapter) | Practice CQ PDF |


## 5. Test Accounts Needed

| Account | Phone | Type | Purpose |
|---------|-------|------|---------|
| Free user (Class 8) | 01867000023 | Existing | Login, home, stories, AI, general browsing |
| Free user (Class 8) | 01867000019 | Existing | Enrollment/purchase flows (not yet enrolled) |
| Paid user | TBD | Existing | Homework, routine, report card, subject details |
| Multi-program user | TBD | Existing | Program switch tests |
| Fresh signup | 01867000024+ | New | Registration tests (increment per run) |


## 6. Shared Code to Extract

### auth.flow.js — Login/Signup Helper
Every test repeats ~80 lines of login/signup + location + school form handling. Extract to:

```
loginWithPassword(phone, password)  — clear app, launch, handle onboarding, login, handle location/school
signupNewUser(phone)                — clear app, launch, onboarding, OTP, identity, info, password, home
waitForHome()                       — wait for home screen via getText() iteration
handleLocationSharing()             — dismiss location dialog if shown
handleSchoolForm()                  — fill school form if shown
```

### Expected reduction: Each test file goes from ~100 lines setup to ~5 lines.


## 7. wdio.conf.js Suite Configuration

```js
suites: {
    smoke: ['./test/smoke/**/*.test.js'],
    core:  ['./test/core/**/*.test.js'],
    feature: ['./test/feature/**/*.test.js'],
    all:   ['./test/**/*.test.js'],
},
```

Run commands:
```bash
npx wdio run wdio.conf.js --suite smoke      # P0 — every build
npx wdio run wdio.conf.js --suite core        # P1 — daily
npx wdio run wdio.conf.js --suite feature     # P2 — per release
npx wdio run wdio.conf.js                     # all suites
npx wdio run wdio.conf.js --spec test/core/profile.test.js  # single file
```


## 8. Proposed Directory Structure

```
test/
├── helpers/
│   └── find.helper.js                 # existing — findByText, findByTextContains, existsByText
│
├── pages/                             # existing page objects
│   ├── onboarding.page.js
│   ├── login.page.js
│   ├── otp.page.js
│   └── profile.page.js
│
├── flows/                             # NEW — shared multi-screen flows
│   └── auth.flow.js                   # loginWithPassword(), signupNewUser(), waitForHome()
│
├── smoke/                             # P0 — must-pass, every build
│   ├── registration.test.js           # New Registration (happy path)
│   ├── login.test.js                  # Login (happy path + basic validation)
│   └── home.test.js                   # Home page loads, bottom tabs visible
│
├── core/                              # P1 — daily
│   ├── login-extended.test.js         # Login edge cases, forgot password
│   ├── registration-extended.test.js  # Onboarding details, validation, group selection
│   ├── home-navigation.test.js        # Home scroll, stories, sections
│   ├── profile.test.js                # Profile view, edit, logout
│   ├── course-menu.test.js            # Course tab, listing, filters
│   ├── purchase-flow.test.js          # Enrollment, checkout, free trial
│   ├── mandatory-form.test.js         # School form, profile completion modal
│   └── shikho-ai.test.js             # AI tab, dialogs, ask question
│
└── feature/                           # P2 — per release
    ├── academic-program.test.js       # Academic program detail page
    ├── animated-course.test.js        # Animated course cards + details
    ├── subject-details.test.js        # Subject list, chapter index
    ├── quiz-homework.test.js          # Quiz homework flow
    ├── animated-homework.test.js      # Animated homework flow
    ├── class-routine.test.js          # Routine page (paid user)
    ├── report-card.test.js            # Report card (paid user)
    ├── video-download.test.js         # Video download initiation
    ├── location.test.js               # Location permission scenarios
    ├── syllabus-change.test.js        # Syllabus change (paid user)
    ├── online-coaching.test.js        # Online coaching course detail
    ├── bundle-course.test.js          # Bundle course flows
    ├── installment.test.js            # Installment payment
    ├── program-switch.test.js         # Multi-program switch
    └── group-support.test.js          # Group selection in registration
```


## 9. Implementation Order

Phase 1 — Foundation (refactor existing tests):
1. Create `flows/auth.flow.js` — extract shared login/signup logic
2. Refactor existing 7 test files to use auth flow
3. Move existing files into smoke/core/feature folders
4. Update wdio.conf.js with suite configuration

Phase 2 — Smoke suite (P0):
5. Expand `smoke/registration.test.js` — add onboarding verification, more signup checks
6. Expand `smoke/login.test.js` — add basic validation (empty phone, wrong password)
7. Create `smoke/home.test.js` — verify home sections load, all bottom tabs accessible

Phase 3 — Core suite (P1):
8. Create `core/profile.test.js` — profile view, edit, settings
9. Create `core/course-menu.test.js` — course tab navigation
10. Create `core/login-extended.test.js` — forgot password, edge cases
11. Create `core/registration-extended.test.js` — detailed onboarding, group selection
12. Move and expand purchase/enrollment tests

Phase 4 — Feature suite (P2):
13. Tests requiring paid user accounts (homework, routine, report card)
14. Tests requiring specific content (subject details, animated courses)
15. Remaining feature-specific tests


## 10. Mapping: Regression Doc Sheet -> Test File

| Sheet | Test File | Priority |
|-------|-----------|----------|
| New Registration | smoke/registration.test.js + core/registration-extended.test.js | P0 + P1 |
| Login | smoke/login.test.js + core/login-extended.test.js | P0 + P1 |
| Home | smoke/home.test.js + core/home-navigation.test.js | P0 + P1 |
| Academic program details page | feature/academic-program.test.js | P2 |
| Animated Course details page | feature/animated-course.test.js | P2 |
| Purchase Flow | core/purchase-flow.test.js | P1 |
| Coupon(New) | SKIP (CMS) | — |
| Animated Homework | feature/animated-homework.test.js | P2 |
| Quiz Homework | feature/quiz-homework.test.js | P2 |
| Live class | SKIP (scheduled) | — |
| Live Exam | SKIP (scheduled) | — |
| Class Routine | feature/class-routine.test.js | P2 |
| Report Card | feature/report-card.test.js | P2 |
| Subject Details Page | feature/subject-details.test.js | P2 |
| Course Menu | core/course-menu.test.js | P1 |
| Animated Card from Home | feature/animated-course.test.js (combined) | P2 |
| Online Coaching Course | feature/online-coaching.test.js | P2 |
| Bundle Course | feature/bundle-course.test.js | P2 |
| Syllabus Change | feature/syllabus-change.test.js | P2 |
| Video Download | feature/video-download.test.js | P2 |
| Mandatory Form | core/mandatory-form.test.js | P1 |
| Profile | core/profile.test.js | P1 |
| Location | feature/location.test.js | P2 |
| PDF Live Exam Session | SKIP (scheduled) | — |
| One way inbox | SKIP (CMS) | — |
| CQ (Subject+Chapter) | feature/ (if needed) | P2 |
| Multiple Program Switch | feature/program-switch.test.js | P2 |
| Same Program Multiple Class | SKIP (CMS) | — |
| Adding group Support | feature/group-support.test.js | P2 |
| Same live class multiple program | SKIP (server) | — |
| Model Test | SKIP (scheduled) | — |
| Model test CQ flow | SKIP (scheduled) | — |
| Installment | feature/installment.test.js | P2 |
| Admission exam | SKIP (scheduled) | — |
| Free Trial | core/purchase-flow.test.js (combined) | P1 |

**Automated: 25 sheets (~2,300 cases) | Skipped: 10 sheets (~1,200 cases)**
