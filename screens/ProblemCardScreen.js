import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    Dimensions,
    ImageBackground
} from 'react-native';
import SaveIcon from 'react-native-vector-icons/AntDesign';
import CommentIcon from 'react-native-vector-icons/EvilIcons';
import BackIcon from 'react-native-vector-icons/Ionicons';

import firebase from '../firebase';

async function savePost(documentId) {
    var uid = firebase.auth().currentUser.uid;
    try {
        var userSnapShot = await firebase.firestore().collection('users').doc(uid).get();
        var saved = await userSnapShot.get('saved');
        if (saved == null) {
            var tempArray = [documentId];
            await firebase.firestore().collection('users').doc(uid).update({
                saved: tempArray
            })
        }
        else {
            await firebase.firestore().collection('users').doc(uid).update({
                saved: firebase.firestore.FieldValue.arrayUnion(documentId) 
            })
        }
        console.log("Successfully saved post")
    }
    catch (error) {
        console.log(error.toString());
    }
}

async function unsavePost(documentId) {
    var uid = firebase.auth().currentUser.uid;
    try {
        var userSnapShot = await firebase.firestore().collection('users').doc(uid).get();
        var saved = await userSnapShot.get('saved');
        if (saved == null) {
            console.log("Cannot remove from empty array");
            return;
        }
        else {
            await firebase.firestore().collection('users').doc(uid).update({
                saved: firebase.firestore.FieldValue.arrayRemove(documentId)
            })
        }
        console.log("Successfully unsaved post");
    }
    catch (error) {
        console.log(error.toString());
    }
}

export default function ProblemCardScreen({route, navigation}) {
    const [isLoading, setLoading] = useState(false);
    const [imageUri1, setImageUri1] = useState('');
    const [imageUri2, setImageUri2] = useState('');
    const [videoExists, setVideoStatus] = useState(false);
    const [videoUri, setVideoUri] = useState('');
    const [isSaved, setSaveStatus] = useState(false);

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

    var storage = firebase.storage();
    var imageRef1 = storage.ref('problemPhotos').child(user).child(problemName).child('1');
    var imageRef2 = storage.ref('problemPhotos').child(user).child(problemName).child('2');
    var videoRef;

    useEffect(() => {
        async function loadScreen() {
            setLoading(true)
            
            var uid = firebase.auth().currentUser.uid;
            var userSnapShot = await firebase.firestore().collection('users').doc(uid).get();
            var savedArray = await userSnapShot.get('saved');
            if (savedArray == null) {
                setSaveStatus(false)
            }
            else if (savedArray.includes(documentId)) {
                setSaveStatus(true)
            }
            else {
                setSaveStatus(false)
            }

            await imageRef1.getDownloadURL().then(data => {
                setImageUri1(data)
            })
            await imageRef2.getDownloadURL().then(data => {
                setImageUri2(data)
            })
            var isVideo = (await firebase.firestore().collection('problems').doc(documentId).get()).get('betaVideo');
            if (isVideo == 0) {
                setVideoStatus(false)
            }
            else {
                videoRef = storage.ref('problemVideos').child(user).child(problemName);
                // videoRef = storage.ref('problemVideos').child('laura').child('Cool Rocks');
                await videoRef.getDownloadURL().then(data => {
                    setVideoUri(data)
                })
                setVideoStatus(true)
                setLoading(false)
            }
            setLoading(false)
        }
        loadScreen()
    }, [])
    
    
    return (
        <View style = { styles.container }>
            <BackIcon
                name = 'ios-arrow-back'
                size = {50}
                style = {styles.backButton}
                onPress = {
                    () => navigation.goBack()
                }
            />
            {isLoading ?
                <>
                    <Text>Loading Post...</Text>
                    <ActivityIndicator
                        size = 'large'
                    />
                </>
                :
                <>
                    <View style = {styles.topContainer}>
                        <Text style = {styles.usernameText}>username: {user}</Text>
                        <Text style = {styles.problemNameText}>problem name: {problemName}</Text>
                        <Text style = {styles.gymNameText}>gym name: {gymName}</Text>
                        <Text style = {styles.gradeText}>grade: V{grade}</Text>
                    </View>
                    <View style = {styles.middleContainer}>
                        <ImageBackground style={styles.image} source={{uri:imageUri1}}>
                        <Image
                            style = {
                                styles.image
                            }
                            source = {{
                                uri: imageUri2,
                            }}
                        />
                        </ImageBackground>
                    </View>
                    <View>
                        <View style = {styles.saveCommentButtonView}>
                            {isSaved? 
                                <>
                                    <SaveIcon
                                        name = 'star'
                                        size = {40}
                                        style = {styles.saveButton}
                                        onPress = {
                                            () => {
                                                setSaveStatus(false)
                                                unsavePost(documentId)
                                            }
                                        }
                                    />
                                </>
                                :
                                <>
                                    <SaveIcon
                                        name = 'staro'
                                        size = {40}
                                        style = {styles.saveButton}
                                        onPress = {
                                            () => {
                                                setSaveStatus(true)
                                                savePost(documentId)
                                            }
                                        }
                                    />
                                </>
                            }
                            <CommentIcon
                                name = 'comment'
                                size = {50}
                                style = {styles.commentButton}
                                onPress = {
                                    () => navigation.navigate("CommentScreen", {
                                        betaVideo: betaVideo,
                                        cardNavigation: cardNavigation,
                                        date: date,
                                        description: description,
                                        documentId: documentId,
                                        grade: grade,
                                        gymName: gymName,
                                        inappropriateFlag: inappropriateFlag,
                                        numComments: numComments,
                                        outOfDateFlag: outOfDateFlag,
                                        problemName: problemName,
                                        photo: photo,
                                        time: time,
                                        user: user,
                                    })
                                }
                            />
                        </View>
                        
                        <Text style = {styles.descriptionText}>{user}: {description}</Text>
                        <Text style = {styles.dateTimeText}>Uploaded: {date} at {time}</Text>
                        {videoExists ?
                            <>
                                <SaveIcon
                                    name = 'videocamera'
                                    size = {50}
                                    style = {styles.videoButton}
                                    onPress = {
                                        () => navigation.navigate("VideoScreen", {
                                            videoUri: videoUri
                                        })
                                    }
                                />
                            </>
                            :
                            <></>
                        }
                    </View>
                    
                </>                
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#06D6A0',
        paddingTop: 24
    },

    topContainer: {
        justifyContent: 'flex-start'
    },
    middleContainer: {
        justifyContent: 'center'
    },
    bottomContainer: {
        justifyContent: 'flex-end'
    },
    image: {
        width: Dimensions.get('window').width,
        height: 500,
        resizeMode: 'contain',
        // resizeMode: 'cover',
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingLeft: 10
    },
    saveCommentButtonView: {
        flexDirection: 'row'
    },
    commentButton: {
        paddingLeft: 75
    },
    saveButton: {
        paddingLeft: 100
    },
    backButton: {
        paddingLeft: 15
    },
    usernameText: {
        fontSize: 30,
        color: '#073B4C',
        fontWeight: 'bold',
        paddingLeft: 10
    },
    problemNameText: {
        fontSize: 20,
        color: '#073B4C',
        fontWeight: 'bold',
        paddingLeft: 15
    },
    gymNameText: {
        fontSize: 16,
        color: '#073B4C',
        fontWeight: 'bold',
        paddingLeft: 15
    },
    gradeText: {
        fontSize: 16,
        color: '#073B4C',
        fontWeight: 'bold',
        paddingLeft: 15
    },
    dateTimeText: {
        fontSize: 16,
        color: '#073B4C',
        fontWeight: 'bold',
        paddingLeft: 10
    },
    videoButton: {
        paddingLeft: (Dimensions.get('window').width / 2) - 20
    }
})