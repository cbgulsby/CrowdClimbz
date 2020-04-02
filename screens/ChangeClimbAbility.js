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

        dbh.collection('gyms').doc('testgym').update({ability: val});
        navigation.navigate('Profile');
        Alert.alert("Climbing Ability Updated!");

    }

    const [selectedValue, setSelectedValue] = useState("V0");
    

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
	  			<Picker.Item label="V0" value="v0" />
	  			<Picker.Item label="V1" value="v1" />
	  			<Picker.Item label="V2" value="v2" />
	  			<Picker.Item label="V3" value="v3" />
	  			<Picker.Item label="V4" value="v4" />
	  			<Picker.Item label="V5" value="v5" />
	  			<Picker.Item label="V6" value="v6" />
	  			<Picker.Item label="V7" value="v7" />
	  			<Picker.Item label="V8" value="v8" />
	  			<Picker.Item label="V9" value="v9" />
	  			<Picker.Item label="V10" value="v10" />
	  			<Picker.Item label="V11" value="v11" />
	  			<Picker.Item label="V12" value="v12" />
	  			<Picker.Item label="V13" value="v13" />
	  			<Picker.Item label="V14" value="v14" />
	  			<Picker.Item label="V15" value="v15" />
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