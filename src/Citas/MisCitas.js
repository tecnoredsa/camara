import React, { useState, useEffect } from 'react';
import { Fab, HStack, VStack, Text, Avatar, Heading, Divider, FlatList, Box, Input, Icon, Stack, Center, NativeBaseProvider, Button, Badge, Spacer, Spinner, Hidden } from "native-base";
import { Keyboard, StyleSheet, TouchableOpacity, TouchableHighlight, View, Dimensions, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"
import * as global from "../../components/Global";
import Footer from '../../components/Footerl';
import { FontAwesome } from '@expo/vector-icons';
import Datapicker from '../../components/DatePicker';

export default function Expedientes({ navigation }) {

    const [busqueda, setBusqueda] = useState(null);
    const [resultados, setResultados] = useState([]);
    const [cargando, setCargando] = useState(true)
    const [cargandoMas, setCargandoMas] = useState(false)
    const [cargandoBusqueda, setCargandoBusqueda] = useState(false)
    const [totalresultados, SetTotalresultados] = useState(0);
    const [count, setCount] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const fetchBusqueda = async (date) => {
        const data_search = { 'email': global.EMAIL, 'password': global.PASS, 'fecha': date };
        setCargandoBusqueda(true)
        const response = await fetch('https://www.sit-zac.org.mx/guardar_servicio_buscar_cita', {
            method: 'post',
            body: JSON.stringify(data_search),
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const data = await response.json()
        const total = data.citas.length;
        SetTotalresultados(total);
        setResultados(data.citas);
        setCargandoBusqueda(false)
    }

    const getData = async () => {
        setCargandoMas(true);
        const data = { 'email': global.EMAIL, 'password': global.PASS };
        const response = await fetch('https://www.sit-zac.org.mx/guardar_servicio_mostrar_mis_citas', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const json_ = await response.json();
        setResultados(json_.citas);
        setCargandoMas(false);
    }

    useEffect(async () => {
        getData();
        setCargando(false);
    }, [count])

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false) & fetchBusqueda());
    }, []);

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
                        <Text style={styles.btnText}>Cargar más citas</Text>
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
                        <Badge colorScheme="danger">Lo sentimos no encontramos citas registradas.</Badge>
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
                onPress={() => setCount(count + 1) & navigation.navigate('DetalleCitas', { id_cita: item.id, count: count, setCount: setCount })}
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
                                {item.tipo_cita}
                            </Text>
                            <Text
                                color="coolGray.600"
                                _dark={{
                                    color: "warmGray.200",
                                }}
                            >
                                {item.fecha} ({item.estado})
                            </Text>
                            <Text
                                fontSize="xs"
                                color="coolGray.800"
                            >
                                {item.folio}
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
                            {item.hora}
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
                            Cargando citas...
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
                        <Datapicker fetchBusqueda={fetchBusqueda} />
                        <Divider />
                    </Stack>
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

                    <ScrollView style={styles.scroll}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }>
                        <FlatList
                            data={resultados}
                            ListFooterComponent={renderFooter}
                            renderItem={ItemView}
                            keyExtractor={(item) => item.id}
                        />
                    </ScrollView>
                </Stack>
                <Box h={-50} position="relative" w="40%">
                    <Fab
                        onPress={() => setCount(count + 1) & navigation.navigate('AgregarCita', { count: count, setCount: setCount })}
                        right={2}
                        bottom={20}
                        borderRadius="full"
                        colorScheme="primary"
                        placement="bottom-right"
                        icon={
                            <FontAwesome name="plus-circle" size={24} color="white" />

                        }
                        label="Registrar"
                    />
                </Box>
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