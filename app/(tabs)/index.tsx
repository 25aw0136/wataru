import { GlassView } from 'expo-glass-effect';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  type ImageSourcePropType,
  type LayoutChangeEvent,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
  withDelay,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import Svg, {
  Defs,
  G,
  LinearGradient as SvgLinearGradient,
  Path,
  Stop,
  type SvgProps,
} from 'react-native-svg';

const sunImage = require('@/assets/figma/sun.png') as ImageSourcePropType;
const moonImage = require('@/assets/figma/night-moon.png') as ImageSourcePropType;

const FIGMA_WIDTH = 402;
const FIGMA_HEIGHT = 874;
const WAVE_WIDTH = 402;
const WAVE_HEIGHT = 512;
const AnimatedPath = Animated.createAnimatedComponent(Path);

function buildWavePath(phase: number, departureMode: number, baseY: number) {
  'worklet';

  const step = 20;
  const calmPrimaryCycles = 2;
  const calmSecondaryCycles = 2;
  const departurePrimaryCycles = 1.15;
  const departureSecondaryCycles = 1.9;
  const primaryCycles =
    calmPrimaryCycles + (departurePrimaryCycles - calmPrimaryCycles) * departureMode;
  const secondaryCycles =
    calmSecondaryCycles + (departureSecondaryCycles - calmSecondaryCycles) * departureMode;
  const amplitude = 5 + departureMode * 7;
  const secondaryAmplitude = 1.3 + departureMode * 1.8;
  const frequency = (Math.PI * 2 * primaryCycles) / WAVE_WIDTH;
  const secondaryFrequency = (Math.PI * 2 * secondaryCycles) / WAVE_WIDTH;

  const waveY = (x: number) => {
    const mainWave = Math.sin(x * frequency + phase) * amplitude;
    const softWave = Math.sin(x * secondaryFrequency + phase * 0.92 + 0.65) * secondaryAmplitude;

    return baseY + mainWave + softWave;
  };

  let path = `M0 ${waveY(0).toFixed(2)}`;

  for (let x = 0; x < WAVE_WIDTH; x += step) {
    const endX = Math.min(x + step, WAVE_WIDTH);
    const controlX = x + (endX - x) / 2;
    path += ` Q${controlX.toFixed(2)} ${waveY(controlX).toFixed(2)} ${endX.toFixed(2)} ${waveY(endX).toFixed(2)}`;
  }

  return `${path} L${WAVE_WIDTH} ${WAVE_HEIGHT} L0 ${WAVE_HEIGHT} Z`;
}

function AnimatedWaveGraphic({
  breezePhase,
  departurePhase,
  isNightMode,
  surge,
  ...props
}: SvgProps & {
  breezePhase: SharedValue<number>;
  departurePhase: SharedValue<number>;
  isNightMode: boolean;
  surge: SharedValue<number>;
}) {
  const animatedProps = useAnimatedProps(() => {
    const baseY = 32 + surge.value * 2;
    const phase = breezePhase.value + departurePhase.value;

    return {
      d: buildWavePath(phase, surge.value, baseY),
    };
  });

  return (
    <Svg viewBox="0 0 402 512" fill="none" preserveAspectRatio="none" {...props}>
      <AnimatedPath animatedProps={animatedProps} fill="url(#waveGradient)" />
      <Defs>
        {isNightMode ? (
          <SvgLinearGradient
            id="waveGradient"
            x1="201"
            y1="15.7025"
            x2="201"
            y2="512"
            gradientUnits="userSpaceOnUse">
            <Stop offset="0.331731" stopColor="#060028" />
            <Stop offset="0.5625" stopColor="#31005E" />
            <Stop offset="0.778846" stopColor="#2E348F" />
            <Stop offset="1" stopColor="#2B63BB" />
          </SvgLinearGradient>
        ) : (
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
        )}
      </Defs>
    </Svg>
  );
}

function StarGraphic(props: SvgProps) {
  return (
    <Svg viewBox="0 0 17.7228 16.9541" fill="none" preserveAspectRatio="none" {...props}>
      <Path
        d="M7.91033 0.690983C8.20968 -0.230328 9.51309 -0.230328 9.81244 0.690983L11.2188 5.01925C11.3527 5.43128 11.7366 5.71024 12.1698 5.71024H16.7209C17.6896 5.71024 18.0923 6.94985 17.3086 7.51925L13.6268 10.1943C13.2763 10.4489 13.1296 10.9003 13.2635 11.3123L14.6699 15.6406C14.9692 16.5619 13.9147 17.328 13.131 16.7586L9.44917 14.0836C9.09868 13.8289 8.62409 13.8289 8.2736 14.0836L4.59175 16.7586C3.80804 17.328 2.75356 16.5619 3.05291 15.6406L4.45925 11.3123C4.59312 10.9003 4.44647 10.4489 4.09598 10.1943L0.414132 7.51925C-0.369582 6.94985 0.033193 5.71024 1.00192 5.71024H5.55293C5.98616 5.71024 6.37011 5.43128 6.50399 5.01925L7.91033 0.690983Z"
        fill="#FFFE8B"
      />
    </Svg>
  );
}

function ShipGraphic(props: SvgProps) {
  return (
    <Svg viewBox="0 0 118.928 110.451" fill="none" preserveAspectRatio="none" {...props}>
      <G>
        <Path
          d="M86.5131 6.37863L44.4728 12.6129L43.9821 39.9809L85.5278 33.82L86.5131 6.37863Z"
          fill="#FFFFFF"
        />
        <Path
          d="M90.7671 35.0649L37.0578 41.0078L33.8177 56.6523L37.9964 71.1966L92.439 70.1997L90.7671 35.0649Z"
          fill="#FFFFFF"
        />
      </G>
      <Path
        d="M114.115 77.0571H104.326H100.921H91.5829H87.4773L83.6603 82.5055H65.8763V72.7699L96.9105 72.2719C91.3897 57.3947 91.3897 40.493 96.8569 31.5787L87.9312 32.5329C87.4889 31.5181 87.1401 30.3871 86.9027 29.1695C86.5766 27.5101 86.4256 25.6829 86.4256 23.8186C86.4256 20.0436 87.026 16.089 87.7591 12.8424C88.1361 11.2204 88.5365 9.77026 88.9184 8.6135C89.1021 8.03419 89.2861 7.53107 89.4489 7.11691C89.6048 6.70716 89.7562 6.38615 89.8517 6.20451L91.7506 2.55281L65.8763 6.95222V3.54438e-05H60.7745V7.8249L44.3868 10.6083L43.9097 11.465C41.2192 16.3062 40.4162 21.5242 40.409 26.1048C40.4162 30.8435 41.2749 34.9373 41.936 37.4162L35.8823 38.0633C27.6154 55.2677 37.2509 73.2266 37.2509 73.2266L60.7745 72.8496V82.506H44.85L40.1091 77.0576H29.6518H26.2488H14.1579L6.03733 63.7818L0.000103654 66.0484C0.000103654 66.0484 4.34539 75.9236 18.8709 96.3516C24.7012 104.551 33.3966 109.059 41.1144 109.967C44.047 110.312 49.2768 110.451 55.3421 110.451C69.5162 110.451 88.2522 109.697 92.8628 109.059C98.9328 108.224 107.842 107.7 113.971 95.4438C116.2 90.9822 117.893 84.2163 118.928 77.0571H114.115ZM47.0564 14.2997L60.7745 11.963L65.8763 11.0971L84.866 7.86439C84.3959 9.38862 83.9139 11.2206 83.4905 13.271C82.8363 16.469 82.3476 20.1465 82.3407 23.8191C82.3407 25.8952 82.5037 27.9714 82.8921 29.966C83.0946 30.9945 83.3692 32.0026 83.716 32.9754L65.8763 34.8748L60.7745 35.4146L46.0532 36.9788C45.4481 34.8632 44.4962 30.7646 44.4962 26.1048C44.4962 22.2782 45.1552 18.1122 47.0564 14.2997ZM39.8508 69.0926C37.9375 64.44 34.316 53.0961 38.6731 41.8755L60.7747 39.5246L65.8765 38.9799L90.4032 36.3732C87.8499 45.2315 88.1479 56.9922 91.3225 68.2731L65.8765 68.6759L60.7747 68.7575L39.8508 69.0926Z"
        fill="#4D2900"
      />
    </Svg>
  );
}

function DiplomaGraphic(props: SvgProps) {
  return (
    <Svg viewBox="0 0 35 35" fill="none" preserveAspectRatio="none" {...props}>
      <Path
        d="M27.5844 18.3969C26.4865 18.2359 25.4161 17.9237 24.4037 17.4694C27.5264 14.7236 30.7778 12.1277 34.1469 9.69063L34.3656 9.5375L34.4969 9.29688C35.1044 8.01684 35.2696 6.57133 34.9667 5.18721C34.6639 3.8031 33.91 2.55872 32.8234 1.64937C31.8174 0.718637 30.5386 0.136189 29.176 -0.0119224C27.8135 -0.160034 26.4394 0.134047 25.2569 0.826875L24.9812 1.11781C21.7073 5.66388 18.1198 9.97573 14.245 14.0219C10.117 17.6981 5.71627 21.056 1.08062 24.0669L0.21875 24.6094V25.1125C-0.106728 26.4776 -0.13853 27.8963 0.125447 29.2747C0.389425 30.653 0.943161 31.9595 1.75 33.1078C2.37005 33.7535 3.12277 34.2571 3.95624 34.5837C4.78972 34.9104 5.68414 35.0524 6.57781 35C7.34205 35.04 8.10341 34.8789 8.78589 34.5326C9.46837 34.1864 10.0481 33.6672 10.4672 33.0269C11.0031 32.3531 14.9844 27.3219 19.2281 22.7281C19.8144 23.7431 20.2694 24.9222 20.5275 26.1734C20.8026 28.4555 20.5026 30.7701 19.6547 32.9066L23.3406 28.4375L26.25 30.625C26.1684 28.1446 25.7383 25.6881 24.9725 23.3275C24.4364 22.3507 23.7623 21.4563 22.9709 20.6719C23.8591 21.4287 24.8762 22.0784 25.9722 22.5838C28.0284 23.3231 30.3231 23.835 32.7009 24.0538L30.625 21.2844L35 17.5C33.037 18.1304 30.9871 18.4486 28.9253 18.4428C28.4528 18.4428 27.9847 18.4268 27.5209 18.3947L27.5844 18.3969ZM26.6 2.58125C27.1732 2.30021 27.8035 2.155 28.4419 2.15688C29.5487 2.15688 30.555 2.58562 31.3053 3.28562C32.0013 3.84462 32.5023 4.60985 32.7361 5.47139C32.97 6.33293 32.9247 7.24642 32.6069 8.08063C31.5437 8.75219 27.475 11.8366 23.5375 15.3147C23.4256 14.2179 22.9037 13.2039 22.0762 12.4753C21.7058 12.1582 21.2731 11.922 20.806 11.7818C20.3389 11.6417 19.8476 11.6007 19.3637 11.6616C21.9131 8.74681 24.3277 5.71686 26.6 2.58125ZM5.90625 25.8344C6.07458 25.7176 6.27453 25.6551 6.47937 25.655L6.56687 25.6594H6.71562C7.10719 25.7731 7.44625 25.97 7.72406 26.2303L5.81875 27.8031C5.58504 27.3163 5.49475 26.7731 5.55844 26.2369C5.61886 26.0645 5.74236 25.9215 5.90406 25.8366L5.90625 25.8344ZM8.75 31.7187C8.53475 32.0997 8.21021 32.4073 7.81831 32.6019C7.4264 32.7965 6.98515 32.8691 6.55156 32.8103C5.95647 32.8655 5.35654 32.7882 4.79488 32.584C4.23322 32.3797 3.72377 32.0536 3.30312 31.6291C2.46803 30.3862 2.02388 28.922 2.02781 27.4247C2.02927 26.8749 2.08542 26.3426 2.19625 25.8278L3.74062 24.8281C3.535 25.1344 3.38187 25.4931 3.30531 25.8803C3.18591 27.4006 3.59971 28.9151 4.47562 30.1634L5.25 31.1259L8.96875 28.0634C9.34043 29.2796 9.25804 30.5894 8.73687 31.7494L8.75 31.7187ZM10.6313 26.3594C9.88466 25.0516 8.68699 24.0608 7.2625 23.5725C7.10719 23.5462 6.97812 23.5375 6.84687 23.5375C6.71562 23.5375 6.58656 23.5462 6.45969 23.5594C6.20525 23.5314 5.9485 23.5314 5.69406 23.5594C8.72398 21.4981 11.6364 19.2692 14.4178 16.8831C15.2884 17.0384 16.1941 17.43 16.8919 18.0491C17.5416 18.7337 17.9419 19.6656 17.9419 20.6937L17.9375 20.8994C15.6417 23.3612 13.4522 25.92 11.375 28.5688C11.2629 27.7791 10.9976 27.0189 10.5941 26.3309L10.6313 26.3594Z"
        fill="#FFFFFF"
      />
    </Svg>
  );
}

function BirdSmallGraphic(props: SvgProps) {
  return (
    <Svg viewBox="0 0 23 14" fill="none" preserveAspectRatio="none" {...props}>
      <Path
        d="M23 9.75956C23 8.81022 22.7057 7.88834 22.1642 7.14151C21.6226 6.39468 20.8651 5.86611 20.0131 5.64045C19.9778 4.13202 19.3995 2.69814 18.4015 1.64449C17.4034 0.590829 16.0645 0.000736551 14.6702 1.48977e-06C13.8619 -0.000627015 13.064 0.197618 12.3368 0.57975C11.6097 0.961882 10.9724 1.5179 10.473 2.20578C10.0666 1.64092 9.49924 1.23701 8.85904 1.05675C8.21883 0.876484 7.54155 0.929937 6.93228 1.20881C6.32302 1.48769 5.81585 1.9764 5.48947 2.59909C5.1631 3.22179 5.03577 3.94365 5.12724 4.65267C4.50019 4.52991 3.85587 4.55766 3.23981 4.73395C2.62375 4.91025 2.05098 5.23078 1.56195 5.67291C1.07292 6.11505 0.679561 6.66799 0.409667 7.2927C0.139773 7.9174 -7.54321e-05 8.59861 3.05235e-08 9.28822C0.000380361 10.5372 0.458823 11.7349 1.27464 12.6184C2.09045 13.5018 3.19693 13.9988 4.35104 14H19.0902C20.1278 13.9975 21.1221 13.5496 21.8549 12.7546C22.5876 11.9596 23.0004 10.8824 23 9.75956Z"
        fill="#FFFFFF"
      />
    </Svg>
  );
}

function BirdLargeGraphic(props: SvgProps) {
  return (
    <Svg viewBox="0 0 31 18" fill="none" preserveAspectRatio="none" {...props}>
      <Path
        d="M31 12.548C31.0001 11.3274 30.6034 10.1421 29.8734 9.18194C29.1435 8.22173 28.1226 7.54214 26.9741 7.252C26.9266 5.31259 26.1472 3.46904 24.802 2.11434C23.4568 0.759637 21.6522 0.000946994 19.7729 1.91542e-06C18.6834 -0.000806163 17.608 0.25408 16.6279 0.745393C15.6479 1.23671 14.7888 1.95159 14.1157 2.836C13.568 2.10975 12.8033 1.59045 11.9404 1.35868C11.0776 1.12691 10.1647 1.19563 9.34351 1.55419C8.52233 1.91275 7.83875 2.54108 7.39886 3.34169C6.95896 4.1423 6.78734 5.07041 6.91063 5.982C6.06547 5.82417 5.19704 5.85985 4.3667 6.08651C3.53636 6.31317 2.76436 6.72529 2.10523 7.29375C1.44611 7.8622 0.915931 8.57313 0.55216 9.37632C0.18839 10.1795 -0.000101669 11.0554 4.11404e-08 11.942C0.000512661 13.5478 0.618413 15.0878 1.71799 16.2237C2.81756 17.3595 4.3089 17.9984 5.86445 18H25.7303C27.1288 17.9968 28.469 17.4209 29.4566 16.3988C30.4442 15.3766 31.0005 13.9917 31 12.548Z"
        fill="#FFFFFF"
      />
    </Svg>
  );
}

function MusicNoteGraphic(props: SvgProps) {
  return (
    <Svg viewBox="0 0 18 24" fill="none" preserveAspectRatio="none" {...props}>
      <Path
        d="M18.07 0.169C17.9488 0.0819338 17.8081 0.0259977 17.6602 0.0061181C17.5124 -0.0137615 17.3619 0.00302525 17.222 0.055L17.228 0.053L6.151 3.991C5.97143 4.05456 5.81602 4.1723 5.70622 4.32796C5.59642 4.48361 5.53764 4.66951 5.538 4.86V17.7C4.97184 17.3908 4.33707 17.2289 3.692 17.229C2.7558 17.1912 1.84157 17.5248 1.1501 18.1571C0.458634 18.7893 0.0449149 19.6692 -0.001 20.605V20.613C0.0431156 21.5515 0.456965 22.4344 1.15009 23.0687C1.84322 23.703 2.75926 24.0371 3.698 23.998H3.691C4.6272 24.0358 5.54043 23.7022 6.2319 23.0699C6.92337 22.4377 7.33708 21.5578 7.383 20.622V7.731L16.613 4.508V13.481C16.0466 13.1726 15.4119 13.011 14.767 13.011H14.766C13.8298 12.9727 12.9163 13.3061 12.2249 13.9385C11.5335 14.5709 11.1201 15.4511 11.075 16.387V16.395C11.1189 17.3336 11.5326 18.2166 12.2258 18.851C12.919 19.4853 13.8352 19.8194 14.774 19.78H14.767L14.872 19.782C15.6792 19.7824 16.4634 19.5129 17.0999 19.0164C17.7364 18.52 18.1888 17.825 18.385 17.042L18.39 17.017C18.4348 16.9092 18.4583 16.7937 18.459 16.677V0.923C18.4592 0.775752 18.4241 0.630601 18.3566 0.499744C18.2891 0.368887 18.1911 0.256148 18.071 0.171L18.068 0.169H18.07Z"
        fill="#FFFFFF"
      />
    </Svg>
  );
}

function SideNoteGraphic(props: SvgProps) {
  return (
    <Svg viewBox="0 0 20 24" fill="none" preserveAspectRatio="none" {...props}>
      <Path
        d="M19.3913 3.11995C17.9644 0.64499 11.5135 0.119998 10.7852 0.0524992L9.96765 0V15.2173C9.77846 15.0635 9.57713 14.9255 9.36567 14.8048C8.61919 14.4256 7.80438 14.2029 6.97033 14.1501C6.13627 14.0972 5.30025 14.2153 4.51264 14.4973C1.45071 15.4948 -0.518745 18.3447 0.120397 20.8497C0.262844 21.3795 0.511884 21.8739 0.851999 22.3023C1.19211 22.7307 1.61601 23.0838 2.09728 23.3397C2.92257 23.7833 3.84519 24.0102 4.78019 23.9996C5.53272 23.9995 6.28039 23.878 6.9949 23.6397C9.74469 22.7472 11.6027 20.3622 11.4986 18.0747V4.86743C12.2418 4.95743 13.26 5.11492 14.3376 5.34742C15.4042 5.51162 16.429 5.88351 17.3549 6.4424C18.0981 6.9374 17.6374 7.86738 17.6002 7.94238C17.245 8.48669 16.8312 8.98974 16.3665 9.44236C16.2313 9.57762 16.1528 9.76007 16.147 9.95208C16.1412 10.1441 16.2086 10.331 16.3354 10.4743C16.4621 10.6177 16.6386 10.7064 16.8283 10.7223C17.018 10.7382 17.2065 10.6801 17.3549 10.5598C17.511 10.3873 21.4871 6.7499 19.3913 3.11995Z"
        fill="#FFFFFF"
      />
    </Svg>
  );
}

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [isSailing, setIsSailing] = useState(false);
  const [stageSize, setStageSize] = useState({ height: FIGMA_HEIGHT, width: FIGMA_WIDTH });
  const isNightMode = colorScheme === 'dark';
  const breezePhase = useSharedValue(0);
  const departurePhase = useSharedValue(0);
  const shipMotion = useSharedValue(0);
  const noteVisibility = useSharedValue(0);
  const statusVisibility = useSharedValue(0);
  const surge = useSharedValue(0);

  const handleStageLayout = useCallback((event: LayoutChangeEvent) => {
    const { height, width } = event.nativeEvent.layout;

    setStageSize((current) =>
      current.height === height && current.width === width ? current : { height, width }
    );
  }, []);

  useFrameCallback((frame) => {
    const elapsed = frame.timeSincePreviousFrame ?? 16.67;
    breezePhase.value += (Math.PI / 1000) * elapsed;
    shipMotion.value += (Math.PI / 1800) * elapsed;

    if (breezePhase.value > Math.PI * 2000) {
      breezePhase.value -= Math.PI * 2000;
    }
    if (shipMotion.value > Math.PI * 2000) {
      shipMotion.value -= Math.PI * 2000;
    }
  });

  const shipAnimatedStyle = useAnimatedStyle(() => {
    const t = shipMotion.value;
    const intensity = 1 + surge.value * 1.8;
    const driftIntensity = 1 + surge.value * 1.35;
    const rollIntensity = 1 + surge.value * 1.55;
    const bob =
      Math.sin(t * 1.15) * 2.2 * intensity +
      Math.sin(t * 0.53 + 1.2) * 1.1 * intensity +
      Math.sin(t * 1.87 + 2.4) * 0.65 * intensity;
    const drift =
      Math.sin(t * 0.42 + 0.8) * 1.4 * driftIntensity +
      Math.sin(t * 1.31) * 0.45 * driftIntensity;
    const roll =
      Math.sin(t * 0.9 + 0.4) * 1.6 * rollIntensity +
      Math.sin(t * 1.7 + 2.1) * 0.45 * rollIntensity;

    return {
      transform: [
        { translateX: drift },
        { translateY: bob },
        { rotate: `${-8.44 + roll}deg` },
      ],
    };
  });

  const sideNoteAnimatedStyle = useAnimatedStyle(() => {
    const visible = noteVisibility.value;
    const sway = Math.sin(shipMotion.value * 1.25 + 0.4) * 3.2 * visible;

    return {
      opacity: visible,
      transform: [
        { translateY: (1 - visible) * 12 },
        { translateX: Math.sin(shipMotion.value * 0.72) * 1.4 * visible },
        { rotate: `${12.31 + sway}deg` },
      ],
    };
  });

  const musicNoteAnimatedStyle = useAnimatedStyle(() => {
    const visible = noteVisibility.value;
    const sway = Math.sin(shipMotion.value * 1.45 + 1.1) * 4.2 * visible;

    return {
      opacity: visible,
      transform: [
        { translateY: (1 - visible) * 12 },
        { translateX: Math.sin(shipMotion.value * 0.86 + 0.7) * 1.2 * visible },
        { rotate: `${-6.83 + sway}deg` },
      ],
    };
  });

  const statusAnimatedStyle = useAnimatedStyle(() => {
    const visible = statusVisibility.value;

    return {
      opacity: visible,
      transform: [{ translateY: (1 - visible) * 12 }],
    };
  });

  const toggleSailingMode = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    setIsSailing((current) => {
      const next = !current;

      surge.value = withTiming(next ? 1 : 0, {
        duration: 1800,
        easing: Easing.inOut(Easing.cubic),
      });
      noteVisibility.value = withTiming(next ? 1 : 0, {
        duration: next ? 650 : 260,
        easing: Easing.out(Easing.cubic),
      });
      statusVisibility.value = next
        ? withDelay(
            120,
            withTiming(1, {
              duration: 820,
              easing: Easing.out(Easing.cubic),
            })
          )
        : withTiming(0, {
            duration: 220,
            easing: Easing.out(Easing.cubic),
          });

      return next;
    });
  }, [noteVisibility, statusVisibility, surge]);

  return (
    <LinearGradient
      colors={
        isNightMode
          ? ['#060028', '#31005E', '#2C56AF', '#0090EB']
          : ['#0090eb', '#48b1f4', '#a5dcff']
      }
      locations={isNightMode ? [0, 0.5, 0.84, 1] : [0, 0.3, 1]}
      style={styles.screen}>
      <View onLayout={handleStageLayout} style={styles.stage}>
        <View
          style={[
            styles.designCanvas,
            {
              transform: [
                { scaleX: stageSize.width / FIGMA_WIDTH },
                { scaleY: stageSize.height / FIGMA_HEIGHT },
              ],
            },
          ]}>
          <GlassView
            glassEffectStyle="regular"
            tintColor="rgba(217, 217, 217, 0.2)"
            style={[styles.topAction, isNightMode && styles.nightGlassShadow]}>
            <DiplomaGraphic style={styles.diplomaIcon} />
          </GlassView>
          {isNightMode ? (
            <>
              <Image contentFit="contain" source={moonImage} style={styles.moon} />
              <StarGraphic style={styles.starOne} />
              <StarGraphic style={styles.starTwo} />
              <StarGraphic style={styles.starThree} />
              <StarGraphic style={styles.starFour} />
              <StarGraphic style={styles.starFive} />
              <StarGraphic style={styles.starSix} />
              <StarGraphic style={styles.starSeven} />
            </>
          ) : (
            <>
              <Image contentFit="fill" source={sunImage} style={styles.sun} />
              <BirdSmallGraphic style={styles.leftSmallBird} />
              <BirdSmallGraphic style={styles.rightSmallBird} />
              <BirdLargeGraphic style={styles.leftLargeBird} />
            </>
          )}
          <Animated.View style={[styles.ship, shipAnimatedStyle]}>
            <ShipGraphic style={styles.shipGraphic} />
          </Animated.View>
          <AnimatedWaveGraphic
            breezePhase={breezePhase}
            departurePhase={departurePhase}
            isNightMode={isNightMode}
            surge={surge}
            style={styles.wave}
          />
          <Animated.View style={[styles.sideNote, sideNoteAnimatedStyle]}>
            <SideNoteGraphic style={styles.noteGraphic} />
          </Animated.View>
          <Animated.View style={[styles.musicNote, musicNoteAnimatedStyle]}>
            <MusicNoteGraphic style={styles.noteGraphic} />
          </Animated.View>

          <Animated.Text style={[styles.statusText, statusAnimatedStyle]}>航海中</Animated.Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isSailing ? '入港する' : '出航する'}
            onPress={toggleSailingMode}
            style={({ pressed }) => [
              styles.buttonHitArea,
              isNightMode && styles.nightGlassShadow,
              pressed && styles.buttonPressed,
            ]}>
            <GlassView
              glassEffectStyle="regular"
              tintColor="rgba(217, 217, 217, 0.2)"
              isInteractive
              style={styles.glassButton}>
              <Text style={styles.buttonText}>{isSailing ? '入港する' : '出航する'}</Text>
            </GlassView>
          </Pressable>
        </View>
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
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  designCanvas: {
    height: FIGMA_HEIGHT,
    position: 'relative',
    width: FIGMA_WIDTH,
  },
  topAction: {
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 217, 0.2)',
    borderRadius: 100,
    height: 60,
    justifyContent: 'center',
    left: 302,
    position: 'absolute',
    shadowColor: '#3793cc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    top: 60,
    width: 60,
    zIndex: 3,
  },
  nightGlassShadow: {
    shadowColor: '#002b47',
  },
  diplomaIcon: {
    height: 35,
    width: 35,
  },
  sun: {
    height: 30,
    left: 40,
    position: 'absolute',
    top: 174,
    width: 30,
    zIndex: 2,
  },
  leftSmallBird: {
    height: 14,
    left: 40,
    position: 'absolute',
    top: 269,
    width: 23,
    zIndex: 2,
  },
  rightSmallBird: {
    height: 14,
    left: 339,
    position: 'absolute',
    top: 269,
    width: 23,
    zIndex: 2,
  },
  leftLargeBird: {
    height: 18,
    left: 73,
    position: 'absolute',
    top: 251,
    width: 31,
    zIndex: 2,
  },
  moon: {
    height: 30,
    left: 333,
    position: 'absolute',
    top: 193,
    transform: [{ rotate: '163.8deg' }, { scaleY: -1 }],
    width: 30,
    zIndex: 2,
  },
  starOne: {
    height: 20,
    left: 51,
    position: 'absolute',
    top: 86,
    transform: [{ rotate: '-6.78deg' }],
    width: 20,
    zIndex: 2,
  },
  starTwo: {
    height: 18,
    left: 93,
    position: 'absolute',
    top: 163,
    transform: [{ rotate: '14.7deg' }],
    width: 18,
    zIndex: 2,
  },
  starThree: {
    height: 16,
    left: 218,
    position: 'absolute',
    top: 74,
    transform: [{ rotate: '-7.75deg' }],
    width: 16,
    zIndex: 2,
  },
  starFour: {
    height: 23,
    left: 22,
    position: 'absolute',
    top: 240,
    transform: [{ rotate: '18.83deg' }],
    width: 23,
    zIndex: 2,
  },
  starFive: {
    height: 23,
    left: 46,
    position: 'absolute',
    top: 337,
    transform: [{ rotate: '18.83deg' }],
    width: 23,
    zIndex: 2,
  },
  starSix: {
    height: 20,
    left: 325,
    position: 'absolute',
    top: 315,
    transform: [{ rotate: '18.83deg' }],
    width: 20,
    zIndex: 2,
  },
  starSeven: {
    height: 16,
    left: 218,
    position: 'absolute',
    top: 239,
    width: 16,
    zIndex: 2,
  },
  ship: {
    height: 110,
    left: 140,
    position: 'absolute',
    top: 287,
    width: 119,
    zIndex: 1,
  },
  shipGraphic: {
    height: '100%',
    transform: [{ scaleX: -1 }],
    width: '100%',
  },
  wave: {
    bottom: -1,
    left: 0,
    position: 'absolute',
    top: 350,
    width: '100%',
    zIndex: 2,
  },
  sideNote: {
    height: 24,
    left: 302,
    position: 'absolute',
    top: 451,
    width: 20,
    zIndex: 2,
  },
  musicNote: {
    height: 24,
    left: 83,
    position: 'absolute',
    top: 510,
    width: 18,
    zIndex: 2,
  },
  noteGraphic: {
    height: '100%',
    width: '100%',
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
    top: 465,
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
    fontWeight: '600',
    lineHeight: 30,
    textAlign: 'center',
  },
});
