import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';
//import Video from 'react-native-video';
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
            {/* <Text>{videoUri.toString()}</Text> */}
            {/* <Video
                source = {{videoUri}}
                ref = {(ref) => {
                    this.player = ref
                }}
                onBuffer = {this.onBuffer}
                onError = {this.videoError}
                style = {styles.backgroundVideo}
            /> */}
            <Video
                source = {{uri: videoUri}}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={{ 
                    // width: 300,
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