import React, { useState } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput,
    Button,
    Alert,
    FlatList
} from 'react-native';
import ProblemCard from '../components/ProblemCard';
import firebase from '../firebase';
import 'firebase/firestore';

console.disableYellowBox = true;

export default function SearchProblem(){
    
    const [text, setText] = useState('Enter Gym Name');
    const [problems, setProblems] = useState([])

    function getData(value) {
        setProblems([]);
        let tempProblems = [];
        console.log("value: ", value.nativeEvent.text);
        firebase.firestore().collection('SearchProblemsCollection')
        .where("gymName", "==", value.nativeEvent.text)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc, i) {
                console.log(doc.id, "=> ", doc.data(), "\n");
                const {
                    grade,
                    gymName,
                    name,
                    user
                } = doc.data();

                tempProblems.push({
                    gymName: gymName,
                    user: user,
                    grade: grade,
                    problemName: name,
                    key: doc.id
                })
            });
            console.log("tempProblems => ", tempProblems);
            setProblems(tempProblems);
        })

        console.log('submitted')
    }

    return(
        <View style={styles.container}>
            <TextInput
                style={styles.inputContainer}
                onSubmitEditing={(text) => getData(text)}
                placeholder="Enter Gym Name"
            />
            <FlatList
                style={styles.listStyle}
                data={problems}
                renderItem={({item}) => <ProblemCard id={item.key} problemName={item.problemName} gymLocation={item.gymName} problemLevel={item.grade} />} 
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
        flexDirection: 'column'
    },
    inputContainer: {
        height: 40,
        borderColor: 'gray', 
        borderWidth: 1, 
        paddingLeft: 5 
    },
    listStyle: {
        flex: 2
    }
});