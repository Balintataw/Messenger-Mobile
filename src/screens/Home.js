import React, { Component } from 'react';
import { View, Text, ActivityIndicator, AsyncStorage, FlatList } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

import { Message } from '../components/Message';
import { CameraRoll }  from '../components/Camera';

import config from '../config';
import styles from './styles';

class Home extends Component {
    state = {
        showLoading: true,
        messages: []
    };
    componentDidMount = () => {
        AsyncStorage.getItem('user_id')
            .then(id => {
                return axios.post(`${config.BASE_URL}/api/get_messages`, { user_id: id })
            })
            .then(resp => {
                console.log("RESULT", resp.data)
                this.setState({ 
                    messages: resp.data.data,
                    showLoading: false
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({ showLoading: false })
            })
    };
    render() {
        const { messages } = this.state
        return (
            <View style={styles.listContainer}>
                {(this.state.showLoading) ? <ActivityIndicator animating size="large"/> : 
                <FlatList 
                    data={messages}
                    keyExtractor={item => item._id+'jd'} 
                    renderItem={({item}) => <Message {...item}/>}
                    ListEmptyComponent={<Text>No Messages</Text>}
                />}
                {/* Camera loads properly, need button activation and link to aws s3 shit currently in Auth.js mount hook */}
                {/* <CameraRoll /> */}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps)(Home);
