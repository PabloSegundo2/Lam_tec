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
import Icon from 'react-native-vector-icons/Ionicons'; 
import API from '../API/API';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);



  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, complete todos los campos');
      return;
    }

    try {
      const response = await API.post('/login', { email, password });
      console.log('Respuesta del servidor:', response.data);

      if (response.data.success) {
        await AsyncStorage.setItem('userEmail', email); // Guardar el correo en AsyncStorage
        Alert.alert('Bienvenido', response.data.message);

        // Notifica al componente principal que el login fue exitoso
        if (onLoginSuccess) {
          onLoginSuccess(navigation);
        } else {
          navigation.navigate('Home'); // Navegar a la pantalla Home (fallback)
        }
      } else {
        Alert.alert('Error', 'Permiso denegado: ' + response.data.message);
      }
    } catch (error : any) {
      if (error.response) {
        console.error('Error del servidor:', error.response.data);
        Alert.alert('Error', `Servidor: ${error.response.data.error || 'Desconocido'}`);
      } else if (error.request) {
        console.error('Error en la solicitud:', error.request);
        Alert.alert('Error', 'No se recibió respuesta del servidor');
      } else {
        console.error('Error desconocido:', error.message);
        Alert.alert('Error', `Error desconocido: ${error.message}`);
      }
    }
  };

  return (
    <View style={styles.padre}>
      <View>
        <Text style={styles.text}>Inicio de Sesión</Text>
      </View>

      <Image source={require('../Assets/perfil.jpg')} style={styles.profile} />

      <View style={styles.tarjeta}>
        {/* Input de Email */}
        <View style={styles.cajaTexto}>
          <TextInput
            placeholder="correo@gmail.com"
            placeholderTextColor="#BDBDBD"
            style={styles.inputBox}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        {/* Input de Contraseña */}
        <View style={[styles.cajaTexto, styles.passwordContainer]}>
          <TextInput
            style={[styles.inputBox, styles.passwordInput]}
            placeholder="Contraseña"
            placeholderTextColor="#BDBDBD"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Icon
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={35}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* Botón de Login */}
        <View style={styles.PadreBoton}>
          <TouchableOpacity style={styles.cajaBoton} onPress={handleLogin}>
            <Text style={styles.TextoBoton}>Iniciar</Text>
          </TouchableOpacity>
        </View>

        {/* Link a Registro */}
        <View style={styles.PadreBoton}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateUser')}
          >
            <Text style={styles.text1}>
              ¿No tienes una cuenta? <Text style={styles.linkText}>Regístrate</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
    margin: 20,
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
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
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
    paddingRight: 40, 
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
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

export default LoginScreen;
