import { StatusBar } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from '../screens/Home';
import Auth from '../screens/Auth';
import SignUp from '../screens/SignUp';

const HomeStack = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                header: () => null
            }
        },
        // Options: {
        //     screen: Options,
        //     navigationOptions: ({ navigation }) => ({
        //         headerTitle: navigation.state.params.title
        //     }),
        // },
        // Themes: {
        //     screen: Themes,
        //     navigationOptions: ({ navigation }) => ({
        //         headerTitle: navigation.state.params.title
        //     }),
        // }
    }, 
    {
//        mode: 'modal',
//        cardStyle: { paddingTop: StatusBar.currentHeight }
        headerMode: 'screen',
        defaultNavigationOptions: {
            headerTitleStyle: {
                flex: 1,
                textAlign: 'left'
            },
            headerStyle: {
//                backgroundColor: '#F4511E'
            }
        }
    }
)

const AuthStack = createStackNavigator(
    {
        Auth: {
            screen: Auth,
            navigationOptions: ({ navigation }) => ({
                headerTitle: 'Login/Sign Up'
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
            headerMode: 'none',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'left'
            },
        }
    }
)

const AppNavigator = createStackNavigator(
    {
        Auth: {
            screen: AuthStack,
        },
        Home: {
            screen: HomeStack,
        },
    }, 
    {
        mode: 'modal',
        headerMode: 'none',
//        cardStyle: { paddingTop: StatusBar.currentHeight },
        defaultNavigationOptions: {
            headerTitleStyle: {
                flex: 1,
                textAlign: 'left'
            },
            headerStyle: {
//                backgroundColor: '#F4511E'
            }
        }
    }
);

export default createAppContainer(AppNavigator);
