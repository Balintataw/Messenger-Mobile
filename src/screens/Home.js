import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';

import { Message } from '../components/Message';

import config from '../config';
import styles from './styles';

class Home extends Component {
    state = {
        showLoading: true,
        messages: []
    };
    componentDidMount = () => {
        axios.get(`${config.BASE_URL}/api/message`, {
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(resp => {
                console.log(resp.data.data)
                this.setState({ 
                    messages: resp.data.data,
                    showLoading: false
                 })
            })
            .catch(err => {
                console.log(err)
                this.setState({ showLoading: false })
            })
    }
    render() {
        const { messages } = this.state
        return (
            <View style={styles.container}>
                {(this.state.showLoading) ? <ActivityIndicator animating size="large"/> : null }
                {messages.map((message, i) => {
                    const last = i == (messages.length - 1);
                    return <Message key={i} last={last} {...message}/>
                })}
            </View>
        )
    }
}

export default Home;
