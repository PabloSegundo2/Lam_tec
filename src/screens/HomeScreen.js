import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation(); 

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userEmail'); 
    navigation.navigate('Principal'); 
  };

  const options = [
    // { title: 'Inicia Sesión', icon: 'log-in', screen: 'Login' },
       { title: 'Únete!', icon: 'heart', screen: 'Registro' },
    { title: 'Graficas de voluntarios', icon: 'bar-chart', screen: 'Graficas' },
    { title: 'Deja tu Comentario', icon: 'chatbubbles', screen: 'Comentarios' },
    { title: 'Revisa tu Perfil', icon: 'person', screen: 'Perfil' },
    { title: 'Historias de Voluntariados', icon: 'fitness', screen: 'Voluntariados' },
    { title: 'Organizaciones', icon: 'folder', screen: 'Organizaciones' },
    { title: 'Registrar una Empresa', icon: 'folder', screen: 'Registrar una empresa' },
    { title: 'Experiencias', icon: 'folder', screen: 'Experiencias' },
   
  
   

    // { title: 'Adios!', icon: 'log-out', action: handleLogout },
  ];

  return (
    <ImageBackground 
      source={require('../Assets/fondologin.jpg')}
      style={styles.imageBackground}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerText}>Hola Bienvenido</Text>
        <View style={styles.gridContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionContainer}
              onPress={option.action ? option.action : () => navigation.navigate(option.screen)}
            >
              <Icon name={option.icon} size={60} color="#fff" />
              <Text style={styles.optionText}>{option.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionContainer: {
    width: '45%', 
    marginVertical: 10,
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 144, 227, 0.8)', 
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default HomeScreen;
