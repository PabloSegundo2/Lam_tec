import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'; 
import API from '../API/API';

const RegistroScreen = () => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const estadosDeMexico = [
    'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua',
    'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Mexico', 'Michoacán',
    'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí',
    'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
  ];

  const [estado, setEstado] = useState(''); 
  const onSubmit = async (data) => {
    try {
     
      if (!estado) {
        Alert.alert('Error', 'Debe seleccionar un estado');
        return;
      }

     
      data.estado = estado;

    
      Alert.alert('Formulario Enviado', JSON.stringify(data));

     
      const response = await API.post('/voluntariosP', data);

     
      if (response.status === 201) {
        Alert.alert('Éxito', 'Formulario enviado correctamente');
      } else {
        Alert.alert('Error', 'Hubo un problema al enviar el formulario');
      }

    
      reset();

    } catch (error) {
   
      console.error('Error al enviar los datos', error);
      Alert.alert('Error', 'Hubo un error al enviar el formulario');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nombre Completo</Text>
      <Controller
        control={control}
        name="nombre"
        rules={{ required: 'El nombre es obligatorio' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nombre Completo"
              value={value}
              placeholderTextColor={'black'}
              onChangeText={onChange}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />

      <Text style={styles.label}>Correo Electrónico</Text>
      <Controller
        control={control}
        name="correo"
        rules={{
          required: 'El correo es obligatorio',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Formato de correo inválido'
          }
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Correo Electrónico"
              value={value}
              onChangeText={onChange}
              placeholderTextColor={'black'}
              keyboardType="email-address"
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />

      <Text style={styles.label}>Teléfono</Text>
      <Controller
        control={control}
        name="telefono"
        rules={{
          required: 'El teléfono es obligatorio',
          minLength: { value: 10, message: 'Debe tener al menos 10 dígitos' }
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              value={value}
              placeholderTextColor={'black'}
              onChangeText={onChange}
              keyboardType="phone-pad"
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />

      <Text style={styles.label}>Programa</Text>
      <Controller
        control={control}
        name="programa"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Programa"
            placeholderTextColor={'black'}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Text style={styles.label}>Fecha de Inicio</Text>
      <Controller
        control={control}
        name="fechaInicio"
        render={({ field: { onChange, value } }) => (
          <>
            <Button title="Seleccionar Fecha" onPress={() => setShowDatePicker(true)} />
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || date;
                  setShowDatePicker(false);
                  setDate(currentDate);
                  onChange(currentDate);
                }}
              />
            )}
            <Text style={styles.dateText}>{value ? value.toDateString() : ''}</Text>
          </>
        )}
      />

      <Text style={styles.label}>Habilidades</Text>
      <Controller
        control={control}
        name="habilidades"
        rules={{ required: 'Las habilidades son obligatorias' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Al menos 5 habilidades"
              value={value}
              placeholderTextColor={'black'}
              onChangeText={onChange}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />

      <Text style={styles.label}>Estado</Text>
      <Controller
        control={control}
        name="estado"
        rules={{ required: 'El estado es obligatorio' }}
        render={({ field: { onChange } }) => (
          <Picker
        
            selectedValue={estado}
            onValueChange={(itemValue) => {
              setEstado(itemValue);
              onChange(itemValue); 
            }}
            style={styles.input}
          >
            <Picker.Item label="Selecciona un estado" value="" />
            {estadosDeMexico.map((estado, index) => (
              <Picker.Item key={index} label={estado} value={estado} />
            ))}
          </Picker>
        )}
      />
      {errors.estado && <Text style={styles.errorText}>{errors.estado.message}</Text>}

      <Text style={styles.label}>Descripción</Text>
      <Controller
        control={control}
        name="descripcion"
        rules={{ required: 'La descripción es obligatoria' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Descripción adicional"
              value={value}
              placeholderTextColor={'black'}
              onChangeText={onChange}
            />
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
      />

      <Button title="Enviar" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    color:'black'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor:'#f5f5f5',
    color:'black'
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  dateText: {
    marginTop: 5,
    fontSize: 16,
  },
});

export default RegistroScreen;
