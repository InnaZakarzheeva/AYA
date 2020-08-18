import realm from '../models/index';
import {uuidv4} from '../../../config/helpers';

const getMessages = () => realm.objects('Message').sorted('createdAt', true);

export const saveMessage = (item) => {
  realm.write(() => {
    const message = {
      ...item,
      _id: uuidv4(),
      createdAt: new Date(),
      quickReplies: item.quickReplies ? JSON.stringify(item.quickReplies) : '',
      user: item.user.name,
    };
    realm.create('Message', message);
  });
};

export default getMessages;
