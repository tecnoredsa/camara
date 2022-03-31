import React, { useState, useEffect } from 'react';
import { Button, Box, Heading, AspectRatio, Image, FormControl, Text, Center, HStack, Stack, NativeBaseProvider, Spinner, Icon } from "native-base"
import * as global from "../../components/Global";
import { Ionicons } from "@expo/vector-icons"
import { Linking } from "react-native";
import Footer from '../../components/Footerl';
import Share_ from '../../components/Share';
import Modal from '../../components/Modal';
import MsjError from '../../components/AlertWarning';

export default function Example({ route, navigation }) {
    const { id_cita,count,setCount } = route.params;
    const [datos, setDatos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [cancelar, setCancelar] = useState(false)


    const fetchUser = async () => {
        const data = { 'email': global.EMAIL, 'password': global.PASS, 'id_cita': id_cita };
        const response = await fetch('https://www.sit-zac.org.mx/guardar_servicio_mostrar_cita', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const result = await response.json();
        setDatos(result.cita);
        setCargando(false)
    }

    const cancelarCita = async () => {
        const data = { 'email': global.EMAIL, 'password': global.PASS, 'id_cita': id_cita };
        const response = await fetch('https://www.sit-zac.org.mx/guardar_servicio_cancelar_cita', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const result = await response.json();
        fetchUser();
        setCount(count+1);
        setCancelar(true);
    }

    useEffect(() => {      
        fetchUser();
    }, [id_cita])


    if (cargando) {
        return (
            <NativeBaseProvider>
                <Center flex={1} px="3">
                    <HStack space={2} alignItems="center">
                        <Spinner accessibilityLabel="Loading posts" />
                        <Heading color="primary.500" fontSize="md">
                            Cargando cita...
                        </Heading>
                    </HStack>
                </Center>
            </NativeBaseProvider>

        )
    } else {
        return (
            <NativeBaseProvider>
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
                                <Image
                                    source={{
                                        uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                                    }}
                                    alt="image"
                                />
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
                                {datos.tipo_cita}
                            </Center>
                        </Box>
                        <Stack p="4" space={3}>
                            <Stack space={2}>
                                <Heading size="md" ml="-1">
                                    Fecha: {datos.fecha}
                                </Heading>
                                <Text
                                    color="coolGray.600"
                                    _dark={{
                                        color: "warmGray.200",
                                    }}
                                    fontWeight="400"
                                >
                                    <Text italic bold mt="1.5" ml="1.5">
                                        Numero de folio:
                                    </Text> {datos.folio}
                                </Text>
                            </Stack>
                            <Stack space={2}>
                                <Text
                                    color="coolGray.600"
                                    _dark={{
                                        color: "warmGray.200",
                                    }}
                                    fontWeight="400"
                                >
                                    <Text italic bold mt="1.5" ml="1.5">
                                        Tipo de tramite:
                                    </Text> {datos.tipo_cita}
                                </Text>
                            </Stack>

                            <Stack space={2}>
                                <Text
                                    color="coolGray.600"
                                    _dark={{
                                        color: "warmGray.200",
                                    }}
                                    fontWeight="400"
                                >
                                    <Text italic bold mt="1.5" ml="1.5">
                                        Hora de la cita:
                                    </Text> {datos.hora}
                                </Text>
                            </Stack>

                            <Stack space={2}>
                                <Text
                                    color="coolGray.600"
                                    _dark={{
                                        color: "warmGray.200",
                                    }}
                                    fontWeight="400"
                                >
                                    <Text italic bold mt="1.5" ml="1.5">
                                        Nombre:
                                    </Text> {datos.name} {datos.apellido_p} {datos.apellido_m}  {datos.razon_social}
                                </Text>
                            </Stack>

                            <Stack space={2}>
                                <Text
                                    color="coolGray.600"
                                    _dark={{
                                        color: "warmGray.200",
                                    }}
                                    fontWeight="400"
                                >
                                    <Text italic bold mt="1.5" ml="1.5">
                                        Email:
                                    </Text> {datos.email}
                                </Text>
                            </Stack>


                            <Stack space={2}>
                                <Text
                                    color="coolGray.600"
                                    _dark={{
                                        color: "warmGray.200",
                                    }}
                                    fontWeight="400"
                                >
                                    <Text italic bold mt="1.5" ml="1.5">
                                        Teléfono:
                                    </Text> {datos.celular}
                                </Text>
                            </Stack>


                            <Stack space={2}>
                                <Text
                                    color="coolGray.600"
                                    _dark={{
                                        color: "warmGray.200",
                                    }}
                                    fontWeight="400"
                                >
                                    <Text italic bold mt="1.5" ml="1.5">
                                        Estado actual de la cita:
                                    </Text> {datos.estado}
                                </Text>
                            </Stack>



                            <HStack alignItems="center" space={4} justifyContent="space-between">
                                <HStack alignItems="center">
                                    <Text
                                        color="coolGray.600"
                                        _dark={{
                                            color: "warmGray.200",
                                        }}
                                        fontWeight="400"
                                    >
                                        {datos.updated_at}
                                    </Text>
                                </HStack>
                            </HStack>
                            {datos.estado === "CONFIRMADA" &&
                                <Stack mb="2">
                                    <Button
                                        onPress={() => Linking.openURL('https://sit-zac.org.mx/CITAS/ACUSE_CITA_' + datos.folio + '.pdf')}
                                        variant="subtle"
                                        mb="2"
                                        endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                    >
                                        Descargar acuse
                                    </Button>
                                    <Modal titulo={'¿Estás seguro?'} texto={'Deseas cancelar la cita'} funcion={cancelarCita} />
                                </Stack>

                            }
                            {cancelar &&
                                <MsjError ruta={'MisCitas'} navigation={navigation} title={'Cancelada'} texto={'La cita se ha cancelado correctamente, puede guardar su acuse de cancelación.'} tipo={'success'} />
                            }
                            {datos.estado === "CANCELADA" &&
                                <Button
                                    onPress={() => Linking.openURL('https://sit-zac.org.mx/CITAS/ACUSE_CANCELACION_' + datos.folio + '.pdf')}
                                    variant="subtle"
                                    mb="2"
                                    endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                >
                                    Descargar acuse
                                </Button>
                            }

                        </Stack>
                        <Button
                            onPress={() => navigation.navigate('MisCitas')}
                            colorScheme="#rgba(255, 255, 255, 0.6)"
                            endIcon={<Icon as={Ionicons} name="arrow-back-outline" size="sm" />}
                        >
                            Volver a mi citas
                        </Button>
                    </Box>
                </Center>
                <Footer navigation={navigation} />
            </NativeBaseProvider>
        )
    }
}
