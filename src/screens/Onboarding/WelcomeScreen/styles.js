import {StyleSheet} from 'react-native';
import colors, {textStyles} from '../../../config/styles';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: colors.white,
  },
  header: {
    ...textStyles.title,
    textAlign: 'left',
    marginBottom: 40,
  },
  subheader: {
    ...textStyles.subheading2,
    textAlign: 'left',
  },
  lama: {
    width: 180,
    height: 230,
    position: 'absolute',
    top: 150,
    right: 0,
  },
  lamaSmall: {
    width: 150,
    height: 200,
    position: 'absolute',
    top: 100,
    right: 0,
  },
});

export default styles;
