import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
} from 'react-native';

export default function SearchGym(){
    return(
        <View style={styles.container}>
            <Text>Search Gym Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        backgroundColor: '#4fb9ff',
        flex: 1
    }
});