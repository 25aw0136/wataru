import { GlassView } from 'expo-glass-effect';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, Pressable, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, {
  Defs,
  G,
  LinearGradient as SvgLinearGradient,
  Path,
  Rect,
  Stop,
  type SvgProps,
} from 'react-native-svg';

const sunImage = require('@/assets/figma/sun.png') as ImageSourcePropType;

const FIGMA_WIDTH = 402;
const FIGMA_HEIGHT = 874;

function WaveGraphic(props: SvgProps) {
  return (
    <Svg viewBox="0 0 402 512" fill="none" preserveAspectRatio="none" {...props}>
      <Path
        d="M0 15.7026C0 15.7026 38.5 57.6196 113 58.7374C187.5 59.8552 231.5 1.17129 296.5 0.0535047C361.5 -1.06428 402 15.7026 402 15.7026V512H0V15.7026Z"
        fill="url(#waveGradient)"
      />
      <Defs>
        <SvgLinearGradient
          id="waveGradient"
          x1="201"
          y1="15.7025"
          x2="201"
          y2="512"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#0090EB" />
          <Stop offset="0.3" stopColor="#48B1F4" />
          <Stop offset="1" stopColor="#A5DCFF" />
        </SvgLinearGradient>
      </Defs>
    </Svg>
  );
}

function ShipGraphic(props: SvgProps) {
  return (
    <Svg viewBox="0 0 96 89.1574" fill="none" preserveAspectRatio="none" {...props}>
      <Path
        d="M92.1146 62.2012H84.2126H81.4641H73.9266H70.6125L67.5313 66.5992H53.1759V58.7406L78.2271 58.3386C73.7706 46.3296 73.7706 32.6863 78.1838 25.4906L70.9789 26.2609C70.6219 25.4417 70.3403 24.5287 70.1486 23.5459C69.8854 22.2064 69.7635 20.7315 69.7635 19.2266C69.7635 16.1794 70.2482 12.9872 70.8399 10.3665C71.1442 9.05719 71.4675 7.88662 71.7757 6.95287C71.9241 6.48525 72.0726 6.07912 72.204 5.74481C72.3298 5.41406 72.4521 5.15494 72.5291 5.00831L74.0619 2.06062L53.1759 5.61187V0H49.0577V6.31631L35.8294 8.56312L35.4442 9.25462C33.2724 13.1625 32.6242 17.3745 32.6184 21.072C32.6242 24.8972 33.3174 28.2017 33.8511 30.2027L28.9644 30.7251C22.2913 44.6126 30.0692 59.1092 30.0692 59.1092L49.0577 58.8049V66.5996H36.2032L32.3764 62.2016H23.9351H21.1882H11.4283L4.87331 51.4852L0 53.3149C0 53.3149 3.50756 61.2862 15.2327 77.7759C19.9389 84.3947 26.958 88.0339 33.1879 88.7666C35.5551 89.0447 39.7766 89.1574 44.6726 89.1574C56.1141 89.1574 71.238 88.5487 74.9597 88.0339C79.8594 87.3594 87.0514 86.9366 91.9982 77.0432C93.798 73.4417 95.1639 67.9802 96 62.2012H92.1146ZM37.9843 11.5429L49.0577 9.65662L53.1759 8.95762L68.5046 6.34819C68.1251 7.57856 67.7361 9.05737 67.3943 10.7124C66.8663 13.2939 66.4717 16.2624 66.4661 19.227C66.4661 20.9029 66.5977 22.5787 66.9112 24.1888C67.0747 25.0191 67.2964 25.8328 67.5763 26.6181L53.1759 28.1512L49.0577 28.587L37.1745 29.8496C36.6861 28.1419 35.9177 24.8334 35.9177 21.072C35.9177 17.9831 36.4496 14.6203 37.9843 11.5429ZM32.1679 55.7722C30.6234 52.0166 27.7001 42.8597 31.2173 33.8023L49.0579 31.9046L53.1761 31.4649L72.9743 29.3608C70.9133 36.5113 71.1538 46.0046 73.7164 55.1107L53.1761 55.4359L49.0579 55.5017L32.1679 55.7722Z"
        fill="#FFFFFF"
      />
    </Svg>
  );
}

function TopIconGraphic(props: SvgProps) {
  return (
    <Svg viewBox="0 0 80 80" fill="none" {...props}>
      <G>
        <Rect x="10" y="7" width="60" height="60" rx="30" fill="#D9D9D9" fillOpacity="0.2" />
        <Path
          d="M49.1778 19.0003C48.0202 18.988 47.1087 19.342 46.7638 20.0907C45.0751 23.7576 43.1502 26.5322 40.9001 28.7602C41.1279 28.8363 41.3494 28.9298 41.5628 29.0399C42.5256 29.5357 43.436 30.3542 44.1806 31.3198C44.9252 32.2855 45.5039 33.3981 45.7212 34.5354C45.7765 34.8243 45.8071 35.1183 45.807 35.4109C48.696 33.6101 52.1128 32.3636 56.2508 31.6178C57.3561 31.4184 58.0042 29.5013 57.8376 27.2818L55.2313 27.2079L57.4969 25.3737C57.1894 24.3013 56.6805 23.2482 55.9286 22.3636C54.7774 21.0098 53.2279 20.0442 51.7236 19.5039L49.7989 20.6566L50.0073 19.0673C49.7201 19.0266 49.4432 19.003 49.1779 19.0002L49.1778 19.0003ZM39.7905 29.9523C39.7117 29.9561 39.6378 29.969 39.5681 29.987C38.6802 30.745 37.7436 31.4357 36.7555 32.0775C36.818 32.1019 36.8794 32.1268 36.9409 32.1538C37.9879 32.6115 38.975 33.4212 39.7929 34.4177C40.783 35.6242 41.5439 37.1483 41.6925 38.6867C42.4586 37.9203 43.2671 37.2124 44.1274 36.5636C44.4311 36.0791 44.4929 35.4941 44.3591 34.7941C44.1972 33.9469 43.7184 32.9882 43.0802 32.1606C42.4419 31.3331 41.6435 30.6362 40.9256 30.2664C40.477 30.0353 40.0987 29.9374 39.7904 29.9522L39.7905 29.9523ZM35.201 33.1518C35.0983 33.1557 35.0016 33.1717 34.9068 33.1933C32.1638 34.7281 29.0436 36.0012 25.4686 37.3329C25.5111 37.336 25.5531 37.3398 25.5961 37.3445C26.3839 37.4299 27.1585 37.7147 27.9057 38.1484L30.6997 36.9333L29.5274 39.352C29.9718 39.7536 30.4024 40.2004 30.8132 40.6826C32.3522 42.4888 33.6276 44.8123 34.3045 47.1945C34.3046 47.1953 34.3043 47.1962 34.3045 47.1969C34.5254 47.9737 34.6833 48.743 34.7724 49.4885C36.3285 45.9079 38.0625 42.8902 40.1357 40.3961C40.6768 38.8083 39.9736 36.8177 38.7224 35.2933C38.0226 34.4404 37.1674 33.7618 36.3849 33.4197C35.9449 33.2272 35.5494 33.1383 35.201 33.1518ZM45.7005 37.2059C45.1585 37.5792 44.6283 37.9828 44.1112 38.4117C47.0144 39.0963 48.63 41.0524 50.0906 43.0064C50.8663 44.0443 51.6176 45.0844 52.5463 46.0142C54.3397 46.6903 55.7467 46.4858 57.284 44.9099C50.4513 42.8564 50.1589 38.064 45.7004 37.2058L45.7005 37.2059ZM25.0862 38.7005C24.2802 38.7171 23.7325 39.1259 23.3556 39.9271C22.9249 40.8428 22.8282 42.3274 23.3881 44.1453C23.8144 45.5299 24.6128 46.9335 25.5195 47.9615C26.4262 48.9896 27.4396 49.5934 28.1419 49.6178H28.1443C28.4199 49.6274 28.6301 49.5674 28.7976 49.4146L28.7837 49.4007L28.9389 49.2459C28.9977 49.1595 29.0516 49.0575 29.101 48.9364C29.3093 48.4263 29.3442 47.565 28.9643 46.4969C28.4539 45.0616 27.5469 44.1365 26.4901 43.9259L24.7873 43.5886L26.2562 42.6645L29.1081 40.8767C27.8738 39.6331 26.5468 38.8359 25.4476 38.7167C25.3216 38.7031 25.2013 38.6982 25.0862 38.7005L25.0862 38.7005ZM42.6007 39.1001L40.7821 40.9759C48.2284 42.2974 44.8929 51.3992 52.5926 54L50.7555 49.7658C53.1846 50.9596 55.7515 51.4381 58 50.655C47.9347 47.5542 50.8593 41.2682 42.6007 39.1001ZM30.037 41.9254L28.1118 43.1335C29.0889 43.7618 29.8325 44.8015 30.271 46.0349C30.4616 46.5704 30.5774 47.085 30.6232 47.571L32.3609 45.8432C31.7619 44.4246 30.9497 43.0662 30.0371 41.9253L30.037 41.9254ZM32.882 47.2754L29.7636 50.3801L29.7521 50.3686C29.4366 50.66 29.0511 50.8687 28.6263 50.9554C30.3512 52.0548 31.9359 52.3855 32.838 51.6622C33.1538 51.409 33.3602 51.0442 33.4659 50.5973C33.4356 49.6597 33.2731 48.6299 32.9724 47.5735C32.9441 47.474 32.9127 47.3749 32.882 47.2754Z"
          fill="#FFFFFF"
        />
      </G>
    </Svg>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#0090eb', '#48b1f4', '#a5dcff']}
      locations={[0, 0.3, 1]}
      style={styles.screen}>
      <View style={styles.stage}>
        <TopIconGraphic style={[styles.topIcon, { top: insets.top + 6 }]} />
        <Image contentFit="fill" source={sunImage} style={styles.sun} />
        <ShipGraphic style={styles.ship} />
        <WaveGraphic style={styles.wave} />

        <Text style={styles.statusText}>航海中</Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="入港する"
          onPress={() => {}}
          style={({ pressed }) => [styles.buttonHitArea, pressed && styles.buttonPressed]}>
          <GlassView
            glassEffectStyle="regular"
            tintColor="rgba(217, 217, 217, 0.2)"
            isInteractive
            style={styles.glassButton}>
            <Text style={styles.buttonText}>入港する</Text>
          </GlassView>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#48b1f4',
  },
  stage: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  topIcon: {
    height: 80,
    position: 'absolute',
    right: 30,
    shadowColor: '#3793cc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    width: 80,
    zIndex: 3,
  },
  sun: {
    height: 30,
    left: `${(43 / FIGMA_WIDTH) * 100}%`,
    position: 'absolute',
    top: `${(234 / FIGMA_HEIGHT) * 100}%`,
    width: 30,
    zIndex: 2,
  },
  ship: {
    height: 89,
    left: '50%',
    marginLeft: -48,
    position: 'absolute',
    top: `${(312 / FIGMA_HEIGHT) * 100}%`,
    transform: [{ rotate: '-8.44deg' }, { scaleX: -1 }],
    width: 96,
    zIndex: 2,
  },
  wave: {
    height: '58.6%',
    left: 0,
    position: 'absolute',
    top: `${(362 / FIGMA_HEIGHT) * 100}%`,
    width: '100%',
    zIndex: 1,
  },
  statusText: {
    color: '#ffffff',
    fontFamily: Platform.select({ ios: 'Yuanti SC', default: 'System' }),
    fontSize: 32,
    fontWeight: '400',
    left: 0,
    lineHeight: 42,
    position: 'absolute',
    right: 0,
    textAlign: 'center',
    top: `${(465 / FIGMA_HEIGHT) * 100}%`,
    zIndex: 2,
  },
  buttonHitArea: {
    alignSelf: 'center',
    borderRadius: 100,
    bottom: 142,
    height: 69,
    position: 'absolute',
    shadowColor: '#3793cc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    width: 227,
    zIndex: 4,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
  },
  glassButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 217, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: 100,
    borderWidth: StyleSheet.hairlineWidth,
    height: '100%',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: Platform.select({ ios: 'Noto Sans', default: 'System' }),
    fontSize: 22,
    fontWeight: '400',
    lineHeight: 30,
    textAlign: 'center',
  },
});
