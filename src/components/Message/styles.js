import { StyleSheet, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const screenWidth = Dimensions.get('window').width;

export default EStyleSheet.create({
    message: {
        // width: screenWidth,
        backgroundColor: "rgb(255,255,255)",
        borderWidth: StyleSheet.hairlineWidth,
        padding: 15,
        marginHorizontal: 15,
        marginBottom: 15,
        borderColor: 'rgb(225,225,225)',
        borderRadius: 8,
    },
    topRow: {
        flexDirection: 'row',        
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    bottomRow: {
        flexDirection: 'row',        
    },
    topRowLeft: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center'
    },
    topRowRight: {
        justifyContent: 'flex-end',
    },
    image: {
        borderRadius: 50,
        height: 50,
        width: 50
    },
    username: {
        marginLeft: 8,
        fontSize: 18,
    },
    date: {
        color: "rgb(180,180,180)" 
    }
});