import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default ({puntos,name}) => {
  //  const {lat, lng} = puntos.params
  const latitude = parseFloat(puntos.lat);
  const lng = parseFloat(puntos.lng);
  console.log("valor"+latitude);
    return (       
        <MapView style={styles.mapa}
        mapType='hybrid'
        userInterfaceStyle='dark'
         >
            <Marker 
             coordinate={{
            latitude: latitude,
            longitude: lng
            }}
            key="punto"
            title={name}
            pinColor='#000033'/>
        </MapView>      
    )
}
const styles = StyleSheet.create({
    mapa: {
        height: Dimensions.get('window').height - 50,
        width: Dimensions.get('window').width,
    },
});