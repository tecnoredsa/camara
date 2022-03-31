import React, { useState, useEffect } from 'react'
import { View } from "react-native"
import { Text, StyleSheet, TextInput, Dimensions, Button, ScrollView, ImageBackground, RefreshControl } from 'react-native';
import { Flex, HStack, Center, NativeBaseProvider, StatusBar, Box, Fab, Icon, Divider } from "native-base"
import Acerca from '../src/Home/Acerca';
import Servicios from '../src/Servicios/Servicios';
import Noticias from '../src/Home/CarouselCardItem';
import Header from '../components/Header';
import Search from '../components/Search';
import Footer from '../components/Footer';
import Magistrados from '../src/Magistrados/Magistradoslist';
import { FontAwesome } from '@expo/vector-icons';
import { Linking } from "react-native";

const { width, height } = Dimensions.get('window');


export default function ListHome({ navigation }) {
    const [selected, setSelected] = useState(1);
    const [refreshing, setRefreshing] = useState(false);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);


    return (
        <NativeBaseProvider>           
            <View style={styles.container}>
                <ImageBackground source={require("../assets/fondo1.png")} resizeMode="cover" style={styles.image}>
                    <StatusBar style="auto" />
                    <ScrollView style={styles.scroll} refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }>
                        <Search navigation={navigation} />
                        <Divider w="100%" />
                        <Text style={styles.titulo}>Últimos avisos</Text>
                        <Noticias navigation={navigation} />

                        <Text style={styles.titulo}>Conoce más del Tribunal</Text>
                        <Acerca navigation={navigation} />

                        <Text style={styles.titulo}>Servicios</Text>
                        <Servicios navigation={navigation} />

                        <Text style={styles.titulo}>Magistrados</Text>
                        <Magistrados navigation={navigation} />
                        <Divider w="100%" />
                        <Box h={100} position="relative" w="70%">
                            <Fab
                                onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=+524921438276?text=Buen%20día%20quisiera%20solicitar%20información')}
                                right={0}
                                bottom={0}
                                borderRadius="full"
                                colorScheme="emerald"
                                placement="bottom-right"
                                icon={
                                    <FontAwesome name="whatsapp" size={24} color="black" />
                                }
                                label="Whatsapp"
                            />
                        </Box>
                        <Footer />

                    </ScrollView>
                </ImageBackground>
            </View>
        </NativeBaseProvider>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll: {
        width: Dimensions.get('window').width + 120,

    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    titulo: {
        fontSize: 22,
        height: 40,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        color: '#rgb(151, 132 , 102)',
        fontWeight: "bold",
        alignSelf: 'center',
        fontFamily: "sans-serif",
    },
});