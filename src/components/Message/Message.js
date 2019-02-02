import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import moment from 'moment';

import styles from './styles'

const Message = props => {
    return (
        <View style={[styles.message, props.last ? {borderBottomWidth:StyleSheet.hairlineWidth} : null]}>
            <Text>To: {props.toUser}</Text>
            <Text>From: {props.fromUser}</Text>
            <Text>Message: {props.message}</Text>
            <Text>At: {moment(props.dateTime).format()}</Text>
        </View>
    )
};

export default Message;