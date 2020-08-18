/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import {AYA_API, AYA_API_AUTHORIZATION_TOKEN, BASE_URL, SECRET_KEY} from '../../config/constants';
import {getConversation} from '../realm/controllers/conversation';
import {getUser} from '../realm/controllers/user';

export const getExercises = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${AYA_API}/exercises`, {
        headers: {
          Authorization: AYA_API_AUTHORIZATION_TOKEN,
        },
      })
      .then((response) => {
        resolve(response.data.exercises);
      })
      .catch((error) => {
        console.log('Error: ', error);
        reject(error);
      });
  });
};

export const startConversation = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/v3/directline/conversations`, null, {
        headers: {
          Authorization: `Bearer ${SECRET_KEY}`,
        },
      })
      .then((response) => resolve(response))
      .catch((error) => {
        console.log('Create conversation error: ', error);
        reject(error);
      });
  });
};

export const reconnect = () => {
  return new Promise((resolve, reject) => {
    const {conversationId, watermark} = getConversation();
    axios
      .get(`${BASE_URL}/v3/directline/conversations/${conversationId}?watermark=${watermark}`, {
        headers: {
          Authorization: `Bearer ${SECRET_KEY}`,
        },
      })
      .then((response) => resolve(response))
      .catch((error) => {
        console.log('Reconnect error: ', error);
        reject(error);
      });
  });
};

const sendActivityToBot = (activity) => {
  return new Promise((resolve, reject) => {
    const {conversationId} = getConversation();
    axios
      .post(`${BASE_URL}/v3/directline/conversations/${conversationId}/activities`, activity, {
        headers: {
          Authorization: `Bearer ${SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const sendMessage = (message, isQuickreply) => {
  const {_id} = getUser();
  const params = {
    type: 'message',
    text: message,
    from: {
      id: _id,
    },
    channelData: {
      isQuickreply,
    },
  };
  return sendActivityToBot(params);
};

export const startNewDay = () => {
  const {_id} = getUser();
  const params = {
    type: 'event',
    name: 'startDay',
    from: {
      id: _id,
    },
  };
  return sendActivityToBot(params);
};

export const startExerciseByModuleId = (moduleId) => {
  const {_id} = getUser();
  const params = {
    type: 'event',
    name: 'startExercise',
    value: {
      message_id: moduleId,
    },
    from: {
      id: _id,
    },
  };
  return sendActivityToBot(params);
};
