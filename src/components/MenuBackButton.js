import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import ArrowLeft from '../assets/images/arrow-left.png';

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 50,
    left: 17,
    width: 32,
    height: 32,
    zIndex: 1000,
  },
});

const MenuBackButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.backButton}>
      <Image source={ArrowLeft} style={{width: 32, height: 32}} />
    </TouchableOpacity>
  );
};

MenuBackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default MenuBackButton;
