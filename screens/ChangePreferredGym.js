import React, { useState } from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    Button,
    Picker,
} from 'react-native';


var value = "Gym1";

function updateGrade(val){

    value = val;
}

export default function ChangePreferredGym({navigation}){
    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Change Preferred Gym</Text>

                <Picker style={{borderColor: 'gray', borderWidth: 2}}
                prompt='Choose Grade'
                mode='dropdown'
                style={{height: 40, width: 350}}
                onValueChange={(itemValue, itemIndex) => updateGrade}
                >
                <Picker.Item label="Gym1" value="Gym 1" />
                <Picker.Item label="Gym2" value="Gym 2" />
                <Picker.Item label="Gym3" value="Gym 3" />
                <Picker.Item label="Gym4" value="Gym 4" />
                
                </Picker>

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