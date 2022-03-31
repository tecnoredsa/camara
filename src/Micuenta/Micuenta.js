import React, { useState, useEffect } from 'react';
import { Box, Heading, Button, IconButton, Icon, Fab, AspectRatio, FlatList, Image, Text, Divider, Center, HStack, Spacer, Stack, VStack, NativeBaseProvider, Avatar } from "native-base"
import { StyleSheet, TouchableHighlight, View, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import Footer from '../../components/Footerl';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons"
import * as global from "../../components/Global";

export default function Example({ navigation }) {
    return (
        <NativeBaseProvider>

            <ScrollView _contentContainerStyle={{
                h: "60",
                px: "60px",
                mb: "0",
                minW: "72"
            }}>
                <VStack space="2.5" mt="4" px="8">

                    <Heading size="md">Configuración</Heading>
                    <Divider />
                    <Stack mb="2.5" mt="1.5" direction="column" space={2}>
                        <Box color="warmGray.50" alignItems="flex-start">
                            <Button
                                _text={{
                                    fontSize: "md",
                                    color: "393939"
                                }}
                                size={'lg'}
                                onPress={() => navigation.navigate('Miperfil')}
                                colorScheme="secondary"
                                variant="transparent"
                                startIcon={<Icon as={Ionicons} color="393939" name="person-circle-outline" size="md" />}
                            >
                                Mi perfil
                            </Button>
                            <Divider />
                            <Button
                                _text={{
                                    fontSize: "md",
                                    color: "393939"
                                }}
                                size={'lg'}
                                onPress={() => navigation.navigate('Privacidad')}
                                colorScheme="secondary"
                                variant="transparent"
                                startIcon={<Icon as={Ionicons} color="393939" name="key-outline" size="md" />}
                            >
                                Privacidad
                            </Button>
                            <Divider />
                            <Button
                                _text={{
                                    fontSize: "md",
                                    color: "393939"
                                }}
                                size={'lg'}
                                onPress={() => navigation.navigate('Contacto')}
                                colorScheme="393939"
                                variant="transparent"
                                startIcon={<Icon as={Ionicons} color="393939" name="at-outline" size="md" />}
                            >
                                Contacto
                            </Button>
                            <Divider />
                            <Button
                                _text={{
                                    fontSize: "md",
                                    color: "393939"
                                }}
                                size={'lg'}
                                onPress={() => navigation.navigate('Busqueda')}
                                colorScheme="secondary"
                                variant="transparent"
                                startIcon={<Icon as={Ionicons} color="393939" name="help-outline" size="md" />}
                            >
                                Ayuda
                            </Button>
                            <Divider />
                        </Box>
                    </Stack>
                    <Divider />
                    <Heading size="md">Mis datos</Heading>
                    <Divider />
                    <Stack mb="2.5" mt="1.5" direction="column" space={2}>
                        <Box color="warmGray.50" alignItems="flex-start">
                            <Button
                                _text={{
                                    fontSize: "md",
                                    color: "393939"
                                }}
                                size={'lg'}
                                onPress={() => navigation.navigate('Expedientes')}
                                colorScheme="secondary"
                                variant="transparent"
                                startIcon={<Icon as={Ionicons} color="393939" name="file-tray-stacked" size="md" />}
                            >
                                Mis jucios
                            </Button>
                            <Divider />
                            <Button
                                _text={{
                                    fontSize: "md",
                                    color: "393939"
                                }}
                                size={'lg'}
                                onPress={() => navigation.navigate('MisCitas')}
                                colorScheme="secondary"
                                variant="transparent"
                                startIcon={<Icon as={Ionicons} color="393939" name="document-text" size="md" />}
                            >
                                Mis citas
                            </Button>
                            <Divider />
                            
                            <Button
                                _text={{
                                    fontSize: "md",
                                    color: "393939"
                                }}
                                size={'lg'}
                                onPress={() => navigation.navigate('Subs')}
                                colorScheme="393939"
                                variant="transparent"
                                startIcon={<Icon as={Ionicons} color="393939" name="mail-outline" size="md" />}
                            >
                                Suscripciones
                            </Button>
                            <Divider />
                        </Box>
                    </Stack>
                    <Divider />
                    <Stack direction="row" mb="2.5" mt="1.5" space={3}>
                        <Box alignItems="flex-start">
                            <Button
                                onPress={() => navigation.navigate('Logout')}
                                colorScheme="secondary"
                                variant="transparent"
                                endIcon={<Icon as={Ionicons} color="393939" name="log-out-outline" size="md" />}
                            >
                                {global.EMAIL}
                                {global.NOMBRE}
                            </Button>
                        </Box>
                        <Divider />
                    </Stack>
                    <Divider />
                </VStack>
            </ScrollView>
            <AspectRatio w="100%" ratio={8 / 1}>
                <Center>
                    <Image
                        width="60%"
                        height="90%"
                        resizeMode="stretch"
                        source={{
                            uri: "https://sit-zac.org.mx/img/LogoTJA.png",
                        }}
                        alt="image"
                    />
                </Center>
            </AspectRatio>
            <Footer navigation={navigation} />

        </NativeBaseProvider >
    )
};