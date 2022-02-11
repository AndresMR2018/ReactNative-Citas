import React, {useState} from 'react';
import { Text, StyleSheet, View, TextInput, Button, ScrollView, TouchableHighlight, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid'

const Formulario = ({citas, setCitas, guardarForm}) => {

    const [paciente , guardarPaciente] = useState('');
    const [propietario , guardarPropietario] = useState('');
    const [telefono , guardarTelefono] = useState('');
    const [sintomas , guardarSintomas] = useState('');
    const [fecha, guardarFecha] = useState('');
    const [hora , guardarHora] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const confirmarFecha = (date) => {
        const opciones={year:"numeric", month:"long", day : "2-digit"}
        guardarFecha(date.toLocaleDateString('es-ES', opciones))
      hideDatePicker();
    };

    //Muestra u oculta el time picker
    const showTimePicker = () => {
        setTimePickerVisibility(true);
      };
    
      const hideTimePicker = () => {
        setTimePickerVisibility(false);
      };
      const confirmarHora = (hora) => {
          const opciones = {hour:'numeric', minute:'2-digit', hour12:false}
          guardarHora(hora.toLocaleString('en-US',opciones))
        hideTimePicker();
      };

      const crearNuevaCita = ()=>{

console.log('desde crear')
if(paciente.trim()==='' || propietario.trim()==='' || telefono.trim()==='' || fecha.trim()==='' || hora.trim()==='' || sintomas.trim()===''){
mostrarAlerta();
}
console.log("hola")
const cita = {paciente, propietario, telefono, fecha, hora, sintomas};
console.log("antes de shortid")
cita.id = shortid.generate();
console.log(cita)
const citasNuevo =[...citas, cita]//obtenemos una copia de la cita y le añadimos la nueva cita
setCitas(citasNuevo)     
guardarForm(false)

}

      const mostrarAlerta = ()=>{
          Alert.alert(
              'Error',
              'Todos los campos son obligatorios',
              [{
                  text:'OK'
                }]
          )
      }
      
    return (
        <>
      <ScrollView style={styles.formulario}>
      <View>
      <Text style={styles.label}>Paciente:</Text>
        <TextInput style={styles.input} 
        onChangeText={texto => guardarPaciente(texto)}
        />
      </View>
      <View>
      <Text style={styles.label}>Dueño:</Text>
        <TextInput style={styles.input} 
        onChangeText={texto => guardarPropietario(texto)}
        />
      </View>
      <View>
      <Text style={styles.label}>Teléfono contacto:</Text>
        <TextInput style={styles.input} 
        onChangeText={texto => guardarTelefono(texto)}
        keyboardType='number-pad'
        />
      </View>

      <View>
      <Text style={styles.label}>Fecha:</Text>
      <Button title="Seleccionar fecha" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={confirmarFecha}
        onCancel={hideDatePicker}
        locale='es-ES'
        headerTextIOS='Elige una fecha'
        cancelTextIOS='Cancelar'
        confirmTextIOS='Confirmar'
      />
      <Text>{fecha}</Text>
    </View>

    <View>
        <Text style={styles.label}>Hora:</Text>
      <Button title="Seleccionar hora" onPress={showTimePicker} />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={confirmarHora}
        onCancel={hideTimePicker}
        locale='es-ES'
        headerTextIOS='Elige una hora'
        cancelTextIOS='Cancelar'
        confirmTextIOS='Confirmar'
      />
      <Text>{hora}</Text>
    </View>

      <View>
      <Text style={styles.label}>Síntomas:</Text>
        <TextInput style={styles.input} 
        multiline
        onChangeText={texto => guardarSintomas(texto)}
        />
      </View>

      <View>
          <TouchableHighlight  onPress={()=>crearNuevaCita()} style={styles.btnEnviar}>
              <Text style={styles.textoEnviar}>Guardar </Text>
          </TouchableHighlight>
      </View>
       </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    formulario:{
        backgroundColor:'#fff'
        ,paddingHorizontal:20
        ,paddingVertical:10,
        marginHorizontal:'2.5%'
    },

    label:{
        fontWeight:'bold',
        fontSize:18,
        marginTop:20
    },
    textoEnviar:{
        color:'#fff',
        fontWeight:'bold',
        textAlign:'center'
    },
    btnEnviar:{
        padding:10,
    backgroundColor:'#52BE80',
    marginVertical:10,
},

    input:{
        marginTop:10,
        height:50,
        borderColor:'#e1e1e1',
        borderWidth:1,
        borderStyle:'solid'
    }
})
 
export default Formulario;