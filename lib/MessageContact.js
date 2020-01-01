import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
  ViewPropTypes,
  TouchableOpacity,
  Text,
  Linking
} from 'react-native';
import { Icon } from 'native-base';
import Contacts from 'react-native-contacts';

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 30,
    height: 30,
    margin: 3,
    resizeMode: 'cover'
  }
});
export default class MessageContact extends Component {
  constructor() {
    super();
    this.state = {
      contactObj: {}
    };
  }
  check = contact => {
    if (this.props.user._id === this.props.currentMessage.user._id) {
      return Contacts.openExistingContact(contact, () => {
        console.log('this is my contact');
      });
    } else if (contact) {
      const {
        company,
        department,
        displayName,
        emailAddresses,
        familyName,
        givenName,
        hasThumbnail,
        jobTitle,
        middleName,
        note,
        phoneNumbers,
        postalAddresses,
        prefix,
        rawContactId,
        recordID,
        suffix,
        thumbnailPath,
        urlAddresses
      } = contact;
  
      const contactObject = {};
  
      if (company !== null) {
        Object.assign(contactObject, { company });
      }
      if (department !== null) {
        Object.assign(contactObject, { department });
      }
      if (displayName !== null) {
        Object.assign(contactObject, { displayName });
      }
      if (emailAddresses.length > 0) {
        Object.assign(contactObject, { emailAddresses });
      }
      if (familyName !== null) {
        Object.assign(contactObject, { familyName });
      }
      if (givenName !== null) {
        Object.assign(contactObject, { givenName });
      }
      if (hasThumbnail !== null) {
        Object.assign(contactObject, { hasThumbnail });
      }
      if (jobTitle !== null) {
        Object.assign(contactObject, { jobTitle });
      }
      if (middleName !== null) {
        Object.assign(contactObject, { middleName });
      }
      if (note !== null) {
        Object.assign(contactObject, { note });
      }
      if (phoneNumbers.length > 0) {
        Object.assign(contactObject, { phoneNumbers });
      }
      if (postalAddresses.length > 0) {
        Object.assign(contactObject, { postalAddresses });
      }
      if (prefix !== null) {
        Object.assign(contactObject, { prefix });
      }
      if (rawContactId !== null) {
        Object.assign(contactObject, { rawContactId });
      }
      if (recordID !== null) {
        Object.assign(contactObject, { recordID });
      }
      if (suffix !== null) {
        Object.assign(contactObject, { suffix });
      }
      if (thumbnailPath !== null) {
        Object.assign(contactObject, { thumbnailPath });
      }
      if (urlAddresses.length > 0) {
        Object.assign(contactObject, { urlAddresses });
      }

      Contacts.openContactForm(contactObject, () => {
      console.log(contact, 'print contact');
      });
    }
  };

  render() {
    const {
      containerStyle,
      contactProps,
      contactStyle,
      currentMessage
    } = this.props;
    if (!!currentMessage) {
      console.log(
        currentMessage,
        'logging message from contact compoent gifted chat'
      );
      const phone =
        currentMessage.contact.phone !== null
          ? currentMessage.contact.phone
          : null;
      const phonenumber = phone.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
      const LabelName = currentMessage.contact.name;
      console.log(phonenumber, 'printing phone');
      return (
        <View style={[styles.container, containerStyle]}>
          <TouchableOpacity
            onPress={() => this.check(currentMessage.contact.contact)}
          >
            <View
              style={{
                flexDirection: 'row',
                width: 200,
                height: 25,
                margin: 5,
                alignItems: 'center'
              }}
            >
              <Icon
                {...contactProps}
                type="Ionicons"
                name="ios-contact"
                style={[styles.image, contactStyle]}
              />
              <Text style={{ margin: 3, paddingLeft: 5, color: 'white' }}>
                {LabelName}
              </Text>
            </View>
            {phonenumber ? (
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 50 }} />
                <Text style={{ color: 'white' }}>{phonenumber}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }
}
MessageContact.defaultProps = {
  currentMessage: {
    contact: null
  },
  containerStyle: {},
  contactStyle: {},
  contactProps: {},
  lightboxProps: {}
};
MessageContact.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  contactStyle: PropTypes.object,
  contactProps: PropTypes.object,
  lightboxProps: PropTypes.object
};
