/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {InputToolbar, Composer, Send} from 'react-native-gifted-chat';
import colors, {textStyles} from '../../../config/styles';
import SendIcon from '../../../assets/images/send.png';

const styles = StyleSheet.create({
  inputToolbar: {
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: 20,
    marginRight: 15,
    marginLeft: 15,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.darkGrey,
    minHeight: 40,
    marginBottom: 10,
  },
  input: {
    ...textStyles.body1,
    color: colors.black,
    paddingLeft: 15,
  },
});

const InputToolbarComponent = ({props}) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={styles.inputToolbar}
      renderComposer={(props1) => <Composer {...props1} textInputStyle={styles.input} />}
      renderSend={(sendProps) => (
        <Send {...sendProps} containerStyle={{paddingRight: 10, paddingBottom: 12}}>
          <View>
            <Image source={SendIcon} style={{width: 18, height: 18}} resizeMode="contain" />
          </View>
        </Send>
      )}
    />
  );
};

export default InputToolbarComponent;
