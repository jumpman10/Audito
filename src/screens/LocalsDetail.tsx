import React, { useEffect } from 'react'
import { View, ScrollView, TouchableOpacity,Text, StyleSheet, FlatList } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { useGetAllListsQuery } from '../services/api/api';
import Icon from 'react-native-vector-icons/Ionicons';
import { InfoLocal } from '../componentes/InfoLocal';
import { Months } from '../componentes/Months';
import { LoadingScreen } from './LoadingScreen';

interface Props extends StackScreenProps <any , any>{};
export const LocalsDetail = ({navigation,route}  : Props) => {
  const {data,isSuccess:suceso, error:error2,isLoading} = useGetAllListsQuery()
  const meses = [{mes:'Enero',num:'01'},{mes:'Febrero',num:'02'},{mes:'Marzo',num:'03'},{mes:'Abril',num:'04'}
  ,{mes:'Mayo',num:'05'},{mes:'Junio',num:'06'},{mes:'Julio',num:'07'},{mes:'Agosto',num:'08'},
  {mes:'Septiembre',num:'09'},{mes:'Octubre',num:'10'},{mes:'Noviembre',num:'11'},{mes:'Diciembre',num:'12'}]
  const result = data?.filter((e)=>e.local_name === route?.params?.local_name)
  return (
    <View style={{flex:1}}>
{isLoading?<LoadingScreen/> :
      <>
      {result?.length > 0 ? 
      <ScrollView>
        <View style={{width:'100%', alignItems:'center',marginBottom:10}} >
        <TouchableOpacity onPress={()=>navigation.goBack()} 
        style={{justifyContent:'center',height:70,alignItems:'center',position:'absolute',left:15,zIndex:1000}}>
          <Icon 
            name="arrow-back"
            color="#FF914D"
            size={ 35 }
          />
        </TouchableOpacity>
        <Text style={{textAlignVertical:'center',height:70,color:'black',textAlign:'center',}}>Controles</Text>
        <InfoLocal fecha={route?.params?.item?.fecha} resultado={'empty'} 
            hora={route?.params?.item?.horario} nameLocal={route?.params?.local_name} 
            direccion={route?.params?.item?.location} rubro={route?.params?.item?.item}
            user_name={route?.params?.item?.author_name} localidad={route?.params?.item?.localidad} 
            provincia={route?.params?.item?.provincia}/>
        
        <FlatList
        data={meses}
        keyExtractor={ (control) => control.num.toString() }
        showsVerticalScrollIndicator={ false }
        style={{width:'100%'}}
        renderItem={ ({ item }) => ( 
          <>
          <Months month={item.mes} media={result} mes={item.num}/>
          </>
        ) }
        />
        </View>
        </ScrollView>
        :        
        <>
        <TouchableOpacity onPress={()=>navigation.goBack()} 
        style={{justifyContent:'center',height:70,alignItems:'center',position:'absolute',left:15,zIndex:1000}}>
          <Icon 
            name="arrow-back"
            color="#FF914D"
            size={ 35 }
          />
        </TouchableOpacity>
        <Text style={{color:'black',textAlign:'center',textAlignVertical:'center',flex:1}}>
          No tienes auditorias realizadas en este local</Text>
        </>
        }
        </>
        }
      </View>
  )
}

const styles = StyleSheet.create({
    container:{    
      justifyContent:'center', 
      alignItems:'center',   
    },
    buttons:{   
        width:'90%',  
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
        padding:10
    },
    text:{
      color:'black',fontSize:17,marginVertical:1
    },
    title:{
        color:'#FF914D',fontSize:20,fontStyle:'italic',textAlign:'center',marginVertical:2
    }
  })