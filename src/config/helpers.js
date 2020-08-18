/* eslint-disable no-bitwise */
/* eslint-disable import/no-cycle */
/* eslint-disable one-var */
import {Dimensions, Platform} from 'react-native';
import {SMALL_HEIGHT, GIFTEDCHAT_BOT, GIFTEDCHAT_USER} from './constants';

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const isSmallScreen = () => {
  return Dimensions.get('screen').height < SMALL_HEIGHT;
};

export const isIOS = () => {
  return Platform.OS === 'ios';
};

export const convertToGC = (messages) => {
  return messages.map((item) => {
    const message = {
      // eslint-disable-next-line no-underscore-dangle
      _id: item._id,
      module_id: item.module_id,
      createdAt: item.createdAt,
      image: item.image ? item.image : '',
      isInputRequired: item.isInputRequired,
    };

    switch (item.type) {
      case 'text':
        message.text = item.text;
        break;

      case 'choice':
        message.text = item.text;
        message.quickReplies = JSON.parse(item.quickReplies);
        break;

      case 'image':
        message.image = item.image;
        break;

      case 'video':
        if (item.video.includes('youtube')) {
          const youtubeId = item.url.split('=');
          message.video = youtubeId;
          message.youtube = true;
        } else {
          message.video = item.video;
        }
        break;

      case 'audio':
        message.audio = true;
        message.video = item.video;
        break;

      default:
        message.text = item.text;
        break;
    }

    if (item.user === 'Bot') {
      message.user = GIFTEDCHAT_BOT;
    } else {
      message.user = GIFTEDCHAT_USER;
    }
    message.type = item.type;
    return message;
  });
};

export const placeholderExercises = () => {
  return Array.from(Array(5), (x, index) => ({
    day: index + 1,
    duration: 0,
    title: `Exercise ${index + 1}`,
    type: 'none',
    isDisabled: true,
  }));
};
