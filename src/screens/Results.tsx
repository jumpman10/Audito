import React, { useState }  from 'react'
import { Button, Text,ScrollView, View,TouchableOpacity, FlatList } from 'react-native'
import { useGetGastronomiaQuery, useGetLocalsbyIdQuery, usePutIncidentsMutation } from '../services/api/api'
import { PointsResult } from '../componentes/PointsResult';
import { StackScreenProps } from '@react-navigation/stack';
import { InfoLocal } from '../componentes/InfoLocal';
import Icon from 'react-native-vector-icons/Ionicons';
import { LoadingScreen } from './LoadingScreen';
import { PointsPut } from '../componentes/PointsPut';


interface Props extends StackScreenProps <any , any>{};

export const Result = ({navigation,route}:Props) => {

  const data = {listId:route?.params?.listId, sessionId:route?.params?.sessionId,local_name:route?.params?.local_name}
  const {data:result,isSuccess:suceso, error:error2,isLoading} = useGetGastronomiaQuery(data)
  const dataLocal = {local_name:route?.params?.local_name}
  const {data:resultLocal,isSuccess:sucess, error:error,isLoading:isLoadingLocal} = useGetLocalsbyIdQuery(dataLocal)
  const [sendIncidents,{data:resultado}]= usePutIncidentsMutation()
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
  const total = n1+n2+n3+n4+n5+n6+n7+n8+n9+n10+n11+n12+n13+n14+n15+n16+
                n17+n18+n19+n20+n21+n22+n23+n24+n25+n26+n27+n28+n29+n30
  
  const obj:any = []
  if(isLoading===false){
               for (let i = 0; i <result?.incidents?.length; i++) {
                   const objeto = {
                               name: result?.incidents?.map(e=>e.name)[i],
                               value: result?.incidents?.map(e=>e.value)[i],
                               seteo: seteo[i],
                               newNum:num[i],
                               toChange: result?.toChange?.includes(result?.incidents?.map(e=>e.name)[i]) ? result?.incidents?.map(e=>e.name)[i] : ""
                             };
                   obj.push(objeto);
               }}
  const dataApi:any=[]
               for (let i = 0; i <result?.incidents?.length; i++) {
                 dataApi[(i)]  = {
                             name: result?.incidents?.map(e=>e.name)[i],
                             value: result?.toChange?.includes(result?.incidents?.map(e=>e.name)[i])? num[i] : result?.incidents?.map(e=>e.value)[i] ,
                           };
             }  
  const sendData = {observaciones:['si esto es una observacion perro'],
  media:total/obj.length,sessionId:route?.params?.sessionId,listId:route?.params?.listId,
  author_name:route?.params?.user_name,local_name:route?.params?.local_name, incidents:dataApi}                    
  const send = () =>{
    sendIncidents(sendData)
  } 
  return (
    <View style={{flex:1}}>       
        {isLoading && isLoadingLocal? <LoadingScreen/>:
        <>
        <TouchableOpacity onPress={()=>navigation.goBack()} 
            style={{justifyContent:'center',height:70,alignItems:'center',position:'absolute',left:15,zIndex:1000}}>
            <Icon 
              name="arrow-back"
              color="#FF914D"
                size={ 35 }
             />
          </TouchableOpacity>
      <View style={{width:'100%', alignItems:'center',marginBottom:10,marginTop:55}} >
          {result ?        
          <FlatList        
            data={obj}
            keyExtractor={ (control) => control.name}
            style={{width:'100%'}}
            ListHeaderComponent={()=>(
              <View style={{ alignItems:'center'}}>
              <InfoLocal fecha={result.fecha} resultado={Number(result.media).toFixed(2)} hora={result.horario} 
              nameLocal={resultLocal?.name} direccion={resultLocal?.location} rubro={resultLocal?.item} user_name={result.author_name}
              localidad={resultLocal?.localidad} provincia={resultLocal?.provincia}/>
              </View>
            )}
            ListFooterComponent={()=>(
              <View style={{ alignItems:'center'}}>
              <View style={{
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
              }}>
                <Text style={{color:'black',textAlign:'left',width:'100%'}}>Observaciones:</Text>
                      <Text style={{color:'black',width:'100%',padding:10}}>{result.observaciones}</Text>
                        </View>
              <View style={{marginTop:20,alignItems:'center'}}>
              <TouchableOpacity style={{width: 250,
                                       height: 50,
                                       borderRadius:20,
                                       backgroundColor:'#FF914D',
                                       justifyContent:'center',
                                       alignItems:'center',}}
                                         onPress={()=> send()}
                                         > 
                                         <Text style={{color:'white',fontSize:20,fontStyle:'italic'}}>Enviar</Text>                               
               </TouchableOpacity>
               </View>             
              </View>
            )}
            showsVerticalScrollIndicator={ false }
            renderItem={ ({ item }) => ( 
              <View style={{justifyContent:'center', 
              alignItems:'center',  }}>
              <PointsPut num={item.value} title={item.name} seteo={item.seteo} newNum={item.newNum} toChange={item.toChange}/>
              </View>
           )}
            /> :null}
      </View>
      </>
      }
    </View>
    
  )
}

