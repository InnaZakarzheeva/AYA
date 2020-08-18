/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-return-assign */
/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import {View, Image, TouchableOpacity, Dimensions, Keyboard, BackHandler} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';
import {connect} from 'react-redux';
import {GiftedChat, MessageImage} from 'react-native-gifted-chat';
import PropTypes from 'prop-types';
import styles from './styles';
import AnimatedEllipsis from '../../components/DotAnimation';
import MessageBubble from './components/MessageBubble';
import InputToolbarComponent from './components/InputToolbarComponent';
import Burger from '../../assets/images/burger.png';
import LamaLogo from '../../assets/images/lama_chat.png';
import colors from '../../config/styles';
import QuickRepliesComponent from './components/QuickReplies';
import YoutubePlayer from './components/YoutubePlayer';
import VideoPlayer from './components/VideoPlayer';
import AudioPlayer from './components/AudioPlayer';
import {openConversation, closeConversation, sent, loadConversation} from '../../actions/index';
import BottomWave from '../../assets/images/chat-bottom.png';
import {COUNT} from '../../config/constants';
import {isIOS} from '../../config/helpers';

const INPUT_TOOLBAR_HEIGHT = Dimensions.get('screen').height / 4;

class ConversationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      offset: 0,
      toolbarHeight: INPUT_TOOLBAR_HEIGHT,
    };
  }

  componentDidMount = async () => {
    const {navigation} = this.props;
    await this.props.loadConversation();
    const exercise = navigation.getParam('exercise');
    this.props.openConversation(exercise);
    this.didFocusListener = navigation.addListener('didFocus', this.componentDidFocus);
    this.didBlurListener = navigation.addListener('didBlur', this.componentDidBlur);
    this.keyboardDidShowListener = Keyboard.addListener(
      isIOS() ? 'keyboardWillShow' : 'keyboardDidShow',
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      isIOS() ? 'keyboardWillHide' : 'keyboardDidHide',
      this.keyboardDidHide
    );
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  };

  componentDidFocus = (payload) => {
    const exercise = payload.state.params ? payload.state.params.exercise : null;
    this.props.openConversation(exercise);
    this.giftedChat.scrollToBottom();
  };

  componentDidBlur = () => {
    this.props.closeConversation();
  };

  componentWillUnmount = () => {
    this.props.closeConversation();
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    this.didFocusListener.remove();
    this.didBlurListener.remove();
  };

  keyboardDidShow = () => {
    this.setState({
      toolbarHeight: 50,
    });
  };

  keyboardDidHide = () => {
    this.setState({
      toolbarHeight: INPUT_TOOLBAR_HEIGHT,
    });
  };

  onSend = (msg = []) => {
    const {messages} = this.props;
    if (msg[0].text.trim() !== '') {
      this.props.sent(messages[0], msg[0].text, false);
      Keyboard.dismiss();
    }
  };

  renderInputToolbar = (props) => {
    const {isSocketError, isExercisePlaying, isFinishedConversation} = this.props;
    if (
      (props.messages[0] &&
        props.messages[0].isInputRequired &&
        props.messages[0].type !== 'choice' &&
        !isSocketError) ||
      (isFinishedConversation && !isExercisePlaying && !isSocketError)
    ) {
      return <InputToolbarComponent props={props} />;
    }
    return null;
  };

  renderBubble = (props) => <MessageBubble props={props} />;

  onQuickReply = (message) => {
    const {messages} = this.props;
    this.props.sent(messages[0], message.title, true);
  };

  renderMessageVideo = (props) => {
    if (props.currentMessage.audio) {
      return <AudioPlayer props={props} />;
    }
    if (props.currentMessage.youtube) {
      return <YoutubePlayer props={props} />;
    }
    return <VideoPlayer props={props} />;
  };

  renderMessageImage = (props) => {
    return (
      <MessageImage
        {...props}
        imageStyle={{minWidth: 300, minHeight: 250, resizeMode: 'contain', borderRadius: 15}}
        containerStyle={{minWidth: 300, minHeight: 250}}
      />
    );
  };

  renderFooter = (props) => {
    const {isTyping} = this.props;
    const delay = props.messages[0] ? props.messages[0].wait : 0;
    if (isTyping && props.messages[0]) {
      return <AnimatedEllipsis numberOfDots={3} minOpacity={0.4} animationDelay={delay} />;
    }
    return null;
  };

  onLoadEarlier = () => {
    const {messages} = this.props;
    this.setState(
      (prevState) => ({
        isLoading: true,
        offset: prevState.offset + COUNT,
      }),
      () => {
        this.props.loadConversation(messages.length);
        this.setState({
          isLoading: false,
        });
      }
    );
  };

  renderChatFooter = () => {
    const {isSocketError} = this.props;
    const quickReplies = this.giftedChat.props.messages[0]
      ? this.giftedChat.props.messages[0].quickReplies
      : null;
    if (quickReplies && !isSocketError) {
      const enabledScroll = quickReplies.length > 2;
      return (
        <QuickRepliesComponent
          quickReplies={quickReplies}
          onPress={this.onQuickReply}
          enabledScroll={enabledScroll}
        />
      );
    }
    return null;
  };

  openDrawer = () => {
    const {navigation} = this.props;
    navigation.dispatch(DrawerActions.openDrawer());
    this.keyboardDidHide();
    Keyboard.dismiss();
  };

  render() {
    const {messages, canLoadMore} = this.props;
    const {isLoading, toolbarHeight} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{
              width: 24,
              height: 19,
              position: 'absolute',
              top: isIOS() ? 68 : 30,
              left: 21,
            }}
            onPress={() => this.openDrawer()}>
            <Image source={Burger} style={{width: 24, height: 19}} />
          </TouchableOpacity>
          <Image
            source={LamaLogo}
            style={{
              width: 43,
              height: 54,
              position: 'absolute',
              top: isIOS() ? 43 : 10,
              left: Dimensions.get('screen').width / 2 - 22,
            }}
          />
        </View>
        {toolbarHeight === INPUT_TOOLBAR_HEIGHT ? (
          <Image
            source={BottomWave}
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height / 4,
              position: 'absolute',
              bottom: 0,
            }}
            resizeMode="stretch"
          />
        ) : null}
        <GiftedChat
          ref={(r) => (this.giftedChat = r)}
          messages={messages}
          onSend={(message) => this.onSend(message)}
          onQuickReply={(message) => this.onQuickReply(message)}
          renderAvatar={null}
          alwaysShowSend
          renderBubble={this.renderBubble}
          renderInputToolbar={this.renderInputToolbar}
          renderFooter={this.renderFooter}
          renderQuickReplies={() => {}}
          renderMessageVideo={this.renderMessageVideo}
          renderMessageImage={this.renderMessageImage}
          renderTime={() => {}}
          alignTop
          loadEarlier={canLoadMore}
          isLoadingEarlier={isLoading}
          onLoadEarlier={this.onLoadEarlier}
          minInputToolbarHeight={toolbarHeight}
          renderChatFooter={this.renderChatFooter}
          user={{
            _id: 1,
          }}
        />
      </View>
    );
  }
}

ConversationScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  return {
    messages: state.conversation.messages,
    isTyping: state.conversation.isTyping,
    canLoadMore: state.conversation.canLoadMore,
    isSocketError: state.conversation.isSocketError,
    isFinishedConversation: state.conversation.isFinishedConversation,
    isExercisePlaying: state.conversation.isExercisePlaying,
  };
};

export default connect(mapStateToProps, {
  openConversation,
  closeConversation,
  sent,
  loadConversation,
})(ConversationScreen);
