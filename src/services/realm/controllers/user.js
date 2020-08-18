/* eslint-disable no-underscore-dangle */
import moment from 'moment';
import amplitude from 'amplitude-js';
import {uuidv4} from '../../../config/helpers';
import realm from '../models/index';

export const getUser = () =>
  realm.objects('User')['0'] ? realm.objects('User')['0'] : realm.objects('User');

export const setUser = () =>
  new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        if (Object.keys(getUser()).length === 0) resolve(realm.create('User', {_id: uuidv4()}));
      });
    } catch (error) {
      reject(error);
    }
  });

export const setConversationStart = () => {
  realm.write(() => {
    getUser().isFinishedConversation = false;
    getUser().isExercisePlaying = false;
  });
};

export const setUserName = (name) => {
  realm.write(() => {
    getUser().BOTXOName = name;
    getUser().userName = name;
  });
};

export const updateUserName = (name) => {
  realm.write(() => {
    getUser().userName = name;
  });
};

export const onboardingPassed = () => {
  realm.write(() => {
    getUser().onboardingPassed = true;
  });
};

export const setNextExerciseDate = (date) => {
  realm.write(() => {
    getUser().nextExerciseDate = date;
  });
};

export const isNextDayAvailable = () => {
  const {isFinishedConversation, nextExerciseDate} = getUser();
  return isFinishedConversation && nextExerciseDate < new Date();
};

export const setConversationDone = () => {
  const user = getUser();
  if (user.isExercisePlaying) {
    realm.write(() => {
      user.isExercisePlaying = false;
    });
  } else {
    const hour = moment(user.nextExerciseDate).format('HH');
    const minute = moment(user.nextExerciseDate).format('mm');
    const second = moment(user.nextExerciseDate).format('ss');
    const nextDate = new Date(
      moment().add(1, 'day').set('hour', hour).set('minute', minute).set('second', second)
    );

    amplitude.getInstance().setUserProperties({currentDay: user.currentDay + 1});
    amplitude.getInstance().logEvent('finish daily conversation', {
      currentDay: user.currentDay + 1,
      userID: user._id,
    });

    realm.write(() => {
      user.isFinishedConversation = true;
      user.currentDay += 1;
      user.nextExerciseDate = nextDate;
    });
  }
};

export const isExercisePlaying = () => {
  realm.write(() => {
    getUser().isExercisePlaying = true;
  });
};
