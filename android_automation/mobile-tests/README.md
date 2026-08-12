# Shikho Mobile Tests (Appium + Kotlin)

This project runs automated UI tests against the Shikho Android app using Appium (UiAutomator2) and Kotlin + JUnit5.

## Prerequisites (local)
- Java 17+
- Android SDK + platform-tools (adb)
- An Android emulator (AVD) or a connected device
- Appium Server v2.x with the `uiautomator2` driver installed

## Quick start
1. Start an emulator (or connect a device).
2. Start Appium server (default `http://127.0.0.1:4723`).
3. Put your APK path in `src/test/resources/config.properties`.
4. Run:

```bash
./gradlew test
```

## Configuration
Edit `src/test/resources/config.properties` (or override with environment variables):
- `appium.serverUrl`
- `android.appPath`
- `android.deviceName`
- `android.platformVersion`

