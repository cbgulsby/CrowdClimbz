import React, { useState } from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    Button,
    TextInput,
    Alert,
} from 'react-native';

import firebase from '../firebase';

function passwordCheck(pass) {
    if (pass.length < 8) {
        return 1;
    }
    else return 0;
    //to be expanded upon later
}

async function changePassword(oldPass, newPass) {

    if (passwordCheck(newPass) == -1) {
        Alert.alert("Must enter valid password");
        return;
    }

    var auth = firebase.auth();
    var user = auth.currentUser;

    try {
        await user
            .updatePassword(newPass)
            .then(() => {
                Alert.alert("Password Updated!")
            })

        console.log("Account logged in");
    }
    catch (error) {
        console.log(error.toString());
    }
}


export default function ChangePassword({navigation}){   
    function send(val) {
        var dbh = firebase.firestore();
        if (!passwordCheck(val)){
            //dbh.collection('gyms').doc('testgym').update({name: val});
            //navigation.navigate('Profile');
            Alert.alert("Password Updated! (placeholder)");
        }    
    }

    const [value, onChangeText] = React.useState('Change Password');
    
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');

    return(
        <SafeAreaView style={styles.container}>
            <View>    
                
                <TextInput
                    secureTextEntry
                    style = { styles.inputContainer }
                    autoCapitalize = 'none'
                    placeholder = 'Current Password'
                    onChangeText = {
                        (oldPass) => setOldPass(oldPass)
                    }
                    value = { oldPass }
                />
                <TextInput
                    secureTextEntry
                    style = { styles.inputContainer }
                    autoCapitalize = 'none'
                    placeholder = 'New Password'
                    onChangeText = {
                        (newPass) => setNewPass(newPass)
                    }
                    value = { newPass }
                />

                <View style={{flexDirection: 'row', flex: 1}}>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => navigation.navigate('Profile')}>
                        <Text> Cancel </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => changePassword(oldPass, newPass)}>
                        <Text> Submit </Text>
                    </TouchableOpacity>      
                    
                </View>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        backgroundColor: '#118AB2',
        flex: 1
    },
    button: {
        backgroundColor: '#FFD166', 
        borderRadius: 4
    },
    inputContainer: {
        //flex: 11, 
        height: 40, 
        borderColor: '#073B4C', 
        borderWidth: 1, 
        paddingLeft: 5 
    },
    button: {
        backgroundColor: '#FFD166',
        borderColor: '#073B4C',
        borderWidth: 1,
        //borderRadius: 12,
        color: '#073B4C',
        fontSize: 24,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 12,
        textAlign:'center',
        width: 200,
        justifyContent: 'center', 
        alignItems: 'center',
    }
});