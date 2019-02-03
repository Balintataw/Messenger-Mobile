import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
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
        console.log('USER', this.props.user)
        axios.post(`${config.BASE_URL}/api/get_messages`, { user: this.props.user })
            .then(resp => {
                // console.log(resp.data.data)
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
            <View style={styles.listContainer}>
                {(this.state.showLoading) ? <ActivityIndicator animating size="large"/> : null }
                {messages.length > 0 ? 
                    messages.map((message, i) => {
                        const last = i == (messages.length - 1);
                        return <Message key={i} last={last} {...message}/>
                    }) : <Text>No Messages</Text>
                }
            </View>
        )
    }
}

const mapStateToProps = state => {
    // console.log('STATE HOME', state)
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps)(Home);
