import React, { useState, } from 'react';
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


export default function Login({ setLogin, showLogin, navigation }) {
    const [email, setEmail] = useState(global.EMAIL);
    const [error_email, setErrorEmail] = useState(null);
    const [validacion, setValidacion] = useState(false);

    async function postForm() {
        if (email == null || email == "" || email == undefined) {
            setErrorEmail('El email requerido.');
        } else {
            const data = { 'email': email };
            const res = await fetch('https://www.sit-zac.org.mx/guardar_servicio_eliminar_subscripcion', {
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'aplication/json, image/png',
                    'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
                },
            });
            const json_ = await res.json();
            if (json_ == 1) {
                setErrorEmail('El email que ingreso, no se encuentra registrado en la suscripción del boletín electrónico.');
                setValidacion(false);
            } else {
                setErrorEmail('');
                setValidacion(true);

            }
        }
    }


    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading
                        size="lg"
                        fontWeight="600"
                        color="coolGray.800"

                    >
                        Anular suscripción
                    </Heading>
                    <Heading
                        mt="1"
                        color="coolGray.600"
                        fontWeight="medium"
                        size="xs"
                    >
                        Dejarás de recibir todas las publicaciones del boletín electrónico en tu correo electrónico!
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
                            Anular
                        </Button>
                        {validacion ?
                            < MsjError ruta={'Inicio'} navigation={navigation} title={'Eliminada'} texto={'Se ha eliminado tu suscripción al boletín electrónico.'} tipo={'success'} />
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
                                onPress={() => navigation.navigate('Subs')}
                            >
                                volverte a suscribir.
                            </Link>
                        </HStack>
                    </VStack>
                </Box>
            </Center>

        </NativeBaseProvider>
    )
}


