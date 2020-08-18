// eslint-disable-next-line max-classes-per-file
import Realm from 'realm';

export default class Exercise extends Realm.Object {}
Exercise.schema = {
  name: 'Exercise',
  primaryKey: 'startModuleId',
  properties: {
    title: 'string',
    startModuleId: 'string',
    endModuleId: 'string',
    day: {type: 'int?'},
    duration: {type: 'int?'},
    type: 'string',
  },
};
