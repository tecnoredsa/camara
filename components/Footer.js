import React from "react"
import { Flex, HStack, VStack, Stack, Center, Heading, NativeBaseProvider, CardItem, StatusBar, Body, Box, Fab, Icon, Divider } from "native-base"
import { Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"

export default function Example() {
    return (
        <Box bgColor="rgb(81, 52, 45)" py="3">
            {/* using theme colors to set text color */}
            <Center>
                <Text style={styles.footertitle}>SIT-ZAC</Text>

                <VStack space={4} m={1} alignItems="center">
                    <Box display="flex" flexDirection="row" >
                        <Icon
                            mb="1"
                            mr="1"
                            as={
                                <MaterialCommunityIcons
                                    name={'map-marker'}
                                />
                            }
                            color="white"
                            size="sm"
                        />
                        <Text style={styles.footertitle}>Dirección:</Text>
                    </Box>
                    <Text style={styles.footertitle2}>Avenida Pedro Coronel No. 120 A. Fraccionamiento Los Geranios. C.P. 98619 Guadalupe, Zac.</Text>                 
                    <Box display="flex" flexDirection="row" >
                        <Icon
                            mb="1"
                            mr="1"
                            as={
                                <MaterialCommunityIcons
                                    name={'email-multiple-outline'}
                                />
                            }
                            color="white"
                            size="sm"
                        />
                        <Text style={styles.footertitle}>Correo Electrónico:</Text>
                    </Box>
                    <Text style={styles.footertitle2}>presidencia@trijazac.gob.mx transparencia@trijazac.gob.mx</Text>

                    
                    <Box display="flex" flexDirection="row" >
                        <Icon
                            mb="1"
                            mr="1"
                            as={
                                <MaterialCommunityIcons
                                    name={'cellphone'}
                                />
                            }
                            color="white"
                            size="sm"
                        />
                        <Text style={styles.footertitle}>Teléfonos: </Text>
                    </Box>
                    <Text style={styles.footertitle2}>(492) 922 9327 (492) 922 2927</Text>
                    
                </VStack>


            </Center>
            <Divider bg="#rgb(151, 132 , 102)" thickness="2" mx="2" orientation="horizontal" />
            <Text style={styles.footer}>
                © Copyright Tribunal de Justicia Administrativa del Estado de Zacatecas. Todos los derechos reservados
            </Text>
        </Box>
    )
}


const styles = StyleSheet.create({
    footer: {
        marginLeft: 80,
        marginRight: 10,
        justifyContent: 'space-around',
        fontSize: 10,
        borderBottomColor: '#ccc',
        color: '#rgb(151, 132 , 102)',
        fontWeight: "bold",
        fontFamily: "sans-serif",
        alignItems: 'center',
    },
    footertitle: {
        justifyContent: 'space-around',
        fontSize: 20,
        borderBottomColor: '#ccc',
        color: '#rgb(218, 193, 164)',
        fontWeight: "bold",
        fontFamily: "sans-serif",
        alignItems: 'center',
    },
    footertitle2: {
        marginHorizontal:60,
        justifyContent: 'space-around',
        fontSize: 12,
        borderBottomColor: '#ccc',
        color: '#rgb(151, 132 , 102)',
        fontWeight: "bold",
        fontFamily: "sans-serif",
        alignItems: 'center',
    },
    caja: {
        margin: 10,
        borderBottomColor: '#ccc',

    }

})