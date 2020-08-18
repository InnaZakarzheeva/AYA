import {StyleSheet, Dimensions} from 'react-native';
import colors, {textStyles} from '../../../config/styles';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 46,
    backgroundColor: colors.white,
  },
  title: {
    ...textStyles.subheading,
  },
  descriptions: {
    ...textStyles.subheading2,
    width: 280,
    zIndex: 1,
    position: 'absolute',
    top: Dimensions.get('screen').height / 4 + 30,
  },
  buttonText: {
    ...textStyles.body1,
    fontWeight: '500',
  },
});

export default styles;
