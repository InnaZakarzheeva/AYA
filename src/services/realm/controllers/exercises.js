import realm from '../models/index';

export const getExercises = () => realm.objects('Exercise');

const saveIfNotExists = (id) => {
  return realm.objectForPrimaryKey('Exercise', id);
};

export const saveExercise = (newExercise) =>
  new Promise((resolve, reject) => {
    try {
      if (!saveIfNotExists(newExercise.start)) {
        realm.write(() => {
          const exercise = {
            title: newExercise.title,
            startModuleId: newExercise.start,
            endModuleId: newExercise.end,
            day: newExercise.day,
            duration: newExercise.duration,
            type: newExercise.type,
          };
          resolve(realm.create('Exercise', exercise));
        });
      }
      return true;
    } catch (error) {
      reject(error);
      return false;
    }
  });
