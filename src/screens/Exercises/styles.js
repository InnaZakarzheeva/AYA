import {StyleSheet, Dimensions} from 'react-native';
import colors, {textStyles} from '../../config/styles';

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 50,
    left: 17,
    width: 32,
    height: 32,
    zIndex: 1000,
  },
  topWaveImage: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 4,
    position: 'absolute',
    top: 0,
  },
  header: {
    height: Dimensions.get('screen').height / 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alpacaImage: {
    width: 60,
    height: 120,
    position: 'absolute',
    top: 50,
    right: 0,
  },
  exercise: {
    width: '90%',
    backgroundColor: colors.grey,
    alignSelf: 'center',
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: 'row',
    minHeight: 68,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  footer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerWrapper: {
    width: '70%',
    borderColor: colors.blueSapphire,
    borderWidth: 1,
    height: 70,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    ...textStyles.label,
    fontSize: 10,
    lineHeight: 14,
    color: colors.primary,
    fontWeight: '400',
    width: '80%',
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default styles;
