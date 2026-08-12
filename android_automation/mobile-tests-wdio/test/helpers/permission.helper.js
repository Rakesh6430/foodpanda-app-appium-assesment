async function allowNotificationIfPresent() {
    try {
        const allowBtn = await $('id:com.android.permissioncontroller:id/permission_allow_button');
        await allowBtn.waitForExist({ timeout: 5000 });
        await allowBtn.click();
    } catch {
        // No permission dialog
    }
}

module.exports = { allowNotificationIfPresent };
