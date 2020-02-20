import React from 'react';
import { SytleSheet, Text, View, Button, TextInput } from 'react-native';
import firebase from 'react-native-firebase';

export default class SignUp extends React.Component {
    state = {
        email: '',
        password: '',
        errorMessage: null
    }

    signUp = () => {
        //Firebase stuff
    }
    
    render() {
        return (
            <View>
                <Text>Sign Up</Text>
                Handle errors with sign up process
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
                    title = 'Sign Up'
                    onPress = {
                        () => this.signUp
                    }
                />
                <Button
                    title = 'Already have an account?'
                    // Handle navigation to login screen
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