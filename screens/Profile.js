import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    SafeAreaView,
    Image,
    FlatList
} from 'react-native';


export default function Profile(){
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.profileBar}>
                <View style={{flex: 1, alignContent: 'center'}}>
                    <Image 
                        source={require('../assets/blank_profile_pic.png')}
                        style={styles.profilePic}
                    />
                </View>
                <View style={{flex: 2}}>
                    <View style={styles.description}>
                        <Text>Username</Text>
                        <Text>Ability: V3 - V4</Text>
                        <Text>Preferred Gym: Robert E. Witt Recreation Center</Text>
                    </View>
                </View>
            </View>
            <View style={{backgroundColor: 'white', flex: 6}}>
                <View>

                </View>
                <View>
                    <FlatList />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        backgroundColor: 'white',
        flex: 1
    },
    profilePic: {
        width: 80,
        height: 80,
        margin: 10,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
    },
    description: {
        backgroundColor: '#2576f7', 
        flex: 1, 
        margin: 10,
        padding: 2,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        alignContent: 'flex-start',
        justifyContent: 'flex-start'
    },
    profileBar: {
        backgroundColor: 'white', 
        flex: 1, 
        flexDirection: 'row'
    },
});