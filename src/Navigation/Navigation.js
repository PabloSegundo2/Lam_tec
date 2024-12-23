import React, { useEffect, useContext, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../Context/AuthContex'; // Cambios realizados: Usar el contexto global
import LoginScreen from '../Login/LoginScreen';
import CreateUser from '../Login/CreateUser';
import PrincipalScreen from '../screens/PrincipalScreen';
import HomeScreen from '../screens/HomeScreen';
import CustomDrawerContent from './CustomDrawerContent';
import RegistroScreen from '../screens/RegistroScreen';


import VoluntariadosScreen from '../screens/VoluntariadosScreen';
import OrganizacionesScreen from '../screens/OrganizacionesScreen';

import PerfilScreen from '../screens/PerfilScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import GraficasScreen from '../screens/GraficasScreen';
import Comentarios from '../screens/ComentariosScreen';
import RegisterEmpresa from '../screens/RegisterEmpresa';
import ExperienciasScreen from '../screens/ExperienciasScreen';

const Drawer = createDrawerNavigator();

const Navigation = () => {
  const { isLoggedIn, login } = useContext(AuthContext); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('userEmail');
        if (userEmail) {
          login(); 
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0090e3" />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0090e3" />
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName={isLoggedIn ? 'Home' : 'Principal'} 
          screenOptions={{
            headerStyle: { backgroundColor: '#0090e3' },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          drawerStyle={{
            width: 150,  
          }}
        >
          {!isLoggedIn ? (
            <>
              <Drawer.Screen
                name="Principal"
                component={PrincipalScreen}
                options={{
                  headerShown: false,
                  title: 'Lam_tec' 
                }}
              />
              <Drawer.Screen
                name="Login"
                options={{
                  drawerLabel: 'Iniciar Sesión',
                  title: 'Lam_tec' 
                }}
              >
                {(props) => (
                  <LoginScreen {...props} onLoginSuccess={login} />
                )}
              </Drawer.Screen>
              <Drawer.Screen
                name="CreateUser"
                component={CreateUser}
                options={{
                  drawerLabel: 'Crear Usuario',
                  title: 'Lam_tec' 
                }}
              />

            </>
          ) : (
            <>
              <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  title: 'Lam_tec' ,
                  drawerLabel: 'Inicio',
                  drawerIcon: ({ color, size }) => (
                    <Icon name="home-outline" size={size} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="Registro"
                component={RegistroScreen}
                options={{
                  drawerLabel: 'Registro',
                  drawerIcon: ({ color, size }) => (
                    <Icon name="heart-outline" size={size} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="Voluntariados"
                component={VoluntariadosScreen}
                options={{
                  drawerLabel: 'Voluntariados',
                  drawerIcon: ({ color, size }) => (
                    <Icon name="people-outline" size={size} color={color} />
                  ),
                }}
              />

              <Drawer.Screen
                name="Organizaciones"
                component={OrganizacionesScreen}
                options={{
                  drawerLabel: 'Organizaciones',
                  drawerIcon: ({ color, size }) => (
                    <Icon name="business-outline" size={size} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="Perfil"
                component={PerfilScreen}
                options={{
                  drawerLabel: 'Perfil',
                  drawerIcon: ({ color, size }) => (
                    <Icon name="person-outline" size={size} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="Graficas"
                component={GraficasScreen}
                options={{
                  drawerLabel: 'Gráficas',
                  drawerIcon: ({ color, size }) => (
                    <Icon name="analytics-outline" size={size} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="Comentarios"
                component={Comentarios}
                options={{
                  drawerLabel: 'Comentarios',
                  drawerIcon: ({ color, size }) => (
                    <Icon name="chatbubble-outline" size={size} color={color} />
                  ),
                }}
              />
              {/* <Drawer.Screen
              name="Registros"
              component={RegistrosScreen}
              options={{
                drawerLabel: 'Registros',
                drawerIcon: ({ color, size }) => (
                  <Icon name="document-outline" size={size} color={color} />
                ),
              }}
            /> */}
              <Drawer.Screen
                name="Registrar una empresa"
                component={RegisterEmpresa}
                options={{
                  drawerLabel: 'Registrar Empresa',
                  drawerIcon: ({ color, size }) => (
                    <Icon name="briefcase-outline" size={size} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="Experiencias"
                component={ExperienciasScreen}
                options={{
                  drawerLabel: 'Experiencias',
                  drawerIcon: ({ color, size }) => (
                    <Icon name="star-outline" size={size} color={color} />
                  ),
                }}
              />
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default Navigation;
