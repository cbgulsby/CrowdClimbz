import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width - 10;

export default function TempProblemCard(props) {
    return (
        <TouchableOpacity style={styles.container} onPress = {() => {
            props.problemInfo.cardNavigation.navigate("ProblemCardScreen", {
                betaVideo: props.problemInfo.betaVideo,
                cardNavigation: props.problemInfo.cardNavigation,
                date: props.problemInfo.date,
                description: props.problemInfo.description,
                grade: props.problemInfo.grade,
                gymName: props.problemInfo.gymName,
                inappropriateFlag: props.problemInfo.inappropriateFlag,
                outOfDateFlag: props.problemInfo.outOfDateFlag,
                problemName: props.problemInfo.problemName,
                photo: props.problemInfo.photo,
                time: props.problemInfo.time,
                user: props.problemInfo.user,
            })}}>
            <View style={styles.leftInnerContainer}>
                <View style={styles.gymNameContainer}>
                    <Text 
                        style={{fontSize: 30, color: '#073B4C'}}>
                        {props.problemInfo.problemName}
                    </Text>
                </View>
                <View style={styles.gymLocationContainer}>
                    <Text 
                        style={{fontSize: 15, color: '#073B4C'}}>
                        {props.problemInfo.gymName}
                    </Text>
                </View>
            </View>
            <View style={styles.rightInnerContainer}>
                <Text 
                    style={{fontSize: 40, color: '#073B4C'}}>
                    V{props.problemInfo.grade}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        backgroundColor: '#06D6A0', 
        borderWidth: 2, 
        borderColor: 'black', 
        margin: 3, 
        height: 100,
        width: screenWidth,
        alignSelf: 'center',
        borderRadius: 5
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