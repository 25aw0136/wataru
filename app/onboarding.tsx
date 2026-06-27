import { GlassView } from 'expo-glass-effect';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ─────────────────────────────────────────────────────────────────────────────
// Local assets
// ─────────────────────────────────────────────────────────────────────────────
const SHIP = require('../assets/figma/ship.svg');
const SHIP_WAVE = require('../assets/figma/shipandwave.svg');

// Phone + Bluetooth-wave icon for step 3 (Figma node 286:1782).
const BLUETOOTH_PHONE = require('../assets/figma/bluetooth.png');

const ISLAND_IMGS = [
    require('../assets/figma/island1.png'),
    require('../assets/figma/island2.png'),
    require('../assets/figma/island1.png'),
    require('../assets/figma/island2.png'),
    require('../assets/figma/island1.png'),
    require('../assets/figma/island2.png'),

];

// Island card grid layout — from Figma (node 226:606): 3 cols × 2 rows,
// 8px gap, each cell 91.33 × 111. Container is centered, 290 × 230, top: 157.
const CARD_W = 91.33;
const CARD_H = 111;
const GAP = 8;

const GRID = [0, 1, 2, 3, 4, 5].map((i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  return {
    left: col * (CARD_W + GAP),
    top: row * (CARD_H + GAP),
    img: ISLAND_IMGS[i],
  };
});

// ─────────────────────────────────────────────────────────────────────────────
// Per-step button rect (values straight from each Figma frame)
// ─────────────────────────────────────────────────────────────────────────────
const BUTTONS = [
  { top: 707, left: 97, width: 204, height: 60, label: 'はじめる' }, // step 0
  { top: 707, left: 111, width: 180, height: 60, label: 'つぎへ' },  // step 1
  { top: 707, left: 111, width: 180, height: 60, label: 'つぎへ' },  // step 2
  { top: 707, left: 103, width: 196, height: 60, label: '出港する' }, // step 3
];

export default function Onboarding() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const opacity = useRef(new Animated.Value(1)).current;

  // Night mode — follows the system's dark mode setting automatically,
  // but can be manually overridden with the toggle button.
  const colorScheme = useColorScheme();
  const systemNightMode = colorScheme === 'dark';
  const [manualNightMode, setManualNightMode] = useState<boolean | null>(null);
  const isNightMode = manualNightMode ?? systemNightMode;
  const toggleNightMode = () => {
    setManualNightMode((current) => !(current ?? systemNightMode));
  };

  const scaleX = width / 393;
  const scaleY = height / 852;

  const fadeTransition = (toStep: number) => {
    Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
      setStep(toStep);
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    });
  };

  const handleNext = () => {
    if (step < 3) fadeTransition(step + 1);
    else router.replace('/(tabs)');
  };

  const btn = BUTTONS[step];

  return (
    <LinearGradient
      colors={
        isNightMode
          ? ['#060028', '#31005E', '#2C56AF', '#0090EB']
          : ['#0090eb', '#48b1f4', '#a5dcff']
      }
      locations={isNightMode ? [0, 0.50481, 0.83654, 1] : [0, 0.30288, 1]}
      style={styles.screen}
    >
      {/* Night-mode toggle — tap to override the system setting */}
      <Pressable
        onPress={toggleNightMode}
        hitSlop={8}
        style={({ pressed }) => [
          styles.nightToggle,
          { top: insets.top + 16 },
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.nightToggleText}>{isNightMode ? '☀️' : '🌙'}</Text>
      </Pressable>

      <Animated.View style={[styles.content, { opacity }]}>

        {/* ── STEP 0 · ようこそ、航 へ ─────────────────────────── */}
        {step === 0 && (
          <>
            <View
              style={[
                styles.shipWrapper,
                {
                  top: height * 0.2952,
                  left: width * 0.3781,
                  width: width * (1 - 0.3781 - 0.3831),
                  height: height * (1 - 0.2952 - 0.595),
                },
              ]}
            >
              <Image source={SHIP} style={styles.shipImage} contentFit="contain" />
            </View>

            <Text style={[styles.welcomeText, { top: height / 2 - 43 }]}>
              ようこそ、航 へ
            </Text>
          </>
        )}

        {/* ── STEP 1 · 電車の揺れが、波の音に変わる。 ───────────── */}
        {step === 1 && (
          <>
            <ProgressDots activeIndex={0} />

            <View
              style={{
                position: 'absolute',
                top: 204 * scaleY,
                left: (width - 203 * scaleX) / 2,
                width: 203 * scaleX,
                height: 122.31 * scaleY,
              }}
            >
              <Image
                source={SHIP_WAVE}
                style={{ width: '100%', height: '100%' }}
                contentFit="contain"
              />
            </View>

            <Text style={[styles.heading, { top: 467 * scaleY }]}>
              {'電車の揺れが、\n波の音に変わる。'}
            </Text>

            <Text
              style={[
                styles.body,
                { top: 555 * scaleY, left: 30 * scaleX, width: 342 * scaleX },
              ]}
            >
              電車の揺れを感知し、その動きに合わせて波音がリアルタイムに変化します。まるで海の上を航海しているような感覚を楽しめます。
            </Text>
          </>
        )}

        {/* ── STEP 2 · 航海のたびに、島と出会う。 ───────────────── */}
        {step === 2 && (
          <>
            <ProgressDots activeIndex={1} />

            {/* Island card grid — 290 × 230, centered, top: 157 */}
            <View
              style={{
                position: 'absolute',
                top: 157 * scaleY,
                left: (width - 290 * scaleX) / 2,
                width: 290 * scaleX,
                height: 230 * scaleY,
              }}
            >
              {GRID.map((card, i) => (
                <View
                  key={i}
                  style={{
                    position: 'absolute',
                    left: card.left * scaleX,
                    top: card.top * scaleY,
                    width: CARD_W * scaleX,
                    height: CARD_H * scaleY,
                  }}
                >
                  <Image
                    source={card.img}
                    style={[StyleSheet.absoluteFillObject, { transform: [{ scale: 1.2 }] }]}
                    contentFit="cover"
                  />
                </View>
              ))}
            </View>

            <Text style={[styles.heading, { top: 467 * scaleY }]}>
              {'航海のたびに、\n島と出会う。'}
            </Text>

            <Text
              style={[
                styles.body,
                { top: 555 * scaleY, left: 30 * scaleX, width: 342 * scaleX },
              ]}
            >
              {'移動中、ときどき新しい島を発見できます。\n見つけた島は「島のコレクション」から写真や豆知識を見返せます。\n航海を重ねるごとに珍しい島に出会えます。'}
            </Text>
          </>
        )}

        {/* ── STEP 3 · 航海の準備 ───────────────────────────────── */}
        {step === 3 && (
          <>
            <ProgressDots activeIndex={2} />

            {/* Phone + Bluetooth-wave icon — inset 19.91% 39.68% 57.76% 39.55% */}
            <View
              style={{
                position: 'absolute',
                top: height * 0.1991,
                left: width * 0.3955,
                width: width * (1 - 0.3955 - 0.3968),
                height: height * (1 - 0.1991 - 0.5776),
              }}
            >
              <Image
                source={BLUETOOTH_PHONE}
                style={{ width: '100%', height: '100%' }}
                contentFit="contain"
              />
            </View>

            <Text style={[styles.heading, { top: 467 * scaleY }]}>
              航海の準備
            </Text>

            <Text
              style={[
                styles.body,
                { top: 519 * scaleY, left: 30 * scaleX, width: 342 * scaleX },
              ]}
            >
              {'Bluetoothをオンにすると、近くで「航」を利用しているユーザーを検知すると、汽笛が鳴ります。\n まるで船同士が挨拶を交わすような、特別な出会いを楽しめます。'}
            </Text>
          </>
        )}

      </Animated.View>

      {/* ── Button (position/size per step) ─────────────────────── */}
      <Pressable
        onPress={handleNext}
        hitSlop={8}
        style={({ pressed }) => [
          styles.buttonHitArea,
          {
            // Anchor from the bottom + safe-area inset, instead of a fixed
            // `top`, so the button never gets hidden behind the home
            // indicator on iPhones with a larger bottom safe area.
            bottom: (852 - btn.top - btn.height) * scaleY + insets.bottom,
            left: btn.left * scaleX,
            width: btn.width * scaleX,
            height: btn.height * scaleY,
          },
          pressed && styles.buttonPressed,
        ]}
      >
        <GlassView
          glassEffectStyle="regular"
          tintColor="rgba(50, 107, 150, 0.32)"
          style={styles.glassButton}
          pointerEvents="none"
        >
          <Text style={styles.buttonText}>{btn.label}</Text>
        </GlassView>
      </Pressable>
    </LinearGradient>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RockingShip — gently rocks the combined ship+wave illustration
// ─────────────────────────────────────────────────────────────────────────────
function RockingShip({ style }: { style: any }) {
  const rock = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(rock, { toValue: 1, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(rock, { toValue: -1, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(rock, { toValue: 0, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [rock]);

  const rotate = rock.interpolate({ inputRange: [-1, 1], outputRange: ['-4deg', '4deg'] });
  const translateY = rock.interpolate({ inputRange: [-1, 1], outputRange: [4, -4] });

  return (
    <Animated.View style={[style, { transform: [{ rotate }, { translateY }] }]}>
      <Image source={SHIP_WAVE} style={{ width: '100%', height: '100%' }} contentFit="contain" />
    </Animated.View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Progress dots — horizontally centered at top: 64px
// ─────────────────────────────────────────────────────────────────────────────
function ProgressDots({ activeIndex }: { activeIndex: number }) {
  return (
    <View style={dots.row}>
      {[0, 1, 2].map((i) =>
        i === activeIndex ? <View key={i} style={dots.pill} /> : <View key={i} style={dots.dot} />
      )}
    </View>
  );
}

const dots = StyleSheet.create({
  row: {
    position: 'absolute',
    top: 64,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  pill: { width: 18, height: 9, borderRadius: 10, backgroundColor: '#ffffff' },
  dot: { width: 9, height: 9, borderRadius: 999, backgroundColor: '#ffffff' },
});

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { flex: 1 },

  shipWrapper: { position: 'absolute' },
  shipImage: { width: '100%', height: '100%' },

  welcomeText: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '400',
    textAlign: 'center',
  },

  heading: {
    position: 'absolute',
    left: 30,
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 38,
  },
  body: {
    position: 'absolute',
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 26,
  },

  buttonHitArea: {
    position: 'absolute',
    borderRadius: 100,
    shadowColor: '#3793cc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  nightToggle: {
    position: 'absolute',
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(217, 217, 217, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  nightToggleText: {
    fontSize: 20,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
  },
  glassButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(50, 107, 150, 0.24)',
    borderColor: 'rgba(255, 255, 255, 0.32)',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '300',
    textAlign: 'center',
  },
});
