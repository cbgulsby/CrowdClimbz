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

        dbh.collection('gyms').doc('testgym').update({pref: val});
        navigation.navigate('Profile');
        Alert.alert("Preferred Gym Updated!");

    }

    const [selectedValue, setSelectedValue] = useState("Gym2");
    
    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Change Preferred Gym</Text>

                <Picker style={{borderColor: 'gray', borderWidth: 2}}
                prompt='Choose Grade'
                mode='dropdown'
                style={{height: 40, width: 350}}
                selectedValue = {selectedValue}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                <Picker.Item label="Gym1" value="Gym 1" />
                <Picker.Item label="Gym2" value="Gym 2" />
                <Picker.Item label="Gym3" value="Gym 3" />
                <Picker.Item label="Gym4" value="Gym 4" />
                
                </Picker>

                <Button  title="Submit Changes" onPress={() => send(selectedValue)} />
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