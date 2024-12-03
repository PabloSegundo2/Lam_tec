import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import API from '../API/API';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateUser({ navigation }: any) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleRegister = async () => {
    if (!nombre || !correo || !Contraseña) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    const emailRegex = /^[^\s@]+@gmail\.com$/;
    if (!emailRegex.test(correo)) {
      Alert.alert('Error', 'Por favor, ingrese un correo válido de Gmail.');
      return;
    }

    try {
      const response = await API.post('/registros', { nombre, correo, Contraseña });
      console.log('Respuesta del servidor:', response.data);

      if (response.data.message === 'Registro creado exitosamente') {
        await AsyncStorage.setItem('userEmail', correo);
        Alert.alert('Éxito', 'Inicia con tu usuario recién creado.', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login', {
                message: 'Por favor, inicia sesión con tu usuario creado.',
              });
            },
          },
        ]);
      } else {
        Alert.alert('Error', response.data.message || 'Error al registrar el usuario.');
      }
    } catch (error: any) {
      console.error('Error al registrar usuario:', error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.error || 'Error desconocido.');
    }
  };

  const isEmailValid = /^[^\s@]+@gmail\.com$/.test(correo);

  return (
    <View style={styles.padre}>
      <View>
        <Text style={styles.text}>Registro</Text>
      </View>
      <Image source={require('../Assets/perfil.jpg')} style={styles.profile} />

      <View style={styles.tarjeta}>
        {/* Input de Nombre */}
        <View style={styles.cajaTexto}>
          <TextInput
            placeholder="Nombre"
            placeholderTextColor="#BDBDBD"
            style={styles.inputBox}
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        {/* Input de Correo */}


        <View
          style={[
            styles.cajaTexto,
            { borderColor: isEmailValid || correo === '' ? '#F0F0F0' : 'red', borderWidth: 1 },
          ]}
        >
          <TextInput
            placeholder="correo@gmail.com"
            placeholderTextColor="#BDBDBD"
            style={styles.inputBox}
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>


        {/* Input de Contraseña */}
        <View style={[styles.cajaTexto, styles.passwordContainer]}>
          <TextInput
            placeholder="Contraseña"
            placeholderTextColor="#BDBDBD"
            style={[styles.inputBox, styles.passwordInput]}
            value={Contraseña}
            onChangeText={setContraseña}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Icon
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={30}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* Botón de Registrar */}
        <View style={styles.PadreBoton}>
          <TouchableOpacity style={styles.cajaBoton} onPress={handleRegister}>
            <Text style={styles.TextoBoton}>Registrar</Text>
          </TouchableOpacity>
        </View>

        {/* Link a Login */}
        <View style={styles.PadreBoton}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.text1}>
              ¿Tienes una cuenta? <Text style={styles.linkText}>Inicia Sesión</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  padre: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  tarjeta: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
  },
  cajaTexto: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  inputBox: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 60, // Espacio para el botón de visibilidad
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: 20,
  },
  PadreBoton: {
    alignItems: 'center',
  },
  cajaBoton: {
    backgroundColor: '#0090e3',
    borderRadius: 30,
    paddingVertical: 15,
    width: '50%',
    marginTop: 10,
  },
  TextoBoton: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  text1: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
  linkText: {
    color: '#0090e3',
    fontWeight: 'bold',
  },
});
