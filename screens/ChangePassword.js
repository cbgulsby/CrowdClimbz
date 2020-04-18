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
//import * as firebase from 'firebase/app';
//import 'firebase/firestore';
import firebase from '../firebase';

function passwordCheck(pass) {
    if (pass.length < 8) {
        Alert.alert("Password too short");
        return 1;
    }
    else return 0;
    //to be expanded upon later
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
    return(
        <SafeAreaView style={styles.container}>
            <View>    
                <TextInput
                    style={styles.inputContainer}
                    onChangeText={text => onChangeText(text)}
                    //value={value}
                    placeholder="Enter New Password"
                />
                
                <View style={{flexDirection: 'row', flex: 1}}>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => navigation.navigate('Profile')}>
                        <Text> Cancel </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => send(value)}>
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