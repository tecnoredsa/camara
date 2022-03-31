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
    NativeBaseProvider, Divider, Image
} from "native-base"
import base64 from 'react-native-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as global from "../../components/Global";
import * as getLogin from "../../components/GetLogin";
import * as StorageLogin from "../../components/StorageLogin";
import { ImageBackground, StyleSheet } from 'react-native';

export default function Login({ setLogin, showLogin, expoPushToken, navigation }) {
    const [email, setEmail] = useState(null);
    const [pass, setPass] = useState('');
    const [password, setPassword] = useState(null);

    const [error_password, setErrorPass] = useState(null);
    const [error_email, setErrorEmail] = useState(null);



    async function postForm(data) {
        const res = await fetch('https://www.sit-zac.org.mx/guardar_servicio_login', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const json_ = await res.json();
        if (json_ == 1) {
            setErrorPass('Contraseña incorrecta, favor de verificarla');
        } else if (json_ == 2) {
            setErrorEmail('El email no existe, favor de verfificarlo');
        } else if (json_.user) {
            global.ID_USER = json_.user.id;
            global.EMAIL = json_.user.email;
            if (json_.user.tipo_persona == "FISICA") {
                global.NOMBRE = json_.user.name + " " + json_.user.apellido_p + " " + json_.user.apellido_m;
            } else if (json_.user.tipo_persona == "MORAL") {
                global.NOMBRE = json_.user.razon_social;
            } else {
                global.NOMBRE = json_.user.name;
            }
            global.FUNCION = json_.user.funcion;
            global.TIPO_USUARIO = json_.user.tipo_usuario;
            postToken();
            const passCod64 = base64.encode(pass);
            global.PASS = passCod64;
            StorageLogin.storeData();
            setLogin(false);
            setErrorEmail(null);
            setErrorPass(null);
        }
    }

    async function postToken() {
        const data = { 'email': global.EMAIL, 'password': global.PASS, 'token': expoPushToken };
        const response = await fetch('https://www.sit-zac.org.mx/guardar_servicio_token_notificaciones', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const result = await response.json();
    }



    const validateEmail = () => {
        if (email === undefined || email === null || email === "") {
            setErrorEmail('Email requerido');
            return false;
        } else {
            setErrorEmail(null);
            return true;
        }
    };

    const validatePass = () => {
        if (pass === undefined || pass === null || pass === "") {
            setErrorPass('Contraseña requerida');
            return false;
        } else {
            setErrorPass(null);
            return true;
        }
    };


    const onSubmit = () => {
        const passCod64 = base64.encode(pass);
        setPassword(passCod64);
        const password = passCod64;
        validateEmail() && validatePass() ?
            postForm({ email, password })
            :
            console.log('Validation Failed');
    };

    const sendMesage = (token) => {
        fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                to: token,
                title: 'Luis',
                sound: "default",
                body: "Hello world!",
                data: { data: 'id:256,ruta:boletin' },
                _displayInForeground: true,
            }),
        });
    }

    return (

        <NativeBaseProvider>
            <Center flex={1} px="3">
                <Image size={200} resizeMode={"contain"} borderRadius={150} source={{
                    uri: "https://www.sit-zac.org.mx/welcome_template/assets/img/Recurso%202-8.png"
                }} alt="SIT-ZAC" />


                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading
                        size="lg"
                        fontWeight="600"
                        color="coolGray.800"
                        _dark={{
                            color: "warmGray.50",
                        }}
                    >
                        Bienvenido
                    </Heading>
                    <Heading
                        mt="1"
                        _dark={{
                            color: "warmGray.200",
                        }}
                        color="coolGray.600"
                        fontWeight="medium"
                        size="xs"
                    >
                        Inicia sesión para continuar!
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
                        <FormControl>
                            <FormControl.Label>Contraseña</FormControl.Label>
                            <Input type="password"
                                onChangeText={(value) => setPass(value)}
                                value={pass}
                                placeholder="Ingresa tu contraseña" />
                            <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                                {error_password}
                            </FormControl.HelperText>
                            <Link
                                _text={{
                                    fontSize: "xs",
                                    fontWeight: "500",
                                    color: "indigo.500",
                                }}
                                alignSelf="flex-end"
                                mt="1"
                                href="https://www.sit-zac.org.mx/password/email"
                            >
                                Olvidaste tu contraseña?
                            </Link>
                        </FormControl>
                        <Button mt="2" colorScheme="indigo"
                            onPress={() => {
                                onSubmit()
                            }}>
                            Iniciar sesión
                        </Button>
                        <HStack mt="6" justifyContent="center">
                            <Text
                                fontSize="sm"
                                color="coolGray.600"
                                _dark={{
                                    color: "warmGray.200",
                                }}
                            >
                                Soy un nuevo usuario.{" "}
                            </Text>
                            <Link
                                _text={{
                                    color: "indigo.500",
                                    fontWeight: "medium",
                                    fontSize: "sm",
                                }}
                                href="https://www.sit-zac.org.mx/auth/register"
                            >
                                Registrar
                            </Link>
                        </HStack>
                    </VStack>
                </Box>
                <Divider />
            </Center>            
        </NativeBaseProvider>

    )
}


const styles = StyleSheet.create({
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
    },
})