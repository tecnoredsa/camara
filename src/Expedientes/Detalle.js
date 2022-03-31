import React, { useState, useEffect } from 'react';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Link, Spinner, Divider, Button, Icon, ChevronDownIcon } from "native-base"
import { StyleSheet, View, ScrollView } from "react-native";
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { Ionicons } from "@expo/vector-icons"
import * as global from "../../components/Global";
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import Footer from '../../components/Footerl';
import Loading from "../../components/Cargando";

export default function Example({ route, navigation }) {
    const state = {
        tableHead: ['Fecha de registro', 'Tipo', 'Detalle', 'Ver'],
        widthArr: [120, 120, 120, 120]
    }

    const state_personas = {
        tableHead: ['Nombre', 'Tipo', 'Tipo de persona'],
        widthArr: [200, 200, 200]
    }

    const state_acum = {
        tableHead: ['Num exp', 'Tipo', 'Fecha', 'Ver'],
        widthArr: [120, 120, 120, 120]
    }


    const [historial, setHistorial] = useState([])
    const { id_expediente } = route.params;
    const [datos, setDatos] = useState([])
    const [personas, setPersonas] = useState([])
    const [acumulados, setAcumulados] = useState([])
    const [acumulado, setAcumulado] = useState(null)
    const [etapa, setEtapa] = useState(null)
    const [cargando, setCargando] = useState(true)
    const fetchUser = async () => {
        const data = { 'email': global.EMAIL, 'password': global.PASS, 'id': id_expediente };
        const response = await fetch('https://www.sit-zac.org.mx/guardar_servicio_mostrar_expediente', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const result = await response.json()
        setDatos(result.expedientes);
        setPersonas(result.personas);
        setAcumulados(result.acumulados);
        setAcumulado(result.acum);
        setEtapa(result.etapa);
        setHistorial(result[0]);
        setCargando(false)
    }

    useEffect(() => {
        setCargando(true);
        fetchUser();
    }, [id_expediente])

    if (cargando) {
        return (
            <Loading texto={'Cargando expediente'} />
        )
    } else {


        function _alertIndex(index, data) {
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

        const element = (data, index) => (
            <Center>
                <Button
                    onPress={() => _alertIndex(index, data)}
                    leftIcon={<Icon as={Ionicons} name="eye-outline" size="sm" />}
                >
                </Button>
            </Center>

        );

        const expedientes_acu = (data, index) => (

            <Center>
                <Button
                    onPress={() => navigation.navigate('DetalleExpedientes', { id_expediente: data })}
                    leftIcon={<Icon as={Ionicons} name="eye-outline" size="sm" />}
                >
                </Button>
            </Center>

        );

        return (
            <NativeBaseProvider>
                <ScrollView vertical={true}>
                    <Center flex={1} px="3">
                        <Box
                            width="100%"
                            height="100%"
                            rounded="xl"
                            overflow="hidden"
                            borderColor="coolGray.200"
                            borderWidth="1"
                            _dark={{
                                borderColor: "coolGray.600",
                                backgroundColor: "gray.700",
                            }}
                            _web={{
                                shadow: 2,
                                borderWidth: 0,
                            }}
                            _light={{
                                backgroundColor: "gray.50",
                            }}
                        >
                            <Box>
                                <AspectRatio w="100%" ratio={8 / 1}>
                                    <Image source={{ uri: 'https://www.sit-zac.org.mx/welcome_template/assets/img/edificio.png' }} alt="image" style={styles.image} />
                                </AspectRatio>
                                <Center
                                    bg="#rgb(151, 132, 102)"
                                    _dark={{
                                        bg: "#rgb(151, 132, 102)",
                                    }}
                                    _text={{
                                        color: "warmGray.50",
                                        fontWeight: "700",
                                        fontSize: "xs",
                                    }}
                                    position="absolute"
                                    bottom="0"
                                    px="3"
                                    py="1.5"
                                >
                                    {datos.tipo_juicio}
                                </Center>
                            </Box>
                            <Stack p="4" space={3}>
                                <Stack space={2}>
                                    <Heading size="md" ml="-1">
                                        {datos.num_expediente}
                                    </Heading>
                                    <Text
                                        fontSize="xs"
                                        _light={{
                                            color: "#rgb(151, 132, 102)",
                                        }}
                                        _dark={{
                                            color: "#rgb(151, 132, 102)",
                                        }}
                                        fontWeight="500"
                                        ml="-0.5"
                                        mt="-1"
                                    >
                                        <Text italic bold mt="1.5" ml="1.5">
                                            Ultima modificación:
                                        </Text> {datos.updated_at}.
                                    </Text>
                                </Stack>
                                <Text fontWeight="400">
                                    <Text italic bold mt="1.5" ml="1.5">
                                        Tipo de recepción:
                                    </Text> {datos.tipo_recepcion}.
                                </Text>
                                <HStack alignItems="center" space={4} justifyContent="space-between">
                                    <HStack alignItems="center">
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: "warmGray.200",
                                            }}
                                            fontWeight="400"
                                        >
                                            <Text italic bold mt="1.5" ml="1.5">
                                                Fecha de ingreso:
                                            </Text>  {datos.fecha}.
                                        </Text>

                                    </HStack>
                                </HStack>

                                <HStack alignItems="center" space={4} justifyContent="space-between">
                                    <HStack alignItems="center">
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: "warmGray.200",
                                            }}
                                            fontWeight="400"
                                        >
                                            <Text italic bold mt="1.5" ml="1.5">
                                                Estado procesal:
                                            </Text>  {etapa}.
                                        </Text>

                                    </HStack>
                                </HStack>

                                {acumulado &&
                                    <HStack alignItems="center" space={4} justifyContent="space-between">
                                        <HStack alignItems="center">
                                            <Text
                                                color="coolGray.600"
                                                _dark={{
                                                    color: "warmGray.200",
                                                }}
                                                fontWeight="400"
                                            >
                                                <Text italic bold mt="1.5" ml="1.5">
                                                    Expediente acumulado al expediente:
                                                </Text>  <Link _text={{
                                                    _light: {
                                                        color: "cyan.500"
                                                    },
                                                    color: "cyan.300"
                                                }}   onPress={() => navigation.navigate('DetalleExpedientes', { id_expediente: acumulado.id_acomula })}>
                                                    {acumulado.num_expediente}.
                                                </Link>
                                            </Text>

                                        </HStack>
                                    </HStack>
                                }

                                <Divider w="100%" />

                            </Stack>
                        </Box>
                    </Center>
                    <View style={styles.container}>

                        <Collapse>
                            <CollapseHeader style={{ backgroundColor: '#E6E6E6' }}>
                                <HStack style={{ backgroundColor: '#rgb(173, 150, 113)' }} space={2}>
                                    <ChevronDownIcon size="5" mt="7" color="#FFFFFF" />
                                    <Box
                                        width="100%"
                                        bg="#rgb(151, 132, 102)"
                                        p="4"

                                        _text={{
                                            fontSize: "md",
                                            fontWeight: "bold",
                                            color: "white",
                                        }}
                                    >
                                        Involucrados en el expediente
                                    </Box>
                                </HStack>
                            </CollapseHeader>
                            <CollapseBody>

                                <ScrollView horizontal={true}>
                                    <View style={styles.container}>
                                        <Table borderStyle={{ borderColor: 'transparent' }}>
                                            <Row data={state_personas.tableHead} widthArr={state_personas.widthArr} style={styles.head} textStyle={styles.text} />
                                            {
                                                personas.map((rowData, index) => (
                                                    <Row key={index}
                                                        data={rowData}
                                                        widthArr={state_personas.widthArr}
                                                        style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                                                        textStyle={styles.text} />
                                                ))
                                            }
                                        </Table>
                                    </View>
                                </ScrollView>
                            </CollapseBody>
                        </Collapse>


                        <Collapse>
                            <CollapseHeader style={{ backgroundColor: '#E6E6E6' }}>
                                <HStack style={{ backgroundColor: '#rgb(173, 150, 113)' }} space={2}>
                                    <ChevronDownIcon size="5" mt="7" color="#FFFFFF" />
                                    <Box
                                        width="100%"
                                        bg="#rgb(151, 132, 102)"
                                        p="4"

                                        _text={{
                                            fontSize: "md",
                                            fontWeight: "bold",
                                            color: "white",
                                        }}
                                    >
                                        Historial del expediente
                                    </Box>
                                </HStack>
                            </CollapseHeader>
                            <CollapseBody>
                                <ScrollView horizontal={true}>
                                    <View style={styles.container}>
                                        <Table borderStyle={{ borderColor: 'transparent' }}>
                                            <Row data={state.tableHead} widthArr={state.widthArr} style={styles.head} textStyle={styles.text} />
                                            {
                                                historial.map((rowData, index) => (
                                                    <TableWrapper key={index} style={styles.row}>
                                                        {
                                                            rowData.map((cellData, cellIndex) => (
                                                                <Cell style={styles.singleHead} key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text} />
                                                            ))
                                                        }
                                                    </TableWrapper>
                                                ))
                                            }
                                        </Table>
                                    </View>
                                </ScrollView>
                            </CollapseBody>
                        </Collapse>

                        {acumulados.length > 0 &&
                            <Collapse>
                                <CollapseHeader style={{ backgroundColor: '#E6E6E6' }}>
                                    <HStack style={{ backgroundColor: '#rgb(173, 150, 113)' }} space={2}>
                                        <ChevronDownIcon size="5" mt="7" color="#FFFFFF" />
                                        <Box
                                            width="100%"
                                            bg="#rgb(151, 132, 102)"
                                            p="4"

                                            _text={{
                                                fontSize: "md",
                                                fontWeight: "bold",
                                                color: "white",
                                            }}
                                        >
                                            Expedientes acumulados
                                        </Box>
                                    </HStack>
                                </CollapseHeader>
                                <CollapseBody>
                                    <ScrollView horizontal={true}>
                                        <View style={styles.container}>
                                            <Table borderStyle={{ borderColor: 'transparent' }}>
                                                <Row data={state_acum.tableHead} widthArr={state_acum.widthArr} style={styles.head} textStyle={styles.text} />
                                                {
                                                    acumulados.map((rowData, index) => (
                                                        <TableWrapper key={index} style={styles.row}>
                                                            {
                                                                rowData.map((cellData, cellIndex) => (
                                                                    <Cell style={styles.singleHead} key={cellIndex} data={cellIndex === 3 ? expedientes_acu(cellData, index) : cellData} textStyle={styles.text} />
                                                                ))
                                                            }
                                                        </TableWrapper>
                                                    ))
                                                }
                                            </Table>
                                        </View>
                                    </ScrollView>
                                </CollapseBody>
                            </Collapse>
                        }

                        {global.TIPO_USUARIO == "TRIBUNAL" &&
                            <Button
                                mt="1"
                                onPress={() => navigation.navigate('Linea', { datos: historial, id_expediente: datos.id, id_recurso: null })}
                                variant="subtle"
                                endIcon={<Icon as={Ionicons} name="time-outline" size="sm" />}
                            >
                                Ver cronograma
                            </Button>
                        }

                        <Button
                            mt="1/2"
                            onPress={() => navigation.navigate('Expedientes')}
                            colorScheme="#rgba(255, 255, 255, 0.6)"
                            endIcon={<Icon as={Ionicons} name="arrow-back-outline" size="sm" />}
                        >
                            Volver a busqueda
                        </Button>
                    </View>
                </ScrollView>
                <Footer navigation={navigation} />
            </NativeBaseProvider >
        )
    }
}


const styles = StyleSheet.create({
    image: {
        width: 75,
        height: 75,
        resizeMode: 'contain',
        marginLeft: 10,
    },
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 60, backgroundColor: '#537791' },
    singleHead: { width: 120, height: 60, backgroundColor: '#c8e1ff' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' },
})