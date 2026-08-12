package shikho.automation.helpers

import io.appium.java_client.android.AndroidDriver
import org.openqa.selenium.By
import org.openqa.selenium.support.ui.ExpectedConditions
import org.openqa.selenium.support.ui.WebDriverWait
import java.time.Duration

object PermissionHelper {

    fun allowNotificationIfPresent(driver: AndroidDriver) {
        try {
            val wait = WebDriverWait(driver, Duration.ofSeconds(5))
            val allowButton = wait.until(ExpectedConditions.elementToBeClickable(
                By.id("com.android.permissioncontroller:id/permission_allow_button")
            ))
            allowButton.click()
        } catch (_: Exception) {
            // No permission dialog shown
        }
    }
}
