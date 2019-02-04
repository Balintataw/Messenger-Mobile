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
    },
    bottomRow: {
        flexDirection: 'row',        
    }

});