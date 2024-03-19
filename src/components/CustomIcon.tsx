import React from 'react';
import {AntDesign} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';
interface CustomIconProps {
  name?: any;
  size?: number;
  color?: string;
  styles?: StyleMedia;
  Type?: number;
}

const CustomIcon: React.FC<CustomIconProps> = ({
  name,
  size,
  color,
  styles,
  Type = 1,
}) => {
  return Type === 1 ? (
    <AntDesign name={name} size={size} color={color} style={styles} />
  ) : (
    <FontAwesome name={name} size={size} color={color} style={styles} />
  );
};

export default CustomIcon;
