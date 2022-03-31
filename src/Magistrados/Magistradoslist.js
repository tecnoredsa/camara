import React, { useState, useEffect } from 'react';
import { Box, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider, } from "native-base"
import { StyleSheet, TouchableHighlight, View, Dimensions, ActivityIndicator } from "react-native";
import Loading from "../../components/Cargando";

export default function magsitradosList({ navigation }) {
    const [datos, setDatos] = useState([])
    const [cargando, setCargando] = useState(true)

    const fetchUser = async () => {
        const response = await fetch('https://www.sit-zac.org.mx/getDataWelcomeObject/')
        const data = await response.json()
        setDatos(data.datos);
        setCargando(false)
    }

    useEffect(() => {
        fetchUser();
    }, [])
    if (cargando) {
        return (
            <Loading texto="Cargando" />
        )
    } else {

        return (
            <NativeBaseProvider>
                <Center flex={1} px="3">

                    <TouchableHighlight
                        style={styles.touch}
                        key={1}
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={() => navigation.navigate('DetalleMagistrados', {
                            titulo: datos.text_30, img: datos.img_10, nombre: datos.text_29, des: datos.textarea7
                            , captura: datos.updated_at, twiter: datos.link_1, face: datos.link_2, insta: datos.link_3, linke: datos.link_4
                        })}
                    >

                        <Box
                            w={{
                                base: "80%",
                                md: "25%",
                            }}
                        >
                            <Heading fontSize="xl" p="8" pb="3">
                                {datos.text_30}
                            </Heading>
                            <Box
                                borderBottomWidth="1"
                                _dark={{
                                    borderColor: "gray.600",
                                }}
                                borderColor="coolGray.200"
                                pl="4"
                                pr="5"
                                py="2"
                            >
                                <HStack space={3} justifyContent="space-between">

                                    <Avatar
                                        key={datos.img_10}
                                        size="88px"
                                        source={{
                                            uri: 'https://www.sit-zac.org.mx/welcome_template/assets/img/team/' + datos.img_10
                                        }}
                                    />
                                    <VStack>
                                        <Text
                                            _dark={{
                                                color: "warmGray.50",
                                            }}
                                            color="coolGray.800"
                                            bold
                                        >
                                            {datos.text_29}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: "warmGray.200",
                                            }}
                                        >
                                            {datos.textarea7}
                                        </Text>
                                    </VStack>

                                </HStack>
                            </Box>
                        </Box>
                    </TouchableHighlight>
                    <TouchableHighlight
                        key={2}
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={() => navigation.navigate('DetalleMagistrados', {
                            titulo: datos.text_32, img: datos.img_11, nombre: datos.text_31, des: datos.textarea8
                            , captura: datos.updated_at, twiter: datos.link_5, face: datos.link_6, insta: datos.link_7, linke: datos.link_8
                        })}
                    >
                        <Box
                            w={{
                                base: "80%",
                                md: "25%",
                            }}
                        >
                            <Heading fontSize="xl" p="8" pb="3">
                                {datos.text_32}
                            </Heading>
                            <Box
                                borderBottomWidth="1"
                                _dark={{
                                    borderColor: "gray.600",
                                }}
                                borderColor="coolGray.200"
                                pl="4"
                                pr="5"
                                py="2"
                            >
                                <HStack space={3} justifyContent="space-between">
                                    <Avatar
                                        key={datos.img_11}
                                        size="88px"
                                        source={{
                                            uri: 'https://www.sit-zac.org.mx/welcome_template/assets/img/team/' + datos.img_11
                                        }}
                                    />
                                    <VStack>
                                        <Text
                                            _dark={{
                                                color: "warmGray.50",
                                            }}
                                            color="coolGray.800"
                                            bold
                                        >
                                            {datos.text_31}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: "warmGray.200",
                                            }}
                                        >
                                            {datos.textarea8}
                                        </Text>
                                    </VStack>

                                </HStack>
                            </Box>
                        </Box>
                    </TouchableHighlight>
                    <TouchableHighlight
                        key={3}
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={() => navigation.navigate('DetalleMagistrados', {
                            titulo: datos.text_34, img: datos.img_12, nombre: datos.text_33, des: datos.textarea9
                            , captura: datos.updated_at, twiter: datos.link_9, face: datos.link_10, insta: datos.link_11, linke: datos.link_12
                        })}
                    >
                        <Box
                            w={{
                                base: "80%",
                                md: "25%",
                            }}
                        >
                            <Heading fontSize="xl" p="8" pb="3">
                                {datos.text_34}
                            </Heading>
                            <Box
                                borderBottomWidth="1"
                                _dark={{
                                    borderColor: "gray.600",
                                }}
                                borderColor="coolGray.200"
                                pl="4"
                                pr="5"
                                py="2"
                            >
                                <HStack space={3} justifyContent="space-between">
                                    <Avatar
                                        size="88px"
                                        key={datos.img_12}
                                        source={{
                                            uri: 'https://www.sit-zac.org.mx/welcome_template/assets/img/team/' + datos.img_12
                                        }}
                                    />
                                    <VStack>
                                        <Text
                                            _dark={{
                                                color: "warmGray.50",
                                            }}
                                            color="coolGray.800"
                                            bold
                                        >
                                            {datos.text_33}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: "warmGray.200",
                                            }}
                                        >
                                            {datos.textarea9}
                                        </Text>
                                    </VStack>

                                </HStack>
                            </Box>
                        </Box>
                    </TouchableHighlight>
                </Center>
            </NativeBaseProvider>
        )
    }
}


const styles = StyleSheet.create({
    touch: {
        alignContent: 'stretch',

    },
})



