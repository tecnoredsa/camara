import React, { useState, useEffect } from 'react';
import { Heading, Center, HStack, NativeBaseProvider, Spinner } from "native-base"

export default function Cargando({ texto }) {
    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <HStack space={2} alignItems="center">
                    <Spinner accessibilityLabel="Loading posts" />
                    <Heading color="primary.500" fontSize="md">
                        {texto}...
                    </Heading>
                </HStack>
            </Center>
        </NativeBaseProvider>

    )
}
