import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button, TouchableOpacity, Platform } from 'react-native';
import API from '../API/API';
import Icon2 from 'react-native-vector-icons/Feather';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const OrganizacionesScreen = () => {
  const [organizaciones, setOrganizaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); 
  const [searchText, setSearchText] = useState('');
  const [filteredOrganizaciones, setFilteredOrganizaciones] = useState([]);
  const navigation = useNavigation();

  const fetchOrganizaciones = async () => {
    try {
      setLoading(true);
      const response = await API.get('/organizaciones');
      setOrganizaciones(response.data);
      setFilteredOrganizaciones(response.data); 
    } catch (error) {
      console.error('Error al obtener las organizaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  
  const onRefresh = () => {
    setRefreshing(true);
    fetchOrganizaciones().finally(() => setRefreshing(false)); 
  };

  
  const handleSearchTextChange = (text) => {
    setSearchText(text);
    if (text === '') {
      setFilteredOrganizaciones(organizaciones); 
    } else {
      const filteredData = organizaciones.filter((org) =>
        org.nombre_empresa.toLowerCase().includes(text.toLowerCase()) 
      );
      setFilteredOrganizaciones(filteredData);
    }
  };

  useEffect(() => {
    fetchOrganizaciones();
  }, []);

  const renderOrganizacion = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image
          source={{ uri: `http://192.168.100.28:3001/${item.logo}` }}
          style={styles.logo}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.nombre_empresa}</Text>
          <Text style={styles.description}>{item.descripcion}</Text>
          <Text style={styles.description}>{item.correo}</Text>
          <Text style={styles.description}>{item.telefono}</Text>
          <Text style={styles.description}>{item.website}</Text>

          
          <Button title="Unirme" onPress={() => handleJoin(item.id)} />
        </View>
      </View>
    </View>
  );

  
  const handleJoin = (id) => {
    console.log(`Unido a la organización con ID: ${id}`);

  };

  return (
    <>
      <View style={styles.header}>
        {/* <Text style={styles.headerTitle}>Organizaciones</Text> */}
      </View>

      <View style={styles.searchContainer}>
        <Input
          placeholder="Busca una empresa..."
          value={searchText}
          onChangeText={handleSearchTextChange}
          rightIcon={{
            name: 'search',
            size: 24,
            color: 'black',
          }}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />
      </View>

      <View style={styles.container}>
        {loading && filteredOrganizaciones.length === 0 ? (
          <Text style={styles.loadingText}>Cargando...</Text>
        ) : filteredOrganizaciones.length === 0 ? (
          <Text style={styles.loadingText}>Empresa no encontrada</Text>
        ) : (
          <FlatList
            data={filteredOrganizaciones}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderOrganizacion}
            refreshing={refreshing}
            onRefresh={onRefresh} // Llama a onRefresh cuando se haga pull to refresh
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 130,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'black'
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingTop: Platform.OS === 'ios' ? 55 : 10,
    paddingBottom: Platform.OS === 'ios' ? 50 : 70,
    backgroundColor: '#0090e3',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  searchContainer: {
    zIndex: 9999,
    marginVertical: Platform.OS === 'ios' ? 10 : -30,
  },
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  input: {
    color: 'black',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default OrganizacionesScreen;
