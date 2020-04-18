import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Button, 
    TextInput,
    Alert 
} from 'react-native';
import firebase from '../firebase';

console.disableYellowBox = true;

async function signup(email, username, pass, navigation) {
    if (checkEmail(email) == -1) {
        Alert.alert("Must enter valid email");
        return;
    }
    if (checkUsername(username) == -1) {
        Alert.alert("Must enter valid username");
        return;
    }
    if (checkPass(pass) == -2) {
        Alert.alert("Must enter valid password");
        return;
    }
    if (checkPass(pass) == -1) {
        Alert.alert("Password length must be 6 or more characters");
        return;
    }

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
                                email: email,
                                username: username,
                                preferredGym: "",
                                climbingAbility: ""
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

function checkEmail(email) {
    if (email.length == 0) {
        return -1;
    }
    return 0;
}

function checkUsername(username) {
    if (username.length == 0) {
        return -1;
    }
    return 0;
}

function checkPass(pass) {
    if (pass.length == 0) {
        return -2;
    }
    else if (pass.length < 6) {
        return -1;
    }
    return 0;
}

export default function SignUp({navigation}){

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

    return(
        <View style = { styles.container }>
            <Text>Sign Up</Text>
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
                autoCapitalize = 'none'
                placeholder = 'Username'
                onChangeText = {
                    (username) => setUsername(username)
                }
                value = { username }
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
                    () => { signup(email, username, pass, navigation) }
                }
            />
            <Button
                title = 'Already have an account?'
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