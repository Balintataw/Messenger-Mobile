import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import SignUp            from '../screens/SignUp';
import Home              from '../screens/Home';
import Auth              from '../screens/Auth';

import { Header } from '../components/Header';

import config from '../config';

const AppStack = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: ({navigation}) => ({
                // header: () => null,
                    // headerTitle: navigation.state.params.title
                // headerTitle: 'Home'
                headerTitle: <Header title="Logout" />,
            })
        },
    }, 
    {
        mode: 'modal',
        // cardStyle: { paddingTop: StatusBar.currentHeight },
        // headerMode: 'screen',
        defaultNavigationOptions: {
        //     headerTitleStyle: {
        //         flex: 1,
        //         textAlign: 'left'
        //     },
            headerStyle: {
               backgroundColor: '#F4511E',
        //        marginTop: StatusBar.currentHeight
            }
        }
    }
)

const AuthStack = createStackNavigator(
    {
        Auth: {
            screen: Auth,
            navigationOptions: ({ navigation }) => ({
                headerTitle: <Header title="Welcome" />,
            }),
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: ({ navigation }) => ({
                headerTitle: navigation.state.params.title
            }),
        }
    },
    {
        defaultNavigationOptions: {
            mode: 'modal',
            // headerMode: 'none',
            headerStyle: {
               backgroundColor: '#F4511E',
            }
        }
    }
)

const AppNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        Auth: {
            screen: AuthStack,
        },
        App: {
            screen: AppStack,
        },
    }, 
    {
        mode: 'modal',
        // headerMode: 'none',
        initialRouteName: 'AuthLoading',
        // cardStyle: { paddingTop: StatusBar.currentHeight },
        defaultNavigationOptions: {
            headerTitleStyle: {
                flex: 1,
                // textAlign: 'left'
            },
            headerStyle: {
               backgroundColor: '#F4511E',
            }
        }
    }
);

export default createAppContainer(AppNavigator);
