import React, { useState, useEffect } from 'react';
import { Divider,HStack, VStack, Text, Avatar, Heading, FlatList, Box, Input, Icon, Stack, Center, NativeBaseProvider, Button, Badge, Spacer, Spinner, Hidden } from "native-base";
import { Keyboard, StyleSheet, TouchableOpacity, TouchableHighlight, View, Dimensions, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"
import * as global from "../../components/Global";
import Footer from '../../components/Footerl';

export default function Expedientes({ navigation }) {

    const [busqueda, setBusqueda] = useState(null);
    const [resultados, setResultados] = useState([]);
    const [cargando, setCargando] = useState(true)
    const [cargandoMas, setCargandoMas] = useState(false)
    const [cargandoBusqueda, setCargandoBusqueda] = useState(false)
    const [totalresultados, SetTotalresultados] = useState(0);
    const [offset, setOffset] = useState(1);
    const [refreshing, setRefreshing] = useState(false);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setOffset(1);
        wait(1000).then(() => setRefreshing(false) & getData());
    }, []);


    const fetchBusqueda = async () => {
        Keyboard.dismiss();
        setOffset(1);
        const data_search = { 'email': global.EMAIL, 'password': global.PASS, 'query': busqueda };
        setCargandoBusqueda(true)
        const response = await fetch('https://www.sit-zac.org.mx/guardar_servicio_buscar_expedientes/' + offset, {
            method: 'post',
            body: JSON.stringify(data_search),
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const data = await response.json()
        const total = data.expedientes.length;
        SetTotalresultados(total);
        setResultados(data.expedientes);
        setCargandoBusqueda(false)
    }

    const getData = async () => {
        setCargandoMas(true);
        const data = { 'email': global.EMAIL, 'password': global.PASS };
        const response = await fetch('https://www.sit-zac.org.mx/guardar_servicio_expedientes/' + offset, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const json_ = await response.json();
        setOffset(offset + 1);
        //Increasing the offset for the next API call
        setResultados(json_.expedientes);
        setCargandoMas(false);
    }

    useEffect(async () => {
        const data = { 'email': global.EMAIL, 'password': global.PASS };
        const response = await fetch('https://www.sit-zac.org.mx/guardar_servicio_expedientes/' + offset, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const json_ = await response.json();
        setOffset(offset + 1);
        setResultados(json_.expedientes);
        setCargando(false);
    }, [])

    const renderFooter = () => {
        if (resultados.length > 4) {
            return (
                //Footer View with Load More button
                <View style={styles.footer}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={getData}
                        //On Click of button load more data
                        style={styles.loadMoreBtn}>
                        <Text style={styles.btnText}>Cargar más</Text>
                        {cargandoMas ? (
                            <ActivityIndicator
                                color="white"
                                style={{ marginLeft: 8 }} />
                        ) : null}
                    </TouchableOpacity>
                </View>
            );

        } else if (resultados.length == 0) {
            return (
                <NativeBaseProvider>

                    <Stack mb="0" mt="1.5" direction="column" space={3}>
                        <Badge colorScheme="danger">Lo sentimos no encontramos resultados.</Badge>
                    </Stack>

                </NativeBaseProvider>
            )
        } else {
            return (
                <NativeBaseProvider>

                    <Stack mb="0" mt="1.5" direction="column" space={3}>
                        <Badge colorScheme="success">Mostrando {resultados.length} resultados.</Badge>
                    </Stack>

                </NativeBaseProvider>
            );
        }
    };


    const ItemView = ({ item }) => {
        return (
            // Flat List Item
            <TouchableHighlight
                key={item.id}
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={() => navigation.navigate('DetalleExpedientes', { id_expediente: item.id })}
            >
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
                            key={item.id}
                            size="48px"
                            source={{
                                uri: 'https://www.sit-zac.org.mx/welcome_template/assets/img/logo_tja.png',
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
                                {item.num_expediente}
                            </Text>
                            <Text
                                color="coolGray.600"
                                _dark={{
                                    color: "warmGray.200",
                                }}
                            >
                                {item.fecha}
                            </Text>
                        </VStack>
                        <Spacer />
                        <Text
                            fontSize="xs"
                            _dark={{
                                color: "warmGray.50",
                            }}
                            color="coolGray.800"
                            alignSelf="flex-start"
                        >
                            {item.tipo}
                        </Text>
                    </HStack>
                </Box>
            </TouchableHighlight>
        );
    };


    if (cargando) {
        return (
            <NativeBaseProvider>
                <Center flex={1} px="3">
                    <HStack space={2} alignItems="center">
                        <Spinner accessibilityLabel="Loading posts" />
                        <Heading color="primary.500" fontSize="md">
                            Cargando expedientes...
                        </Heading>
                    </HStack>
                </Center>
            </NativeBaseProvider>


        )
    } else {
        return (
            <NativeBaseProvider>
                <Center px="3">
                    <Stack space={4} w="100%" mb="2.5" mt="1.5" alignItems="center">
                        <Input
                            _focus="true"
                            onChangeText={text => setBusqueda(text)}
                            bg="transparent"
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
                            placeholder="Buscar por número de expediente"
                        />
                    </Stack>
                    <Divider/>
                </Center>

                <Stack mb="0" mt="1.5" direction="column" space={3}>
                    {(() => {
                        if (cargandoBusqueda) {
                            return (

                                <Center >
                                    <HStack space={4} alignItems="center">
                                        <Spinner accessibilityLabel="Loading posts" />
                                        <Heading color="primary.500" fontSize="md">
                                            Buscando...
                                        </Heading>
                                    </HStack>
                                </Center>

                            )
                        }
                    })()}

                    <View style={styles.scroll}>
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                            data={resultados}
                            ListFooterComponent={renderFooter}
                            renderItem={ItemView}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                </Stack>
                <Footer navigation={navigation} />
            </NativeBaseProvider>
        )
    }
}


const styles = StyleSheet.create({
    scroll: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 180,

    },
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#800000',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
})