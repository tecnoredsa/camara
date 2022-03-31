import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, FlatList, TextInput } from 'react-native';
import Mapa from '../components/Mapa';

export default function Maps({ route, navigation }) {
    const { user_id, name } = route.params
    const [coordenadas, setCoords] = useState([])
    const [cargando, setCargando] = useState(true)

    const fetchUser = async (id) => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/' + id)
        const data = await response.json()
        setCoords(data.address.geo)
        setCargando(false)
        //setCargando(false)
    }

    useEffect(() => {
        fetchUser(user_id)
    }, [])


    return (
        <View style={styles.compo}>
            {cargando ? <View>
                <Text>Cargando...</Text>
                <ActivityIndicator size='large' color='#000fff'></ActivityIndicator>
            </View>
                :
                <View style={styles.compo}>
                    <Text style={styles.texto}>Mostrando la ubicación de:{JSON.stringify(name)}</Text>
                    <Text >Latitud : {coordenadas.lat} Longitud : {coordenadas.lng}</Text>
                    <Mapa
                        puntos={coordenadas}
                        name={name}
                    />
                    <Button
                        style={styles.boton}
                        title="Regresar"
                        onPress={() => navigation.goBack()} />
                </View>
            }
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
