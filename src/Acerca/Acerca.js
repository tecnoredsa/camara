import React, { useState, useEffect } from 'react';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, ScrollView, Stack, NativeBaseProvider, Link } from "native-base"
import { StyleSheet, TouchableHighlight, View, Dimensions, ActivityIndicator } from "react-native";
import Footer from '../../components/Footerl';
import Loading from '../../components/Cargando';


export default function Example({ route, navigation }) {
  const [datos, setDatos] = useState([])
  const [cargando, setCargando] = useState(true)



  async function traer_Datos() {
    const response = await fetch('https://www.sit-zac.org.mx/getContenidoApp');
    const json = await response.json();
    setDatos(json[0]);
    setCargando(false);
  }

  useEffect(() => {
    traer_Datos();
  }, [])

  if (cargando) {
    return(
    <Loading texto={'Cargando acerca de'} />
    );
  } else {
    return (
      <NativeBaseProvider>
        <ScrollView h="100%" r="100%">
          <Center flex={1} px="3">
            <Box alignItems="center">
              <Box
                width="107%"
                height="100%"

                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="0"
                _dark={{
                  borderColor: "coolGray.600",
                  backgroundColor: "gray.700",
                }}
                _web={{
                  shadow: 2,
                  borderWidth: 0,
                }}
                _light={{
                  backgroundColor: "gray.50",
                }}
              >
                <Box>
                  <AspectRatio w="100%" ratio={8 / 1}>
                    <Image source={{
                      uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
                    }} alt="image" />
                  </AspectRatio>
                  <Center bg="#rgb(151, 132, 102)" _dark={{
                    bg: "#rgb(151, 132, 102)"
                  }} _text={{
                    color: "warmGray.50",
                    fontWeight: "700",
                    fontSize: "xs"
                  }} position="absolute" bottom="0" px="3" py="1.5">
                    {datos.nombre}
                  </Center>
                </Box>
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading size="md" ml="-1">
                      {datos.nombre}
                    </Heading>
                    <Text fontSize="xs" _light={{
                      color: "#rgb(151, 132, 102)"
                    }} _dark={{
                      color: "#rgb(151, 132, 102)"
                    }} fontWeight="500" ml="-0.5" mt="-1">
                      Tribunal de
                      Justicia Administrativa del Estado de Zacatecas
                    </Text>
                  </Stack>                 
                  <Text
                    textAlign="justify"
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                    fontWeight="400"
                  >
                    {datos.texto}
                  </Text>

                  <Text
                    textAlign="justify"
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                    fontWeight="400"
                  >
                    Le invitamos a conocer másen nuestra pagina oficial{" "}
                    <Link href="https://www.trijazac.gob.mx" isExternal _text={{
                      color: "blue.400"
                    }} mt={1.5} _web={{
                      mb: -1
                    }}>
                      www.trijazac.gob.mx
                    </Link>.

                  </Text>
                  <HStack alignItems="center" space={4} justifyContent="space-between">
                    <HStack alignItems="center">
                      <Text color="coolGray.600" _dark={{
                        color: "warmGray.200"
                      }} fontWeight="400">
                        {datos.up}
                      </Text>
                    </HStack>
                  </HStack>
                </Stack>
              </Box>
            </Box>
          </Center>
        </ScrollView>
        <Footer navigation={navigation} />
      </NativeBaseProvider>
    );
  }
}