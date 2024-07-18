package com.multiapp

import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import android.util.Log

class InstalledAppsModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    init {
        Log.d("InstalledAppsModule", "Initialized")
    }

    override fun getName(): String {
        return "InstalledApps"
    }

    @ReactMethod
    fun getInstalledApps(promise: Promise) {
        val pm: PackageManager = reactContext.packageManager
        val apps: List<ApplicationInfo> = pm.getInstalledApplications(PackageManager.GET_META_DATA)
        val appList: WritableArray = WritableNativeArray()

        for (app in apps) {
            val appInfo: WritableMap = WritableNativeMap()
            appInfo.putString("packageName", app.packageName)
            appInfo.putString("appName", app.loadLabel(pm).toString())
            appList.pushMap(appInfo)
        }

        promise.resolve(appList)
    }
}
