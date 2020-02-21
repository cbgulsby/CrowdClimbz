import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    SafeAreaView 
} from 'react-native';

export default function SavedProblems(){
    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Saved Screen</Text>
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