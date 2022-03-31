import React from "react"
import { Text, Flex, HStack, VStack, Stack, Center, Heading, NativeBaseProvider, CardItem, StatusBar, Body, Box, Fab, Icon, Divider } from "native-base"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { Pressable,Dimensions } from 'react-native';
import * as global from "./Global";
const { width, height } = Dimensions.get('window');
 
export const WIDTH = Dimensions.get('window').width-25;
export const HEIGTH = Dimensions.get('window').height;

export default function Example({ navigation }) {
   

    const [selected, setSelected] = React.useState(0);
    return (
        
            <Box bg="white" position="relative" height="50px"  safeAreaTop width="100%"  >               
                <HStack bg="#rgb(81, 52, 45)" alignItems="center" safeAreaBottom shadow={6}>
                    <Pressable cursor="pointer" opacity={selected === 0 ? 1 : 0.5} py="3" flex={1} 
                    onPress={() => setSelected(0) & navigation.navigate('Inicio')}
                   >
                        <Center>
                            <Icon mb="1" as={<MaterialCommunityIcons name={selected === 0 ? "home" : "home-outline"} />} color="white" size="sm" />
                            <Text color="white" fontSize="12">
                                SIT-ZAC
                            </Text>
                        </Center>
                    </Pressable>
                    <Pressable cursor="pointer" opacity={selected === 1 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(1) & navigation.navigate('Busqueda')}>
                        <Center>
                            <Icon mb="1" as={<MaterialIcons name="search" />} color="white" size="sm" />
                            <Text color="white" fontSize="12">
                                Buscar
                            </Text>
                        </Center>
                    </Pressable>
                    <Pressable cursor="pointer" opacity={selected === 2 ? 1 : 0.6} py="2" flex={1} onPress={() => setSelected(2) & navigation.navigate('Calendario')}>
                        <Center>
                            <Icon mb="1" as={<MaterialCommunityIcons name={selected === 2 ? "calendar" : "calendar-outline"} />} color="white" size="sm" />
                            <Text color="white" fontSize="12">
                                Calendario
                            </Text>
                        </Center>
                    </Pressable>
                    <Pressable cursor="pointer" opacity={selected === 3 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(3)& navigation.navigate('Micuenta')}>
                        <Center>
                            <Icon mb="1" as={<MaterialCommunityIcons name={selected === 3 ? "account" : "account-outline"} />} color="white" size="sm" />
                            <Text color="white" fontSize="12">
                                Mi cuenta
                            </Text>
                        </Center>
                    </Pressable>
                </HStack>
            </Box>
       
    )


}