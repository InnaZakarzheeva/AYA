import Realm from 'realm';

export default class Message extends Realm.Object {}
Message.schema = {
  name: 'Message',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    msBotId: {type: 'string', default: ''},
    module_id: {type: 'string', default: ''},
    text: 'string',
    type: 'string',
    image: {type: 'string', default: ''},
    video: {type: 'string', default: ''},
    day: {type: 'int', default: 1},
    user: 'string',
    createdAt: 'date',
    quickReplies: 'string',
    isInputRequired: {type: 'bool', default: false},
  },
};
