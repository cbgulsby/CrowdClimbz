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
  Alert
} from 'react-native';
import firebase from '../firebase';
//import db from '../firebase';

export default function FinishProblem( {navigation, route}){
	const db = firebase.firestore();
	const {data} = route.params;
	const [problemDescription, setDescription] = useState('');
	const [problemName, setProblemName] = useState('');
	const [problemGrade, setGrade] = useState('v0');
	const [problemGym, setGym] = useState('');
	const [problemBetaVideo, setBetaVideo] = useState('');

    console.log(data);

    function checkName(name){
    	if(name == "") return 1;
    	else return 0;
    }

    function postProblem() {
    	var curDate = new Date().toISOString().substring(0,10);
    	var curTime = new Date().toISOString().substring(11,19);
    	if (checkName(problemName) == 1){
    		Alert.alert("You must name your problem to post it.");
    		return;
    	}
    db.collection("problems").add({
	    name: problemName,
	    grade: problemGrade,
	    gym: problemGym,
	    description: problemDescription,
	    photo: data.uri,
	    betaVideo: problemBetaVideo,
	    user: 'lsilvashy',
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

	}

	return(
		<SafeAreaView style={styles.container}>
			<View style={{flexDirection:'row', paddingBottom: 20, marginLeft: 10}}>
         	 	<Image 
         	 		style={{height:150, width:150}}
         	 		source={{ uri: data.uri }} 
         	 	/>
				<TextInput
	         	 	style={{height: 150, width: 225, borderColor: 'gray', borderWidth: 2}}
	         		placeholder="Add description here!"
	         		onChangeText={(text) => setDescription(text)}
	        	/>
	        </View>
	        <View style={{paddingBottom: 20, marginLeft: 15, marginRight: 15}}>
	        	<TextInput
	        		style={{height: 40, width: 350, borderColor: 'gray', borderWidth: 2}}
	        		placeholder="Problem Name: N/A"
	        		onChangeText={(text) => setProblemName(text)}
	        	/>
	        	<Picker style={{borderColor: 'gray', borderWidth: 2}}
	        		prompt='Choose Grade'
	        		mode='dropdown'
	        		selectedValue = {problemGrade}
	        		style={{height: 40, width: 350}}
	        		onValueChange={(itemValue, itemIndex) =>
    				setGrade(itemValue)
 					}
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
	        	<TextInput
	        		style={{height: 40, width: 350, borderColor: 'gray', borderWidth: 2, marginBottom: 20}}
	        		placeholder="Gym: N/A"
	        		onChangeText={(text) => setGym(text)}
	        	/>
	        	<Button
	        		title = "Add beta video"
	        		style={{marginBottom: 20}}
	        		onPress={() => Alert.alert("Add functionality to add video")}
	        	/>
	        	<Text></Text>
	        	<Button
	        		title = "Post Problem!"
	        		onPress={() => postProblem()}
	        	/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
  container: {
      paddingTop: 24,
      backgroundColor: '#4fb9ff',
      flex: 1
  },
  rowContainer: {
  	flexDirection: 'row'
  }
});