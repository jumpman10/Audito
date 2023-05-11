import React, { useState } from 'react'
import {FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Points } from '../componentes/Points'
import { usePostGastronomiaMutation } from '../services/api/api'
import { StackScreenProps } from '@react-navigation/stack';
import { InfoLocal } from '../componentes/InfoLocal';
import Icon from 'react-native-vector-icons/Ionicons';
import { setData } from '../services/asyncStoraje';
import { useForm } from '../hooks/useForm';

interface Props extends StackScreenProps <any , any>{};

export const Control = ({navigation,route}  : Props) => {
     // const { isSuccess, isError,error,data}=useGetLocalsQuery()
  const date = new Date()
  const fecha = `${date.getUTCDate()<=9?`0${date.getUTCDate()}`:date.getUTCDate()}/${(date.getMonth()+1)<=9?`0${date.getMonth()+1}`:date.getMonth()+1}/${date.getUTCFullYear()}`
  const hora = `${date.getHours()}:${date.getMinutes()}`
  const { response, onChange} = useForm({
    response: '',
  });
  const [postGastro,{isSuccess:suceso, error:error2}] = usePostGastronomiaMutation()
  const [n1,setN1] = useState(0)
  const [n2,setN2] = useState(0)
  const [n3,setN3] = useState(0)
  const [n4,setN4] = useState(0)
  const [n5,setN5] = useState(0)
  const [n6,setN6] = useState(0)
  const [n7,setN7] = useState(0)
  const [n8,setN8] = useState(0)
  const [n9,setN9] = useState(0)
  const [n10,setN10] = useState(0)
  const [n11,setN11] = useState(0)
  const [n12,setN12] = useState(0)
  const [n13,setN13] = useState(0)
  const [n14,setN14] = useState(0)
  const [n15,setN15] = useState(0)
  const [n16,setN16] = useState(0)
  const [n17,setN17] = useState(0)
  const [n18,setN18] = useState(0)
  const [n19,setN19] = useState(0)
  const [n20,setN20] = useState(0)
  const [n21,setN21] = useState(0)
  const [n22,setN22] = useState(0)
  const [n23,setN23] = useState(0)
  const [n24,setN24] = useState(0)
  const [n25,setN25] = useState(0)
  const [n26,setN26] = useState(0)
  const [n27,setN27] = useState(0)
  const [n28,setN28] = useState(0) 
  const [n29,setN29] = useState(0)
  const [n30,setN30] = useState(0)

  const seteo = [setN1,setN2,setN3,setN4,setN5,setN6,setN7,setN8,setN9,setN10,setN11,setN12,
                 setN13,setN14,setN15,setN16,setN17,setN18,setN19,setN20,setN21,setN22,setN23,
                 setN24,setN25,setN26,setN27,setN28,setN29,setN30]

  const num = [n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16,
               n17,n18,n19,n20,n21,n22,n23,n24,n25,n26,n27,n28,n29,n30]
  
  const obj:any = []
  for (let i = 0; i <route?.params?.incidents.length; i++) {
      const objeto = {
                  name: route?.params?.incidents[i],
                  num: num[i],
                  seteo: seteo[i]
                };
      obj.push(objeto);
  }
  
  const total = n1+n2+n3+n4+n5+n6+n7+n8+n9+n10+n11+n12+n13+n14+n15+n16+
                n17+n18+n19+n20+n21+n22+n23+n24+n25+n26+n27+n28+n29+n30

  const dataApi:any=[]
  for (let i = 0; i <route?.params?.incidents.length; i++) {
    dataApi[(i)]  = {
                name: route?.params?.incidents[i],
                value: num[i],
              };
}

  const data = {observaciones:[response],fecha:fecha,total:total,horario:hora,
                media:total/obj.length,author_id:route?.params?.sessionId,local_id:route?.params?.localId,
                author_name:route?.params?.user_name,local_name:route?.params?.local_name, incidents:dataApi}
  const resultado = total/obj.length
  const enviar = ()=>{
    navigation.replace('Auditoria',{fecha:fecha,total:total,resultado_media:resultado,
      author_id: route?.params?.sessionId, local_id:route?.params?.localId,horario:hora,local_name:route?.params?.local_name,
      author_name:route?.params?.user_name,localidad:route?.params?.localidad,item:route?.params?.item,provincia:route?.params?.provincia,
      location:route?.params?.location,
      observaciones:response,incidents:dataApi })  
    postGastro(data)    
  }
  return (
    <View>
        <TouchableOpacity onPress={()=>navigation.goBack()}
        style={{justifyContent:'center'
        ,alignItems:'center',position:'absolute',left:5,zIndex:1000}}>
          <Icon 
            name="arrow-back"
            color="#FF914D"
            size={ 35 }
            style={{marginLeft:10,marginTop:15,}}
          />
        </TouchableOpacity>
        <View style={{width:'100%', alignItems:'center',marginBottom:10,marginTop:55}} >
        <FlatList        
            data={obj}
            keyExtractor={ (control) => control.name}
            style={{width:'100%'}}
            ListHeaderComponent={()=>(
              <View style={{alignItems:'center'}}>
              <InfoLocal fecha={fecha} resultado={resultado.toFixed(2)} hora={hora} 
          nameLocal={route?.params?.local_name} direccion={route?.params?.location} 
          rubro={route?.params?.item} user_name={route?.params?.user_name}
          localidad={route?.params?.localidad} provincia={route?.params?.provincia}/>
          </View> 
            )}
            ListFooterComponent={()=>(
              <View style={{marginTop:20,alignItems:'center'}}>
                <View style={styles.obs}>
                <Text style={styles.subs}>Observaciones:</Text>
              <TextInput
                style={styles.input}
                onChangeText={ (value) => onChange( value, 'response' ) }
                value={response}
                placeholderTextColor='gray'
                multiline
                numberOfLines={4}
                maxLength={40}
                placeholder='Escriba las observaiones'
              />
              </View>
              <TouchableOpacity style={{width: 250,
                                       height: 50,
                                       borderRadius:20,
                                       backgroundColor:'#FF914D',
                                       justifyContent:'center',
                                       alignItems:'center',}}
                                         onPress={()=> enviar()}
                                         > 
                                         <Text style={{color:'white',fontSize:20,fontStyle:'italic'}}>Enviar</Text>                               
               </TouchableOpacity>
               </View>   
            )}
            showsVerticalScrollIndicator={ false }
            renderItem={ ({ item }) => ( 
              <View style={{justifyContent:'center', 
              alignItems:'center',  }}>
              <Points num={item.num} title={item.name} seteo={item.seteo}/>
              </View>
           )}
            />
        </View> 
      
    </View>
  )
}


const styles = StyleSheet.create({
  obs:{
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
    padding:5
  },
  response:{
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
    paddingHorizontal:5,
    paddingBottom:15
  },
  input:{
    width: '90%',
    height:270,
    borderWidth:1,
    borderColor:'black',
    color:'black',
    backgroundColor:'#EEEEEE',
    textAlignVertical:'top',
    padding:15,
    marginVertical:5,
  },
  subs:{
    color:'black',
    textAlign:'left',
    width:'100%',
    padding:5,
    fontSize:20
  }
})