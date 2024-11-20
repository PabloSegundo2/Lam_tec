import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const PrincipalScreen = ({ navigation }) => {


  return (
    <ImageBackground 
    source={require('../Assets/fondologin.jpg')}
      style={styles.imageBackground}
    >
      <View style={styles.container}>
        <Text style={styles.titulo}>Bienvenido, somos LAM_TEC</Text>

        <View style={styles.buttonsContainer}>
      
 
  <TouchableOpacity style={styles.cajaBoton} onPress={() => navigation.navigate('Login') } >
    <Text style={styles.TextoBoton}>Iniciar Sesion</Text>
  
  </TouchableOpacity>
   <TouchableOpacity style={styles.cajaBoton} onPress={() => navigation.navigate('CreateUser') }>
    <Text style={styles.TextoBoton} >Registrar</Text>
  
  </TouchableOpacity>
 
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonsContainer: {
    width: '80%',
      alignItems:'center'
  },
  cajaBoton:{
    backgroundColor:'#0090e3',
    borderRadius:30, 
    paddingVertical:20,
    width:150,
    marginTop:20,
    color: 'black',
  
  },
  TextoBoton:{
    textAlign: 'center',
    color: 'white',


  },
  
});

export default PrincipalScreen;
