import moment from 'moment';
import {uuidv4} from './helpers';
import {getUser} from '../services/realm/controllers/user';
import {GIFTEDCHAT_BOT, GIFTEDCHAT_USER, EMPTY_MESSAGE} from './constants';

export const convertUserMessageToGC = (text) => {
  return {
    _id: uuidv4(),
    text: text || EMPTY_MESSAGE,
    user: GIFTEDCHAT_USER,
    createdAt: new Date(),
    type: '',
  };
};

export const replaceName = (text) => {
  const {BOTXOName, userName} = getUser();
  if (text.includes(BOTXOName)) {
    return text.replace(BOTXOName, userName);
  }
  return text;
};

export const convertToGCMessages = (item) => {
  const {_id} = getUser();
  let message = {
    msBotId: item.id,
    _id: item.timestamp,
    type: item.type,
    text: item.text ? replaceName(item.text) : EMPTY_MESSAGE,
    user: item.from.id === _id ? GIFTEDCHAT_USER : GIFTEDCHAT_BOT,
    createdAt: item.timestamp,
    isInputRequired: !!item.inputHint,
  };
  if (item.channelData) {
    message = {
      ...message,
      module_id: item.channelData.message_id,
      isLastMessage: item.channelData.is_last_message,
      isInputRequired: item.channelData.is_input_required,
    };
    if (item.channelData.attachment) {
      if (item.channelData.attachment.type === 'template') {
        const {payload} = item.channelData.attachment;
        // Button
        message = {
          ...message,
          text: `${payload.text}\n${payload.buttons[0].url}`,
        };
      } else {
        message = {
          ...message,
          text: '',
          image: item.channelData.attachment.payload.url,
          type: 'image',
        };
      }
    }
    if (item.channelData.quick_replies) {
      message = {
        ...message,
        type: 'choice',
        quickReplies: item.channelData.quick_replies,
      };
    }
  }
  return message;
};

export const conversationTime = (period) => {
  let date = '';
  switch (period) {
    case 'Morning':
      date = new Date(moment().add(1, 'day').set('hour', 7).set('minutes', 30).set('second', 0));
      break;
    case 'Day':
      date = new Date(moment().add(1, 'day').set('hour', 12).set('minutes', 30).set('second', 0));
      break;
    case 'Evening':
      date = new Date(moment().add(1, 'day').set('hour', 19).set('minutes', 30).set('second', 0));
      break;
    case 'Night':
      date = new Date(moment().add(1, 'day').set('hour', 22).set('minutes', 30).set('second', 0));
      break;
    case 'You decide, Aya':
      date = new Date(moment().add(1, 'day').set('hour', 12).set('minutes', 30).set('second', 0));
      break;
    default:
      date = new Date(moment().add(1, 'day'));
  }
  return date;
};
