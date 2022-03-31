import React, { useState, useEffect } from 'react';
import {
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input,
    Link,
    Button,
    HStack,
    Center,
    NativeBaseProvider,
} from "native-base"
import * as global from "../../components/Global";
import MsjError from '../../components/AlertWarning';
import Footer from '../../components/Footerl';

export default function Login({ setLogin, showLogin, navigation }) {
    const [email, setEmail] = useState(global.EMAIL);
    const [error_email, setErrorEmail] = useState(null);
    const [validacion, setValidacion] = useState(false);
    const [texto, setTexto] = useState(null);

    async function postForm() {
        if (email == null || email == "" || email == undefined) {
            setErrorEmail('El email requerido.');
        }
        else {
            setErrorEmail('');
            const data = { 'email': email };
            const res = await fetch('https://www.sit-zac.org.mx/guardar_servicio_guardar_subscripcion', {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'aplication/json, image/png',
                    'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
                },
            });
            const json_ = await res.json();
            if (json_ == 1) {
                setErrorEmail('El email que ingreso, ya se encuentra registrado en la suscripción del boletín electrónico.');
                setValidacion(false);
            } else {
                setErrorEmail('');
                setTexto('Suscripción guardada correctamente.');
                setValidacion(true);

            }
        }
    }

    async function valida() {
        const data = { 'email': email };
        const res = await fetch('https://www.sit-zac.org.mx/guardar_servicio_guardar_subscripcion', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const json_ = await res.json();
        if (json_ == 1) {
            setTexto('Actualmente, cuenta con la Suscripción activa del boletín electrónico.');
            setValidacion(true);

        }
    }

    useEffect(() => {
        valida();
    }, [email])


    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading
                        size="lg"
                        fontWeight="600"
                        color="coolGray.800"

                    >
                        Suscríbete
                    </Heading>
                    <Heading
                        mt="1"
                        color="coolGray.600"
                        fontWeight="medium"
                        size="xs"
                    >
                        Recibe a todas las publicaciones del boletín electrónico a tu correo electrónico!
                    </Heading>

                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label>Email</FormControl.Label>
                            <Input
                                onChangeText={(value) => setEmail(value)}
                                value={email}
                                placeholder="Ingresa tu email"
                            />
                            <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                                {error_email}
                            </FormControl.HelperText>
                        </FormControl>
                        <Button mt="2" colorScheme="indigo"
                            onPress={() => {
                                postForm()
                            }}>
                            Suscríbete
                        </Button>
                        {validacion ?
                            < MsjError ruta={'Inicio'} navigation={navigation} title={'Guardado'} texto={texto} tipo={'success'} />
                            :
                            <></>
                        }



                        <HStack mt="6" justifyContent="center">
                            <Text
                                fontSize="sm"
                                color="coolGray.600"
                            >
                                En cualquier momento puedes{" "}
                            </Text>
                            <Link
                                _text={{
                                    color: "indigo.500",
                                    fontWeight: "medium",
                                    fontSize: "sm",
                                }}
                                onPress={() => navigation.navigate('EliminarSubs')}
                            >
                                anular la suscripción.
                            </Link>
                        </HStack>
                    </VStack>
                </Box>
            </Center>

            <Footer navigation={navigation}/>
        </NativeBaseProvider>
    )
}


