import realm from '../models/index';
import {replaceName} from '../../../config/parser';
import {getUser} from './user';
import {EMPTY_MESSAGE, GIFTEDCHAT_USER, GIFTEDCHAT_BOT} from '../../../config/constants';

const convertToRealmObject = (item) => {
  const {_id} = getUser();
  let message = {
    _id: item.timestamp,
    msBotId: item.id.toString(),
    type: item.type,
    text: item.text ? replaceName(item.text) : EMPTY_MESSAGE,
    user: item.from.id === _id ? GIFTEDCHAT_USER.name : GIFTEDCHAT_BOT.name,
    createdAt: item.timestamp,
    quickReplies: '',
    module_id: '',
    image: '',
    video: '',
    isInputRequired: !!item.inputHint,
  };
  if (item.channelData) {
    message = {
      ...message,
      module_id: item.channelData.message_id ? item.channelData.message_id.toString() : '',
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
        quickReplies: JSON.stringify(item.channelData.quick_replies),
      };
    }
  }
  return message;
};

export const getConversation = () =>
  realm.objects('Conversation')['0']
    ? realm.objects('Conversation')['0']
    : realm.objects('Conversation');

export const saveConversationId = (id) => {
  realm.write(() => {
    if (Object.keys(getConversation()).length === 0) {
      realm.create('Conversation', {conversationId: id});
    }
  });
};

export const updateConversationWith = (watermark, messages) => {
  realm.write(() => {
    messages.forEach((message) => {
      realm.create('Message', convertToRealmObject(message));
    });
    if (watermark) getConversation().watermark = watermark;
  });
};

export const isConversationExist = () => {
  const {conversationId, watermark} = getConversation();
  return conversationId && watermark;
};
