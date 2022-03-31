import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { Text, Box, Button, Stack, Icon, Center, NativeBaseProvider, Modal, FormControl, Input, HStack, Spinner, Heading, Circle, Square, Flex, Image,Divider } from "native-base"
import { MaterialIcons } from "@expo/vector-icons"
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as FileSystem from 'expo-file-system';
import Footer from '../../components/Footerl';



LocaleConfig.locales['fr'] = {
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene.', 'Feb.', 'Mar', 'Abr', 'May', 'Jun', 'Jul.', 'Ago', 'Sep.', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    today: 'Hoy\'Hoy'
};
LocaleConfig.defaultLocale = 'fr';


const Boletin = ({ navigation }) => {
    const [dias, setDias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [inicial, setInicial] = useState()
    const [final, setFinal] = useState()

    async function fetchData() {
        const response = await fetch('https://sit-zac.org.mx/getCalendario');
        const json = await response.json();
        for (let dia of json.calendario) {
            if (dia.tipo == "INHABIL") {
                setDias(dias => [dia, ...dias]);
            }
        }

        var today = new Date(),
        date = today.getFullYear();
        setInicial(String(date)+"-01-01");
        setFinal(String(date)+"-12-31");
        setCargando(false);

    }

    useEffect(() => {
        fetchData();
    }, [])

    if (cargando) {
        return (
            <NativeBaseProvider>
                <Center flex={1} px="3">
                    <HStack space={2} alignItems="center">
                        <Spinner accessibilityLabel="Loading posts" />
                        <Heading color="primary.500" fontSize="md">
                            Cargando calendario oficial
                        </Heading>
                    </HStack>
                </Center>
            </NativeBaseProvider>
        )
    } else {
        const markedDates = {};
        dias.forEach((fecha) => {
            if (fecha.observaciones == "SABADOS Y DOMINGOS" || fecha.observaciones == "Sabados y domingos") {
                markedDates[fecha.fecha] = {
                    selected: true, marked: true, selectedColor: '#FF6E6E'
                };
            } else if (fecha.observaciones == "PERIODO VACACIONAL" || fecha.observaciones == "Periodo vacacional") {
                markedDates[fecha.fecha] = {
                    selected: true, marked: true, selectedColor: '#6EFFA1'
                };
            } else {
                markedDates[fecha.fecha] = {
                    selected: true, marked: true, selectedColor: '#6E96FF'

                };
            }
        });

        return (
            <NativeBaseProvider>
                <CalendarList
                    // Specify style for calendar container element. Default = {}
                    style={{
                        borderWidth: 10,
                        borderColor: 'gray',
                        height: 380,

                    }}
                    horizontal={true}
                    minDate={inicial}
                    maxDate={final}                 
                    markingType='multi-period'
                    markedDates={markedDates}
                />
                <Center flex={1} px="3">
                    <Image
                        size={150}
                        resizeMode={"contain"}
                        borderRadius={200}
                        source={{
                            uri: "https://www.sit-zac.org.mx/welcome_template/assets/img/logo_tja.png",
                        }}
                        alt="zacatecas"
                    />
                </Center>
                <Flex h={40} w={80} bt={5} mt={1}>
                        <Flex direction="row" mb="2.5"
                            mt="1.5">
                            <Circle size={5} ml="2.5" bg="#FF6E6E" />
                            <Text italic bold mt="1.5" ml="1.5">
                                Sábados y domingos.
                            </Text>
                        </Flex>
                        <Divider w="100%" />
                        <Flex direction="row" mb="2.5"
                            mt="1.5">
                            <Circle size={5} ml="2.5" bg="#6E96FF" />
                            <Text italic bold mt="1.5" ml="1.5">
                                Otros inhábiles.
                            </Text>
                        </Flex>
                        <Divider w="100%" />
                        <Flex direction="row" mb="2.5"
                            mt="1.5">
                            <Circle size={5} ml="2.5" bg="#6EFFA1" />
                            <Text italic bold mt="1.5" ml="1.5">
                                Periodo vacacional.
                            </Text>
                        </Flex>
                        <Divider w="100%" />

                    </Flex>
                <Footer navigation={navigation }/>           
            </NativeBaseProvider>
        );
    }
}

export default Boletin;