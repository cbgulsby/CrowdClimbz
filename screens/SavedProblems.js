import React, { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    SafeAreaView,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import ProblemCard from '../components/ProblemCard';
import firebase from '../firebase';
import ProblemList from '../components/ProblemList';



export default function SavedProblems(){
    
    const [userSavedProblems, setUserSavedProblems] = useState([]);
    const [view, setView] = useState(0);
    
    const currentUserUID = firebase.auth().currentUser.uid;
    const dbh = firebase.firestore();

    const [flag1, setFlag1] = useState(1);
    const [flag2, setFlag2] = useState(0);

    if (flag1){


    dbh.collection("users").where("id", "==", currentUserUID).get().then(function(querySnapshot) {
        if (!querySnapshot.empty){
            var doc = querySnapshot.docs[0];
            console.log("DOCUMENT DATA:", doc.data());
            setUserSavedProblems(doc.data().saved);
            console.log("Saved Problems: ", userSavedProblems);

        }
        else {
            console.log("No such document");
        }
        setFlag1(0);
        setFlag2(1);
    });

  }
    const [problems, setProblems] = useState([]);
    const [isLoading, setLoading] = useState(false);
    

    const ref = firebase.firestore().collection('problems');

  if (flag2) {

    dbh.collection("problems").get().then(function(querySnapshot) {
      setLoading(true)
      const tempProblems = [];
        querySnapshot.forEach(doc => {
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

          if (userSavedProblems.includes(doc.id))
          {
            tempProblems.push({
              problemInfo: {
                  gymName: gym,
                  user: user,
                  grade: grade,
                  problemName: name,
              },
              key: doc.id
            })
          }
          
        });

        setProblems(tempProblems);
        setLoading(false);

      });
    setFlag2(0);
  }


    return(
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize: 30, color: '#073B4C', fontWeight: 'bold'}}>Saved Problems</Text>

            {isLoading ?
              <ActivityIndicator 
                size='large'
                color='#EF476F'
                style={styles.indicator}
              /> :
              

              <ProblemList problems={problems} />
            }
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        backgroundColor: '#118AB2',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});