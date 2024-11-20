import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import API from '../API/API';

const PerfilScreen = () => {
  const [voluntarios, setVoluntarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos desde la API
  const fetchVoluntarios = async () => {
    try {
      const response = await API.get('/voluntarios'); // Endpoint para obtener los datos
      setVoluntarios(response.data); // Asignar los datos obtenidos al estado
    } catch (error) {
      console.error('Error al obtener los datos de voluntarios:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVoluntarios(); 
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Voluntarios</Text>
      {voluntarios.length === 0 ? (
        <Text style={styles.emptyText}>No se encontraron voluntarios</Text>
      ) : (
        <FlatList
          data={voluntarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.nombre}</Text>
              <Text style={styles.cardText}>Correo: {item.correo}</Text>
              <Text style={styles.cardText}>Teléfono: {item.telefono}</Text>
              <Text style={styles.cardText}>Programa: {item.programa}</Text>
              <Text style={styles.cardText}>Fecha de Inicio: {item.fechaInicio}</Text>
              <Text style={styles.cardText}>Habilidades: {item.habilidades}</Text>
              <Text style={styles.cardText}>Estado: {item.estado}</Text>
              <Text style={styles.cardText}>Descripción: {item.descripcion}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:'black'
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'black'
  },
  cardText: {
    fontSize: 14,
    marginBottom: 3,
    color:'gray'
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PerfilScreen;
