/**
 * ============================================================================
 * ROOT APPLICATION LAYOUT
 * ============================================================================
 * 
 * This is the root component that defines the navigation structure and global
 * configurations of the StablePack application.
 * 
 * Responsibilities:
 * - Loading custom fonts (Archivo and Poppins)
 * - Managing the splash screen
 * - Theme configuration (light/dark)
 * - Defining routes and navigation transitions
 * - StatusBar configuration
 */

import { useFonts } from '@expo-google-fonts/archivo/useFonts';
import { Archivo_900Black } from '@expo-google-fonts/archivo/900Black';
import { useFonts as usePoppinsFonts } from '@expo-google-fonts/poppins/useFonts';
import { Poppins_300Light } from '@expo-google-fonts/poppins/300Light';
import { Poppins_400Regular } from '@expo-google-fonts/poppins/400Regular';
import { Poppins_500Medium } from '@expo-google-fonts/poppins/500Medium';
import { Poppins_600SemiBold } from '@expo-google-fonts/poppins/600SemiBold';
import { Poppins_700Bold } from '@expo-google-fonts/poppins/700Bold';
import { Poppins_900Black } from '@expo-google-fonts/poppins/900Black';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Easing } from 'react-native';
import { CardStyleInterpolators } from '@react-navigation/stack';
import 'react-native-reanimated';

import { SplashScreenContent } from '@/components/SplashScreen';
import { useColorScheme } from '@/hooks/use-color-scheme';

/**
 * Initial route settings
 * 
 * @description
 * Defines which screen will be displayed when the app starts.
 * The 'welcome' screen is the first screen after the splash screen.
 */
export const unstable_settings = {
  initialRouteName: 'welcome',
} as const;

/**
 * Root application component
 * 
 * @description
 * Manages the initial app loading, including:
 * 1. Loading custom fonts
 * 2. Displaying the splash screen
 * 3. Theme and navigation configuration
 * 
 * @returns JSX.Element - Complete application layout
 */
export default function RootLayout() {
  // Detects system color scheme (light/dark)
  const colorScheme = useColorScheme();
  
  // Loads Archivo font (900 Black) - used for main titles
  const [archivoLoaded] = useFonts({ Archivo_900Black });
  
  // Loads all Poppins font variations
  // Poppins is used for body text, buttons, etc.
  const [poppinsLoaded] = usePoppinsFonts({
    Poppins_300Light,      // Light text
    Poppins_400Regular,   // Regular text
    Poppins_500Medium,    // Medium text
    Poppins_600SemiBold,  // Semi-bold text
    Poppins_700Bold,      // Bold text
    Poppins_900Black,     // Extra-bold text
  });
  
  // Checks if all fonts have been loaded
  const fontsLoaded = archivoLoaded && poppinsLoaded;
  
  // State to control when the splash screen should disappear
  const [splashDone, setSplashDone] = useState(false);

  /**
   * Effect to manage splash screen display time
   * 
   * @description
   * Waits for fonts to load and then waits 2 seconds
   * before hiding the splash screen. This ensures a smooth
   * visual experience and enough time to load resources.
   */
  useEffect(() => {
    if (!fontsLoaded) return;
    
    // Waits 2 seconds after fonts load
    const timer = setTimeout(() => setSplashDone(true), 2000);
    
    // Cleans up timer if component is unmounted
    return () => clearTimeout(timer);
  }, [fontsLoaded]);

  /**
   * Displays splash screen while fonts are loading
   * or during the initial 2 seconds
   */
  if (!fontsLoaded || !splashDone) {
    return (
      <>
        <SplashScreenContent />
        <StatusBar style="light" />
      </>
    );
  }

  /**
   * Renders the main application layout
   * 
   * @description
   * Configures ThemeProvider with the appropriate theme (light/dark)
   * and defines all application routes with their transitions.
   * 
   * All screens use horizontal iOS transition with 600ms duration
   * for a consistent and smooth navigation experience.
   */
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* Stack Navigator - Manages navigation between screens */}
      <Stack screenOptions={{ headerShown: false }}>
        {/* Initial route (redirects to splash) */}
        <Stack.Screen name="index" />
        
        {/* Splash screen */}
        <Stack.Screen name="splash" />
        
        {/* First welcome screen */}
        <Stack.Screen name="welcome" />
        
        {/* Second welcome screen
            Configured with smooth horizontal iOS transition */}
        <Stack.Screen 
          name="welcome2" 
          options={{
            // Style interpolator for horizontal transition (iOS-like)
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            // Transition specification (open/close)
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 600,        // 600ms to open
                  easing: Easing.linear, // Linear easing for smooth movement
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 600,        // 600ms to close
                  easing: Easing.linear, // Linear easing for smooth movement
                },
              },
            },
          }}
        />
        {/* Third welcome screen */}
        <Stack.Screen 
          name="welcome3" 
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 600,
                  easing: Easing.linear,
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 600,
                  easing: Easing.linear,
                },
              },
            },
          }}
        />
        
        {/* Login screen - Existing user authentication */}
        <Stack.Screen 
          name="login" 
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 600,
                  easing: Easing.linear,
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 600,
                  easing: Easing.linear,
                },
              },
            },
          }}
        />
        
        {/* Registration screen - New account creation */}
        <Stack.Screen 
          name="signin" 
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 600,
                  easing: Easing.linear,
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 600,
                  easing: Easing.linear,
                },
              },
            },
          }}
        />
        
        {/* Main dashboard - Initial screen after login */}
        <Stack.Screen 
          name="dashboard" 
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 600,
                  easing: Easing.linear,
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 600,
                  easing: Easing.linear,
                },
              },
            },
          }}
        />
        
        {/* Password recovery screen */}
        <Stack.Screen 
          name="forgot-password" 
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 600,
                  easing: Easing.linear,
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 600,
                  easing: Easing.linear,
                },
              },
            },
          }}
        />
        
        {/* App settings screen */}
        <Stack.Screen 
          name="settings" 
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 600,
                  easing: Easing.linear,
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 600,
                  easing: Easing.linear,
                },
              },
            },
          }}
        />
        
        {/* History screen - View previous analyses */}
        <Stack.Screen 
          name="history" 
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 600,
                  easing: Easing.linear,
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 600,
                  easing: Easing.linear,
                },
              },
            },
          }}
        />
        
        {/* Camera screen - AI-powered package analysis */}
        <Stack.Screen 
          name="camera" 
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            transitionSpec: {
              open: {
                animation: 'timing',
                config: {
                  duration: 600,
                  easing: Easing.linear,
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 600,
                  easing: Easing.linear,
                },
              },
            },
          }}
        />
        
        {/* Tab group (tabs) - Tab navigation */}
        <Stack.Screen name="(tabs)" />
        
        {/* Modal - Modal presentation (overlays other screens) */}
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      {/* StatusBar - System status bar (battery, time, etc.) */}
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
