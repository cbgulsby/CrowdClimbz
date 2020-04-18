import React, { useState } from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    Button,
    Picker,
    Alert,
} from 'react-native';
import firebase from '../firebase';


export default function ChangePreferredGym({navigation}){
    
    function send(val) {
        var dbh = firebase.firestore();
        const currentUserUID = firebase.auth().currentUser.uid;

        dbh.collection('users').doc(currentUserUID).update({preferredGym: val});
        //navigation.navigate('Profile');
        Alert.alert("Preferred Gym Updated!");

    }

    const [selectedValue, setSelectedValue] = useState("");

    //I want to build an array of all the gym names we currently have
    const [markers, setMarkers] = useState([]);
        
    function getData() {
        setMarkers([]);
        let tempMarkers = [];
        //console.log("value: ", value.nativeEvent.text);
        firebase.firestore().collection('SearchGymsCollection')
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc, i) {
                console.log(doc.id, " => ", doc.data(), "\n");
                const {
                    gymName,
                    location
                } = doc.data();
    
                tempMarkers.push({
                    title: gymName,
                    key: doc.id
                })
            });
            console.log("tempMarkers =>", tempMarkers)
            setMarkers(tempMarkers);
        })
        console.log("markers =>", markers);
        return tempMarkers;
    }
    

    //test data

    var countryData = ["India","Pakistan","USA"];
    var hyungLine = [
        {title: "Kim Namjoon", key: 1},
        {title: "Kim Seokjin", key: 2},
        {title: "Min Yoongi", key: 3},
        {title: "Jung Hoseok", key: 4}
    ];
        
    function pickerList(pickerData) {
        return( pickerData.map( (x) => { 
              return( <Picker.Item label={x.title} key={x.key} value={x.title}  />)} ));
    };




    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Change Preferred Gym</Text>

                <Picker style={{borderColor: 'gray', borderWidth: 2}}
                prompt='Choose Grade'
                mode='dropdown'
                style={{height: 40, width: 350}}
                selectedValue = {selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                {pickerList(markers)}
                

                </Picker>

                <Button  title="Submit Changes" onPress={() => send(selectedValue)} />
                <Button title="Go Back" onPress={() => navigation.navigate('Profile')} />
                <Button title="Set Up" onPress={() => getData()} />
               
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