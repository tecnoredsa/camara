import React, { useState, useEffect } from 'react';
import { Button, Box, Heading, AspectRatio, Image, FormControl, Text, Center, HStack, Stack, NativeBaseProvider, Spinner, Icon } from "native-base"
import * as global from "../../components/Global";
import { Ionicons } from "@expo/vector-icons"
import { Linking } from "react-native";
import Footer from '../../components/Footerl';

export default function Example({ route, navigation }) {
    const { id } = route.params;
    const [datos, setDatos] = useState([])
    const [cargando, setCargando] = useState(true)


    const fetchUser = async () => {
        const data = { 'email': global.EMAIL, 'password': global.PASS, 'id': id };
        const response = await fetch('https://www.sit-zac.org.mx/guardar_servicio_mostrar_notificacion_sentencia', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const result = await response.json();
        setDatos(result.notificacion);
        setCargando(false)
    }

    useEffect(() => {
        fetchUser();
    }, [id])


    if (cargando) {
        return (
            <NativeBaseProvider>
                <Center flex={1} px="3">
                    <HStack space={2} alignItems="center">
                        <Spinner accessibilityLabel="Loading posts" />
                        <Heading color="primary.500" fontSize="md">
                            Cargando notificación...
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
                                {datos.num_expediente}
                            </Center>
                        </Box>
                        <Stack p="4" space={3}>
                            <Stack space={2}>
                                <Heading size="md" ml="-1">
                                    Número de folio de la sentencia: {datos.num_folio}
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
                                    Fecha de notificación: {datos.fecha_que_notifico}.
                                </Text>
                            </Stack>
                            <Text
                                color="coolGray.600"
                                _dark={{
                                    color: "warmGray.200",
                                }}
                                fontWeight="400"
                            >
                                <Text italic bold mt="1.5" ml="1.5">
                                    Tipo de notificación:
                                </Text>  {datos.tipo_notificacion}.
                            </Text>

                            <Text
                                color="coolGray.600"
                                _dark={{
                                    color: "warmGray.200",
                                }}
                                fontWeight="400"
                            >
                                <Text italic bold mt="1.5" ml="1.5">
                                    Autoridad/persona notificada:
                                </Text>  {datos.nombre}  {datos.apellido_paterno}  {datos.apellido_materno}  {datos.razon_social}.
                            </Text>

                            <Text
                                color="coolGray.600"
                                _dark={{
                                    color: "warmGray.200",
                                }}
                                fontWeight="400"
                            >
                                <Text italic bold mt="1.5" ml="1.5">
                                    Estado:
                                </Text>  {datos.estado}.
                            </Text>



                            {datos.aviso_elec_noti != null &&
                                <Button
                                    onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.aviso_elec_noti)}
                                    variant="subtle"
                                    endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                >
                                    Descargar aviso electrónico de notificación
                                </Button>
                            }

                            {datos.notifi_comparecencia != null &&
                                <Button
                                    onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.notifi_comparecencia)}
                                    variant="subtle"
                                    endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                >
                                    Descargar cédula de notificación por comparecencia
                                </Button>
                            }

                            {datos.razon_noti_boletin != null &&
                                <Button
                                    onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.razon_noti_boletin)}
                                    variant="subtle"
                                    endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                >
                                    Descargar razón de notificación por boletín electrónico
                                </Button>
                            }

                            {datos.asentar_entrega_taslados != null &&
                                <Button
                                    onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.asentar_entrega_taslados)}
                                    variant="subtle"
                                    endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                >
                                    Descargar entrega de traslados
                                </Button>
                            }

                            {datos.toma_razon != null &&
                                <Button
                                    onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.toma_razon)}
                                    variant="subtle"
                                    endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                >
                                    Descargar toma de razón
                                </Button>
                            }

                            {datos.acuse_recibo != null &&
                                <Button
                                    onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.acuse_recibo)}
                                    variant="subtle"
                                    endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                >
                                    Descargar acuse de recibo
                                </Button>
                            }

                            {datos.cedula_notificacion != null &&
                                <Button
                                    onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.cedula_notificacion)}
                                    variant="subtle"
                                    endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                >
                                    Descargar cédula de notificación
                                </Button>
                            }

                            {datos.cedula_estrados != null &&
                                <Button
                                    onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.cedula_estrados)}
                                    variant="subtle"
                                    endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                >
                                    Descargar cédula de estrados
                                </Button>
                            }

                            {datos.citatorio != null &&
                                <Button
                                    onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.citatorio)}
                                    variant="subtle"
                                    endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                >
                                    Descargar citatorio
                                </Button>
                            }

                            {datos.noti_comparecencia != null &&
                                <Button
                                    onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.noti_comparecencia)}
                                    variant="subtle"
                                    endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                >
                                    Descargar notificación por comparecencia
                                </Button>
                            }

                            {datos.noti_personal != null &&
                                <Button
                                    onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.noti_personal)}
                                    variant="subtle"
                                    endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                >
                                    Descargar notificación personal
                                </Button>
                            }

                            {datos.noti_oficio != null &&
                                <Button
                                    onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.noti_oficio)}
                                    variant="subtle"
                                    endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                >
                                    Descargar notificación por oficio
                                </Button>
                            }

                            {datos.noti_correo != null &&
                                <Button
                                    onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.noti_correo)}
                                    variant="subtle"
                                    endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                >
                                    Descargar notificación por correo certificado
                                </Button>
                            }

                            {datos.razon_fijacion != null &&
                                <Button
                                    onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.razon_fijacion)}
                                    variant="subtle"
                                    endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                >
                                    Descargar razón de fijación
                                </Button>
                            }

                            {datos.razon_retiro != null &&
                                <Button
                                    onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.razon_retiro)}
                                    variant="subtle"
                                    endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                >
                                    Descargar razón de retiro
                                </Button>
                            }



                        </Stack>
                        <Button
                            onPress={() => navigation.goBack()}
                            colorScheme="#rgba(255, 255, 255, 0.6)"
                            endIcon={<Icon as={Ionicons} name="arrow-back-outline" size="sm" />}
                        >
                            Volver al expediente
                        </Button>
                    </Box>
                </Center>
                <Footer navigation={navigation }/>
            </NativeBaseProvider>
        )
    }
}
