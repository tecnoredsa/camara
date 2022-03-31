import React, { useState, useEffect } from 'react';
import { CheckIcon, WarningOutlineIcon, FormControl, Select, Fab, HStack, VStack, Text, Avatar, Heading, Divider, FlatList, Box, Input, Icon, Stack, Center, NativeBaseProvider, Button, Badge, Spacer, Spinner, Hidden } from "native-base";
import { Keyboard, StyleSheet, TouchableOpacity, TouchableHighlight, View, Dimensions, ActivityIndicator, ScrollView, RefreshControl, Linking } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"
import * as global from "../../components/Global";
import Footer from '../../components/Footerl';
import { FontAwesome } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker'
import Loading from '../../components/Cargando';


export default function Expedientes({ navigation }) {

    const [cargando, setCargando] = useState(false)
    const [cargandoLibro, setCargandoLibro] = useState(false)
    const [inicial, setInicial] = useState('2020-01-01')
    const [final, setFinal] = useState()
    const [inicio, setInicio] = useState()
    const [fin, setFin] = useState()
    const [año, setAño] = useState()

    const [error_inicio, setErrorInicio] = useState(null);
    const [error_fin, setErrorFin] = useState(null);
    const [error_año, setErrorAño] = useState(null);
    const [years, setYears] = useState([]);

    async function traer_años() {
        var today = new Date(),
            date = today.getFullYear();
        setFinal(String(date) + "-12-31");

        const response = await fetch('https://www.sit-zac.org.mx/traer_años');
        const json = await response.json();
        setYears(json.years);
        setCargando(false);
    }

    const libroGobierno = async () => {
        setCargandoLibro(true);
        const data = { 'email': global.EMAIL, 'password': global.PASS, 'inicio': inicio, 'fin': fin, 'year': año };
       // console.log(data);
        const response = await fetch('https://www.sit-zac.org.mx/guardar_servicio_estadisticas_libro_electronico', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const result = await response.json();
        //console.log(result);
        setCargandoLibro(false);
        Linking.openURL('https://www.sit-zac.org.mx/' + result.pdf);
    }


    function cambiaAño(value) {
        setAño(value);
    }

    useEffect(() => {
        traer_años();
    }, [])


    const onSubmit = () => {
        if (inicio === undefined || inicio === null) {
            setErrorInicio('Fecha de inicio requerida');
            return false;
        }

        if (fin === undefined || fin === null) {
            setErrorFin('Fecha de termino requerida');
            return false;
        }

        if (año === undefined || año === null) {
            setErrorAño('Año requerido');
            return false;
        }

        if (fin < inicio) {
            setErrorInicio('La fecha de inicio no puede ser mayor que la del término');
            return false;

        }

        setErrorFin(null);
        setErrorInicio(null);
        setErrorAño(null);
        libroGobierno();
    };

    if (cargando) {
        return (
            <Loading texto={'Cargando'} />
        )
    } else {
        return (
            <NativeBaseProvider>
                <Center px="3">
                    <Badge colorScheme="info" mt="4" mb="4" variant="outline">Generar Libro de Gobierno Electrónico</Badge>
                    <Divider />
                    <Stack space={4} w="100%" mb="2.5" mt="1.5" alignItems="center">
                        <FormControl isRequired>
                            <FormControl.Label>Fecha de inicio</FormControl.Label>
                            <DatePicker
                                style={{ width: '100%' }}
                                date={inicio}
                                mode="date"
                                placeholder="Ingrese la fecha de inicio"
                                format="YYYY-MM-DD"
                                minDate={inicial}
                                maxDate={final}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => { setInicio(date) }}
                            />
                            <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                                {error_inicio}
                            </FormControl.HelperText>
                        </FormControl>
                        <Divider />
                        <FormControl isRequired>
                            <FormControl.Label>Fecha de término</FormControl.Label>
                            <DatePicker
                                style={{ width: '100%' }}
                                date={fin}
                                mode="date"
                                placeholder="Ingrese la fecha de término"
                                format="YYYY-MM-DD"
                                minDate={inicial}
                                maxDate={final}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => { setFin(date) }}
                            />
                            <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                                {error_fin}
                            </FormControl.HelperText>
                        </FormControl>

                        <Divider />
                        <FormControl isRequired>
                            <FormControl.Label>Seleccione un año</FormControl.Label>
                            <Box w="100%">
                                <Select selectedValue={año} minWidth="200" accessibilityLabel="Seleccione un año" placeholder="Seleccione un año" _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />
                                }} mt={1} onValueChange={itemValue => cambiaAño(itemValue)}>
                                    {years.map(year => <Select.Item key={String(year.año)} label={String(year.año)} value={String(year.año)} />)}
                                </Select>
                            </Box>
                            <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                                {error_año}
                            </FormControl.HelperText>
                        </FormControl>
                        <Divider />


                        <Button onPress={onSubmit} mt="5" colorScheme="cyan">
                            Generar
                        </Button>
                        <Divider />

                        <Divider />


                    </Stack>

                </Center>
                {cargandoLibro == true &&
                    <Loading style={styles.loading} texto={'Generando libro'} />
                }
            </NativeBaseProvider>
        )
    }

}


const styles = StyleSheet.create({
    scroll: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 180,

    },
    loading: {
        justifyContent: 'center',
        textAlign: 'center',

    },
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#800000',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
})