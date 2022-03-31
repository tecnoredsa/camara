import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { Alert, Select, Text, CheckIcon, Box, Divider, TextArea, ScrollView, Button, Stack, Icon, Center, NativeBaseProvider, Modal, FormControl, Input, HStack, Spinner, Heading, Circle, Square, Flex, Image } from "native-base"
import { MaterialIcons } from "@expo/vector-icons"
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as FileSystem from 'expo-file-system';
import Footer from '../../components/Footerl';
import * as global from "../../components/Global";
import MsjError from '../../components/AlertWarning';

LocaleConfig.locales['fr'] = {
    monthNames: ['Enero', 'Febero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene.', 'Feb.', 'Mar', 'Abr', 'May', 'Jun', 'Jul.', 'Ago', 'Sep.', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    today: 'Hoy\'Hoy'
};
LocaleConfig.defaultLocale = 'fr';


const Boletin = ({ navigation, route }) => {
    const [dias, setDias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [inicial, setInicial] = useState()
    const [final, setFinal] = useState()
    const [fecha, setFecha] = useState()
    const [hora, setHora] = useState();
    const [horas, setHoras] = useState([]);
    const [tramites, setTramites] = useState([]);
    const [tramite, setTramite] = useState([]);
    //errores
    const [error_fecha, setErrorFecha] = useState(null);
    const [error_hora, setErrorHora] = useState(null);
    const [error_tramite, setErrorTramite] = useState(null);
    const [validacion, setValidacion] = useState(false);


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
        setInicial(String(today));
        setFinal(String(date) + "-12-31");
        setCargando(false);
    }

    async function ValidarCita() {
        if (fecha == null || fecha == "") {
            setErrorFecha('Seleccione una fecha');
        } else {
            setErrorFecha('');
            if (hora == null || hora == "") {
                setErrorHora('Seleccione un horario');
            } else {
                setErrorHora('');
                if (tramite == null || tramite == "") {
                    setErrorTramite('Seleccione un tipo de tramite');
                } else {
                    setErrorTramite('');
                    guardarCita();
                }
            }
        }
    }

    async function guardarCita() {
        const data = { 'email': global.EMAIL, 'password': global.PASS, 'fecha': fecha, 'hora': hora, 'id_tramite': tramite };
        const response = await fetch('https://www.sit-zac.org.mx/guardar_servicio_guardar_cita', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const json_ = await response.json();
        alert('Cita guardada correctamente');
        route.params.setCount(route.params.count + 1);
        navigation.navigate('DetalleCitas', { id_cita: json_.cita.id });
    }

    async function ingresarHoras(fecha_aux) {
        setFecha(fecha_aux);
        const data = { 'email': global.EMAIL, 'password': global.PASS, 'fecha': fecha_aux };
        const response = await fetch('https://www.sit-zac.org.mx/guardar_servicio_valida_dia_cita', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const json_ = await response.json();
        setHoras(json_);
    }



    async function validarCita() {
        setCargando(true);
        const data = { 'email': global.EMAIL, 'password': global.PASS };
        const response = await fetch('https://www.sit-zac.org.mx/guardar_servicio_valida_cita', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const json_ = await response.json();
        if (json_.tipos_tramites) {
            setTramites(json_.tipos_tramites)
            setValidacion(false);
            fetchData();
        } else if (json_ == 1) {
            setValidacion(true);
            setCargando(false);
            //  alert('Lo sentimos cuentas con una cita pendiente, necesitas cancelarla para poder volver a solicitar otra cita');
        } else if (json_ == 2) {
            setValidacion(true);
            setCargando(false);
            //alert('Lo sentimos cuentas con 2 inasistencias en los ultimos 15 días, necesitas esperar un lapso de 15 días naturales, desde la última cita con inasistencia para poder volver a solicitar otra cita');
        }
    }

    useEffect(() => {
        validarCita();
    }, [route.params.count])

    if (cargando) {
        return (
            <NativeBaseProvider>

                <Center flex={1} px="3">
                    <HStack space={2} alignItems="center">
                        <Spinner accessibilityLabel="Loading posts" />
                        <Heading color="primary.500" fontSize="md">
                            Validando usuario...
                        </Heading>
                    </HStack>
                </Center>
            </NativeBaseProvider>
        )
    } else if (validacion) {
        return (
            <NativeBaseProvider>
                <Center flex={1} px="3">
                    <MsjError ruta={'MisCitas'} navigation={navigation} title={'Lo sentimos!...'} texto={'Cuentas con una cita pendiente, necesitas cancelarla para poder volver a solicitar otra cita.'} tipo={'danger'} />
                    <Button
                        onPress={() => navigation.navigate('MisCitas')}
                        mt="2"
                        colorScheme="#rgba(255, 255, 255, 0.6)"
                        endIcon={<Icon as={Ionicons} name="arrow-back-outline" size="sm" />}
                    >
                        Volver a mi citas
                    </Button>
                </Center>
                <Footer navigation={navigation} />
            </NativeBaseProvider>
        )

    } else {
        const markedDates = {};
        dias.forEach((fecha) => {
            if (fecha.observaciones == "SABADOS Y DOMINGOS" || fecha.observaciones == "Sabados y domingos") {
                markedDates[fecha.fecha] = {
                    disabled: true, disableTouchEvent: true,
                    marked: true, selectedColor: '#FF6E6E'
                };
            } else if (fecha.observaciones == "PERIODO VACACIONAL" || fecha.observaciones == "Periodo vacacional") {
                markedDates[fecha.fecha] = {
                    disabled: true, disableTouchEvent: true, marked: true, selectedColor: '#6EFFA1'
                };
            } else {
                markedDates[fecha.fecha] = {
                    disabled: true, disableTouchEvent: true, marked: true, selectedColor: '#6E96FF'

                };
            }
        });

        return (
            <NativeBaseProvider>
                <Center>
                    <Text italic bold mt="1.5" ml="1.5">
                        Seleccione un dia para su cita
                    </Text>
                </Center>
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
                    onDayPress={day => {
                        ingresarHoras(day.dateString);
                    }}
                />
                <ScrollView maxW="100%" h="100%" _contentContainerStyle={{
                    px: "20px",
                    mb: "4",
                    minW: "72"
                }}>
                    <Flex >
                        <FormControl isRequired>
                            <Text italic bold mt="2.5" ml="1.5">
                                Fecha seleccionada:
                            </Text>
                            <Box w="3/4" mt="1.5" alignItems="center" maxW="300">
                                <TextArea isDisabled h={10} placeholder="Seleccione una fecha" w="200" maxW="300">{fecha}</TextArea>
                            </Box>
                            <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                                {error_fecha}
                            </FormControl.HelperText>
                        </FormControl>
                        <Divider my="2" />


                        <FormControl isRequired>
                            <Text italic bold mt="1.5" ml="1.5">
                                Seleccione una hora:
                            </Text>

                            <Box w="3/4" alignItems="center" maxW="300">
                                <Select selectedValue={hora} minWidth="200" accessibilityLabel="Seleccione una hora" placeholder="Seleccione una hora" _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />
                                }} mt={1} onValueChange={itemValue => setHora(itemValue)}>
                                    {horas.map(hora => <Select.Item key={hora} label={hora} value={hora} />)}
                                </Select>
                            </Box>
                            <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                                {error_hora}
                            </FormControl.HelperText>
                        </FormControl>
                        <Divider my="2" />

                        <FormControl isRequired>
                            <Text italic bold mt="1.5" ml="1.5">
                                Tipo de tramite
                            </Text>
                            <Box w="3/4" alignItems="center" maxW="300">
                                <Select selectedValue={tramite} minWidth="200" accessibilityLabel="Seleccione el tipo de tramite" placeholder="Seleccione el tipo de tramite" _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />
                                }} mt={1} onValueChange={itemValue => setTramite(itemValue)}>
                                    {tramites.map(tramite => <Select.Item key={tramite.id} label={tramite.tipo_cita} value={tramite.id} />)}
                                </Select>
                            </Box>
                            <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                                {error_tramite}
                            </FormControl.HelperText>
                        </FormControl>
                        <Divider my="2" />
                        <Center>
                            <Button onPress={() => ValidarCita()} size="sm" colorScheme="primary">
                                Guardar
                            </Button>
                        </Center>


                    </Flex>
                </ScrollView>
                <Footer navigation={navigation} />
            </NativeBaseProvider>
        );
    }
}

export default Boletin;