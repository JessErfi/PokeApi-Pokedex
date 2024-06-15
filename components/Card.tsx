import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export function Card({ data = null, navigation }) {
   function handleClick() {
      navigation.navigate("Details", { url: data?.url });
   }

   return (
      <TouchableOpacity style={styles.container} onPress={handleClick}>
         <Text style={styles.text}>{data?.name}</Text>
      </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: "#FF0000", // Rojo característico de la Pokédex
      borderColor: "#000000", // Borde negro
      borderWidth: 2,
      borderRadius: 10, // Bordes redondeados
      height: 60,
      width: 160, // Ajusta el ancho para que el nombre quepa
      margin: 10,
      display: "flex",
      justifyContent: "center", // Centra el contenido verticalmente
      alignItems: "center", // Centra el contenido horizontalmente
      shadowColor: "#000000", // Sombra para darle profundidad
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 5, // Elevación en Android
   },
   text: {
      color: "white",
      fontSize: 20, // Tamaño de fuente más grande para destacar el nombre
      fontWeight: "bold", // Negrita para resaltar
      textShadowColor: "#000000", // Sombra en el texto
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 1,
   },
});
