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


const Boletin = (props) => {
    const { ValidarCita, dias, setDias, cargando, setCargando, inicial, setInicial, final, setFinal, fecha, setFecha, hora, setHora,
        horas, setHoras, tramites, setTramites, tramite, setTramite, error_fecha, setErrorFecha, error_hora, setErrorHora, error_tramite, setErrorTramite, error_guardar,guardando } = props;

    const [cargando_horas, setCargandoH] = useState(true);


    async function ingresarHoras(fecha_aux) {
        setCargandoH(false);
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
        setCargandoH(true);
    }

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
                    Seleccione un día para su cita
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

                    {cargando_horas == true ?
                        <Box w="3/4" alignItems="center" maxW="300">
                            <Select selectedValue={hora} minWidth="200" accessibilityLabel="Seleccione una hora" placeholder="Seleccione una hora" _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />
                            }} mt={1} onValueChange={itemValue => setHora(itemValue)}>
                                {horas.map(hora => <Select.Item key={hora} label={hora} value={hora} />)}
                            </Select>
                        </Box>
                        :
                        <Center mt="3" flex={1} px="3">
                            <HStack space={3} alignItems="center">
                                <Spinner accessibilityLabel="Loading posts" />
                                <Heading color="primary.500" fontSize="md">
                                    Buscando horas disponibles...
                                </Heading>
                            </HStack>
                        </Center>
                    }

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
                <FormControl >
                    <Center>
                        <Button onPress={() => ValidarCita()} mt="5" colorScheme="cyan">
                            Guardar
                        </Button>
                    </Center>
                    <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                        {error_guardar}
                    </FormControl.HelperText>
                    {guardando &&
                        <Center flex={1} px="3">
                            <HStack space={2} alignItems="center">
                                <Spinner accessibilityLabel="Loading posts" />
                                <Heading color="primary.500" fontSize="md">
                                    Guardando cita...
                                </Heading>
                            </HStack>
                        </Center>
                    }
                </FormControl>

            </Flex>

        </NativeBaseProvider>
    );
}

export default Boletin;