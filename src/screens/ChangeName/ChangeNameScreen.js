/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Emoji from 'react-native-emoji';
import {View, Image, Text, TextInput, Keyboard} from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import TopWave from '../../assets/images/11Shape.png';
import LamaBack from '../../assets/images/Lama_back.png';
import AlpacaHead from '../../assets/images/1Alpaca.png';
import Check from '../../assets/images/check-icon.png';
import {getUser, updateUserName} from '../../services/realm/controllers/user';
import {
  CHANGE_NAME_ROUTE_NAME,
  STATUS_INACTIVE,
  STATUS_ACTIVE,
  STATUS_UPDATE,
} from '../../config/constants';
import MenuBackButton from '../../components/MenuBackButton';

export default class ChangeNameScreen extends Component {
  constructor(props) {
    super(props);
    const {currentDay, userName} = getUser();
    this.state = {
      prevName: userName,
      name: userName,
      enabled: currentDay >= 2,
      status: STATUS_INACTIVE,
    };
  }

  componentDidMount = () => {
    const {navigation} = this.props;
    this.didFocusListener = navigation.addListener('didFocus', this.componentDidFocus);
  };

  componentDidFocus = () => {
    const {
      navigation: {
        state: {routeName},
      },
    } = this.props;
    if (routeName === CHANGE_NAME_ROUTE_NAME) {
      const {currentDay, userName} = getUser();
      this.setState({
        prevName: userName,
        name: userName,
        enabled: currentDay >= 2,
        status: STATUS_INACTIVE,
      });
    }
  };

  componentWillUnmount = () => {
    this.didFocusListener.remove();
  };

  isActive = (prevText, text) => {
    const textWithoutSpaces = text.replace(/\s+/g, '');
    if (prevText !== text && textWithoutSpaces !== '') return STATUS_ACTIVE;
    return STATUS_INACTIVE;
  };

  onChangeName = (text) => {
    this.setState((prevState) => ({
      name: text,
      status: this.isActive(prevState.prevName, text),
    }));
  };

  changeName = () => {
    const {name, status} = this.state;
    if (status === STATUS_ACTIVE) {
      updateUserName(name);
      this.setState({
        status: STATUS_UPDATE,
      });
      Keyboard.dismiss();
    }
    return true;
  };

  renderButton = () => {
    const {status} = this.state;
    switch (status) {
      case STATUS_INACTIVE:
        return (
          <>
            <Button onPress={() => this.changeName()} text="Save" isActive={false} />
            <Text style={styles.description}>Type a name/nickname to save</Text>
          </>
        );

      case STATUS_ACTIVE:
        return <Button onPress={() => this.changeName()} text="Save" isActive />;

      case STATUS_UPDATE:
        return (
          <Image
            source={Check}
            style={{width: 48, height: 48, position: 'absolute', bottom: 83}}
            resizeMode="contain"
          />
        );

      default:
        return null;
    }
  };

  renderChangeName = () => {
    const {name} = this.state;
    return (
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.onChangeName(text)}
          value={name}
        />
        {this.renderButton()}
      </View>
    );
  };

  renderEmpty = () => {
    return (
      <View style={styles.unavailableWrapper}>
        <Text style={styles.textTitle}>
          Hey there! I can see you like exploring.{' '}
          <Emoji name=":slightly_smiling_face:" style={{fontSize: 20}} />
        </Text>
        <Text style={styles.text}>
          This option is available after you finish the first conversation in the chat. {'\n'}
          {'\n'}
          To do that, simply go back to the chat and keep talking to Aya.
        </Text>
      </View>
    );
  };

  render() {
    const {navigation} = this.props;
    const {enabled} = this.state;
    return (
      <View style={styles.wrapper}>
        <Image source={TopWave} style={styles.imageWave} />
        <MenuBackButton onPress={() => navigation.navigate('Home')} />
        <Image source={LamaBack} style={styles.imageLama} />
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Name/Nickname</Text>
          <Text style={styles.subtitle}>What should Aya call you?</Text>
        </View>
        {enabled ? this.renderChangeName() : this.renderEmpty()}
        <Image source={AlpacaHead} style={styles.imageLamaHead} resizeMode="cover" />
      </View>
    );
  }
}

ChangeNameScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
