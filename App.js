import * as React from 'react';
import { View, Text, Pressable, StyleSheet ,Button} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';



function Contactos() {
  return (
    <View style={styles.compo}>
      <Text>Aqui van los contactos</Text>
      <Button
        title="Regresar"
        onPress={() => navigation.goBack()} />
    </View>
  )
}

function Puntos() {
  return (
    <View style={styles.compo}>
      <Text style={styles.texto}>Aqui van los puntos</Text>
      <Button
        title="Regresar"
        onPress={() => navigation.goBack()} />
    </View>
  )
}


function Inicio({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Página o componente inicial</Text>
      <Button
        title="Ir a contactos"
        onPress={() => navigation.navigate('Contactos')} />
     <Button
        title="Ir a Puntos"
        onPress={() => navigation.navigate('Puntos')} />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Inicio" component={Inicio} />
        <Drawer.Screen name="Contactos" component={Contactos} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  compo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  button: {
    backgroundColor: 'blue',
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 5,

  },
  texto: {
    fontSize: 15,
    color: 'white',
    marginBottom: 15,

  },

});

