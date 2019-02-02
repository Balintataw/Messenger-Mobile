import React, { Component } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

import { Message } from '../components/Message';

import config from '../config';

const messages = [
    {
        toUser: 'Biff',
        fromUser: 'Siopao',
        message: 'Hey Biff',
        dateTime: new Date()
    },
    {
        toUser: 'Biff',
        fromUser: 'Siopao',
        message: 'Hey Biff',
        dateTime: new Date()
    },
    {
        toUser: 'Biff',
        fromUser: 'Siopao',
        message: 'Hey Biff',
        dateTime: new Date()
    },
    {
        toUser: 'Biff',
        fromUser: 'Siopao',
        message: 'Hey Biff',
        dateTime: new Date()
    },
];
class Home extends Component {
    render() {
        return (
            <View>
                {messages.map(message => <Message {...message}/>)}
            </View>
        )
    }
}

export default Home;
