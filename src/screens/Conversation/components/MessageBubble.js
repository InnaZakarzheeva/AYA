/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import {Bubble} from 'react-native-gifted-chat';
import colors, {textStyles} from '../../../config/styles';

const MessageBubble = ({props}) => (
  <Bubble
    {...props}
    wrapperStyle={{
      left: {
        borderRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 0,
        padding: 5,
        backgroundColor: colors.greyChat,
        marginTop: 10,
      },
      right: {
        borderRadius: 15,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 0,
        padding: 5,
        marginTop: 10,
        backgroundColor: colors.darkOrange,
      },
    }}
    textStyle={{
      left: {
        ...textStyles.body1,
        color: colors.black,
      },
      right: {
        ...textStyles.body1,
        color: colors.white,
      },
    }}
  />
);

export default MessageBubble;
