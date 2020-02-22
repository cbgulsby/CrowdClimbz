import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    TextInput,
    Button,
    Alert 
} from 'react-native';

export default function SearchGym(){
    const [value, onChangeText] = React.useState('Search Gym Here');

    return(
        <View style={styles.container}>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onChangeText(text)}
                value={value}
            />
            <Button
                title='Search'
                color='#7fff00'
                onPress={() => Alert.alert('Button pressed')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        backgroundColor: '#4fb9ff',
        flex: 1
    }
});