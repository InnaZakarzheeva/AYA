/* eslint-disable class-methods-use-this */
import PushNotification from 'react-native-push-notification';

export default class NotificationService {
  constructor() {
    PushNotification.configure({
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
    });
    this.lastId = 0;
  }

  scheduleNotification(time) {
    this.lastId += 1;
    PushNotification.localNotificationSchedule({
      id: this.lastId,
      date: time,
      title: 'Hi there human 👋',
      message: 'Ready to create a space for your feelings?',
      playSound: true,
      soundName: 'default',
      repeatType: 'day',
    });
  }

  cancelNotif() {
    PushNotification.cancelLocalNotifications({id: `${this.lastId}`});
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }
}
