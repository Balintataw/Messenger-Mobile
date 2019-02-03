import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default EStyleSheet.create({
    splashScreen: {
        width: screenWidth,
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '$primary'
    },
    container: {
        // height: 100+'%',
        width: screenWidth,
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listContainer: {
        // height: 100+'%',
        width: screenWidth,
        display: 'flex',
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    appName: {
        fontSize: 36,
        color: '$primary',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    input: {
        width: screenWidth / 1.2,
        fontSize: 18,
        fontWeight: '500',
        height: 55,
        borderColor: '$primary',
        borderWidth: 1,
        margin: 10,
        color: '$primary',
        padding: 8,
        borderRadius: 14
    },
    loginButtonsWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 14,
        color: '$primary',
        borderWidth: 1,
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 8,
        margin: 4
    }
})