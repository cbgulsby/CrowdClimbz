import React, { useState } from 'react';
import { 
    StyleSheet, 
    View,
    TextInput,
    Button,
    Text
} from 'react-native';
// import { Permissions } from 'expo';
import MapView, { Marker } from 'react-native-maps';
import firebase from '../firebase';
import 'firebase/firestore';

console.disableYellowBox = true;

export default function SearchGym({navigation}) {

    //hook variables

    const [text, setText] = useState('');
    const [position, setPosition] = useState({
        latitude: 34.71111,
        longitude: -86.6540
    });
    const [markers, setMarkers] = useState([])

    //user location functions

    function geoSuccess(position) {
        let crd = position.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        setPosition({
            latitude: crd.latitude,
            longitude: crd.longitude
        })
    }
    
    function geoFail(position) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    let geoOptions = {
        enableHighAccuracy: true,
        timeOut: 20000,
        maximumAge: 60 * 60 * 24
    };

    function getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoFail, geoOptions)
    }

    //gym locating function

    function getData(value) {
        setMarkers([]);
        let tempMarkers = [];
        console.log("value: ", value.nativeEvent.text);
        firebase.firestore().collection('SearchGymsCollection')
        .where("city", "==", value.nativeEvent.text)
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
                    latlng: {
                        latitude: location.latitude,
                        longitude: location.longitude
                    },
                    key: doc.id
                })
            });
            console.log("tempMarkers =>", tempMarkers)
            setMarkers(tempMarkers);
        })
        console.log("markers =>", markers);
        return tempMarkers;
    }

    return(
        <View style={styles.container}>
            <View style={{flex: 2, flexDirection: 'row'}}>
                {/* <Button
                    title=""
                    onPress={() => {navigation.openDrawer()}}
                    color='#EF476F'
                    style={{justifyContents: 'center'}}
                >
                    <Text>Menu</Text>
                </Button> */}
                <TextInput
                    style={styles.inputContainer}
                    // onChangeText={text => getData(text)}
                    // onChange={(text) => {console.log(text)}}
                    onSubmitEditing={text => getData(text)}
                    // value={text}
                    placeholder="Enter City Name"
                />
            </View>
            <MapView
                style={{flex: 24}}
                region={{
                    latitude: position.latitude,
                    longitude: position.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.421
                }}
                showsUserLocation
            >
                {markers.map(marker => (
                    <Marker
                        coordinate={marker.latlng}
                        title={marker.title}
                        key={marker.key}
                    />
                ))}
            </MapView>
            {/* <TextInput style={{flex: 1}} />
            <MapView 
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={{flex: 1}}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        backgroundColor: '#118AB2',
        flex: 1
    },
    inputContainer: {
        height: 40,
        width: '97.5%',
        backgroundColor: 'white', 
        borderColor: 'gray', 
        borderWidth: 1, 
        paddingLeft: 5,
        margin: 5,
        alignSelf: 'center',
    }
});