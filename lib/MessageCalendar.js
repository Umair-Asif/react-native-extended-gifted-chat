import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
  ViewPropTypes,
  TouchableOpacity,
  Text
} from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import { connect } from 'react-redux';

import { ChatActions } from '../../../src/store/actions';

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 170,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
    alignSelf: 'center'
  },
  imageActive: {
    flex: 1,
    resizeMode: 'contain'
  }
});

class MessageCalendar extends Component {
  messageLoop = () => {
    const { currentMessage, messages } = this.props;

    for (const val in messages) {
      if (messages[val]._id === currentMessage._id) {
        return messages[val].calendar.calendar.eventReceiverId;
      }
    }
  };

  messageId = () => {
    const { currentMessage, messages } = this.props;

    for (const val in messages) {
      if (messages[val]._id === currentMessage._id) {
        return true;
      }
    }
  };

  openMessage() {
    const {
      currentMessage,
      messages,
      user,
      storeReceiverEvent,
      storeCurrentMessageId,
      storeCalendarEventDetails
    } = this.props;
    if (user._id === currentMessage.user._id) {
      AddCalendarEvent.presentEventViewingDialog({
        eventId: currentMessage.calendar.calendar.calendarItemIdentifier
      });
    } else if (
      user._id !== currentMessage.user._id &&
      this.messageId() &&
      this.messageLoop() === null
    ) {
      storeReceiverEvent(true);
      storeCurrentMessageId(currentMessage._id);
      storeCalendarEventDetails(currentMessage.calendar.calendar);
    } else if (
      user._id !== currentMessage.user._id &&
      this.messageId() &&
      this.messageLoop() !== null
    ) {
      AddCalendarEvent.presentEventViewingDialog({
        eventId: this.messageLoop()
      });
    }
  }

  render() {
    const {
      containerStyle,
      calendarProps,
      calendarStyle,
      currentMessage
    } = this.props;

    if (!!currentMessage) {
      return (
        <View style={[styles.container, containerStyle]}>
          <TouchableOpacity onPress={() => this.openMessage()}>
            <View
              style={{
                width: 190
              }}
            >
              <Image
                {...calendarProps}
                style={[styles.image, calendarStyle]}
                source={{
                  uri:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXMWPjbCP0BtZYbYPoDj07YGZ9ZetWFdNK_EI5_XgDEmVL3-IU&s'
                }}
              />
              <Text
                style={{
                  marginTop: 3,
                  marginLeft: '5%',
                  marginBottom: 3,
                  marginRight: 3,
                  flexWrap: 'wrap',
                  color: 'black'
                }}
              >
                Event Title
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }
}
MessageCalendar.defaultProps = {
  currentMessage: {
    calendar: null
  },
  containerStyle: {},
  calendarStyle: {},
  calendarProps: {},
  lightboxProps: {}
};
MessageCalendar.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  calendarStyle: PropTypes.object,
  calendarProps: PropTypes.object,
  lightboxProps: PropTypes.object
};
//# sourceMappingURL=MessageCalendar.js.map

function mapStateToProps(state) {
  return {
    messages: state.chat.messages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    storeReceiverEvent: event =>
      dispatch(ChatActions.storeReceiverEvent(event)),
    storeCurrentMessageId: id =>
      dispatch(ChatActions.storeCurrentMessageId(id)),
    storeCalendarEventDetails: details =>
      dispatch(ChatActions.storeCalendarEventDetails(details))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageCalendar);
