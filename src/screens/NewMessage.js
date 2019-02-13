import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { API } from 'aws-amplify';

class NewMessage extends Component {
    state = {
        messageContent: '',
        apiResponse: null,
        messageId: ''
    }
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }
    saveMessage = async() => {
        let newMessage = {
            body: {
                "SentTo": "Biff",
                "SentFrom": "Me",
                "Content": "This is so cool!",
                "Id": this.state.noteId
            }
        }
        const path = "/messages";
    
        // Use the API module to save the note to the database
        try {
            console.log("API", API)
          const apiResponse = await API.put("messengerREST", path, newMessage)
          console.log("response from saving note: " + apiResponse);
          this.setState({apiResponse});
        } catch (e) {
          console.log(e);
        }
    }
    render() {
        return (
        <View style={styles.container}>
            <Text>Response: {this.state.apiResponse && JSON.stringify(this.state.apiResponse)}</Text>
            <Button title="Save Message" onPress={this.saveMessage} />
            {/* <Button title="Get Note" onPress={this.getNote.bind(this)} /> */}
            {/* <Button title="Delete Note" onPress={this.deleteNote.bind(this)} /> */}
            <TextInput style={styles.textInput} autoCapitalize='none' onChangeText={val => this.onChangeText('messageContent', val)} />
        </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInput: {
        margin: 15,
        height: 30,
        width: 200,
        borderWidth: 1,
        color: 'green',
        fontSize: 20,
        backgroundColor: 'black'
     }
});

export default NewMessage;