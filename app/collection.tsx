import { GlassView } from 'expo-glass-effect';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

const FIGMA_WIDTH = 402;

const islandImages = {
  aogashima: require('@/assets/figma/collection-aogashima.png'),
  bali: require('@/assets/figma/collection-bali.png'),
  enoshima: require('@/assets/figma/collection-enoshima.png'),
  ishigaki: require('@/assets/figma/collection-ishigaki.png'),
  miyajima: require('@/assets/figma/collection-miyajima.png'),
  yakushima: require('@/assets/figma/collection-yakushima.png'),
};

const islands = [
  { id: 'enoshima', image: islandImages.enoshima, name: '江ノ島', rarity: 1 },
  { id: 'miyajima', image: islandImages.miyajima, name: '宮島', rarity: 1 },
  { id: 'ishigaki', image: islandImages.ishigaki, name: '石垣島', rarity: 1 },
  { id: 'yakushima', image: islandImages.yakushima, name: '屋久島', rarity: 2 },
  { id: 'bali', image: islandImages.bali, name: 'バリ島', rarity: 2 },
  { id: 'borabora', image: islandImages.enoshima, name: 'ボラボラ島', rarity: 3 },
  { id: 'easter', image: islandImages.enoshima, name: 'イースター島', rarity: 3 },
  { id: 'komodo', image: islandImages.enoshima, name: 'コモド島', rarity: 3 },
  { id: 'socotra', image: islandImages.enoshima, name: 'ソコトラ島', rarity: 4 },
  { id: 'aogashima', image: islandImages.aogashima, name: '青ヶ島', rarity: 5 },
];

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

export default function CollectionScreen() {
  const { width } = useWindowDimensions();
  const scale = width / FIGMA_WIDTH;
  const cardWidth = 160 * scale;

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
        <GlassView glassEffectStyle="regular" style={styles.backButtonGlass}>
          <View style={{ transform: [{ translateY: -4 * scale }] }}>
            <BackIcon size={36 * scale} />
          </View>
        </GlassView>
      </Pressable>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            columnGap: 24 * scale,
            paddingBottom: 48 * scale,
            paddingHorizontal: 29 * scale,
            paddingTop: 31 * scale,
            rowGap: 24 * scale,
          },
        ]}
        showsVerticalScrollIndicator={false}
        style={[styles.scrollView, { top: 135 * scale }]}>
        {islands.map((island) => (
          <Pressable
            accessibilityLabel={`${island.name}、レア度${island.rarity}`}
            accessibilityRole="button"
            key={island.id}
            onPress={() => {}}
            style={({ pressed }) => [
              styles.cardPressable,
              { borderRadius: 36 * scale, height: 200 * scale, width: cardWidth },
              pressed && styles.pressed,
            ]}>
            <GlassView
              glassEffectStyle="regular"
              style={[styles.card, { borderRadius: 36 * scale }]}>
              <Text
                numberOfLines={1}
                style={[
                  styles.cardTitle,
                  {
                    fontSize: 20 * scale,
                    left: 16 * scale,
                    lineHeight: 27 * scale,
                    top: 16 * scale,
                  },
                ]}>
                {island.name}
              </Text>
              <View style={[styles.rarityRow, { left: 16 * scale, top: 47 * scale }]}>
                <Text
                  style={[
                    styles.rarityLabel,
                    { fontSize: 12 * scale, lineHeight: 17 * scale },
                  ]}>
                  レア度
                </Text>
                <View style={styles.stars}>
                  {Array.from({ length: island.rarity }, (_, index) => (
                    <StarIcon key={index} size={20 * scale} />
                  ))}
                </View>
              </View>
              <Image
                contentFit="cover"
                source={island.image}
                style={[
                  styles.cardImage,
                  {
                    borderRadius: 30 * scale,
                    bottom: 6 * scale,
                    height: 117 * scale,
                    left: 6 * scale,
                    width: 148 * scale,
                  },
                ]}
              />
            </GlassView>
          </Pressable>
        ))}
      </ScrollView>
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
    backgroundColor: 'rgba(217, 217, 217, 0.2)',
    borderRadius: 100,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardPressable: {
    borderRadius: 36,
    shadowColor: '#206B99',
    shadowOffset: { height: 3, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 36,
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontFamily: 'Yuanti SC',
    fontWeight: '700',
    position: 'absolute',
    right: 8,
  },
  rarityRow: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
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
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
});
