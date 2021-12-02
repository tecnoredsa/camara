import * as React from 'react';
import { View, Text ,Pressable,StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




function Contactos() {
  return (
    <View style={styles.compo}>
      <Text>Aqui van los contactos</Text>
    </View>
  )
}

function Puntos() {
  return (
    <View style={styles.compo}>
      <Text style={styles.texto}>Aqui van los puntos</Text>
    </View>
  )
}


function Inicio({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Página o componente inicial</Text>
      <Pressable
      style={styles.button}
        OnPress={() => navigation.navigate('Contactos')}>
        <Text  style={styles.texto}>Contactos</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        OnPress={() => navigation.navigate('Puntos')}>
        <Text style={styles.texto}>Puntos</Text>
      </Pressable>
    </View>
  )
}


const Stack = createNativeStackNavigator();
  
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Contactos" component={Contactos} />
        <Stack.Screen name="Puntos" component={Puntos} />
      </Stack.Navigator>
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

export default App;

