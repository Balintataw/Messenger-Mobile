import React from 'react';
import { View, Text } from 'react-native';

const Message = props => {
    return (
        <View>
            <Text>
                {props.message}
            </Text>
        </View>
    )
};

export default Message;