import React, { Container, useState, useEffect } from 'react';
import { 
  View, 
  Button,
  Text, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';

export default function MarkProblem({navigation, route}){
	const {data} = route.params;

    console.log(data);

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