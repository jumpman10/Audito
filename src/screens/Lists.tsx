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
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.text}>{item.fecha}</Text>
                <Text style={styles.text}>{item.horario}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.text}>Total = {item.total}</Text>
                <Text style={styles.text}>Media = {Number(item.media)?.toFixed(2)}</Text>
              </View>
              {item.change==="inprocess" ? 
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
    marginVertical:'4%', 
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
    borderWidth:1,
  },
  text:{
    color:'black',fontSize:18,marginVertical:1,paddingHorizontal:15,paddingVertical:5
  },
  title:{
    color:'white',fontSize:25,fontStyle:'italic',
    textAlign:'center',textDecorationLine:'underline',backgroundColor:'#FF914D',
    borderTopLeftRadius:15,borderTopRightRadius:15,height:45,textAlignVertical:'center'
  },
  noti:{
    backgroundColor:'red',
    width:60,
    height:60,
    borderRadius:30,
    position:'absolute',
    right:'2%',
    top:'-11%',
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