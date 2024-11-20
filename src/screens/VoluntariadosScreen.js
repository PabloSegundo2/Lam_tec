import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,

  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import API from '../API/API';
import { Picker } from '@react-native-picker/picker'; 


const VoluntariadosScreen = () => {
  const [nombre, setNombre] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [organizaciones, setOrganizaciones] = useState([]);
  const [organizacionSeleccionada, setOrganizacionSeleccionada] = useState('');
  const [loading, setLoading] = useState(true);


  const fetchOrganizaciones = async () => {
    try {
      const response = await API.get('/organizaciones');
      setOrganizaciones(response.data);
    } catch (error) {
      console.error('Error al obtener las organizaciones:', error);
      Alert.alert('Error', 'No se pudieron cargar las organizaciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizaciones();
  }, []);


  const enviarExperiencia = async () => {
    if (!nombre || !experiencia || !organizacionSeleccionada) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await API.post('/experiencias', {
        nombre,
        experiencia,
        organizacionId: organizacionSeleccionada,
      });

      if (response.data.message === 'Experiencia guardada exitosamente') {
        Alert.alert('Éxito', 'La experiencia se guardó correctamente');
        setNombre('');
        setExperiencia('');
        setOrganizacionSeleccionada('');
      }
    } catch (error) {
      console.error('Error al guardar la experiencia:', error);
      Alert.alert('Error', 'Hubo un problema al guardar la experiencia');
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text>Cargando organizaciones...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Experiencia</Text>

      <TextInput
        style={styles.input}
        placeholder="Tu Nombre"
        value={nombre}
        onChangeText={setNombre}
        placeholderTextColor={'black'}
      />

      <TextInput
        style={styles.input}
        placeholder="¿Qué experiencia tuviste?"
        value={experiencia}
        onChangeText={setExperiencia}
        placeholderTextColor={'black'}
        multiline
      />

      <Picker
        selectedValue={organizacionSeleccionada}
        onValueChange={(itemValue) => setOrganizacionSeleccionada(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecciona una organización" value="" />
        {organizaciones.map((org) => (
          <Picker.Item key={org.id} label={org.nombre_empresa} value={org.id} />
        ))}
      </Picker>

      <Button title="Guardar Experiencia" onPress={enviarExperiencia} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color:'black'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    color:'black'
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    color:'black',
    height: 50,
    justifyContent: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VoluntariadosScreen;


