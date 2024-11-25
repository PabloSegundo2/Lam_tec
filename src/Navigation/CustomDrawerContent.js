import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '../Context/AuthContex';
import { CommonActions } from '@react-navigation/native';


const CustomDrawerContent = (props) => {
  const { logout } = useContext(AuthContext); 

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: () => {
            logout(); 
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Principal' }], 
              })
            );
            props.navigation.closeDrawer();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <View style={styles.headerInfo}>
          <Text style={styles.headerText}>¡Bienvenido!</Text>
          <Text style={styles.headerSubText}>Lam_tec</Text>
        </View>
      </View>

      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollViewContent}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={handleLogout}>
          <Icon name="sign-out-alt" size={18} color="white" />
          <Text style={styles.footerButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#0090e3',
  },
  drawerHeader: {
    backgroundColor: '#0090e3',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubText: {
    color: 'white',
    fontSize: 14,
  },
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: 'white',

  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default CustomDrawerContent;
