import React from 'react';
import {
    StyleSheet,
    View,
    FlatList
} from 'react-native';
import Comment from './Comment';

export default function CommentList(props) {
    return (
        <FlatList
            data = {props.comments}
            renderItem = {({item}) =>
                <Comment
                    id = {item.key}
                    commentInfo = {item.commentInfo}
                />
            }
            keyExtractor = {item => item.id}
        />
    )
}