import React from 'react';
import { View, AsyncStorage } from 'react-native';

import { Logout } from '../Logout';

import styles from './styles';

class Header extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Logout title={this.props.title}/>
            </View>
        );
    }
}

export default Header;