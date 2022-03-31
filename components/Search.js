import React from 'react';
import {
    VStack,
    Input,
    Button,
    IconButton,
    Icon,
    Text,
    NativeBaseProvider,
    Center,
    Box,
    Divider,
    Heading,
} from 'native-base';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function SearchBar({ navigation }) {
    return (
        <NativeBaseProvider>
            <Center flex={1} px="2">
                <VStack width="80%" space={5} mb="2.5" mt="1.5" alignItems="center">
                    <Input
                        onFocus={() =>navigation.navigate('Busqueda')} 
                        placeholder="En que podemos ayudarte"
                        bg="#fff"
                        width="100%"
                        borderRadius="4"
                        py="3"
                        px="1"
                        fontSize="14"
                        _web={{
                            _focus: { borderColor: 'muted.300', style: { boxShadow: 'none' } },
                        }}
                        InputLeftElement={
                            <Icon
                                m="2"
                                ml="3"
                                size="6"
                                color="gray.400"
                                as={<MaterialIcons name="search" />}
                            />
                        }
                        InputRightElement={
                            <Icon
                                m="2"
                                mr="3"
                                size="6"
                                color="gray.400"
                                as={<MaterialIcons name="mic" />}
                            />
                        }
                    />
                </VStack>
            </Center>
        </NativeBaseProvider>

    );
}


