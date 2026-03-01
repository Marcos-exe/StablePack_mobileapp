import * as Clipboard from 'expo-clipboard';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BoxIcon from '@/assets/icons/Box Icon.svg';
import BoxSmallIcon from '@/assets/icons/Box.svg';
import CameraPageIcon from '@/assets/icons/CameraPage.svg';
import CameraYellowIcon from '@/assets/icons/CameraYellow.svg';
import ClockIcon from '@/assets/icons/Clock.svg';
import ClockYellowIcon from '@/assets/icons/ClockYellow.svg';
import CopyIcon from '@/assets/icons/Copy.svg';
import HouseIcon from '@/assets/icons/House.svg';
import HouseYellowIcon from '@/assets/icons/HouseYellow.svg';
import HumidityIcon from '@/assets/icons/Humidity.svg';
import LockIcon from '@/assets/icons/Lock.svg';
import ReloadIcon from '@/assets/icons/Reload.svg';
import SettingsIcon from '@/assets/icons/Settings.svg';
import SettingsYellowIcon from '@/assets/icons/SettingsYellow.svg';
import TemperaturaIcon from '@/assets/icons/Temperatura Icon.svg';
import UnlockedIcon from '@/assets/icons/Unlocked.svg';

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
  onSettingsPress,
  onHistoryPress,
  onCameraPress
}: { 
  selectedTab: TabType; 
  onTabChange: (tab: TabType) => void;
  onSettingsPress?: () => void;
  onHistoryPress?: () => void;
  onCameraPress?: () => void;
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
        onPress={() => onTabChange('Dashboard')}
      />
      <TabButton
        icon={selectedTab === 'LiveCamera' ? (
          <CameraYellowIcon width={Math.round(width * 0.064)} height={Math.round(width * 0.064)} />
        ) : (
          <CameraPageIcon width={Math.round(width * 0.064)} height={Math.round(width * 0.064)} />
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
        onPress={onSettingsPress || (() => onTabChange('Settings'))}
      />
    </View>
  );
}

// ProgressBar Component
function ProgressBar({ value, width }: { value: number; width: number }) {
  const barHeight = 4;
  const barWidth = Math.round(width * 0.331); // 129px for 390px
  
  return (
    <View style={[styles.progressBarContainer, { height: barHeight, width: barWidth }]}>
      <View style={[styles.progressBarBg, { height: barHeight }]} />
      <View style={[styles.progressBarFill, { height: barHeight, width: `${value}%` }]} />
    </View>
  );
}

// PackageStatusCard Component (based on Figma code)
function PackageStatusCard({ width }: { width: number }) {
  const cardWidth = Math.min(362, width * 0.92);
  const marginHorizontal = Math.round(width * 0.041); // 16px for 390px (mx-4)
  const paddingH = Math.round(width * 0.041); // 16px for 390px (px-4)
  const paddingTop = Math.round(width * 0.041); // 16px for 390px (pt-4)
  const paddingBottom = Math.round(width * 0.031); // 12px for 390px (pb-3)
  const boxIconContainerSize = 52; // Fixed size from Figma
  const boxIconContainerBorderRadius = 14; // Fixed from Figma
  const lockIconSize = 12; // Fixed size from Figma
  const fontSizeTitle = Math.round(width * 0.041); // 16px for 390px
  const fontSizeSubtitle = Math.round(width * 0.031); // 12px for 390px
  const fontSizeBadge = Math.round(width * 0.031); // 12px for 390px
  const fontSizeTime = Math.round(width * 0.031); // 12px for 390px
  const fontSizeConfidence = Math.round(width * 0.028); // 11px for 390px
  const gapTopRow = Math.round(width * 0.041); // 16px for 390px (gap-4)
  const gapSubtitle = Math.round(width * 0.015); // 6px for 390px (gap-1.5)
  const gapAnalyzeRow = Math.round(width * 0.051); // 20px for 390px (gap-5)
  const paddingAnalyzeVertical = Math.round(width * 0.031); // 12px for 390px (py-3)
  const paddingBadgeH = Math.round(width * 0.031); // 12px for 390px (px-3)
  const paddingBadgeV = Math.round(width * 0.005); // 2px for 390px (py-0.5)
  
  return (
    <View style={[styles.packageStatusCard, { 
      width: cardWidth, 
      marginHorizontal,
      borderRadius: 25,
    }]}>
      {/* Top row: icon + title/subtitle */}
      <View style={[styles.packageStatusTopRow, { 
        paddingHorizontal: paddingH,
        paddingTop: paddingTop,
        paddingBottom: paddingBottom,
        gap: gapTopRow,
      }]}>
        {/* Box icon container */}
        <View style={[styles.boxIconContainer, { 
          width: boxIconContainerSize, 
          height: boxIconContainerSize,
          borderRadius: boxIconContainerBorderRadius,
        }]}>
          <BoxIcon width={40} height={42} color="#FFD700" />
        </View>

        {/* Title + subtitle */}
        <View style={styles.packageStatusTextContainer}>
          <Text style={[styles.packageStatusTitle, { fontSize: fontSizeTitle }]}>
            Package status
          </Text>
          <View style={[styles.packageStatusSubtitleRow, { 
            marginTop: Math.round(width * 0.005), // 2px for 390px (mt-0.5)
            gap: gapSubtitle,
          }]}>
            <LockIcon width={lockIconSize} height={lockIconSize} color="#FFD700" />
            <Text style={[styles.packageStatusSubtitle, { fontSize: fontSizeSubtitle }]}>
              Box is locked
            </Text>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={[styles.divider, { 
        marginLeft: paddingH,
        marginRight: paddingH,
      }]} />

      {/* Analyze row */}
      <View style={[styles.analyzeRow, { 
        paddingLeft: Math.round(width * 0.077), // 30px for 390px (more centered)
        paddingRight: Math.round(width * 0.077), // 30px for 390px (more centered)
        paddingVertical: paddingAnalyzeVertical,
        gap: gapAnalyzeRow,
      }]}>
        {/* Damaged badge - only border, no fill */}
        <View style={[styles.damagedBadge, { 
          borderRadius: 100,
          borderWidth: 1,
          borderColor: '#DC143C',
          paddingHorizontal: paddingBadgeH,
          paddingVertical: paddingBadgeV,
        }]}>
          <Text style={[styles.damagedText, { fontSize: fontSizeBadge }]}>Damaged</Text>
        </View>

        <Text style={[styles.analyzeTime, { fontSize: fontSizeTime, flexShrink: 0 }]}>5 minutes ago</Text>

        <Text style={[styles.analyzeConfidence, { fontSize: fontSizeConfidence, flexShrink: 0 }]}>49% Confidence</Text>
      </View>
    </View>
  );
}

// SensorCard Component
function SensorCard({
  width,
  icon,
  label,
  value,
  progress,
}: {
  width: number;
  icon: React.ReactNode;
  label: string;
  value: string;
  progress: number;
}) {
  const cardWidth = Math.min(178, width * 0.45);
  const padding = Math.round(width * 0.031); // 12px for 390px
  const fontSizeLabel = Math.round(width * 0.028); // 11px for 390px
  const fontSizeValue = Math.round(width * 0.028); // 11px for 390px
  const iconSize = 14; // Fixed size from design
  
  return (
    <View style={[styles.sensorCard, { 
      width: cardWidth,
      borderRadius: 17,
      padding,
    }]}>
      {/* Row: icon + label + value */}
      <View style={[styles.sensorRow, { 
        marginBottom: Math.round(width * 0.026), // 10px for 390px
        gap: Math.round(width * 0.015), // 6px for 390px
      }]}>
        <View style={{ width: iconSize, height: iconSize }}>
          {icon}
        </View>
        <Text style={[styles.sensorLabel, { fontSize: fontSizeLabel, flex: 1 }]}>{label}</Text>
        <Text style={[styles.sensorValue, { fontSize: fontSizeValue }]}>{value}</Text>
      </View>
      <ProgressBar value={progress} width={width} />
    </View>
  );
}

// SensorCards Component
function SensorCards({ width, temperature, humidity }: { width: number; temperature?: number; humidity?: number }) {
  const marginHorizontal = Math.round(width * 0.038); // 15px for 390px
  const gap = Math.round(width * 0.031); // 12px for 390px
  const iconSize = 14; // Fixed size from design
  
  // Format temperature value
  const tempValue = temperature !== undefined ? `${Math.round(temperature)}ºC` : '--ºC';
  // Calculate progress based on temperature (assuming normal range 0-40ºC, optimal around 20-25ºC)
  const tempProgress = temperature !== undefined 
    ? Math.min(100, Math.max(0, (temperature / 40) * 100))
    : 0;
  
  // Format humidity value
  const humidityValue = humidity !== undefined ? `${Math.round(humidity)}%` : '--%';
  const humidityProgress = humidity !== undefined ? humidity : 0;
  
  return (
    <View style={[styles.sensorCardsContainer, { 
      marginHorizontal,
      gap,
    }]}>
      <SensorCard
        width={width}
        icon={<TemperaturaIcon width={iconSize} height={iconSize} color="white" />}
        label="Temperature"
        value={tempValue}
        progress={tempProgress}
      />
      <SensorCard
        width={width}
        icon={<HumidityIcon width={12} height={15} color="white" />}
        label="Humidity"
        value={humidityValue}
        progress={humidityProgress}
      />
    </View>
  );
}

// AccessPinCard Component
function AccessPinCard({ width }: { width: number }) {
  const [pin, setPin] = useState('8472');
  
  const cardWidth = Math.min(178, width * 0.45);
  const padding = Math.round(width * 0.031); // 12px for 390px
  const fontSizeTitle = Math.round(width * 0.041); // 16px for 390px
  const fontSizePin = Math.round(width * 0.041); // 16px for 390px
  const fontSizeGenerate = Math.round(width * 0.028); // 11px for 390px
  const iconSize = 16; // Fixed size from design
  
  // Generate random 4-digit PIN
  const generateNewPin = () => {
    const newPin = Math.floor(1000 + Math.random() * 9000).toString();
    setPin(newPin);
  };
  
  // Copy PIN to clipboard
  const copyPinToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(pin);
      Alert.alert('Copied!', 'PIN copied to clipboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy PIN');
    }
  };
  
  return (
    <View style={[styles.infoCard, { 
      width: cardWidth,
      borderRadius: 17,
      padding,
    }]}>
      <Text style={[styles.infoCardTitle, { 
        fontSize: fontSizeTitle,
        marginBottom: Math.round(width * 0.023), // 9px for 390px
        textAlign: 'left',
        paddingLeft: Math.round(width * 0.026), // 10px for 390px
      }]}>
        Acess Pin Code
      </Text>

      {/* PIN display - clickable to copy */}
      <Pressable 
        onPress={copyPinToClipboard}
        style={[styles.actionButton, { 
          paddingHorizontal: padding,
          paddingVertical: Math.round(width * 0.015), // 6px for 390px
          marginBottom: Math.round(width * 0.021), // 8px for 390px
          gap: Math.round(width * 0.033), // 13px for 390px
        }]}>
        <Text style={[styles.pinText, { fontSize: fontSizePin, marginLeft: 35 }]}>{pin}</Text>
        <CopyIcon width={iconSize} height={iconSize} color="#FFFFFF" />
      </Pressable>

      {/* Generate button - clickable to generate new PIN */}
      <Pressable 
        onPress={generateNewPin}
        style={[styles.actionButton, { 
          paddingHorizontal: padding,
          paddingVertical: Math.round(width * 0.026), // 10px for 390px
          gap: Math.round(width * 0.015), // 6px for 390px
        }]}>
        <Text style={[styles.generateText, { fontSize: fontSizeGenerate }]}>
          Generate new{'\n'}Acess Pin
        </Text>
        <ReloadIcon width={iconSize} height={iconSize} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

// DeliverInfoCard Component
function DeliverInfoCard({ width }: { width: number }) {
  const cardWidth = Math.min(178, width * 0.45);
  const padding = Math.round(width * 0.031); // 12px for 390px
  const fontSizeTitle = Math.round(width * 0.041); // 16px for 390px
  const fontSizeTag = Math.round(width * 0.028); // 11px for 390px
  const fontSizeArrival = Math.round(width * 0.026); // 10px for 390px
  
  return (
    <View style={[styles.infoCard, { 
      width: cardWidth,
      borderRadius: 17,
      padding,
    }]}>
      <Text style={[styles.infoCardTitle, { 
        fontSize: fontSizeTitle,
        marginBottom: Math.round(width * 0.023), // 9px for 390px
        textAlign: 'left',
        paddingLeft: Math.round(width * 0.026), // 10px for 390px
      }]}>
        Deliver Info
      </Text>

      {/* Tag row */}
      <View style={[styles.tagContainer, { 
        paddingVertical: Math.round(width * 0.015), // 6px for 390px
        paddingHorizontal: Math.round(width * 0.021), // 8px for 390px
        marginBottom: Math.round(width * 0.021), // 8px for 390px
        borderRadius: 7,
      }]}>
        <Text style={[styles.tagLabel, { fontSize: fontSizeTag }]}>
          <Text style={styles.tagLabelGold}>Tag:</Text> #SP-2R9ON3J2O
        </Text>
      </View>

      {/* Arrival info */}
      <View style={[styles.arrivalContainer, { 
        paddingHorizontal: padding,
        paddingVertical: Math.round(width * 0.021), // 8px for 390px
        borderRadius: 7,
        marginBottom: Math.round(width * 0.021), // 8px for 390px
      }]}>
        <Text style={[styles.arrivalText, { 
          fontSize: fontSizeArrival,
          marginBottom: Math.round(width * 0.005), // 2px for 390px
        }]}>
          Package will arrive in…
        </Text>
        <Text style={[styles.arrivalTime, { fontSize: fontSizeArrival }]}>
          {'  '}25 min
        </Text>
        <View style={{ marginTop: Math.round(width * 0.021) }}>
          <ProgressBar value={46} width={width} />
        </View>
      </View>
    </View>
  );
}

// InfoCards Component
function InfoCards({ width }: { width: number }) {
  const marginHorizontal = Math.round(width * 0.038); // 15px for 390px
  const gap = Math.round(width * 0.031); // 12px for 390px
  
  return (
    <View style={[styles.infoCardsContainer, { 
      marginHorizontal,
      gap,
    }]}>
      <AccessPinCard width={width} />
      <DeliverInfoCard width={width} />
    </View>
  );
}

// AlertItem Component
function AlertItem({
  width,
  icon,
  title,
  description,
  isLast,
}: {
  width: number;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  isLast?: boolean;
}) {
  const alertWidth = Math.min(330, width * 0.85);
  const paddingH = Math.round(width * 0.038); // 15px for 390px
  const paddingV = Math.round(width * 0.013); // 5px for 390px (better vertical padding)
  const iconSize = 22; // Fixed size from design
  const fontSizeTitle = Math.round(width * 0.031); // 12px for 390px (increased for better readability)
  const fontSizeDescription = Math.round(width * 0.023); // 9px for 390px (increased for better readability)
  const connectorWidth = 10; // Fixed from design
  const cardHeight = 40; // Fixed height from design
  const gapBetweenIconAndText = Math.round(width * 0.026); // 10px for 390px
  
  return (
    <View style={{ 
      marginBottom: isLast ? 0 : Math.round(width * 0.031), // 12px for 390px (increased spacing)
      position: 'relative',
      paddingLeft: Math.round(width * 0.026), // 10px to align with connector
    }}>
      {/* Horizontal connector - from timeline to card */}
      <View style={[styles.alertConnector, { 
        left: -Math.round(width * 0.026), // 10px to the left (from card start to timeline)
        top: cardHeight / 2 - 1, // Center of card (20px - 1px for half height of connector)
        width: connectorWidth,
        height: 2,
      }]} />
      
      {/* Card */}
      <View style={[styles.alertCard, { 
        width: alertWidth,
        minHeight: cardHeight,
        borderRadius: 10,
        paddingHorizontal: paddingH,
        paddingVertical: paddingV,
        gap: gapBetweenIconAndText,
      }]}>
        {/* Icon */}
        <View style={{ 
          width: iconSize, 
          height: iconSize,
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {icon}
        </View>
        
        {/* Text */}
        <View style={[styles.alertInfo, { flex: 1 }]}>
          <Text style={[styles.alertTitle, { fontSize: fontSizeTitle, marginBottom: 2 }]}>{title}</Text>
          <Text style={[styles.alertDescription, { fontSize: fontSizeDescription }]}>
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
}

// RecentAlerts Component
function RecentAlerts({ width }: { width: number }) {
  const marginHorizontal = Math.round(width * 0.038); // 15px for 390px
  const paddingLeft = Math.round(width * 0.092); // 36px for 390px (to align with card start)
  const paddingRight = Math.round(width * 0.067); // 26px for 390px
  const timelineLeft = Math.round(width * 0.067); // 26px for 390px (center of timeline)
  const fontSizeTitle = Math.round(width * 0.056); // 22px for 390px (increased for better visibility)
  const boxIconSize = 19; // Fixed size from design
  
  const alerts = [
    {
      id: 1,
      icon: <BoxSmallIcon width={boxIconSize} height={22} color="#FFD700" />,
      title: 'Package Delivered',
      description: (
        <>
          <Text style={styles.alertDescriptionText}>Package detected as </Text>
          <Text style={styles.alertDescriptionBoldRed}>damaged</Text>
          <Text style={styles.alertDescriptionText}> - 5 minutes ago</Text>
        </>
      ),
    },
    {
      id: 2,
      icon: <UnlockedIcon width={22} height={22} color="#FFD700" />,
      title: 'Box Unlocked',
      description: (
        <Text style={styles.alertDescriptionText}>Box unlocked with pin - 5 minutes ago</Text>
      ),
    },
    {
      id: 3,
      icon: <BoxSmallIcon width={boxIconSize} height={22} color="#FFD700" />,
      title: 'Package Sent',
      description: (
        <>
          <Text style={styles.alertDescriptionText}>Package detected as </Text>
          <Text style={styles.alertDescriptionBoldGreen}>intact</Text>
          <Text style={styles.alertDescriptionText}> - 1 hour ago</Text>
        </>
      ),
    },
    {
      id: 4,
      icon: <LockIcon width={22} height={22} color="#FFD700" />,
      title: 'Box Locked',
      description: (
        <Text style={styles.alertDescriptionText}>Automatic lock engaged - 1 hour ago</Text>
      ),
    },
    {
      id: 5,
      icon: <BoxSmallIcon width={boxIconSize} height={22} color="#FFD700" />,
      title: 'Package Delivered',
      description: (
        <>
          <Text style={styles.alertDescriptionText}>Package detected as </Text>
          <Text style={styles.alertDescriptionBoldGreen}>intact</Text>
          <Text style={styles.alertDescriptionText}> - 5 minutes ago</Text>
        </>
      ),
    },
  ];
  
  // Calculate title height to position timeline correctly
  const titleHeight = fontSizeTitle + Math.round(width * 0.092); // title + marginBottom
  
  return (
    <View style={[styles.recentAlertsContainer, { marginHorizontal }]}>
      {/* Title */}
      <Text style={[styles.recentAlertsTitle, { 
        fontSize: fontSizeTitle,
        marginBottom: Math.round(width * 0.103), // 40px for 390px (increased spacing)
        textAlign: 'center',
      }]}>
        Recent Alerts
      </Text>
      
      {/* Container for timeline and alerts */}
      <View style={{ position: 'relative', paddingLeft, paddingRight, minHeight: 300 }}>
        {/* Vertical timeline - starts after title, positioned at x=26 relative to container */}
        <View style={[styles.alertTimeline, { 
          left: timelineLeft - paddingLeft, // Adjust for container padding
          top: 0,
          bottom: 0,
          width: 2,
        }]} />
        
        {/* Alerts list */}
        {alerts.map((alert, index) => (
          <AlertItem
            key={alert.id}
            width={width}
            icon={alert.icon}
            title={alert.title}
            description={alert.description}
            isLast={index === alerts.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

export default function DashboardScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<TabType>('Dashboard');
  const [temperature, setTemperature] = useState<number | undefined>(undefined);
  const [humidity, setHumidity] = useState<number | undefined>(undefined);
  
  // Fetch device temperature and humidity
  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        // TODO: Replace with actual API endpoint when available
        // Example: const response = await fetch(`${API_BASE_URL}/device/sensors`);
        // const data = await response.json();
        // setTemperature(data.temperature);
        // setHumidity(data.humidity);
        
        // For now, using simulated data until API endpoint is available
        // This simulates realistic temperature readings (20-25ºC)
        const simulatedTemp = 20 + Math.random() * 5; // 20-25ºC
        const simulatedHumidity = 40 + Math.random() * 10; // 40-50%
        setTemperature(simulatedTemp);
        setHumidity(simulatedHumidity);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
        // On error, keep previous values or set to undefined
      }
    };
    
    // Fetch immediately
    fetchSensorData();
    
    // Update every 5 seconds to simulate real-time sensor updates
    const interval = setInterval(fetchSensorData, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  function goToSettings() {
    router.push('/settings');
  }
  
  function goToHistory() {
    router.push('/history');
  }
  
  function goToCamera() {
    router.push('/camera');
  }
  
  // Base design: 390px width, 844px height
  // Header: pt-8 pb-6 = 32px top, 24px bottom
  const headerPaddingTop = Math.round(width * 0.082); // 32px for 390px
  const headerPaddingBottom = Math.round(width * 0.062); // 24px for 390px
  const titleFontSize = Math.round(width * 0.059); // 23px for 390px
  const contentGap = Math.round(width * 0.031); // 12px for 390px (mt-3)
  const alertsGap = Math.round(width * 0.051); // 20px for 390px (mt-6)
  
  return (
    <LinearGradient
      colors={['#1e1e1e', '#080808']}
      locations={[0, 0.18]}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { 
          paddingTop: insets.top + headerPaddingTop,
          paddingBottom: insets.bottom + headerPaddingBottom + 66, // 66px for bottom nav
        }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.header, { 
          paddingBottom: headerPaddingBottom,
        }]}>
          <Text style={[styles.mainTitle, { fontSize: titleFontSize }]}>Dashboard</Text>
        </View>

        {/* Package Status Card */}
        <PackageStatusCard width={width} />

        {/* Sensor Cards */}
        <View style={{ marginTop: contentGap }}>
          <SensorCards width={width} temperature={temperature} humidity={humidity} />
        </View>

        {/* Access Pin + Deliver Info */}
        <View style={{ marginTop: contentGap }}>
          <InfoCards width={width} />
        </View>

        {/* Recent Alerts */}
        <View style={{ marginTop: alertsGap, paddingBottom: headerPaddingBottom }}>
          <RecentAlerts width={width} />
        </View>
      </ScrollView>
      
      <BottomNavigation 
        selectedTab={selectedTab} 
        onTabChange={setSelectedTab} 
        onSettingsPress={goToSettings} 
        onHistoryPress={goToHistory}
        onCameraPress={goToCamera}
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
  packageStatusCard: {
    backgroundColor: '#131314',
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  packageStatusTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boxIconContainer: {
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  packageStatusTextContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  packageStatusTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    color: '#FFD700',
  },
  packageStatusSubtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  packageStatusSubtitle: {
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.75)',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  analyzeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  damagedBadge: {
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    backgroundColor: 'transparent',
  },
  damagedText: {
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
    color: '#DC143C',
  },
  analyzeTime: {
    fontFamily: 'Poppins_300Light',
    fontWeight: '300',
    color: '#FFFFFF',
  },
  analyzeConfidence: {
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
    color: '#FFFFFF',
  },
  sensorCardsContainer: {
    flexDirection: 'row',
  },
  sensorCard: {
    flex: 1,
    backgroundColor: '#131314',
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  sensorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sensorLabel: {
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
    color: '#FFFFFF',
  },
  sensorValue: {
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
    color: '#FFFFFF',
  },
  progressBarContainer: {
    position: 'relative',
    borderRadius: 100,
  },
  progressBarBg: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#5c5c5c',
    borderRadius: 100,
  },
  progressBarFill: {
    backgroundColor: '#FFD700',
    borderRadius: 100,
  },
  infoCardsContainer: {
    flexDirection: 'row',
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#131314',
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  infoCardTitle: {
    fontFamily: 'Poppins_700Bold',
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'left',
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 4 },
    textShadowRadius: 4,
  },
  actionButton: {
    backgroundColor: '#1a1a1b',
    borderWidth: 1,
    borderColor: '#212123',
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  pinText: {
    fontFamily: 'Poppins_700Bold',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  generateText: {
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 14,
  },
  tagContainer: {
    backgroundColor: '#1a1a1b',
    borderWidth: 1,
    borderColor: '#212123',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  tagLabel: {
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
    color: '#FFFFFF',
  },
  tagLabelGold: {
    color: '#FFD700',
  },
  arrivalContainer: {
    backgroundColor: '#1a1a1b',
    borderWidth: 1,
    borderColor: '#212123',
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  arrivalText: {
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 15,
  },
  arrivalTime: {
    fontFamily: 'Poppins_500Medium',
    fontWeight: '500',
    color: '#FFFFFF',
  },
  recentAlertsContainer: {
    position: 'relative',
    width: '100%',
  },
  alertTimeline: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 215, 0, 0.5)',
  },
  recentAlertsTitle: {
    fontFamily: 'Poppins_700Bold',
    fontWeight: '700',
    color: '#FFD700',
    lineHeight: 24,
  },
  alertConnector: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 215, 0, 0.4)',
  },
  alertCard: {
    backgroundColor: '#131314',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
  },
  alertInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  alertTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 16,
  },
  alertDescription: {
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 14,
  },
  alertDescriptionText: {
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 14,
  },
  alertDescriptionBoldRed: {
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    color: '#DC143C',
  },
  alertDescriptionBoldGreen: {
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600',
    color: '#3CB371',
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
