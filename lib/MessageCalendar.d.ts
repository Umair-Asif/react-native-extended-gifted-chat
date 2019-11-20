import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImageProps, ViewStyle, StyleProp, ImageStyle } from 'react-native';
import { IMessage } from './types';
export interface MessageCalendarProps<TMessage extends IMessage> {
    currentMessage?: TMessage;
    containerStyle?: StyleProp<ViewStyle>;
    calendarStyle?: StyleProp<ImageStyle>;
    calendarProps?: Partial<ImageProps>;
    lightboxProps?: object;
}
export default class MessageCalendar<TMessage extends IMessage = IMessage> extends Component<MessageCalendarProps<TMessage>> {
    static defaultProps: {
        currentMessage: {
            calendar: null;
        };
        containerStyle: {};
        calendarStyle: {};
        calendarProps: {};
        lightboxProps: {};
    };
    static propTypes: {
        currentMessage: PropTypes.Requireable<object>;
        containerStyle: PropTypes.Validator<StyleProp<ViewStyle>> | undefined;
        calendarStyle: PropTypes.Requireable<object>;
        calendarProps: PropTypes.Requireable<object>;
        lightboxProps: PropTypes.Requireable<object>;
    };
    render(): JSX.Element | null;
}
