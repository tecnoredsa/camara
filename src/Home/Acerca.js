///new
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Image, ActivityIndicator, TouchableHighlight } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { HStack, AspectRatio, Text, Avatar, Heading, FlatList, Box, Input, Icon, Stack, Center, NativeBaseProvider, Button, Badge, Spacer, Spinner, Hidden } from "native-base";

const { width, height } = Dimensions.get('window');

export const SLIDER_WIDTH = Dimensions.get('window').width + 120
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const CarouselCardItem = ({ item, index, navigation }) => {
    return (
        <TouchableHighlight
            key={item.id}
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => { navigation.navigate( item.nav) }}
        >
            <Center flex={1} px="3">
                <Box
                    maxW="800"
                    rounded="lg"
                    overflow="hidden"
                    borderColor="coolGray.200"
                    borderWidth="1"
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
                        <AspectRatio w="100%" ratio={16 / 9}>
                            <Image
                                source={{
                                    uri: "https://www.sit-zac.org.mx/welcome_template/assets/img/skills.png",
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
                            position="absolute"
                            bottom="0"
                            px="3"
                            py="1.5"
                        >
                            {item.nombre}
                        </Center>
                    </Box>
                    <Stack p="4" space={3}>
                        <Stack space={2}>
                            <Heading size="md" ml="-1">
                            {item.nombre}
                            </Heading>
                            <Text
                                fontSize="xs"
                                _light={{
                                    color: "#rgb(151, 132, 102)",
                                }}
                                _dark={{
                                    color: "#rgb(151, 132, 102)",
                                }}
                                fontWeight="500"
                                ml="-0.5"
                                mt="-1"
                            >
                                Guadalupe, Zacatecas.
                            </Text>
                        </Stack>
                        <Text fontWeight="400">
                        {item.des} Leer mas...
                        </Text>
                        <HStack alignItems="center" space={4} justifyContent="space-between">
                            <HStack alignItems="center">
                                <Text
                                    isTruncated='true'
                                    color="coolGray.600"
                                    _dark={{
                                        color: "warmGray.200",
                                    }}
                                    fontWeight="400"
                                >
                                     {item.updated_at}
                                </Text>
                            </HStack>
                        </HStack>
                    </Stack>
                </Box>
            </Center>

        </TouchableHighlight>
    )
}

export default function carousel({ navigation }) {
    const [cargando, setCargando] = useState(true)
    const [index_carr, setIndex] = useState(0)
    const [noticias, setNoticias] = useState([])
    const fetchUser = async () => {
        const response = await fetch('https://www.sit-zac.org.mx/getContenidoApp')
        const data = await response.json()
        setNoticias(data)
        setCargando(false)
    }


    useEffect(() => {
        fetchUser();
    }, [])


    const isCarousel = React.useRef(null)

    if (cargando) {
        return (
            <NativeBaseProvider>
                <Center flex={1} px="3">
                    <HStack space={2} alignItems="center">
                        <Spinner accessibilityLabel="Loading posts" />
                        <Heading color="primary.500" fontSize="md">
                            Cargando...
                        </Heading>
                    </HStack>
                </Center>
            </NativeBaseProvider>
        )
    } else {
        return (
            <View>
                <Carousel
                    layout="default"
                    layoutCardOffset={9}
                    ref={isCarousel}
                    data={noticias}
                    renderItem={({ item }) => {
                        return <CarouselCardItem item={item} navigation={navigation} />
                    }}
                    sliderWidth={SLIDER_WIDTH}
                    itemWidth={ITEM_WIDTH}
                    inactiveSlideShift={0}
                    useScrollView={true}
                    navigation={navigation}
                    onSnapToItem={(index) => setIndex(index)}
                />
                <Pagination
                    dotsLength={noticias.length}
                    activeDotIndex={index_carr}
                    containerStyle={{ backgroundColor: 'transparent' }}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 8,
                        backgroundColor: '#rgb(151, 132 , 102)'
                    }}
                    inactiveDotStyle={{
                        // Define styles for inactive dots here
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 30,
        width: ITEM_WIDTH,
        paddingBottom: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    image: {
        width: ITEM_WIDTH,
        height: 250,
        resizeMode: 'stretch',
    },
    header: {
        color: "#222",
        fontSize: 15,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingTop: 20
    },
    body: {
        color: "#222",
        fontSize: 12,
        paddingLeft: 20,
        paddingLeft: 20,
        paddingRight: 20
    }
})
