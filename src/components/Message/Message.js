import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

import moment from 'moment';

import styles from './styles'

class Message extends React.Component {
    render() {
        return (
            <TouchableOpacity 
                activeOpacity={0.7} 
                onPress={() => this.props.navigation.navigate('Conversation',{title: this.props.sent_from, sent_from: this.props.sent_from})} 
                style={styles.message}>
                <View>
                    <View style={styles.topRow}>
                        <View style={styles.topRowLeft}>
                            <Image style={styles.image} source={{uri:'http://placekitten.com/g/200/200'}} />
                            <Text style={styles.username}>{this.props.sent_from}</Text>
                        </View>
                        <View style={styles.topRowRight}>
                            <Text style={styles.date}>{moment(this.props.created_at).fromNow()}</Text>
                        </View>
                    </View>
                    <View style={styles.bottomRow}>
                        <Text>{this.props.content}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
};

export default withNavigation(Message);