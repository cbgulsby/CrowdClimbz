import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';

export default function ProblemCardScreen({route, navigation}) {
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        setLoading(false)
    }, [])
    
    return (
        <View style = {styles.container}>
            <BackIcon
                name = 'ios-arrow-back'
                onPress = {
                    () => navigation.goBack()
                }
            />
            <Text>Hello</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain'
    }
})