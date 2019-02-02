import React from 'react';
import { View, Text, TouchableHighlight, TextInput } from 'react-native';
import color from 'color';

import styles from './styles';

const InputWithButton = (props) => {
    const underlayColor = color(styles.$buttonBackgroundColorBase).darken(styles.$buttonBackgroundColorModifier);
    const containerStyles = [styles.container];
    const buttonTextStyles = [styles.buttonText]
    if (props.editable === false) {
        containerStyles.push(styles.containerDisabled)
    }
    if (props.textColor) {
        buttonTextStyles.push({ color: props.textColor });
    };
    return (
        <View style={containerStyles}>
            <TextInput>Input</TextInput>
            {/* <TouchableHighlight onPress={props.onPress} style={styles.buttonContainer} underlayColor={underlayColor}>
                <Text style={buttonTextStyles}>{props.buttonText}</Text>
            </TouchableHighlight>
            <View style={styles.border} />
            <TextInput style={styles.input} {...props} underlineColorAndroid="transparent" /> */}
        </View>
    )
}

export default InputWithButton;
