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
            <Text style={styles.text}>Local: <Text style={styles.text2}>{nameLocal}</Text></Text>
            <Text style={styles.text}>Dirección: <Text style={styles.text2}>{direccion}</Text></Text>
            <Text style={styles.text}>Localidad: <Text style={styles.text2}>{localidad}</Text></Text>
            <Text style={styles.text}>Provincia: <Text style={styles.text2}>{provincia}</Text></Text>
            <Text style={styles.text}>Rubro: <Text style={styles.text2}>{rubro}</Text></Text>
            {fecha?<Text style={styles.text}>Fecha de Visita: <Text style={styles.text2}>{fecha}</Text></Text>:null}
            {hora?<Text style={styles.text}>Horario de Visita: <Text style={styles.text2}>{hora}</Text></Text>:null}
            {Number.isNaN(resultado) ===true ?null:<Text style={styles.text}>Resultado Visita: <Text style={styles.text2}>{resultado}</Text></Text>}
            {user_name?<Text style={styles.text}>Auditor: <Text style={styles.text2}>{user_name}</Text></Text>:null}
        </View>
    </View>
)
}

const styles = StyleSheet.create({
container:{
    width:'95%',
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
    borderColor:'#DDDDDD',
    borderWidth:0.5
},
text:{
    color:'black',
    fontSize:12,
},
text2:{
    color:'#FF914D',
    fontSize:19,
    fontStyle:'italic',
},
row: {
    width:'100%',
    flex:1,
    justifyContent:'space-between',
    margin:6,
    paddingHorizontal:10,
    paddingVertical:6
  },
})