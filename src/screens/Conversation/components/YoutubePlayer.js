/* eslint-disable react/prop-types */
import React from 'react';
import YouTube from 'react-native-youtube';

const YoutubePlayer = ({props: {currentMessage}}) => (
  <YouTube
    videoId={currentMessage.video}
    play={false}
    fullscreen
    loop={false}
    style={{minWidth: 250, minHeight: 150, borderRadius: 5}}
  />
);

export default YoutubePlayer;
