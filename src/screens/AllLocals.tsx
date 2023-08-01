import React, { useState } from 'react'
import { StyleSheet, Text, FlatList, TouchableOpacity, View } from 'react-native'
import { Points } from '../componentes/Points'
import { useGetLocalsQuery } from '../services/api/api'
import { StackScreenProps } from '@react-navigation/stack';
import { InfoLocal } from '../componentes/InfoLocal';
import Icon from 'react-native-vector-icons/Ionicons';
import { LoadingScreen } from './LoadingScreen';

interface Props extends StackScreenProps <any , any>{};


export const AllLocals = ({navigation,route}  : Props) => {

    const {data:result,isSuccess:suceso, error:error2,isLoading} = useGetLocalsQuery()
    const data = result?.filter((e)=>e.item === route?.params?.cat)
return (
    <View style={{flex:1}}>
      {isLoading?<LoadingScreen/>:
       <>
       <TouchableOpacity onPress={()=>navigation.goBack()} 
       style={{justifyContent:'center',height:70,alignItems:'center',position:'absolute',left:15,zIndex:1000}}>
         <Icon 
           name="arrow-back"
           color="#FF914D"
           size={ 35 }
         />
       </TouchableOpacity>
       <Text style={{textAlignVertical:'center',height:70,color:'black',textAlign:'center',}}>Seleccione Local</Text>
           <FlatList        
           data={data}
           keyExtractor={ (control) => control.id.toString() }
           showsVerticalScrollIndicator={ false }
           renderItem={ ({ item }) => ( 
            <View style={styles.container}>
            <TouchableOpacity style={styles.buttons} 
            onPress={()=>navigation.navigate('AllLists',{name:item.name})} >
           <Text style={styles.title}>{item.name}</Text>
           <Text style={styles.values}>{item.location}</Text>
           <Text style={styles.values}>{item.localidad}</Text>
           <Text style={styles.values}>{item.provincia}</Text>
           <Text style={styles.values}>{item.item}</Text>
           </TouchableOpacity>
           </View>)}
           />
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
      borderColor:'#DDDDDD',
      borderWidth:1,
  },
  text:{
    color:'black',fontSize:10
  },
  title:{
      color:'white',fontSize:25,fontStyle:'italic',
      textAlign:'center',textDecorationLine:'underline',backgroundColor:'#FF914D',
      borderTopLeftRadius:15,borderTopRightRadius:15,height:45,textAlignVertical:'center'
  },
  values:{
    color:'black', fontSize:15,fontStyle:'italic',textAlign:'left',paddingHorizontal:10,paddingVertical:4
  }
  })



 