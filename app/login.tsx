import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  useWindowDimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedCard } from '@/components/AnimatedCard';
import { AUTH, getValidationErrorMessage } from '@/lib/api';
import ArrowRightIcon from '@/assets/icons/ArrowRight.svg';
import CheckmarkIcon from '@/assets/icons/Checkmark.svg';
import FacebookIcon from '@/assets/icons/Facebook.svg';
import GoogleIcon from '@/assets/icons/Google.svg';
import TwitterIcon from '@/assets/icons/Twitter.svg';

type Role = 'Restaurant' | 'Client' | 'Deliver';

// Navigation functions
function goBack(router: ReturnType<typeof useRouter>) {
  router.back();
}

function goToApp(router: ReturnType<typeof useRouter>) {
  router.replace('/dashboard');
}

function goToSignIn(router: ReturnType<typeof useRouter>) {
  router.push('/signin');
}

function goToForgotPassword(router: ReturnType<typeof useRouter>) {
  router.push('/forgot-password');
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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Welcome Text Component
function WelcomeText({ top }: { top: number }) {
  return (
    <AnimatedCard style={[styles.welcomeTextContainer, { top }]} delay={0}>
      <Text style={styles.welcomeTitle}>Welcome Back</Text>
      <Text style={styles.welcomeSubtitle}>
        Your smart package system is ready.{'\n'}Select your role and login to continue.
      </Text>
    </AnimatedCard>
  );
}

// Role Bar Component
function RoleBar({ 
  selectedRole, 
  onRoleChange, 
  width, 
  top 
}: { 
  selectedRole: Role; 
  onRoleChange: (role: Role) => void;
  width: number;
  top: number;
}) {
  const barWidth = Math.min(328, width * 0.85);
  const containerLeft = (width - barWidth) / 2;
  
  const restaurantWidth = 119;
  const clientWidth = 85;
  const deliverWidth = 118;
  
  const getRoleLeft = (role: Role) => {
    const padding = 4;
    if (role === 'Restaurant') return padding;
    if (role === 'Client') return padding + restaurantWidth + ((barWidth - restaurantWidth - clientWidth - deliverWidth - padding * 2) / 2);
    return barWidth - deliverWidth - padding;
  };
  
  const getSelectedWidth = (role: Role) => {
    if (role === 'Restaurant') return restaurantWidth;
    if (role === 'Client') return clientWidth;
    return deliverWidth;
  };
  
  const selectedLeft = getRoleLeft(selectedRole);
  const selectedWidth = getSelectedWidth(selectedRole);
  
  return (
    <AnimatedCard style={[styles.roleBarContainer, { left: containerLeft, top, width: barWidth }]} delay={100}>
      <View style={styles.roleBarBackground} />
      <Animated.View 
        style={[styles.roleBarSelected, { 
          left: selectedLeft,
          width: selectedWidth,
        }]} 
      />
      <Pressable 
        style={[styles.roleButton, { left: getRoleLeft('Restaurant'), width: restaurantWidth }]}
        onPress={() => onRoleChange('Restaurant')}
      >
        <Text style={[styles.roleText, selectedRole === 'Restaurant' && styles.roleTextSelected]}>
          Restaurant
        </Text>
      </Pressable>
      <Pressable 
        style={[styles.roleButton, { left: getRoleLeft('Client'), width: clientWidth }]}
        onPress={() => onRoleChange('Client')}
      >
        <Text style={[styles.roleText, selectedRole === 'Client' && styles.roleTextSelected]}>
          Client
        </Text>
      </Pressable>
      <Pressable 
        style={[styles.roleButton, { left: getRoleLeft('Deliver'), width: deliverWidth }]}
        onPress={() => onRoleChange('Deliver')}
      >
        <Text style={[styles.roleText, selectedRole === 'Deliver' && styles.roleTextSelected]}>
          Deliver
        </Text>
      </Pressable>
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
  const fieldWidth = Math.min(333, width * 0.9);
  
  return (
    <AnimatedCard style={[styles.fieldContainer, { left: (width - fieldWidth) / 2, top, width: fieldWidth }]} delay={200}>
      <Text style={styles.fieldLabel}>Email</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
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
      <Text style={styles.supportText}>Enter a valid email to continue</Text>
    </AnimatedCard>
  );
}

// Password Field Component
function PasswordField({ 
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
  const fieldWidth = Math.min(333, width * 0.9);
  const [isSecure, setIsSecure] = useState(true);
  
  return (
    <AnimatedCard style={[styles.fieldContainer, { left: (width - fieldWidth) / 2, top, width: fieldWidth }]} delay={250}>
      <Text style={styles.fieldLabel}>Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="••••••••••"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="password"
        />
      </View>
      <Text style={styles.supportText}>Support text</Text>
    </AnimatedCard>
  );
}

// Checkbox Component
function Checkbox({ 
  checked, 
  onToggle
}: { 
  checked: boolean; 
  onToggle: () => void;
}) {
  return (
    <Pressable style={styles.checkbox} onPress={onToggle}>
      {checked && (
        <View style={styles.checkmarkContainer}>
          <CheckmarkIcon width={10} height={10} />
        </View>
      )}
    </Pressable>
  );
}

// Options Row Component (Remember me + Forgot Password)
function OptionsRow({ 
  width, 
  top,
  rememberMe,
  onRememberMeToggle,
  onForgotPasswordPress
}: { 
  width: number; 
  top: number;
  rememberMe: boolean;
  onRememberMeToggle: () => void;
  onForgotPasswordPress: () => void;
}) {
  return (
    <AnimatedCard
      style={[styles.optionsRow, { top, paddingHorizontal: Math.max(20, width * 0.05) }]}
      delay={300}
    >
      <View style={styles.rememberMeContainer}>
        <Checkbox checked={rememberMe} onToggle={onRememberMeToggle} />
        <Text style={styles.rememberMeText}>Remember me</Text>
      </View>
      <Pressable style={styles.forgotPasswordContainer} onPress={onForgotPasswordPress}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </Pressable>
    </AnimatedCard>
  );
}

// Login Button Component
function LoginButton({
  onPress,
  width,
  top,
  disabled,
  isLoading,
}: {
  onPress: () => void;
  width: number;
  top: number;
  disabled?: boolean;
  isLoading?: boolean;
}) {
  const btnWidth = Math.min(286, width * 0.85);
  const buttonScale = useSharedValue(1);
  const buttonStyle = useAnimatedStyle(() => ({ transform: [{ scale: buttonScale.value }] }));
  const isDisabled = disabled || isLoading;
  return (
    <AnimatedCard
      style={{ position: 'absolute', left: (width - btnWidth) / 2, width: btnWidth, top, zIndex: 20 }}
      delay={350}
    >
      <AnimatedPressable
        style={[styles.loginButton, isDisabled && styles.loginButtonDisabled, buttonStyle]}
        onPress={onPress}
        disabled={isDisabled}
        onPressIn={() => (buttonScale.value = withSpring(0.94, {
          damping: 10,
          stiffness: 200,
        }))}
        onPressOut={() => (buttonScale.value = withSpring(1, {
          damping: 10,
          stiffness: 200,
        }))}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </AnimatedPressable>
    </AnimatedCard>
  );
}

// Divider Component
function Divider({ 
  width, 
  top,
  text
}: { 
  width: number; 
  top: number;
  text: string;
}) {
  return (
    <AnimatedCard
      style={[styles.dividerContainer, { top, paddingHorizontal: Math.max(20, width * 0.05) }]}
      delay={400}
    >
      <View style={styles.divider} />
      <Text style={styles.dividerText}>{text}</Text>
      <View style={styles.divider} />
    </AnimatedCard>
  );
}

// Social Icons Component
function SocialIcons({ 
  width, 
  top
}: { 
  width: number; 
  top: number;
}) {
  return (
    <AnimatedCard
      style={[styles.socialIconsContainer, { top, gap: Math.max(20, width * 0.08) }]}
      delay={450}
    >
      <Pressable style={styles.socialIcon}>
        <FacebookIcon width={26} height={26} />
      </Pressable>
      <Pressable style={styles.socialIcon}>
        <GoogleIcon width={26} height={26} />
      </Pressable>
      <Pressable style={styles.socialIcon}>
        <TwitterIcon width={26} height={26} />
      </Pressable>
    </AnimatedCard>
  );
}

// Sign Up Link Component
function SignUpLink({ 
  top,
  onPress
}: { 
  top: number;
  onPress: () => void;
}) {
  return (
    <AnimatedCard style={[styles.signUpContainer, { top }]} delay={500}>
      <Text style={styles.signUpText}>Don't have an account? </Text>
      <Pressable onPress={onPress}>
        <Text style={styles.signUpLink}>Sign up</Text>
      </Pressable>
    </AnimatedCard>
  );
}

// Main Screen Component
export default function LoginScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  
  const [selectedRole, setSelectedRole] = useState<Role>('Client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Calculate positions
  const safePadding = Math.max(20, width * 0.05);
  const backButtonTop = insets.top + Math.max(8, height * 0.01);
  const welcomeTextTop = insets.top + Math.max(60, height * 0.08);
  const roleBarTop = insets.top + Math.max(180, height * 0.22);
  const emailFieldTop = insets.top + Math.max(250, height * 0.30);
  const passwordFieldTop = insets.top + Math.max(360, height * 0.44);
  const optionsRowTop = insets.top + Math.max(470, height * 0.57);
  const loginButtonTop = insets.top + Math.max(530, height * 0.65);
  const dividerTop = insets.top + Math.max(600, height * 0.73);
  const socialIconsTop = insets.top + Math.max(640, height * 0.78);
  const signUpLinkTop = insets.top + Math.max(680, height * 0.83);
  
  // Validation (disabled for testing)
  // const isValidEmail = (email: string) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };
  
  // const isFormValid = email.length > 0 && isValidEmail(email) && password.length > 0;
  const isFormValid = true; // Always enabled for testing
  
  async function handleLogin() {
    if (isLoading) return;
    // Skip API call for testing - navigate directly to dashboard
    goToApp(router);
    
    // Original API call code (commented for testing):
    // setIsLoading(true);
    // try {
    //   const res = await fetch(AUTH.login, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email: email.trim(), password }),
    //   });
    //   const data = await res.json().catch(() => ({}));
    //   if (res.ok) {
    //     goToApp(router);
    //   } else if (res.status === 422) {
    //     Alert.alert('Error', getValidationErrorMessage(data.detail));
    //   } else {
    //     Alert.alert('Error', data.detail ?? 'Something went wrong. Try again.');
    //   }
    // } catch (err) {
    //   Alert.alert('Error', 'No connection. Check your network and try again.');
    // } finally {
    //   setIsLoading(false);
    // }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.bgLayer}>
        <Image
          source={require('@/assets/images/bg_login.png')}
          style={styles.bgImage}
          contentFit="cover"
        />
      </View>
      
      <BackButton 
        left={safePadding} 
        top={backButtonTop} 
        onPress={() => goBack(router)} 
      />
      
      <WelcomeText top={welcomeTextTop} />
      
      <RoleBar 
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        width={width}
        top={roleBarTop}
      />
      
      <EmailField 
        width={width}
        top={emailFieldTop}
        value={email}
        onChangeText={setEmail}
      />
      
      <PasswordField 
        width={width}
        top={passwordFieldTop}
        value={password}
        onChangeText={setPassword}
      />
      
      <OptionsRow
        width={width}
        top={optionsRowTop}
        rememberMe={rememberMe}
        onRememberMeToggle={() => setRememberMe(!rememberMe)}
        onForgotPasswordPress={() => goToForgotPassword(router)}
      />
      
      <LoginButton 
        width={width}
        top={loginButtonTop}
        onPress={handleLogin}
        disabled={false}
        isLoading={isLoading}
      />
      
      <Divider
        width={width}
        top={dividerTop}
        text="Login with"
      />
      
      <SocialIcons
        width={width}
        top={socialIconsTop}
      />
      
      <SignUpLink
        top={signUpLinkTop}
        onPress={() => goToSignIn(router)}
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
  welcomeTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
    left: 0,
    right: 0,
  },
  welcomeTitle: {
    fontFamily: 'Poppins_900Black',
    fontSize: 30,
    color: '#FFD700',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
    lineHeight: 44,
  },
  welcomeSubtitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  roleBarContainer: {
    position: 'absolute',
    height: 39,
    zIndex: 10,
  },
  roleBarBackground: {
    position: 'absolute',
    width: '100%',
    height: 39,
    backgroundColor: '#131314',
    borderRadius: 100,
  },
  roleBarSelected: {
    position: 'absolute',
    height: 33,
    backgroundColor: '#1e1e1e',
    borderRadius: 100,
    top: 3,
  },
  roleButton: {
    position: 'absolute',
    height: 33,
    justifyContent: 'center',
    alignItems: 'center',
    top: 3,
    minWidth: 80,
  },
  roleText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.75)',
    letterSpacing: 0.1,
  },
  roleTextSelected: {
    color: 'white',
  },
  fieldContainer: {
    position: 'absolute',
    zIndex: 10,
  },
  fieldLabel: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    color: '#FFD700',
    marginBottom: 8,
    lineHeight: 22,
  },
  inputContainer: {
    height: 50,
    backgroundColor: '#131314',
    borderRadius: 17,
    borderWidth: 2,
    borderColor: '#212123',
    paddingHorizontal: 16,
    justifyContent: 'center',
    width: '100%',
  },
  input: {
    fontFamily: 'Poppins_400Regular',
    color: 'white',
    fontSize: 14,
  },
  supportText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 10,
    color: '#8f9098',
    marginTop: 8,
    letterSpacing: 0.15,
    lineHeight: 14,
  },
  optionsRow: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    left: 0,
    right: 0,
    zIndex: 10,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#212123',
    backgroundColor: '#131314',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkContainer: {
    width: 10,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rememberMeText: {
    fontFamily: 'Poppins_300Light',
    fontSize: 12,
    color: 'white',
    lineHeight: 17,
  },
  forgotPasswordContainer: {
    // Posicionado via flexbox no optionsRow
  },
  forgotPasswordText: {
    fontFamily: 'Poppins_300Light',
    fontSize: 12,
    color: 'white',
    lineHeight: 17,
  },
  loginButton: {
    height: 52,
    backgroundColor: '#212123',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loginButtonDisabled: {
    opacity: 0.5,
    borderColor: '#878787',
  },
  loginButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: 'white',
    letterSpacing: 0.1,
  },
  dividerContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    left: 0,
    right: 0,
    zIndex: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#212123',
  },
  dividerText: {
    fontFamily: 'Poppins_300Light',
    fontSize: 9,
    color: 'white',
    marginHorizontal: 12,
    lineHeight: 12,
  },
  socialIconsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    zIndex: 10,
  },
  socialIcon: {
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    zIndex: 10,
  },
  signUpText: {
    fontFamily: 'Poppins_300Light',
    fontSize: 9,
    color: 'white',
  },
  signUpLink: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 9,
    color: '#FFD700',
  },
});
