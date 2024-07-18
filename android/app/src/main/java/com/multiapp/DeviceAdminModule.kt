package com.multiapp

import android.app.admin.DevicePolicyManager
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.app.AppOpsManager
import android.os.Build
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class DeviceAdminModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private var devicePolicyManager: DevicePolicyManager? = null
    private var componentName: ComponentName? = null

    init {
        devicePolicyManager = reactContext.getSystemService(Context.DEVICE_POLICY_SERVICE) as DevicePolicyManager
        componentName = ComponentName(reactContext, MyDeviceAdminReceiver::class.java)
        println("DeviceAdminModule initialized")
    }

    override fun getName(): String {
        return "DeviceAdmin"
    }

    @ReactMethod
    fun enableDeviceAdmin() {
        val intent = Intent(DevicePolicyManager.ACTION_ADD_DEVICE_ADMIN).apply {
            putExtra(DevicePolicyManager.EXTRA_DEVICE_ADMIN, componentName)
            putExtra(DevicePolicyManager.EXTRA_ADD_EXPLANATION, "Your explanation text")
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }
        reactApplicationContext.startActivity(intent)
    }

    @ReactMethod
    fun isDeviceAdminActive(promise: Promise) {
        try {
            println("isDeviceAdminActive method called")
            val isActive = devicePolicyManager?.isAdminActive(componentName ?: throw IllegalStateException("ComponentName is null")) ?: false
            println("Device admin is active: $isActive")
            promise.resolve(isActive)
        } catch (e: Exception) {
            println("Error checking device admin: ${e.message}")
            promise.reject("Error checking device admin", e)
        }
    }

    @ReactMethod
    fun checkUsageStatsPermission(promise: Promise) {
        try {
            val appOps = reactApplicationContext.getSystemService(Context.APP_OPS_SERVICE) as AppOpsManager
            val mode = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                appOps.unsafeCheckOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS, android.os.Process.myUid(), reactApplicationContext.packageName)
            } else {
                appOps.checkOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS, android.os.Process.myUid(), reactApplicationContext.packageName)
            }
            promise.resolve(mode == AppOpsManager.MODE_ALLOWED)
        } catch (e: Exception) {
            promise.reject("ERROR", e.message)
        }
    }
}
