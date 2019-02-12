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
import { RNCamera } from 'react-native-camera';
import Config from 'react-native-config';
var Buffer = require('buffer/').Buffer

import { Auth, Storage } from 'aws-amplify';

import styles from './styles';

import axios from 'axios';

const initialState = {
    username: '',
    name: '',
    password: '', 
    email: '', 
    address: '', 
    phone_number: '', 
    authenticationCode: '', 
    showConfirmationForm: false, 
    picture: null
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
                this.setState({ picture: response })
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
        let { username, password, email, address, phone_number, name, picture } = this.state;
        if (!picture) {
            // pic can't be uploaded with null value, requireing for now
            alert("Image Required")
            return
        } else {
            // upload image and return key to add to user creation            
            const buffer = await this.readFile(picture.path);
            Storage.put(picture.fileName, buffer, { level: 'public', contentType: 'image/png' })
            .then(resp => {
                console.log('successfully saved to bucket', resp);
                picture = `${Config.AWS_BUCKET_BASE_URL}${resp.key}`;
                console.log("PICTURE", picture)
                    // create user in pool
                return Auth.signUp({ 
                        username, 
                        password, 
                        attributes: { 
                            name, 
                            picture,
                            phone_number,
                            address, 
                            email,
                            updated_at: Math.floor(Date.now()).toString()
                        }
                    })
            })
            .then(success => {
                console.log('user successfully signed up!: ', success);
                this.setState({ showConfirmationForm: true });
            })
            .catch(err => {
                console.log('error signing up: ', err);
            })
        } 
    }
    confirmSignUp = async () => {
        const { username, authenticationCode, password, email, photo } = this.state
        try {
            await Auth.confirmSignUp(username, authenticationCode) // AWS confirm code
            const user = await Auth.signIn(username, password) // AWS sign in
            console.log('user successfully signed in!', user)
            const sessionUser = await Auth.currentAuthenticatedUser() // retrieve user id from AWS session
            console.log("SESSION_USER ID", sessionUser)

            // TODO remove sqlite in place of rds or something amazon
            // add s3 response url to create user
            await axios.post(`${Config.BASE_URL}/create_user`, 
            {username, email, user_id:sessionUser.id }); // throw it to sqlite3

            await AsyncStorage.setItem('user_id', sessionUser.attributes.sub); // store user id probably not needed pending persistent redux setup
            // await AsyncStorage.setItem(Config.USER_TOKEN, user.signInUserSession.accessToken.jwtToken)
            alert('Signed up successfully!')
            this.setState({ ...initialState }); // clear state
            this.props.navigation.navigate('Home'); // bail out
        } catch (err) {
            alert('error confirming signing up: \n' + err.message)
        }
    }
    
    render() {
        const { picture } = this.state;
        return (
        // <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.container}>
            {
            !this.state.showConfirmationForm && (
                <Fragment>
                    {picture && (
                        <Image
                            source={{ uri: picture.uri }}
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