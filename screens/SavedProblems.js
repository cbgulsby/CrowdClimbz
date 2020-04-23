import React, { useState, useEffect } from 'react';
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
import firebase from '../firebase';
import ProblemList from '../components/ProblemList';



export default function SavedProblems(){
    
    const [userSavedProblems, setUserSavedProblems] = useState([]);
    const [view, setView] = useState(0);
    
    const currentUserUID = firebase.auth().currentUser.uid;
    const dbh = firebase.firestore();

    dbh.collection("users").where("id", "==", currentUserUID).get().then(function(querySnapshot) {
        if (!querySnapshot.empty){
            var doc = querySnapshot.docs[0];
            console.log("DOCUMENT DATA:", doc.data());
            setUserSavedProblems(doc.data().saved);
            console.log("Saved Problems: ", userSavedProblems);
            //if (userSavedProblems.length() == 0) setView(1);

        }
        else {
            console.log("No such document");
        }
        setFlag(1);
    });

    const [problems, setProblems] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [flag, setFlag] = useState(0);

    const ref = firebase.firestore().collection('problems');

  if (flag) {

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