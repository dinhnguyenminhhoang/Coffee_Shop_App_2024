import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from 'theme/theme';
import CustomIcon from './CustomIcon';
import BGIcon from './BGIcon';

interface CoffeCartProps {
  id: number;
  index: string;
  name: string;
  description: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  prices: any;
  average_rating: number;
  type: string;
  buttonOnPressHandler: any;
}
const CARD_WINDOW = Dimensions.get('window').width * 0.32;
const CoffeCart: React.FC<CoffeCartProps> = ({
  id,
  index,
  name,
  description,
  imagelink_square,
  special_ingredient,
  prices,
  average_rating,
  type,
  buttonOnPressHandler,
}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.cartLiear}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
      <ImageBackground
        source={imagelink_square}
        style={styles.cardImg}
        resizeMode="cover">
        <View style={styles.cartRatingContainer}>
          <CustomIcon
            name={'star'}
            color={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_16}
          />
          <Text style={styles.cardRatingText}>{average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.cardTitle}>{name}</Text>
      <Text style={styles.cardSubtile}>{special_ingredient}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardpriceCurr}>
          $<Text style={styles.cardPrice}>{` ${prices[0].price}`}</Text>
        </Text>
        <TouchableOpacity onPress={() => {}}>
          <BGIcon
            color={COLORS.primaryWhiteHex}
            name="plus"
            BGColor={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_18}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default CoffeCart;

const styles = StyleSheet.create({
  cartLiear: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_25,
  },
  cardImg: {
    width: CARD_WINDOW,
    height: CARD_WINDOW,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
  },
  cartRatingContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryBlackRGBA,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_10,
    paddingHorizontal: SPACING.space_15,
    position: 'absolute',
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
    top: 0,
    right: 0,
  },
  cardRatingText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    lineHeight: 22,
    fontSize: FONTSIZE.size_14,
  },
  cardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    lineHeight: 22,
    fontSize: FONTSIZE.size_16,
  },
  cardSubtile: {
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.primaryWhiteHex,
    lineHeight: 22,
    fontSize: FONTSIZE.size_10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.space_15,
  },
  cardpriceCurr: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_18,
  },
  cardPrice: {
    color: COLORS.primaryWhiteHex,
  },
});
