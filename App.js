import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
  TextInput,
  ScrollView,
  StyleSheet,
  Button,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Cita from "./components/Cita";
import Formulario from "./components/Formulario";

const App = () => {
  //definir el state de citas
  const [citas, setCitas] = useState([]);

  //estado para mostrar u ocultar el formulario de agregar cita
  const [mostrarForm, guardarForm] = useState(true);

  //eliminar los pacientes del estate
  const eliminarPaciente = (id) => {
    setCitas((citasActuales) => {
      return citasActuales.filter((cita) => cita.id !== id);
    });
  };

  const mostrarFormulario = () => {
    guardarForm(!mostrarForm);
  };

  const esconderTeclado = () =>{
    Keyboard.dismiss();
  }

  return (

    <TouchableWithoutFeedback onPress={()=>{esconderTeclado()}}>
      <View style={styles.contenedor}>
      <Text style={styles.title}>Administrador de citas</Text>
      <Text style={styles.title}>
        {citas.length > 0 ? "Administra tus citas" : "Agregar una cita"}
      </Text>
      <View>
        <TouchableHighlight
          onPress={() => mostrarFormulario()}
          style={styles.btnCrearCita}
        >
          <Text style={styles.textoCita}>
            {mostrarForm ? "Cancelar cita" : "Crear cita"}
          </Text>
        </TouchableHighlight>
      </View>

      {mostrarForm ? (
        <Formulario
          citas={citas}
          setCitas={setCitas}
          guardarForm={guardarForm}
        />
      ) : (
        <FlatList
          data={citas}
          renderItem={({ item }) => (
            <Cita cita={item} eliminarPaciente={eliminarPaciente} />
          )}
          keyExtractor={(cita) => cita.id}
        />
      )}
    </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#2E86C1",
    flex: 1,
  },
  textoCita: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  btnCrearCita: {
    padding: 10,
    backgroundColor: "#F5B041",
    marginVertical: 10,
  },
  title: {
    color: "#fff",
    marginTop: 40,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default App;
