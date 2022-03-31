import React, { useState, useEffect } from 'react';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider,Spinner } from "native-base"
import { StyleSheet, TouchableHighlight, View, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import Footer from '../../components/Footerl';

const IMG_URL = 'https://www.sit-zac.org.mx/welcome_template/assets/img/logo_tja.png';

export default function Example({ route, navigation }) {
    const { id_noticia } = route.params
    const [datos, setDatos] = useState([])
    const [cargando, setCargando] = useState(true)

    const fetchUser = async (id_noticia) => {
        const response = await fetch('https://www.sit-zac.org.mx/getNoticia/' + id_noticia)
        const data = await response.json()
        setDatos(data.noticia);
        setCargando(false)
    }

    useEffect(() => {
        fetchUser(id_noticia);
    }, [id_noticia])

    if (cargando) {
        return (
            <NativeBaseProvider>
                <Center flex={1} px="3">
                    <HStack space={2} alignItems="center">
                        <Spinner accessibilityLabel="Loading posts" />
                        <Heading color="primary.500" fontSize="md">
                            Cargando...
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
                    >
                        <Box>
                            <AspectRatio w="100%" ratio={16 / 9}>
                                {(() => {
                                    if (datos.portada) {
                                        const IMG_URL = 'https://www.sit-zac.org.mx/PORTADAS/' + datos.portada;
                                        return (
                                            <Image key={datos.id} source={{ uri: IMG_URL }} alt="image" style={styles.image} />
                                        )
                                    } else {
                                        return (
                                            <Image key={datos.id} source={{ uri: IMG_URL }} alt="image" style={styles.image} />
                                        )

                                    }
                                })()}
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
                                {datos.nombre}
                            </Center>
                        </Box>
                        <Stack p="4" space={3}>
                            <Stack space={2}>
                                <Heading size="md" ml="-1">
                                    {datos.nombre}
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
                                    {datos.captura}.
                                </Text>
                            </Stack>
                            <Text fontWeight="400">
                                {datos.descripcion}.
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
                                        {datos.updated_at}.
                                    </Text>
                                </HStack>
                            </HStack>
                        </Stack>
                    </Box>
                </Center>
                <Footer navigation={navigation }/>
            </NativeBaseProvider>
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
})