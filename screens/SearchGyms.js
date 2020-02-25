import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    TextInput,
    Button,
    Alert 
} from 'react-native';

import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDfOuH54N5dKv5zqVZ3CylTZpn7y2eC9GI",
    authDomain: "crowdclimbz.firebaseapp.com",
    databaseURL: "https://crowdclimbz.firebaseio.com",
    projectId: "crowdclimbz",
    storageBucket: "crowdclimbz.appspot.com",
    messagingSenderId: "760059550596",
    appId: "1:760059550596:web:a88049a666755ee2ec1bd1",
    measurementId: "G-3RRKPJLYNG"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default function SearchGym(){

    function fullSend(val) {
        firebase.firestore().collection('gyms').doc('testgym').set( {name: val});

    }
    const [value, onChangeText] = React.useState('Search Gym Here');
    
    //firebase.initializeApp(firebaseConfig);

    //dbh.collection('gyms').doc('testgym').set( { name: 'this is a test' });

    return(
        <View style={styles.container}>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeText(text)}
                value={value}
            />
            <Button
                title='Search'
                color='#eb34d8'
                onPress={() => fullSend(value)}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        backgroundColor: '#4fb9ff',
        flex: 1
    }
});