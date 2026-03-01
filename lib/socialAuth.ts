/**
 * Social Authentication Helper
 * 
 * ⚠️ IMPORTANT: This code will only work when the backend has the endpoints ready!
 * 
 * The backend needs to create:
 * - POST /auth/social/google
 * - POST /auth/social/facebook  
 * - POST /auth/social/apple
 */

import { API_BASE_URL } from './api';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Platform, Alert } from 'react-native';

/**
 * Login with Google
 * 
 * To work, you need:
 * 1. Install: npm install expo-auth-session
 * 2. Configure Google OAuth in Google Cloud Console
 * 3. Backend needs endpoint: POST /auth/social/google
 */
export async function loginWithGoogle(role?: 'Client' | 'Restaurant' | 'Deliver') {
  try {
    // TODO: Configure with your Google credentials
    const discovery = {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
    };

    const request = new AuthSession.AuthRequest({
      clientId: 'YOUR_GOOGLE_CLIENT_ID', // Replace with your Client ID
      scopes: ['openid', 'profile', 'email'],
      responseType: AuthSession.ResponseType.Token,
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    });

    const result = await request.promptAsync(discovery);

      if (result.type === 'success' && result.params.access_token) {
      // Send token to backend
      const response = await fetch(`${API_BASE_URL}/auth/social/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: result.params.access_token,
          role: role || 'Client',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Save token and navigate to Dashboard
        return { success: true, token: data.access_token, user: data.user };
      } else {
        throw new Error('Failed to authenticate with backend');
      }
    } else {
      throw new Error('Google authentication cancelled or failed');
    }
  } catch (error) {
    console.error('Google login error:', error);
    Alert.alert('Error', 'Failed to login with Google. Please try again.');
    return { success: false, error };
  }
}

/**
 * Login with Facebook
 * 
 * To work, you need:
 * 1. Install: npm install expo-auth-session
 * 2. Configure Facebook App in Facebook Developers
 * 3. Backend needs endpoint: POST /auth/social/facebook
 */
export async function loginWithFacebook(role?: 'Client' | 'Restaurant' | 'Deliver') {
  try {
    // TODO: Configure with your Facebook credentials
    const discovery = {
      authorizationEndpoint: 'https://www.facebook.com/v18.0/dialog/oauth',
      tokenEndpoint: 'https://graph.facebook.com/v18.0/oauth/access_token',
    };

    const request = new AuthSession.AuthRequest({
      clientId: 'YOUR_FACEBOOK_APP_ID', // Replace with your App ID
      scopes: ['public_profile', 'email'],
      responseType: AuthSession.ResponseType.Token,
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    });

    const result = await request.promptAsync(discovery);

    if (result.type === 'success' && result.params.access_token) {
      // Send token to backend
      const response = await fetch(`${API_BASE_URL}/auth/social/facebook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: result.params.access_token,
          role: role || 'Client',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, token: data.access_token, user: data.user };
      } else {
        throw new Error('Failed to authenticate with backend');
      }
    } else {
      throw new Error('Facebook authentication cancelled or failed');
    }
  } catch (error) {
    console.error('Facebook login error:', error);
    Alert.alert('Error', 'Failed to login with Facebook. Please try again.');
    return { success: false, error };
  }
}

/**
 * Login with Apple
 * 
 * To work, you need:
 * 1. Install: npm install expo-apple-authentication
 * 2. Configure in Apple Developer Account
 * 3. Backend needs endpoint: POST /auth/social/apple
 * 4. Only works on iOS devices
 */
export async function loginWithApple(role?: 'Client' | 'Restaurant' | 'Deliver') {
  try {
    // Check if available (iOS only)
    if (!AppleAuthentication.isAvailableAsync()) {
      Alert.alert('Error', 'Apple Sign In is only available on iOS devices.');
      return { success: false, error: 'Not available on this platform' };
    }

    // Authenticate with Apple
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    if (credential.identityToken) {
      // Send token to backend
      const response = await fetch(`${API_BASE_URL}/auth/social/apple`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: credential.identityToken,
          user: credential.user, // Apple user ID
          email: credential.email,
          fullName: credential.fullName,
          role: role || 'Client',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, token: data.access_token, user: data.user };
      } else {
        throw new Error('Failed to authenticate with backend');
      }
    } else {
      throw new Error('Apple authentication failed');
    }
  } catch (error: any) {
    if (error.code === 'ERR_CANCELED') {
      // User cancelled - don't show error
      return { success: false, error: 'cancelled' };
    }
    console.error('Apple login error:', error);
    Alert.alert('Error', 'Failed to login with Apple. Please try again.');
    return { success: false, error };
  }
}

/**
 * Helper function to save token (implement according to your needs)
 */
export function saveAuthToken(token: string) {
  // TODO: Implement secure token storage
  // Example: AsyncStorage, SecureStore, etc.
  // AsyncStorage.setItem('auth_token', token);
}
