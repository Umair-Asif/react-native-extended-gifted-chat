import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImageProps, ViewStyle, StyleProp, ImageStyle } from 'react-native';
import { IMessage } from 'react-native-gifted-chat/lib/types';
export interface MessageAudioProps<TMessage extends IMessage> {
    currentMessage?: TMessage;
    containerStyle?: StyleProp<ViewStyle>;
    audioStyle?: StyleProp<ImageStyle>;
    audioProps?: Partial<ImageProps>;
    lightboxProps?: object;
}
export default class MessageAudio<TMessage extends IMessage = IMessage> extends Component<MessageAudioProps<TMessage>> {
    static defaultProps: {
        currentMessage: {
            audio: null;
        };
        containerStyle: {};
        audioStyle: {};
        audioProps: {};
        lightboxProps: {};
    };
    static propTypes: {
        currentMessage: PropTypes.Requireable<object>;
        containerStyle: PropTypes.Validator<StyleProp<ViewStyle>> | undefined;
        audioStyle: PropTypes.Requireable<object>;
        audioProps: PropTypes.Requireable<object>;
        lightboxProps: PropTypes.Requireable<object>;
    };
    render(): JSX.Element | null;
}
