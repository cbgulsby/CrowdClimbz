import React, { Container, useState, useEffect } from 'react';
import { 
  View, 
  Button,
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  Image,
  Camera
} from 'react-native';
import { RNPhotoEditor } from 'react-native-photo-editor'



export default function MarkProblem({navigation, route}){
	const {data} = route.params;

    console.log(data);
	
	editPhoto = () => RNPhotoEditor.Edit({
	    path: data.uri
	});
	
	return(
		<SafeAreaView style={styles.container}>
			<View>
				<Image 
         	 	style={{height: 550}}
         	 	source={{ uri: data.uri }} 
         	 	resizeMode='contain'
         	 	/>
         	</View>
         	<View style={{flexDirection:'row', paddingBottom:20}}>
         		<Button
         			title="Start Hold"
         			onPress={editPhoto}
         		/>
         		<Button
         			title="Foot Hold"
         		/>
         		<Button
         			title="Normal Hold"
         		/>
         		<Button
         			title="Finish Hold"
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
  }
});