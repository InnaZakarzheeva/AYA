/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-case-declarations */
import {Alert} from 'react-native';
import types from '../actions/types/index';
import {GIFTEDCHAT_BOT} from '../config/constants';
import {uuidv4, convertToGC, placeholderExercises} from '../config/helpers';
import {convertUserMessageToGC, convertToGCMessages} from '../config/parser';
import {isConversationExist} from '../services/realm/controllers/conversation';
import {getUser} from '../services/realm/controllers/user';
import {saveMessage} from '../services/realm/controllers/messages';

const initialState = {
  messages: [],
  isTyping: false,
  canLoadMore: false,
  exercises: [],
  isSocketError: false,
  isExercisePlaying: getUser().isExercisePlaying,
  isFinishedConversation: getUser().isFinishedConversation,
};

export default function conversation(state = initialState, action) {
  switch (action.type) {
    case types.CONVERSATION_LOADED:
      const listMessages = convertToGC(action.messages);
      return {
        ...state,
        messages: [...state.messages, ...listMessages],
        canLoadMore: action.canLoadMore,
      };

    case types.EXERCISES_LOADED:
      const lockedExercises = placeholderExercises();
      return {
        ...state,
        exercises: [...action.exercises, ...lockedExercises],
      };

    case types.IS_TYPING:
      return {
        ...state,
        isTyping: true,
        isSocketError: false,
      };

    case types.IS_END_OF_CONVERSATION:
      return {
        ...state,
        isFinishedConversation: true,
        isExercisePlaying: false,
      };

    case types.MESSAGE_RECEIVED:
      const botMessage = convertToGCMessages(action.payload);
      return {
        ...state,
        messages: [botMessage, ...state.messages],
        isTyping: false,
        isFinishedConversation: false,
      };

    case types.CLOSE_CONVERSATION:
      return state;

    case types.SENT_MESSAGE:
      return {
        ...state,
        messages: [action.payload, ...state.messages],
      };

    case types.IS_ERROR:
      let messages = [...state.messages];
      let lastMessage;
      if (isConversationExist() && !state.isTyping) {
        for (const item of state.messages) {
          if (item.user.name === GIFTEDCHAT_BOT.name) {
            lastMessage = {...item};
            lastMessage._id = uuidv4();
            saveMessage(lastMessage);
            break;
          }
        }
        messages = [lastMessage, ...state.messages];
      }

      return {
        ...state,
        messages,
        isTyping: false,
      };

    case types.IS_SOCKET_ERROR:
      Alert.alert('Something went wrong', 'Please, try again');
      return {
        ...state,
        isServerError: true,
      };

    default:
      return state;
  }
}
