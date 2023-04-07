import React  from 'react'
import { Button,ScrollView, Text, View,TouchableOpacity } from 'react-native'
import { useGetGastronomiaQuery, useGetLocalsbyIdQuery } from '../services/api/api'
import { PointsResult } from '../componentes/PointsResult';
import { StackScreenProps } from '@react-navigation/stack';
import { InfoLocal } from '../componentes/InfoLocal';
import Icon from 'react-native-vector-icons/Ionicons';
import { LoadingScreen } from './LoadingScreen';

interface Props extends StackScreenProps <any , any>{};

export const Result = ({navigation,route}:Props) => {

  const data = {listId:route?.params?.listId, sessionId:route?.params?.sessionId,local_name:route?.params?.local_name}
  const {data:result,isSuccess:suceso, error:error2,isLoading} = useGetGastronomiaQuery(data)
  const dataLocal = {local_name:route?.params?.local_name}
  const {data:resultLocal,isSuccess:sucess, error:error,isLoading:isLoadingLocal} = useGetLocalsbyIdQuery(dataLocal)


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
        {isLoading&&isLoadingLocal?<LoadingScreen/>:
      <View style={{width:'100%', alignItems:'center',marginBottom:10}} >
            <InfoLocal fecha={result?.map(e=>e.fecha)} resultado={Number(result?.map(e=>e.resultado_media)).toFixed(2)} hora={result?.map(e=>e.horario)} 
          nameLocal={resultLocal?.name} direccion={resultLocal?.location} rubro={resultLocal?.item} user_name={result?.map(e=>e.author_name)}
          localidad={resultLocal?.localidad} provincia={resultLocal?.provincia}/>
            <PointsResult title='Uso correcto de Marca en cartelería (tipografía y colores corporativos)' 
            num={result?.map(e=>e.uso_marca_carteleria)}  />
            <PointsResult title='Visibilidad y presentación de la Marca'
            num={result?.map(e=>e.visibilidad_marca)}/>           
            <PointsResult title='Señales y cartelería informativa y señalética (estado y uso correcto)'
            num={result?.map(e=>e.señales_informativas)} />
            <PointsResult title='Cartel de Horarios (colocado correctamente y actualizado)'
            num={result?.map(e=>e.cartel_horarios)} />
            <PointsResult title='Equipamiento y mobiliario (limpieza, estado y conservación)'
            num={result?.map(e=>e.equipamiento_mobiliario)} />
            <PointsResult title='Muebles y elementos (limpieza, estado y conservación)'
            num={result?.map(e=>e.muebles)} />
            <PointsResult title='Carta de productos y precios'
            num={result?.map(e=>e.carta)}/>
            <PointsResult title='Iluminación (limpieza, estado y conservación) se verificará también que otorguen visibilidad e identificación a distancia'
            num={result?.map(e=>e.iluminacion)}/>
            <PointsResult title='Fachada (Pintura, limpieza, estado y conservación)'
            num={result?.map(e=>e.fachada)} />
            <PointsResult title='Pintura (limpieza, estado y conservación)'
            num={result?.map(e=>e.pintura)} />
            <PointsResult title='Techos (pintura, limpieza, estado y conservación)'
            num={result?.map(e=>e.techos)}/>
            <PointsResult title='Pisos y zócalos (limpieza, estado y conservación)'
            num={result?.map(e=>e.pisos)}/>
            <PointsResult title='Veredas y espacios exteriores (limpieza, estado y conservación)'
            num={result?.map(e=>e.veredas)}/>
            <PointsResult title='Mural (limpieza, estado y conservación)'
            num={result?.map(e=>e.mural)}/>
            <PointsResult title='Vidrieras (limpias y despejadas de cualquier tipo de información o comunicación no homologada)'
            num={result?.map(e=>e.vidrieras)}/>
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
          <Text style={{color:'black',width:'100%',padding:10}}>{result?.map(e=>e.observaciones)}</Text>
            </View>
        <View>
        </View>

      </View>
      }
      {/* <Button  title="Enviar" color="#841584" onPress={postGastro} /> */}
    </ScrollView>
  )
}

