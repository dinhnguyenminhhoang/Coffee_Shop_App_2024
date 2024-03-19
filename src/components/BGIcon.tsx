import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BORDERRADIUS, SPACING} from 'theme/theme';
import CustomIcon from './CustomIcon';

interface BGIconProps {
  name: string;
  color: string;
  BGColor: string;
  size: number;
}
const BGIcon: React.FC<BGIconProps> = ({name, color, BGColor, size}) => {
  return (
    <View style={[styles.IconBG, {backgroundColor: BGColor}]}>
      <CustomIcon name={name} color={color} size={size} />
    </View>
  );
};

export default BGIcon;

const styles = StyleSheet.create({
  IconBG: {
    height: SPACING.space_30,
    width: SPACING.space_30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDERRADIUS.radius_8,
  },
});
