import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import moment from 'moment';

import styles from './styles'

const Message = props => {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={props.messagePress} style={styles.message}>
            <View>
                <View style={styles.topRow}>
                    <View style={styles.topRowLeft}>
                        <Image style={styles.image} source={{uri:'http://placekitten.com/g/200/200'}} />
                        <Text style={styles.username}>{props.sent_from}</Text>
                    </View>
                    <View style={styles.topRowRight}>
                        <Text style={styles.date}>{moment(props.created_at).fromNow()}</Text>
                    </View>
                </View>
                <View style={styles.bottomRow}>
                    <Text>{props.content}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};

export default Message;