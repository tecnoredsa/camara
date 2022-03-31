import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, FlatList, Pressable } from 'react-native';

export default function ({ name, onPress }) {
    return(
    <Pressable
    onPress={onPress}
    >
        <Text style={styles.item}>{name}</Text>
    </Pressable>
    )

};

const styles = StyleSheet.create({
    item: {
       backgroundColor: "#dfdf",
        padding: 20,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        color: 'black',
    },
    press: {
        paddingHorizontal: 15,
        justifyContent: 'center',
        height:40,
        color: 'black',

    },
});