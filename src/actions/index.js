/* eslint-disable no-underscore-dangle */
import amplitude from 'amplitude-js';
import PushNotification from 'react-native-push-notification';
import {Alert} from 'react-native';
import types from './types';
import DirectLineClient from '../services/chatbot/DirectLineClient';
import {
  COUNT,
  TYPING_TYPE,
  ACTION_SET_USER_NAME,
  ACTION_CHECK_NOTIFICATION,
  ACTION_SET_NOTIFICATION_TIME,
  ACTION_SET_NOTIFICATION_CUSTOM_TIME,
  ACTION_CHANGE_USER_NAME,
  END_OF_CONVERSATION_TYPE,
  ACTION_CHECK_IN,
} from '../config/constants';
import getMessages from '../services/realm/controllers/messages';
import {getExercises} from '../services/realm/controllers/exercises';
import {setUserName, setNextExerciseDate, getUser} from '../services/realm/controllers/user';
import NotificationService from '../services/NotificationService';
import {conversationTime, convertUserMessageToGC} from '../config/parser';

const onBotActivities = (activities, dispatch) => {
  activities.forEach((item) => {
    switch (item.type) {
      case TYPING_TYPE:
        return dispatch({
          type: types.IS_TYPING,
        });

      case END_OF_CONVERSATION_TYPE:
        return dispatch({
          type: types.IS_END_OF_CONVERSATION,
        });

      default:
        return dispatch({
          type: types.MESSAGE_RECEIVED,
          payload: item,
        });
    }
  });
};

const onError = async (dispatch) => {
  Alert.alert(
    'Internet connection Offline',
    'Please, check your internet connection and try again'
  );
  dispatch({
    type: types.IS_ERROR,
  });
};

const onSocketError = async (dispatch) => {
  dispatch({
    type: types.IS_SOCKET_ERROR,
  });
};

const directLineClient = new DirectLineClient({onBotActivities, onError, onSocketError});

export const openConversation = (moduleId) => (dispatch) => {
  directLineClient.openConversation(dispatch, moduleId);
};

export const closeConversation = () => {
  return (dispatch) => {
    directLineClient.close();
    dispatch({
      type: types.CLOSE_CONVERSATION,
    });
  };
};

const configureNotifications = (date) => {
  const notification = new NotificationService();
  notification.cancelNotif();
  notification.scheduleNotification(date);
};

const setupNextExerciseDateWithPeriod = (period) => {
  const date = conversationTime(period);
  setNextExerciseDate(date);
  configureNotifications(date);
};

const handleSpecialActions = (prevMessage, currentMessage) => {
  switch (prevMessage.module_id) {
    case ACTION_SET_USER_NAME:
    case ACTION_CHANGE_USER_NAME:
      setUserName(currentMessage);
      break;
    case ACTION_CHECK_NOTIFICATION:
      PushNotification.checkPermissions((resp, error) => {
        if (!resp.alert) {
          PushNotification.requestPermissions();
        }
        if (error) console.log(error);
      });
      break;
    case ACTION_SET_NOTIFICATION_TIME:
    case ACTION_SET_NOTIFICATION_CUSTOM_TIME:
      setupNextExerciseDateWithPeriod(currentMessage);
      break;

    case ACTION_CHECK_IN:
      amplitude.getInstance().logEvent('emotion', {
        feeling: currentMessage,
        userID: getUser()._id,
      });
      break;
    default:
      break;
  }
};

export const sent = (prevMessage, currentMessage, isQuickReply) => (dispatch) => {
  const message = convertUserMessageToGC(currentMessage);
  amplitude.getInstance().setUserProperties({latestDate: new Date()});
  amplitude.getInstance().logEvent('send message', {
    userID: getUser()._id,
  });
  handleSpecialActions(prevMessage, currentMessage);
  directLineClient.send(message, isQuickReply, dispatch);
  dispatch({
    type: types.SENT_MESSAGE,
    payload: message,
  });
};

export const loadConversation = (offset = 0) => (dispatch) => {
  const messages = Array.from(getMessages().slice(offset, offset + COUNT));
  const canLoadMore = offset < 500 ? messages.length === COUNT : false;

  dispatch({
    type: types.CONVERSATION_LOADED,
    messages,
    canLoadMore,
  });
};

export const loadExercises = () => (dispatch) => {
  const exercises = Array.from(getExercises());
  dispatch({
    type: types.EXERCISES_LOADED,
    exercises,
  });
};
