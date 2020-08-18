import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import colors, {textStyles} from '../config/styles';
import {isSmallScreen} from '../config/helpers';

const styles = StyleSheet.create({
  buttonNext: {
    width: 208,
    height: 48,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: isSmallScreen() ? 50 : 70,
    zIndex: 100,
  },
});

const Button = ({onPress, text, isActive}) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonNext,
        isActive ? {backgroundColor: colors.primary} : {backgroundColor: colors.darkGrey},
      ]}
      onPress={onPress}>
      <Text style={textStyles.button}>{text}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  isActive: PropTypes.bool,
};

Button.defaultProps = {
  text: '',
  onPress: () => {},
  isActive: true,
};

export default Button;
