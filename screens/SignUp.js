import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Button, 
    TextInput 
} from 'react-native';
import firebase from '../firebase';

// firebase.initializeApp({
// 	apiKey: "AIzaSyDfOuH54N5dKv5zqVZ3CylTZpn7y2eC9GI",
//   	authDomain: "crowdclimbz.firebaseapp.com",
//   	databaseURL: "https://crowdclimbz.firebaseio.com",
//   	projectId: "crowdclimbz",
//   	storageBucket: "crowdclimbz.appspot.com",
//   	messagingSenderId: "760059550596",
//   	appId: "1:760059550596:web:a88049a666755ee2ec1bd1",
//   	measurementId: "G-3RRKPJLYNG"
// });



async function signup(email, pass, navigation) {
    var db = firebase.firestore();
    var auth = firebase.auth();
    try {
        await auth.createUserWithEmailAndPassword(email, pass)
            .then(() => {
                var newUser = auth.currentUser;
                auth.onAuthStateChanged(newUser => {
                    auth.onAuthStateChanged(newUser => {
                        if (newUser) {
                            db.collection('users')
                            .doc(newUser.uid)
                            .set({
                                id: newUser.uid,
                                email: email
                            })
                        }
                    })
                })
                newUser.sendEmailVerification();
            })
            .then(() => {
                navigation.navigate('SideMenu')
                console.log("Account created")
            })
    }
    catch (error) {
        console.log(error.toString());
    }
}

export default function SignUp({navigation}){

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return(
        <View style = { styles.container }>
            <Text>Sign Up</Text>
            { /* Handle possible errors with sign up */ }
            <TextInput
                style = { styles.textInput }
                autoCapitalize = 'none'
                placeholder = 'Email'
                onChangeText = {
                    (email) => setEmail(email)
                }
                value = { email }
            />
            <TextInput
                style = { styles.textInput }
                secureTextEntry
                autoCapitalize = 'none'
                placeholder = 'Password'
                onChangeText = {
                    (pass) => setPass(pass)
                }
                value = { pass }
            />
            <Button
                title = 'Sign Up'
                onPress = { 
                    () => { signup(email, pass, navigation) }
                }
            />
            <Button
                title = 'Already have an account?'
                // Handle navigation to login screen
                onPress = { 
                    () => navigation.navigate('Login') 
                }
            />
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
    }
})