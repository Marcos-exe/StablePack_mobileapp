import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    useWindowDimensions,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ArrowRightIcon from '@/assets/icons/ArrowRight.svg';
import { AnimatedCard } from '@/components/AnimatedCard';
import { AUTH, getValidationErrorMessage } from '@/lib/api';

// Navigation functions
function goBack(router: ReturnType<typeof useRouter>) {
  router.back();
}

function goToLogin(router: ReturnType<typeof useRouter>) {
  router.push('/login');
}

// Back Button Component
function BackButton({ 
  onPress, 
  left, 
  top 
}: { 
  onPress: () => void; 
  left: number; 
  top: number;
}) {
  return (
    <Pressable style={[styles.backButton, { left, top }]} onPress={onPress}>
      <View style={styles.backIconContainer}>
        <ArrowRightIcon width={15} height={15} color="#FFD700" style={{ transform: [{ rotate: '180deg' }] }} />
      </View>
      <Text style={styles.backText}>Back</Text>
    </Pressable>
  );
}

// Title Component
function Title({ 
  width, 
  top 
}: { 
  width: number; 
  top: number;
}) {
  return (
    <AnimatedCard style={[styles.titleContainer, { top }]} delay={100}>
      <Text style={[styles.title, { fontSize: Math.round(width * 0.077) }]}>Forgot Password</Text>
    </AnimatedCard>
  );
}

// Description Component
function Description({ 
  width, 
  top 
}: { 
  width: number; 
  top: number;
}) {
  const descriptionWidth = Math.min(305, width * 0.78);
  return (
    <AnimatedCard style={[styles.descriptionContainer, { top }]} delay={200}>
      <Text style={[styles.description, { fontSize: Math.round(width * 0.036), width: descriptionWidth }]}>
        A reset link will be sent to the email you provide, so you can securely create a new password and regain access to your account.
      </Text>
    </AnimatedCard>
  );
}

// Email Field Component
function EmailField({ 
  width, 
  top,
  value,
  onChangeText
}: { 
  width: number; 
  top: number;
  value: string;
  onChangeText: (text: string) => void;
}) {
  const fieldWidth = Math.min(333, width * 0.85);
  const fieldLeft = (width - fieldWidth) / 2;
  return (
    <AnimatedCard style={[styles.emailFieldContainer, { left: fieldLeft, top, width: fieldWidth }]} delay={300}>
      <Text style={[styles.emailLabel, { fontSize: Math.round(width * 0.046) }]}>Email</Text>
      <View style={styles.emailInputContainer}>
        <TextInput
          style={[styles.emailInput, { fontSize: Math.round(width * 0.036) }]}
          placeholder="your@email.com"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={value}
          onChangeText={onChangeText}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
        />
      </View>
      <Text style={[styles.emailHint, { fontSize: Math.round(width * 0.026) }]}>
        Enter your registered email address
      </Text>
    </AnimatedCard>
  );
}

// Send Reset Link Button Component
const COOLDOWN_SECONDS = 90; // 1 minuto e 30 segundos

function formatCooldown(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function SendResetLinkButton({ 
  width, 
  top, 
  onPress,
  disabled,
  cooldownSeconds,
  isLoading
}: { 
  width: number; 
  top: number; 
  onPress: () => void;
  disabled?: boolean;
  cooldownSeconds?: number;
  isLoading?: boolean;
}) {
  const buttonWidth = Math.min(286, width * 0.73);
  const buttonLeft = (width - buttonWidth) / 2;
  const isCooldown = (cooldownSeconds ?? 0) > 0;
  const isDisabled = disabled || isCooldown || isLoading;
  const buttonLabel = isLoading
    ? 'Sending...'
    : isCooldown
      ? `Try again in ${formatCooldown(cooldownSeconds ?? 0)}`
      : 'Send Reset Link';
  return (
    <AnimatedCard style={[styles.sendButtonContainer, { left: buttonLeft, top, width: buttonWidth }]} delay={400}>
      <Pressable 
        style={[styles.sendButton, isDisabled && styles.sendButtonDisabled]} 
        onPress={onPress}
        disabled={isDisabled}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={[styles.sendButtonText, { fontSize: Math.round(width * 0.041) }]}>
            {buttonLabel}
          </Text>
        )}
      </Pressable>
    </AnimatedCard>
  );
}

// Bottom Links Component
function BottomLinks({ 
  width, 
  top,
  onLoginPress
}: { 
  width: number; 
  top: number;
  onLoginPress: () => void;
}) {
  return (
    <AnimatedCard style={[styles.bottomLinksContainer, { top }]} delay={500}>
      <Text style={[styles.rememberText, { fontSize: Math.round(width * 0.023) }]}>
        Remember your password?
      </Text>
      <Pressable onPress={onLoginPress}>
        <Text style={[styles.loginLink, { fontSize: Math.round(width * 0.023) }]}>Login</Text>
      </Pressable>
    </AnimatedCard>
  );
}

// Main Screen Component
export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  
  const [email, setEmail] = useState('');
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // Cooldown de 2 minutos após enviar o link
  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const timer = setInterval(() => {
      setCooldownSeconds((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownSeconds]);
  
  // Calculate positions based on screen dimensions
  const safePadding = Math.max(insets.left, insets.right, 20);
  const backButtonTop = insets.top + Math.max(30, height * 0.035);
  const titleTop = insets.top + Math.max(80, height * 0.13);
  const descriptionTop = titleTop + Math.max(70, height * 0.09);
  const emailFieldTop = descriptionTop + Math.max(80, height * 0.10);
  const sendButtonTop = emailFieldTop + Math.max(140, height * 0.17);
  const bottomLinksTop = sendButtonTop + Math.max(80, height * 0.10);
  
  // Email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const isEmailValid = email.length > 0 && isValidEmail(email);
  
  async function handleSendResetLink() {
    if (!isEmailValid || cooldownSeconds > 0 || isLoading) return;
    setIsLoading(true);
    try {
      const res = await fetch(AUTH.recoverPassword, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        Alert.alert('Success', typeof data === 'string' ? data : (data.message ?? 'Reset link sent successfully.'));
        setCooldownSeconds(COOLDOWN_SECONDS);
      } else if (res.status === 422) {
        Alert.alert('Error', getValidationErrorMessage(data.detail));
      } else {
        Alert.alert('Error', data.detail ?? 'Something went wrong. Try again.');
      }
    } catch (err) {
      Alert.alert('Error', 'No connection. Check your network and try again.');
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/bg-forgot-password.png')}
        style={styles.backgroundImage}
        contentFit="cover"
      />
      
      <BackButton
        left={safePadding}
        top={backButtonTop}
        onPress={() => goBack(router)}
      />
      
      <Title width={width} top={titleTop} />
      
      <Description width={width} top={descriptionTop} />
      
      <EmailField
        width={width}
        top={emailFieldTop}
        value={email}
        onChangeText={setEmail}
      />
      
      <SendResetLinkButton
        width={width}
        top={sendButtonTop}
        onPress={handleSendResetLink}
        disabled={!isEmailValid}
        cooldownSeconds={cooldownSeconds}
        isLoading={isLoading}
      />
      
      <BottomLinks
        width={width}
        top={bottomLinksTop}
        onLoginPress={() => goToLogin(router)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    transform: [{ scaleY: -1 }],
  },
  backButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    zIndex: 20,
  },
  backText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: 'white',
    letterSpacing: 0.1,
  },
  backIconContainer: {
    // Container sem transformações
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  title: {
    fontFamily: 'Poppins_900Black',
    color: '#FFD700',
    textAlign: 'center',
  },
  descriptionContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  description: {
    fontFamily: 'Poppins_600SemiBold',
    color: 'white',
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  emailFieldContainer: {
    position: 'absolute',
    zIndex: 10,
  },
  emailLabel: {
    fontFamily: 'Poppins_700Bold',
    color: '#FFD700',
    marginBottom: 12,
  },
  emailInputContainer: {
    backgroundColor: '#131314',
    height: 50,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: '#212123',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  emailInput: {
    fontFamily: 'Poppins_400Regular',
    color: 'white',
    flex: 1,
  },
  emailHint: {
    fontFamily: 'Poppins_400Regular',
    color: '#8f9098',
    letterSpacing: 0.15,
    marginTop: 6,
  },
  sendButtonContainer: {
    position: 'absolute',
    zIndex: 10,
  },
  sendButton: {
    backgroundColor: '#212123',
    height: 52,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
  },
  sendButtonDisabled: {
    opacity: 0.5,
    borderColor: '#878787',
  },
  sendButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    color: 'white',
    letterSpacing: 0.1,
  },
  bottomLinksContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  rememberText: {
    fontFamily: 'Poppins_300Light',
    color: 'white',
  },
  loginLink: {
    fontFamily: 'Poppins_400Regular',
    color: '#FFD700',
  },
});
