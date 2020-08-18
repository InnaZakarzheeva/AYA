import {StyleSheet, Dimensions} from 'react-native';
import colors, {textStyles} from '../../../config/styles';
import {isSmallScreen} from '../../../config/helpers';

const styles = StyleSheet.create({
  sliderWrapper: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  contentWrapper: {
    display: 'flex',
    width: 280,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
    height: Dimensions.get('screen').height - 83,
  },
  textWrapper: {
    width: '100%',
    flexDirection: 'column',
    position: 'absolute',
    textAlign: 'left',
    top: 60,
  },
  blockWrapper: {
    backgroundColor: colors.grey,
    width: 277,
    height: 310,
    borderRadius: 25,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
  },
  blockTitle: {
    ...textStyles.title2,
    width: '60%',
    textAlign: 'center',
  },
  blockDescriptions: {
    ...textStyles.body1,
    width: '90%',
    textAlign: 'center',
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
    width: 150 * 0.3,
    height: 8,
    backgroundColor: colors.greenWithOpacity,
    borderRadius: 50,
  },
  activeDots: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: colors.darkOrange,
  },
  inactiveDots: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: colors.accent,
  },
  slideBlockWrapper: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
  },
  welcomeText: {
    ...textStyles.subheading,
    width: '100%',
    marginTop: 20,
  },
});

export default styles;
