import React from 'react';
import { 
  View, 
  Button,
  Text, 
  StyleSheet, 
  SafeAreaView,
  TextInput,
  Picker,
  Image
} from 'react-native';

export default function FinishProblem( {navigation, route}){
	const {data} = route.params;

    console.log(data);

	return(
		<SafeAreaView style={styles.container}>
			<View>
         	 	<Image 
         	 		style={{height:150, width:150}}
         	 		source={{ uri: data.uri }} 
         	 	/>
				<TextInput
	         	 	style={{height: 150, width: 225, borderColor: 'gray', borderWidth: 2}}
	         		placeholder="Add description here!"
	        	/>
	        	<TextInput
	        		style={{height: 40, width: 350, borderColor: 'gray', borderWidth: 2}}
	        		placeholder="Problem Name: N/A"
	        	/>
	        	<Picker
	        		prompt='Choose Grade'
	        		mode='dropdown'
	        		style={{height: 40, width: 350}}
	        		onValueChange={(itemValue, itemIndex) =>
	    			this.setState({grade: itemValue})
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
	        		style={{height: 40, width: 350, borderColor: 'gray', borderWidth: 2}}
	        		placeholder="Gym: N/A"
	        	/>
	        	<Button
	        		title = "Add beta video"
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