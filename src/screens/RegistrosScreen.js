
import React, {useState} from 'react';
import { Text,StyleSheet, View,Image, TextInput, TouchableOpacity, Alert } from 'react-native';

const API_URL = 'http://tu_dominio_o_ip/tu_carpeta_api';

export default function RegistrosScreen(navigation) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (nombre.trim() === '' || correo.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/registro.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `nombre=${encodeURIComponent(nombre)}&correo=${encodeURIComponent(correo)}&password=${encodeURIComponent(password)}`,
      });

      const data = await response.json();
      if (data.success) {
        Alert.alert('Éxito', data.message);
      } else {
        Alert.alert('Error', data.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      Alert.alert('Error', 'Hubo un problema con la solicitud');
    }
  };
  return(


    <View style={styles.padre}>
      <View>
     
        <Text style={styles.text}>Registro
        </Text>
        <Text></Text>
        </View>
        <Image source={require('../Assets/perfil.jpg')} style={styles.profile}/>
       
     

      

      <View style={styles.tarjeta}>
<View style={styles.cajaTexto}>
  <TextInput placeholder='Nombre'   
  placeholderTextColor='#BDBDBD' 
  style={styles.inputBox}
  onChangeText={(text)=>setNombre(text)}
  />
</View>

<View style={styles.cajaTexto}>
  <TextInput style={styles.inputBox}
  placeholder='correo@ejemplo.com'   
  placeholderTextColor='#BDBDBD' 
onChangeText={(text)=>setCorreo(text)}
secureTextEntry={true}
/>
</View>


<View style={styles.cajaTexto}>
  <TextInput style={styles.inputBox}
  placeholder='Contraseña'   
  placeholderTextColor='#BDBDBD' 
onChangeText={(text)=>setPassword(text)}
secureTextEntry={true}
/>
</View>

<View style={styles.PadreBoton}>
  <TouchableOpacity style={styles.cajaBoton} >
    <Text style={styles.TextoBoton}  >Registrar</Text>
  </TouchableOpacity>

  </View>
<View style={styles.PadreBoton}>
  <TouchableOpacity onPress={() => navigation.navigate('Login') }>
    <Text style={styles.text1}>Tienes una cuenta INICIA SESION</Text>
  
  </TouchableOpacity>
</View>

      </View>
    </View>
  );
}

const styles=StyleSheet.create({
  padre :{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'white',
    color: 'black',
  },
  profile:{
    width:100,
    height:100,
    borderRadius: 50,
    borderColor:'white',
  },
  tarjeta:{
    margin:20,
    backgroundColor:'white',
    borderRadius:20,
    width:'90%',
  
padding:20,
shadowColor:'black',
shadowOffset:{
  width:0,
  height:2
},
shadowOpacity:0.25,
shadowRadius:4,
elevation:5,

  },
  text: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
   textAlign: 'center'
    
  },
  cajaTexto:{
    paddingVertical:20,
    backgroundColor:'#cccccc40',
    borderRadius: 30,
    marginVertical:10,
    color: 'black',
  },
  PadreBoton:{
    alignItems:'center'
  },
  cajaBoton:{
    backgroundColor:'#0090e3',
    borderRadius:30, 
    paddingVertical:20,
    width:150,
    marginTop:20,
    color: 'black',
  },
  TextoBoton:{
    textAlign: 'center',
    color: 'white',


  },
  inputBox:{
    fontSize: 16,
    color: 'black',
paddingHorizontal:15,
  },
  text1: {
    color: 'black',
    fontSize: 10,
   textAlign: 'center'
    
  },
}

)