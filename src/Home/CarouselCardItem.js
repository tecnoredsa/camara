import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ActivityIndicator, TouchableHighlight } from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Button, Box, Heading, AspectRatio, FormControl, Center, HStack, Stack, NativeBaseProvider, Spinner, Icon } from "native-base"
const isEqual = require("react-fast-compare");

const { width, height } = Dimensions.get('window');

export const SLIDER_WIDTH = Dimensions.get('window').width + 120
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const CarouselCardItem = ({ item, index, navigation }) => {

  return (
    <TouchableHighlight
      key={item.id}
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={() => navigation.navigate('DetalleNoticias', { id_noticia: item.id })}>
      <View style={styles.container} key={index}>
        <Image
          source={{ uri: 'https://www.sit-zac.org.mx/PORTADAS/' + item.portada }}
          style={styles.image}
        />
        <Text style={styles.header}>{item.nombre}</Text>
        <Text style={styles.body}>{item.descripcion}</Text>
      </View>
    </TouchableHighlight>
  )
}

export default function carousel({ navigation }) {
  const [cargando, setCargando] = useState(true)
  const [index_carr, setIndex] = useState(0)
  const [noticias, setNoticias] = useState([])
  const latestProps = useRef();

  const fetchUser = async () => {
    const response = await fetch('https://www.sit-zac.org.mx/getNoticias')
    const data = await response.json()
    if (!latestProps.avisos || latestProps.avisos && (data.avisos.length != latestProps.avisos.length)) {
      if (data.avisos.length > 0) {
        setCargando(false)
        setNoticias(data.avisos)
        latestProps.avisos = data.avisos;
      }
    } else if (latestProps.avisos && (data.avisos.length == latestProps.avisos.length)) {
      const dif = isEqual(latestProps.avisos, data.avisos);
      if (dif == true) {
        // es igual
      } else {
        setCargando(false)
        setNoticias(data.avisos)
        latestProps.avisos = data.avisos;
      }

    }
  }

  useEffect(() => {
    const interval = setInterval(fetchUser, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);


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
          loop={true}
          autoplay={true}
          enableMomentum={false}
          autoplayInterval={4000}
          autoplayDelay={4000}
          activeAnimationType='decay'
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
