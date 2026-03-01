import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BellIcon from '@/assets/icons/Bell.svg';
import ChevronRightIcon from '@/assets/icons/ChevronRight.svg';
import CameraIcon from '@/assets/icons/Camera.svg';
import CameraPageIcon from '@/assets/icons/CameraPage.svg';
import CameraYellowIcon from '@/assets/icons/CameraYellow.svg';
import ClockIcon from '@/assets/icons/Clock.svg';
import ClockYellowIcon from '@/assets/icons/ClockYellow.svg';
import GlobeIcon from '@/assets/icons/Globe.svg';
import HouseIcon from '@/assets/icons/House.svg';
import HouseYellowIcon from '@/assets/icons/HouseYellow.svg';
import InfoIcon from '@/assets/icons/Info.svg';
import LockIcon from '@/assets/icons/Lock.svg';
import LogOutIcon from '@/assets/icons/LogOut.svg';
import MoonIcon from '@/assets/icons/Moon.svg';
import SettingsIcon from '@/assets/icons/Settings.svg';
import SettingsYellowIcon from '@/assets/icons/SettingsYellow.svg';
import ShieldIcon from '@/assets/icons/Shield.svg';
import SmartphoneIcon from '@/assets/icons/Smartphone.svg';
import UserIcon from '@/assets/icons/User.svg';

type TabType = 'Dashboard' | 'LiveCamera' | 'History' | 'Settings';

// Navigation functions removed - using inline navigation in component

// Tab Button Component
function TabButton({ 
  icon, 
  isSelected, 
  onPress 
}: { 
  icon: React.ReactNode; 
  isSelected: boolean; 
  onPress: () => void;
}) {
  return (
    <Pressable 
      style={[styles.tabButton, isSelected && styles.tabButtonSelected]} 
      onPress={onPress}
    >
      {isSelected && (
        <LinearGradient
          colors={['#080808', '#131314']}
          locations={[0.264, 0.755]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      )}
      <View style={styles.tabButtonIconContainer}>
        {icon}
      </View>
    </Pressable>
  );
}

// Bottom Navigation Component
function BottomNavigation({ 
  selectedTab, 
  onTabChange,
  onDashboardPress,
  onCameraPress,
  onHistoryPress
}: { 
  selectedTab: TabType; 
  onTabChange: (tab: TabType) => void;
  onDashboardPress?: () => void;
  onCameraPress?: () => void;
  onHistoryPress?: () => void;
}) {
  const { width } = useWindowDimensions();
  
  return (
    <View style={styles.bottomNav}>
      <View style={[styles.bottomNavBorder, { width }]} />
      <TabButton
        icon={selectedTab === 'Dashboard' ? (
          <HouseYellowIcon width={Math.round(width * 0.064)} height={Math.round(width * 0.064)} />
        ) : (
          <HouseIcon width={Math.round(width * 0.064)} height={Math.round(width * 0.064)} color="#878787" />
        )}
        isSelected={selectedTab === 'Dashboard'}
        onPress={onDashboardPress || (() => onTabChange('Dashboard'))}
      />
      <TabButton
        icon={selectedTab === 'LiveCamera' ? (
          <CameraYellowIcon width={Math.round(width * 0.064)} height={Math.round(width * 0.064)} />
        ) : (
          <CameraPageIcon width={Math.round(width * 0.064)} height={Math.round(width * 0.064)} color="#878787" />
        )}
        isSelected={selectedTab === 'LiveCamera'}
        onPress={onCameraPress || (() => onTabChange('LiveCamera'))}
      />
      <TabButton
        icon={selectedTab === 'History' ? (
          <ClockYellowIcon width={Math.round(width * 0.064)} height={Math.round(width * 0.064)} />
        ) : (
          <ClockIcon width={Math.round(width * 0.064)} height={Math.round(width * 0.064)} color="#878787" />
        )}
        isSelected={selectedTab === 'History'}
        onPress={onHistoryPress || (() => onTabChange('History'))}
      />
      <TabButton
        icon={selectedTab === 'Settings' ? (
          <SettingsYellowIcon width={Math.round(width * 0.064)} height={Math.round(width * 0.064)} />
        ) : (
          <SettingsIcon width={Math.round(width * 0.064)} height={Math.round(width * 0.064)} color="#878787" />
        )}
        isSelected={selectedTab === 'Settings'}
        onPress={() => onTabChange('Settings')}
      />
    </View>
  );
}

// Settings Item Component
interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showArrow?: boolean;
  danger?: boolean;
  width: number;
}

function SettingsItem({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  showArrow = true, 
  danger = false,
  width
}: SettingsItemProps) {
  const iconColor = danger ? '#dc143c' : '#FFD700';
  const textColor = danger ? '#dc143c' : 'white';
  const arrowColor = danger ? '#dc143c' : '#878787';
  
  return (
    <Pressable 
      style={[styles.settingsItem, { width: Math.min(330, width * 0.85) }]} 
      onPress={onPress}
    >
      <View style={styles.settingsItemIcon}>
        {icon}
      </View>
      <View style={styles.settingsItemContent}>
        <Text style={[styles.settingsItemTitle, { color: textColor, fontSize: Math.round(width * 0.038) }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.settingsItemSubtitle, { fontSize: Math.round(width * 0.031) }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {showArrow && (
        <ChevronRightIcon width={20} height={20} color={arrowColor} />
      )}
    </Pressable>
  );
}

// Settings Section Component
function SettingsSection({ 
  title, 
  children,
  width
}: { 
  title: string; 
  children: React.ReactNode;
  width: number;
}) {
  return (
    <View style={styles.settingsSection}>
      <Text style={[styles.sectionTitle, { fontSize: Math.round(width * 0.033) }]}>
        {title}
      </Text>
      <View style={styles.settingsItemsContainer}>
        {children}
      </View>
    </View>
  );
}

// Main Screen Component
export default function SettingsScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<TabType>('Settings');
  
  const titleTop = insets.top + Math.max(8, height * 0.01);
  const scrollContentTop = titleTop + Math.max(35, height * 0.04);
  
  function handleLogout() {
    // Here you can add the logout logic
    console.log('Logout');
    router.replace('/login');
  }
  
  return (
    <LinearGradient
      colors={['#1e1e1e', '#080808']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.18 }}
      style={styles.container}
    >
      <Text style={[styles.mainTitle, { top: titleTop, fontSize: Math.round(width * 0.059) }]}>
        Settings
      </Text>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: scrollContentTop,
            paddingBottom: insets.bottom + 80,
          }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <SettingsSection title="ACCOUNT" width={width}>
          <SettingsItem
            icon={<UserIcon width={22} height={22} color="#FFD700" />}
            title="Profile"
            subtitle="Edit your personal information"
            width={width}
          />
          <SettingsItem
            icon={<LockIcon width={22} height={22} color="#FFD700" />}
            title="Change Password"
            subtitle="Update your password"
            width={width}
          />
        </SettingsSection>
        
        <SettingsSection title="PREFERENCES" width={width}>
          <SettingsItem
            icon={<BellIcon width={22} height={22} color="#FFD700" />}
            title="Notifications"
            subtitle="Manage notification settings"
            width={width}
          />
          <SettingsItem
            icon={<MoonIcon width={22} height={22} color="#FFD700" />}
            title="Dark Mode"
            subtitle="Currently enabled"
            width={width}
          />
          <SettingsItem
            icon={<GlobeIcon width={22} height={22} color="#FFD700" />}
            title="Language"
            subtitle="English (US)"
            width={width}
          />
          <SettingsItem
            icon={<SmartphoneIcon width={22} height={22} color="#FFD700" />}
            title="Connected Devices"
            subtitle="Manage your Stable Pack devices"
            width={width}
          />
        </SettingsSection>
        
        <SettingsSection title="SECURITY & PRIVACY" width={width}>
          <SettingsItem
            icon={<ShieldIcon width={22} height={22} color="#FFD700" />}
            title="Privacy Settings"
            subtitle="Manage your privacy preferences"
            width={width}
          />
          <SettingsItem
            icon={<LockIcon width={22} height={22} color="#FFD700" />}
            title="Two-Factor Authentication"
            subtitle="Add extra security to your account"
            width={width}
          />
        </SettingsSection>
        
        <SettingsSection title="ABOUT" width={width}>
          <SettingsItem
            icon={<InfoIcon width={22} height={22} color="#FFD700" />}
            title="About App"
            subtitle="Version 1.0.0"
            width={width}
          />
          <SettingsItem
            icon={<InfoIcon width={22} height={22} color="#FFD700" />}
            title="Terms & Conditions"
            width={width}
          />
          <SettingsItem
            icon={<InfoIcon width={22} height={22} color="#FFD700" />}
            title="Privacy Policy"
            width={width}
          />
        </SettingsSection>
        
        <View style={styles.logoutSection}>
          <SettingsItem
            icon={<LogOutIcon width={22} height={22} color="#dc143c" />}
            title="Logout"
            subtitle="Sign out from your account"
            onPress={handleLogout}
            danger={true}
            width={width}
          />
        </View>
      </ScrollView>
      
      <BottomNavigation 
        selectedTab={selectedTab} 
        onTabChange={setSelectedTab}
        onDashboardPress={() => router.push('/dashboard')}
        onCameraPress={() => router.push('/camera')}
        onHistoryPress={() => router.push('/history')}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainTitle: {
    position: 'absolute',
    fontFamily: 'Poppins_900Black',
    color: 'white',
    textAlign: 'center',
    left: 0,
    right: 0,
    letterSpacing: -0.5,
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 30,
    gap: 24,
  },
  settingsSection: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFD700',
    marginBottom: 12,
    paddingHorizontal: 4,
    letterSpacing: 0.1,
  },
  settingsItemsContainer: {
    gap: 10,
  },
  settingsItem: {
    backgroundColor: '#131314',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: '#1e1e1e',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  settingsItemIcon: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsItemContent: {
    flex: 1,
  },
  settingsItemTitle: {
    fontFamily: 'Poppins_500Medium',
    color: 'white',
  },
  settingsItemSubtitle: {
    fontFamily: 'Poppins_300Light',
    color: '#8f9098',
    marginTop: 2,
  },
  logoutSection: {
    marginTop: 8,
    marginBottom: 24,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#131314',
    paddingHorizontal: 0,
  },
  bottomNavBorder: {
    position: 'absolute',
    top: 0,
    height: 2,
    backgroundColor: '#131314',
  },
  tabButton: {
    flex: 1,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    overflow: 'hidden',
  },
  tabButtonIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
  },
  tabButtonSelected: {
    borderRadius: 3,
  },
});
