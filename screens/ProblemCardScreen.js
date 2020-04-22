import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
} from 'react-native';
import SaveIcon from 'react-native-vector-icons/AntDesign';
import CommentIcon from 'react-native-vector-icons/EvilIcons';
import BackIcon from 'react-native-vector-icons/Ionicons';

import firebase from '../firebase';

async function getImageUri(imageRef) {
    var temp = await imageRef.getDownloadURL().then(console.log("Hi"));
    return temp;
}

export default function ProblemCardScreen({route, navigation}) {
    const [isLoading, setLoading] = useState(false);
    const [imageUri, setImageUri] = useState('');

    const { betaVideo } = route.params;
    const { cardNavigation } = route.params;
    const { date } = route.params;
    const { description } = route.params;
    const { grade } = route.params;
    const { gymName } = route.params;
    const { inappropriateFlag } = route.params;
    const { outOfDateFlag } = route.params;
    const { problemName } = route.params;
    const { photo } = route.params;
    const { time } = route.params;
    const { user } = route.params;

    var storage = firebase.storage();
    var imageRef = storage.ref('problemPhotos').child(user).child(problemName);
    
    useEffect(() => {
        async function loadScreen() {
            setLoading(true)
            await imageRef.getDownloadURL().then(data => {
                setImageUri(data)
            })
            setLoading(false)
        }
        loadScreen()
    }, [])
    
    
    return (
        <View style = { styles.container }>
            {isLoading ?
                <>
                    <BackIcon
                        name = 'ios-arrow-back'
                    />
                    <Text>Loading Post...</Text>
                    <ActivityIndicator
                        size = 'large'
                    />
                </>
                :
                <>
                    <BackIcon
                        name = 'ios-arrow-back'
                        onPress = {
                            () => navigation.goBack()
                        }
                    />
                    <Text>username: {user}</Text>
                    <Text>problem name: {problemName}</Text>
                    <Text>gym name: {gymName}</Text>
                    <Text>grade: V{grade}</Text>
                    <Image
                        style = {
                            styles.image
                        }
                        source = {{
                            uri: imageUri,
                        }}
                    />
                    <SaveIcon
                        name = 'staro'
                    />
                    <SaveIcon
                        name = 'star'
                    />
                    <CommentIcon
                        name = 'comment'
                        onPress = {
                            () => navigation.navigate("CommentScreen")
                        }
                    />
                    <Text>description: {description}</Text>
                    <Text>time and date: {date} at {time}</Text>
                </>                
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain'
    }
})