import React, {Component} from 'react';
import {Text, Animated, View} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../config/styles';

export default class AnimatedEllipsis extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dotOpacities: this.initializeDots(),
      targetOpacity: 1,
      shouldAnimate: true,
    };
  }

  componentDidMount() {
    this.animateDots.bind(this)(0);
  }

  componentWillUnmount() {
    this.state.shouldAnimate = false;
  }

  initializeDots() {
    const {minOpacity, numberOfDots} = this.props;
    const opacities = [];

    for (let i = 0; i < numberOfDots; i += 1) {
      const dot = new Animated.Value(minOpacity);
      opacities.push(dot);
    }

    return opacities;
  }

  animateDots(whichDot) {
    let dot = whichDot;
    const {minOpacity, animationDelay} = this.props;
    const {shouldAnimate, dotOpacities, targetOpacity} = this.state;
    if (!shouldAnimate) return;

    if (dot >= dotOpacities.length) {
      dot = 0;
      const min = minOpacity;
      this.state.targetOpacity = targetOpacity === min ? 1 : min;
    }

    const nextDot = dot + 1;

    Animated.timing(dotOpacities[dot], {
      toValue: targetOpacity,
      duration: animationDelay,
      useNativeDriver: true,
    }).start(this.animateDots.bind(this, nextDot));
  }

  render() {
    const {style} = this.props;
    const {dotOpacities} = this.state;
    const dots = dotOpacities.map((o, i) => (
      <Animated.View key={i.toString()} style={[style, {opacity: o}]} />
    ));

    return (
      <View
        style={{
          marginLeft: 7,
          backgroundColor: colors.greyChat,
          padding: 10,
          margin: 5,
          borderRadius: 10,
          borderBottomLeftRadius: 0,
          flexDirection: 'row',
          width: 80,
          justifyContent: 'center',
        }}>
        {dots}
      </View>
    );
  }
}

AnimatedEllipsis.propTypes = {
  numberOfDots: PropTypes.number,
  animationDelay: PropTypes.number,
  minOpacity: PropTypes.number,
  style: Text.propTypes.style,
};

AnimatedEllipsis.defaultProps = {
  numberOfDots: 3,
  animationDelay: 300,
  minOpacity: 0,
  style: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgb(92,94,96)',
    marginHorizontal: 5,
  },
};
