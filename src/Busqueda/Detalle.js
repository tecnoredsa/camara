import React, { useState, useEffect } from 'react';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider,Spinner, Divider,Button} from "native-base"
import { StyleSheet, TouchableHighlight, View, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import Footer from '../../components/Footerl';

 
export default function Example({ route, navigation }) {
    const { id_ayuda } = route.params

    const [datos, setDatos] = useState([])
    const [cargando, setCargando] = useState(true)

    const fetchUser = async (id_ayuda) => {
        const response = await fetch('https://www.sit-zac.org.mx/getAyuda/' + id_ayuda)
        const data = await response.json()
        //console.log(data.data);
        setDatos(data.resultado);
        setCargando(false)
    }

    useEffect(() => {
        fetchUser(id_ayuda);
    }, [id_ayuda])

    if (cargando) {
        return (
            <NativeBaseProvider>
            <Center flex={1} px="3">
                <HStack space={2} alignItems="center">
                    <Spinner accessibilityLabel="Loading posts" />
                    <Heading color="primary.500" fontSize="md">
                        Cargando indormación...
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
                            <AspectRatio w="100%" ratio={16 / 9}>
                                <Image source={{ uri: 'https://www.sit-zac.org.mx/welcome_template/assets/img/edificio.png' }} alt="image" style={styles.image} />
                            </AspectRatio>
                            <Center
                                bg="violet.500"
                                _dark={{
                                    bg: "violet.400",
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
                                {datos.categoria}
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
                                        color: "violet.500",
                                    }}
                                    _dark={{
                                        color: "violet.400",
                                    }}
                                    fontWeight="500"
                                    ml="-0.5"
                                    mt="-1"
                                >
                                    {datos.updated_at}.
                                </Text>
                            </Stack>
                            <Text fontWeight="400">
                                {datos.texto}.
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
                                        Palabras clave: [{datos.palabras_clave}].
                                    </Text>

                                </HStack>
                            </HStack>
                            <Divider w="100%" />
                            <Stack
                                mb="2.5"
                                mt="1.5"
                                direction={{
                                    base: "column",
                                    md: "row",
                                }}
                                space={2}
                                mx={{
                                    base: "auto",
                                    md: "0",
                                }}
                            >
                                <Button size="sm" variant="link"
                                  onPress={() =>navigation.navigate('Webview',{enlace:datos.enlace,id:datos.id})} 
                                 >                                
                                    Link para ver el enlace
                                </Button>
                                
                            </Stack>
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