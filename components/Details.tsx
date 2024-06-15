import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Image } from 'react-native';

export function Details({ navigation, route }) {
   const [pokemonData, setPokemonData] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchPokemonData = async () => {
         const { url } = route.params;
         if (url) {
            try {
               const response = await fetch(url);
               if (response.status !== 200) {
                  throw new Error('Error en la petición');
               }
               const data = await response.json();
               setPokemonData(data);
            } catch (error) {
               console.error('Error fetching Pokémon data:', error);
            } finally {
               setLoading(false);
            }
         } else {
            setLoading(false);
         }
      };

      fetchPokemonData();
   }, [route.params]);

   function handleClick() {
      navigation.navigate('Home');
   }

   return (
      <TouchableOpacity onPress={handleClick} style={styles.touchable}>
         {loading ? (
            <ActivityIndicator size="large" color="#FF0000" />
         ) : pokemonData ? (
            <View style={styles.container}>
               <Image source={{ uri: pokemonData.sprites.front_default }} style={styles.image} />
               <View style={styles.infoContainer}>
                  <Text style={styles.text}>Name: {pokemonData.name}</Text>
                  <Text style={styles.text}>Height: {pokemonData.height}</Text>
                  <Text style={styles.text}>Weight: {pokemonData.weight}</Text>
                  {/* Muestra más información del Pokémon según sea necesario */}
               </View>
            </View>
         ) : (
            <Text style={styles.text}>No Pokémon data available</Text>
         )}
      </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
   touchable: {
      flex: 1,
      backgroundColor: "#FF0000", // Fondo rojo de la Pokédex
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
   },
   container: {
      flexDirection: 'row', // Para alinear la imagen y la información en una fila
      alignItems: 'center', // Alinea verticalmente los elementos
      backgroundColor: "#FFFFFF", // Fondo blanco para el contenido
      borderColor: "#000000", // Bordes negros
      borderWidth: 2,
      borderRadius: 10, // Bordes redondeados
      padding: 20,
      width: "80%",
      justifyContent: "center", // Centra los elementos horizontalmente
      shadowColor: "#000000", // Sombra para darle profundidad
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 5, // Elevación en Android
   },
   image: {
      width: 300, // Tamaño de la imagen
      height: 300, // Tamaño de la imagen
      resizeMode: 'contain', // Ajusta el modo de redimensionamiento de la imagen
      marginRight: 20, // Espacio entre la imagen y la información
   },
   infoContainer: {
      flex: 1, // Para que ocupe el espacio restante
   },
   text: {
      fontSize: 24, // Ajuste del tamaño de fuente
      lineHeight: 28,
      marginVertical: 10,
      color: "lightgray", // Texto blanco
      textTransform: "capitalize",
      fontWeight: "bold",
      textShadowColor: "#000000", // Sombra en el texto
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
   },
});
