import React, { useState } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput,
    Button,
    Alert,
    FlatList,
    ActivityIndicator,
    Picker
} from 'react-native';
import ProblemList from '../components/ProblemList';
import firebase from '../firebase';
import 'firebase/firestore';
import 'firebase/storage';

console.disableYellowBox = true;

export default function SearchProblem(){
    
    const [text, setText] = useState('Enter Gym Name');
    const [problems, setProblems] = useState([])
    const [isLoading, setLoading] = useState(false);
    const [selectedValue, setSelectedValue] = useState("date");

    var storage = firebase.storage();

    function queryProblems(value) {
        setLoading(true)
        setProblems([]);
        let tempProblems = [];
        console.log("value: ", value.nativeEvent.text);
        firebase.firestore().collection('problems')
        .where("gym", "==", value.nativeEvent.text)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc, i) {
                console.log(doc.id, "=> ", doc.data(), "\n");
                const {
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
                        date: date,
                    },
                    key: doc.id
                })
            });
            console.log("tempProblems => ", tempProblems);
            setProblems(tempProblems);
            setLoading(false);
        })
    }

    function sortProblems(sortValue) {
        setSelectedValue(sortValue)
        if(sortValue == 'ascendingName') {
            let temp = problems;

            console.log(temp)

            temp.sort(function (a, b) {
                console.log("a => ", a)
                if (a.problemInfo.problemName > b.problemInfo.problemName) {
                    return 1;
                }
                if (a.problemInfo.problemName < b.problemInfo.problemName) {
                    return -1;
                }
                return 0
            })
            setProblems(temp)
        }
        else if(sortValue == 'descendingName') {
            let temp = problems;

            console.log(temp)

            temp.sort(function (a, b) {
                console.log("a => ", a)
                if (a.problemInfo.problemName > b.problemInfo.problemName) {
                    return -1;
                }
                if (a.problemInfo.problemName < b.problemInfo.problemName) {
                    return 1;
                }
                return 0
            })
            setProblems(temp)
        }
        else if(sortValue == 'ascendingDate') {
            let temp = problems;

            console.log(temp)

            temp.sort(function (a, b) {
                console.log("a => ", a)
                if (a.problemInfo.date > b.problemInfo.date) {
                    return -1;
                }
                if (a.problemInfo.date < b.problemInfo.date) {
                    return 1;
                }
                return 0
            })
            setProblems(temp)
        }
        else if(sortValue == 'descendingDate') {
            let temp = problems;

            console.log(temp)

            temp.sort(function (a, b) {
                console.log("a => ", a)
                if (a.problemInfo.date > b.problemInfo.date) {
                    return 1;
                }
                if (a.problemInfo.date < b.problemInfo.date) {
                    return -1;
                }
                return 0
            })
            setProblems(temp)
        }
    }

    return(
        <View style={styles.container}>
            <TextInput
                style={styles.inputContainer}
                onSubmitEditing={(text) => queryProblems(text)}
                placeholder="Enter Gym Name"
            />
            <Picker 
                style={{backgroundColor: 'white', height: 25, width: '97%', marginBottom: 5, alignSelf: 'center'}}
                selectedValue={selectedValue}
                onValueChange={(itemValue) => sortProblems(itemValue)}
            >
                <Picker.Item label="Newest to Oldest" value="ascendingDate" />
                <Picker.Item label="Oldest to Newest" value="descendingDate" />
                <Picker.Item label="Problem Name A to Z" value="ascendingName" />
                <Picker.Item label="Problem Name Z to A" value="descendingName" />
            </Picker>
            {isLoading ? 
                <ActivityIndicator 
                    size='large'
                    color='#EF476F'
                    style={styles.indicator}
                /> : 
                <ProblemList 
                    problems={problems} 
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        backgroundColor: '#118AB2',
        flex: 1,
        flexDirection: 'column',
    },
    inputContainer: {
        height: 40,
        width: '97.5%',
        backgroundColor: 'white', 
        borderColor: 'gray', 
        borderWidth: 1, 
        paddingLeft: 5,
        marginTop: 5,
        alignSelf: 'center',
        marginBottom: 10
    },
    listStyle: {
        flex: 2
    },
    indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});