import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';

export default function ProblemCard(props) {
    return (
        <TouchableOpacity style={{backgroundColor: '#2576f7', borderWidth: 1, borderColor: 'black', margin: 3, height: 100}}>
            <Text>{props.name}</Text>
        </TouchableOpacity>
    );
}