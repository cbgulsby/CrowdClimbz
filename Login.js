import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import firebase from 'react-native-firebase';

export default class Login extends React.Component {
    state = {
        email: '',
        password: '',
        errorMessage: null
    }

    login = () => {
        // Firebase stuff
    }

    render() {
        return (
            <View>
                <Text>Login</Text>
                Handle possible errors
                <TextInput
                    style = { styles.textInput }
                    autoCapitalize = 'none'
                    placeholder = 'Email'
                    onChangeText = { 
                        (email) => this.setState({ email }) 
                    }
                    value = { this.state.email }
                />
                <TextInput
                    secureTextEntry
                    style = { styles.textInput }
                    autoCapitalize = 'none'
                    placeholder = 'Password'
                    onChangeText = { 
                        (password) => this.setState({ password })
                    }
                    value = { this.state.password }
                />
                <Button 
                    title = 'Login'
                    onPress = { 
                        () => this.login 
                    }
                />
                <Button
                    title = "Don't have an account?"
                    // Handle navigation to sign up screen
                />
            </View>
        )
    }
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