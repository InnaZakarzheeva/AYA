import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import {Dimensions, Image} from 'react-native';
import LaunchScreen from './Onboarding/LaunchScreen';
import WelcomeScreen from './Onboarding/WelcomeScreen/WelcomeScreen';
import IntroScreen from './Onboarding/IntroScreen/IntroScreen';
import PrivacyPolicyScreen from './TermsPrivacy/PrivacyPolicyScreen/PrivacyPolicyScreen';
import TermsScreen from './TermsPrivacy/TermsScreen/TermsScreen';
import AllowNotificationScreen from './TermsPrivacy/AllowNotification/AllowNotificationScreen';
import ConversationScreen from './Conversation/ConversationScreen';
import ExercisesScreen from './Exercises/ExercisesScreen';
import ChangeNameScreen from './ChangeName/ChangeNameScreen';
import DrawerComponent from '../components/Drawer';
import WebView from './WebView/WebViewScreen';
import ExercisesIcon from '../assets/images/exercise_icon.png';
import FaqsIcon from '../assets/images/faqs_icon.png';
import ChangeNameIcon from '../assets/images/change_name_icon.png';
import TermsIcon from '../assets/images/terms_icon.png';

const DrawerNavigator = (initialScreen) =>
  createDrawerNavigator(
    {
      Home: {
        screen: ConversationScreen,
        navigationOptions: {
          drawerLabel: () => null,
        },
      },
      Exercises: {
        screen: ExercisesScreen,
        navigationOptions: {
          drawerIcon: () => <Image source={ExercisesIcon} style={{width: 13, height: 13}} />,
          drawerLockMode: 'locked-closed',
        },
      },
      ChangeName: {
        screen: ChangeNameScreen,
        navigationOptions: {
          drawerLabel: 'Change your name',
          drawerIcon: () => <Image source={ChangeNameIcon} style={{width: 13, height: 13}} />,
        },
      },
      FAQs: {
        screen: WebView,
        params: {url: 'https://getaya.io/faq/'},
        navigationOptions: {
          drawerIcon: () => <Image source={FaqsIcon} style={{width: 13, height: 13}} />,
        },
      },
      Terms: {
        screen: WebView,
        params: {url: 'https://getaya.io/terms-and-conditions/'},
        navigationOptions: {
          drawerLabel: 'Terms of Use',
          drawerIcon: () => <Image source={TermsIcon} style={{width: 13, height: 13}} />,
        },
      },
    },
    {
      initialRouteName: initialScreen,
      contentComponent: DrawerComponent,
      drawerWidth: Dimensions.get('screen').width * 0.8,
    }
  );

const RootNavigator = createStackNavigator({
  LaunchScreen: {
    screen: LaunchScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  IntroScreen: {
    screen: IntroScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  PrivacyPolicyScreen: {
    screen: PrivacyPolicyScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  TermsScreen: {
    screen: TermsScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  NotificationScreen: {
    screen: AllowNotificationScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ConversationScreen: {
    screen: ConversationScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    },
  },
  WebView: {
    screen: WebView,
    navigationOptions: {
      headerShown: false,
    },
  },
  ExercisesScreen: {
    screen: DrawerNavigator('Exercises'),
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    },
  },
});

const Navigator = createAppContainer(RootNavigator);
export default Navigator;
