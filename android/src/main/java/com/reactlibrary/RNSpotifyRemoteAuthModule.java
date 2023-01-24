
package com.reactlibrary;

import android.app.Activity;
import android.content.Intent;
import android.util.Base64;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.spotify.android.appremote.api.ConnectionParams;
import com.spotify.sdk.android.auth.AuthorizationClient;
import com.spotify.sdk.android.auth.AuthorizationRequest;
import com.spotify.sdk.android.auth.AuthorizationResponse;

import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.ArrayList;


@ReactModule(name = "RNSpotifyRemoteAuth")
public class RNSpotifyRemoteAuthModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    private static final int REQUEST_CODE = 1337;
    private final ReactApplicationContext reactContext;
    private Promise authPromise;
    private AuthorizationResponse mAuthResponse;
    private ReadableMap mConfig;
    private ConnectionParams.Builder mConnectionParamsBuilder;
    private static final String CODE_VERIFIER = getCodeVerifier();

    public ConnectionParams.Builder getConnectionParamsBuilder() {
        return mConnectionParamsBuilder;
    }

    public RNSpotifyRemoteAuthModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
        this.reactContext = reactContext;
    }

    private static String getCodeVerifier() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] code = new byte[64];
        secureRandom.nextBytes(code);
        return Base64.encodeToString(code, Base64.URL_SAFE | Base64.NO_WRAP | Base64.NO_PADDING);
    }

    public static String getCodeChallenge(String verifier) {
        byte[] bytes = verifier.getBytes();
        MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
        messageDigest.update(bytes, 0, bytes.length);
        byte[] digest = messageDigest.digest();
        return Base64.encodeToString(digest, Base64.URL_SAFE | Base64.NO_WRAP | Base64.NO_PADDING);
    }

    @ReactMethod
    public void authorize(ReadableMap config, Promise promise) {
        mConfig = config;
        String clientId = mConfig.getString("clientID");
        String redirectUri = mConfig.getString("redirectURL");
        Boolean showDialog = mConfig.getBoolean("showDialog");
        String[] scopes = convertScopes(mConfig);
        AuthorizationResponse.Type responseType = mConfig.hasKey("authType") ?
                AuthorizationResponse.Type.valueOf(mConfig.getString("authType"))
                : AuthorizationResponse.Type.TOKEN;

        mConnectionParamsBuilder = new ConnectionParams.Builder(clientId)
                .setRedirectUri(redirectUri)
                .showAuthView(showDialog);

        authPromise = promise;

        AuthorizationRequest.Builder builder = new AuthorizationRequest.Builder(
                clientId,
                responseType,
                redirectUri
        );
        builder.setScopes(scopes);
        builder.setCustomParam("code_challenge_method", "S256");
        builder.setCustomParam("code_challenge", getCodeChallenge(CODE_VERIFIER));
        AuthorizationRequest request = builder.build();
        AuthorizationClient.openLoginActivity(getCurrentActivity(), REQUEST_CODE, request);
    }

    @Override
    public void onNewIntent(Intent intent) {
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_CODE) {
            AuthorizationResponse response = AuthorizationClient.getResponse(resultCode, data);

            switch (response.getType()) {
                // Response was successful and contains auth token/code
                case TOKEN:
                case CODE:
                    if (authPromise != null) {
                        mAuthResponse = response;
                        ReadableMap responseMap = Convert.toMap(response);
                        responseMap.putString("code_verifier", CODE_VERIFIER);
                        authPromise.resolve(responseMap);
                    }
                    break;

                // Auth flow returned an error
                case ERROR:
                    if (authPromise != null) {
                        String code = response.getCode();
                        String error = response.getError();
                        authPromise.reject(code, error);
                        mConnectionParamsBuilder = null;
                    }
                    break;

                // Most likely auth flow was cancelled
                default:
                    if (authPromise != null) {
                        String code = "500";
                        String error = "Cancelled";
                        authPromise.reject(code, error);
                        mConnectionParamsBuilder = null;
                    }
            }
        }
    }

    @ReactMethod
    public void getSession(Promise promise) {
        promise.resolve(Convert.toMap(mAuthResponse));
    }

    @ReactMethod
    public void endSession(Promise promise) {
        mAuthResponse = null;
        mConnectionParamsBuilder = null;
        mConfig = null;

        AuthorizationClient.clearCookies(this.getReactApplicationContext());

        RNSpotifyRemoteAppModule remoteModule = reactContext.getNativeModule(RNSpotifyRemoteAppModule.class);
        if (remoteModule != null) {
            remoteModule.disconnect(promise);
        } else {
            promise.resolve(null);
        }
    }

    public String[] convertScopes(ReadableMap config) {
        ReadableArray arrayOfScopes = config.getArray("scopes");

        ArrayList<String> scopesArrayList = new ArrayList<String>();

        for (int i = 0; i < arrayOfScopes.size(); i++) {
            String scope = arrayOfScopes.getString(i);
            scopesArrayList.add(scope);
        }

        return scopesArrayList.toArray(new String[scopesArrayList.size()]);
    }

    @Override
    public String getName() {
        return "RNSpotifyRemoteAuth";
    }
}
