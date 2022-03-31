import React, { useState, } from 'react';
import { VStack, Button, Heading, HStack, Avatar, Stack, AspectRatio, CheckIcon, FormControl, Input, NativeBaseProvider, Center, TextArea, Image, Modal, Text, Box, Select } from 'native-base';
import Footer from '../../components/Footerl';
import { Alert, View } from 'react-native';

export default function BuildingAFormExample(route) {
    const { error_tipo, nombre, error_nombre, setData, apellido_p, setApellidoP, error_apellido, apellido_m, setApellidoM, email, error_email, setEmail, abogado, error_abogado, setAbogado, sexo, error_sexo, setSexo,
        razon_social, error_razon, setRazon, rfc, setRfc, autorizado, error_autorizado, setAutorizado, telefono, error_telefono, setTelefono, tipo_p, setTipoPersona, fisica, setFisica,
        moral, setMoral, showAbogado, setShowAbogado, cedula, error_cedula, setCedula, autoridad, setAutoridad } = route;
    //persona fisica


    const tipo_persona = ['FISICA', 'MORAL', 'AUTORIDAD'];
    const sexo_ = ['MASCULINO', 'FEMENINO'];
    const abogado_ = ['SI', 'NO'];

    function cambiaPersona(value) {
        setTipoPersona(value);
        if (value == "FISICA") {
            setFisica(true);
            setMoral(false);
        } else if (value == "MORAL") {
            setFisica(false);
            setMoral(true);
        } else if (value == "AUTORIDAD") {
            setFisica(false);
            setMoral(false);
            setAutoridad(true);
        }

    }

    function cambiaAbogado(value) {
        setAbogado(value);
        if (value == "SI") {
            setShowAbogado(true);
        } else {
            setShowAbogado(false);
        }
    }

    return (


        <VStack width="100%" mx="3">
            <Box>
                <AspectRatio w="100%" ratio={8 / 1}>
                    <Image
                        source={{
                            uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                        }}
                        alt="image"
                    />
                </AspectRatio>
                <Center
                    bg="#rgb(151, 132, 102)"
                    _dark={{
                        bg: "#rgb(151, 132, 102)",
                    }}
                    _text={{
                        color: "warmGray.50",
                        fontWeight: "700",
                        fontSize: "xs",
                    }}
                >

                    Información del usuario
                </Center>


            </Box>
            <FormControl isRequired>
                <Text italic bold mt="1.5" ml="1.5">
                    Tipo de persona
                </Text>
                <Box w="90%">
                    <Select selectedValue={tipo_p} minWidth="200" accessibilityLabel="Seleccione el tipo de persona" placeholder="Seleccione el tipo de persona" _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />
                    }} mt={1} onValueChange={itemValue => cambiaPersona(itemValue)}>
                        {tipo_persona.map(tipo_persona => <Select.Item key={tipo_persona} label={tipo_persona} value={tipo_persona} />)}
                    </Select>
                </Box>
                <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                    {error_tipo}
                </FormControl.HelperText>
            </FormControl>



            {fisica == true &&
                <View>
                    <FormControl isRequired>
                        <FormControl.Label _text={{ bold: true }}>Nombre </FormControl.Label>
                        <Input
                            w="90%"
                            value={nombre}
                            placeholder="Ingresa tu nombre"
                            onChangeText={(value) => setData(value)}
                            maxLength={30}
                        />
                        <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                            {error_nombre}
                        </FormControl.HelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label _text={{ bold: true }}>Apellido paterno </FormControl.Label>
                        <Input
                            w="90%"
                            value={apellido_p}
                            placeholder="Ingresa tu apellido paterno"
                            onChangeText={(value) => setApellidoP(value)}
                            maxLength={30}
                        />
                        <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                            {error_apellido}
                        </FormControl.HelperText>
                    </FormControl>
                    <FormControl>
                        <FormControl.Label _text={{ bold: true }}>Apellido materno </FormControl.Label>
                        <Input
                            w="90%"
                            value={apellido_m}
                            placeholder="Ingresa tu apellido materno"
                            onChangeText={(value) => setApellidoM(value)}
                            maxLength={30}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <Text italic bold mt="1.5" ml="1.5">
                            ¿Es abogado?
                        </Text>
                        <Box w="90%">
                            <Select selectedValue={abogado} minWidth="200" accessibilityLabel="Es abogado" placeholder="Es abogado" _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />
                            }} mt={1} onValueChange={itemValue => cambiaAbogado(itemValue)}>
                                {abogado_.map(abogado => <Select.Item key={abogado} label={abogado} value={abogado} />)}
                            </Select>
                        </Box>
                        <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                            {error_abogado}
                        </FormControl.HelperText>
                    </FormControl>
                    {showAbogado == true &&
                        <FormControl>
                            <FormControl.Label _text={{ bold: true }}>Número de cédula</FormControl.Label>
                            <Input
                                w="90%"
                                value={cedula}
                                placeholder="Ingresa tu número de cédula"
                                keyboardType="numeric"
                                onChangeText={(value) => setCedula(value)}
                                maxLength={8}
                            />
                            <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                                {error_cedula}
                            </FormControl.HelperText>
                        </FormControl>
                    }

                </View>

            }
            {moral == true &&
                <View>
                    <FormControl isRequired>
                        <FormControl.Label _text={{ bold: true }}>Razón social </FormControl.Label>
                        <Input
                            w="90%"
                            value={razon_social}
                            placeholder="Ingresa la razón social"
                            onChangeText={(value) => setRazon(value)}
                            maxLength={50}
                        />
                        <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                            {error_razon}
                        </FormControl.HelperText>
                    </FormControl>
                    <FormControl >
                        <FormControl.Label _text={{ bold: true }}>RFC </FormControl.Label>
                        <Input
                            w="90%"
                            value={rfc}
                            placeholder="Ingresa el RFC"
                            onChangeText={(value) => setRfc(value)}
                            maxLength={13}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label _text={{ bold: true }}>Nombre de la persona o autorizado a presentarse </FormControl.Label>
                        <Input
                            w="90%"
                            value={autorizado}
                            placeholder="Ingresa el nombre del autorizado a presentarse"
                            onChangeText={(value) => setAutorizado(value)}
                            maxLength={60}
                        />
                        <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                            {error_autorizado}
                        </FormControl.HelperText>
                    </FormControl>

                </View>
            }
            {autoridad == true &&
                <View>
                    <FormControl isRequired>
                        <FormControl.Label _text={{ bold: true }}>Nombre de la autoridad</FormControl.Label>
                        <Input
                            w="90%"
                            value={nombre}
                            placeholder="Ingresa el nombre de la autoridad"
                            onChangeText={(value) => setData(value)}
                            maxLength={30}
                        />
                        <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                            {error_nombre}
                        </FormControl.HelperText>
                    </FormControl>


                    <FormControl isRequired>
                        <FormControl.Label _text={{ bold: true }}>Nombre de la persona o autorizado a presentarse </FormControl.Label>
                        <Input
                            w="90%"
                            value={autorizado}
                            placeholder="Ingresa el nombre del autorizado a presentarse"
                            onChangeText={(value) => setAutorizado(value)}
                            maxLength={60}
                        />
                        <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                            {error_autorizado}
                        </FormControl.HelperText>
                    </FormControl>
                </View>
            }



            <View>
                <FormControl isRequired>
                    <FormControl.Label _text={{ bold: true }}>Email</FormControl.Label>
                    <Input
                        w="90%"
                        value={email}
                        placeholder="Ingresa tu email"
                        onChangeText={(value) => setEmail(value)}
                        maxLength={30}
                    />
                    <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                        {error_email}
                    </FormControl.HelperText>

                </FormControl>

                <FormControl isRequired>
                    <FormControl.Label _text={{ bold: true }}>Télefono</FormControl.Label>
                    <Input
                        w="90%"
                        keyboardType="numeric"
                        value={telefono}
                        placeholder="Ingresa un télefono de contacto"
                        onChangeText={(value) => setTelefono(value)}
                        maxLength={10}
                    />
                    <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                        {error_telefono}
                    </FormControl.HelperText>

                </FormControl>

                <FormControl isRequired>
                    <Text italic bold mt="1.5" ml="1.5">
                        Sexo
                    </Text>
                    <Box w="90%">
                        <Select selectedValue={sexo} minWidth="200" accessibilityLabel="Seleccione el sexo" placeholder="Seleccione el sexo" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mt={1} onValueChange={itemValue => setSexo(itemValue)}>
                            {sexo_.map(sexo => <Select.Item key={sexo} label={sexo} value={sexo} />)}
                        </Select>
                    </Box>
                    <FormControl.HelperText _text={{ fontSize: 'xs', color: 'error.500', fontWeight: 500 }}>
                        {error_sexo}
                    </FormControl.HelperText>
                </FormControl>
            </View>

        </VStack>


    );
}
