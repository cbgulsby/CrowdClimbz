import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    SafeAreaView
} from 'react-native';

export default function Profile(){
    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Profile Screen</Text>
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