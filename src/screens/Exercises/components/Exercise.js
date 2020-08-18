/* eslint-disable react/prop-types */
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Lotus from '../../../assets/images/lotus.png';
import LockedLotus from '../../../assets/images/locked_lotus.png';
import IconTime from '../../../assets/images/icon-time.png';
import IconAudio from '../../../assets/images/icon-audio.png';
import IconVideo from '../../../assets/images/icon-video.png';
import IconText from '../../../assets/images/icon-text.png';
import styles from '../styles';
import {textStyles} from '../../../config/styles';

const Exercise = ({item, openConversationWithExercise}) => {
  let icon = IconText;
  switch (item.type) {
    case 'audio': {
      icon = IconAudio;
      break;
    }
    case 'video': {
      icon = IconVideo;
      break;
    }
    default: {
      icon = IconText;
      break;
    }
  }
  return (
    <TouchableOpacity
      style={styles.exercise}
      key={item.title}
      onPress={() => (!item.isDisabled ? openConversationWithExercise(item.startModuleId) : null)}>
      <Image
        source={!item.isDisabled ? Lotus : LockedLotus}
        style={{width: 35, height: 32}}
        resizeMode="contain"
      />
      <View style={{width: '70%', paddingBottom: 10, paddingTop: 5}}>
        <Text style={{...textStyles.label}}>{item.title}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '50%',
            marginTop: 5,
          }}>
          {item.duration === 0 ? null : (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={IconTime} style={{width: 12, height: 12, marginRight: 5}} />
              <Text style={{...textStyles.caption, fontSize: 10}}>{item.duration} min</Text>
            </View>
          )}
          {item.type === 'none' ? null : (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={icon}
                style={{width: 12, height: 12, marginRight: 5, resizeMode: 'contain'}}
              />
              <Text style={{...textStyles.caption, fontSize: 10, textTransform: 'capitalize'}}>
                {item.type}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Exercise;
