import React, { Fragment } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';

import { setUser } from '../actions/users';
import config from '../config';
import styles from './styles';

class Authentication extends React.Component {
    state = {
        username: '', 
        password: '', 
        user: {}, 
        authenticationCode: '', 
        showConfirmationForm: false
    }
    componentDidMount = async () => {
        // const token = await AsyncStorage.getItem(config.USER_TOKEN)
        // alert('still got ya ' + token) 
    }
    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }
    signIn = async () => {
        const { username, password } = this.state
        try {
            const user = await Auth.signIn(username, password)
            console.log('user successfully signed in!', user)
            const sessionUser = await Auth.currentUserInfo();
            this.props.setUser(sessionUser);
            await AsyncStorage.setItem(config.USER_TOKEN, user.signInUserSession.accessToken.jwtToken)
            // const token = await AsyncStorage.getItem(config.USER_TOKEN)
            this.props.navigation.navigate('Home');
        // why require confirmation on signIn?
        // so redirect instead of confirm here
        // this.setState({ user, showConfirmationForm: true })
        } catch (err) {
            alert("Sorry: \n" + err)
            console.log('error:', err)
        }  
    }
    confirmSignIn = async () => {
        const { user, authenticationCode } = this.state
            try {
                await Auth.confirmSignIn(user, authenticationCode)
                console.log('user successfully signed in!', user)
                //redirect here
            } catch (err) {
                console.log('error:', err)
        }
    }
    render() {
    return (
        <View style={styles.container}>
            <Text style={styles.appName}>Sugo</Text>
            {
            !this.state.showConfirmationForm && (
                <Fragment>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor='$primary'
                    onChangeText={val => this.onChangeText('username', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    autoCapitalize="none"
                    secureTextEntry={true}
                    placeholderTextColor='$primary'
                    onChangeText={val => this.onChangeText('password', val)}
                />
                <View style={styles.loginButtonsWrapper}>
                    <TouchableOpacity onPress={this.signIn} >
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp', { title: 'Sign Up'})}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                </Fragment>
            )
            }
            {
            this.state.showConfirmationForm && (
                <Fragment>
                <TextInput
                    style={styles.input}
                    placeholder='Authentication Code'
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('authenticationCode', val)}
                />
                <Button
                    title='Confirm Sign In'
                    onPress={this.confirmSignIn}
                />
                </Fragment>
            )
            }        
        </View>
        )
    }
};

const mapDispatchToProps = {
    setUser
}

export default connect(null, mapDispatchToProps)(Authentication);