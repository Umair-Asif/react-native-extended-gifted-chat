import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
  ViewPropTypes,
  TouchableOpacity,
  Text,
  Linking,
  Dimensions
} from 'react-native';
import { images } from '../../../src/config';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const { width, height } = Dimensions.get('window');

let calRatio = width <= height ? 16 * (width / height) : 16 * (height / width);

if (width <= height) {
  if (calRatio < 9) {
    calRatio = width / 9;
  } else {
    calRatio = height / 18;
  }
} else {
  if (calRatio < 9) {
    calRatio = height / 9;
  } else {
    calRatio = width / 18;
  }
}

export default class MessageAudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      playerStart: false
    };
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09);
  }

  onPressAudio = path => {
    if (this.state.playerStart) {
      this.onPressPausePlay();
      this.setState({
        playerStart: !this.state.playerStart
      });
    } else {
      this.setState(
        {
          playerStart: !this.state.playerStart
        },
        () => {
          this.onPressStartPlay(path);
        }
      );
    }
  };

  onPressStartPlay = async path => {
    console.log('onStartPlay');
    const msg = this.audioRecorderPlayer.startPlayer(path);
    console.log(msg);
    this.audioRecorderPlayer.addPlayBackListener(e => {
      if (e.current_position === e.duration) {
        console.log('finished');
        this.audioRecorderPlayer.stopPlayer();
        this.setState({
          playerStart: false
        });
      }
      this.setState({
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position)
        ),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration))
      });
      return;
    });
  };

  onPressPausePlay = async () => {
    this.audioRecorderPlayer.pausePlayer();
  };

  render() {
    const {
      containerStyle,
      audioProps,
      audioStyle,
      currentMessage
    } = this.props;
    const { play, pause } = images;
    let playWidth =
      (this.state.currentPositionSec / this.state.currentDurationSec) *
      (((width - 56) * calRatio) / (360 / 3.3));
    if (!playWidth) playWidth = 0;

    console.log(currentMessage, 'printing audio currentMessage');
    console.log(this.state, 'printing state');
    if (!!currentMessage) {
      return (
        <View style={[styles.container, containerStyle]}>
          <TouchableOpacity
            onPress={() => {
              this.onPressAudio(currentMessage.audio.path);
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                width: 200,
                height: 25,
                margin: 5,
                alignItems: 'center',
                alignContent: 'center'
              }}
            >
              <Image
                {...audioProps}
                style={[styles.image, audioStyle]}
                source={this.state.playerStart ? pause : play}
              />
              <View style={styles.viewBar}>
                <View style={[styles.viewBarPlay, { width: playWidth }]} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  image: {
    width: 30,
    height: 30,
    margin: 3,
    resizeMode: 'cover'
  },
  imageActive: {
    flex: 1,
    resizeMode: 'contain'
  },
  viewBarWrapper: {
    // marginTop: (28 * calRatio) / (360 / 9),
    // marginHorizontal: (28 * calRatio) / (360 / 9),
    alignSelf: 'stretch'
  },
  viewBar: {
    backgroundColor: '#ccc',
    height: (4 * calRatio) / (360 / 9),
    alignSelf: 'stretch',
    // marginBottom: '5%',
    width: 150,
    alignSelf: 'center'
  },
  viewBarPlay: {
    backgroundColor: 'white',
    height: (4 * calRatio) / (360 / 9),
    width: 150,
    maxWidth: 150
  }
});

MessageAudio.defaultProps = {
  currentMessage: {
    audio: null
  },
  containerStyle: {},
  audioStyle: {},
  audioProps: {},
  lightboxProps: {}
};
MessageAudio.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  audioStyle: PropTypes.object,
  audioProps: PropTypes.object,
  lightboxProps: PropTypes.object
};
//# sourceMappingURL=MessageAudio.js.map
