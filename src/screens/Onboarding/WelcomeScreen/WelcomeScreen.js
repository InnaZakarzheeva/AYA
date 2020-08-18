import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, Dimensions} from 'react-native';
import Button from '../../../components/Button';
import styles from './styles';
import Lama from '../../../assets/images/Lama.png';
import BottomWave from '../../../assets/images/Shape.png';
import {isSmallScreen} from '../../../config/helpers';

// eslint-disable-next-line react/prefer-stateless-function
export default class WelcomeScreen extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.wrapper}>
        <Image
          source={Lama}
          style={isSmallScreen() ? styles.lamaSmall : styles.lama}
          resizeMode="cover"
        />
        <View>
          <Text style={styles.header}>Hi there, I&apos;m Aya</Text>
          <Text style={styles.subheader}>
            Your personal coach, who helps you think better &amp; feel great
          </Text>
        </View>
        <Button onPress={() => navigation.navigate('IntroScreen')} text="Hello Aya!" />
        <Image
          source={BottomWave}
          style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height / 3,
            position: 'absolute',
            bottom: 0,
          }}
          resizeMode="stretch"
        />
      </View>
    );
  }
}

WelcomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
