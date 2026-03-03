/**
 * ============================================================================
 * SPLASH SCREEN
 * ============================================================================
 * 
 * This is the first screen displayed when the app is opened.
 * 
 * Features:
 * - Displays splash screen for 2 seconds
 * - Automatically navigates to welcome screen after the time
 * 
 * Note: Font loading and other resources are managed in _layout.tsx.
 * This screen only controls the initial navigation.
 */

import { SplashScreenContent } from '@/components/SplashScreen';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

/**
 * Splash screen component
 * 
 * @description
 * Displays the splash screen and after 2 seconds automatically navigates
 * to the first welcome screen.
 * 
 * @returns JSX.Element - Splash screen component
 */
export default function SplashScreen() {
  const router = useRouter();

  /**
   * Effect that manages automatic navigation
   * 
   * @description
   * After 2 seconds, replaces the current route with the welcome screen.
   * Uses replace() instead of push() so the user cannot go back
   * to the splash screen using the back button.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, 2000);
    
    // Cleans up timer if component is unmounted before 2 seconds
    return () => clearTimeout(timer);
  }, [router]);

  // Renders the splash screen content
  return <SplashScreenContent />;
}
