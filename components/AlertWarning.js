import React, { useState, useEffect } from 'react';
import { Alert, VStack, Text, Box, IconButton, CloseIcon, Icon, Center, HStack, } from "native-base"

export default function Example(valor) {
    const titulo = valor.title;
    const texto = valor.texto;
    const tipo = valor.tipo;
    const navigation = valor.navigation;
    const ruta = valor.ruta;
    const [showModal, setShowModal] = useState(true);

    useEffect(() => {
        setShowModal(true);
    }, [titulo])

    if (showModal)
        return (
            <Center space={3} w="90%" maxW="400">
                <Alert w="90%" maxW="400" status={tipo} colorScheme={tipo}>
                    <VStack space={2} flexShrink={1} w="100%">
                        <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                            <HStack flexShrink={1} space={2} alignItems="center">
                                <Alert.Icon />
                                <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                                    {titulo}
                                </Text>
                            </HStack>
                            <IconButton variant="unstyled" icon={<CloseIcon
                                onPress={() => {
                                    setShowModal(false);
                                }}
                                size="3" color="coolGray.600" />} />
                        </HStack>
                        <Box pl="6" _text={{
                            color: "coolGray.600"
                        }}>
                            {texto}
                        </Box>
                    </VStack>
                </Alert>
            </Center>
        ); else {
        return (
            <Center space={3} w="90%" maxW="400">

            </Center>
        );
    }
}