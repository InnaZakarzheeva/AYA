import {StyleSheet, Dimensions} from 'react-native';
import colors, {textStyles} from '../../../config/styles';
import {isSmallScreen} from '../../../config/helpers';

const styles = StyleSheet.create({
  privacyWrapper: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  contentWrapper: {
    display: 'flex',
    width: 280,
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: Dimensions.get('screen').height / 3.5,
    position: 'absolute',
    top: 80,
  },
  textWrapper: {
    width: '100%',
    flexDirection: 'column',
    alignSelf: 'center',
  },
  mainText: {
    ...textStyles.subheading,
    textAlign: 'left',
  },
  buttonPrivacy: {
    width: 236,
    height: 48,
    backgroundColor: colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  bottomWrapper: {
    width: '100%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 50,
  },
  buttonText: {
    ...textStyles.body1,
    fontWeight: '600',
  },
  nextButton: {
    width: '60%',
    height: 50,
    backgroundColor: colors.darkGreen,
    marginBottom: 20,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.white,
  },
  progressWrapper: {
    width: 150,
    height: 8,
    backgroundColor: colors.green,
    borderRadius: 50,
    position: 'absolute',
    bottom: isSmallScreen() ? 30 : 40,
  },
  progressBlock: {
    width: 150 * 0.7,
    height: 8,
    backgroundColor: colors.greenWithOpacity,
    borderRadius: 50,
  },
});

export default styles;
