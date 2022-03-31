import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, FlatList,TextInput } from 'react-native';

export default  function PostsDetail({route, navigation }) {
    const {post_id, title} = route.params
    const [post, setPost] = useState([])

    const fetchUser = async (id) => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/'+id)
        const data = await response.json()
        console.log(data);
        setPost(data)
        //setCargando(false)
    }

    useEffect(() => {
        fetchUser(post_id )
    }, [])


    return (
      <View style={styles.compo}>
       <Text style={styles.texto}>Nombre de el post</Text>
        <Text style={styles.textobody}>{post.title}</Text>
       <Text style={styles.texto}>Texto del post:</Text>
       <Text style={styles.textobody}>{post.body}</Text>
    

        <Button
        style={styles.boton}
          title="Regresar"
          onPress={() => navigation.goBack()} />
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#cdcd',
      alignItems: 'center',
      justifyContent: 'center',
    },
    compo: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#cdcd',
  
    },
    boton: {
      backgroundColor: 'red',
      width: 80,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      borderRadius: 50,
  
    },
    texto: {
      fontSize: 25,
      color: 'black',
      marginBottom: 15,
  
    },
    textobody: {
        fontSize: 30,
        color: 'green',
        marginBottom: 15,
        borderWidth: 1,
    
      },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
  
  });
  