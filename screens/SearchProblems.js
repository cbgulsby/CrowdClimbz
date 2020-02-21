import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
} from 'react-native';

export default function SearchProblem(){
    return(
        <View style={styles.container}>
            <Text>Search Problem Screen</Text>
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