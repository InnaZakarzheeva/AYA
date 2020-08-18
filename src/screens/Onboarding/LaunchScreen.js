import React from 'react';
import PropTypes from 'prop-types';
import {NavigationActions, StackActions} from 'react-navigation';
import {View, Image, Dimensions, Text, StyleSheet, Animated} from 'react-native';
import {connect} from 'react-redux';
import amplitude from 'amplitude-js';
import colors, {textStyles} from '../../config/styles';
import {setUser, getUser, isNextDayAvailable} from '../../services/realm/controllers/user';
import {openConversation} from '../../actions';
import Bottom from '../../assets/images/LaunchScreenWave.png';
import Alpaca from '../../assets/images/Lama_LaunchScreen.png';
import {isSmallScreen} from '../../config/helpers';
import {AMPLITUDE_API_KEY} from '../../config/constants';

const styles = StyleSheet.create({
  title: {
    ...textStyles.title,
    lineHeight: 40,
    fontSize: 40,
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    top: isSmallScreen() ? 75 : 150,
  },
  wrapper: {
    width: '100%',
    height: Dimensions.get('screen').height / 2,
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  bubbleWrapper: {
    backgroundColor: colors.white,
    width: 120,
    height: 60,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: isSmallScreen() ? 30 : 50,
  },
  imageAlpaca: {
    width: 170,
    height: 270,
    position: 'absolute',
    bottom: Dimensions.get('screen').height / 4,
    left: Dimensions.get('screen').width / 2 - 130,
    zIndex: 1,
  },
  imageBottom: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 3,
    position: 'absolute',
    bottom: 0,
  },
});

class LaunchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
      offsetY: new Animated.Value(isSmallScreen() ? -150 : -130),
    };
  }

  componentDidMount = async () => {
    const {opacity, offsetY} = this.state;
    const {onboardingPassed, _id, currentDay, startDate} = getUser();
    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
      Animated.timing(offsetY, {
        toValue: isSmallScreen() ? -110 : -80,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1000);
    setTimeout(() => {
      if (onboardingPassed) {
        this.goToConversation();
      } else {
        // to rfc: refactor
        setUser();
        this.goToWelcome();
      }
      amplitude.getInstance().init(AMPLITUDE_API_KEY);
      amplitude.getInstance().setUserId(_id);
      amplitude.getInstance().setUserProperties({
        startDate,
        currentDay,
        latestDate: new Date(),
      });
    }, 3000);
  };

  goToConversation() {
    const {navigation} = this.props;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'ExercisesScreen',
        }),
      ],
    });
    navigation.dispatch(resetAction);
    if (!getUser().isFinishedConversation || isNextDayAvailable()) {
      navigation.navigate('Home');
    }
  }

  goToWelcome() {
    const {navigation} = this.props;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'WelcomeScreen',
        }),
      ],
    });
    navigation.dispatch(resetAction);
  }

  render() {
    const {opacity, offsetY} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: colors.yellow}}>
        <Text style={styles.title}>Hello</Text>
        <View style={styles.wrapper}>
          <Image source={Alpaca} style={styles.imageAlpaca} resizeMode="stretch" />
          <Animated.View
            style={{...styles.bubbleWrapper, opacity, transform: [{translateY: offsetY}]}}>
            <Text style={{...textStyles.caption}}>Just 1 sec{'\n'}-still chewing</Text>
          </Animated.View>
        </View>
        <Image source={Bottom} style={styles.imageBottom} resizeMode="stretch" />
      </View>
    );
  }
}

LaunchScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  return {
    messages: state.conversation.messages,
  };
};

export default connect(mapStateToProps, {openConversation})(LaunchScreen);
