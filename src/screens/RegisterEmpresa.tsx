import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native'; // Para navegación
import API from '../API/API';
import { ScrollView } from 'react-native-gesture-handler';

const RegisterEmpresa = () => {
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [website, setWebsite] = useState('');
  const [categoria, setCategoria] = useState('');
  const [logo, setLogo] = useState(null);
  
  const navigation = useNavigation(); // Hook de navegación

  const elegirImagen = () => {
    const options = {
      mediaType: 'photo', // Solo fotos
      quality: 1, // Calidad máxima
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Usuario canceló la selección de imagen');
        Alert.alert('Error', 'No se seleccionó ninguna imagen.');
      } else if (response.errorCode) {
        console.log('Error: ', response.errorMessage);
        Alert.alert('Error', 'Hubo un problema con la selección de la imagen.');
      } else {
        const source = { uri: response.assets[0].uri };
        setLogo(source); // Guardamos la imagen seleccionada
        Alert.alert('Imagen seleccionada', 'La imagen fue seleccionada correctamente');
      }
    });
  };

  const enviarOrganizacion = async () => {
    const formData = new FormData();
    formData.append('nombre_empresa', nombreEmpresa);
    formData.append('descripcion', descripcion);
    formData.append('direccion', direccion);
    formData.append('telefono', telefono);
    formData.append('correo', correo);
    formData.append('website', website);
    formData.append('categoria', categoria);

    if (logo) {
      const logoData = {
        uri: logo.uri,
        type: 'image/jpeg',
        name: 'logo.jpg',
      };
      formData.append('logo', logoData);
    } else {
      Alert.alert('Error', 'Por favor, selecciona un logo para la organización.');
      return;
    }

    try {
      const response = await API.post('/organizaciones', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Para enviar datos de formulario con imágenes
        },
      });

      if (response.data.message === 'Organización creada exitosamente.') {
        Alert.alert('Éxito', 'La organización se ha creado correctamente', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Organizaciones'), 
          },
        ]);
      } else {
        Alert.alert('Error', 'Hubo un problema al crear la organización.');
      }
    } catch (error) {
      console.error('Error al enviar la organización:', error);
      Alert.alert('Error', 'Hubo un problema al enviar la información');
    }
  };

  return (
    <ScrollView>

    <View style={styles.container}>
      <Text style={styles.title}>Formulario de Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de la empresa"
        value={nombreEmpresa}
        onChangeText={setNombreEmpresa}
        placeholderTextColor={'black'}
      />

      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        placeholderTextColor={'black'}
        onChangeText={setDescripcion}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={direccion}
        placeholderTextColor={'black'}
        onChangeText={setDireccion}
      />

      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        placeholderTextColor={'black'}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        placeholderTextColor={'black'}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Sitio web"
        value={website}
        placeholderTextColor={'black'}
        onChangeText={setWebsite}
      />

      <TextInput
        style={styles.input}
        placeholderTextColor={'black'}
        placeholder="Categoría"
        value={categoria}
        onChangeText={setCategoria}
      />

      {/* Mostrar la previsualización del logo */}
      <View style={styles.imagePreviewContainer}>
        {logo ? (
          <Image source={logo} style={styles.imagePreview} />
        ) : (
          <Text style={styles.imageText}>No se ha seleccionado un logo</Text>
        )}
      </View>

      <TouchableOpacity onPress={elegirImagen} style={styles.button}>
        <Text style={styles.buttonText}>Seleccionar logo</Text>
      </TouchableOpacity>

      <Button title="Enviar" onPress={enviarOrganizacion} />
    </View>
          
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:'black'
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    color:'black',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  imageText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});

export default RegisterEmpresa;
