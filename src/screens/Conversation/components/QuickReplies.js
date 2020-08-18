/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import colors from '../../../config/styles';
import {isSmallScreen} from '../../../config/helpers';

const FOOTER_HEIGHT = Dimensions.get('screen').height / 4;

const QuickRepliesComponent = ({quickReplies, onPress, enabledScroll}) => {
  return (
    <View
      style={{
        width: '100%',
        flexGrow: 1,
        height: FOOTER_HEIGHT,
        position: 'absolute',
        bottom: -(FOOTER_HEIGHT + FOOTER_HEIGHT / (isSmallScreen() ? 4 : 2.5)),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal
        scrollEnabled={enabledScroll}>
        <View style={{flexDirection: 'row', padding: 20}}>
          {quickReplies.map((item) => {
            return (
              <TouchableOpacity
                key={item.title}
                style={{
                  minWidth: 80,
                  height: 45,
                  borderRadius: 15,
                  elevation: 1,
                  margin: 10,
                  backgroundColor: colors.white,
                  borderWidth: 0,
                  shadowColor: colors.black,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.4,
                  shadowRadius: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
                onPress={() => onPress(item)}>
                <Text style={{color: colors.black}} key={item.payload}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default QuickRepliesComponent;
