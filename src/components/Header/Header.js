import React from 'react';
import { View, Text } from 'react-native';

import { Logout } from '../Logout';

import styles from './styles';

class Header extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.title}</Text>
                <Logout title={this.props.title}/>
            </View>
        );
    }
}

export default Header;