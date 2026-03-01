import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  useWindowDimensions,
  Pressable,
  ScrollView,
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

function goToLogin(router: ReturnType<typeof useRouter>) {
  router.push('/login');
}

function goToApp(router: ReturnType<typeof useRouter>) {
  router.replace('/dashboard');
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
function WelcomeText() {
  return (
    <AnimatedCard style={styles.welcomeTextContainer} delay={0}>
      <Text style={styles.welcomeTitle}>Create Account</Text>
      <Text style={styles.welcomeSubtitle}>
        Join our smart package system.{'\n'}Select your role and sign up to continue.
      </Text>
    </AnimatedCard>
  );
}

// Role Bar Component
function RoleBar({ 
  selectedRole, 
  onRoleChange, 
  width
}: { 
  selectedRole: Role; 
  onRoleChange: (role: Role) => void;
  width: number;
}) {
  const barWidth = Math.min(328, width * 0.85);
  
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
    <AnimatedCard style={[styles.roleBarContainer, { width: barWidth, alignSelf: 'center' }]} delay={100}>
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

// First & Last Name Field Component
function NameField({ 
  width, 
  value, 
  onChangeText,
  label,
  placeholder,
  supportText,
  delay = 200,
}: { 
  width: number; 
  value: string;
  onChangeText: (text: string) => void;
  label: string;
  placeholder: string;
  supportText: string;
  delay?: number;
}) {
  const fieldWidth = Math.min(333, width * 0.9);
  
  return (
    <AnimatedCard style={[styles.fieldContainer, { width: fieldWidth, alignSelf: 'center' }]} delay={delay}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="words"
          autoCorrect={false}
          autoComplete="name"
        />
      </View>
      <Text style={styles.supportText}>{supportText}</Text>
    </AnimatedCard>
  );
}

// Email Field Component
function EmailField({ 
  width, 
  value, 
  onChangeText 
}: { 
  width: number; 
  value: string;
  onChangeText: (text: string) => void;
}) {
  const fieldWidth = Math.min(333, width * 0.9);
  
  return (
    <AnimatedCard style={[styles.fieldContainer, { width: fieldWidth, alignSelf: 'center' }]} delay={250}>
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
  value, 
  onChangeText,
  label,
  placeholder,
  supportText,
  delay = 300
}: { 
  width: number; 
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  placeholder?: string;
  supportText?: string;
  delay?: number;
}) {
  const fieldWidth = Math.min(333, width * 0.9);
  const [isSecure, setIsSecure] = useState(true);
  
  return (
    <AnimatedCard style={[styles.fieldContainer, { width: fieldWidth, alignSelf: 'center' }]} delay={delay}>
      <Text style={styles.fieldLabel}>{label || 'Password'}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder || '••••••••••'}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isSecure}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="password"
        />
      </View>
      <Text style={styles.supportText}>{supportText || 'Support text'}</Text>
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

// Terms Row Component
function TermsRow({ 
  width,
  agreeToTerms,
  onToggle
}: { 
  width: number;
  agreeToTerms: boolean;
  onToggle: () => void;
}) {
  return (
    <AnimatedCard style={[styles.termsRow, { paddingHorizontal: Math.max(20, width * 0.05) }]} delay={350}>
      <Checkbox checked={agreeToTerms} onToggle={onToggle} />
      <Text style={styles.termsText}>
        I agree to the <Text style={styles.termsLink}>Terms & Conditions</Text>
      </Text>
    </AnimatedCard>
  );
}

// Sign Up Button Component
function SignUpButton({
  onPress,
  width,
  disabled,
  isLoading,
}: {
  onPress: () => void;
  width: number;
  disabled?: boolean;
  isLoading?: boolean;
}) {
  const btnWidth = Math.min(286, width * 0.85);
  const buttonScale = useSharedValue(1);
  const buttonStyle = useAnimatedStyle(() => ({ transform: [{ scale: buttonScale.value }] }));
  const isDisabled = disabled || isLoading;
  return (
    <AnimatedCard style={{ width: btnWidth, alignSelf: 'center' }} delay={400}>
      <AnimatedPressable
        style={[styles.signUpButton, isDisabled && styles.signUpButtonDisabled, buttonStyle]}
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
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        )}
      </AnimatedPressable>
    </AnimatedCard>
  );
}

// Divider Component
function Divider({ 
  width,
  text
}: { 
  width: number;
  text: string;
}) {
  return (
    <AnimatedCard style={[styles.dividerContainer, { paddingHorizontal: Math.max(20, width * 0.05) }]} delay={450}>
      <View style={styles.divider} />
      <Text style={styles.dividerText}>{text}</Text>
      <View style={styles.divider} />
    </AnimatedCard>
  );
}

// Social Icons Component
function SocialIcons({ 
  width
}: { 
  width: number;
}) {
  return (
    <AnimatedCard style={[styles.socialIconsContainer, { gap: Math.max(20, width * 0.08) }]} delay={500}>
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

// Login Link Component
function LoginLink({ 
  onPress
}: { 
  onPress: () => void;
}) {
  return (
    <AnimatedCard style={styles.loginLinkContainer} delay={550}>
      <Text style={styles.loginLinkText}>Already have an account? </Text>
      <Pressable onPress={onPress}>
        <Text style={styles.loginLink}>Login</Text>
      </Pressable>
    </AnimatedCard>
  );
}

// Main Screen Component
export default function SignInScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  
  const [selectedRole, setSelectedRole] = useState<Role>('Client');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Calculate positions
  const safePadding = Math.max(20, width * 0.05);
  const backButtonTop = insets.top + Math.max(8, height * 0.01);
  
  // Validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (pwd: string) => {
    if (pwd.length < 8) return false;
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(pwd);
    return hasLower && hasUpper && hasSpecial;
  };
  
  const isFormValid = 
    firstName.trim().length > 0 && 
    lastName.trim().length > 0 && 
    email.length > 0 && 
    isValidEmail(email) && 
    isValidPassword(password) && 
    password === confirmPassword && 
    agreeToTerms;
  
  async function handleSignUp() {
    if (!isFormValid || isLoading) return;
    setIsLoading(true);
    try {
      const res = await fetch(AUTH.register, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          password,
          role: selectedRole,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        goToLogin(router);
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
      <View style={styles.bgLayer}>
        <Image
          source={require('@/assets/images/bg-login.png')}
          style={styles.bgImage}
          contentFit="cover"
        />
      </View>
      
      <BackButton 
        left={safePadding} 
        top={backButtonTop} 
        onPress={() => goBack(router)} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { 
          paddingTop: insets.top + Math.max(60, height * 0.08), 
          paddingBottom: insets.bottom + 20 
        }]}
        showsVerticalScrollIndicator={false}
      >
        <WelcomeText />
        
        <RoleBar 
          selectedRole={selectedRole}
          onRoleChange={setSelectedRole}
          width={width}
        />
        
        <NameField 
          width={width}
          value={firstName}
          onChangeText={setFirstName}
          label="First Name"
          placeholder="First name"
          supportText="Enter your first name"
          delay={200}
        />
        <NameField 
          width={width}
          value={lastName}
          onChangeText={setLastName}
          label="Last Name"
          placeholder="Last name"
          supportText="Enter your last name"
          delay={230}
        />
        
        <EmailField 
          width={width}
          value={email}
          onChangeText={setEmail}
        />
        
        <PasswordField 
          width={width}
          value={password}
          onChangeText={setPassword}
          label="Password"
          placeholder="••••••••••"
          supportText="Min. 8 characters, 1 uppercase, 1 lowercase and 1 special character"
        />
        
        <PasswordField 
          width={width}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          label="Confirm Password"
          placeholder="••••••••••"
          supportText="Re-enter your password to confirm"
          delay={320}
        />
        
        <TermsRow
          width={width}
          agreeToTerms={agreeToTerms}
          onToggle={() => setAgreeToTerms(!agreeToTerms)}
        />
        
        <SignUpButton 
          width={width}
          onPress={handleSignUp}
          disabled={!isFormValid}
          isLoading={isLoading}
        />
        
        <Divider
          width={width}
          text="Sign up with"
        />
        
        <SocialIcons
          width={width}
        />
        
        <LoginLink
          onPress={() => goToLogin(router)}
        />
      </ScrollView>
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
  scrollView: {
    flex: 1,
    zIndex: 10,
  },
  scrollContent: {
    paddingHorizontal: 0,
  },
  welcomeTextContainer: {
    alignItems: 'center',
    marginBottom: 24,
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
    height: 39,
    marginBottom: 24,
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
    marginBottom: 16,
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
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
    gap: 8,
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
  termsText: {
    fontFamily: 'Poppins_300Light',
    fontSize: 12,
    color: 'white',
    lineHeight: 17,
    flex: 1,
  },
  termsLink: {
    color: '#FFD700',
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
  signUpButtonDisabled: {
    opacity: 0.5,
    borderColor: '#878787',
  },
  signUpButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: 'white',
    letterSpacing: 0.1,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  socialIcon: {
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginLinkText: {
    fontFamily: 'Poppins_300Light',
    fontSize: 9,
    color: 'white',
  },
  loginLink: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 9,
    color: '#FFD700',
  },
});
