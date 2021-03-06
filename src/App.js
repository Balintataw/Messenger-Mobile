import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import EStyleSheet from 'react-native-extended-stylesheet';
import AWSAppSyncClient from "aws-appsync";
import { graphql, ApolloProvider, compose } from 'react-apollo';

import Config from 'react-native-config';
import appSyncConfig from './aws-exports';

import Navigator from './routes/routes';

import { store, persistor } from './store';

import Amplify, { Analytics, Storage } from 'aws-amplify';

Amplify.configure({
    Auth: {
        identityPoolId: Config.AWS_IDENTITY_POOL_ID,
        region: Config.AWS_REGION,
        userPoolId: Config.AWS_USER_POOL_ID,
        userPoolWebClientId: Config.AWS_USER_POOL_WEB_CLIENT_ID,
    },
    Storage: {
        AWSS3: {
            bucket: Config.AWS_BUCKET,
            region: Config.AWS_REGION
        }
    }
})

const appSyncClient = new AWSAppSyncClient({
    url: appSyncConfig.aws_appsync_graphqlEndpoint,
    region: appSyncConfig.aws_appsync_region,
    auth: {
      type: appSyncConfig.aws_appsync_authenticationType,
      apiKey: appSyncConfig.aws_appsync_apiKey,
    }
})

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
            <ApolloProvider client={appSyncClient}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <Navigator onNavigationStateChange={null} />
                    </PersistGate>
                </Provider>
            </ApolloProvider>
        )
    }
}
 export default App;