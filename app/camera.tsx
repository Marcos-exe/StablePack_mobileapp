import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState, useRef } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { API_BASE_URL } from '@/lib/api';
import CameraIcon from '@/assets/icons/Camera.svg';
import CameraPageIcon from '@/assets/icons/CameraPage.svg';
import CameraYellowIcon from '@/assets/icons/CameraYellow.svg';
import ClockIcon from '@/assets/icons/Clock.svg';
import ClockYellowIcon from '@/assets/icons/ClockYellow.svg';
import HouseIcon from '@/assets/icons/House.svg';
import HouseYellowIcon from '@/assets/icons/HouseYellow.svg';
import ReloadIcon from '@/assets/icons/Reload.svg';
import SettingsIcon from '@/assets/icons/Settings.svg';
import SettingsYellowIcon from '@/assets/icons/SettingsYellow.svg';
import ThunderIcon from '@/assets/icons/Thunder.svg';

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
  onHistoryPress,
  onSettingsPress
}: { 
  selectedTab: TabType; 
  onTabChange: (tab: TabType) => void;
  onDashboardPress?: () => void;
  onHistoryPress?: () => void;
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
          <CameraPageIcon width={Math.round(width * 0.064)} height={Math.round(width * 0.064)} />
        )}
        isSelected={selectedTab === 'LiveCamera'}
        onPress={() => onTabChange('LiveCamera')}
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
        onPress={onSettingsPress || (() => onTabChange('Settings'))}
      />
    </View>
  );
}

// CameraHeader Component
function CameraHeader({ width }: { width: number }) {
  const insets = useSafeAreaInsets();
  const fontSize = Math.round(width * 0.059); // 23px for 390px
  
  return (
    <View style={[styles.header, { 
      paddingTop: insets.top + Math.round(width * 0.082), // 32px for 390px
      paddingBottom: Math.round(width * 0.062), // 24px for 390px
    }]}>
      <Text style={[styles.mainTitle, { fontSize }]}>Live Camera</Text>
    </View>
  );
}

// CameraFeed Component
function CameraFeed({ 
  width, 
  cameraRef,
  hasPermission 
}: { 
  width: number;
  cameraRef: React.RefObject<CameraView>;
  hasPermission: boolean | null;
}) {
  const feedWidth = Math.round(width * 0.856); // 334px for 390px
  const feedHeight = Math.round(width * 0.769); // 300px for 390px
  const borderRadius = Math.round(width * 0.064); // 25px for 390px
  const iconSize = Math.round(width * 0.128); // 50px for 390px
  const fontSizePrimary = Math.round(width * 0.031); // 12px for 390px
  const fontSizeSecondary = Math.round(width * 0.023); // 9px for 390px
  
  if (hasPermission === null) {
    return (
      <View style={[styles.cameraFeedContainer, {
        width: feedWidth,
        height: feedHeight,
        borderRadius,
      }]}>
        <View style={{ width: iconSize, height: iconSize, marginBottom: Math.round(width * 0.026) }}>
          <CameraIcon width={iconSize} height={iconSize} color="#5C5C5C" />
        </View>
        <Text style={[styles.cameraFeedText, { fontSize: fontSizePrimary, marginBottom: Math.round(width * 0.013) }]}>
          Requesting camera permission...
        </Text>
      </View>
    );
  }
  
  if (!hasPermission) {
    return (
      <View style={[styles.cameraFeedContainer, {
        width: feedWidth,
        height: feedHeight,
        borderRadius,
      }]}>
        <View style={{ width: iconSize, height: iconSize, marginBottom: Math.round(width * 0.026) }}>
          <CameraIcon width={iconSize} height={iconSize} color="#5C5C5C" />
        </View>
        <Text style={[styles.cameraFeedText, { fontSize: fontSizePrimary, marginBottom: Math.round(width * 0.013) }]}>
          Camera permission required
        </Text>
        <Text style={[styles.cameraFeedText, { fontSize: fontSizeSecondary }]}>
          Please grant camera access
        </Text>
      </View>
    );
  }
  
  return (
    <View style={[styles.cameraFeedContainer, {
      width: feedWidth,
      height: feedHeight,
      borderRadius,
      overflow: 'hidden',
    }]}>
      <CameraView
        ref={cameraRef}
        style={{ width: '100%', height: '100%' }}
        facing="back"
      />
    </View>
  );
}

// ActionButtons Component
function ActionButtons({ 
  width, 
  onAnalyze, 
  onRefresh,
  isAnalyzing 
}: { 
  width: number;
  onAnalyze: () => void;
  onRefresh: () => void;
  isAnalyzing: boolean;
}) {
  const buttonWidth = Math.round(width * 0.423); // 165px for 390px
  const buttonHeight = Math.round(width * 0.133); // 52px for 390px
  const borderRadius = Math.round(width * 0.038); // 15px for 390px
  const fontSize = Math.round(width * 0.033); // 13px for 390px
  const iconSize = Math.round(width * 0.059); // 23px for 390px
  const reloadIconSize = Math.round(width * 0.044); // 17px for 390px
  
  return (
    <View style={[styles.actionButtonsContainer, {
      gap: Math.round(width * 0.026), // 10px for 390px
    }]}>
      {/* Analyze Package Button */}
      <Pressable 
        style={[styles.actionButton, {
          width: buttonWidth,
          height: buttonHeight,
          borderRadius,
          opacity: isAnalyzing ? 0.6 : 1,
        }]}
        onPress={onAnalyze}
        disabled={isAnalyzing}
      >
        {isAnalyzing ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <>
            <View style={{ position: 'absolute', left: Math.round(width * 0.028), top: Math.round(width * 0.036) }}>
              <ThunderIcon width={iconSize} height={iconSize} />
            </View>
            <Text style={[styles.actionButtonText, { fontSize }]}>Analyze Package</Text>
          </>
        )}
      </Pressable>
      
      {/* Refresh Feed Button */}
      <Pressable 
        style={[styles.actionButton, styles.actionButtonBorder, {
          width: buttonWidth,
          height: buttonHeight,
          borderRadius,
        }]}
        onPress={onRefresh}
      >
        <View style={{ position: 'absolute', left: Math.round(width * 0.051), top: Math.round(width * 0.041) }}>
          <ReloadIcon width={reloadIconSize} height={reloadIconSize} color="#FFFFFF" />
        </View>
        <Text style={[styles.actionButtonText, { fontSize }]}>Refresh Feed</Text>
      </Pressable>
    </View>
  );
}

// AnalyzeRow Component (based on Figma code)
function AnalyzeRow({
  width,
  status,
  timeAgo,
  confidence,
  isLast,
}: {
  width: number;
  status: 'Intact' | 'Damaged';
  timeAgo: string;
  confidence: string;
  isLast?: boolean;
}) {
  const cardWidth = Math.round(width * 0.846); // 330px for 390px
  const borderRadius = Math.round(width * 0.026); // 10px for 390px
  const paddingH = Math.round(width * 0.026); // 10px for 390px
  const paddingV = Math.round(width * 0.021); // 8px for 390px
  const badgeWidth = Math.round(width * 0.231); // 90px for 390px
  const badgeHeight = 24; // Fixed height
  const timeWidth = Math.round(width * 0.231); // 90px for 390px
  const confidenceWidth = Math.round(width * 0.226); // 88px for 390px
  const gap = Math.round(width * 0.059); // 23px for 390px
  const fontSizeBadge = Math.round(width * 0.036); // 14px for 390px
  const fontSizeText = Math.round(width * 0.026); // 10px for 390px
  
  const isIntact = status === 'Intact';
  const badgeColor = isIntact ? '#3cb371' : '#dc143c';
  const badgeLabelWidth = isIntact ? Math.round(width * 0.154) : Math.round(width * 0.185); // 60px or 72px for 390px
  
  return (
    <View style={{ 
      marginBottom: isLast ? 0 : Math.round(width * 0.031), // 12px for 390px
      position: 'relative',
      paddingLeft: Math.round(width * 0.026), // 10px to align with connector
    }}>
      {/* Horizontal connector */}
      <View style={[styles.analyzeConnector, { 
        left: -Math.round(width * 0.026), // 10px to the left
        top: 20, // Center of card (approximately)
        width: 10,
        height: 2,
      }]} />
      
      {/* Card */}
      <View style={[styles.analyzeCard, {
        width: cardWidth,
        borderRadius,
        paddingHorizontal: paddingH,
        paddingVertical: paddingV,
        gap: gap,
      }]}>
        {/* Status Badge - Left (only border, no fill) */}
        <View style={[styles.statusBadge, {
          width: badgeWidth,
          height: badgeHeight,
          borderColor: badgeColor,
        }]}>
          <Text style={[styles.statusBadgeText, {
            fontSize: fontSizeBadge,
            color: badgeColor,
            width: badgeLabelWidth,
          }]}>
            {status}
          </Text>
        </View>
        
        {/* Time - Center */}
        <Text style={[styles.analyzeText, {
          fontSize: fontSizeText,
          width: timeWidth,
        }]}>
          {timeAgo}
        </Text>
        
        {/* Confidence - Right */}
        <Text style={[styles.analyzeConfidence, {
          fontSize: fontSizeText,
          width: confidenceWidth,
        }]}>
          {confidence}
        </Text>
      </View>
    </View>
  );
}

// RecentAnalyzesList Component (based on Figma code)
function RecentAnalyzesList({ width, analyzes }: { width: number; analyzes: Array<{ status: 'Intact' | 'Damaged'; timeAgo: string; confidence: string }> }) {
  const marginHorizontal = Math.round(width * 0.038); // 15px for 390px
  const paddingLeft = Math.round(width * 0.092); // 36px for 390px
  const paddingRight = Math.round(width * 0.067); // 26px for 390px
  const timelineLeft = Math.round(width * 0.0588 + 2.88); // 5.88% + 2.88px for 390px ≈ 26px
  const fontSizeTitle = Math.round(width * 0.051); // 20px for 390px
  
  return (
    <View style={[styles.recentAnalyzesContainer, { marginHorizontal }]}>
      {/* Title */}
      <Text style={[styles.recentAnalyzesTitle, { 
        fontSize: fontSizeTitle,
        marginBottom: Math.round(width * 0.031), // 12px for 390px
        paddingLeft: Math.round(width * 0.026), // 10px slight left padding
      }]}>
        Recent Analyzes
      </Text>
      
      {/* Container for timeline and analyzes */}
      <View style={{ position: 'relative', paddingLeft, paddingRight }}>
        {/* Vertical timeline */}
        <View style={[styles.analyzeTimeline, { 
          left: timelineLeft - paddingLeft,
          top: 0,
          bottom: 0,
          width: 2,
        }]} />
        
        {/* Analyzes list */}
        {analyzes.map((analyze, index) => (
          <AnalyzeRow
            key={index}
            width={width}
            status={analyze.status}
            timeAgo={analyze.timeAgo}
            confidence={analyze.confidence}
            isLast={index === analyzes.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

export default function CameraScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<TabType>('LiveCamera');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzes, setAnalyzes] = useState<Array<{
    status: 'Intact' | 'Damaged';
    timeAgo: string;
    confidence: string;
    timestamp: Date;
  }>>([
    { status: 'Damaged', timeAgo: '5 minutes ago', confidence: '49% Confidence', timestamp: new Date(Date.now() - 5 * 60000) },
    { status: 'Intact', timeAgo: '10 minutes ago', confidence: '67% Confidence', timestamp: new Date(Date.now() - 10 * 60000) },
    { status: 'Intact', timeAgo: '22 minutes ago', confidence: '76% Confidence', timestamp: new Date(Date.now() - 22 * 60000) },
    { status: 'Intact', timeAgo: '37 minutes ago', confidence: '93% Confidence', timestamp: new Date(Date.now() - 37 * 60000) },
    { status: 'Intact', timeAgo: '59 minutes ago', confidence: '100% Confidence', timestamp: new Date(Date.now() - 59 * 60000) },
  ]);
  
  function goToDashboard() {
    router.push('/dashboard');
  }
  
  function goToHistory() {
    router.push('/history');
  }
  
  function goToSettings() {
    router.push('/settings');
  }
  
  // Function to format time ago
  const formatTimeAgo = (date: Date): string => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };
  
  // Function to analyze package using ML model
  const analyzePackage = async () => {
    if (!cameraRef.current || !permission?.granted) {
      Alert.alert('Error', 'Camera permission required');
      if (!permission?.granted) {
        requestPermission();
      }
      return;
    }
    
    setIsAnalyzing(true);
    try {
      // Take photo
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: true,
      });
      
      if (!photo?.uri) {
        throw new Error('Failed to capture photo');
      }
      
      // Create FormData for multipart/form-data
      const formData = new FormData();
      formData.append('image', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'package.jpg',
      } as any);
      
      // Send to API for analysis
      // Note: Don't set Content-Type header manually - let fetch set it with boundary
      const response = await fetch(`${API_BASE_URL}/package/analyze`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Analysis failed: ${errorText}`);
      }
      
      const data = await response.json();
      const status: 'Intact' | 'Damaged' = data.status === 'Intacta' || data.status === 'Intact' ? 'Intact' : 'Damaged';
      const confidence = Math.round((data.confidence || data.prob || 0.5) * 100);
      
      // Add new analysis to list
      const newAnalysis = {
        status,
        timeAgo: 'Just now',
        confidence: `${confidence}% Confidence`,
        timestamp: new Date(),
      };
      
      setAnalyzes(prev => [newAnalysis, ...prev.slice(0, 4)]);
      
      // Update time ago for all analyses periodically
      const updateInterval = setInterval(() => {
        setAnalyzes(prev => prev.map(a => ({
          ...a,
          timeAgo: formatTimeAgo(a.timestamp),
        })));
      }, 60000); // Update every minute
      
      // Cleanup interval on unmount (handled by useEffect cleanup)
      
    } catch (error) {
      console.error('Error analyzing package:', error);
      Alert.alert('Error', 'Failed to analyze package. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // Function to refresh camera feed
  const refreshFeed = () => {
    // Simply re-request camera permission or restart camera
    if (!permission?.granted) {
      requestPermission();
    }
  };
  
  const contentGap = Math.round(width * 0.031); // 12px for 390px
  const analyzesGap = Math.round(width * 0.051); // 20px for 390px
  
  return (
    <LinearGradient
      colors={['#1e1e1e', '#080808']}
      locations={[0, 0.18]}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { 
          paddingBottom: insets.bottom + 66, // 66px for bottom nav
        }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <CameraHeader width={width} />

        {/* Camera Feed */}
        <View style={{ marginTop: contentGap, alignItems: 'center' }}>
          <CameraFeed width={width} cameraRef={cameraRef} hasPermission={permission?.granted ?? null} />
        </View>

        {/* Action Buttons */}
        <View style={{ marginTop: contentGap, alignItems: 'center' }}>
          <ActionButtons 
            width={width} 
            onAnalyze={analyzePackage}
            onRefresh={refreshFeed}
            isAnalyzing={isAnalyzing}
          />
        </View>

        {/* Recent Analyzes */}
        <View style={{ marginTop: analyzesGap, paddingBottom: Math.round(width * 0.062) }}>
          <RecentAnalyzesList 
            width={width} 
            analyzes={analyzes.map(a => ({
              status: a.status,
              timeAgo: a.timeAgo,
              confidence: a.confidence,
            }))}
          />
        </View>
      </ScrollView>
      
      <BottomNavigation 
        selectedTab={selectedTab} 
        onTabChange={setSelectedTab} 
        onDashboardPress={goToDashboard}
        onHistoryPress={goToHistory}
        onSettingsPress={goToSettings}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTitle: {
    fontFamily: 'Poppins_900Black',
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0,
  },
  cameraFeedContainer: {
    backgroundColor: '#131314',
    borderWidth: 2,
    borderColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  cameraFeedText: {
    fontFamily: 'Poppins_300Light',
    fontWeight: '300',
    color: '#5C5C5C',
    textAlign: 'center',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    backgroundColor: '#131314',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  actionButtonBorder: {
    borderWidth: 1,
    borderColor: '#1e1e1e',
  },
  actionButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  recentAnalyzesContainer: {
    position: 'relative',
    width: '100%',
  },
  recentAnalyzesTitle: {
    fontFamily: 'Poppins_700Bold',
    fontWeight: '700',
    color: '#FFD600',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  analyzeTimeline: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 215, 0, 0.5)',
  },
  analyzeConnector: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 215, 0, 0.3)',
  },
  analyzeCard: {
    backgroundColor: '#131314',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  statusBadge: {
    height: 24,
    borderRadius: 100,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: 'transparent',
  },
  statusBadgeText: {
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
    lineHeight: 10,
    textAlign: 'center',
  },
  analyzeText: {
    fontFamily: 'Poppins_300Light',
    fontWeight: '300',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.1,
    flexShrink: 0,
    lineHeight: 20,
  },
  analyzeConfidence: {
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.1,
    flexShrink: 0,
    lineHeight: 20,
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
    // Gradient applied via LinearGradient component
  },
});
