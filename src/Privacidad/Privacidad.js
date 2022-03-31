import React, { useState, useEffect } from 'react';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, ScrollView, Stack, NativeBaseProvider, Link } from "native-base"
import { StyleSheet, TouchableHighlight, View, Dimensions, ActivityIndicator } from "react-native";
import Footer from '../../components/Footerl';


export default function Example({ route, navigation }) {
    return (
        <NativeBaseProvider>
            <ScrollView h="100%" r="100%">
                <Center flex={1} px="3">
                    <Box alignItems="center">
                        <Box
                            width="107%"
                            height="100%"
                            
                            overflow="hidden"
                            borderColor="coolGray.200"
                            borderWidth="0"
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
                                    <Image source={{
                                        uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
                                    }} alt="image" />
                                </AspectRatio>
                                <Center bg="#rgb(151, 132, 102)" _dark={{
                                    bg: "#rgb(151, 132, 102)"
                                }} _text={{
                                    color: "warmGray.50",
                                    fontWeight: "700",
                                    fontSize: "xs"
                                }} position="absolute" bottom="0" px="3" py="1.5">
                                    AVISO DE PRIVACIDAD
                                </Center>
                            </Box>
                            <Stack p="4" space={3}>
                                <Stack space={2}>
                                    <Heading size="md" ml="-1">
                                        AVISO DE PRIVACIDAD.
                                    </Heading>
                                    <Text fontSize="xs" _light={{
                                        color: "#rgb(151, 132, 102)"
                                    }} _dark={{
                                        color: "#rgb(151, 132, 102)"
                                    }} fontWeight="500" ml="-0.5" mt="-1">
                                        Tribunal de
                                        Justicia Administrativa del Estado de Zacatecas
                                    </Text>
                                </Stack>
                                <Text textAlign="justify" fontWeight="400">
                                    En cumplimiento a los artículos 39, 40, 41, 42 y 43 de la Ley de
                                    Protección de Datos Personales en Posesión de Sujetos
                                    Obligados del Estado de Zacatecas, el Tribunal de
                                    Justicia Administrativa del Estado de Zacatecas hace de su
                                    conocimiento:
                                </Text>
                                <Text
                                textAlign="justify"
                                    color="coolGray.600"
                                    _dark={{
                                        color: "warmGray.200",
                                    }}
                                    fontWeight="400"
                                >
                                    Durante los eventos convocados por el Tribunal y a los que se
                                    acude por invitación o con la representación de nuestro ente
                                    jurisdiccional, se recolecta material fotográfico y audiovisual que
                                    es publicado en diferentes plataformas digitales. Si aparece en
                                    uno de estos materiales y quiere acceder, rectificar, cancelar u
                                    oponerse al tratamiento de sus datos personales, puede solicitarlo
                                    a través de la Unidad de Transparencia de este H. Tribunal, a los teléfonos;
                                    <Text italic bold mt="1.5" ml="1.5">
                                        492 922 93 27 y 492 922 29 27, Ext. 18
                                    </Text> o al correo electrónico <Text italic bold mt="1.5" ml="1.5">
                                        transparencia@trijazac.gob.mx.
                                    </Text>
                                </Text>

                                <Text
                                textAlign="justify"
                                    color="coolGray.600"
                                    _dark={{
                                        color: "warmGray.200",
                                    }}
                                    fontWeight="400"
                                >
                                    Le invitamos a consultar nuestro aviso de privacidad integral y
                                    simplificado{" "}
                                    <Link href="https://www.trijazac.gob.mx" isExternal _text={{
                                        color: "blue.400"
                                    }} mt={1.5} _web={{
                                        mb: -1
                                    }}>
                                        www.trijazac.gob.mx
                                    </Link>.

                                </Text>                            
                                <HStack alignItems="center" space={4} justifyContent="space-between">
                                    <HStack alignItems="center">
                                        <Text color="coolGray.600" _dark={{
                                            color: "warmGray.200"
                                        }} fontWeight="400">
                                           2022
                                        </Text>
                                    </HStack>
                                </HStack>
                            </Stack>
                        </Box>
                    </Box>
                </Center>
            </ScrollView>
            <Footer navigation={navigation }/>   
        </NativeBaseProvider>
    );
}