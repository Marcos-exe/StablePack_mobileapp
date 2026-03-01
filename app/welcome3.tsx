import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
  useWindowDimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BarIcon from '@/assets/icons/Bar.svg';
import PointsIcon from '@/assets/icons/points.svg';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function AnimatedFigure({
  top,
  left,
  width,
  height,
  figureY,
  headerOpacity,
}: {
  top: number;
  left: number;
  width: number;
  height: number;
  figureY: { value: number };
  headerOpacity: { value: number };
}) {
  const style = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: figureY.value }],
  }));
  return (
    <Animated.View style={[styles.figureContainer, { top, left, width, height }, style]}>
      <Image
        source={require('@/assets/images/figurewel3.png')}
        style={styles.figure}
        contentFit="contain"
      />
    </Animated.View>
  );
}

function ScrollPoints({ left, top }: { left: number; top: number }) {
  return (
    <View style={[styles.scrollPoints, { left, top }]}>
      <PointsIcon width={64} height={23} />
      <View style={styles.barOverlay} pointerEvents="none">
        <BarIcon width={30} height={4} color="#FFFFFF" />
      </View>
    </View>
  );
}

function WelcomeText({
  width,
  top,
  headerOpacity,
  titleY,
  descY,
}: {
  width: number;
  top: number;
  headerOpacity: { value: number };
  titleY: { value: number };
  descY: { value: number };
}) {
  const textWidth = Math.min(305, width * 0.85);
  const titleSize = Math.round(width * 0.078);
  const descSize = Math.round(width * 0.036);
  const titleStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: titleY.value }],
  }));
  const descStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: descY.value }],
  }));
  return (
    <View style={[styles.welcomeText, { left: (width - textWidth) / 2, width: textWidth, top }]}>
      <Animated.Text style={[styles.title, { fontSize: titleSize, lineHeight: titleSize * 1.47 }, titleStyle]}>
        Delivery History & Monitoring
      </Animated.Text>
      <Animated.Text style={[styles.description, { fontSize: descSize, lineHeight: descSize * 1.43 }, descStyle]}>
        Track full delivery history, access logs, and anomalies with sensor graphs and exportable reports.
      </Animated.Text>
    </View>
  );
}

function SignUpButton({
  onPress,
  width,
  bottom,
  buttonY,
  headerOpacity,
}: {
  onPress: () => void;
  width: number;
  bottom: number;
  buttonY: { value: number };
  headerOpacity: { value: number };
}) {
  const btnWidth = Math.min(286, width * 0.85);
  const buttonScale = useSharedValue(1);
  const containerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: buttonY.value }],
  }));
  const buttonStyle = useAnimatedStyle(() => ({ transform: [{ scale: buttonScale.value }] }));
  return (
    <Animated.View
      style={[
        { position: 'absolute', left: (width - btnWidth) / 2, width: btnWidth, bottom: bottom + 60, zIndex: 20 },
        containerStyle,
      ]}
    >
      <AnimatedPressable
        style={[styles.signUpButton, buttonStyle]}
        onPress={onPress}
        onPressIn={() => (buttonScale.value = withSpring(0.94, {
          damping: 10,
          stiffness: 200,
        }))}
        onPressOut={() => (buttonScale.value = withSpring(1, {
          damping: 10,
          stiffness: 200,
        }))}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </AnimatedPressable>
    </Animated.View>
  );
}

function LoginButton({
  onPress,
  width,
  bottom,
  buttonY,
  headerOpacity,
}: {
  onPress: () => void;
  width: number;
  bottom: number;
  buttonY: { value: number };
  headerOpacity: { value: number };
}) {
  const btnWidth = Math.min(286, width * 0.85);
  const buttonScale = useSharedValue(1);
  const containerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: buttonY.value }],
  }));
  const buttonStyle = useAnimatedStyle(() => ({ transform: [{ scale: buttonScale.value }] }));
  return (
    <Animated.View
      style={[
        { position: 'absolute', left: (width - btnWidth) / 2, width: btnWidth, bottom, zIndex: 20 },
        containerStyle,
      ]}
    >
      <AnimatedPressable
        style={[styles.loginButton, buttonStyle]}
        onPress={onPress}
        onPressIn={() => (buttonScale.value = withSpring(0.94, {
          damping: 10,
          stiffness: 200,
        }))}
        onPressOut={() => (buttonScale.value = withSpring(1, {
          damping: 10,
          stiffness: 200,
        }))}
      >
        <Text style={styles.buttonText}>Login</Text>
      </AnimatedPressable>
    </Animated.View>
  );
}

function goToApp(router: ReturnType<typeof useRouter>) {
  router.replace('/(tabs)');
}

function goToLogin(router: ReturnType<typeof useRouter>) {
  router.push('/login');
}

function goToSignIn(router: ReturnType<typeof useRouter>) {
  router.push('/signin');
}

export default function WelcomeScreen3() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const headerOpacity = useSharedValue(0);
  const titleY = useSharedValue(40);
  const descY = useSharedValue(40);
  const figureY = useSharedValue(40);
  const signUpY = useSharedValue(40);
  const loginY = useSharedValue(40);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { 
      duration: 800, 
      easing: Easing.out(Easing.ease) 
    });
    titleY.value = withDelay(50, withSpring(0, {
      damping: 15,
      stiffness: 100,
      mass: 0.8,
    }));
    descY.value = withDelay(200, withSpring(0, {
      damping: 15,
      stiffness: 100,
      mass: 0.8,
    }));
    figureY.value = withDelay(350, withSpring(0, {
      damping: 18,
      stiffness: 90,
      mass: 1,
    }));
    signUpY.value = withDelay(500, withSpring(0, {
      damping: 15,
      stiffness: 100,
      mass: 0.8,
    }));
    loginY.value = withDelay(650, withSpring(0, {
      damping: 15,
      stiffness: 100,
      mass: 0.8,
    }));
  }, []);

  const figureSize = Math.min(371, width * 0.9, height * 0.45);
  const safePadding = Math.max(20, width * 0.05);

  return (
    <View style={styles.container}>
      <View style={styles.bgLayer}>
        <Image
          source={require('@/assets/images/bg_welcome.png')}
          style={styles.bgImage}
          contentFit="cover"
        />
        <View style={styles.overlay} />
      </View>
      <ScrollPoints left={safePadding} top={insets.top + height * 0.04} />
      <WelcomeText width={width} top={insets.top + height * 0.12} headerOpacity={headerOpacity} titleY={titleY} descY={descY} />
      <AnimatedFigure
        top={height * 0.42}
        left={(width - figureSize) / 2}
        width={figureSize}
        height={figureSize}
        figureY={figureY}
        headerOpacity={headerOpacity}
      />
      <SignUpButton
        width={width}
        bottom={insets.bottom + 12}
        onPress={() => goToSignIn(router)}
        buttonY={signUpY}
        headerOpacity={headerOpacity}
      />
      <LoginButton
        width={width}
        bottom={insets.bottom + 12}
        onPress={() => goToLogin(router)}
        buttonY={loginY}
        headerOpacity={headerOpacity}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  bgLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  },
  scrollPoints: {
    position: 'absolute',
    zIndex: 20,
    height: 23,
  },
  barOverlay: {
    position: 'absolute',
    left: 34, // Barra posicionada após os primeiros 4 pontos (mais à direita)
    top: 9.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 30,
  },
  figureContainer: {
    position: 'absolute',
    zIndex: 5,
    shadowColor: '#000',
    shadowOffset: { width: 20, height: 30 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
    overflow: 'hidden',
  },
  figure: {
    width: '100%',
    height: '100%',
  },
  welcomeText: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
  },
  title: {
    fontFamily: 'Poppins_900Black',
    color: '#FFD700',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  description: {
    fontFamily: 'Poppins_600SemiBold',
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 19,
    letterSpacing: 0.1,
    textAlign: 'center',
  },
  signUpButton: {
    height: 52,
    backgroundColor: '#212123',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loginButton: {
    height: 52,
    backgroundColor: 'transparent',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: 'white',
    letterSpacing: 0.1,
  },
});
