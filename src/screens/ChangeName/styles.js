import {StyleSheet, Dimensions} from 'react-native';
import colors, {textStyles} from '../../config/styles';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  textWrapper: {
    width: '100%',
    height: Dimensions.get('screen').height / 3.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    alignItems: 'center',
    height: Dimensions.get('screen').height / 3.5,
    marginTop: 50,
  },
  imageWave: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 3.5,
    position: 'absolute',
    top: 0,
  },
  imageLama: {
    width: 50,
    height: 110,
    position: 'absolute',
    top: 30,
    right: 0,
  },
  title: {
    ...textStyles.title,
    color: colors.white,
  },
  subtitle: {
    ...textStyles.subheading2,
    color: colors.white,
  },
  input: {
    ...textStyles.body1,
    color: colors.black,
    width: '70%',
    height: 50,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.yellow,
    paddingLeft: 20,
    paddingRight: 20,
  },
  description: {
    ...textStyles.caption,
    color: colors.scorpion,
    fontSize: 10,
    position: 'absolute',
    bottom: 30,
  },
  unavailableWrapper: {
    width: '100%',
    height: Dimensions.get('screen').height / 3,
    paddingTop: 10,
    paddingLeft: 46,
    paddingRight: 46,
  },
  textTitle: {
    ...textStyles.button,
    color: colors.primary,
    lineHeight: 30,
    paddingBottom: 20,
  },
  text: {
    ...textStyles.body1,
    paddingBottom: 20,
  },
  imageLamaHead: {
    width: 90,
    height: 120,
    position: 'absolute',
    right: 0,
    bottom: Dimensions.get('screen').height / 4,
  },
});

export default styles;
