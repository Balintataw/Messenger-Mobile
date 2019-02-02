import React, { Fragment } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native'
import { Auth } from 'aws-amplify';

import config from '../config';
import styles from './styles';

export default class SignIn extends React.Component {
    state = {
        username: '', 
        password: '', 
        user: {}, 
        authenticationCode: '', 
        showConfirmationForm: false
    }
    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }
    signIn = async () => {
        const { username, password } = this.state
        try {
            const user = await Auth.signIn(username, password)
            console.log('user successfully signed in!', user)
            return AsyncStorage.setItem(config.USER_TOKEN, user.signInUserSession.accessToken.jwtToken)
       // why require confirmation on signIn?
       // so redirect instead of confirm here
    //    this.setState({ user, showConfirmationForm: true })
        } catch (err) {
            alert("Sorry: \n" + err)
            console.log('error:', err)
        } finally {
            const token = await AsyncStorage.getItem(config.USER_TOKEN)
            console.log('token', token) 
            this.props.navigation.navigate('Home');
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
            {
            !this.state.showConfirmationForm && (
                <Fragment>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('username', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    autoCapitalize="none"
                    secureTextEntry={true}
                    placeholderTextColor='white'
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
}