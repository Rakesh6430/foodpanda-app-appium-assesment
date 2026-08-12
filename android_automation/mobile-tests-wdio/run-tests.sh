#!/bin/bash
# Run tests and generate report — single command

export ANDROID_HOME="$HOME/Library/Android/sdk"
export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH"

# 1. Start Appium if not running
if ! pgrep -f "appium" > /dev/null; then
    echo "Starting Appium server..."
    appium --relaxed-security &
    sleep 5
else
    echo "Appium already running"
fi

# 2. Check emulator
if ! adb devices | grep -q "emulator"; then
    echo "Starting Android emulator..."
    emulator -avd "$(emulator -list-avds | head -1)" -no-audio &
    echo "Waiting for emulator to boot..."
    adb wait-for-device
    sleep 30
else
    echo "Emulator already running"
fi

# 3. Run tests
SUITE=${1:-smoke}
echo "Running $SUITE tests..."
npx wdio run wdio.conf.js --suite "$SUITE"

# 4. Generate report
echo "Generating report..."
allure generate allure-results --clean -o allure-report 2>/dev/null
allure open allure-report 2>/dev/null &

echo "Done! Report opening in browser."
