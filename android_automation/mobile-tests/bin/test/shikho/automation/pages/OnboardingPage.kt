package shikho.automation.pages

import io.appium.java_client.android.AndroidDriver
import org.openqa.selenium.By
import org.openqa.selenium.support.ui.ExpectedConditions
import org.openqa.selenium.support.ui.WebDriverWait
import java.time.Duration

class OnboardingPage(private val driver: AndroidDriver) {

    private val wait = WebDriverWait(driver, Duration.ofSeconds(15))

    private val continueButton = By.xpath("//android.widget.TextView[@text='এগিয়ে যান']/parent::android.view.View")

    fun isDisplayed(): Boolean {
        return try {
            wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//android.widget.TextView[contains(@text, 'স্বাগত')]")
            )).isDisplayed
        } catch (_: Exception) {
            false
        }
    }

    fun tapContinue() {
        val button = wait.until(ExpectedConditions.elementToBeClickable(continueButton))
        button.click()
    }
}
