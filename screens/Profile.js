import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    SafeAreaView,
    Image,
    FlatList,
    Button,
    TouchableOpacity
} from 'react-native';
import ProblemCard from '../components/ProblemCard';

const sampleData = [
    {
        id: '1',
        problemName: 'I Hate Mondays',
        gymLocation: 'Birmingham Boulders',
        problemLevel: 2,
    },
    {
        id: '2',
        problemName: 'Going Up',
        gymLocation: 'Birmingham Boulders',
        problemLevel: 0,
    },
    {
        id: '3',
        problemName: 'Going Down',
        gymLocation: 'High Point Birmingham',
        problemLevel: 6,
    },
    {
        id: '4',
        problemName: 'I Hate Mondays',
        gymLocation: 'Birmingham Boulders',
        problemLevel: 2,
    },
    {
        id: '5',
        problemName: 'Going Up',
        gymLocation: 'Birmingham Boulders',
        problemLevel: 0,
    },
    {
        id: '6',
        problemName: 'Going Down',
        gymLocation: 'High Point Birmingham',
        problemLevel: 6,
    },
]

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
                        <Text style={{color: 'white'}}>Username</Text>
                        <Text style={{color: 'white'}}>Ability: V3 - V4</Text>
                        <Text style={{color: 'white'}}>Preferred Gym: Robert E. Witt Recreation Center</Text>
                    </View>
                </View>
            </View>

            <View style={{backgroundColor: 'white', flex: 6}}>

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <TouchableOpacity style={{flex: 1, backgroundColor: '#eb34d8', borderColor: 'black', borderWidth: 1, margin: 3, justifyContent: 'center', alignItems: 'center'}}>
                        {/* <View style={{flex: 1, backgroundColor: 'blue', margin: 3}}> */}
                            <Text style={{color: 'white', fontSize: 25}}>My Problems</Text>
                        {/* </View> */}
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, backgroundColor: '#eb34d8', borderColor: 'black', borderWidth: 1, margin: 3, justifyContent: 'center', alignItems: 'center'}}>
                        {/* <View style={{flex: 1, backgroundColor: 'blue', margin: 3}}> */}
                            <Text style={{color: 'white', fontSize: 25}}>Edit Profile</Text>
                        {/* </View> */}
                    </TouchableOpacity>
                </View>

                <View style={{flex: 9}}>
                    <FlatList 
                      data={sampleData}
                      renderItem={({item}) => <ProblemCard id={item.id} name={item.problemName} />} 
                      keyExtractor={item => item.id} 
                    />
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
        borderTopRightRadius: 40,
        borderColor: 'black',
        borderWidth: 1,
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
        justifyContent: 'flex-start',
        borderColor: 'black',
        borderWidth: 1,
    },
    profileBar: {
        backgroundColor: 'white', 
        flex: 1, 
        flexDirection: 'row'
    },
});