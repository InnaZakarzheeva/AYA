/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, Dimensions, View, TouchableOpacity, Text, Image} from 'react-native';
import {WebView} from 'react-native-webview';
import Refresh from '../../assets/images/refresh.png';
import colors from '../../config/styles';
import {getUser} from '../../services/realm/controllers/user';
import {isIOS} from '../../config/helpers';

class WebViewScreen extends Component {
  onClose = () => {
    const {navigation} = this.props;
    const {onboardingPassed} = getUser();
    if (onboardingPassed) navigation.navigate('Home');
    if (!onboardingPassed) navigation.goBack();
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: '#ffffff'}}>
        <View
          style={{
            height: isIOS() ? 117 : 117 - 40,
            backgroundColor: colors.grey,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingBottom: '5%',
            flexDirection: 'row',
            paddingLeft: 20,
            paddingRight: 20,
          }}>
          <TouchableOpacity onPress={() => this.onClose()}>
            <Text style={{fontSize: 17}}>Done</Text>
          </TouchableOpacity>
          <Text>getaya.io</Text>
          <TouchableOpacity onPress={() => this.webView.reload()}>
            <Image
              source={Refresh}
              style={{
                width: 17,
                height: 17,
              }}
            />
          </TouchableOpacity>
        </View>
        <WebView
          // eslint-disable-next-line no-return-assign
          ref={(r) => (this.webView = r)}
          source={{
            uri: navigation.state.params.url,
          }}
          startInLoadingState
          renderLoading={() => (
            <ActivityIndicator
              color="black"
              size="large"
              style={{
                flex: 1,
                position: 'absolute',
                left: Dimensions.get('screen').width / 2 - 20,
                top: Dimensions.get('screen').height / 2 - 100,
              }}
            />
          )}
        />
      </View>
    );
  }
}

WebViewScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    }),
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default WebViewScreen;
