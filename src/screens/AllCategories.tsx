import React, { useEffect } from 'react'
import { View, Image, TouchableOpacity,Text, StyleSheet, FlatList } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { useGetAllListsQuery } from '../services/api/api';
import Icon from 'react-native-vector-icons/Ionicons';
import { LoadingScreen } from './LoadingScreen';

interface Props extends StackScreenProps <any , any>{};

export const AllCategories = ({navigation,route}  : Props) => {
    
const data = ['Gastronomía','Indumentaria', 'Librería','Sommiers, Colchones y Deco']
    
  return (
      <View style={{flex:1}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} 
        style={{justifyContent:'center',height:70,alignItems:'center',position:'absolute',left:15,zIndex:1000}}>
          <Icon 
            name="arrow-back"
            color="#FF914D"
            size={ 35 }
          />
        </TouchableOpacity>
        <Text style={{textAlignVertical:'center',height:70,color:'black',textAlign:'center',}}>Categorias</Text>
        <FlatList
        data={data}
        keyExtractor={ (control) => control}
        style={{width:'100%'}}
        showsVerticalScrollIndicator={ false }
        renderItem={ ({ item }) => ( 
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttons} 
            onPress={()=>navigation.navigate('AllLocals',{cat:item})} >
              <Text style={styles.title}>{item}</Text>
            </TouchableOpacity>
        </View>
        )}
        />
        
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