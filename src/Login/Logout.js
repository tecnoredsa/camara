import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import * as global from "../../components/Global";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as getLogin from "../../components/GetLogin";

import { Modal, NativeBaseProvider, FormControl, Input, Box, Button, Divider, Icon, Center, Stack, } from "native-base"
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons"

export default function LotsOfGreetings(props) {

  const { navigation } = props;
  const [showModal, setShowModal] = useState(true);
  function desloguear() {
    const valida = getLogin.getData();
    if (valida == true) {
      AsyncStorage.removeItem(global.MY_STORAGE_KEY);
      global.LOGIN = "DESLOGUEADO";
      global.FUNCION = "";
      global.EMAIL = "";
    }
    props.setLogin(true);
  }


  return (
    <NativeBaseProvider>
      <Stack direction="column" mb="4.5" mt="1.5" space={3}>
        <Center>
          <Box alignItems="flex-start">
            <Button
              shadow={2} onPress={() => setShowModal(true)}
              variant="subtle"
              mb="2"
              colorScheme="danger"
              endIcon={<Icon as={Ionicons} name="log-out-outline" size="sm" />}
            >
              Cerrar sesión
            </Button>
          </Box>
        </Center>
        <Divider />
      </Stack>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">

          <Modal.Header>¿Estas seguro?</Modal.Header>
          <Modal.Body>
            <Box pl="6" _text={{
              color: "danger"
            }}>
              Cerrar sesión
            </Box>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setShowModal(false) & navigation.navigate('Inicio');
              }}>
                Cancelar
              </Button>
              <Button onPress={() => {
                setShowModal(false) &
                  desloguear();
              }}>
                Si
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </NativeBaseProvider >


  );
}