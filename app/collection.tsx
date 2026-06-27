import { useEffect, useRef, useState } from 'react';
import { BlurView } from 'expo-blur';
import { GlassView } from 'expo-glass-effect';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

const FIGMA_WIDTH = 402;

const islandImages = {
  aogashima: require('@/assets/figma/collection-aogashima.png'),
  bali: require('@/assets/figma/collection-bali.png'),
  borabora: require('@/assets/figma/collection-borabora.png'),
  easter: require('@/assets/figma/collection-easter.png'),
  enoshima: require('@/assets/figma/collection-enoshima.png'),
  ishigaki: require('@/assets/figma/collection-ishigaki.png'),
  komodo: require('@/assets/figma/collection-komodo.png'),
  miyajima: require('@/assets/figma/collection-miyajima.png'),
  socotra: require('@/assets/figma/collection-socotra.png'),
  yakushima: require('@/assets/figma/collection-yakushima.png'),
};

const islands = [
  { id: 'enoshima', image: islandImages.enoshima, name: '江ノ島', rarity: 1 },
  { id: 'miyajima', image: islandImages.miyajima, name: '宮島', rarity: 1 },
  { id: 'ishigaki', image: islandImages.ishigaki, name: '石垣島', rarity: 1 },
  { id: 'yakushima', image: islandImages.yakushima, name: '屋久島', rarity: 2 },
  { id: 'bali', image: islandImages.bali, name: 'バリ島', rarity: 2 },
  { id: 'borabora', image: islandImages.borabora, name: 'ボラボラ島', rarity: 3 },
  { id: 'easter', image: islandImages.easter, name: 'イースター島', rarity: 3 },
  { id: 'komodo', image: islandImages.komodo, name: 'コモド島', rarity: 3 },
  { id: 'socotra', image: islandImages.socotra, name: 'ソコトラ島', rarity: 4 },
  { id: 'aogashima', image: islandImages.aogashima, name: '青ヶ島', rarity: 5 },
];

const islandDetails = {
  enoshima: {
    discoveredAt: '2026.6.10(14:23)',
    image: islandImages.enoshima,
    location: '所在地：日本 沖縄県 石垣市',
    name: '江ノ島',
    rarity: 1,
    trivia:
      '石垣島はや八重山諸島の中心で、透き通った海\nとマンタの遭遇率で有名。\n島全体が国立公園に指定されており、手付かず\nの自然が残っている。',
  },
  miyajima: {
    discoveredAt: '2026.6.10(14:23)',
    image: islandImages.miyajima,
    location: '所在地：日本 広島県',
    name: '宮島',
    rarity: 1,
    trivia:
      '日本三景のひとつとして知られ、海に浮かぶように見える大鳥居が象徴的。\n島全体が信仰の対象として大切にされている。',
  },
  ishigaki: {
    discoveredAt: '2026.6.10(14:23)',
    image: islandImages.ishigaki,
    location: '所在地：日本 沖縄県',
    name: '石垣島',
    rarity: 1,
    trivia:
      '八重山諸島の中心で、透き通った海とマンタの遭遇率で有名。\n美しいサンゴ礁に囲まれ、多くのダイバーが訪れる。',
  },
  yakushima: {
    discoveredAt: '2026.6.10(14:23)',
    image: islandImages.yakushima,
    location: '所在地：日本 鹿児島県',
    name: '屋久島',
    rarity: 2,
    trivia:
      '樹齢数千年ともいわれる縄文杉が眠る自然豊かな島。\n島の約9割が森林に覆われ、世界自然遺産に登録されている。',
  },
  bali: {
    discoveredAt: '2026.6.10(14:23)',
    image: islandImages.bali,
    location: '所在地：インドネシア',
    name: 'バリ島',
    rarity: 2,
    trivia:
      '「神々の島」と呼ばれ、島内には数多くの寺院が点在する。\n独自の文化や伝統が今も色濃く残る人気のリゾート地。',
  },
  borabora: {
    discoveredAt: '2026.6.10(14:23)',
    image: islandImages.borabora,
    location: '所在地：フランス領',
    name: 'ボラボラ島',
    rarity: 3,
    trivia:
      'エメラルド色のラグーンに囲まれた南太平洋の楽園。\n海の上に建つ水上コテージが世界中の憧れとなっている。',
  },
  easter: {
    discoveredAt: '2026.6.10(14:23)',
    image: islandImages.easter,
    location: '所在地：チリ共和国',
    name: 'イースター島',
    rarity: 3,
    trivia:
      '約900体ものモアイ像が点在する神秘的な島。\nその建造方法や目的には、今も多くの謎が残されている。',
  },
  komodo: {
    discoveredAt: '2026.6.10(14:23)',
    image: islandImages.komodo,
    location: '所在地：日本 沖縄県 石垣市',
    name: 'コモド島',
    rarity: 3,
    trivia:
      '世界最大級のトカゲ「コモドドラゴン」が生息する島。\n島全体が国立公園に指定され、貴重な自然が守られている。',
  },
  socotra: {
    discoveredAt: '2026.6.10(14:23)',
    image: islandImages.socotra,
    location: '所在地：日本 沖縄県 石垣市',
    name: 'ソコトラ島',
    rarity: 4,
    trivia:
      '傘を逆さにしたような竜血樹が生えることで知られる島。\n固有種が多く、その独特な景観から「地球最後の秘境」とも呼ばれる。',
  },
  aogashima: {
    discoveredAt: '2026.6.10(14:23)',
    image: islandImages.aogashima,
    location: '所在地：日本 東京',
    name: '青ヶ島',
    rarity: 5,
    trivia:
      '東京都に属しながら、本土から約360km離れた火山島。\n巨大な火山の中にさらに火山がある、珍しい二重カルデラ地形を持つ。',
  },
};

type IslandDetailId = keyof typeof islandDetails;

function BackgroundWaves() {
  return (
    <Svg
      pointerEvents="none"
      preserveAspectRatio="none"
      style={styles.backgroundWaves}
      viewBox="0 0 402 354">
      <Path
        d="M0 34.5158C0 34.5158 37 0 109 0C181 0 214.576 66.622 291.076 66.622C367.576 66.622 402 34.5158 402 34.5158V354H0V34.5158Z"
        fill="#46B8FF"
      />
      <Path
        d="M0 121.267C0 121.267 31.4501 63 103.45 63C175.45 63 217.33 139.671 293.83 139.671C370.33 139.671 402 86.6553 402 86.6553V354H0V121.267Z"
        fill="#8FD4FF"
      />
      <Path
        d="M0 152.078C0 152.078 40 136 112 136C184 136 213 178.668 289.5 178.668C366 178.668 402 152.078 402 152.078V354H0V152.078Z"
        fill="#FFFFFF"
      />
      <Path
        d="M0 167.087C0 167.087 35.5 149 107.5 149C179.5 149 211 199.548 287.5 199.548C364 199.548 402 167.087 402 167.087V354H0V167.087Z"
        fill="#E4DCC4"
      />
    </Svg>
  );
}

function StarIcon({ size }: { size: number }) {
  return (
    <Svg height={size} viewBox="0 0 20 20" width={size}>
      <Path
        d="M10 13.4183L6.975 15.245C6.88611 15.2889 6.80361 15.3067 6.7275 15.2983C6.65194 15.2894 6.57833 15.2633 6.50667 15.22C6.43444 15.1756 6.38 15.1128 6.34333 15.0317C6.30667 14.9506 6.30333 14.8619 6.33333 14.7658L7.13833 11.3408L4.47583 9.0325C4.40083 8.97139 4.35139 8.89833 4.3275 8.81333C4.30361 8.72833 4.30889 8.64694 4.34333 8.56917C4.37778 8.49139 4.42361 8.4275 4.48083 8.3775C4.53861 8.32917 4.61639 8.29639 4.71417 8.27917L8.2275 7.9725L9.5975 4.72917C9.63528 4.6375 9.68972 4.57139 9.76083 4.53083C9.83194 4.49028 9.91167 4.47 10 4.47C10.0883 4.47 10.1683 4.49028 10.24 4.53083C10.3117 4.57139 10.3658 4.6375 10.4025 4.72917L11.7725 7.9725L15.285 8.27917C15.3833 8.29583 15.4614 8.32889 15.5192 8.37833C15.5769 8.42722 15.6231 8.49083 15.6575 8.56917C15.6914 8.64694 15.6964 8.72833 15.6725 8.81333C15.6486 8.89833 15.5992 8.97139 15.5242 9.0325L12.8617 11.3408L13.6667 14.7658C13.6978 14.8608 13.6947 14.9492 13.6575 15.0308C13.6203 15.1125 13.5656 15.1753 13.4933 15.2192C13.4222 15.2636 13.3486 15.29 13.2725 15.2983C13.1969 15.3067 13.1147 15.2889 13.0258 15.245L10 13.4183Z"
        fill="#FFFFFF"
      />
    </Svg>
  );
}

function BackIcon({ size }: { size: number }) {
  return (
    <Svg height={size} viewBox="0 0 35 36" width={size}>
      <G transform="translate(0 36) scale(1 -1)">
        <Path
          d="M9.8 28L1 19.3333L9.8 10.6667M1 19.3333H25.2C27.5339 19.3333 29.7722 18.4202 31.4225 16.7949C33.0729 15.1696 34 12.9652 34 10.6667C34 8.36812 33.0729 6.16372 31.4225 4.53841C29.7722 2.91309 27.5339 2 25.2 2H23"
          fill="none"
          stroke="#FFFFFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </G>
    </Svg>
  );
}

function ShareIcon({ size }: { size: number }) {
  return (
    <Svg height={size} viewBox="0 0 80 80" width={size}>
      <Path
        d="M54 35.5L43.6 24V29.75C38.4 29.75 28 33.2 28 47C28 45.0828 31.12 41.25 43.6 41.25V47L54 35.5Z"
        fill="none"
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </Svg>
  );
}

function CloseIcon({ size }: { size: number }) {
  return (
    <Svg height={size} viewBox="0 0 80 80" width={size}>
      <Path
        d="M30 30L50 50M30 50L50 30"
        fill="none"
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeWidth="4"
      />
    </Svg>
  );
}

export default function CollectionScreen() {
  const { height, width } = useWindowDimensions();
  const [isDetailModalMounted, setIsDetailModalMounted] = useState(false);
  const [selectedIslandId, setSelectedIslandId] = useState<IslandDetailId>('enoshima');
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const detailModalOpacity = useRef(new Animated.Value(0)).current;
  const detailModalTranslateY = useRef(new Animated.Value(height)).current;
  const isClosingDetailModal = useRef(false);
  const scale = width / FIGMA_WIDTH;
  const modalScale = Math.min(scale, (height - 32) / 709);
  const detailModalHiddenOffset = height;
  const cardWidth = 370 * scale;
  const selectedIslandDetail = islandDetails[selectedIslandId];

  useEffect(() => {
    if (!isDetailModalMounted) {
      return;
    }

    isClosingDetailModal.current = false;
    backdropOpacity.setValue(0);
    detailModalOpacity.setValue(0);
    detailModalTranslateY.setValue(detailModalHiddenOffset);

    Animated.parallel([
      Animated.timing(backdropOpacity, {
        duration: 220,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(detailModalOpacity, {
        duration: 120,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(detailModalTranslateY, {
        damping: 24,
        mass: 0.95,
        stiffness: 210,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, [
    backdropOpacity,
    detailModalOpacity,
    detailModalHiddenOffset,
    detailModalTranslateY,
    isDetailModalMounted,
  ]);

  const openIslandModal = (islandId: string) => {
    if (!(islandId in islandDetails)) {
      return;
    }

    setSelectedIslandId(islandId as IslandDetailId);
    setIsDetailModalMounted(true);
  };

  const closeDetailModal = () => {
    if (isClosingDetailModal.current) {
      return;
    }

    isClosingDetailModal.current = true;
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        duration: 180,
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(detailModalOpacity, {
        duration: 180,
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(detailModalTranslateY, {
        duration: 240,
        toValue: detailModalHiddenOffset,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setIsDetailModalMounted(false);
        isClosingDetailModal.current = false;
      }
    });
  };

  return (
    <View style={styles.screen}>
      <BackgroundWaves />

      <Text
        style={[
          styles.title,
          {
            fontSize: 34 * scale,
            left: 22 * scale,
            lineHeight: 38 * scale,
            top: 58 * scale,
            width: 220 * scale,
          },
        ]}>
        {'島\nコレクション'}
      </Text>

      <Pressable
        accessibilityLabel="戻る"
        accessibilityRole="button"
        onPress={() => router.back()}
        style={({ pressed }) => [
          styles.backButton,
          {
            height: 60 * scale,
            left: 302 * scale,
            top: 60 * scale,
            width: 60 * scale,
          },
          pressed && styles.pressed,
        ]}>
        <GlassView
          glassEffectStyle="regular"
          tintColor="rgba(50, 107, 150, 0.32)"
          style={styles.backButtonGlass}>
          <View style={{ transform: [{ translateY: -4 * scale }] }}>
            <BackIcon size={36 * scale} />
          </View>
        </GlassView>
      </Pressable>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: 48 * scale,
            paddingHorizontal: 16 * scale,
            paddingTop: 31 * scale,
            rowGap: 12 * scale,
          },
        ]}
        showsVerticalScrollIndicator={false}
        style={[styles.scrollView, { top: 135 * scale }]}>
        {islands.map((island) => (
          <Pressable
            accessibilityLabel={`${island.name}、レア度${island.rarity}`}
            accessibilityRole="button"
            key={island.id}
            onPress={() => {
              openIslandModal(island.id);
            }}
            style={({ pressed }) => [
              styles.cardPressable,
              { borderRadius: 24 * scale, height: 95 * scale, width: cardWidth },
              pressed && styles.pressed,
            ]}>
            <GlassView
              glassEffectStyle="regular"
              style={[styles.card, { borderRadius: 24 * scale }]}>
              <Text
                numberOfLines={1}
                style={[
                  styles.cardTitle,
                  {
                    fontSize: 20 * scale,
                    left: 24 * scale,
                    lineHeight: 27 * scale,
                    top: 21 * scale,
                  },
                ]}>
                {island.name}
              </Text>
              <View style={[styles.rarityRow, { left: 24 * scale, top: 54 * scale }]}>
                <Text
                  style={[
                    styles.rarityLabel,
                    { fontSize: 12 * scale, lineHeight: 17 * scale },
                  ]}>
                  レア度
                </Text>
                <View style={styles.stars}>
                  {Array.from({ length: island.rarity }, (_, index) => (
                    <View
                      key={index}
                      style={index > 0 && { marginLeft: -3 * scale }}>
                      <StarIcon size={16 * scale} />
                    </View>
                  ))}
                </View>
              </View>
              <Image
                contentFit="cover"
                source={island.image}
                style={[
                  styles.cardImage,
                  {
                    height: 95 * scale,
                    right: 0,
                    top: 0,
                    width: 215 * scale,
                  },
                ]}
              />
            </GlassView>
          </Pressable>
        ))}
      </ScrollView>

      <Modal
        animationType="none"
        onRequestClose={closeDetailModal}
        transparent
        visible={isDetailModalMounted}>
        <View style={styles.modalLayer}>
          <Animated.View
            pointerEvents="none"
            style={[styles.modalBackdrop, { opacity: backdropOpacity }]}
          />
          <Animated.View
            style={[
              styles.detailPanelMotion,
              {
                opacity: detailModalOpacity,
                transform: [{ translateY: detailModalTranslateY }],
              },
            ]}>
            <View
              style={[
                styles.detailPanel,
                {
                  borderRadius: 50 * modalScale,
                  height: 709 * modalScale,
                  width: 370 * modalScale,
                },
              ]}>
              <BlurView
                intensity={78}
                style={StyleSheet.absoluteFill}
                tint="systemUltraThinMaterialDark"
              />
              <View style={styles.detailPanelTint} />
              <Text
                style={[
                  styles.detailTitle,
                  {
                    fontSize: 44 * modalScale,
                    left: 33 * modalScale,
                    lineHeight: 58 * modalScale,
                    top: 25 * modalScale,
                  },
                ]}>
                {selectedIslandDetail.name}
              </Text>

              <View
                style={[
                  styles.detailRarityRow,
                  { left: 33 * modalScale, top: 94 * modalScale },
                ]}>
                <Text
                  style={[
                    styles.detailRarityLabel,
                    { fontSize: 20 * modalScale, lineHeight: 27 * modalScale },
                  ]}>
                  レア度
                </Text>
                {Array.from({ length: selectedIslandDetail.rarity }, (_, index) => (
                  <StarIcon key={index} size={30 * modalScale} />
                ))}
              </View>

              <Pressable
                accessibilityLabel="共有"
                accessibilityRole="button"
                onPress={() => {}}
                style={({ pressed }) => [
                  styles.detailShareButton,
                  {
                    height: 60 * modalScale,
                    left: 278 * modalScale,
                    top: 35 * modalScale,
                    width: 60 * modalScale,
                  },
                  pressed && styles.pressed,
                ]}>
                <GlassView glassEffectStyle="regular" style={styles.detailRoundButtonGlass}>
                  <ShareIcon size={60 * modalScale} />
                </GlassView>
              </Pressable>

              <Image
                contentFit="cover"
                source={selectedIslandDetail.image}
                style={[
                  styles.detailImage,
                  {
                    borderRadius: 30 * modalScale,
                    height: 209 * modalScale,
                    left: 33 * modalScale,
                    top: 134 * modalScale,
                    width: 305 * modalScale,
                  },
                ]}
              />

              <Text
                style={[
                  styles.detailBodyText,
                  {
                    fontSize: 14 * modalScale,
                    left: 33 * modalScale,
                    lineHeight: 19 * modalScale,
                    top: 349 * modalScale,
                    width: 305 * modalScale,
                  },
                ]}>
                {selectedIslandDetail.location}
              </Text>

              <Text
                style={[
                  styles.detailSectionTitle,
                  {
                    fontSize: 20 * modalScale,
                    left: 33 * modalScale,
                    lineHeight: 27 * modalScale,
                    top: 397 * modalScale,
                  },
                ]}>
                豆知識
              </Text>
              <Text
                style={[
                  styles.detailBodyText,
                  {
                    fontSize: 14 * modalScale,
                    left: 33 * modalScale,
                    lineHeight: 19 * modalScale,
                    top: 434 * modalScale,
                    width: 305 * modalScale,
                  },
                ]}>
                {selectedIslandDetail.trivia}
              </Text>

              <Text
                style={[
                  styles.detailSectionTitle,
                  {
                    fontSize: 20 * modalScale,
                    left: 33 * modalScale,
                    lineHeight: 27 * modalScale,
                    top: 534 * modalScale,
                  },
                ]}>
                発見日
              </Text>
              <Text
                style={[
                  styles.detailBodyText,
                  {
                    fontSize: 14 * modalScale,
                    left: 33 * modalScale,
                    lineHeight: 19 * modalScale,
                    top: 570 * modalScale,
                    width: 305 * modalScale,
                  },
                ]}>
                {selectedIslandDetail.discoveredAt}
              </Text>

              <Pressable
                accessibilityLabel="閉じる"
                accessibilityRole="button"
                onPress={closeDetailModal}
                style={({ pressed }) => [
                  styles.detailCloseButton,
                  {
                    height: 60 * modalScale,
                    left: 155 * modalScale,
                    top: 619 * modalScale,
                    width: 60 * modalScale,
                  },
                  pressed && styles.pressed,
                ]}>
                <GlassView glassEffectStyle="regular" style={styles.detailRoundButtonGlass}>
                  <CloseIcon size={60 * modalScale} />
                </GlassView>
              </Pressable>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#15A5FF',
    flex: 1,
    overflow: 'hidden',
  },
  backgroundWaves: {
    bottom: 0,
    height: '40.5%',
    left: 0,
    position: 'absolute',
    width: '100%',
  },
  title: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'Yuanti SC',
    fontWeight: '700',
    position: 'absolute',
    zIndex: 3,
  },
  backButton: {
    borderRadius: 100,
    position: 'absolute',
    shadowColor: '#3793CC',
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    zIndex: 4,
  },
  backButtonGlass: {
    alignItems: 'center',
    backgroundColor: 'rgba(50, 107, 150, 0.24)',
    borderColor: 'rgba(255, 255, 255, 0.32)',
    borderRadius: 100,
    borderWidth: StyleSheet.hairlineWidth,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  scrollView: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  scrollContent: {
    flexDirection: 'column',
  },
  cardPressable: {
    borderRadius: 24,
    shadowColor: '#206B99',
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  card: {
    backgroundColor: 'rgba(176, 191, 201, 0.3)',
    borderRadius: 24,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontFamily: 'Yuanti SC',
    fontWeight: '700',
    position: 'absolute',
    zIndex: 2,
  },
  rarityRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    position: 'absolute',
    zIndex: 2,
  },
  rarityLabel: {
    color: '#FFFFFF',
    fontFamily: 'Yuanti SC',
    fontWeight: '400',
  },
  stars: {
    flexDirection: 'row',
  },
  cardImage: {
    position: 'absolute',
    zIndex: 1,
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
  modalLayer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  detailPanelMotion: {
    elevation: 20,
    shadowColor: '#071926',
    shadowOffset: { height: 18, width: 0 },
    shadowOpacity: 0.36,
    shadowRadius: 36,
  },
  detailPanel: {
    backgroundColor: 'rgba(86, 139, 178, 0.10)',
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#206B99',
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  detailPanelTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(117, 151, 174, 0.1)',
  },
  detailTitle: {
    color: '#FFFFFF',
    fontFamily: 'Yuanti SC',
    fontWeight: '700',
    position: 'absolute',
  },
  detailRarityRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    position: 'absolute',
  },
  detailRarityLabel: {
    color: '#FFFFFF',
    fontFamily: 'Yuanti SC',
    fontWeight: '400',
  },
  detailShareButton: {
    borderRadius: 100,
    position: 'absolute',
    shadowColor: '#3793CC',
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  detailRoundButtonGlass: {
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 217, 0.2)',
    borderRadius: 100,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  detailImage: {
    position: 'absolute',
  },
  detailBodyText: {
    color: '#FFFFFF',
    fontFamily: 'Yuanti SC',
    fontWeight: '400',
    position: 'absolute',
  },
  detailSectionTitle: {
    color: '#FFFFFF',
    fontFamily: 'Yuanti SC',
    fontWeight: '700',
    position: 'absolute',
  },
  detailCloseButton: {
    borderRadius: 100,
    position: 'absolute',
    shadowColor: '#3793CC',
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
});
