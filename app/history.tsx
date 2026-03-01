import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
    withSpring,
} from 'react-native-reanimated';

import CameraIcon from '@/assets/icons/Camera.svg';
import CameraPageIcon from '@/assets/icons/CameraPage.svg';
import CameraYellowIcon from '@/assets/icons/CameraYellow.svg';
import ClockIcon from '@/assets/icons/Clock.svg';
import ClockYellowIcon from '@/assets/icons/ClockYellow.svg';
import HouseIcon from '@/assets/icons/House.svg';
import HouseYellowIcon from '@/assets/icons/HouseYellow.svg';
import SettingsIcon from '@/assets/icons/Settings.svg';
import SettingsYellowIcon from '@/assets/icons/SettingsYellow.svg';

type TabType = 'Dashboard' | 'LiveCamera' | 'History' | 'Settings';

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

function BottomNavigation({ 
  selectedTab, 
  onTabChange,
  onDashboardPress,
  onCameraPress,
  onSettingsPress
}: { 
  selectedTab: TabType; 
  onTabChange: (tab: TabType) => void;
  onDashboardPress?: () => void;
  onCameraPress?: () => void;
  onSettingsPress?: () => void;
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
        onPress={() => onTabChange('History')}
      />
      <TabButton
        icon={selectedTab === 'Settings' ? (
          <SettingsYellowIcon width={Math.round(width * 0.064)} height={Math.round(width * 0.064)} />
        ) : (
          <SettingsIcon width={Math.round(width * 0.064)} height={Math.round(width * 0.064)} color="#878787" />
        )}
        isSelected={selectedTab === 'Settings'}
        onPress={onSettingsPress || (() => onTabChange('Settings'))}
      />
    </View>
  );
}

function StatsBar({
  total,
  intact,
  damaged,
  width
}: {
  total: number;
  intact: number;
  damaged: number;
  width: number;
}) {
  // Base design: 390px width
  // mx-[15px] = 15px margin horizontal each side
  // h-[57px] = 57px height
  const marginHorizontal = Math.round(width * 0.038); // 15px for 390px
  const cardWidth = width - (marginHorizontal * 2);
  const cardHeight = Math.round(width * 0.146); // 57px for 390px
  const fontSizeTitle = Math.round(width * 0.026); // 10px for 390px
  const fontSizeValue = Math.round(width * 0.064); // 25px for 390px

  return (
    <View style={[styles.statsBar, { 
      width: cardWidth, 
      height: cardHeight,
      marginHorizontal,
    }]}>
      {/* Total Deliveries */}
      <View style={styles.statsItem}>
        <Text style={[styles.statsTitle, { fontSize: fontSizeTitle }]}>Total Deliveries</Text>
        <Text style={[styles.statsValue, { fontSize: fontSizeValue }]}>{total}</Text>
      </View>

      {/* Divider */}
      <View style={[styles.statsDivider, { height: cardHeight }]} />

      {/* Intact Deliveries */}
      <View style={styles.statsItem}>
        <Text style={[styles.statsTitle, { fontSize: fontSizeTitle }]}>Intact Deliveries</Text>
        <Text style={[styles.statsValue, styles.statsValueIntact, { fontSize: fontSizeValue }]}>{intact}</Text>
      </View>

      {/* Divider */}
      <View style={[styles.statsDivider, { height: cardHeight }]} />

      {/* Damaged Deliveries */}
      <View style={styles.statsItem}>
        <Text style={[styles.statsTitle, { fontSize: fontSizeTitle }]}>Damaged Deliveries</Text>
        <Text style={[styles.statsValue, styles.statsValueDamaged, { fontSize: fontSizeValue }]}>{damaged}</Text>
      </View>
    </View>
  );
}

function LargeClockIcon({ size }: { size: number }) {
  return (
    <ClockIcon width={size} height={size} color="#5C5C5C" />
  );
}

function DeliveriesCard({ width }: { width: number }) {
  // Base design: 390px width
  // mx-[15px] = 15px margin horizontal each side
  // Header: px-5 pt-4 pb-3 = 20px horizontal, 16px top, 12px bottom
  // Empty state: gap-3 py-8 = 12px gap, 32px vertical padding
  const marginHorizontal = Math.round(width * 0.038); // 15px for 390px
  const cardWidth = width - (marginHorizontal * 2);
  const headerPaddingH = Math.round(width * 0.051); // 20px for 390px
  const headerPaddingTop = Math.round(width * 0.041); // 16px for 390px
  const headerPaddingBottom = Math.round(width * 0.031); // 12px for 390px
  const fontSizeTitle = Math.round(width * 0.046); // 18px for 390px
  const fontSizeDescription = Math.round(width * 0.031); // 12px for 390px
  const fontSizeSubtitle = Math.round(width * 0.023); // 9px for 390px
  const iconSize = Math.round(width * 0.128); // 50px for 390px
  const emptyStateGap = Math.round(width * 0.031); // 12px for 390px
  const emptyStatePaddingV = Math.round(width * 0.082); // 32px for 390px

  return (
    <View style={[styles.deliveriesCard, { 
      width: cardWidth, 
      marginHorizontal,
    }]}>
      {/* Card Header */}
      <View style={[styles.deliveriesHeader, { 
        paddingHorizontal: headerPaddingH,
        paddingTop: headerPaddingTop,
        paddingBottom: headerPaddingBottom,
      }]}>
        <Text style={[styles.deliveriesTitle, { fontSize: fontSizeTitle }]}>Deliveries</Text>
      </View>

      {/* Empty State */}
      <View style={[styles.emptyState, { 
        gap: emptyStateGap, 
        paddingVertical: emptyStatePaddingV 
      }]}>
        <LargeClockIcon size={iconSize} />
        <View style={styles.emptyStateText}>
          <Text style={[styles.emptyStateDescription, { fontSize: fontSizeDescription }]}>
            Past delivery records will appear here.
          </Text>
          <Text style={[styles.emptyStateSubtitle, { fontSize: fontSizeSubtitle, marginTop: Math.round(width * 0.005) }]}>
            (No deliveries completed yet)
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function HistoryScreen() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(20);

  useEffect(() => {
    titleOpacity.value = withDelay(100, withTiming(1, { 
      duration: 800, 
      easing: Easing.out(Easing.cubic) 
    }));
    titleTranslateY.value = withDelay(100, withSpring(0, {
      damping: 18,
      stiffness: 100,
      mass: 0.9,
    }));
  }, []);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  // Base design: 390px width, 844px height
  // Title: pt-8 pb-4 = 32px top, 16px bottom
  // Content: pt-2 pb-4 = 8px top, 16px bottom
  // Gap between StatsBar and DeliveriesCard: gap-4 = 16px
  const titlePaddingTop = Math.round(width * 0.051); // 20px for 390px (reduced to move title higher)
  const titlePaddingBottom = Math.round(width * 0.041); // 16px for 390px (pb-4)
  const titleFontSize = Math.round(width * 0.059); // 23px for 390px
  const contentPaddingBottom = Math.round(width * 0.041); // 16px for 390px (pb-4)
  const contentGap = Math.round(width * 0.041); // 16px for 390px (gap-4)

  return (
    <LinearGradient
      colors={['#1e1e1e', '#080808']}
      locations={[0, 0.17788]}
      style={[styles.container, { width, height }]}
    >
      {/* Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { 
          paddingTop: insets.top + titlePaddingTop,
          paddingBottom: contentPaddingBottom + 66, // 66px for bottom nav
          gap: contentGap,
        }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Animated.View style={[styles.titleContainer, { 
          paddingBottom: titlePaddingBottom,
        }, titleAnimatedStyle]}>
          <Text style={[styles.title, { fontSize: titleFontSize }]}>History</Text>
        </Animated.View>

        <StatsBar total={0} intact={0} damaged={0} width={width} />
        <DeliveriesCard width={width} />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation
        selectedTab="History"
        onTabChange={(tab) => {
          if (tab === 'Dashboard') {
            router.push('/dashboard');
          } else if (tab === 'LiveCamera') {
            router.push('/camera');
          } else if (tab === 'Settings') {
            router.push('/settings');
          }
        }}
        onDashboardPress={() => router.push('/dashboard')}
        onCameraPress={() => router.push('/camera')}
        onSettingsPress={() => router.push('/settings')}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  statsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#131314',
    borderWidth: 0.5,
    borderColor: '#1a1a1b',
    borderRadius: 13,
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    alignSelf: 'stretch',
  },
  statsItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  statsTitle: {
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  statsValue: {
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 20,
  },
  statsValueIntact: {
    color: '#3cb371',
  },
  statsValueDamaged: {
    color: '#dc143c',
  },
  statsDivider: {
    width: 1,
    backgroundColor: '#1a1a1b',
  },
  deliveriesCard: {
    backgroundColor: '#131314',
    borderRadius: 13,
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    flex: 1,
    alignSelf: 'stretch',
  },
  deliveriesHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1b',
  },
  deliveriesTitle: {
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 0.1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
  },
  emptyStateText: {
    alignItems: 'center',
    maxWidth: 225,
  },
  emptyStateDescription: {
    fontFamily: 'Poppins_300Light',
    fontWeight: '300',
    color: '#5c5c5c',
    textAlign: 'center',
    lineHeight: 15,
  },
  emptyStateSubtitle: {
    fontFamily: 'Poppins_300Light',
    fontWeight: '300',
    color: '#5c5c5c',
    textAlign: 'center',
    lineHeight: 15,
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
    zIndex: 100,
  },
  bottomNavBorder: {
    position: 'absolute',
    top: 0,
    height: 2,
    backgroundColor: '#1a1a1b',
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
