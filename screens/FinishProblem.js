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
import {NavigationActions} from 'react-navigation';
import firebase from '../firebase';
import * as ImagePicker from 'expo-image-picker';
console.disableYellowBox = true; 

export function checkName(name){
    	if(name == "") return 1;
    	if(name.length > 20) return 2;
    	else return 0;
    }

export function checkGym(name){
    	if(name == "noneSelected") return 1;
    	else return 0;
    }

async function uploadImage(uri, username, problemName){
	const response = await fetch(uri);
	const blob = await response.blob();

	var ref = firebase.storage().ref('problemPhotos').child(username).child(problemName);
	ref.put(blob);
}

async function uploadVideo(uri, username, problemName){
	const response = await fetch(uri);
	const blob = await response.blob();
	var ref = firebase.storage().ref('problemVideos').child(username).child(problemName);
	ref.put(blob);
}

export default function FinishProblem( {navigation, route}){
	const db = firebase.firestore();
	const {data} = route.params;
	const [problemDescription, setDescription] = useState('');
	const [problemName, setProblemName] = useState('');
	const [problemGrade, setGrade] = useState('0');
	const [problemGym, setGym] = useState('');
	const [problemVideoFlag, setVideoFlag] = useState(0);
	const currentUserUID = firebase.auth().currentUser.uid;
	const [currentUserUsername, setCurrentUser] = useState("");
	const [problemVideo, setProblemVideo] = useState([]);
	const [hasUser, setUserFlag] = useState(0);
	
	//get username
	if(hasUser == 0){
		db.collection("users").where("id", "==", currentUserUID).get().then(function(querySnapshot) {
			if (!querySnapshot.empty){
				var doc = querySnapshot.docs[0];
				console.log("DOCUMENT DATA:", doc.data());
				setCurrentUser(doc.data().username);
			} else{
				console.log("No such document");
			}
		});
		setUserFlag(1);
	}

	//get gyms
	const [gymChoices, setGymChoices] = useState([]);
	db.collection("SearchGymsCollection").orderBy("gymName")
		.onSnapshot(function(querySnapshot) {
			const tempGyms = [{gymName: "Choose Gym", gymValue: "noneSelected"}];
			querySnapshot.forEach(doc => {
				const {
					gymName
				} = doc.data();
			tempGyms.push({
				gymName: gymName,
		    	gymValue: gymName
			});
			});
			setGymChoices(tempGyms);
		});

		
	async function pickVideo(){
	    let result = await ImagePicker.launchImageLibraryAsync({
	      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
	    });
	    console.log(result);

	    if (!result.cancelled) {
	    	setProblemVideo(result);
	      	setVideoFlag(1);
	    }
	};

	function pickerList(pickerData) {
        return( pickerData.map( (x) => { 
              return( <Picker.Item label={x.gymName} key={x.gymName} value={x.gymValue}  />)} ));
    };

    function postProblem() {
    	var curDate = new Date().toISOString().substring(0,10);
    	var curTime = new Date().toISOString().substring(11,19);
    	if (checkName(problemName) == 1){
    		Alert.alert("You must name your problem to post it.");
    		return;
    	}
    	if (checkName(problemName) == 2){
    		Alert.alert("The name of your problem must be 20 characters or less.");
    		return;
    	}
    	if(checkGym(problemGym) == 1){
    		Alert.alert("You must specify what gym this problem is in to post it.");
    		return;
    	}
    	uploadImage(data, currentUserUsername, problemName)
    		.then(() => {
    			console.log('Image uploaded successfully');
    		})
    		.catch((error) => {
    			console.log(error);
    		});
    	if(problemVideoFlag == 1){
	    	uploadVideo(problemVideo.uri, currentUserUsername, problemName)
	    		.then(() => {
	    			console.log('Video uploaded successfully');
	    		})
	    		.catch((error) => {
	    			console.log(error);
	    		});
    	}
    db.collection("problems").add({
	    name: problemName,
	    grade: problemGrade,
	    gym: problemGym,
	    description: problemDescription,
	    betaVideo: problemVideoFlag,
	    user: currentUserUsername,
	    date: curDate,
	    time: curTime,
	    outOfDateFlag: 0,
	    inappropriateFlag: 0
	})
	.then(function() {
	    console.log("Document successfully written!");
	})
	.catch(function(error) {
	    console.error("Error writing document: ", error);
	});
	navigation.navigate('Start New Problem');
	}
	
	return(
		<SafeAreaView style={styles.container}>
			<View style={{flexDirection:'row', paddingBottom: 20, marginLeft: 10}}>
         	 	<Image 
         	 		style={{height:150, width:150}}
         	 		source={{ uri: data }} 
         	 	/>
				<TextInput
					multiline
	         	 	style={{height: 150, borderRadius: 5, width: 225, color:'#073B4C', paddingLeft: 10, paddingRight: 10, borderColor: '#073B4C', borderWidth: 2}}
	         		placeholder="Add description here!"
	         		onChangeText={(text) => setDescription(text)}
	        	/>
	        </View>
	        <View style={{paddingBottom: 20, marginLeft: 15, marginRight: 15, alignItems:'center'}}>
	        	<TextInput
	        		style={{height: 40, borderRadius: 5,width: 350, color:'#073B4C', paddingLeft: 10, borderColor: '#073B4C', borderWidth: 2}}
	        		placeholder="Problem Name: N/A"
	        		onChangeText={(text) => setProblemName(text)}
	        	/>
	        	<Picker itemStyle={{color:'#073B4C'}} style={{borderColor: '#073B4C', borderWidth: 2}}
	        		prompt='Choose Grade'
	        		mode='dropdown'
	        		selectedValue = {problemGrade}
	        		style={{height: 40, width: 350}}
	        		onValueChange={(itemValue, itemIndex) =>
    				setGrade(itemValue)
 					}
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
	        	<Picker itemStyle={{color:'#073B4C'}} style={{borderColor: '#073B4C', borderWidth: 2}}
	        		prompt='Choose Gym'
	        		mode='dropdown'
	        		selectedValue = {problemGym}
	        		style={{height: 40, width: 350}}
	        		onValueChange={(itemValue, itemIndex) =>
    				setGym(itemValue)
 					}
	  			>
	  			{pickerList(gymChoices)}
	  			</Picker>
	        	<TouchableOpacity
	        		style={{backgroundColor: '#06D6A0',
				        height: 40,
				        width: '90%',
				        alignItems: 'center',
				        justifyContent: 'center',
				        margin: 5,
				        borderWidth: 2,
				        borderColor: '#073B4C',
				        borderRadius: 5
				    }}
	        		onPress={() => navigation.navigate('Add Gym')}
	        	>
	        	<Text style={styles.buttonTextStyle}>Can't find your gym? Add a new gym!</Text>
	        	</TouchableOpacity>
	        	<Text></Text>
	        	<TouchableOpacity
	        		style={styles.buttonStyle}
	        		onPress={() => pickVideo()}
	        	>
	        	<Text style={styles.buttonTextStyle}>Add Beta Video</Text>
	        	</TouchableOpacity>
	        	{problemVideoFlag == 1 &&
	        		<Text style={styles.buttonTextStyle}>Video added!</Text>
	        	}
	        	<Text></Text>
	        	<TouchableOpacity
	        		style={styles.buttonStyle}
	        		onPress={() => postProblem()}
	        	>
	        	<Text style={styles.buttonTextStyle}>Post Problem!</Text>
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