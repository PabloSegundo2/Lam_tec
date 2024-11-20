import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; 
import API from '../API/API'; 

const VoluntariosChart = () => {
  const [voluntarios, setVoluntarios] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  const [totalUsuarios, setTotalUsuarios] = useState(0); 

 
  const fetchVoluntariosData = async () => {
    try {
      const response = await API.get('voluntariosp');
      console.log('Datos recibidos de la API:', response.data); 
      setVoluntarios(response.data); 

    
      setTotalUsuarios(response.data.length);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    fetchVoluntariosData(); 
  }, []);


  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0090e3" />
      </View>
    );
  }


  if (voluntarios.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No se encontraron datos de voluntarios</Text>
      </View>
    );
  }


  const validVoluntarios = voluntarios.filter(item => item.cantidad && item.fecha); 

 
  if (validVoluntarios.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No hay datos válidos para mostrar</Text>
      </View>
    );
  }

 
  const labels = validVoluntarios.map(item => {
    const date = new Date(item.fecha);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  });

  const data = validVoluntarios.map(item => item.cantidad);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voluntarios por Día</Text>

    
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>Total de Usuarios: {totalUsuarios}</Text>
      </View>

      
      <Button title="Actualizar Datos" onPress={fetchVoluntariosData} color="#0090e3" />

      {/* Gráfico */}
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: data,
              strokeWidth: 3, 
              color: (opacity = 1) => `rgba(0, 144, 227, ${opacity})`, 
            },
          ],
        }}
        width={350} 
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#f3f3f3',
          backgroundGradientTo: '#e5e5e5',
          decimalPlaces: 0, 
          color: (opacity = 1) => `rgba(0, 144, 227, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#0090e3',
          },
        }}
        withDots
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLabels={true}
        withHorizontalLabels={true}
        fromZero={true}
        renderDots={(x, y, index) => {
         
          return (
            <View key={index} style={{ position: 'absolute', top: y - 10, left: x - 10 }}>
              <Text style={styles.dotText}>{data[index]}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  counterContainer: {
    marginBottom: 20,
  },
  counterText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dotText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0090e3',
  },
});

export default VoluntariosChart;
