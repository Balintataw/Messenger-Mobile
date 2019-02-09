import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import axios from 'axios';

class Conversation extends React.Component {
    componentDidMount = () => {
        // console.log(this.props.navigation.state.params)
        const user = this.props.navigation.getParam('sent_from');
        alert(user);
        axios.post('api/get_conversation', {user_id:this.props.user._id, talking_to_id:user})
        .then(resp => {
            console.log('RESP', resp)
        })
    };
    render() {
        return (
            <Text>Here</Text>
        )
    }
};

const mapStateToProps = state => {
    console.log("STATE", state.user)
    return {
        user: state.user.user,
    }
};

export default connect(mapStateToProps)(Conversation);