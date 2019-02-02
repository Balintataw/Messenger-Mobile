import React, { Component } from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Home, Login, SignUp } from './screens';
import Navigator from './routes/routes';

import { styles } from './screens'

import Amplify from 'aws-amplify'
import AWSconfig from './aws-exports'
Amplify.configure(AWSconfig)

EStyleSheet.build({
    $primary: '#4F6D7A',
    $primaryOrange: '#D57A66',
    $primaryGreen: '#00BD9D',
    $primaryPurple: '#95768F',
    $primaryText: '#FFF',
    $darkText: '#343434',
    $border: '#E2E2E2',
    $inputText: '#797979',
    $disabled: '#F0F0F0',
})

class App extends Component {
    render() {
        return (
            <Navigator onNavigationStateChange={null} />
        )
    }
}
 export default App;