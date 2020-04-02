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
            dbh.collection('gyms').doc('testgym').update({name: val});
            //navigation.navigate('Profile');
            Alert.alert("Password Updated!");
        }
        
    }

    const [value, onChangeText] = React.useState('Change Password');
    return(
        <SafeAreaView style={styles.container}>
            <View>    
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                />
                <Button  title="Submit Changes" onPress={() => send(value)} />

                <Button title="Go Back" onPress={() => navigation.navigate('Profile')} />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        backgroundColor: '#4fb9ff',
        flex: 1
    }
});