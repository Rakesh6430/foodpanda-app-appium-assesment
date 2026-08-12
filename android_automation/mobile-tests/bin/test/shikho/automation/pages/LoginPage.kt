package shikho.automation.pages

import io.appium.java_client.android.AndroidDriver
import org.openqa.selenium.By
import org.openqa.selenium.support.ui.ExpectedConditions
import org.openqa.selenium.support.ui.WebDriverWait
import java.time.Duration

class LoginPage(private val driver: AndroidDriver) {

    private val wait = WebDriverWait(driver, Duration.ofSeconds(15))

    private val phoneNumberInput = By.className("android.widget.EditText")
    private val privacyCheckbox = By.className("android.widget.CheckBox")
    private val countryCodeText = By.xpath("//android.widget.TextView[@text='+88']")
    private val titleText = By.xpath("//android.widget.TextView[@text='মোবাইল নম্বর দিয়ে এগিয়ে যান']")
    private val continueButtonContainer = By.xpath("//android.widget.TextView[@text='এগিয়ে যান']/parent::android.view.View")

    fun isDisplayed(): Boolean {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(titleText)).isDisplayed
    }

    fun enterPhoneNumber(number: String): LoginPage {
        val input = wait.until(ExpectedConditions.elementToBeClickable(phoneNumberInput))
        input.click()
        input.clear()
        input.sendKeys(number)
        return this
    }

    fun isPrivacyCheckboxChecked(): Boolean {
        val checkbox = wait.until(ExpectedConditions.presenceOfElementLocated(privacyCheckbox))
        return checkbox.getAttribute("checked") == "true"
    }

    fun togglePrivacyCheckbox(): LoginPage {
        val checkbox = wait.until(ExpectedConditions.elementToBeClickable(privacyCheckbox))
        checkbox.click()
        return this
    }

    fun isContinueButtonEnabled(): Boolean {
        val button = driver.findElement(continueButtonContainer)
        return button.getAttribute("clickable") == "true"
    }

    fun tapContinue() {
        val button = wait.until(ExpectedConditions.elementToBeClickable(continueButtonContainer))
        button.click()
    }

    fun getCountryCode(): String {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(countryCodeText)).text
    }
}
