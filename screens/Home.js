import React, {useState, useEffect} from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  FlatList
} from 'react-native';
import ProblemCard from '../components/ProblemCard';
import firebase from '../firebase';
console.disableYellowBox = true;

export default function Home({navigation}) {
  const [problems, setProblems] = useState([]);
  const ref = firebase.firestore().collection('problems');

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const tempProblems = [];
      querySnapshot.forEach(doc => {
        const{
          grade,
          gym,
          name,
          user
        } = doc.data();

        tempProblems.push({
          gym: gym,
          user: user,
          grade: grade,
          name: name,
          id: doc.id
        });
      });
      setProblems(tempProblems);
    });
  }, []);


  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30, color: 'white'}}>Welcome to CrowdClimbz!</Text>
      <FlatList
         style={{width: 350}}
         data={problems}
         renderItem={({item}) => <ProblemCard id={item.id} problemName={item.name} gymLocation={item.gym} problemLevel={item.grade} />} 
         keyExtractor={item => item.id} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      paddingTop: 24,
      backgroundColor: '#4fb9ff',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }
});