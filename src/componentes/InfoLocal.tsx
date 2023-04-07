import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'


interface Props {
    fecha: string,
    resultado:string,
    hora:string,
    nameLocal:string,
    direccion:string,
    rubro:string,
    user_name:string,
    localidad:string,
    provincia:string
  }
export const InfoLocal = ({fecha,resultado,hora,nameLocal,rubro,direccion,user_name,localidad,provincia}:Props) => {
    return (
    <View style={styles.container}>
        <View style={styles.row}>
            <Text style={styles.text}>Local: {nameLocal}</Text>
            <Text style={styles.text}>Dirección: {direccion}</Text>
            <Text style={styles.text}>Localidad: {localidad}</Text>
            <Text style={styles.text}>Provincia: {provincia}</Text>
            <Text style={styles.text}>Rubro: {rubro}</Text>
            {fecha?<Text style={styles.text}>Fecha de Visita: {fecha}</Text>:null}
            {hora?<Text style={styles.text}>Horario de Visita: {hora}</Text>:null}
            {Number.isNaN(resultado) ===true || 'empty'?null:<Text style={styles.text}>Resultado Visita: {resultado}</Text>}
            {user_name?<Text style={styles.text}>Auditor: {user_name}</Text>:null}
        </View>
    </View>
)
}

const styles = StyleSheet.create({
container:{
    width:'95%',
    height:250,
    justifyContent:'center',
    alignItems:'center',
    marginVertical:'2%', 
    borderRadius:15,
    backgroundColor:'white',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
},
text:{
    color:'black'
},
row: {
    width:'100%',
    flex:1,
    justifyContent:'space-between',
    margin:6,
    padding:6
  },
})