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


async function login(email, pass, navigation) {
    if (checkEmail(email) == -1) {
        Alert.alert("Must enter valid email");
        return;
    }
    if (checkPass(pass) == -1) {
        Alert.alert("Must enter valid password");
        return;
    }

    var auth = firebase.auth();

    try {
        await auth
            .signInWithEmailAndPassword(email, pass)
            .then(() => {
                navigation.navigate('SideMenu')
            })

        console.log("Account logged in");
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

function checkPass(pass) {
    if (pass.length == 0) {
        return -1;
    }
    return 0;
}

export default function Login({navigation}) {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return(
        <View style = { styles.container }>
            <Text>Login</Text>
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
                secureTextEntry
                style = { styles.textInput }
                autoCapitalize = 'none'
                placeholder = 'Password'
                onChangeText = {
                    (pass) => setPass(pass)
                }
                value = { pass }
            />
            <Button
                title = 'Login'
                onPress = {
                    () => { login(email, pass, navigation) }
                }
            />
            <Button
                title = "Don't have an account?"
                onPress = {
                    () => navigation.navigate('SignUp')
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