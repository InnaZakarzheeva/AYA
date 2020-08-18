import Realm from 'realm';
import User from './user';
import Message from './message';
import Exercise from './exercise';
import Conversation from './conversation';

const realm = new Realm({
  schema: [User.schema, Message.schema, Exercise.schema, Conversation.schema],
  schemaVersion: 3,
});

export default realm;
