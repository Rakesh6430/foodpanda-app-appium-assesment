/**
 * Find an element by its text content.
 * Works around UiSelector/XPath Bengali text matching issues with Compose.
 * Handles stale element errors during iteration.
 */
async function findByText(text, className = 'android.widget.TextView', timeout = 15000) {
    await browser.waitUntil(async () => {
        const elements = await $$(className);
        for (const el of elements) {
            try {
                const elText = await el.getText();
                if (elText === text) return true;
            } catch { /* stale element, skip */ }
        }
        return false;
    }, { timeout, timeoutMsg: `Element with text "${text}" not found after ${timeout}ms` });

    const elements = await $$(className);
    for (const el of elements) {
        try {
            const elText = await el.getText();
            if (elText === text) return el;
        } catch { /* stale element, skip */ }
    }
    throw new Error(`Element with text "${text}" not found`);
}

/**
 * Find an element whose text contains the given substring.
 */
async function findByTextContains(text, className = 'android.widget.TextView', timeout = 15000) {
    await browser.waitUntil(async () => {
        const elements = await $$(className);
        for (const el of elements) {
            try {
                const elText = await el.getText();
                if (elText.includes(text)) return true;
            } catch { /* stale element, skip */ }
        }
        return false;
    }, { timeout, timeoutMsg: `Element containing text "${text}" not found after ${timeout}ms` });

    const elements = await $$(className);
    for (const el of elements) {
        try {
            const elText = await el.getText();
            if (elText.includes(text)) return el;
        } catch { /* stale element, skip */ }
    }
    throw new Error(`Element containing text "${text}" not found`);
}

/**
 * Check if an element with the given text exists.
 */
async function existsByText(text, className = 'android.widget.TextView', timeout = 5000) {
    try {
        await findByText(text, className, timeout);
        return true;
    } catch {
        return false;
    }
}

/**
 * Check if the Compose action button is enabled.
 */
async function isActionButtonEnabled() {
    try {
        const clickableViews = await $$('//android.view.View[@clickable="true"]');
        if (clickableViews.length === 0) return false;
        const lastView = clickableViews[clickableViews.length - 1];
        return (await lastView.getAttribute('enabled')) === 'true';
    } catch {
        return false;
    }
}

/**
 * Check if text exists on current screen.
 * Tries getPageSource() first (fast), falls back to TextView iteration.
 * Bengali text in Compose often doesn't appear in page source XML.
 * Catches all errors (including crashed UiAutomator2 sessions).
 */
async function screenHasText(text) {
    try {
        const src = await driver.getPageSource();
        if (src.includes(text)) return true;
    } catch {}
    try {
        const tvs = await $$('android.widget.TextView');
        for (const tv of tvs) {
            try {
                if ((await tv.getText()).includes(text)) return true;
            } catch {}
        }
    } catch {}
    return false;
}

/**
 * Wait until text appears on screen (page source + TextView fallback).
 */
async function waitForText(text, timeout = 15000) {
    await browser.waitUntil(async () => {
        return await screenHasText(text);
    }, { timeout, timeoutMsg: `Text "${text}" not found on screen after ${timeout}ms` });
}

/**
 * Click a bottom navigation tab by text.
 * Uses TextView iteration (last 15 elements) — does NOT rely on getPageSource()
 * since Bengali text in Compose often doesn't appear in page source XML.
 */
async function clickBottomTab(tabName, timeout = 15000) {
    let clicked = false;
    await browser.waitUntil(async () => {
        const allTvs = await $$('android.widget.TextView');
        const startIdx = Math.max(0, allTvs.length - 15);
        for (let i = allTvs.length - 1; i >= startIdx; i--) {
            try {
                const elText = await allTvs[i].getText();
                if (elText === tabName) {
                    await allTvs[i].click();
                    clicked = true;
                    return true;
                }
            } catch { /* stale element, skip */ }
        }
        return false;
    }, { timeout, timeoutMsg: `Tab "${tabName}" not clickable after ${timeout}ms` });
    return clicked;
}

/**
 * Check if text exists on current screen using page source (fast, no stale elements).
 * WARNING: Bengali text in Compose may NOT appear in page source. Use screenHasText() instead.
 */
async function existsInPageSource(text) {
    const src = await driver.getPageSource();
    return src.includes(text);
}

/**
 * Ensure we're on the home screen. If not, try pressing BACK and re-checking.
 * Also tries clicking হোম bottom tab as last resort.
 */
async function ensureHome(maxAttempts = 2) {
    try {
        // Quick check — already on home?
        if (await screenHasText('হোম')) return true;

        // Try pressing BACK once (not multiple times to avoid exiting app)
        try { await driver.pressKeyCode(4); } catch { return false; }
        await driver.pause(2000);
        if (await screenHasText('হোম')) return true;

        // Re-activate app if we left it
        try {
            await driver.execute('mobile: activateApp', { appId: 'tech.shikho.android' });
            await driver.pause(3000);
        } catch {}
        if (await screenHasText('হোম')) return true;

        // Last resort: try clicking হোম tab
        try {
            const allTvs = await $$('android.widget.TextView');
            const startIdx = Math.max(0, allTvs.length - 15);
            for (let i = allTvs.length - 1; i >= startIdx; i--) {
                try {
                    if ((await allTvs[i].getText()) === 'হোম') {
                        await allTvs[i].click();
                        await driver.pause(2000);
                        return true;
                    }
                } catch {}
            }
        } catch {}
        return false;
    } catch {
        return false;
    }
}

module.exports = { findByText, findByTextContains, existsByText, isActionButtonEnabled, clickBottomTab, existsInPageSource, screenHasText, waitForText, ensureHome };
