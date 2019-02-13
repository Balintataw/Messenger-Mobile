import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, AsyncStorage, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Config from 'react-native-config';
import axios from 'axios';

import { Message } from '../components/Message';
import NewMessage from './NewMessage';
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
        try {
            const user = await Auth.currentAuthenticatedUser();
            this.setState({s3ImageKey: user.attributes.picture});
            let user_id = user.attributes.sub;
            const messages = await axios.post(`${Config.BASE_URL}/api/get_messages`, { user_id: user_id });
            console.log("MESSAGES", messages.data.data)
            this.setState({ messages: messages.data.data });
        } catch (err) {
            alert(err);
            console.log(err);
        } finally {
            this.setState({ showLoading: false });
        }
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
                            source={{uri:this.state.s3ImageKey}} />
                        <FlatList 
                            data={messages}
                            keyExtractor={item => item._id+'jd'} 
                            renderItem={({item}) => <Message {...item}/>}
                            ListEmptyComponent={<NewMessage />}
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
