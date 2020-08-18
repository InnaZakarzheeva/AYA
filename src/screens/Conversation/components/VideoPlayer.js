/* eslint-disable react/prop-types */
import React from 'react';
import Video from 'react-native-video';

const VideoPlayer = ({props: {currentMessage}}) => (
  <Video
    source={{
      uri: currentMessage.video,
    }}
    style={{minWidth: 250, minHeight: 150, borderRadius: 5}}
    resizeMode="contain"
    controls
    paused
  />
);

export default VideoPlayer;
