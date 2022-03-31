import React, { useState, useEffect } from 'react';
import { Button, Box, Heading, AspectRatio, Image, FormControl, Text, Center, HStack, Stack, NativeBaseProvider, Spinner, Icon } from "native-base"
import * as global from "../../components/Global";
import { Ionicons } from "@expo/vector-icons"
import { Linking } from "react-native";
import Share_ from '../../components/Share';
import Footer from '../../components/Footerl';

export default function Example({ route, navigation }) {
    const { id } = route.params;
    const [datos, setDatos] = useState([])
    const [cargando, setCargando] = useState(true)


    const fetchUser = async () => {
        const data = { 'email': global.EMAIL, 'password': global.PASS, 'id': id };
        const response = await fetch('https://www.sit-zac.org.mx/guardar_servicio_mostrar_notificacion_acuerdo', {
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
                                    Número de folio del acuerdo: {datos.num_folio}
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
                                <Stack>
                                    <Button
                                        onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.aviso_elec_noti)}
                                        variant="subtle"
                                        mb="3"
                                        endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                    >
                                        Descargar aviso electrónico de notificación
                                    </Button>
                                    <Share_ title={'Hola te comparto la notificación'} uri={'https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.aviso_elec_noti} />
                                </Stack>
                            }

                            {datos.notifi_comparecencia != null &&
                                <Stack>
                                    <Button
                                        onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.notifi_comparecencia)}
                                        variant="subtle"
                                        mb="3"
                                        endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                    >
                                        Descargar cédula de notificación por comparecencia
                                    </Button>
                                    <Share_ title={'Hola te comparto la notificación'} uri={'https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.notifi_comparecencia} />
                                </Stack>
                            }

                            {datos.razon_noti_boletin != null &&
                                <Stack>
                                    <Button
                                        onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.razon_noti_boletin)}
                                        variant="subtle"
                                        mb="3"
                                        endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                    >
                                        Descargar razón de notificación por boletín electrónico
                                    </Button>
                                    <Share_ title={'Hola te comparto la notificación'} uri={'https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.razon_noti_boletin} />
                                </Stack>
                            }

                            {datos.asentar_entrega_taslados != null &&
                                <Stack>
                                    <Button
                                        onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.asentar_entrega_taslados)}
                                        variant="subtle"
                                        mb="3"
                                        endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                    >
                                        Descargar entrega de traslados
                                    </Button>
                                    <Share_ title={'Hola te comparto la notificación'} uri={'https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.asentar_entrega_taslados} />
                                </Stack>
                            }

                            {datos.toma_razon != null &&
                                <Stack>
                                    <Button
                                        onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.toma_razon)}
                                        variant="subtle"
                                        mb="3"
                                        endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                    >
                                        Descargar toma de razón
                                    </Button>
                                    <Share_ title={'Hola te comparto la notificación'} uri={'https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.toma_razon} />
                                </Stack>
                            }

                            {datos.acuse_recibo != null &&
                                <Stack>
                                    <Button
                                        onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.acuse_recibo)}
                                        variant="subtle"
                                        mb="3"
                                        endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                    >
                                        Descargar acuse de recibo
                                    </Button>
                                    <Share_ title={'Hola te comparto la notificación'} uri={'https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.acuse_recibo} />
                                </Stack>
                            }

                            {datos.cedula_notificacion != null &&
                                <Stack>
                                    <Button
                                        onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.cedula_notificacion)}
                                        variant="subtle"
                                        mb="3"
                                        endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                    >
                                        Descargar cédula de notificación
                                    </Button>
                                    <Share_ title={'Hola te comparto la notificación'} uri={'https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.cedula_notificacion} />
                                </Stack>
                            }

                            {datos.cedula_estrados != null &&
                                <Stack>
                                    <Button
                                        onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.cedula_estrados)}
                                        variant="subtle"
                                        mb="3"
                                        endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                    >
                                        Descargar cédula de estrados
                                    </Button>
                                    <Share_ title={'Hola te comparto la notificación'} uri={'https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.cedula_estrados} />
                                </Stack>
                            }

                            {datos.citatorio != null &&
                                <Stack>
                                    <Button
                                        onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.citatorio)}
                                        variant="subtle"
                                        mb="3"
                                        endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                    >
                                        Descargar citatorio
                                    </Button>
                                    <Share_ title={'Hola te comparto la notificación'} uri={'https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.citatorio} />
                                </Stack>
                            }

                            {datos.noti_comparecencia != null &&
                                <Stack>
                                    <Button
                                        onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.noti_comparecencia)}
                                        variant="subtle"
                                        mb="3"
                                        endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                    >
                                        Descargar notificación por comparecencia
                                    </Button>
                                    <Share_ title={'Hola te comparto la notificación'} uri={'https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.noti_comparecencia} />
                                </Stack>
                            }

                            {datos.noti_personal != null &&
                                <Stack>
                                    <Button
                                        onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.noti_personal)}
                                        variant="subtle"
                                        mb="3"
                                        endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                    >
                                        Descargar notificación personal
                                    </Button>
                                    <Share_ title={'Hola te comparto la notificación'} uri={'https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.noti_personal} />
                                </Stack>
                            }

                            {datos.noti_oficio != null &&
                                <Stack>
                                    <Button
                                        onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.noti_oficio)}
                                        variant="subtle"
                                        mb="3"
                                        endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                    >
                                        Descargar notificación por oficio
                                    </Button>
                                    <Share_ title={'Hola te comparto la notificación'} uri={'https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.noti_oficio} />
                                </Stack>
                            }

                            {datos.noti_correo != null &&
                                <Stack>
                                    <Button
                                        onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.noti_correo)}
                                        variant="subtle"
                                        mb="3"
                                        endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                    >
                                        Descargar notificación por correo certificado
                                    </Button>
                                    <Share_ title={'Hola te comparto la notificación'} uri={'https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.noti_correo} />
                                </Stack>
                            }

                            {datos.razon_fijacion != null &&
                                <Stack>
                                    <Button
                                        onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.razon_fijacion)}
                                        variant="subtle"
                                        mb="3"
                                        endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                    >
                                        Descargar razón de fijación
                                    </Button>
                                    <Share_ title={'Hola te comparto la notificación'} uri={'https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.razon_fijacion} />
                                </Stack>
                            }

                            {datos.razon_retiro != null &&
                                <Stack>
                                    <Button
                                        onPress={() => Linking.openURL('https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.razon_retiro)}
                                        variant="subtle"
                                        mb="3"
                                        endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                    >
                                        Descargar razón de retiro
                                    </Button>
                                    <Share_ title={'Hola te comparto la notificación'} uri={'https://www.sit-zac.org.mx/ACTUARIOS/AVISO_NOTIFICACION_ELECTRONICA/' + datos.razon_retiro} />
                                </Stack>
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
