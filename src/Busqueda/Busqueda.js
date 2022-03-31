import React, { useState, useEffect } from 'react';
import { HStack, VStack, Text, Avatar, Heading, FlatList, Box, Input, Icon, Stack, Center, NativeBaseProvider, Button, Badge, Spinner } from "native-base";
import { Keyboard, StyleSheet, TouchableHighlight, View, Dimensions, ActivityIndicator, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"
import { CommonActions } from '@react-navigation/native';
import Footer from '../../components/Footerl';

export default function Busqueda({ navigation }) {
    const [busqueda, setBusqueda] = useState(null);
    const [totalresultados, SetTotalresultados] = useState(0);
    const [resultados, setResultados] = useState([]);
    const [cargando, setCargando] = useState(false)

    const fetchBusqueda = async () => {
        Keyboard.dismiss();
        setCargando(true)
        const response = await fetch('https://www.sit-zac.org.mx/getBusquedaAyuda/' + busqueda)
        const data = await response.json()
        const total = data.resultado.length;
        SetTotalresultados(total);
        setResultados(data.resultado);
        setCargando(false)
    }



    if (cargando) {
        return (
            <NativeBaseProvider>
                <Center flex={1} px="3">
                    <HStack space={2} alignItems="center">
                        <Spinner accessibilityLabel="Loading posts" />
                        <Heading color="primary.500" fontSize="md">
                            Buscando resultados...
                        </Heading>
                    </HStack>
                </Center>
            </NativeBaseProvider>

        )
    } else {
        return (
            <NativeBaseProvider>
                <Center >
                    <Stack space={4} w="100%" mb="2.5" mt="1.5" alignItems="center">
                        <Input
                            _focus="true"
                            onChangeText={text => setBusqueda(text)}
                            bg="#DDDDDD"
                            width="100%"
                            borderRadius="4"
                            py="3"
                            px="1"
                            fontSize="14"
                            placeholderTextColor={'#8898AA'}
                            style={styles.input}
                            w={{
                                base: "100%",
                                md: "25%",
                            }}
                            InputLeftElement={
                                <Icon
                                    as={<MaterialIcons name="search" />}
                                    size={5}
                                    ml="2"
                                    color="muted.400"
                                />
                            }
                            InputRightElement={
                                <Button size="xs" rounded="none" w="1/6" h="full" onPress={() => fetchBusqueda()}>
                                    Buscar
                                </Button>
                            }
                            placeholder="En que podemos ayudarte?"
                        />
                    </Stack>
                </Center>

                <Stack mb="-5.0" mt="0" direction="column" >
                    {(() => {
                        if (!cargando) {
                            return (
                                <Badge>Se han encontrado {totalresultados} resultados relacionados con tu búsqueda.</Badge>
                            )
                        }
                    })()}
                    <ScrollView style={styles.scroll}>
                        {resultados.map(res =>
                            <TouchableHighlight
                                style={styles.touch}
                                key={res.id}
                                activeOpacity={0.6}
                                underlayColor="#DDDDDD"
                                onPress={() => navigation.navigate('DetalleBusqueda', { id_ayuda: res.id })}
                            >
                                <Box
                                    w={{
                                        base: "80%",
                                        md: "25%",
                                    }}
                                >
                                    <Heading fontSize="xl" p="8" pb="3">
                                        {res.categoria}
                                    </Heading>
                                    <Box
                                        borderBottomWidth="1"
                                        _dark={{
                                            borderColor: "gray.600",
                                        }}
                                        borderColor="coolGray.200"
                                        pl="4"
                                        pr="0"
                                        py="2"
                                    >
                                        <HStack space={2} justifyContent="space-between">

                                            <Avatar
                                                key={res.id}
                                                size="50px"
                                                source={{
                                                    uri: 'https://www.sit-zac.org.mx/welcome_template/assets/img/logo_tja.png'
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
                                                    {res.texto}
                                                </Text>
                                                <Text
                                                    color="coolGray.600"
                                                    _dark={{
                                                        color: "warmGray.200",
                                                    }}
                                                >
                                                    [{res.palabras_clave}].
                                                </Text>
                                            </VStack>

                                        </HStack>
                                    </Box>
                                </Box>
                            </TouchableHighlight>
                        )}
                    </ScrollView>                   
                </Stack>         
                <Footer navigation={navigation} />      
            </NativeBaseProvider>
        )
    }
}


const styles = StyleSheet.create({
    scroll: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 220,

    },

})