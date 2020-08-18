/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, FlatList} from 'react-native';
import {connect} from 'react-redux';
import colors, {textStyles} from '../../config/styles';
import TopWave from '../../assets/images/9Shape.png';
import Alpaca from '../../assets/images/9Alpaca.png';
import styles from './styles';
import Exercise from './components/Exercise';
import MenuBackButton from '../../components/MenuBackButton';
import {loadExercises, closeConversation} from '../../actions/index';
import {isExercisePlaying} from '../../services/realm/controllers/user';

class ExercisesScreen extends Component {
  componentDidMount = () => {
    const {navigation} = this.props;
    this.props.loadExercises();
    this.didFocusListener = navigation.addListener('didFocus', this.componentDidFocus);
  };

  componentDidFocus = () => {
    this.props.loadExercises();
  };

  componentWillUnmount = () => {
    this.didFocusListener.remove();
  };

  openConversationWithExercise = async (moduleId) => {
    const {navigation} = this.props;
    isExercisePlaying();
    navigation.navigate('Home', {exercise: moduleId});
  };

  renderItem = ({item}) => {
    return (
      <Exercise item={item} openConversationWithExercise={this.openConversationWithExercise} />
    );
  };

  renderFooter = () => {
    return (
      <View style={styles.footer}>
        <View style={styles.footerWrapper}>
          <Text style={styles.footerText}>
            Continuously reveal more personalized exercises via conversations with Aya
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const {navigation, exercises} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <MenuBackButton onPress={() => navigation.navigate('Home', {exercise: null})} />
        <Image source={TopWave} style={styles.topWaveImage} resizeMode="stretch" />
        <View style={styles.header}>
          <Text
            style={{
              ...textStyles.title,
              color: colors.white,
              textAlign: 'center',
              fontWeight: '300',
            }}>
            Your exercises
          </Text>
        </View>
        <Image source={Alpaca} style={styles.alpacaImage} resizeMode="contain" />
        <FlatList
          data={exercises}
          renderItem={this.renderItem}
          contentContainerStyle={{width: '100%'}}
          keyExtractor={(item) => item.startModuleId}
          ListFooterComponent={() => this.renderFooter()}
        />
      </View>
    );
  }
}

ExercisesScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  return {
    exercises: state.conversation.exercises,
  };
};

export default connect(mapStateToProps, {loadExercises, closeConversation})(ExercisesScreen);
