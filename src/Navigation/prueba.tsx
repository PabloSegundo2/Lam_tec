import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from '../Login/LoginScreen';
import CreateUser from '../Login/CreateUser';
import PrincipalScreen from '../screens/PrincipalScreen';
import HomeScreen from '../screens/HomeScreen';
import CustomDrawerContent from './CustomDrawerContent';
import VoluntariadosScreen from '../screens/VoluntariadosScreen';
import OrganizacionesScreen from '../screens/OrganizacionesScreen';
import RegistroScreen from '../screens/RegistroScreen';
import PerfilScreen from '../screens/PerfilScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true); // Indicador de carga
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de autenticación

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userEmail = await AsyncStorage.getItem('userEmail'); // Obtener el email guardado
        setIsLoggedIn(!!userEmail); // Si hay email, está autenticado
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
      } finally {
        setIsLoading(false); // Finalizar la carga
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
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={isLoggedIn ? 'Home' : 'Principal'} // Redirige según el estado de autenticación
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0090e3',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        {/* Pantalla Principal */}
        <Drawer.Screen
          name="Principal"
          component={PrincipalScreen}
          options={{
            headerShown: false,
            drawerItemStyle: null,
          }}
        />

        {/* Pantalla de Login */}
        <Drawer.Screen
          name="Login"
          component={LoginScreen}
          options={{
            drawerItemStyle: { display: 'none' }, // Ocultar del Drawer
          }}
        />

        {/* Pantalla de Registro */}
        <Drawer.Screen
          name="Registro de Usuarios"
          component={CreateUser}
          options={{
            drawerItemStyle: { display: 'none' }, // Ocultar del Drawer
          }}
        />

        {/* Pantalla de Home */}
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: true, // Mostrar el header en Home
          }}
        />

<Drawer.Screen 
            name="Perfil" 
            component={PerfilScreen} 
            
            
          />

<Drawer.Screen 
            name="Voluntariados" 
            component={VoluntariadosScreen} 
            
          />

<Drawer.Screen 
            name="Organizaciones" 
            component={OrganizacionesScreen} 
           
          />

          
<Drawer.Screen 
            name="Registrar a un Voluntariado" 
            component={RegistroScreen} 
            
          />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default Navigation;
