import React, { useEffect } from 'react'
import { View, Image, TouchableOpacity,Text, StyleSheet, FlatList } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { useGetGastronomiaIdQuery } from '../services/api/api';
import Icon from 'react-native-vector-icons/Ionicons';
import { LoadingScreen } from './LoadingScreen';

interface Props extends StackScreenProps <any , any>{};

export const Lists = ({navigation,route}  : Props) => {
    const data = {sessionId:route?.params?.sessionId}
    const {data:result,isSuccess:suceso, error:error2,isLoading} = useGetGastronomiaIdQuery(data)
    
  return (
      <View style={{flex:1}}>
        {isLoading? <LoadingScreen/>:
        <>
        {result?.length > 0 ? 
        <>
        <TouchableOpacity onPress={()=>navigation.goBack()} 
        style={{justifyContent:'center',height:70,alignItems:'center',position:'absolute',left:15,zIndex:1000}}>
          <Icon 
            name="arrow-back"
            color="#FF914D"
            size={ 35 }
          />
        </TouchableOpacity>
        <Text style={{textAlignVertical:'center',height:70,color:'black',textAlign:'center',}}>Auditorias</Text>
        <FlatList
        data={result}
        keyExtractor={ (control) => control.id.toString() }
        showsVerticalScrollIndicator={ false }
        renderItem={ ({ item }) => ( 
          <View style={styles.container}>
            <TouchableOpacity style={styles.buttons} onPress={()=>navigation.navigate('Result', {listId:item.id,sessionId:route?.params?.sessionId,local_name:item.local_name})} >
              <Text style={styles.title}>{item.local_name}</Text>
              <Text style={styles.text}>{item.fecha}</Text>
              <Text style={styles.text}>Total = {item.total}</Text>
              <Text style={styles.text}>Media = {Number(item.media)?.toFixed(2)}</Text>
              {item.change==="change1" ? 
              <View style={styles.noti}><Text style={styles.textNoti}>!</Text></View>
              : null}
            </TouchableOpacity>
          </View>
        ) }
        />
        </>
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
        <Text style={{color:'black',textAlign:'center',textAlignVertical:'center',flex:1}}>No tienes auditorias realizadas</Text>
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
  },
  noti:{
    backgroundColor:'red',
    width:40,
    height:40,
    borderRadius:20,
    position:'absolute',
    right:'5%',
    top:'-5%',
    justifyContent:'center',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textNoti:{
    textAlign:'center',
    fontSize:20,
    color:'white',
   
  }
})