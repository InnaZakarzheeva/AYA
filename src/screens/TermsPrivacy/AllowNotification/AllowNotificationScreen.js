import React, {Component} from 'react';
import {NavigationActions, StackActions} from 'react-navigation';
import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PropTypes from 'prop-types';
import styles from './styles';
import Button from '../../../components/Button';
import TopWave from '../../../assets/images/5Shape.png';
import Alpaca from '../../../assets/images/Alpaca.png';
import {onboardingPassed} from '../../../services/realm/controllers/user';
import {isSmallScreen} from '../../../config/helpers';

export default class AllowNotificationScreen extends Component {
  allowNotification = () => {
    PushNotification.checkPermissions((resp) => {
      if (!resp.alert) {
        PushNotification.requestPermissions();
      }
    });
    onboardingPassed();
    this.goToConversation();
  };

  skipAllowNotification = () => {
    onboardingPassed();
    this.goToConversation();
  };

  goToConversation() {
    const {navigation} = this.props;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'ExercisesScreen'})],
    });
    navigation.dispatch(resetAction);
    navigation.navigate('Home');
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Image
          source={TopWave}
          style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height / 4,
            position: 'absolute',
            top: 0,
            zIndex: 0,
          }}
          resizeMode="stretch"
        />
        <View style={{position: 'absolute', top: 80, justifyContent: 'center', width: 280}}>
          <Text style={styles.title}>
            As the first step, allow yourself to take all opportunities!
          </Text>
        </View>
        <Text style={styles.descriptions}>
          Our users see the best results when checking in with Aya every day.
          {'\n'}
          {'\n'}
          With your permission we send you daily reminders to complete your daily conversation.
          {'\n'}
          {'\n'}
          Let us know if you want to unlock the full potential of your mind by
          <Text style={{fontWeight: '600'}}> allowing notifications.</Text>
        </Text>
        {isSmallScreen() ? null : (
          <Image
            source={Alpaca}
            style={{
              width: 100,
              height: 220,
              position: 'absolute',
              left: 0,
              bottom: 40,
            }}
          />
        )}
        <Button onPress={() => this.allowNotification()} text="ALLOW" />
        <TouchableOpacity
          onPress={() => this.skipAllowNotification()}
          style={{position: 'absolute', bottom: isSmallScreen() ? 20 : 30}}>
          <Text style={styles.buttonText}>NOT NOW</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

AllowNotificationScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }).isRequired,
};
