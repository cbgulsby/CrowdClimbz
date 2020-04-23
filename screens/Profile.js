import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
    StyleSheet, 
    View, 
    Text,
    SafeAreaView,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import ProblemCard from '../components/ProblemCard';
import ChangeClimbAbility from '../screens/ChangeClimbAbility';
import ChangePreferredGym from '../screens/ChangePreferredGym';
import ChangePassword from '../screens/ChangePassword';
import firebase from '../firebase';
import ProblemList from '../components/ProblemList';

const Stack = createStackNavigator();



function ProfileScreen({navigation}){

    const [currentUserUsername, setCurrentUser] = useState("");
    const [currentClimbingAbility, setClimbingAbility] = useState("");
    const [currentPreferredGym, setPreferredGym] = useState("");
    //const [sizeProblems, setSizeProblems] = useState(0);

    const [view, setView] = useState(0);
    const [flag1, setFlag1] = useState(1);
    const [flag2, setFlag2] = useState(0);

    const currentUserUID = firebase.auth().currentUser.uid;
    
    const dbh = firebase.firestore();

if (flag1){


    dbh.collection("users").where("id", "==", currentUserUID).get().then(function(querySnapshot) {
        if (!querySnapshot.empty){
            var doc = querySnapshot.docs[0];
            console.log("DOCUMENT DATA:", doc.data());
            setCurrentUser(doc.data().username);
            setClimbingAbility(doc.data().climbingAbility);
            setPreferredGym(doc.data().preferredGym);
        }
        else {
            console.log("No such document");
        }
        setFlag2(1);
        setFlag1(0);
    });
}

    const [problems, setProblems] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const ref = firebase.firestore().collection('problems');

if (flag2)
{

    dbh.collection("problems").where("user", "==", currentUserUsername).get().then(function(querySnapshot) {
        const tempProblems = [];
        if (!querySnapshot.empty){
            var doc = querySnapshot.forEach(doc => {
                const{
                  betaVideo,
                  date,
                  description,
                  grade,
                  gym,
                  inappropriateFlag,
                  name,
                  outOfDateFlag,
                  photo,
                  time,
                  user
                } = doc.data();
                
                tempProblems.push({
                  problemInfo: {
                      gymName: gym,
                      user: user,
                      grade: grade,
                      problemName: name,
                  },
                  key: doc.id
                })
                

              });
              setProblems(tempProblems);
              setLoading(false);
            }
        });
    setFlag2(0);
}


    return(
        <SafeAreaView style={styles.container}>
            
            <View style={styles.profileBar}>
                    <View style={styles.description}>
                        <Text style={{color: 'white', textAlign: 'center', fontSize: 26}}> {currentUserUsername} </Text>
                        <Text style={{color: 'white', textAlign: 'center'}}>Ability: V{currentClimbingAbility}</Text>
                        <Text style={{color: 'white', textAlign: 'center'}}>Preferred Gym: {currentPreferredGym}</Text>
                    </View>
            </View>



            <View style={{backgroundColor: '#118AB2', flex: 6}}>

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <TouchableOpacity 
                        onPress={() => {setView(0)}}
                        style={styles.button}>
                            <Text style={{color: '#073B4C', fontSize: 25}}>My Problems</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {setView(1)}}
                        style={styles.button}>
                            <Text style={{color: '#073B4C', fontSize: 25}}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex: 9}}>
                    {view ? (
                        <View style={{flex: 1, backgroundColor: '#118AB2', margin: 3}}>
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
                            
                        </View>
                    ) : (
                        
                    <ProblemList problems={problems} />
                    
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
        backgroundColor: '#118AB2',
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
        backgroundColor: '#073B4C', 
        flex: 1, 
        margin: 5,
        //padding: 2,
        borderRadius: 5,
        alignContent: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
    },
    profileBar: {
        backgroundColor: '#118AB2', 
        flex: 1, 
        flexDirection: 'row'
    },
    profileEditContainer: {
        flex: 1, 
        backgroundColor: '#FFD166', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderColor: 'black', 
        borderWidth: 1, 
        margin: 3,
        borderRadius: 5
    },
    profileEditText: {
        fontSize: 30, 
        color: '#073B4C'
    },
    button: {
        flex: 1, 
        backgroundColor: '#EF476F', 
        borderColor: 'black', 
        borderWidth: 1, 
        margin: 3, 
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 5
    }

});