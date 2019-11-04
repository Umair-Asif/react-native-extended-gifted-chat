import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  View,
  ViewPropTypes,
  TouchableOpacity,
  Linking,
  Platform,
  Text,
} from 'react-native'
import GoogleAddressing from '../../../src/utils/googleAddressing';

// @ts-ignore
const styles = StyleSheet.create({
  container: {},
  image: {
    width: 200,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
  imageActive: {
    flex: 1,
    resizeMode: 'contain',
  },
})
export default class MessageLocation extends Component {
  render() {
    const {
      containerStyle,
      locationProps,
      locationStyle,
      currentMessage,
    } = this.props

  let URL = GoogleAddressing.getGoogleAddress(currentMessage.location.lat , currentMessage.location.lng)
    if (!!currentMessage) {
      return (
        <View style={[styles.container, containerStyle]}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(URL)
            }}
          >
            <View
              style={{
                width: 200,
              }}
            >
              <Image
                {...locationProps}
                style={[styles.image, locationStyle]}
                source={{
                  uri:
                    'https://cdn.pixabay.com/photo/2016/11/04/14/13/google-maps-1797882_1280.png',
                }}
              />
              <Text
                style={{
                  margin: 3,
                  flexWrap: 'wrap',
                }}
              >
               {currentMessage.location.formattedAddress}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
    return null
  }
}
MessageLocation.defaultProps = {
  currentMessage: {
    location: null,
  },
  containerStyle: {},
  locationStyle: {},
  locationProps: {},
  lightboxProps: {},
}
MessageLocation.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  locationStyle: PropTypes.object,
  locationProps: PropTypes.object,
  lightboxProps: PropTypes.object,
}
//# sourceMappingURL=MessageLocation.js.map
