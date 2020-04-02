import React, { Container, useState, useEffect } from 'react';
import { 
  View, 
  Button,
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Camera
} from 'react-native';
import { RNPhotoEditor } from 'react-native-photo-editor'



export default function MarkProblem({navigation, route}){
	const {data} = route.params;

    console.log(data);
	
	// editPhoto = () => RNPhotoEditor.Edit({
	//     path: data.uri
	// });
	// _makeStartHold(){
	// 	console.log(data);
	// 	<View style={styles.circle}/>
	// }
	// makeNormalHold = () => {

	// };
	// makeFinishHold = () => {

	// };

	return(
		<SafeAreaView style={styles.container}>
			<View>
				<ImageBackground 
         	 	style={{height: 550}}
         	 	source={{ uri: data.uri }} 
         	 	resizeMode='contain'
         	 	>
         	 	</ImageBackground>
         	</View>
         	<View style={{flexDirection:'row', paddingBottom:20, justifyContent:'center'}}>
         		<Button
         			title="Start Hold"
         			//onPress={()=>makeStartHold()}
         		/>
         		<Button
         			title="Normal Hold"
         			//onPress={()=>makeNormalHold()}
         		/>
         		<Button
         			title="Finish Hold"
         			//onPress={()=>makeFinishHold()}
         		/>
         	</View>
         	<View>
         	 	<Button
         	 		title="Finished Marking"
        			onPress={() => navigation.navigate('Finish Problem', {data: data})}
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
  startCircle: {
	    width: 50,
	    height: 50,
	    borderWidth: 3,
	    borderRadius: 100/2,
	    borderColor: 'green'
	},
  middleCircle: {
	    width: 50,
	    height: 50,
	    borderWidth: 3,
	    borderRadius: 100/2,
	    borderColor: 'blue'
	},
  endCircle: {
	    width: 50,
	    height: 50,
	    borderWidth: 3,
	    borderRadius: 100/2,
	    borderColor: 'red'
	}	
});