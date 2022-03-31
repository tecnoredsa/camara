import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, FlatList } from 'react-native';
import ListItem from '../components/ListItem';

export default function ({ navigation }) {
    const [cargando, setCargando] = useState(true)
    const [users, setUser] = useState([])

    const fetchUser = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        setUser(data)
        setCargando(false)
    }

    useEffect(() => {
        fetchUser()
    }, [])



    return (

        <View style={styles.compo}>
            {cargando ? <View>
                <Text>Cargando...</Text>
                <ActivityIndicator size='large' color='#000fff'></ActivityIndicator>
            </View> :
                <FlatList
                    style={styles.lista}
                    data={users}
                    keyExtractor={x => x.id}
                    renderItem={({ item }) => <ListItem onPress={() =>navigation.navigate('Posts',{user_id: item.id, name: item.name})}
                    name={item.name} />}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    lista: {
        alignSelf:'stretch'

    },
    compo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cdcd',

    },
});
