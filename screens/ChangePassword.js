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



export default function ChangePassword({navigation}){   
    function send(val) {
        var dbh = firebase.firestore();

        dbh.collection('gyms').doc('testgym').update({name: val});
        navigation.navigate('Profile');
        Alert.alert("Password Changed");

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