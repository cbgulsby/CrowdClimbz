import React, {useState, useEffect} from 'react';
import { 
  View, 
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import ProblemList from '../components/ProblemList';
import firebase from '../firebase';
console.disableYellowBox = true;

export default function Home({navigation}) {
  const [problems, setProblems] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const ref = firebase.firestore().collection('problems');

  useEffect(() => {
    setLoading(true)
    return ref.onSnapshot(querySnapshot => {
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

      tempProblems.sort(function (a, b) {
        if (a.problemInfo.date >= b.problemInfo.date) {
          return 1;
        }
        else {
          return -1;
        }
      })

      setProblems(tempProblems);
      setLoading(false);
    });
  }, []);


  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30, color: '#073B4C', fontWeight: 'bold'}}>Welcome to CrowdClimbz!</Text>
      {isLoading ?
        <ActivityIndicator 
          size='large'
          color='#EF476F'
          style={styles.indicator}
        /> :
        <ProblemList problems={problems} />
      }
    </View>
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