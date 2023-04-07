import React  from 'react'
import { Button,ScrollView, Text, View,TouchableOpacity } from 'react-native'
import { useGetListbyIdQuery, useGetLocalsbyIdQuery } from '../services/api/api'
import { PointsResult } from '../componentes/PointsResult';
import { StackScreenProps } from '@react-navigation/stack';
import { InfoLocal } from '../componentes/InfoLocal';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends StackScreenProps <any , any>{};

export const AllResults = ({navigation,route}:Props) => {

  const dataLocal = {local_name:route?.params?.local_name}
  const {data:resultLocal,isSuccess:sucess, error:error,isLoading} = useGetLocalsbyIdQuery(dataLocal)


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
            <InfoLocal fecha={route?.params?.item?.fecha} resultado={Number(route?.params?.item?.resultado_media).toFixed(2)} 
            hora={route?.params?.item?.horario} nameLocal={resultLocal?.name} 
            direccion={resultLocal?.location} rubro={resultLocal?.item}
            user_name={route?.params?.item?.author_name} localidad={resultLocal?.localidad} 
            provincia={resultLocal?.provincia}/>
            <PointsResult title='Uso correcto de Marca en cartelería (tipografía y colores corporativos)' 
            num={route?.params?.item?.uso_marca_carteleria}  />
            <PointsResult title='Visibilidad y presentación de la Marca'
            num={route?.params?.item?.visibilidad_marca}/>           
            <PointsResult title='Señales y cartelería informativa y señalética (estado y uso correcto)'
            num={route?.params?.item?.señales_informativas} />
            <PointsResult title='Cartel de Horarios (colocado correctamente y actualizado)'
            num={route?.params?.item?.cartel_horarios} />
            <PointsResult title='Equipamiento y mobiliario (limpieza, estado y conservación)'
            num={route?.params?.item?.equipamiento_mobiliario} />
            <PointsResult title='Muebles y elementos (limpieza, estado y conservación)'
            num={route?.params?.item?.muebles} />
            <PointsResult title='Carta de productos y precios'
            num={route?.params?.item?.carta}/>
            <PointsResult title='Iluminación (limpieza, estado y conservación) se verificará también que otorguen visibilidad e identificación a distancia'
            num={route?.params?.item?.iluminacion}/>
            <PointsResult title='Fachada (Pintura, limpieza, estado y conservación)'
            num={route?.params?.item?.fachada} />
            <PointsResult title='Pintura (limpieza, estado y conservación)'
            num={route?.params?.item?.pintura} />
            <PointsResult title='Techos (pintura, limpieza, estado y conservación)'
            num={route?.params?.item?.techos}/>
            <PointsResult title='Pisos y zócalos (limpieza, estado y conservación)'
            num={route?.params?.item?.pisos}/>
            <PointsResult title='Veredas y espacios exteriores (limpieza, estado y conservación)'
            num={route?.params?.item?.veredas}/>
            <PointsResult title='Mural (limpieza, estado y conservación)'
            num={route?.params?.item?.mural}/>
            <PointsResult title='Vidrieras (limpias y despejadas de cualquier tipo de información o comunicación no homologada)'
            num={route?.params?.item?.vidrieras}/>
            <View>
              <Text style={{color:'black'}}>{route?.params?.item?.observaciones}</Text>
            </View>
        <View>
        </View>

      </View>
      {/* <Button  title="Enviar" color="#841584" onPress={postGastro} /> */}
    </ScrollView>
  )
}

