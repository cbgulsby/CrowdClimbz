import React, { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput,
    Button,
    Alert,
} from 'react-native';
import { MapView, Permissions } from 'expo';

export default function SearchGym(){
    const [value, onChangeText] = useState('');
    const [position, setPosition] = useState({
        latitude: 0,
        longitude: 0
    });
    // const [latitude, setLatitude] = useState(null);
    // const [longitude, setLongitude] = useState(null);

    useEffect(() => {
        async function getUserLocation() {

            const {status} = await Permissions.getAsync(Permissions.LOCATION)
    
            if(status !== 'granted') {
                const response = await Permissions.getAsync(Permissions.LOCATION)
            }
            // navigator.geolocation.getCurrentPosition(
            //     ({coords: {latitude, longitude}}) => setLatitude
            // )
        }
    }, [])

    return(
        <View style={styles.container}>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeText(text)}
                value={value}
                placeholder="Enter Text"
            />
            <MapView
                style={{flex: 1}}
                initialRegion={{
                    // latitude,
                    // longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.421
                }}
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