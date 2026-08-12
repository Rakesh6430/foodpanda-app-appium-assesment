package shikho.automation

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test

class SmokeLaunchTest : BaseTest() {

    @Test
    fun appLaunchesAndSessionIsAlive() {
        // Minimal smoke: verify driver session exists (app installed/launched).
        val sessionId = driver.sessionId
        assertThat(sessionId).isNotNull
    }
}

