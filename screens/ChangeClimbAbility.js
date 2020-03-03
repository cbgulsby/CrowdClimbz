import React, { useState } from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    Button
} from 'react-native';

export default function ChangeClimbAbility({navigation}){
    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Change Climbing Ability</Text>
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