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
                //let tempMarkers = [];
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
    
        
    function pickerList(pickerData) {
        return( pickerData.map( (x) => { 
              return( <Picker.Item label={x.title} key={x.key} value={x.title}  />)} ));
    };

    return(
        <SafeAreaView style={styles.container}>
            <View>
                
                <TouchableOpacity 
                    style={styles.singleButton} 
                    onPress={() => getData()}>
                    <Text> Load Gyms </Text>
                </TouchableOpacity> 

                <Picker style={{borderColor: 'gray', borderWidth: 2}}
                prompt='Choose Grade'
                mode='dropdown'
                style={{height: 40, width: 350}}
                selectedValue = {selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                {pickerList(markers)}
                
                </Picker>

                <View style={{flexDirection: 'row', flex: 0.2}}>
                    <TouchableOpacity 
                        style={styles.doubleButton} 
                        onPress={() => navigation.navigate('Profile')}>
                        <Text> Cancel </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.doubleButton} 
                        onPress={() => send(selectedValue)}>
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
    doubleButton: {
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
    },
    singleButton: {
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
        justifyContent: 'center', 
        alignItems: 'center',
    }

});