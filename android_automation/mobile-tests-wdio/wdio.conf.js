const path = require('path');

exports.config = {
    runner: 'local',
    specs: ['./test/*.test.js'],
    maxInstances: 1,

    suites: {
        smoke: ['./test/smoke/**/*.test.js'],
        core: ['./test/core/**/*.test.js'],
        feature: ['./test/feature/**/*.test.js'],
    },

    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'Android Emulator',
        'appium:appPackage': 'tech.shikho.android',
        'appium:appActivity': '.ui.feature.splash.SplashActivity',
        'appium:automationName': 'UiAutomator2',
        'appium:noReset': true,
        'appium:autoGrantPermissions': true,
        'appium:newCommandTimeout': 120,
        'appium:appWaitForLaunch': true,
        'appium:appWaitDuration': 30000,
        'appium:chromedriverExecutable': '/opt/homebrew/bin/chromedriver',
    }],

    logLevel: 'warn',
    bail: 0,
    waitforTimeout: 15000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    port: 4723,
    services: [],

    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 300000,
    },

    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }],
    ],

    afterTest: async function (test, context, { error }) {
        if (error) {
            await driver.takeScreenshot();
        }
    },

    /**
     * Cooldown between spec files to prevent AccessibilityNodeInfo timeouts.
     * Back-to-back clearApp + activateApp overwhelms the emulator.
     */
    after: async function () {
        try {
            await driver.pause(5000);
        } catch {}
    },
};
