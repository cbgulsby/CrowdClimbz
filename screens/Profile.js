import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
    StyleSheet, 
    View, 
    Text,
    SafeAreaView,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';
import ProblemCard from '../components/ProblemCard';
import ChangeClimbAbility from '../screens/ChangeClimbAbility';
import ChangePreferredGym from '../screens/ChangePreferredGym';
import ChangePassword from '../screens/ChangePassword';

const Stack = createStackNavigator();

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
        problemLevel: 5,
    },
    {
        id: '4',
        problemName: 'Bottomless Fries',
        gymLocation: 'Birmingham Boulders',
        problemLevel: 3,
    },
    {
        id: '5',
        problemName: 'All Uphill From Here',
        gymLocation: 'Birmingham Boulders',
        problemLevel: 4,
    },
    {
        id: '6',
        problemName: 'Angry Monkeys',
        gymLocation: 'High Point Birmingham',
        problemLevel: 4,
    },
]


function ProfileScreen({navigation}){

    const [view, setView] = useState(0);

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
                    <TouchableOpacity 
                        onPress={() => {setView(1)}}
                        style={{flex: 1, backgroundColor: '#eb34d8', borderColor: 'black', borderWidth: 1, margin: 3, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'white', fontSize: 25}}>My Problems</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {setView(0)}}
                        style={{flex: 1, backgroundColor: '#eb34d8', borderColor: 'black', borderWidth: 1, margin: 3, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'white', fontSize: 25}}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex: 9}}>
                    {view ? (
                        <FlatList 
                            data={sampleData}
                            renderItem={({item}) => <ProblemCard id={item.id} problemName={item.problemName} gymLocation={item.gymLocation} problemLevel={item.problemLevel} />} 
                            keyExtractor={item => item.id} 
                        />
                    ) : (
                        <View style={{flex: 1, backgroundColor: 'white', margin: 3}}>
                            <TouchableOpacity style={styles.profileEditContainer}
                                onPress={() => navigation.navigate('Change Climbing Ability')}>
                                
                                <Text style={styles.profileEditText}>Change Climbing Ability</Text>

                            </TouchableOpacity>
                            <TouchableOpacity style={styles.profileEditContainer}
                                onPress={() => navigation.navigate('Change Preferred Gym')}>
                                <Text style={styles.profileEditText}>Change Preferred Gym</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.profileEditContainer}
                                onPress={() => navigation.navigate('Change Password')}>
                                <Text style={styles.profileEditText}>Change Password</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.profileEditContainer}>
                                <Text style={styles.profileEditText}>Notification Preferences</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.profileEditContainer}>
                                <Text style={styles.profileEditText}>Apply to be Moderator</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

            </View>

        </SafeAreaView>
    );
}

function MyNavigator() {
  return (
      <Stack.Navigator initialRouteName="Profile Screen">
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Change Climbing Ability" component={ChangeClimbAbility} />
        <Stack.Screen name = "Change Preferred Gym" component={ChangePreferredGym} />
        <Stack.Screen name = "Change Password" component={ChangePassword} />
      </Stack.Navigator>
  );
}

export default function Profile(){
    return (
        <NavigationContainer independent={true}>
      <MyNavigator />
    </NavigationContainer>
        );

}

const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
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
    profileEditContainer: {
        flex: 1, 
        backgroundColor: '#2576f7', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderColor: 'black', 
        borderWidth: 1, 
        margin: 3
    },
    profileEditText: {
        fontSize: 30, 
        color: 'white'
    }
});