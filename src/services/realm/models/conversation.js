import Realm from 'realm';

export default class Conversation extends Realm.Object {}
Conversation.schema = {
  name: 'Conversation',
  primaryKey: 'conversationId',
  properties: {
    conversationId: 'string',
    watermark: {type: 'string', default: ''},
  },
};
