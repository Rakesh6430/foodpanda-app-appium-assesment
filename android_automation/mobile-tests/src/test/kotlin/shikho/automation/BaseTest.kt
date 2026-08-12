package shikho.automation

import io.appium.java_client.android.AndroidDriver
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.TestInfo
import org.openqa.selenium.OutputType
import java.io.File
import java.nio.file.Files
import java.nio.file.Path
import java.time.Instant

open class BaseTest {
    protected lateinit var driver: AndroidDriver
    private lateinit var config: Config

    @BeforeEach
    fun setUp() {
        config = Config.load()
        driver = DriverFactory.createAndroidDriver(config)
    }

    @AfterEach
    fun tearDown(testInfo: TestInfo) {
        runCatching {
            saveScreenshot(testInfo)
        }
        runCatching {
            driver.quit()
        }
    }

    private fun saveScreenshot(testInfo: TestInfo) {
        if (!::driver.isInitialized) return
        val bytes = driver.getScreenshotAs(OutputType.BYTES)
        val dir = Path.of("build", "artifacts", "screenshots")
        Files.createDirectories(dir)

        val safeName = testInfo.displayName
            .replace(Regex("[^a-zA-Z0-9._-]+"), "_")
            .take(120)

        val file = dir.resolve("${Instant.now().toEpochMilli()}_$safeName.png")
        Files.write(file, bytes)
    }
}

