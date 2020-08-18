import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Dimensions, Image} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import styles from './styles';
import Button from '../../../components/Button';
import BackButton from '../../../components/BackButton';
import ImageIntro1 from '../../../assets/images/intro-1.png';
import ImageIntro2 from '../../../assets/images/intro-2.png';
import ImageIntro3 from '../../../assets/images/intro-3.png';
import ImageIntro4 from '../../../assets/images/intro-4.png';
import TopWave from '../../../assets/images/2Shape.png';
import {isSmallScreen} from '../../../config/helpers';

const HEIGHT = Dimensions.get('screen').height;

const slides = [
  {
    key: 1,
    title: 'Who am I and what do I do?',
    image: ImageIntro1,
    text:
      'I am your personal coach and I can help you think and feel better through daily conversations. I am also trained in CBT.',
    textButton: 'Cool, I get it!',
  },
  {
    key: 2,
    title: 'What is CBT?',
    image: ImageIntro2,
    text:
      'CBT (or Cognitive Behavioural Therapy) is a short-term, goal-oriented psychoterapy treatment that takes a hands-on, practical approach to problem-solving.',
    textButton: 'Gotcha!',
  },
  {
    key: 3,
    title: 'I am not a crisis center',
    image: ImageIntro3,
    text:
      'I am solemny designed as a self-helping program. I will never be a subtitute for actual mental health services or any type of medical care.',
    textButton: 'Understood',
  },
  {
    key: 4,
    title: 'What about your data?',
    image: ImageIntro4,
    text:
      'Your data is yours. We are following the top standard protocols of data privacy to make sure your information is kept safe and anonymous.',
    textButton: 'Alrighty!',
  },
];

export default class IntroScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  renderItem = ({item, index}) => {
    return (
      <View style={styles.blockWrapper} key={index.toString()}>
        <Text style={styles.blockTitle}>{item.title}</Text>
        <Image
          source={item.image}
          style={{
            maxWidth: 180,
            maxHeight: 120,
            width: 150,
            height: 100,
          }}
          resizeMode="contain"
        />
        <Text style={styles.blockDescriptions}>{item.text}</Text>
      </View>
    );
  };

  renderPoints = () => {
    const {slideIndex} = this.state;
    return (
      <Pagination
        dotsLength={slides.length}
        activeDotIndex={slideIndex}
        containerStyle={{width: 120}}
        dotStyle={styles.activeDots}
        inactiveDotStyle={styles.inactiveDots}
        inactiveDotScale={1}
      />
    );
  };

  nextSlide = () => {
    const {slideIndex} = this.state;
    this.setState(
      {
        slideIndex: slideIndex + 1,
      },
      () => this.carousel.snapToNext()
    );
  };

  render() {
    const {slideIndex} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.sliderWrapper}>
        {isSmallScreen() ? null : (
          <Image
            source={TopWave}
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height / 4,
              position: 'absolute',
              top: 0,
            }}
            resizeMode="stretch"
          />
        )}
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.contentWrapper}>
          <View style={styles.textWrapper}>
            <Text style={styles.welcomeText}>
              Nice to meet you! Let me show you what I can and can&apos;t do for you:
            </Text>
          </View>
          <View style={{...styles.slideBlockWrapper, top: HEIGHT / 2 - 150}}>
            <Carousel
              ref={(c) => {
                this.carousel = c;
              }}
              data={slides}
              renderItem={this.renderItem}
              sliderWidth={Dimensions.get('screen').width}
              itemWidth={277 + 20}
              itemHeight={310}
              inactiveSlideOpacity={1}
              inactiveSlideScale={1}
              slideStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onSnapToItem={(index) => this.setState({slideIndex: index})}
            />
            {isSmallScreen() ? null : this.renderPoints()}
          </View>
        </View>
        <Button
          onPress={() => {
            if (slideIndex < 3) {
              this.nextSlide();
            } else {
              navigation.navigate('PrivacyPolicyScreen');
            }
          }}
          text={slides[slideIndex].textButton}
        />
        <View style={styles.progressWrapper}>
          <View style={styles.progressBlock} />
        </View>
      </View>
    );
  }
}

IntroScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
