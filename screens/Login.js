import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    TextInput,
    Alert,
    Image
} from 'react-native';
import firebase from '../firebase';
import logo from '../assets/logo.png'

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
            <Image 
                source={logo}
                style={{height: 230, width: 260, marginBottom: 10}}
            />
            {/* <Text
                // color="white"
                style={styles.titleText}
            >
                Login
            </Text> */}
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
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress = {
                    () => { login(email, pass, navigation) }
                }
            >
                <Text
                    style={styles.buttonTextStyle}
                >
                    Login
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress = {
                    () => navigation.navigate('SignUp')
                }
            >
               <Text
                    style={styles.buttonTextStyle}
                >
                    Don't have an account?
                </Text> 
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#073B4C',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        marginTop: 8,
        borderRadius: 5,
        paddingLeft: 5
    },
    titleText: {
        color: 'white',
        fontSize: 28
    },
    buttonStyle: {
        backgroundColor: '#118ab2',
        height: 40,
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5
    },
    buttonTextStyle: {
        fontSize: 18,
        color: 'white'
    }
})