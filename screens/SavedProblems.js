import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    SafeAreaView,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';


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
    {
        id: '7',
        problemName: 'Jeon Jungkook',
        gymLocation: 'B.bloc Climbing Gangnam',
        problemLevel: 9,
    },
    {
        id: '8',
        problemName: 'Seagulls Stop It',
        gymLocation: 'Dagobah',
        problemLevel: 2,
    },
    {
        id: '9',
        problemName: 'Space Mountain',
        gymLocation: 'Witt Center',
        problemLevel: 1,
    },
]


export default function SavedProblems(){
    return(
        <SafeAreaView style={styles.container}>
            <Text> Saved Problems </Text>

            <FlatList
                data={sampleData}
                renderItem={({item}) => <Text />} 
                keyExtractor={item => item.id} 
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        backgroundColor: '#4fb9ff',
        flex: 1
    }
});