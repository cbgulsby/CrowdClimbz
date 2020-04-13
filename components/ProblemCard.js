import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProblemCard(props, {navigation}) {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.leftInnerContainer}>
                <View style={styles.gymNameContainer}>
                    <Text style={{fontSize: 30, color: 'white'}}>{props.problemName}</Text>
                </View>
                <View style={styles.gymLocationContainer}>
                    <Text style={{fontSize: 15, color: 'white'}}>{props.gymLocation}</Text>
                </View>
            </View>
            <View style={styles.rightInnerContainer}>
                <Text style={{fontSize: 40, color: 'white'}}>V{props.problemLevel}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        backgroundColor: '#2576f7', 
        borderWidth: 1, 
        borderColor: 'black', 
        margin: 3, 
        height: 100
    },
    leftInnerContainer: {
        flex: 3
    },
    rightInnerContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    gymNameContainer: {
        flex: 1,
        justifyContent: 'flex-end', 
        paddingLeft: 5
    },
    gymLocationContainer: {
        flex: 1, 
        justifyContent: 'flex-start', 
        paddingLeft: 5
    }
})