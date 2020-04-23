import React, {useState} from 'react';
import { 
  View, 
  Button,
  Text, 
  StyleSheet, 
  SafeAreaView,
  TextInput,
  Picker,
  Image,
  Alert,
  TouchableOpacity
} from 'react-native';
import firebase from '../firebase';
console.disableYellowBox = true; 

export function checkInfo(word){
	if(word == "") return 1;
	return 0;
}

export function checkLatitude(lat){
	console.log(typeof(lat))
	if((lat>90) || (lat<-90)) return 1;
	if(typeof(lat) != 'number') return 1;;
	return 0;
}

export function checkLongitude(long){
		console.log(typeof(long));
	if((long>180) || (long< -180)) return 1;
	if(typeof(long) != 'number') return 1;
	return 0;
}

export default function AddGym({navigation}){
	const db = firebase.firestore();
	const [city, setGymCity] = useState("");
	const [gymName, setGymName] = useState("");
	const [geoLocation, setGeoLocation] = useState();
	const [gymState, setGymState] = useState("");
	const [latitude, setLatitude] = useState(200);
	const [longitude, setLongitude] = useState(200);

	function addGymToDatabase(){
		if(checkInfo(city) == 1){
			Alert.alert("Please add the city in which the gym is located.");
			return;
		}
		if(checkInfo(gymName) == 1){
			Alert.alert("Please add the gym name.");
			return;
		}
		if(checkInfo(gymState) == 1){
			Alert.alert("Please add the state in which the gym is located");
			return;
		}
		if(checkLatitude(latitude) == 1){
			Alert.alert("Please enter latitude as a decimal number between -90 and 90. You can find this on Google Maps.");
			return;
		}
		if(checkLongitude(longitude) == 1){
			Alert.alert("Please enter longitude as a decimal number between -180 and 180. You can find this on Google Maps.");
			return;
		}
		console.log(typeof(longitude));

		const geo = new firebase.firestore.GeoPoint(latitude, longitude);
		setGeoLocation(geo);
		console.log(geo);
		console.log(geoLocation);
		
		db.collection("SearchGymsCollection").add({
			city: city,
			gymName: gymName,
			location: {geoLocation},
			state: gymState
		})
		.then(function() {
		    console.log("Document successfully written!");
		})
		.catch(function(error) {
		    console.error("Error writing document: ", error);
		});
			navigation.goBack();
	}

	return(
		<SafeAreaView style={styles.container}>
		<View style={{alignItems:'center'}}>
			<TextInput
	         	 	style={styles.textInputStyle}
	         		placeholder="Please enter the name of the gym."
	         		onChangeText={(text) => setGymName(text)}
	        	/>
	        <Text></Text>
	        <TextInput
	         	 	style={styles.textInputStyle}
	         		placeholder="Please enter the state where the gym is located."
	         		onChangeText={(text) => setGymState(text)}
	        	/>
	        <Text></Text>
	        <TextInput
	         	 	style={styles.textInputStyle}
	         		placeholder="Please enter the city where the gym is located."
	         		onChangeText={(text) => setGymCity(text)}
	        	/>
	        <Text></Text>
	        <TextInput
	         	 	style={styles.textInputStyle}
	         		placeholder="Please enter the exact latitude of the gym."
	         		keyboardType = 'decimal-pad'
	         		onChangeText={(text) => {
	         			const lat = Number(text);
	         			setLatitude(lat);}
	         		}
	        	/>
	        <Text></Text>
	        <TextInput
	         	 	style={styles.textInputStyle}
	         		placeholder="Please enter the exact longitude of the gym."
	         		keyboardType = 'decimal-pad'
	         		onChangeText={(text) => {
	         			const lon = Number(text);
	         			setLongitude(lon);}
	         		}
	        	/>
	        <Text></Text>
	        <TouchableOpacity
	        	style={styles.buttonStyle}
	        	onPress={() => addGymToDatabase()}
	        >
	        <Text style={styles.buttonTextStyle}>Add Gym</Text>
	        </TouchableOpacity>
		</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
  container: {
      paddingTop: 24,
      backgroundColor: '#118AB2',
      flex: 1
  },
  rowContainer: {
  	flexDirection: 'row'
  },
  textInputStyle: {
  	height: 40, 
  	borderRadius: 5,
  	width: 350, 
  	color:'#073B4C', 
  	paddingLeft: 10, 
  	borderColor: '#073B4C', 
  	borderWidth: 2
  },
  buttonStyle: {
        backgroundColor: '#06D6A0',
        height: 40,
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderWidth: 2,
        borderColor: '#073B4C',
        borderRadius: 5
    },
    buttonTextStyle: {
        fontSize: 18,
        color: '#073B4C'
    }
});