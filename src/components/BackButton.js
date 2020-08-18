import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {textStyles} from '../config/styles';
import Arrow from '../assets/images/arrow_up.png';

const styles = StyleSheet.create({
  backText: {
    ...textStyles.caption,
  },
  wrapper: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width,
    alignItems: 'center',
    position: 'absolute',
    top: 46,
    left: (Dimensions.get('screen').width - 280) / 2,
    alignSelf: 'flex-start',
    zIndex: 100,
  },
});

const BackButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.wrapper}>
      <Image source={Arrow} style={{width: 12, height: 12, transform: [{rotate: '-90deg'}]}} />
      <Text style={styles.backText}>GO BACK</Text>
    </TouchableOpacity>
  );
};

BackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default BackButton;
