import React, { useState, } from 'react';
import {
    VStack,
    Button,
    FormControl,
    Input,
    NativeBaseProvider,
    Center,
    TextArea,
    Image,
    Modal
} from 'native-base';
import Footer from '../../components/Footerl';



export default function BuildingAFormExample({ navigation }) {
    const [nombre, setData] = useState(null);
    const [email, setEmail] = useState(null);
    const [asunto, setAsunto] = useState(null);
    const [texto, setMensaje] = useState(null);

    const [error_nombre, setErrors] = useState(null);
    const [error_email, setErrorEmail] = useState(null);
    const [error_asunto, setErrorAsunto] = useState(null);
    const [error_mensaje, setErrorMensaje] = useState(null);
    const [data, setDataMovie] = useState([]);
    const [showModal, setShowModal] = useState(false)

    const validate = () => {
        if (nombre === undefined || nombre === null) {
            setErrors('Nombre requerido');
            return false;
        } else {
            setErrors(null);
            return true;
        }
    };

    const validateEmail = () => {
        if (email === undefined || email === null) {
            setErrorEmail('Email requerido');
            return false;
        } else {
            setErrorEmail(null);
            return true;
        }
    };

    const validateAsunto = () => {
        if (asunto === undefined || asunto === null) {
            setErrorAsunto('Asunto requerido');
            return false;
        } else {
            setErrorAsunto('');
            return true;
        }
    };

    const validateMensaje = () => {
        if (texto === undefined || texto === null) {
            setErrorMensaje('Mensaje requerido');
            return false;
        } else {
            setErrorMensaje(null);
            return true;
        }
    };

    async function postForm(data) {
        const res = await fetch('https://www.sit-zac.org.mx/guardar_servicio_contacto', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'aplication/json, image/png',
                'Accept': 'application/json, text/plain,image/png, */*',  // It can be used to overcome cors errors
            },
        });
        const json_ = await res.json();
        setShowModal(true);
        setData(null);
        setEmail(null);
        setAsunto(null);
        setMensaje(null);
        //navigation.navigate('Inicio');
        //return json_;
    }



    const onSubmit = () => {
        validate() && validateEmail() && validateAsunto() && validateMensaje() ?
            postForm({ nombre, email, asunto, texto, })
            :
            console.log('Validation Failed');
    };

    return (
        <NativeBaseProvider>
            <Center flex={1}>
                <VStack width="90%" mx="3">
                    <>
                        <Modal
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                            _backdrop={{
                                _dark: {
                                    bg: "coolGray.800",
                                },
                                bg: "warmGray.50",
                            }}
                        >
                            <Modal.Content maxWidth="350" maxH="212">
                                <Modal.CloseButton />
                                <Modal.Header>Gracias por comunicarte con nosotros</Modal.Header>
                                <Modal.Body>
                                    Tu mensaje ha sido enviado correctamente, en breve nos pondremos en contacto contigo.
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button.Group space={2}>
                                        <Button
                                            onPress={() => {
                                                setShowModal(false)
                                                navigation.navigate('Inicio')
                                            }}
                                        >
                                            Cerrar
                                        </Button>
                                    </Button.Group>
                                </Modal.Footer>
                            </Modal.Content>
                        </Modal>
                    </>
                    <Center px="3">
                        <Image
                            size={150}
                            alt="fallback text"
                            borderRadius={100}
                            source={{
                                uri: "https://www.sit-zac.org.mx/img/logo.png",
                            }}
                            fallbackSource={{
                                uri: "https://www.sit-zac.org.mx/img/logo.png",
                            }}
                        />
                    </Center>
                    <FormControl isRequired>
                        <FormControl.Label _text={{ bold: true }}>Tu nombre</FormControl.Label>
                        <Input
                            value={nombre}
                            placeholder="Ingresa tu nombre"
                            onChangeText={(value) => setData(value)}
                        />
                        <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                            {error_nombre}
                        </FormControl.HelperText>
                    </FormControl>



                    <FormControl isRequired>
                        <FormControl.Label _text={{ bold: true }}>Email</FormControl.Label>
                        <Input
                            value={email}
                            placeholder="Ingresa tu email"
                            onChangeText={(value) => setEmail(value)}
                        />
                        <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                            {error_email}
                        </FormControl.HelperText>
                    </FormControl>

                    <FormControl isRequired >
                        <FormControl.Label _text={{ bold: true }}>Asunto</FormControl.Label>
                        <Input
                            value={asunto}
                            placeholder="Ingresa el asunto"
                            onChangeText={(value) => setAsunto(value)}
                        />
                        <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                            {error_asunto}
                        </FormControl.HelperText>
                    </FormControl>

                    <FormControl isRequired>
                        <FormControl.Label _text={{ bold: true }}>Mensaje</FormControl.Label>
                        <TextArea
                            value={texto}
                            h={20}
                            placeholder="Ingresa el mensaje"
                            onChangeText={(value) => setMensaje(value)}
                            w={{
                                base: "100%",
                                md: "25%",
                            }}
                        />
                        <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                            {error_mensaje}
                        </FormControl.HelperText>
                    </FormControl>


                    <Button onPress={onSubmit} mt="5" colorScheme="cyan">
                        Enviar
                    </Button>
                </VStack>
            </Center>    
            <Footer navigation={navigation }/>           
        </NativeBaseProvider>
    );
}
