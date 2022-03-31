import React, { useState, useEffect } from "react"
import { Image, Center, NativeBaseProvider, PresenceTransition, Text, Heading, VStack, View } from "native-base"
import { ImageBackground, StyleSheet, ActivityIndicator } from "react-native";

export default function welcome({ navigation }) {
    const [cargando, setCargando] = useState(true)
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(true)
        setTimeout(function(){navigation.navigate('Inicio')}, 4000)
    }, [])



    return (
        <NativeBaseProvider>
            <ImageBackground source={require("../assets/fondo1.png")} resizeMode="cover" style={styles.image}>
                <Center flex={1} px="3">
                    <PresenceTransition
                        visible={isOpen}
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                            transition: {
                                duration: 800,
                            },
                        }}
                    >

                        <VStack space={0} alignItems="center" mt={0}>
                            <Heading textAlign="center" mb="10">
                                Conoce nuestra nueva App...
                            </Heading>
                            <Image
                                size={300}
                                resizeMode={"contain"}
                                borderRadius={280}
                                source={{
                                    uri: "https://www.sit-zac.org.mx/welcome_template/assets/img/zacatecas.jpg",
                                }}
                                alt="Alternate Text"
                            />
                            <Text fontSize="lg">Tribunal de Justicia Administrativa</Text>
                            <Text fontSize="xl">del Estado de Zacatecas</Text>
                        </VStack>
                    </PresenceTransition>
                    <View>
                        {cargando ?
                            <View>
                                <Text>Cargando...</Text>
                                <ActivityIndicator size='large' color='#000fff'></ActivityIndicator>
                            </View> :
                            <View></View>
                        }
                    </View>
                </Center>
            </ImageBackground>
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 42,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000c0"
    }
});
