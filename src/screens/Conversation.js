import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Config from 'react-native-config';

import { Message } from '../components/Message';

import styles from './styles';

import axios from 'axios';

class Conversation extends React.Component {
    state = {
        showLoading: true,
        messages: []
    };
    componentDidMount = async () => {
        const user = this.props.navigation.getParam('sent_from');
        try {
            const messages = await axios.post(`${Config.BASE_URL}/api/get_conversation`, {user_id:this.props.user.id, talking_to_id:user});
            console.log("M", messages)
            this.setState({ 
                messages:messages.data.data,
                showLoading: false
            })
        } catch (err) {
            console.error(err)
        }
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
            </View>        
        )
    }
};

const mapStateToProps = state => {
    console.log("STATE", state.user)
    return {
        user: state.user.user
    }
};

export default connect(mapStateToProps)(Conversation);