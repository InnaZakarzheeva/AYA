/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import {DrawerItems} from 'react-navigation-drawer';
import {View, Image, Dimensions, Text, StyleSheet, AppState} from 'react-native';
import {connect} from 'react-redux';
import TopImage from '../assets/images/menu.png';
import Alpaca from '../assets/images/AlpacaMenu.png';
import colors, {textStyles} from '../config/styles';
import {getUser} from '../services/realm/controllers/user';
import {isSmallScreen, isIOS} from '../config/helpers';
import {HOME_ROUTE_NAME} from '../config/constants';
import {openConversation, closeConversation} from '../actions/index';

const styles = StyleSheet.create({
  lama: {
    width: 150,
    height: 200,
    position: 'absolute',
    bottom: 50,
    left: 0,
  },
  lamaSmall: {
    width: 120,
    height: 180,
    position: 'absolute',
    bottom: 50,
    left: 0,
  },
});

class DrawerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
    };
  }

  componentDidMount = () => {
    AppState.addEventListener('change', this.handleAppStateChange);
  };

  componentWillUnmount = () => {
    AppState.removeEventListener('change', this.handleAppStateChange);
  };

  handleAppStateChange = (nextAppState) => {
    const {appState} = this.state;
    if (appState === 'background' && nextAppState === 'active') {
      if (this.props.activeItemKey === HOME_ROUTE_NAME) {
        this.props.openConversation();
      }
    }

    if (isIOS()) {
      if (appState === 'inactive' && nextAppState === 'background') {
        this.props.closeConversation();
      }
    } else if (nextAppState === 'background') {
      this.props.closeConversation();
    }

    this.setState({appState: nextAppState});
  };

  render() {
    const {userName} = getUser();
    return (
      <View style={{flex: 1, padding: 30, paddingTop: 60}}>
        {isSmallScreen() ? null : (
          <Image
            source={TopImage}
            style={{
              width: Dimensions.get('screen').width * 0.8,
              height: Dimensions.get('screen').height / 3.5,
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            resizeMode="stretch"
          />
        )}
        <View
          style={{
            height: Dimensions.get('screen').height / 3.5,
            position: 'absolute',
            top: 0,
            left: 30,
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <Text style={{...textStyles.title, width: '100%'}}>
            <Text>Hey,</Text>
            {userName ? <Text>{'\n'}</Text> : null}
            <Text>{userName}</Text>
          </Text>
          <Text style={{...textStyles.body1}}>What do you want to do?</Text>
        </View>

        <DrawerItems
          {...this.props}
          labelStyle={{...textStyles.body1, fontWeight: '300', color: colors.black}}
          itemStyle={{backgroundColor: 'transparent'}}
          itemsContainerStyle={{
            width: Dimensions.get('screen').width * 0.8,
            position: 'absolute',
            top: Dimensions.get('screen').height / 3.5,
            left: 0,
          }}
          iconContainerStyle={{paddingLeft: 10}}
        />

        <Image source={Alpaca} style={isSmallScreen() ? styles.lamaSmall : styles.lama} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.conversation.messages,
    isTyping: state.conversation.isTyping,
    canLoadMore: state.conversation.canLoadMore,
    isSocketError: state.conversation.isSocketError,
  };
};

export default connect(mapStateToProps, {
  openConversation,
  closeConversation,
})(DrawerComponent);
