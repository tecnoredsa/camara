import * as React from 'react';
import { View, useWindowDimensions, Dimensions, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { NativeBaseProvider, Center, HStack, ChevronDownIcon, Icon, List, ListItem, Separator } from 'native-base';
import { Ionicons } from "@expo/vector-icons"

const { width, height } = Dimensions.get('window');


const FirstRoute = () => (
  <View style={styles.component} >
    <NativeBaseProvider>
      <ScrollView style={styles.scroll}>
        <Image
          style={styles.tinyLogo}
          source={{ uri: 'https://www.sit-zac.org.mx/welcome_template/assets/img/why-us.png' }}
        />
        <Collapse>
          <CollapseHeader>
            <View>
              <HStack space={1}>
                <ChevronDownIcon size="5" mt="7" color="emerald.500" />
                <Text style={styles.titulo} color="emerald.500" fontSize="md">
                  ¿En que consiste el Juicio en Línea?
                </Text>
              </HStack>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text style={styles.titulo2}>Es el proceso administrativo, substanciado y resuelto, en todas sus etapas, a través del Sistema Informático del Tribunal, mediante el uso de las tecnologías de la información y de la comunicación.</Text>
          </CollapseBody>
        </Collapse>
        <Collapse>
          <CollapseHeader>
            <View>
              <HStack space={2}>
                <ChevronDownIcon size="5" mt="7" color="emerald.500" />
                <Text style={styles.titulo} color="emerald.500" fontSize="md">
                  ¿Cuál es el fundamento legal del Juicio en Línea?
                </Text>
              </HStack>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text style={styles.titulo2}>La nueva Ley de Justicia Administrativa del Estado de Zacatecas publicada el 4 de enero de 2021, da vida a la figura del Firma electrónica (e.FIJA) así como al Juicio en Línea. En ese sentido era imperante para el Tribunal de Justicia Administrativa del Estado de Zacatecas contar con las herramientas tecnológicas necesarias para poder cumplir con dicho ordenamiento. Es por eso que atendiendo a la Ley de Firma Electrónica del Estado de Zacatecas, así como la Ley antes mencionada, se creó el sistema SIT-ZAC (Sistema Informático del Tribunal de Justicia Administrativa del Estado de Zacatecas), para poder llevar a cabo los juicios en línea, y además se implementó una Infraestructura de Llave Pública, misma que servirá para poder emitir certificados de firma electrónica tanto al personal del Tribunal como a los usuarios del mismo, particulares, personas físicas y morales, autoridades, abogados, terceros, etc. para que se pueda hacer uso del sistema antes mencionado con la seguridad, confiabilidad y características de autenticidad, integridad y no repudio que cuenta la e.FIJA.</Text>
          </CollapseBody>
        </Collapse>
        <Collapse>
          <CollapseHeader>
            <View>
              <HStack space={2}>
                <ChevronDownIcon size="5" mt="7" color="emerald.500" />
                <Text style={styles.titulo} color="emerald.500" fontSize="md">
                  ¿Qué es el Sistema Informático del Tribunal?
                </Text>
              </HStack>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <Text style={styles.titulo2}>Es la aplicación implementada por el Tribunal de Justicia Administrativa del Estado de Zacatecas, que incluye entre los servicios ofrecidos, la notificación electrónica, la consulta en línea de expedientes, la digitalización de las promociones, amparos y recursos, la gestión interna del expediente, que en conjunto forman el Juicio en Línea mediante la utilización de tecnologías de primer nivel.</Text>
          </CollapseBody>
        </Collapse>
      </ScrollView>
    </NativeBaseProvider>
  </View>
);

const SecondRoute = () => (
  <View style={styles.component} >
    <Image
      style={styles.tinyLogo}
      source={{ uri: 'https://www.sit-zac.org.mx/welcome_template/assets/img/skills.png' }}
    />
    <Text style={styles.titulo2}>El juicio en línea es un procedimiento judicial que se tramita y resuelve en todas y cada una de sus etapas mediante el uso de tecnologías de la información y la comunicación a través de un sistema informático judicial.</Text>

    <Image
          style={styles.est}
          source={{ uri: 'https://www.sit-zac.org.mx/PORTADAS/PORTADA-Estad%C3%ADsticas-2021.png' }}
        />
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: '¿En que consiste el Juicio en Línea?' },
    { key: 'second', title: 'Beneficios al utilizar el jucio en línea' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}


const styles = StyleSheet.create({
  component: {
    flex: 1,

  },
  titulo: {
    fontSize: 20,
    margin: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    color: '#rgb(151, 132 , 102)',
    fontWeight: "bold",
    alignSelf: 'center',
    fontFamily: "sans-serif",
  },
  scroll: {
    width: Dimensions.get('window').width,

  },
  titulo2: {
    fontSize: 15,
    color: '#343a40',
    textAlign: 'justify',
    letterSpacing: 1,
    margin: 20,

  },
  tinyLogo: {
    width: 400,
    height: 200,
    alignSelf: 'center',
    borderTopWidth: 20
  },
  est: {
    width: 380,
    height: 200,
    alignSelf: 'center',
    borderTopWidth: 20,
    resizeMode: 'stretch',
  },

});