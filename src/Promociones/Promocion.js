import React, { useState, useEffect } from 'react';
import { Button, Box, Heading, AspectRatio, Image, FormControl, Text, Center, HStack, Stack, NativeBaseProvider, Spinner, Icon } from "native-base"
import * as global from "../../components/Global";
import { Ionicons } from "@expo/vector-icons"
import { Linking } from "react-native";
import Footer from '../../components/Footerl';
import Share_ from '../../components/Share';
import Loading from "../../components/Cargando";


export default function Example({ route, navigation }) {
    const { id } = route.params;
    const [datos, setDatos] = useState([])
    const [anexos, setAnexos] = useState([])
    const [cargando, setCargando] = useState(true)



    const fetchUser = async () => {
        const data = { 'email': global.EMAIL, 'password': global.PASS, 'id': id };
        const response = await fetch('https://www.sit-zac.org.mx/guardar_servicio_mostrar_promocion', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const result = await response.json();
        setDatos(result.promocion);
        setAnexos(result.anexos);

        setCargando(false)
    }

    useEffect(() => {
        setCargando(true)
        fetchUser();
    }, [id])


    if (cargando) {
        return (
            <Loading texto={'Cargando promoción'} />

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
                                    Número de folio: {datos.folio}
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
                                    Fecha: {datos.fecha}
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
                                    Tipo de promoción:
                                </Text>  {datos.tipo_promocion}.
                            </Text>

                            <Text
                                color="coolGray.600"
                                _dark={{
                                    color: "warmGray.200",
                                }}
                                fontWeight="400"
                            >
                                <Text italic bold mt="1.5" ml="1.5">
                                    Tipo de recepción:
                                </Text>  {datos.tipo_recepcion}.
                            </Text>

                            <Text
                                color="coolGray.600"
                                _dark={{
                                    color: "warmGray.200",
                                }}
                                fontWeight="400"
                            >
                                <Text italic bold mt="1.5" ml="1.5">
                                    Suspensión:
                                </Text>  {datos.suspension}.
                            </Text>

                            <Text
                                color="coolGray.600"
                                _dark={{
                                    color: "warmGray.200",
                                }}
                                fontWeight="400"
                            >
                                <Text italic bold mt="1.5" ml="1.5">
                                    Número de anexos:
                                </Text>  {datos.num_anexos}.
                            </Text>

                            <Text
                                color="coolGray.600"
                                _dark={{
                                    color: "warmGray.200",
                                }}
                                fontWeight="400"
                            >
                                <Text italic bold mt="1.5" ml="1.5">
                                    Hojas de escrito:
                                </Text>  {datos.hojas_escrito}.
                            </Text>

                            <Text
                                color="coolGray.600"
                                _dark={{
                                    color: "warmGray.200",
                                }}
                                fontWeight="400"
                            >
                                <Text italic bold mt="1.5" ml="1.5">
                                    Hojas de traslado:
                                </Text>  {datos.hojas_traslados}.
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
                                        Ultima modificación: {datos.updated_at}
                                    </Text>
                                </HStack>
                            </HStack>
                            <Button
                                onPress={() => Linking.openURL('https://www.sit-zac.org.mx/OFICIALIA/archivos/amparos_promociones/' + datos.escaneo_escrito)}
                                variant="subtle"
                                endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                            >
                                Descargar escrito
                            </Button>
                            <Share_ title={'Hola te comparto el escaneo escrito de la promoción'} uri={'https://www.sit-zac.org.mx/OFICIALIA/archivos/amparos_promociones/' + datos.escaneo_escrito} />
                            {anexos
                                ?
                                <Stack>
                                    <Button
                                        onPress={() => Linking.openURL('https://sit-zac.org.mx/OFICIALIA/archivos/amparos_promociones/' + anexos.escaneo_anexos)}
                                        variant="subtle"
                                        mb="3"
                                        endIcon={<Icon as={Ionicons} name="cloud-download-outline" size="sm" />}
                                    >
                                        Descargar anexos
                                    </Button>

                                    <Share_ title={'Hola te comparto los anexos de la promoción'} uri={'https://sit-zac.org.mx/OFICIALIA/archivos/amparos_promociones/' + anexos.escaneo_anexos} />
                                </Stack>
                                :
                                <>
                                </>
                            }
                            <Button
                                onPress={() => navigation.navigate('DetalleExpedientes', { id_expediente: datos.id_expediente })}
                                colorScheme="#rgba(255, 255, 255, 0.6)"
                                endIcon={<Icon as={Ionicons} name="arrow-back-outline" size="sm" />}
                            >
                                Volver al expediente
                            </Button>
                        </Stack>
                    </Box>
                </Center>
                <Footer navigation={navigation} />
            </NativeBaseProvider>
        )
    }
}
