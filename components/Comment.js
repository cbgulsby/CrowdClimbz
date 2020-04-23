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
            <View style = {styles.usernameContainer}>
                <Text style = {styles.usernameText}>
                    {props.commentInfo.username}: {props.commentInfo.date} at {props.commentInfo.time}
                </Text>
            </View>
            <View style = {styles.commentTextContainer}>
                <Text style = {styles.commentText}>
                    {props.commentInfo.commentText}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#06D6A0',
        borderWidth: 2,
        borderColor: 'black',
        margin: 3,
        height: 100,
        width: screenWidth,
        //alignSelf: 'center',
        borderRadius: 5
    },
    usernameContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingLeft: 5
    },
    commentTextContainer: {
        flex: 3,
        justifyContent: 'flex-start',
        paddingLeft: 5
    },
    usernameText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#073B4C',
    },
    commentText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#073B4C',
    },
})