import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, FlatList, TextInput } from 'react-native';

export default function ( {navigation,route} ) {
    const {id_, nombre_,descripcion_} = route.params;
   // console.log(route.params);

    const [nombre, setNombre] = useState(null);
    const [descripcion, setDescripcion] = useState(null);
    const [id, setId] = useState(null);


    async function postData(data) {
        console.log(data);
        const response = await fetch('https://www.sit-zac.org.mx/guardar_servicio2/Api', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const json_ = await response.json();
        console.log('respuesta:');
        console.log(json_);
        alert('El servicio se ha actualizado correctamente');
        navigation.navigate('Inicio');
        //return json_;
    }

    useEffect(() => {
        setNombre(nombre_);
        setDescripcion(descripcion_);
        setId(id_);
      },[nombre_])

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
                    title="Actualizar Servicio"
                    onPress={() => postData({ nombre, descripcion ,id})}
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
