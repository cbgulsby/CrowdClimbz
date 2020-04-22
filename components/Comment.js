import React from 'react';
import {
    View,
    Text, 
    StyleSheet,
    Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width - 10;

export default function TempComment(props) {
    return (
        <View style = {styles.container}>
            <Text>{props.commentInfo.username}</Text>
            <Text>{props.commentInfo.date}</Text>
            <Text>{props.commentInfo.time}</Text>
            <Text>{props.commentInfo.commentText}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#06D6A0',
        borderWidth: 2,
        borderColor: 'black',
        margin: 3,
        height: 100,
        width: screenWidth,
        alignSelf: 'center',
        borderRadius: 5
    }
})