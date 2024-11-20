import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const AdiosScreen = () => {
  const [Correo, setCorreo] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    axios
      .post('http://localhost:3000/login', {Correo, Contraseña })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage(error.response?.data?.message || 'Error desconocido');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={Correo}
        onChangeText={setCorreo}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={Contraseña}
        onChangeText={setContraseña}
      />
      <Button title="Login" onPress={handleLogin} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  message: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'red',
  },
});

export default AdiosScreen;

