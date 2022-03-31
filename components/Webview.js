import React, { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { Text, NativeBaseProvider } from "native-base";
import { View,  ActivityIndicator, } from "react-native";

export default function MyWeb({ route, navigation }) {
    const { enlace, id } = route.params
    const [url, setUrl] = useState(null);
    const [cargando, setCargando] = useState(false)



    useEffect(() => {
        setCargando(true);
        if (enlace != null) {
            setUrl(enlace)
            setCargando(false);
        } else {
            setUrl(null)
            setCargando(false);
        }
    }, [id])



    if (cargando) {
        return (
            <NativeBaseProvider>
                <View>
                    <Text>Cargando enlace...</Text>
                    <ActivityIndicator size="large" color="#0000f" />
                </View>
            </NativeBaseProvider>

        )
    } else {
        return (
            <WebView
                source={{
                    uri: url
                }}
                style={{ marginTop: 20 }}
            />
        );
    }
}