import { useEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
} from 'react-native-reanimated';

type AnimatedCardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Delay in ms before the animation starts (for stagger effect) */
  delay?: number;
  /** Starting translateY (element enters from below). Default 30 */
  translateYStart?: number;
  /** Opacity animation duration in ms. Default 600 */
  duration?: number;
  /** Spring config for translateY. Slightly bouncy by default */
  springConfig?: { damping: number; stiffness: number };
};

export function AnimatedCard({
  children,
  style,
  delay = 0,
  translateYStart = 30,
  duration = 600,
  springConfig = { damping: 16, stiffness: 120 },
}: AnimatedCardProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(translateYStart);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration })
    );
    translateY.value = withDelay(
      delay,
      withSpring(0, springConfig)
    );
  }, [delay, duration, translateYStart, springConfig]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
}
