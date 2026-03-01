# Social Authentication Guide (Facebook, Google, Apple)

## Summary

**You can implement the frontend part**, but **you need your friend (backend) for it to work completely**.

## What you can do (Frontend)

1. ✅ Install social authentication libraries
2. ✅ Create UI and buttons
3. ✅ Implement social login flow
4. ✅ Get tokens from providers (Facebook, Google, Apple)
5. ✅ Send tokens to API

## What the backend needs to do

1. ❌ Create endpoints to receive social tokens
2. ❌ Validate tokens with Facebook/Google/Apple
3. ❌ Create/update user in database
4. ❌ Generate JWT token from your API
5. ❌ Return token to app

## Social Authentication Flow

```
1. User clicks "Login with Google"
   ↓
2. App opens Google login screen
   ↓
3. User authorizes → Google returns token
   ↓
4. App sends token to your API: POST /auth/social/google
   ↓
5. Backend validates token with Google
   ↓
6. Backend creates/updates user in database
   ↓
7. Backend returns JWT token from your API
   ↓
8. App saves token and navigates to Dashboard
```

## Endpoints the Backend needs to create

### 1. Login with Google
```
POST /auth/social/google
Body: {
  "token": "google_id_token",
  "role": "Client" | "Restaurant" | "Deliver"  // optional
}
Response: {
  "access_token": "your_api_jwt_token",
  "user": { ... }
}
```

### 2. Login with Facebook
```
POST /auth/social/facebook
Body: {
  "token": "facebook_access_token",
  "role": "Client" | "Restaurant" | "Deliver"  // optional
}
Response: {
  "access_token": "your_api_jwt_token",
  "user": { ... }
}
```

### 3. Login with Apple
```
POST /auth/social/apple
Body: {
  "token": "apple_identity_token",
  "role": "Client" | "Restaurant" | "Deliver"  // optional
}
Response: {
  "access_token": "your_api_jwt_token",
  "user": { ... }
}
```

## Recommended Libraries

### For Expo/React Native:
- **expo-auth-session**: For OAuth (Google, Facebook)
- **expo-apple-authentication**: For Apple Sign In (iOS)
- **@react-native-google-signin/google-signin**: Alternative for Google

## Required Configuration

### Google:
1. Create project in [Google Cloud Console](https://console.cloud.google.com/)
2. Configure OAuth 2.0 Client ID
3. Add callback URLs

### Facebook:
1. Create app in [Facebook Developers](https://developers.facebook.com/)
2. Configure Facebook Login
3. Get App ID and App Secret

### Apple:
1. Configure in Apple Developer Account
2. Enable "Sign in with Apple" capability
3. Configure Service ID

## Next Steps

1. **You (Frontend)**: Implement UI and SDK integration
2. **Your friend (Backend)**: Create endpoints and token validation
3. **Test**: Complete authentication flow

## Important Note

Social buttons already exist in the UI, but they don't have functionality yet. You can implement the frontend part now, but it will only work when the backend is ready.
