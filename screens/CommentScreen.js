import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    ActivityIndicator,
    Alert
} from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';

import firebase from '../firebase';
import CommentList from '../components/CommentList';

async function postComment(commentText, problemRef) {
    if (checkComment(commentText) == -1) {
        Alert.alert("Cannot post blank comment");
        return;
    }
    var uid = firebase.auth().currentUser.uid;
    var username = (await firebase.firestore().collection('users').doc(uid).get()).get('username');
    var currentCommentNum = (await problemRef.get()).get('numComments');
    try {
        await problemRef.collection('comments').add({
            username: username,
            commentText: commentText,
            date: new Date().toISOString().substring(0,10),
            time: new Date().toISOString().substring(11,19),
        })
        .then(() => {
            problemRef.update({
                numComments: (currentCommentNum + 1)
            })
        })
        .then(() => {
            console.log("Successfully posted comment")
        })
    }
    catch (error) {
        console.log(error.toString());
    }
}

function checkComment(commentText) {
    if (commentText.length == 0) {
        return -1;
    }
    return 0;
}

export default function CommentScreen({route, navigation}) {
    const [isLoading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentsExist, setCommentStatus] = useState(true);
    const [commentText, setCommentText] = useState('');

    const { betaVideo } = route.params;
    const { cardNavigation } = route.params;
    const { date } = route.params;
    const { description } = route.params;
    const { documentId } = route.params;
    const { grade } = route.params;
    const { gymName } = route.params;
    const { inappropriateFlag } = route.params;
    const { numComments } = route.params;
    const { outOfDateFlag } = route.params;
    const { problemName } = route.params;
    const { photo } = route.params;
    const { time } = route.params;
    const { user } = route.params;

    const problemRef = firebase.firestore().collection('problems').doc(documentId);
    const commentRef = firebase.firestore().collection('problems').doc(documentId).collection('comments');

    useEffect(() => {
        setLoading(true)
        if (numComments == 0) {
            setCommentStatus(false)
        }
        else {
            return commentRef.onSnapshot(querySnapshot => {
                const tempComments = [];
                querySnapshot.forEach(doc => {
                    const {
                        commentText,
                        date,
                        time,
                        username
                    } = doc.data();

                    tempComments.push({
                        commentInfo: {
                            commentText: commentText,
                            date: date,
                            time: time,
                            username: username,
                        },
                        key: doc.id
                    })
                })

                tempComments.sort(function (a, b) {
                    if (a.commentInfo.date > b.commentInfo.date) {
                        return 1;
                    }
                    else if (a.commentInfo.date == b.commentInfo.date) {
                        if (a.commentInfo.time > b.commentInfo.time) {
                            return 1;
                        }
                    }
                    else {
                        return -1;
                    }
                })
                setComments(tempComments);
                setCommentStatus(true);
                setLoading(false);
            })
        }
        setLoading(false)
    }, [])
    
    return (
        <View style = {styles.container}>
            <BackIcon
                name = 'ios-arrow-back'
                size = {50}
                style = {styles.backButton}
                onPress = {
                    () => navigation.goBack()
                }
            />
            
            {commentsExist ?
                <>
                    {isLoading ?
                        <>
                            <Text>Loading Comments...</Text>
                            <ActivityIndicator
                                size = 'large'
                            />
                        </>
                        :
                        <>
                            <CommentList 
                                comments = {comments}
                            />
                        </>
                    }
                </>
                :
                <>
                </>
            }

            <TextInput
                autoCapitalize = 'none'
                placeholder = 'Comment'
                style = {styles.textInput}
                onChangeText = {
                    (commentText) => setCommentText(commentText)
                }
                value = { commentText }
            />
            <Button
                title = "Post Comment"
                type = "clear"
                color = "#118AB2"
                onPress = {
                    () => postComment(commentText, problemRef)
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        flex: 1,
        backgroundColor: '#118AB2',
        //alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'white',
        alignSelf: 'center',
        borderWidth: 1,
        marginTop: 8
    },
    backButton: {
        paddingLeft: 15
    }
})