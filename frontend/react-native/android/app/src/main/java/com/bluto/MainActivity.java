package com.bluto;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.location.Location;
import android.location.LocationManager;
import android.location.LocationListener;

import androidx.annotation.CallSuper;
import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.preference.PreferenceManager;
import com.bluto.R;
import com.bluto.strict.database.AppDatabase;
import com.bluto.strict.service.TracingService;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.lifecycle.ViewModelProvider;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.UUID;

import com.google.android.gms.nearby.Nearby;
import com.google.android.gms.nearby.connection.AdvertisingOptions;
import com.google.android.gms.nearby.connection.ConnectionInfo;
import com.google.android.gms.nearby.connection.ConnectionLifecycleCallback;
import com.google.android.gms.nearby.connection.ConnectionResolution;
import com.google.android.gms.nearby.connection.ConnectionsClient;
import com.google.android.gms.nearby.connection.DiscoveredEndpointInfo;
import com.google.android.gms.nearby.connection.DiscoveryOptions;
import com.google.android.gms.nearby.connection.EndpointDiscoveryCallback;
import com.google.android.gms.nearby.connection.Payload;
import com.google.android.gms.nearby.connection.PayloadCallback;
import com.google.android.gms.nearby.connection.PayloadTransferUpdate;
import com.google.android.gms.nearby.connection.PayloadTransferUpdate.Status;
import com.google.android.gms.nearby.connection.Strategy;

public class MainActivity extends ReactActivity {

    public static final String PREFERENCE_DATA_OK = "data_ok";
    private static final String LOG_TAG = "Bluto";

    private static final String[] REQUIRED_PERMISSIONS =
            new String[] {
                    Manifest.permission.BLUETOOTH,
                    Manifest.permission.BLUETOOTH_ADMIN,
                    Manifest.permission.FOREGROUND_SERVICE,
                    Manifest.permission.ACCESS_FINE_LOCATION,
                    Manifest.permission.RECEIVE_BOOT_COMPLETED,
                    Manifest.permission.INTERNET,
            };
    private final int MY_PERMISSIONS_REQUEST_ACCESS_FINE_LOCATION = 1;

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "bluto";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }
    private static final int REQUEST_CODE_REQUIRED_PERMISSIONS = 1;

    private static final String API_URL = "http://api.bluto.eu:8080/cases";
    private static final LocationListener locationListener = new LocationListener() {
        public void onLocationChanged(Location location) {
            double lat = location.getLatitude();
            // TODO: remove line
            lat = 42.1;
            double lon = location.getLongitude();
            // TODO: remove line
            lon = 42.1;
            UUID uuid = UUID.randomUUID();
            // TODO: round doubles
            String urlString = API_URL + "?lat=" + lat + "&long=" + lon;
            Log.d(LOG_TAG, "Querying API at: " + urlString);
            try {
                URL url = new URL(urlString);
                HttpURLConnection urlConnection = null;
                try {
                    urlConnection = (HttpURLConnection) url.openConnection();
                    BufferedReader bufferedReader = new BufferedReader(
                            new InputStreamReader(urlConnection.getInputStream())
                    );
                    StringBuilder stringBuilder = new StringBuilder();
                    String line;
                    while ((line = bufferedReader.readLine()) != null) {
                        stringBuilder.append(line).append("\n");
                    }
                    bufferedReader.close();
                    String result = stringBuilder.toString();
                    Log.d(LOG_TAG, "Result: " + result);
                    // TODO: Check if result contains a UUID that is in the local database
                    // If yes, switch state
                } catch (IOException e) {
                    Log.e(LOG_TAG, "Could not query API. " + e.toString());
                } finally {
                    if (urlConnection != null) {
                        urlConnection.disconnect();
                    }
                }
            } catch (MalformedURLException e) {
                Log.e(LOG_TAG, "Malformed URL " + urlString);
            }
        }

        @Override
        public void onStatusChanged(String s, int i, Bundle bundle) {}

        @Override
        public void onProviderEnabled(String s) {}

        @Override
        public void onProviderDisabled(String s) {}
    };

    @RequiresApi(api = Build.VERSION_CODES.M)
    @SuppressLint("MissingPermission")
    @CallSuper
    @Override
    protected void onStart() {
        super.onStart();
        Log.d(LOG_TAG, "onStart");

        if (hasPermissions(this, REQUIRED_PERMISSIONS)) {
            startTracingService();
            LocationManager lm = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
            lm.requestLocationUpdates(
                    LocationManager.GPS_PROVIDER,
                    2000,
                    10,
                    locationListener
            );
        } else {
            requestPermissions(REQUIRED_PERMISSIONS, REQUEST_CODE_REQUIRED_PERMISSIONS);
        }
    }

    @Override
    @CallSuper
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Log.d(LOG_TAG, "onCreate");
        if (hasPermissions(this, REQUIRED_PERMISSIONS)) {
            startTracingService();
        }
    }

    @Override
    @CallSuper
    protected void onDestroy() {
        super.onDestroy();
        Log.d(LOG_TAG, "onDestroy");
        stopTracingService();
    }

    /** Returns true if the app was granted all the permissions. Otherwise, returns false. */
    private static boolean hasPermissions(Context context, String... permissions) {
        for (String permission : permissions) {
            if (ContextCompat.checkSelfPermission(context, permission)
                    != PackageManager.PERMISSION_GRANTED) {
                return false;
            }
        }
        return true;
    }

    private void startTracingService() {
        Log.d(LOG_TAG, "startTracingService");
        Intent intent = new Intent(this, TracingService.class);
        ContextCompat.startForegroundService(this, intent);
    }

    public void stopTracingService() {
        Log.d(LOG_TAG, "stopTracingService");
        Intent intent = new Intent(this, TracingService.class);
        stopService(intent);
    }

    /** Handles user acceptance (or denial) of our permission request. */
    @CallSuper
    @Override
    public void onRequestPermissionsResult(
            int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode != REQUEST_CODE_REQUIRED_PERMISSIONS) {
            return;
        }

        for (int i = 0; i <= grantResults.length; ++i) {
            if (grantResults[i] == PackageManager.PERMISSION_DENIED) {
                Log.e(LOG_TAG, "Permission denied: " + permissions[i]);
                Toast.makeText(this, R.string.error_missing_permissions, Toast.LENGTH_LONG).show();
                finish();
                return;
            }
        }
        recreate();
    }
}
