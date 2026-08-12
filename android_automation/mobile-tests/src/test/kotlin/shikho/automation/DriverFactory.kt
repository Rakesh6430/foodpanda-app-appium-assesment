package shikho.automation

import io.appium.java_client.android.AndroidDriver
import io.appium.java_client.android.options.UiAutomator2Options
import org.openqa.selenium.remote.RemoteWebDriver
import java.net.URL
import java.time.Duration

object DriverFactory {
    fun createAndroidDriver(config: Config): AndroidDriver {
        val options = UiAutomator2Options()
            .setDeviceName(config.deviceName)
            .setApp(config.appPath)
            .setNoReset(config.noReset)
            .setNewCommandTimeout(Duration.ofSeconds(120))

        config.platformVersion?.let { options.setPlatformVersion(it) }
        config.appPackage?.let { options.setAppPackage(it) }
        config.appActivity?.let { options.setAppActivity(it) }

        val url = URL(config.appiumServerUrl.toString())
        val driver = AndroidDriver(url, options)

        // Prefer explicit waits; keep implicit wait at 0 for predictability.
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(0))
        return driver
    }
}

