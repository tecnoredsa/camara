import React, { useState, useEffect } from 'react';
import { Linking } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { Button, Stack, Icon, Center, NativeBaseProvider, Modal, FormControl, Flex, Circle, Text,Divider} from "native-base"
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as FileSystem from 'expo-file-system';
import Footer from '../../components/Footerl';
import Loading from "../../components/Cargando";

 

LocaleConfig.locales['fr'] = {
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene.', 'Feb.', 'Mar', 'Abr', 'May', 'Jun', 'Jul.', 'Ago', 'Sep.', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    today: 'Hoy\'Hoy'
};
LocaleConfig.defaultLocale = 'fr';


const Boletin = ({ navigation }) => {
    const [showModal, setShowModal] = useState(false)
    const [showModalCancel, setShowModalCancel] = useState(false)
    const [dias, setDias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [inicial, setInicial] = useState()
    const [final, setFinal] = useState()

    async function validaDias() {
        const response = await fetch('https://sit-zac.org.mx/getCalendario');
        const json = await response.json();
        for (let dia of json.calendario) {
            if (dia.tipo == "INHABIL") {
                setDias(dias => [dia, ...dias]);
            }
        }

        var today = new Date(),
            date = today.getFullYear();
        setInicial(String(date) + "-01-01");
        setFinal(String(today));
        setCargando(false);

    }

    useEffect(() => {
        validaDias();
    }, [])


    async function fetchData(data) {
        const response = await fetch('https://www.sit-zac.org.mx/getBoletin/' + data);
        const json = await response.json();
        if (json.boletin_principal == null) {
            setBoletin(null);
            setShowModal(false);
            setShowModalCancel(true);
        } else {
            setBoletin(json.boletin_principal.boletin);
            setShowModal(true);
            setShowModalCancel(false);
        }
        // return json
    }

    const [boletin, setBoletin] = useState(null);

    async function descargar_boletin(url) {
        setShowModal(false);
        FileSystem.downloadAsync(
            url,
            FileSystem.documentDirectory + 'small.pdf'
        )
            .then(({ uri }) => {
                console.log('Finished downloading to ', uri);
            })
            .catch(error => {
                console.error(error);
            });
    }



    if (cargando) {
        return (
            <Loading texto={'Cargando boletín electrónico'} />
        )
    } else {
        const markedDates = {};
        dias.forEach((fecha) => {
            if (fecha.observaciones == "SABADOS Y DOMINGOS" || fecha.observaciones == "Sabados y domingos") {
                markedDates[fecha.fecha] = {
                    selected: true, marked: true, disableTouchEvent: true, selectedColor: '#FF6E6E'
                };
            } else if (fecha.observaciones == "PERIODO VACACIONAL" || fecha.observaciones == "Periodo vacacional") {
                markedDates[fecha.fecha] = {
                    selected: true, marked: true, disableTouchEvent: true, selectedColor: '#6EFFA1'
                };
            } else {
                markedDates[fecha.fecha] = {
                    selected: true, marked: true, disableTouchEvent: true, selectedColor: '#6E96FF'

                };
            }
        });
        return (
            <NativeBaseProvider>
                <Stack mb="15%" mt="1.5" direction="column" space={3}>
                    <Center mb="2.5">
                        <Text bold>Selecciona el día para consultar el boletín electrónico</Text>

                    </Center>
                    <Divider w="100%" />

                    <CalendarList
                        // Specify style for calendar container element. Default = {}
                        style={{
                            borderWidth: 10,
                            borderColor: 'gray',
                            height: 370,

                        }}
                        horizontal={true}
                        minDate={inicial}
                        maxDate={final}
                        onDayPress={(day) => { fetchData(day.dateString); }}
                        markingType='multi-period'
                        markedDates={markedDates}

                    />
                    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                        <Modal.Content maxWidth="400px">
                            <Modal.CloseButton />
                            <Modal.Header>Se ha encontrado un boletín electrónico publicado en el día seleccionado</Modal.Header>
                            <Modal.Body>
                                <FormControl>
                                    <Button
                                        variant="subtle"
                                        endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                    >
                                        Descargar {boletin}
                                    </Button>

                                </FormControl>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button.Group space={2}>
                                    <Button
                                        variant="ghost"
                                        colorScheme="blueGray"
                                        onPress={() => {
                                            setShowModal(false)
                                        }}
                                    >
                                        Cerrar
                                    </Button>
                                    <Button
                                        onPress={() => Linking.openURL('https://www.sit-zac.org.mx/BOLETINELECTRONICO/' + boletin)}
                                    >
                                        Ver boletin
                                    </Button>
                                </Button.Group>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>

                    <Modal isOpen={showModalCancel} onClose={() => setShowModalCancel(false)}>
                        <Modal.Content maxWidth="400px">
                            <Modal.CloseButton />
                            <Modal.Header>Lo sentimos</Modal.Header>
                            <Modal.Body>
                                <FormControl>

                                    <Text bold>No se ha encontrado ningun boletin electronico publicado en el dia seleccionado</Text>
                                </FormControl>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button.Group space={2}>
                                    <Button
                                        variant="ghost"
                                        colorScheme="blueGray"
                                        onPress={() => {
                                            setShowModalCancel(false)
                                        }}
                                    >
                                        Cerrar
                                    </Button>
                                </Button.Group>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                    <Divider w="100%" />
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

                  
                </Stack>
                <Footer  navigation={navigation} />
            </NativeBaseProvider >
        );
    }
}

export default Boletin;