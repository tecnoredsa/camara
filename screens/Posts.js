import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, FlatList } from 'react-native';
import ListItem from '../components/ListItem';

export default function ({ route, navigation }) {
    const {user_id, name} = route.params

    const [cargando, setCargando] = useState(true)
    const [posts, setPosts] = useState([])


    const fetchUser = async (id) => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?userId='+id)
        const data = await response.json()
        console.log(data);
        setPosts(data)
        //setCargando(false)
    }

    useEffect(() => {
        fetchUser(user_id )
    }, [])

        
    return (
        <View style={styles.compo}>            
            <Text style={styles.texto}>Posts del usuario {JSON.stringify(name)}</Text>
            <FlatList
                    style={styles.lista}
                    data={posts}
                    keyExtractor={x => x.id}
                    renderItem={({ item }) => <ListItem onPress={() =>navigation.navigate('PostsDetail',{post_id: item.id, title: item.title})}
                    name={item.title} />}
                />
            <Button title="Regresar" onPress={()=>{navigation.goBack()}}/>
        </View>
    )

};

const styles = StyleSheet.create({
    compo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    lista: {
        alignSelf:'stretch'

    },
    texto: {
        fontSize: 20,
        color: 'green',
        marginBottom: 0,
    
      },
});