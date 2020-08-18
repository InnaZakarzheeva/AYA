import {StyleSheet, Dimensions} from 'react-native';
import colors, {textStyles} from '../../../config/styles';
import {isSmallScreen} from '../../../config/helpers';

const styles = StyleSheet.create({
  termsWrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  contentWrapper: {
    display: 'flex',
    width: 280,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: Dimensions.get('screen').height / 2,
    alignItems: 'center',
    position: 'absolute',
    top: 80,
  },
  textWrapper: {
    width: 280,
    height: Dimensions.get('screen').height / 2,
    flexDirection: 'column',
  },
  backText: {
    color: colors.darkGreen,
    fontSize: 14,
    fontWeight: '200',
    marginBottom: 20,
  },
  mainText: {
    ...textStyles.subheading,
    marginBottom: 20,
  },
  termsText: {
    ...textStyles.caption,
    width: '100%',
    color: colors.secondaryWithOpacity,
  },
  termsButton: {
    width: 236,
    height: 48,
    backgroundColor: colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    flexDirection: 'row',
    marginTop: 20,
  },
  termsButtontext: {
    ...textStyles.body1,
    fontWeight: '500',
  },
  checkBoxWrapper: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: Dimensions.get('screen').height / 2 - 83,
  },
  checkboxTitle: {
    ...textStyles.caption,
    fontWeight: '400',
    marginLeft: 10,
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
    width: 150,
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: 50,
  },
});

export default styles;
