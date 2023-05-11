import React  from 'react'
import { Button,ScrollView, Text, View,TouchableOpacity,FlatList  } from 'react-native'
import { useGetGastronomiaQuery, useGetLocalsbyIdQuery } from '../services/api/api'
import { PointsResult } from '../componentes/PointsResult';
import { StackScreenProps } from '@react-navigation/stack';
import { InfoLocal } from '../componentes/InfoLocal';
import Icon from 'react-native-vector-icons/Ionicons';
import { LoadingScreen } from './LoadingScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PointsLocal } from '../componentes/PointsLocal';

interface Props extends StackScreenProps <any , any>{};

export const Auditoria = ({navigation,route}:Props) => {

  const result = route?.params?.incidents
  console.log(route?.params)
  return (
    <ScrollView>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Icon 
            name="arrow-back"
            color="#FF914D"
            size={ 35 }
            style={{marginLeft:10,marginTop:15}}
          />
        </TouchableOpacity>
      <View style={{width:'100%', alignItems:'center',marginBottom:10}} >
            <InfoLocal fecha={route?.params?.fecha} resultado={route?.params?.resultado_media.toFixed(2)} hora={route?.params?.horario} 
          nameLocal={route?.params?.local_name} direccion={route?.params?.location} rubro={route?.params?.item} user_name={route?.params?.author_name}
          localidad={route?.params?.localidad} provincia={route?.params?.provincia}/>
        <FlatList        
            data={result}
            keyExtractor={ (control) => control.name}
            style={{width:'100%'}}
            showsVerticalScrollIndicator={ false }
            renderItem={ ({ item }) => ( 
              <View style={{justifyContent:'center', 
              alignItems:'center',  }}>
              <PointsLocal num={item.value} title={item.name}/>
              </View>
           )}
            />

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
            <Text style={{    
              color:'black',
              textAlign:'left',
              width:'100%',
              padding:5,
              fontSize:20}}>Observaciones:</Text>
              <Text style={{color:'black',width:'100%',padding:10,fontSize:15}}>{route?.params?.observaciones}</Text>
            </View>
        </View>
    </ScrollView>
  )
}

