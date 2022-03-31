import React, { useState, useEffect } from 'react';
import { Modal, FormControl, Input, Box, Button, CloseIcon, Icon, Center, HStack, } from "native-base"
import { Ionicons } from "@expo/vector-icons"

export default function Example(route) {
    const [showModal, setShowModal] = useState(false);
    return <>

        <Button
            shadow={2} onPress={() => setShowModal(true)}
            variant="subtle"
            mb="2"
            colorScheme="danger"
            endIcon={<Icon as={Ionicons} name="close-circle-outline" size="sm" />}
        >
            Cancelar cita
        </Button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>¿Estas seguro?</Modal.Header>
                <Modal.Body>
                    <Box pl="6" _text={{
                        color: "danger"
                    }}>
                        Que deseas cancelar la cita
                    </Box>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            setShowModal(false);
                        }}>
                            Cancelar
                        </Button>
                        <Button onPress={() => {
                            setShowModal(false)&
                            route.funcion();
                        }}>
                            Si,confirmar
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </>;
};