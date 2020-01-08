// import PropTypes from 'prop-types'
// import React from 'react'
// import { View, ViewPropTypes } from 'react-native'
// import Video from 'react-native-video'
// export default class MessageVideo extends React.Component {
//   constructor() {
//     super(...arguments)
//     this.player = undefined
//   }
//   render() {
//     const {
//       containerStyle,
//       videoProps,
//       videoStyle,
//       currentMessage,
//     } = this.props
//     if (!!currentMessage) {
//       return (
//         <View style={containerStyle}>
//           <Video
//             {...videoProps}
//             ref={r => {
//               this.player = r
//             }}
//             source={{ uri: currentMessage.video }}
//             style={videoStyle}
//             resizeMode='cover'
//             controls
//             paused
//             fullscreen
//           />
//         </View>
//       )
//     }
//   }
// }
// MessageVideo.defaultProps = {
//   currentMessage: {
//     video: null,
//   },
//   containerStyle: {},
//   videoStyle: {
//     width: 150,
//     height: 100,
//     borderRadius: 13,
//     margin: 3,
//   },
//   videoProps: {},
// }
// MessageVideo.propTypes = {
//   currentMessage: PropTypes.object,
//   containerStyle: ViewPropTypes.style,
//   videoStyle: PropTypes.object,
//   videoProps: PropTypes.object,
// }
// //# sourceMappingURL=MessageVideo.js.map

import React, { useEffect, createRef } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  Text,
  Image,
  Platform
} from 'react-native';
import { Icon } from 'native-base';
import Slider from '@react-native-community/slider';
import Video, {
  OnSeekData,
  OnLoadData,
  OnProgressData
} from 'react-native-video';
import Orientation from 'react-native-orientation';
import { connect } from 'react-redux';

import { ChatActions } from '../../../src/store/actions';
import { images } from '../../../src/config';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class MessageVideo extends React.Component {
  constructor() {
    super();
    this.state = {
      fullscreen: false,
      play: false,
      currentTime: 0,
      duration: 0,
      showControls: true,
      toggleFullScreen: false
    };
    this.myVideo = React.createRef();
  }

  // onSlideCapture = ({data: seekTime }) => void;

  // onSeek(data) {
  //   this.myVideo.current.seek(data.seekTime);
  //   this.setState({ currentTime: data.seekTime });
  // }

  onLoadEnd = data => {
    this.setState({
      duration: data.duration,
      currentTime: data.currentTime
    });
  };

  onProgress = data => {
    this.setState({
      currentTime: data.currentTime
    });
  };

  onEnd = () => {
    this.setState({ play: false });
    this.myVideo.current.seek(0);
  };

  toggleFullScreen = () => {
    this.setState(
      {
        toggleFullScreen: !this.state.toggleFullScreen
      },
      () => {
        this.handleFullscreen();
      }
    );
  };

  handleFullscreen = () => {
    console.log(this.state.toggleFullScreen, 'toggle screen');
    if (this.state.toggleFullScreen) {
      Orientation.lockToLandscapeLeft();
      this.setState({ fullscreen: true });
      StatusBar.setHidden(true);
    } else if (!this.state.toggleFullScreen) {
      Orientation.lockToPortrait();
      this.setState({ fullscreen: false });
      StatusBar.setHidden(false);
    }
  };

  skipForward = () => {
    this.myVideo.current.seek(this.state.currentTime + 15);
    this.setState({ currentTime: this.state.currentTime + 15 });
  };

  skipBackward = () => {
    this.myVideo.current.seek(this.state.currentTime - 15);
    this.setState({ currentTime: this.state.currentTime - 15 });
  };

  handlePlayPause = () => {
    // If playing, pause and show controls immediately.
    if (this.state.play) {
      this.setState({ play: false, showControls: true });
      return;
    }

    this.setState({ play: true });
    setTimeout(() => this.setState({ showControls: false }), 2000);
    // this.setState({
    // play: !this.state.play,
    // showControls: !this.state.showControls
    // });
  };

  handleOrientation = orientation => {
    if (orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT') {
      this.setState({ fullscreen: true });
      StatusBar.setHidden(true);
    }
    this.setState({ fullscreen: false });
    StatusBar.setHidden(false);
  };

  setVideoData = () => {
    this.props.setVideo({
      videoModalVisible: true,
      currentMessage: this.props.currentMessage.video
    });
  };

  showControls = () => {
    this.setState({ showControls: !this.state.showControls });
  };

  getMinutesFromSeconds = time => {
    const minutes = time >= 60 ? Math.floor(time / 60) : 0;
    const seconds = Math.floor(time - minutes * 60);

    return `${minutes >= 10 ? minutes : '0' + minutes}:${
      seconds >= 10 ? seconds : '0' + seconds
    }`;
  };

  // handleOnSlide = time => {
  //   this.onSlideCapture({ seekTime: time });
  // }

  render() {
    const fullDuration = this.getMinutesFromSeconds(this.state.duration);

    const { play } = images;

    const { currentMessage } = this.props;

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' ? (
          <Video
            {...videoProps}
            ref={r => {
              this.player = r;
            }}
            source={{ uri: currentMessage.video }}
            style={videoStyle}
            resizeMode="contain"
            controls
            paused
            fullscreen
          />
        ) : (
          <TouchableWithoutFeedback onPress={this.setVideoData}>
            <View>
              <Video
                ref={this.myVideo}
                source={{
                  uri: currentMessage.video
                }}
                style={
                  styles.video
                }
                resizeMode={'contain'}
                onLoad={this.onLoadEnd}
                onProgress={this.onProgress}
                onEnd={this.onEnd}
                paused={!this.state.play}
              />
              {this.state.showControls && (
                <View style={styles.controlOverlay}>
                  <View style={styles.wrapper}>
                    <TouchableOpacity
                      style={styles.touchable}
                      onPress={this.setVideoData}
                    >
                      <Image source={play} style={styles.roundIcon} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.timeWrapper}>
                    <Text style={styles.timeRight}>{fullDuration}</Text>
                  </View>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  video: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    backgroundColor: 'black'
  },
  fullscreenVideo: {
    height: width,
    width: height,
    backgroundColor: 'black'
  },
  roundIcon: {
    width: (width / 100) * 5.5,
    height: (width / 100) * 5.5
  },
  text: {
    marginTop: 30,
    marginHorizontal: 20,
    fontSize: 15,
    textAlign: 'justify'
  },
  fullscreenButton: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingRight: 10
  },
  controlOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 13,
    backgroundColor: '#000000c4',
    margin: 3,
    justifyContent: 'space-between'
  },
  wrapper: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 3
  },
  touchable: {
    padding: 5
  },
  touchableDisabled: {
    opacity: 0.3
  },
  wrappers: {
    flex: 1
  },
  timeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5
  },
  timeLeft: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    paddingLeft: 10
  },
  timeRight: {
    flex: 1,
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'right',
    paddingRight: 10
  }
});

function mapStateToProps(state) {
  return {
    video: state.chat.video
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setVideo: video => dispatch(ChatActions.saveVideo(video))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageVideo);
