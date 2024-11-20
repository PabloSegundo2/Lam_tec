
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import API from '../API/API';

const ExperienciasScreen = () => {
  const [experiencias, setExperiencias] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchExperiencias = async () => {
    try {
      setLoading(true);
      const response = await API.get('/experiencias'); 
      setExperiencias(response.data);
    } catch (error) {
      console.error('Error al obtener las experiencias:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiencias();
  }, []);

  const renderExperiencia = ({ item } :any ) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.nombre}</Text>
      <Text style={styles.org}>Organización: {item.organizacion}</Text>
      <Text style={styles.desc}>{item.experiencia}</Text>
      <Text style={styles.date}>Fecha: {new Date(item.fecha_creacion).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Experiencias de Voluntarios</Text>
      {loading ? (
        <Text style={styles.loading}>Cargando...</Text>
      ) : experiencias.length === 0 ? (
        <Text style={styles.empty}>No hay experiencias registradas.</Text>
      ) : (
        <FlatList
          data={experiencias}
          renderItem={renderExperiencia}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={fetchExperiencias}>
        <Text style={styles.buttonText}>Actualizar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: 'black',

  },
  loading: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  org: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 6,
  },
  desc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  button: {
    backgroundColor: '#28A745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExperienciasScreen;
