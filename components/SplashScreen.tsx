import { Image } from 'expo-image';
import {
  useWindowDimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function Relampago({ size }: { size: number }) {
  const half = size / 2;
  return (
    <Image
      source={require('@/assets/images/thunder.png')}
      style={[splashStyles.relampago, { width: size, height: size, transform: [{ translateX: -half }, { translateY: -half }] }]}
      contentFit="contain"
    />
  );
}

function Logo({ size }: { size: number }) {
  return (
    <View style={[splashStyles.logo, { width: size, height: size }]}>
      <Image
        source={require('@/assets/images/box.png')}
        style={[splashStyles.box, { width: size, height: size }]}
        contentFit="cover"
      />
      <Relampago size={size} />
    </View>
  );
}

function TextSolvex({ width }: { width: number }) {
  const fontSize = Math.min(20, width * 0.05);
  return (
    <View style={splashStyles.textSolvex}>
      <Text style={[splashStyles.fromText, { fontSize }]}>from</Text>
      <Text style={[splashStyles.solvexText, { fontSize, marginTop: 0 }]}>SOLVEX</Text>
    </View>
  );
}

export function SplashScreenContent() {
  const { width, height } = useWindowDimensions();
  const logoSize = Math.min(160, width * 0.4, height * 0.22);
  const paddingBottom = Math.max(24, height * 0.06);

  return (
    <View style={splashStyles.container}>
      <View style={splashStyles.bgLayer}>
        <Image
          source={require('@/assets/images/splash-background.png')}
          style={splashStyles.splashBg}
          contentFit="cover"
        />
      </View>
      <View style={splashStyles.logoArea}>
        <Logo size={logoSize} />
      </View>
      <View style={[splashStyles.textArea, { paddingBottom }]}>
        <TextSolvex width={width} />
      </View>
    </View>
  );
}

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
  bgLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  splashBg: {
    width: '100%',
    height: '100%',
  },
  logoArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  logo: {
    position: 'relative',
  },
  box: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  relampago: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  textArea: {
    zIndex: 10,
  },
  textSolvex: {
    alignItems: 'center',
  },
  fromText: {
    color: 'white',
    margin: 0,
    fontFamily: 'Poppins_400Regular',
  },
  solvexText: {
    color: 'white',
    fontFamily: 'Archivo_900Black',
    margin: 0,
  },
});
