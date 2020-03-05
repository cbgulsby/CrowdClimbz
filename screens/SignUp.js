import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Button, 
    TextInput 
} from 'react-native';
import firebase from 'firebase/app';
//import firebase from 'react-native-firebase';
// import * as firebase from 'firebase';

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
    try {
        await firebase.auth()
            .createUserWithEmailAndPassword(email, pass)
            // .then(() => {
            //     firebase.auth().onAuthStateChanged(newUser => {
            //         if(newUser) {
            //             firebase.firestore()
            //             .collection('gyms')
            //             .doc(newUser.uid)
            //             .set({
            //                 id: newUser.uid,
            //                 email: email
            //             })
            //         }
            //     })
            // });
            .then(() => {
                navigation.navigate('SideMenu')
            })
        console.log("Account created");
    }
    catch (error) {
        console.log(error.toString())
    }
}

export default function SignUp({navigation}){

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return(
        <View style={styles.container}>
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
                    () => {signup(email, pass, navigation)}
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

// export default class SignUp extends React.Component {
//     state = {
//         email: '',
//         password: '',
//         errorMessage: null
//     }

//     signUpAuthentication = () => {
//         //Firebase stuff
//     }
    
//     render() {
//         return (
//             <View style = { styles.container }>
//                 <Text>Sign Up</Text>
//                 { /*Handle errors with sign up process*/ }
//                 <TextInput
//                     style = { styles.textInput }
//                     autoCapitalize = 'none'
//                     placeholder = 'Email'
//                     onChangeText = {
//                         (email) => this.setState({ email })
//                     }
//                     value = { this.state.email }
//                 />
//                 <TextInput
//                     secureTextEntry
//                     style = { styles.textInput }
//                     autoCapitalize = 'none'
//                     placeholder = 'Password'
//                     onChangeText = {
//                         (password) => this.setState({ password })
//                     }
//                     value = { this.state.password }
//                 />
//                 <Button
//                     title = 'Sign Up'
//                     onPress = {
//                         //() => this.signUp
//                         () => this.props.navigation.navigate('SideMenu')
//                     }
//                 />
//                 <Button
//                     title = 'Already have an account?'
//                     // Handle navigation to login screen
//                     onPress = { 
//                         () => this.props.navigation.navigate('Login') 
//                     }
//                 />
//             </View>
//         )
//     }
// }

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