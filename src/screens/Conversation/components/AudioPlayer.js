/* eslint-disable react/prop-types */
import React from 'react';
import SoundPlayer from 'react-native-sound-player';
import {View, TouchableOpacity, Slider, StyleSheet, Image} from 'react-native';
import Play from '../../../assets/images/icon-play.png';
import Pause from '../../../assets/images/icon-pause.png';

const styles = StyleSheet.create({
  audioMessageWrapper: {
    minWidth: 250,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class AudioPlayer extends React.Component {
  onFinishedPlayingSubscription = null;

  onFinishedLoadingSubscription = null;

  onFinishedLoadingFileSubscription = null;

  onFinishedLoadingURLSubscription = null;

  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      time: 0,
      maxTime: 0,
    };
  }

  componentDidMount = () => {
    const {
      props: {currentMessage},
    } = this.props;

    this.onFinishedPlayingSubscription = SoundPlayer.addEventListener(
      'FinishedPlaying',
      ({success}) => {
        console.log('finished playing', success);
      }
    );
    this.onFinishedLoadingSubscription = SoundPlayer.addEventListener(
      'FinishedLoading',
      ({success}) => {
        console.log('finished loading', success);
      }
    );
    this.onFinishedLoadingFileSubscription = SoundPlayer.addEventListener(
      'FinishedLoadingFile',
      ({success, name, type}) => {
        console.log('finished loading file', success, name, type);
      }
    );
    this.onFinishedLoadingURLSubscription = SoundPlayer.addEventListener(
      'FinishedLoadingURL',
      ({success, url}) => {
        console.log('finished loading url', success, url);
      }
    );

    SoundPlayer.loadUrl(currentMessage.video);
    SoundPlayer.getInfo().then((data) =>
      this.setState({
        maxTime: Math.floor(data.duration),
      })
    );
    SoundPlayer.onFinishedPlaying(() => {
      this.setState({
        isPlaying: false,
        time: 0,
        maxTime: 0,
      });
    });
  };

  componentWillUnmount = () => {
    this.onFinishedPlayingSubscription.remove();
    this.onFinishedLoadingSubscription.remove();
    this.onFinishedLoadingURLSubscription.remove();
    this.onFinishedLoadingFileSubscription.remove();
  };

  componentDidUpdate = () => {
    const {isPlaying} = this.state;
    if (isPlaying) {
      SoundPlayer.getInfo().then((data) =>
        this.setState({
          time: Math.floor(data.currentTime),
        })
      );
    }
  };

  render() {
    const {isPlaying, time, maxTime} = this.state;
    return (
      <View style={styles.audioMessageWrapper}>
        {isPlaying ? (
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => {
              SoundPlayer.pause();
              this.setState({
                isPlaying: false,
              });
            }}>
            <Image
              source={Pause}
              style={{
                width: 30,
                height: 30,
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => {
              SoundPlayer.play();
              this.setState({
                isPlaying: true,
              });
            }}>
            <Image
              source={Play}
              style={{
                width: 30,
                height: 30,
              }}
            />
          </TouchableOpacity>
        )}
        <Slider
          value={time}
          maximumValue={maxTime}
          onValueChange={(value) => {
            SoundPlayer.seek(Math.floor(value));
          }}
          style={{width: 200}}
        />
      </View>
    );
  }
}
