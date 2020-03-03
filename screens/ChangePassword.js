import React, { useState } from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    Button,
    TextInput,
} from 'react-native';

export default function ChangePassword({navigation}){
    
    const [value, onChangeText] = React.useState('Change Password');
    return(
        <SafeAreaView style={styles.container}>
            <View>    
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                />

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