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

export default function ChangeClimbAbility({navigation}){
    
    function send(val) {
        var dbh = firebase.firestore();
        const currentUserUID = firebase.auth().currentUser.uid;

        dbh.collection('users').doc(currentUserUID).update({climbingAbility: val});
        //navigation.navigate('Profile');
        Alert.alert("Climbing Ability Updated!");

    }

    const currentUserUID = firebase.auth().currentUser.uid;
    



    const [selectedValue, setSelectedValue] = useState("Please Select");
    

    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Change Climbing Ability</Text>
                <Picker style={{borderColor: 'gray', borderWidth: 2}}
	        		prompt='Choose Grade'
	        		mode='dropdown'
	        		style={{height: 40, width: 350}}
	        		selectedValue = {selectedValue}
                	onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
	  			>
	  			<Picker.Item label="V0" value="0" />
	  			<Picker.Item label="V1" value="1" />
	  			<Picker.Item label="V2" value="2" />
	  			<Picker.Item label="V3" value="3" />
	  			<Picker.Item label="V4" value="4" />
	  			<Picker.Item label="V5" value="5" />
	  			<Picker.Item label="V6" value="6" />
	  			<Picker.Item label="V7" value="7" />
	  			<Picker.Item label="V8" value="8" />
	  			<Picker.Item label="V9" value="9" />
	  			<Picker.Item label="V10" value="10" />
	  			<Picker.Item label="V11" value="11" />
	  			<Picker.Item label="V12" value="12" />
	  			<Picker.Item label="V13" value="13" />
	  			<Picker.Item label="V14" value="14" />
	  			<Picker.Item label="V15" value="15" />
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