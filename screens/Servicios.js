import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, FlatList, TouchableHighlight } from 'react-native';
import ListItem from '../components/ListItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditServicio from './EditServicio';


export default function ({ navigation }) {
    const [cargando, setCargando] = useState(true)
    const [servicios, setServicios] = useState([])

    const fetchUser = async () => {
        const response = await fetch('https://www.sit-zac.org.mx/servicios_tribunalApp')
        const data = await response.json()
        setServicios(data.servicios)
        setCargando(false)
    }

    async function deleteService(id) {
        const response = await fetch('https://www.sit-zac.org.mx/delete_servicio/'+id)
        const data = await response.json()
        fetchUser();
        setCargando(false)
        alert('El servicio se ha eliminado correctamente');
        //return json_;
    }

    useEffect(() => {
        fetch('https://www.sit-zac.org.mx/servicios_tribunalApp')
          .then(res => res.json())
          .then(data => {
            setServicios(data.servicios)
            setCargando(false)
          })
      },[servicios])


/*
    useEffect(async () => {
        alert('hola');
        const items = await  fetchUser()
    }, [])
    */



    return (

        <View style={styles.compo}>
            {cargando ? <View>
                <Text>Cargando...</Text>
                <ActivityIndicator size='large' color='#000fff'></ActivityIndicator>
            </View> :
                <FlatList
                    style={styles.lista}
                    data={servicios}
                    keyExtractor={x => x.id}
                    renderItem={({ item }) =>
                        <View style={styles.componente}>
                            <Text style={styles.item}>{item.nombre}</Text>
                            <TouchableHighlight style={styles.button} onPress={() =>navigation.navigate('EditServicio',{id_: item.id, nombre_: item.nombre, descripcion_: item.descripcion})}>
                                <View style={styles.icon}>
                                    <Ionicons name='pencil-outline' />
                                    <Text>Editar</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight style={styles.button2}   onPress={() => deleteService( item.id )}>
                                <View  style={styles.icon}>
                                    <Ionicons name='trash' />
                                    <Text>Eliminar</Text>
                                </View>
                            </TouchableHighlight>
                        </View>}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    lista: {
        alignSelf: 'stretch'

    },
    compo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cdcd',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        color: 'black',

    },
    componente:{
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
    justifyContent:'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
padding:1

    },

    icon:{
        flex: 1,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:20
    },
    item: {
        marginLeft: 40,
        marginRight: 40,
        padding: 20,
        fontSize: 18,
        color: 'black',
    },
    button: {
       marginRight: 40,
  marginLeft: 40,
  marginTop: 10,
  paddingTop: 20,
  paddingBottom: 20,
  backgroundColor: '#68a0cf',
  borderRadius: 30,
  borderWidth: 1,
  borderColor: '#fff',
      },
      button2: {
        marginRight: 40,
   marginLeft: 40,
   marginTop: 10,
   paddingTop: 20,
   paddingBottom: 20,
   backgroundColor: '#FFA7A7',
   borderRadius: 50,
   borderWidth: 1,
   borderColor: '#fff',
       },
});
