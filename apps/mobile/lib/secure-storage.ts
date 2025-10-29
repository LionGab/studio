/**
 * @fileOverview Secure storage service for sensitive data in mobile app
 * Uses expo-secure-store for encrypted storage on device
 */

import * as SecureStore from 'expo-secure-store';

const AUTH_TOKEN_KEY = 'auth_token';
const USER_ID_KEY = 'user_id';
const REFRESH_TOKEN_KEY = 'refresh_token';

/**
 * Stores authentication token securely
 */
export async function saveAuthToken(token: string): Promise<void> {
  try {
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
  } catch (error) {
    console.error('Failed to save auth token:', error);
    throw new Error('Failed to save authentication token');
  }
}

/**
 * Retrieves authentication token from secure storage
 */
export async function getAuthToken(): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Failed to retrieve auth token:', error);
    return null;
  }
}

/**
 * Removes authentication token from secure storage
 */
export async function removeAuthToken(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  } catch (error) {
    console.error('Failed to remove auth token:', error);
  }
}

/**
 * Stores refresh token securely
 */
export async function saveRefreshToken(token: string): Promise<void> {
  try {
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
  } catch (error) {
    console.error('Failed to save refresh token:', error);
    throw new Error('Failed to save refresh token');
  }
}

/**
 * Retrieves refresh token from secure storage
 */
export async function getRefreshToken(): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error('Failed to retrieve refresh token:', error);
    return null;
  }
}

/**
 * Stores user ID securely
 */
export async function saveUserId(userId: string): Promise<void> {
  try {
    await SecureStore.setItemAsync(USER_ID_KEY, userId);
  } catch (error) {
    console.error('Failed to save user ID:', error);
    throw new Error('Failed to save user ID');
  }
}

/**
 * Retrieves user ID from secure storage
 */
export async function getUserId(): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(USER_ID_KEY);
  } catch (error) {
    console.error('Failed to retrieve user ID:', error);
    return null;
  }
}

/**
 * Clears all authentication data from secure storage
 */
export async function clearAuthData(): Promise<void> {
  try {
    await Promise.all([
      SecureStore.deleteItemAsync(AUTH_TOKEN_KEY),
      SecureStore.deleteItemAsync(USER_ID_KEY),
      SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
    ]);
  } catch (error) {
    console.error('Failed to clear auth data:', error);
  }
}

/**
 * Checks if user is authenticated by verifying token exists
 */
export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthToken();
  return token !== null && token.length > 0;
}
