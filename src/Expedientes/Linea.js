import Timeline from 'react-native-timeline-flatlist'
import React, { useState, useEffect } from 'react';
import { Box, Heading, AspectRatio, Image, Text, Button, Center, Icon, HStack, ScrollView, Stack, NativeBaseProvider, Link } from "native-base"
import Footer from '../../components/Footerl';
import Loading from '../../components/Cargando';
import { Ionicons } from "@expo/vector-icons"

export default function Linea({ route, navigation }) {
    const [historial, setHistorial] = useState([])
    const [fecha, setFecha] = useState()
    const [description, setDescription] = useState()
    const [tipo, setTipo] = useState()
    const [aux, setAux] = useState()
    const [datos_aux, setDatos] = useState([])
    const [cargando, setCargando] = useState(true)

    const { datos, id_expediente, id_recurso } = route.params;

    useEffect(() => {
        setCargando(true);
        setHistorial([]);
        setDatos(datos);
        datos.forEach(dato => {
            const datox = { time: dato[0], title: dato[1], description: dato[2], tipo: dato[3] };
            setHistorial(historial => [...historial, datox])
        });
        setCargando(false);
    }, [id_expediente], [id_recurso])



    function _alertIndex(data) {
        const limite = "2";
        const separador = "//";
        const arregloDeSubCadenas = data.split(separador, limite);
        const id = arregloDeSubCadenas[0];
        const tipo = arregloDeSubCadenas[1];
        if (tipo == "PROMOCION") {
            navigation.navigate('Promocion', { id: id })
            //navigation.navigate('Promocion');  
        } else if (tipo == "ACUERDO") {
            navigation.navigate('Acuerdo', { id: id })
        }
        else if (tipo == "SENTENCIA") {
            navigation.navigate('Sentencia', { id: id })
        }
        else if (tipo == "NOTIFICACIONA") {
            navigation.navigate('NotAcuerdo', { id: id })
        }
        else if (tipo == "NOTIFICACIONS") {
            navigation.navigate('NotSentencia', { id: id })
        }
        else if (tipo == "RECURSO") {
            navigation.navigate('Recurso', { id: id })
        }
    }

    if (cargando) {
        return (
            <Loading texto={'Cargando linea del tiempo'} />
        )
    } else {
        return (
            <NativeBaseProvider>
                <Timeline
                    data={historial}
                    circleSize={20}
                    lineWidth={1}
                    renderFullLine={true}
                    onEventPress={(item) =>
                        // alert(`${item.tipo} at ${item.time}`) &
                        _alertIndex(item.tipo)
                    }
                    circleColor='rgb(151, 132, 102)'
                    lineColor='#rgb(151, 132, 102)'
                    timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
                    timeStyle={{ textAlign: 'center', backgroundColor: '#rgb(151, 132, 102)', color: 'white', padding: 5, borderRadius: 13 }}
                    descriptionStyle={{ color: 'gray' }}
                    options={{
                        style: { paddingTop: 5 }
                    }}
                    isUsingFlatlist={true}
                />
                {id_recurso == null ?
                    <Button
                        onPress={() => navigation.navigate('DetalleExpedientes', { id_expediente: id_expediente })}
                        colorScheme="#rgba(255, 255, 255, 0.6)"
                        endIcon={<Icon as={Ionicons} name="arrow-back-outline" size="sm" />}
                    >
                        Volver al expediente
                    </Button>
                    :
                    <Button
                        onPress={() => navigation.navigate('Recurso', { id: id_recurso })}
                        colorScheme="#rgba(255, 255, 255, 0.6)"
                        endIcon={<Icon as={Ionicons} name="arrow-back-outline" size="sm" />}
                    >
                        Volver al recurso
                    </Button>

                }

                <Footer navigation={navigation} />
            </NativeBaseProvider>

        )
    }
}
