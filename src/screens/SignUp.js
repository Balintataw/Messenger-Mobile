import React, { Fragment } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Auth } from 'aws-amplify';
import config from '../config';
import styles from './styles';

import axios from 'axios';

const initialState = {
  username: '', password: '', email: '', phone_number: '', authenticationCode: '', showConfirmationForm: false
}

class SignUp extends React.Component {
    state = initialState;
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }
    signUp = async () => {
        const { username, password, email } = this.state;
        try {
            const success = await Auth.signUp({ username, password, attributes: { email }});
            console.log('user successfully signed up!: ', success);
            this.setState({ showConfirmationForm: true });
        } catch (err) {
            console.log('error signing up: ', err);
        } 
    }
    confirmSignUp = async () => {
        const { username, authenticationCode, password, email } = this.state
        try {
            await Auth.confirmSignUp(username, authenticationCode) // AWS confirm code
            const user = await Auth.signIn(username, password) // AWS sign in
            console.log('user successfully signed in!', user)
            const sessionUser = await Auth.currentUserInfo(); // retrieve user id from AWS session
            console.log("SESSIONUSER", sessionUser)
            await axios.post(`${config.BASE_URL}/create_user`, {username, email, user_id:sessionUser.id}); // throw it to sqlite3
            await AsyncStorage.setItem('user_id', sessionUser.id); // store user id probably not needed pending persistent redux setup
            alert('User signed up successfully!')
            this.setState({ ...initialState }); // clear state
            this.props.navigation.navigate('Home'); // bail out
        } catch (err) {
            alert('error confirming signing up: \n' + err)
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
                        placeholderTextColor={EStyleSheet.value('$primary')}   
                        onChangeText={val => this.onChangeText('username', val)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        secureTextEntry={true}
                        autoCapitalize="none"
                        placeholderTextColor={EStyleSheet.value('$primary')}   
                        onChangeText={val => this.onChangeText('password', val)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        autoCapitalize="none"
                        placeholderTextColor={EStyleSheet.value('$primary')}   
                        onChangeText={val => this.onChangeText('email', val)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Phone Number'
                        autoCapitalize="none"
                        placeholderTextColor={EStyleSheet.value('$primary')}   
                        onChangeText={val => this.onChangeText('phone_number', val)}
                    />
                    <TouchableOpacity onPress={this.signUp}>
                        <View>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </View>
                    </TouchableOpacity>
                </Fragment>
            )
            }
            {
            this.state.showConfirmationForm && (
                <Fragment>
                    <TextInput
                        style={styles.input}
                        placeholder='Authentication code'
                        autoCapitalize="none"
                        placeholderTextColor={EStyleSheet.value('$primary')}   
                        onChangeText={val => this.onChangeText('authenticationCode', val)}
                    />
                    <TouchableOpacity onPress={this.confirmSignUp}>
                        <View>
                            <Text style={styles.buttonText}>Confirm Sign Up</Text>
                        </View>
                    </TouchableOpacity>
                </Fragment>
            )
            }
        </View>
        )
    }
};

export default SignUp;