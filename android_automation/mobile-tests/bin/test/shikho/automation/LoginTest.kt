package shikho.automation

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import shikho.automation.helpers.PermissionHelper
import shikho.automation.pages.LoginPage
import shikho.automation.pages.OnboardingPage
import shikho.automation.pages.OtpPage

class LoginTest : BaseTest() {

    private lateinit var loginPage: LoginPage

    @BeforeEach
    fun navigateToLogin() {
        PermissionHelper.allowNotificationIfPresent(driver)
        val onboarding = OnboardingPage(driver)
        if (onboarding.isDisplayed()) {
            onboarding.tapContinue()
        }
        loginPage = LoginPage(driver)
    }

    @Test
    fun loginScreenIsDisplayed() {
        assertThat(loginPage.isDisplayed()).isTrue()
    }

    @Test
    fun countryCodeDefaultsToBangladesh() {
        assertThat(loginPage.getCountryCode()).isEqualTo("+88")
    }

    @Test
    fun privacyCheckboxIsCheckedByDefault() {
        assertThat(loginPage.isPrivacyCheckboxChecked()).isTrue()
    }

    @Test
    fun continueButtonDisabledWithEmptyPhone() {
        assertThat(loginPage.isContinueButtonEnabled()).isFalse()
    }

    @Test
    fun continueButtonEnabledAfterEnteringValidPhone() {
        loginPage.enterPhoneNumber("01534536204")
        assertThat(loginPage.isContinueButtonEnabled()).isTrue()
    }

    @Test
    fun continueButtonDisabledWhenPrivacyUnchecked() {
        loginPage.enterPhoneNumber("01534536204")
        loginPage.togglePrivacyCheckbox()
        assertThat(loginPage.isContinueButtonEnabled()).isFalse()
    }

    @Test
    fun successfulLoginWithOtp() {
        loginPage.enterPhoneNumber("01534536204")
        loginPage.tapContinue()

        val otpPage = OtpPage(driver)
        assertThat(otpPage.isDisplayed()).isTrue()

        otpPage.enterOtp("1234")
        otpPage.tapVerify()

        // After OTP verification, a "set password" bottom sheet appears
        // which confirms login was successful
        val passwordSheetTitle = org.openqa.selenium.support.ui.WebDriverWait(driver, java.time.Duration.ofSeconds(15))
            .until(org.openqa.selenium.support.ui.ExpectedConditions.visibilityOfElementLocated(
                org.openqa.selenium.By.xpath("//android.widget.TextView[contains(@text, 'পাসওয়ার্ড')]")
            ))
        assertThat(passwordSheetTitle.isDisplayed).isTrue()
    }
}
