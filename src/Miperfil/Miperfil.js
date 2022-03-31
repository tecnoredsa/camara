import React, { useState, useEffect } from 'react';
import {
    VStack,
    Button,
    FormControl,
    Input,
    NativeBaseProvider,
    Center,
    Spinner,
    HStack,
    Heading,
} from 'native-base';

import * as global from "../../components/Global";
import { TouchableHighlight, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Footer from '../../components/Footerl';

export default function BuildingAFormExample({ navigation }) {
    const [user, setUser] = useState([])
    const [cargando, setCargando] = useState(true)
    const [image, setImage] = useState(null);
    const [image64, setImage64] = useState('');

    const [nombre, setNombre] = useState(null);
    const [apellido_p, setApellidoP] = useState(null);
    const [apellido_m, setApellidoM] = useState(null);
    const [celular, setCelular] = useState(null);
    const [email, setEmail] = useState(null);

    const [error_email, setErrorEmail] = useState(null);
    const [error_celular, setErrorCelular] = useState(null);

    useEffect(() => {
        fetch('https://www.sit-zac.org.mx/getUserApi/' + global.ID_USER)
            .then(res => res.json())
            .then(data => {
                setUser(data.user)
                setImage('https://www.sit-zac.org.mx/img/perfiles/' + user.img);
                setNombre(user.name);
                setApellidoP(user.apellido_p);
                setApellidoM(user.apellido_m);
                setCelular(user.celular);
                setEmail(user.email);
                setCargando(false)
            })
    }, [user.name])


    function validateEmail() {
        if (email === undefined || email === null || email === "") {
            setErrorEmail('Email requerido');
            return false;
        } else {
            setErrorEmail(null);
            return true;
        }

    }

    function validateCelular() {
        if (celular === undefined || celular === null || celular === "") {
            setErrorCelular('Teléfono requerido');
            return false;
        } else if (celular.length < 10 || celular.length > 10) {
            setErrorCelular('El nùmero de teléfono no es valido');
            return false;
        } else {
            setErrorCelular(null);
            return true;
        }


    }


    async function postData(data) {
        const response = await fetch('https://www.sit-zac.org.mx/guardar_servicio_perfil', {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const json_ = await response.json();
        if (json_ == 3) {
            setErrorEmail('El email que ingreso ya se encuentra registrado');
        } else if (json_ == 4) {
            setErrorCelular('El Teléfono que ingreso ya se encuentra registrado');
        } else {
            alert('Datos Actualizados');
        }

    }



    function onSubmit() {
        validateEmail() && validateCelular() ?
            postData({ image64:image64 ,id: user.id, email: email, email_ant: user.email, password: global.PASS, name: nombre, apellido_p, apellido_m, celular, celular_ant: user.celular })
            :
            console.log('Validation Failed');
    };





    function validate(text) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            setErrorEmail('El formato del email es incorrecto');
            setEmail(text);
            return false;
        }
        else {
            setErrorEmail(null);
            setEmail(text);
        }
    }


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            setImage64(result.base64);
        }
    };

    if (cargando) {
        return (
            <NativeBaseProvider>
                <Center flex={1} px="3">
                    <HStack space={2} alignItems="center">
                        <Spinner accessibilityLabel="Loading posts" />
                        <Heading color="primary.500" fontSize="md">
                            Cargando perfil
                        </Heading>
                    </HStack>
                </Center>
            </NativeBaseProvider>
        )
    } else {
        return (
            <NativeBaseProvider>
                <Center flex={1}>
                    <VStack width="90%" mx="3">
                        <Center px="3">


                            <TouchableHighlight onPress={pickImage}>
                                <Image
                                    style={{ width: 200, height: 200 }}
                                    key={user.id}
                                    alt="fallback text"
                                    borderRadius={100}
                                    source={{ uri: image }}
                                />
                            </TouchableHighlight>

                        </Center>
                        <FormControl isRequired>
                            <FormControl.Label _text={{ bold: true }}>Nombre</FormControl.Label>
                            <Input
                                value={nombre}
                                placeholder="Ingresa tu nombre"
                                onChangeText={(value) => setNombre(value)}
                            />

                        </FormControl>

                        <FormControl isRequired>
                            <FormControl.Label _text={{ bold: true }}>Apellido Paterno</FormControl.Label>
                            <Input
                                value={apellido_p}
                                placeholder="Ingresa tu nombre"
                                onChangeText={(value) => setApellidoP(value)}
                            />

                        </FormControl>

                        <FormControl>
                            <FormControl.Label _text={{ bold: true }}>Apellido Materno</FormControl.Label>
                            <Input
                                value={apellido_m}
                                placeholder="Ingresa tu nombre"
                                onChangeText={(value) => setApellidoM(value)}
                            />

                        </FormControl>



                        <FormControl isRequired>
                            <FormControl.Label _text={{ bold: true }}>Email</FormControl.Label>
                            <Input
                                value={email}
                                placeholder="Ingresa tu email"
                                onChangeText={(value) => validate(value)}
                            />
                            <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                                {error_email}
                            </FormControl.HelperText>

                        </FormControl>

                        <FormControl >
                            <FormControl.Label _text={{ bold: true }}>Teléfono</FormControl.Label>
                            <Input
                                value={celular}
                                placeholder="Ingresa tu nùmero de celular"
                                onChangeText={(value) => setCelular(value)}
                            />
                            <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                                {error_celular}
                            </FormControl.HelperText>

                        </FormControl>

                        <Button onPress={onSubmit} mt="5" colorScheme="cyan">
                            Actualizar
                        </Button>
                    </VStack>
                </Center>
                <Footer navigation={navigation }/> 
            </NativeBaseProvider>
        );
    }
}
