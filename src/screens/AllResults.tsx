import React  from 'react'
import { Button,FlatList, Text, View,TouchableOpacity } from 'react-native'
import { useGetListbyIdQuery, useGetLocalsbyIdQuery } from '../services/api/api'
import { PointsResult } from '../componentes/PointsResult';
import { StackScreenProps } from '@react-navigation/stack';
import { InfoLocal } from '../componentes/InfoLocal';
import Icon from 'react-native-vector-icons/Ionicons';
import { LoadingScreen } from './LoadingScreen';

interface Props extends StackScreenProps <any , any>{};

export const AllResults = ({navigation,route}:Props) => {

  const dataLocal = {local_name:route?.params?.local_name}
  const {data:resultLocal,isSuccess:sucess, error:error,isLoading} = useGetLocalsbyIdQuery(dataLocal)
  const result = route?.params?.item

  return (
<View style={{flex:1}}>       
        {isLoading ? <LoadingScreen/>:
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
          <FlatList        
            data={result.incidents}
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
              </View>
            )}
            showsVerticalScrollIndicator={ false }
            renderItem={ ({ item }) => ( 
              <View style={{justifyContent:'center', 
              alignItems:'center',  }}>
              <PointsResult num={item.value} title={item.name}/>
              </View>
           )}
            />
      </View>
      </>
      }
    </View>
  )
}

