// eslint-disable-next-line max-classes-per-file
import Realm from 'realm';

export default class User extends Realm.Object {}
User.schema = {
  name: 'User',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    BOTXOName: {type: 'string', default: ''},
    userName: {type: 'string', default: ''},
    nextExerciseDate: {type: 'date', default: new Date()},
    currentDay: {type: 'int?', default: 1},
    onboardingPassed: {type: 'bool', default: false},
    isFinishedConversation: {type: 'bool', default: false},
    startDate: {type: 'date', default: new Date()},
    isExercisePlaying: {type: 'bool', default: false},
  },
};
