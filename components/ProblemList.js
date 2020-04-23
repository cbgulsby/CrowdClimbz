import React from 'react';
import {
    StyleSheet,
    View,
    FlatList
} from 'react-native';
import ProblemCard from './ProblemCard';

export default function ProblemList(props){
    return(
        <FlatList 
            data={props.problems}
            renderItem={({item}) => 
                <ProblemCard 
                id={item.key} 
                problemInfo={item.problemInfo} 
            />}
            keyExtractor={item => item.id}
        />
    );
}