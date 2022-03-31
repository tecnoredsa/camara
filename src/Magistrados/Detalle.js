import React, { useState, useEffect } from 'react';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Avatar } from "native-base"
import { StyleSheet, TouchableHighlight, View, Dimensions, ScrollView, ActivityIndicator } from "react-native";
import Footer from '../../components/Footerl';

export default function Example({ route, navigation }) {
    const { titulo, img, nombre, des,captura,twiter,face,insta,linke } = route.params

    const [datos, setDatos] = useState([])
    const [cargando, setCargando] = useState(true)

    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Box
                    width="107%"
                    height="100%"
                    rounded="xl"
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
                        <AspectRatio w="120%" ratio={16 / 9}>
                            <Image key={img} source={{ uri: 'https://www.sit-zac.org.mx/welcome_template/assets/img/team/' + img }} alt="image" style={styles.image} />
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
                            {titulo}
                        </Center>
                    </Box>
                    <Stack p="4" space={3}>
                        <Stack space={2}>
                            <Heading size="md" ml="-1">
                                {nombre}
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
                                TRIBUNAL DE JUSTICIA ADMINISTRATIVA DEL ESTADO DE ZACATECAS.
                            </Text>
                        </Stack>
                        <Text fontWeight="400">
                            {des}.
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
                                    {captura}.

                                </Text>
                            </HStack>
                        </HStack>
                        <HStack space={2}>
                            <Avatar
                            key={1}
                            bg="cyan.500"
                                source={{
                                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7qN1sVLahIPw13jo8-LsKcLjYUPmbyphZHQ&usqp=CAU",
                                }}
                            >
                                TW
                            </Avatar>
                            <Avatar
                                 key={2}
                                bg="cyan.500"
                                source={{
                                    uri: "https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-512.png",
                                }}
                            >
                                FB
                            </Avatar>
                            <Avatar
                             key={3}
                                bg="indigo.500"
                                source={{
                                    uri: "https://ichef.bbci.co.uk/news/640/amz/worldservice/live/assets/images/2016/05/11/160511143151_instagram_nuevo_logo_640x360_instagram_nocredit.jpg",
                                }}
                            >
                                IN
                            </Avatar>
                            <Avatar
                              key={4}
                                bg="amber.500"
                                source={{
                                    uri: "https://cdn.icon-icons.com/icons2/2992/PNG/512/linkedin_logo_icon_187302.png",
                                }}
                            >
                                IN
                            </Avatar>
                        </HStack>
                    </Stack>
                </Box>
            </Center>
            <Footer navigation={navigation }/>
        </NativeBaseProvider>
    )
}


const styles = StyleSheet.create({
    image: {
        width: 75,
        height: 75,
        resizeMode: 'contain',
        marginLeft: 1,
    },
})