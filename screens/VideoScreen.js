import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';
import {Video} from 'expo-av';
import BackIcon from 'react-native-vector-icons/Ionicons';

export default function VideoScreen({route, navigation}) {
    const { videoUri } = route.params;
    
    return (
        <View style = {styles.container}>
            <BackIcon
                name = 'ios-arrow-back'
                size = {50}
                style = {styles.backButton}
                onPress = {
                    () => navigation.goBack()
                }
            />
            <Video
                source = {{uri: videoUri}}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={{ 
                    width: Dimensions.get('window').width, 
                    height: Dimensions.get('window').width + 200
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#118AB2',
        paddingTop: 24
    },
    backButton: {
        paddingLeft: 15
    },
})