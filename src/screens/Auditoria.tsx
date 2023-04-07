import React  from 'react'
import { Button,ScrollView, Text, View,TouchableOpacity } from 'react-native'
import { useGetGastronomiaQuery, useGetLocalsbyIdQuery } from '../services/api/api'
import { PointsResult } from '../componentes/PointsResult';
import { StackScreenProps } from '@react-navigation/stack';
import { InfoLocal } from '../componentes/InfoLocal';
import Icon from 'react-native-vector-icons/Ionicons';
import { LoadingScreen } from './LoadingScreen';

interface Props extends StackScreenProps <any , any>{};

export const Auditoria = ({navigation,route}:Props) => {
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
            <PointsResult title='Uso correcto de Marca en cartelería (tipografía y colores corporativos)' 
            num={route?.params?.uso_marca_carteleria}  />
            <PointsResult title='Visibilidad y presentación de la Marca'
            num={route?.params?.visibilidad_marca}/>           
            <PointsResult title='Señales y cartelería informativa y señalética (estado y uso correcto)'
            num={route?.params?.señales_informativas} />
            <PointsResult title='Cartel de Horarios (colocado correctamente y actualizado)'
            num={route?.params?.cartel_horarios} />
            <PointsResult title='Equipamiento y mobiliario (limpieza, estado y conservación)'
            num={route?.params?.equipamiento_mobiliario} />
            <PointsResult title='Muebles y elementos (limpieza, estado y conservación)'
            num={route?.params?.muebles} />
            <PointsResult title='Carta de productos y precios'
            num={route?.params?.carta}/>
            <PointsResult title='Iluminación (limpieza, estado y conservación) se verificará también que otorguen visibilidad e identificación a distancia'
            num={route?.params?.iluminacion}/>
            <PointsResult title='Fachada (Pintura, limpieza, estado y conservación)'
            num={route?.params?.fachada} />
            <PointsResult title='Pintura (limpieza, estado y conservación)'
            num={route?.params?.pintura} />
            <PointsResult title='Techos (pintura, limpieza, estado y conservación)'
            num={route?.params?.techos}/>
            <PointsResult title='Pisos y zócalos (limpieza, estado y conservación)'
            num={route?.params?.pisos}/>
            <PointsResult title='Veredas y espacios exteriores (limpieza, estado y conservación)'
            num={route?.params?.veredas}/>
            <PointsResult title='Mural (limpieza, estado y conservación)'
            num={route?.params?.mural}/>
            <PointsResult title='Vidrieras (limpias y despejadas de cualquier tipo de información o comunicación no homologada)'
            num={route?.params?.vidrieras}/>
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
              <Text style={{color:'black',padding:10,width:'100%'}}>{route?.params?.observaciones}</Text>
            </View>
        </View>
    </ScrollView>
  )
}

