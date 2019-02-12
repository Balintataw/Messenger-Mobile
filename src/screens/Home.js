import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, AsyncStorage, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Config from 'react-native-config';
import axios from 'axios';

import { Message } from '../components/Message';
import { CameraRoll }  from '../components/Camera';
import { Auth, Storage } from 'aws-amplify';
import { S3Image, S3Album } from 'aws-amplify-react-native';


import styles from './styles';

class Home extends Component {
    state = {
        showLoading: true,
        messages: [],
        s3ImageKey: ''
    };
    componentDidMount = async () => {
        Storage.get('https://s3-us-west-2.amazonaws.com/messagingpp-20190202095441-deployment/public/biff.jpg', { level: 'protected' })
            .then(result => {
                this.setState({s3ImageKey: result})
                console.log("FOUND IMAGE", this.state.s3ImageKey)
            })
            .catch(err => console.log(err));

        // const credentials = await Auth.currentCredentials();
        // console.log("CREDS", credentials)
        AsyncStorage.getItem('user_id')
            .then(id => {
                return axios.post(`${Config.BASE_URL}/api/get_messages`, { user_id: id })
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
                {(this.state.showLoading) ? 
                    <ActivityIndicator animating size="large"/> : 
                    <View style={styles.listContainer}>
                        <Image 
                            style={{height:30, width:30}} 
                            source={{uri:"https://s3-us-west-2.amazonaws.com/messagingpp-20190202095441-deployment/public/biff.jpg"}} />
                        <Image 
                            style={{height:30, width:30}} 
                            source={{uri:this.state.s3ImageKey}} />
                        <FlatList 
                            data={messages}
                            keyExtractor={item => item._id+'jd'} 
                            renderItem={({item}) => <Message {...item}/>}
                            ListEmptyComponent={<Text>No Messages</Text>}
                        />
                    </View>
                }
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
