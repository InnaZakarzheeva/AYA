import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, Text, Image, Dimensions} from 'react-native';
import styles from './styles';
import Button from '../../../components/Button';
import BackButton from '../../../components/BackButton';
import IconOpen from '../../../assets/images/privacy_icon.png';
import BottomWave from '../../../assets/images/3Shape.png';
import LamaHead from '../../../assets/images/Lama_head.png';
import LamaBack from '../../../assets/images/Lama_back.png';

// eslint-disable-next-line react/prefer-stateless-function
export default class PrivacyPolicyScreen extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.privacyWrapper}>
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
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.contentWrapper}>
          <View style={styles.textWrapper}>
            <Text style={styles.mainText}>Your data is yours.</Text>
            <Text style={styles.mainText}>
              Please read through our Privacy Policy below so you understand how I handle and
              protect your data:
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('WebView', {url: 'https://getaya.io/privacy-policy/'})
            }
            style={styles.buttonPrivacy}>
            <Text style={styles.buttonText}>Privacy Policy</Text>
            <Image source={IconOpen} style={{width: 13, height: 13, marginLeft: 10}} />
          </TouchableOpacity>
        </View>
        <Image
          source={LamaHead}
          style={{
            width: 100,
            height: 130,
            position: 'absolute',
            left: 0,
            bottom: Dimensions.get('screen').height / 3,
          }}
          resizeMode="cover"
        />
        <Image
          source={LamaBack}
          style={{
            width: 100,
            height: 230,
            position: 'absolute',
            right: 0,
            bottom: Dimensions.get('screen').height / 3.5,
          }}
          resizeMode="cover"
        />
        <Button onPress={() => navigation.navigate('TermsScreen')} text="Continue" />
        <View style={styles.progressWrapper}>
          <View style={styles.progressBlock} />
        </View>
      </View>
    );
  }
}

PrivacyPolicyScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
