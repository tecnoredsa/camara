import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet,Linking, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Servicios from './screens/Servicios';
import Inicio from './screens/Inicio';
import Acerca from './src/Acerca/Acerca';
import JuicioLinea from './src/JuicioLinea/Linea';
import DetalleServicios from './src/Servicios/Detalle';
import DetalleNoticias from './src/Noticias/Detalle';
import DetalleMagistrados from './src/Magistrados/Detalle';
import Boletin from './src/Boletin/Boletin';
import VerBoletin from './src/Boletin/VerBoletin';
import Busqueda from './src/Busqueda/Busqueda';
import DetalleBusqueda from './src/Busqueda/Detalle';
import WebView from './components/Webview';
import Contacto from './src/Contacto/Contacto';
import Login from './src/Login/Login';
import Logout from './src/Login/Logout';
import Miperfil from './src/Miperfil/Miperfil';
import Expedientes from './src/Expedientes/Expedientes';
import Calendario from './src/Calendario/Calendario';
import DetalleExpedientes from './src/Expedientes/Detalle';
import Promocion from './src/Promociones/Promocion';
import Acuerdo from './src/Acuerdos/Detalle';
import Sentencia from './src/Sentencias/Detalle';
import NotAcuerdo from './src/Notificaciones/Acuerdo';
import NotSentencia from './src/Notificaciones/Sentencia';
import MisCitas from './src/Citas/MisCitas';
import AgregarCita from './src/Citas/NuevaCita';
import DetalleCitas from './src/Citas/Detalle';
import Micuenta from './src/Micuenta/Micuenta';
import Privacidad from './src/Privacidad/Privacidad';
import Recurso from './src/Recursos/Detalle';
import Subs from './src/Subscripcion/Subs';
import EliminarSubs from './src/Subscripcion/Eliminar';
import Linea from './src/Expedientes/Linea';
import Chars from './src/chars/Chars';
import Promorecursos from './src/Promociones/PromocionRecurso';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CitasPublicas from './src/Citas_publicas/Citas';
import DetalleCitasPublica from './src/Citas_publicas/Detalle';
import CustomSidebarMenu from './screens/CustomSidebarMenu';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { navigationRef } from './RootNavigation';
import * as global from "./components/Global";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

//const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
// Must be outside of any component LifeCycle (such as `componentDidMount`).

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgba(151, 132, 102, 0.8)',
  },
};
export default function App({ navigation }) {
  const [showLogin, setLogin] = useState(true);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      //console.log('leyo la not:');
      //console.log(response);
      const noti = response.notification.request.content.data;
      const { id, ruta, tipo } = noti;
      const aux= String(ruta);
      if (aux == 'DetalleNoticias') {
        // ...some codes
        navigationRef.navigate('DetalleNoticias', { id_noticia: id });
      }else if(aux == "VerBoletin"){
       // console.log('entro');
        Linking.openURL('https://www.sit-zac.org.mx/BOLETINELECTRONICO/' + id);
        //navigationRef.navigate('VerBoletin', { id_noticia: id });

      }

    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      //console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  const sendMesage = (token) => {
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        "to": token,
        "sound": "default",
        "body": "Hello world!"
      }),
    });
  }


  return (
    <>
      <NavigationContainer ref={navigationRef} theme={MyTheme}>
        <Drawer.Navigator
          drawerContent={(props) => <CustomSidebarMenu {...props} />}
          screenOptions={({ route }) => ({
            drawerIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Inicio') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === 'Boletin') {
                iconName = focused ? 'book' : 'book-outline';
              } else if (route.name === 'Contacto') {
                iconName = focused ? 'at' : 'at-outline';
              }
              else if (route.name === 'Busqueda') {
                iconName = focused ? 'help' : 'help-outline';
              } else if (route.name === 'Login') {
                iconName = focused ? 'log-in' : 'log-in-outline';
              }
              else if (route.name === 'Miperfil') {
                iconName = focused ? 'person' : 'person-outline';
              } else if (route.name === 'Logout') {
                iconName = focused ? 'log-out' : 'log-out-outline';
              }
              else if (route.name === 'Expedientes') {
                iconName = focused ? 'file-tray-stacked' : 'file-tray-stacked-outline';
              } else if (route.name === 'Calendario') {
                iconName = focused ? 'calendar' : 'calendar-outline';
              } else if (route.name === 'MisCitas') {
                iconName = focused ? 'document-text' : 'document-text-outline';
              } else if (route.name === 'Micuenta') {
                iconName = focused ? 'person' : 'person-outline';
              } else if (route.name === 'Subs') {
                iconName = focused ? 'mail' : 'mail-outline';
              } else if (route.name === 'Chars') {
                iconName = focused ? 'bar-chart' : 'bar-chart-outline';
              } else if (route.name === 'CitasPublicas') {
                iconName = focused ? 'document-text' : 'document-text-outline';
              }


              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Drawer.Screen name="Inicio" component={Inicio} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'SIT-ZAC',
            initialRouteName: 'Inicio',
          }} />

          <Drawer.Screen name="Boletin" component={Boletin} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'Boletín Electrónico',
            initialRouteName: 'Boletin',
          }} />
          <Drawer.Screen name="Contacto" component={Contacto}
            options={{
              headerStyle: {
                backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
              },
              title: 'Contacto',
              initialRouteName: 'Contacto',
            }}
          />
          <Drawer.Screen name="Busqueda" component={Busqueda}
            options={{
              headerStyle: {
                backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
              },
              title: 'Ayuda o Búsqueda',
              initialRouteName: 'Busqueda',
            }} />
          <Drawer.Screen name="Calendario" component={Calendario}
            options={{
              headerStyle: {
                backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
              },
              title: 'Calendario Oficial',
              initialRouteName: 'Calendario',
            }}
          />

          <Drawer.Screen name="Subs" component={Subs}
            options={{
              headerStyle: {
                backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
              },
              title: 'Suscripción al boletín',
              initialRouteName: 'Subs',
            }}
          />


          {showLogin ?
            <>
              <Drawer.Screen name="CitasPublicas" component={CitasPublicas}
                options={{
                  headerStyle: {
                    backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
                  },
                  title: 'Solicitar cita',
                  initialRouteName: 'CitasPublicas',
                }}
              />
              <Drawer.Screen name="Login" options={{
                headerStyle: {
                  backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
                },
                title: 'Iniciar sesión',
                initialRouteName: 'Login',
              }}>
                {props => <Login {...props} navigation={navigation} setLogin={setLogin} showLogin={showLogin} expoPushToken={expoPushToken} />}
              </Drawer.Screen>

              <Drawer.Screen name="Micuenta" component={Login} options={{
                headerStyle: {
                  backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
                },
                title: 'Login',
                drawerItemStyle: { height: 0 },
                initialRouteName: 'Login',
              }} />

            </>
            :
            <>
              <Drawer.Screen name="Expedientes" component={Expedientes} options={{
                headerStyle: {
                  backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
                },
                title: "Juicios",
                initialRouteName: 'Expedientes',
              }}
              />

              {global.FUNCION == "ADMINISTRADOR" || global.FUNCION == "SECRETARIA GENERAL DE ACUERDOS" || global.FUNCION == "COORDINADOR"
                || global.FUNCION == "MAGISTRADO" ?
                <Drawer.Screen name="Chars" component={Chars}
                  options={{
                    headerStyle: {
                      backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
                    },
                    title: 'Estadísticas',
                    initialRouteName: 'Estadisticas',
                  }}
                />
                :
                <></>
              }

              <Drawer.Screen name="MisCitas" component={MisCitas} options={{
                headerStyle: {
                  backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
                },
                title: 'Mis Citas',
                initialRouteName: 'MisCitas',
              }} />
              <Drawer.Screen name="Micuenta" component={Micuenta} options={{
                headerStyle: {
                  backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
                },
                title: 'Mi cuenta',
                initialRouteName: 'Micuenta',
              }} />

              <Drawer.Screen name="Logout">
                {props => <Logout {...props} setLogin={setLogin} />}
              </Drawer.Screen>
            </>
          }


          <Drawer.Screen name="Miperfil" component={Miperfil} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'Mi perfil',
            initialRouteName: 'Miperfil',
            drawerItemStyle: { height: 0 }
          }} />

          <Drawer.Screen name="NotAcuerdo" component={NotAcuerdo} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'Notificación del acuerdo', drawerItemStyle: { height: 0 }
          }} />

          <Drawer.Screen name="NotSentencia" component={NotSentencia} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'Notificación de la sentencia', drawerItemStyle: { height: 0 }
          }} />

          <Drawer.Screen name="Acuerdo" component={Acuerdo} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'Acuerdo',
            drawerItemStyle: { height: 0 }
          }} />

          <Drawer.Screen name="Sentencia" component={Sentencia} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'Sentencia',
            drawerItemStyle: { height: 0 }
          }} />

          <Drawer.Screen name="VerBoletin" component={VerBoletin} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'Boletín Electrónico',
            drawerItemStyle: { height: 0 }
          }} />
          <Drawer.Screen name="Promocion" component={Promocion} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'Promoción',
            drawerItemStyle: { height: 0 }
          }} />
          <Drawer.Screen name="Acerca" component={Acerca} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'Acerca del Tribunal',
            drawerItemStyle: { height: 0 }
          }} />
          <Drawer.Screen name="DetalleExpedientes" component={DetalleExpedientes} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'Mostrando expediente',
            drawerItemStyle: { height: 0 }
          }} />
          <Drawer.Screen name="JuicioLinea" component={JuicioLinea} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'Juicio en Linea',
            initialRouteName: 'Inicio',
            drawerItemStyle: { height: 0 }
          }} />
          <Drawer.Screen name="Servicios" component={Servicios} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'Servicios',
            initialRouteName: 'Inicio',
            drawerItemStyle: { height: 0 }
          }} />

          <Drawer.Screen name="DetalleServicios" component={DetalleServicios} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'Servicios',
            initialRouteName: 'Inicio',
            drawerItemStyle: { height: 0 }
          }} />
          <Drawer.Screen name="DetalleNoticias" component={DetalleNoticias} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'Noticias',
            initialRouteName: 'Inicio',
            drawerItemStyle: { height: 0 }
          }} />
          <Drawer.Screen name="DetalleMagistrados" component={DetalleMagistrados} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'Magistrados',
            drawerItemStyle: { height: 0 }
          }} />
          <Drawer.Screen name="DetalleBusqueda" component={DetalleBusqueda} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'Busqueda',
            drawerItemStyle: { height: 0 }
          }} />
          <Drawer.Screen name="Webview" component={WebView} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'SIT-ZAC',
            drawerItemStyle: { height: 0 }
          }} />

          <Drawer.Screen name="AgregarCita" component={AgregarCita} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'Registrar nueva cita',
            drawerItemStyle: { height: 0 }
          }} />

          <Drawer.Screen name="DetalleCitas" component={DetalleCitas} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'Detalles de la cita',
            drawerItemStyle: { height: 0 }
          }} />

          <Drawer.Screen name="DetalleCitasPublica" component={DetalleCitasPublica} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'Detalles de la cita',
            drawerItemStyle: { height: 0 }
          }} />

          <Drawer.Screen name="Privacidad" component={Privacidad} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'Aviso de privacidad',
            drawerItemStyle: { height: 0 }
          }} />

          <Drawer.Screen name="Recurso" component={Recurso} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'Recurso',
            drawerItemStyle: { height: 0 }
          }} />

          <Drawer.Screen name="Promorecursos" component={Promorecursos} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'Promoción del recurso',
            drawerItemStyle: { height: 0 }
          }} />

          <Drawer.Screen name="EliminarSubs" component={EliminarSubs} options={{
            headerStyle: {
              backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
            },
            title: 'Anular suscripción',
            drawerItemStyle: { height: 0 }
          }} />

          <Drawer.Screen name="Linea" component={Linea}
            options={{
              headerStyle: {
                backgroundColor: '#rgba(151, 132, 102, 0.8)', //Set Header color           
              },
              title: 'Linea del tiempo',
              initialRouteName: 'Linea',
              drawerItemStyle: { height: 0 }
            }}
          />





        </Drawer.Navigator>

      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#cdcd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boton: {
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 50,

  },
  texto: {
    fontSize: 15,
    color: 'green',
    marginBottom: 15,

  },
});

