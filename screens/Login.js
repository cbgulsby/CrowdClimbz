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
//import * as firebase from 'firebase';

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


async function login(email, pass, navigation) {
    try {
        await firebase.auth()
            .signInWithEmailAndPassword(email, pass)
            
            .then(() => {
                navigation.navigate('SideMenu')
            })


        console.log("Account logged in");
    }
    catch (error) {
        console.log(error.toString())
    }
}

export default function Login({navigation}) {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return(
        <View style = { styles.container }>
            <Text>Login</Text>
            { /* Handle possible errors for login */}
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
                // Handle navigation to sign up screen
                onPress = {
                    () => navigation.navigate('SignUp')
                }
            />
        </View>
    );
}




// export default class Login extends React.Component {
//     state = {
//         email: '',
//         password: '',
//         errorMessage: null
//     }

//     loginAuthentication = () => {
//         // Firebase stuff
//     }

//     render() {
//         return (
//             <View style = { styles.container }>
//                 <Text>Login</Text>
//                 { /* Handle possible errors for login */ }
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
//                     title = 'Login'
//                     onPress = { 
//                         // () => this.loginAuthentication
//                         () => this.props.navigation.navigate('SideMenu')
//                     }
//                 />
//                 <Button
//                     title = "Don't have an account?"
//                     // Handle navigation to sign up screen
//                     onPress = { 
//                         () => this.props.navigation.navigate('SignUp') 
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