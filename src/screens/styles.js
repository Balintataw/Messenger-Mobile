import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default EStyleSheet.create({
    container: {
        // height: 100+'%',
        width: screenWidth,
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: screenWidth / 1.2,
        fontSize: 18,
        fontWeight: '500',
        height: 55,
        backgroundColor: '$primary',
        margin: 10,
        color: 'white',
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
        padding: 14,
        margin: 4
    }
})