package shikho.automation

import java.io.File
import java.net.URI
import java.util.Properties

data class Config(
    val appiumServerUrl: URI,
    val appPath: String,
    val deviceName: String,
    val platformVersion: String?,
    val appPackage: String?,
    val appActivity: String?,
    val noReset: Boolean,
) {
    companion object {
        fun load(): Config {
            val props = Properties()
            Config::class.java.classLoader.getResourceAsStream("config.properties")?.use { props.load(it) }

            fun get(key: String): String? = System.getenv(key) ?: props.getProperty(key)
            fun getReq(key: String): String = get(key)?.takeIf { it.isNotBlank() }
                ?: error("Missing required config: $key")

            val serverUrl = URI.create(get("appium.serverUrl") ?: "http://127.0.0.1:4723")
            val appPath = getReq("android.appPath")
            require(File(appPath).exists()) { "APK not found at android.appPath: $appPath" }

            val deviceName = (get("android.deviceName") ?: "Android Emulator").trim()
            val platformVersion = get("android.platformVersion")?.trim()?.takeIf { it.isNotEmpty() }
            val appPackage = get("android.appPackage")?.trim()?.takeIf { it.isNotEmpty() }
            val appActivity = get("android.appActivity")?.trim()?.takeIf { it.isNotEmpty() }
            val noReset = (get("android.noReset") ?: "false").trim().toBooleanStrictOrNull() ?: false

            return Config(
                appiumServerUrl = serverUrl,
                appPath = appPath,
                deviceName = deviceName,
                platformVersion = platformVersion,
                appPackage = appPackage,
                appActivity = appActivity,
                noReset = noReset,
            )
        }
    }
}

