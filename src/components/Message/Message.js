import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import moment from 'moment';

import styles from './styles'

const Message = props => {
    return (
        // <View style={[styles.message, props.last ? {borderBottomWidth:StyleSheet.hairlineWidth} : null]}>
        <View style={styles.message}>
            {/* <Text>To: {props.send_to}</Text> */}
            <View style={styles.topRow}>
                <Text>From: {props.sent_from}</Text>
                <Text>At: {props.created_at}</Text>
            </View>
            <View style={styles.bottomRow}>
                <Text>Message: {props.content}</Text>
            </View>
        </View>
    )
};

export default Message;