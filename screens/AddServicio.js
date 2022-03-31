import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, FlatList, TextInput } from 'react-native';

export default function ({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState(null);

    async function postData(data) {
        const response = await fetch('https://www.sit-zac.org.mx/guardar_servicio/Api', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const json_ = await response.json();
        alert('El servicio se ha guardado correctamente');
        setNombre(null);
        setDescripcion(null);
        navigation.navigate('Inicio');
        //return json_;
    }

    return (

        <View style={styles.compo}>
            <View style={styles.componente}>
                <Text>Nombre del servicio:</Text>
                <TextInput style={styles.input}
                 value={nombre}
                 onChangeText={text => setNombre(text)} 
                    placeholder="Ingrese el nombre del servicio"
                />
            </View>
            <View style={styles.componente}>
            <Text>Descripción del servicio:</Text>
                <TextInput style={styles.input}
                     value={descripcion}
                     onChangeText={text => setDescripcion(text)} 
                    placeholder="Ingrese la descripcion del servicio"
                />
            </View>

            <View style={styles.componente}>
           <Button  
                    color="#A3C0FC"
                    title="Agregar Servicio"
                    onPress={() => postData({ nombre, descripcion })}
                    />
            </View>

            

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

    },
    componente: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#cdcd',
        flexDirection: 'column',

    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
});
