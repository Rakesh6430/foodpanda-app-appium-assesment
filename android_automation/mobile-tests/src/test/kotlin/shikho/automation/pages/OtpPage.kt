package shikho.automation.pages

import io.appium.java_client.android.AndroidDriver
import org.openqa.selenium.By
import org.openqa.selenium.support.ui.ExpectedConditions
import org.openqa.selenium.support.ui.WebDriverWait
import java.time.Duration

class OtpPage(private val driver: AndroidDriver) {

    private val wait = WebDriverWait(driver, Duration.ofSeconds(15))

    private val titleText = By.xpath("//android.widget.TextView[@text='মোবাইল নম্বর ভেরিফাই করুন']")
    private val otpInput = By.className("android.widget.EditText")
    private val verifyButtonContainer = By.xpath("//android.widget.TextView[@text='ভেরিফাই করুন']/parent::android.view.View")

    fun isDisplayed(): Boolean {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(titleText)).isDisplayed
    }

    fun enterOtp(otp: String): OtpPage {
        val input = wait.until(ExpectedConditions.elementToBeClickable(otpInput))
        input.click()
        input.sendKeys(otp)
        return this
    }

    fun tapVerify() {
        val button = wait.until(ExpectedConditions.elementToBeClickable(verifyButtonContainer))
        button.click()
    }
}
