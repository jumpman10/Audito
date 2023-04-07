import React from 'react'
import { FlatList,StyleSheet, Text,  TouchableOpacity, View } from 'react-native'
import { Points } from '../componentes/Points'
import { usePostGastronomiaMutation } from '../services/api/api'
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useGetLocalsQuery } from '../services/api/api';
import { LoadingScreen } from './LoadingScreen';

interface Props extends StackScreenProps <any , any>{};

export const Locals = ({navigation,route}  : Props) => {
    const {data:result,isSuccess:suceso, error:error2,isLoading} = useGetLocalsQuery()

  return (
      <View style={{flex:1}}>
        {isLoading? <LoadingScreen/> :
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
            data={result}
            keyExtractor={ (control) => control.id.toString() }
            showsVerticalScrollIndicator={ false }
            renderItem={ ({ item }) => ( 
            <View style={styles.container}>
            <TouchableOpacity style={styles.buttons} 
            onPress={()=>navigation.replace('Control',{sessionId:route?.params?.sessionId,
                                                        local_name:item.name, location:item.location,item:item.item, 
                                                        localId:item.id,user_name:route?.params?.name,
                                                        provincia:item.provincia,localidad:item.localidad})} >
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.text}>Direccion = <Text style={styles.values}>{item.location}</Text></Text>
            <Text style={styles.text}>Localidad = <Text style={styles.values}>{item.localidad}</Text></Text>
            <Text style={styles.text}>Provincia = <Text style={styles.values}>{item.provincia}</Text></Text>
            <Text style={styles.text}>Rubro = <Text style={styles.values}>{item.item}</Text></Text>
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
        padding:10
    },
    text:{
      color:'black',fontSize:15,textAlign:'left'
    },
    title:{
        color:'black',fontSize:25,fontStyle:'italic',textAlign:'center'
    },
    values:{
      color:'#FF914D', fontSize:15,fontStyle:'italic',
    }
  })