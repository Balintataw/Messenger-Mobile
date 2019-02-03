import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import moment from 'moment';

import styles from './styles'

const Message = props => {
    return (
        <View style={[styles.message, props.last ? {borderBottomWidth:StyleSheet.hairlineWidth} : null]}>
            {/* <Text>To: {props.send_to}</Text> */}
            <Text>From: {props.sent_from}</Text>
            <Text>Message: {props.content}</Text>
            <Text>At: {props.created_at}</Text>
        </View>
    )
};

export default Message;