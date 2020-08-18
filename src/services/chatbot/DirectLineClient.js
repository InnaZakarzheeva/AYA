/* eslint-disable array-callback-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import {
  saveConversationId,
  updateConversationWith,
  isConversationExist,
} from '../realm/controllers/conversation';
import {
  startConversation,
  reconnect,
  getExercises,
  startNewDay,
  startExerciseByModuleId,
  sendMessage,
} from '../api/requests';
import {
  setConversationDone,
  setConversationStart,
  isNextDayAvailable,
  getUser,
} from '../realm/controllers/user';
import {
  EVENT_TYPE,
  MESSAGE_TYPE,
  END_OF_CONVERSATION_TYPE,
  START_NEW_DAY_TYPE,
} from '../../config/constants';
import {saveExercise} from '../realm/controllers/exercises';
import {saveMessage} from '../realm/controllers/messages';

export default class DirectLineClient {
  constructor(props) {
    this.onBotActivities = props.onBotActivities.bind(this);
    this.onError = props.onError.bind(this);
    this.onSocketError = props.onSocketError.bind(this);
    this.isFailed = false;
    this.exercises = [];
  }

  openConversation(dispatch, moduleId) {
    this.isFailed = false;
    this.exercises = [];
    if (moduleId) {
      this.setupConversation(dispatch, moduleId);
    } else {
      getExercises()
        .then((data) => {
          this.exercises = data;
          this.setupConversation(dispatch);
        })
        .catch((error) => console.log('[ERROR] Get exersise', error));
    }
  }

  setupConversation(dispatch, moduleId) {
    if (isConversationExist()) {
      this.reconnectToConversation(dispatch, moduleId);
    } else {
      this.startConversation(dispatch);
    }
  }

  startConversation(dispatch) {
    startConversation()
      .then((response) => {
        const {conversationId, streamUrl} = response.data;
        saveConversationId(conversationId);
        this.configureSocket(
          streamUrl,
          () => {
            if (this.ws.readyState === 1) {
              sendMessage('').catch(() => this.error(dispatch));
            }
          },
          dispatch
        );
      })
      .catch(() => this.onSocketError(dispatch));
  }

  reconnectToConversation(dispatch, moduleId) {
    reconnect()
      .then((response) => {
        const {streamUrl} = response.data;
        let onOpen = isNextDayAvailable() ? startNewDay() : {};
        if (moduleId) onOpen = startExerciseByModuleId(moduleId);
        this.configureSocket(streamUrl, onOpen, dispatch);
      })
      .catch(() => this.onSocketError(dispatch));
  }

  send(message, isQuickReply, dispatch) {
    saveMessage(message);
    sendMessage(message.text, isQuickReply).catch(() => this.onError(dispatch));
  }

  configureSocket(streamUrl, onOpen, dispatch) {
    this.ws = new WebSocket(streamUrl);
    this.ws.onopen = onOpen;
    this.ws.onmessage = (e) => {
      if (e.data.length) {
        const {_id} = getUser();
        const data = JSON.parse(e.data);
        if (!data) return;
        const isStartNewDay =
          data.activities.filter((item) => item.name === START_NEW_DAY_TYPE).length > 0;
        if (isStartNewDay) setConversationStart();

        const activities = data.activities.filter((item) => item.type !== EVENT_TYPE);
        const messages = activities.filter(
          (item) => item.type === MESSAGE_TYPE && item.from.id !== _id
        );
        const botActivities = activities.filter((item) => item.from.id !== _id);

        botActivities.forEach((element) => {
          const exercise =
            element.channelData &&
            this.exercises.find((item) => element.channelData.message_id === item.start);
          if (exercise) saveExercise(exercise);
        });

        const isEndOfConversation =
          activities.filter((item) => item.type === END_OF_CONVERSATION_TYPE).length > 0;
        if (isEndOfConversation) setConversationDone();
        updateConversationWith(data.watermark, messages);
        if (botActivities.length) this.onBotActivities(botActivities, dispatch);
      }
    };
    this.ws.onerror = (e) => {
      if (!this.isFailed) {
        console.log(e.message);
        this.error(dispatch);
        this.ws.close();
      }
    };
  }

  error(dispatch) {
    this.isFailed = true;
    this.onSocketError(dispatch);
  }

  close() {
    if (this.ws) {
      this.ws.onerror = () => {};
      this.ws.close();
    }
  }
}
