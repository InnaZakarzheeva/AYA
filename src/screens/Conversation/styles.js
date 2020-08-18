import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../config/styles';
import {isIOS} from '../../config/helpers';

const styles = StyleSheet.create({
  header: {
    width: Dimensions.get('screen').width,
    height: isIOS() ? 117 : 117 - 40,
    backgroundColor: colors.greyWithOpacity,
  },
  quick: {
    width: '100%',
    justifyContent: 'center',
  },
});

export default styles;
