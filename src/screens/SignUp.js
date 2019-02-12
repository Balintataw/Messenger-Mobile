import React, { Fragment } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Image,
  Platform,
  CameraRoll,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
// import Buffer from 'buffer'; // for rnFetchBlob
import * as mime from 'react-native-mime-types';
import { RNCamera } from 'react-native-camera';
import Config from 'react-native-config';
var Buffer = require('buffer/').Buffer

import { Auth, Storage } from 'aws-amplify';

import styles from './styles';

import axios from 'axios';

const initialState = {
  username: '', password: '', email: '', phone_number: '', authenticationCode: '', showConfirmationForm: false, photo: null
}

class SignUp extends React.Component {
    state = initialState;
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }
    readFile(filePath) {
        return RNFetchBlob.fs.readFile(filePath, 'base64').then(data => new Buffer(data, 'base64'));
    }

    handleChangePhoto = async () => {
        const options = {
            // allowsEditing: true,
            // aspect: [4, 3],
        }
        ImagePicker.launchImageLibrary(options, response => {            
            if(response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker error: ', response.error);
            }
            else {
                this.setState({ photo: response })
            }
        })
    }
    putFileInS3 = (filePath, fileName) => {  
        this.readFile(filePath).then(buffer => {
            Storage.put(fileName, buffer, { level: 'public', contentType: 'image/png' })
                .then((resp) => {console.log('successfully saved to bucket', resp);})
                .catch(e => { console.log(e);});
        })
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
        const { username, authenticationCode, password, email, photo } = this.state
        try {
            await Auth.confirmSignUp(username, authenticationCode) // AWS confirm code
            const user = await Auth.signIn(username, password) // AWS sign in
            console.log('user successfully signed in!', user)
            const sessionUser = await Auth.currentUserInfo(); // retrieve user id from AWS session

            // this.putFileInS3(this.state.photo.path, this.state.photo.fileName)
            // this.readFile(this.state.photo.path).then(buffer => {
            //     Storage.put(this.state.photo.fileName, buffer, { level: 'public', contentType: 'image/png' })
            //         .then((resp) => {console.log('successfully saved to bucket', resp);})
            //         .catch(e => { console.log(e);});
            // })
            const buffer = await this.readFile(this.state.photo.path);
            const uploadResponse = Storage.put(this.state.photo.fileName, buffer, { level: 'public', contentType: 'image/png' });
            console.log('successfully saved to bucket', uploadResponse);
            
            // add s3 response url to create user
            await axios.post(`${Config.BASE_URL}/create_user`, 
            {username, email, user_id:sessionUser.id }); // throw it to sqlite3

            // const image = await Storage.put('example.png', this.createFormData(photo), { contentType: 'image/png' })
            // console.log("IMAGE SUCCESS", image)

            await AsyncStorage.setItem('user_id', sessionUser.id); // store user id probably not needed pending persistent redux setup
            await AsyncStorage.setItem(Config.USER_TOKEN, user.signInUserSession.accessToken.jwtToken)
            alert('User signed up successfully!')
            this.setState({ ...initialState }); // clear state
            this.props.navigation.navigate('Home'); // bail out
        } catch (err) {
            alert('error confirming signing up: \n' + err.message)
        }
    }
    
    render() {
        const { photo } = this.state;
        return (
        // <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.container}>
            {
            !this.state.showConfirmationForm && (
                <Fragment>
                    {photo && (
                        <Image
                            source={{ uri: photo.uri }}
                            style={{ width: 100, height: 100, borderRadius: 50 }}
                        />
                    )}
                    <TouchableOpacity onPress={this.handleChangePhoto}>
                        <View>
                            <Text style={styles.buttonText}>Choose Photo</Text>
                        </View>
                    </TouchableOpacity>
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
        {/* </KeyboardAvoidingView> */}
        </View>
        )
    }
};

export default SignUp;