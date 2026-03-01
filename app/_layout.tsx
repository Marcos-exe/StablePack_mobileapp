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

export const unstable_settings = {
  initialRouteName: 'welcome',
} as const;

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [archivoLoaded] = useFonts({ Archivo_900Black });
  const [poppinsLoaded] = usePoppinsFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_900Black,
  });
  const fontsLoaded = archivoLoaded && poppinsLoaded;
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    if (!fontsLoaded) return;
    const timer = setTimeout(() => setSplashDone(true), 2000);
    return () => clearTimeout(timer);
  }, [fontsLoaded]);

  if (!fontsLoaded || !splashDone) {
    return (
      <>
        <SplashScreenContent />
        <StatusBar style="light" />
      </>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="splash" />
        <Stack.Screen name="welcome" />
        <Stack.Screen 
          name="welcome2" 
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
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
