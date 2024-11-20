import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import API from '../API/API'; 
import Icon from 'react-native-vector-icons/FontAwesome';

const ComentariosForm = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [comentario, setComentario] = useState('');
  const [message, setMessage] = useState('');
  const [comentarios, setComentarios] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 

  
  const enviarComentario = async () => {
    if (!nombreUsuario || !comentario) {
      setMessage('Por favor ingresa tanto el nombre de usuario como el comentario');
      return;
    }

    try {
      await API.post('/comentariosp', { nombre_usuario: nombreUsuario, comentario });
      setMessage('Comentario enviado con éxito');
      setNombreUsuario('');
      setComentario('');
      fetchComentarios(); 
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
      setMessage('Hubo un error al enviar el comentario');
    }
  };


  const fetchComentarios = async () => {
    try {
      const response = await API.get('/comentariosp');
      setComentarios(response.data); 
    } catch (error) {
      console.error('Error al obtener los comentarios:', error);
      setMessage('Error al obtener los comentarios');
    } finally {
      setIsLoading(false); 
    }
  };

 
  useEffect(() => {
    fetchComentarios();
  }, []);


  const renderComentario = ({ item }) => (
    <View style={styles.commentCard}>
      <Text style={styles.commentUser}>{item.nombre_usuario}</Text>
      <Text style={styles.commentText}>{item.comentario}</Text>
      <Text style={styles.commentDate}>{new Date(item.fecha).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deja un Comentario</Text>

     
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#0090e3" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nombre de Usuario"
          value={nombreUsuario}
          placeholderTextColor={'black'}
          onChangeText={setNombreUsuario}
        />
      </View>

      {/* Campo de comentario con ícono */}
      <View style={styles.inputContainer}>
        <Icon name="comment" size={20} color="#0090e3" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Escribe tu comentario"
          value={comentario}
          placeholderTextColor={'black'}
          onChangeText={setComentario}
          multiline
        />
      </View>

      <Button title="Enviar Comentario" onPress={enviarComentario} color="#0090e3" />

      {message ? <Text style={styles.message}>{message}</Text> : null}

      {/* Cargar comentarios */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0090e3" />
      ) : (
        <View style={styles.commentsContainer}>
          <Text style={styles.commentsTitle}>Comentarios:</Text>
          {comentarios.length === 0 ? (
            <Text>No hay comentarios aún</Text>
          ) : (
            <FlatList
              data={comentarios}
              renderItem={renderComentario}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    height: 40,
    flex: 1,
    fontSize: 16,
    paddingLeft: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    color:'black',
  },
  message: {
    marginTop: 10,
    textAlign: 'center',
    color: 'green',
    fontSize: 16,
  },
  commentsContainer: {
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  commentCard: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  commentUser: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0090e3',
  },
  commentText: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
  commentDate: {
    marginTop: 5,
    fontSize: 12,
    color: '#888',
  },
});

export default ComentariosForm;
