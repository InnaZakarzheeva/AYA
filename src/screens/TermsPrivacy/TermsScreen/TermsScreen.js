import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity, Image, ScrollView, Dimensions} from 'react-native';
import CheckBox from 'react-native-check-box';
import styles from './styles';
import BackButton from '../../../components/BackButton';
import Button from '../../../components/Button';
import IconOpen from '../../../assets/images/privacy_icon.png';
import ActiveCheckbox from '../../../assets/images/active_checkbox.png';
import InActiveCheckbox from '../../../assets/images/inactive_checkbox.png';
import BottomWave from '../../../assets/images/3Shape.png';
import {isSmallScreen} from '../../../config/helpers';

export default class TermsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
  }

  render() {
    const {navigation} = this.props;
    const {isChecked} = this.state;
    return (
      <View style={styles.termsWrapper}>
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
          <ScrollView
            contentContainerStyle={styles.textWrapper}
            showsVerticalScrollIndicator={false}>
            <Text style={styles.mainText}>
              Your data is subject to the Highest confidentiality.{' '}
            </Text>
            <Text style={styles.mainText}>
              By clicking “Accept” below you give the following consent:
            </Text>
            <Text style={styles.termsText}>
              “I hereby agree that Get Aya Aps, Ragnagade 7, 2100 Copenhagen, Denmark is allowed to
              gather and process my anonymous data and health information and its results to use it
              for the purpose of the Aya app. {'\n'}I am aware that I can withdraw this consent at
              any time with an information statement addressed to Get Aya ApS, Ragnagade 7, 2100
              Copenhagen and sent by email to info@getaya.io or by post to Get Aya ApS, Ragnagade 7,
              2100 Copenhagen, Denmark.“
            </Text>
          </ScrollView>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('WebView', {url: 'https://getaya.io/terms-and-conditions/'})
            }
            style={styles.termsButton}>
            <Text style={styles.termsButtontext}>Terms Of Use</Text>
            <Image
              // eslint-disable-next-line global-require
              source={IconOpen}
              style={{width: 13, height: 13, marginLeft: 10}}
            />
          </TouchableOpacity>
        </View>
        <CheckBox
          onClick={() => {
            this.setState({
              isChecked: !isChecked,
            });
          }}
          isChecked={isChecked}
          checkedImage={<Image source={ActiveCheckbox} style={{width: 22, height: 22}} />}
          unCheckedImage={<Image source={InActiveCheckbox} style={{width: 22, height: 22}} />}
          rightTextView={
            <Text style={styles.checkboxTitle}>I confirm that I am over the age of 12</Text>
          }
          style={{
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: isSmallScreen() ? 130 : 160,
          }}
        />
        <Button
          onPress={() => {
            if (isChecked) {
              navigation.navigate('NotificationScreen');
            }
          }}
          text="Accept"
          isActive={isChecked}
        />
        <View style={styles.progressWrapper}>
          <View style={styles.progressBlock} />
        </View>
      </View>
    );
  }
}

TermsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
