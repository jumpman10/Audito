import React, { useState } from 'react'
import { Button, LayoutAnimation, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Points } from '../componentes/Points'
import { usePostGastronomiaMutation } from '../services/api/api'
import { StackScreenProps } from '@react-navigation/stack';
import { InfoLocal } from '../componentes/InfoLocal';
import Icon from 'react-native-vector-icons/Ionicons';
import { setData } from '../services/asyncStoraje';

interface Props extends StackScreenProps <any , any>{};

export const Control = ({navigation,route}  : Props) => {
     // const { isSuccess, isError,error,data}=useGetLocalsQuery()
  const date = new Date()
  const fecha = `${date.getUTCDate()<=9?`0${date.getUTCDate()}`:date.getUTCDate()}/${(date.getMonth()+1)<=9?`0${date.getMonth()+1}`:date.getMonth()+1}/${date.getUTCFullYear()}`
  const hora = `${date.getHours()}:${date.getMinutes()}`
  const [postGastro,{isSuccess:suceso, error:error2}] = usePostGastronomiaMutation()
  const [uso_marca_carteleria, setuso_marca_carteleria] = useState({num:0,obs:''});
  const [visibilidad_marca, setvisibilidad_marca] = useState({num:0,obs:''});
  const [señales_informativas, setseñales_informativas] = useState({num:0,obs:''});
  const [cartel_horarios, setcartel_horarios] = useState({num:0,obs:''});
  const [equipamiento_mobiliario, setequipamiento_mobiliario] = useState({num:0,obs:''});
  const [muebles, setmuebles] = useState({num:0,obs:''});
  const [carta, setcarta] = useState({num:0,obs:''});
  const [iluminacion, setiluminacion] = useState({num:0,obs:''});
  const [fachada, setfachada] = useState({num:0,obs:''});
  const [pintura, setpintura] = useState({num:0,obs:''});
  const [techos, settechos] = useState({num:0,obs:''});
  const [pisos, setpisos] = useState({num:0,obs:''});
  const [veredas, setveredas] = useState({num:0,obs:''});
  const [mural, setmural] = useState({num:0,obs:''});
  const [vidrieras, setvidrieras] = useState({num:0,obs:''});
  const total = uso_marca_carteleria.num+visibilidad_marca.num+señales_informativas.num+
                cartel_horarios.num+equipamiento_mobiliario.num+
                muebles.num+carta.num+iluminacion.num+fachada.num+pintura.num+
                techos.num+pisos.num+veredas.num+mural.num+vidrieras.num
  const data = {fecha:fecha,uso_marca_carteleria:uso_marca_carteleria.num, visibilidad_marca:visibilidad_marca.num,
                señales_informativas:señales_informativas.num, cartel_horarios:cartel_horarios.num,
                equipamiento_mobiliario:equipamiento_mobiliario.num, muebles:muebles.num, carta:carta.num,
                iluminacion:iluminacion.num,fachada:fachada.num,pintura:pintura.num, techos:techos.num,pisos:pisos.num,
                veredas:veredas.num, mural:mural.num, vidrieras:vidrieras.num,total:total,
                author_id: route?.params?.sessionId, local_id:route?.params?.localId,horario:hora,local_name:route?.params?.local_name,
                author_name:route?.params?.user_name,
                observaciones:[`${uso_marca_carteleria.obs.length > 0 ? `-${uso_marca_carteleria.obs}`:null}
                   ${visibilidad_marca.obs.length> 0 ?`\n-${visibilidad_marca.obs}`:null}
                   ${señales_informativas.obs.length> 0 ?`\n-${señales_informativas.obs}`:null}
                   ${cartel_horarios.obs.length> 0 ?`\n-${cartel_horarios.obs}`:null}
                   ${equipamiento_mobiliario.obs.length> 0 ?`\n-${equipamiento_mobiliario.obs}.obs`:null}${muebles.obs.length> 0 ?`\n-${muebles.obs}`:null}
                   ${carta.obs.length> 0 ?`\n-${carta.obs}`:null}${iluminacion.obs.length> 0 ?`\n-${iluminacion.obs}`:null}
                   ${fachada.obs.length> 0 ?`\n-${fachada.obs}`:null}${pintura.obs.length> 0 ?`\n-${pintura.obs}`:null}
                   ${techos.obs.length> 0 ?`\n-${techos.obs}`:null}${pisos.obs.length> 0 ?`\n-${pisos.obs}`:null}${veredas.obs.length> 0 ?`\n-${veredas.obs}`:null}
                   ${mural.obs.length> 0 ?`\n-${mural.obs}`:null}${vidrieras.obs.length> 0 ?`\n-${vidrieras.obs}`:null}`] }
  const resultado = total/15
  const enviar = ()=>{
    navigation.replace('Auditoria',{fecha:fecha,uso_marca_carteleria:uso_marca_carteleria.num, visibilidad_marca:visibilidad_marca.num,
      señales_informativas:señales_informativas.num, cartel_horarios:cartel_horarios.num,
      equipamiento_mobiliario:equipamiento_mobiliario.num, muebles:muebles.num, carta:carta.num,
      iluminacion:iluminacion.num,fachada:fachada.num,pintura:pintura.num, techos:techos.num,pisos:pisos.num,
      veredas:veredas.num, mural:mural.num, vidrieras:vidrieras.num,total:total,resultado_media:resultado,
      author_id: route?.params?.sessionId, local_id:route?.params?.localId,horario:hora,local_name:route?.params?.local_name,
      author_name:route?.params?.user_name,localidad:route?.params?.localidad,item:route?.params?.item,provincia:route?.params?.provincia,
      location:route?.params?.location,
      observaciones:[`${uso_marca_carteleria.obs.length > 0 ? `-${uso_marca_carteleria.obs}`:''}
         ${visibilidad_marca.obs.length> 0 ?`\n-${visibilidad_marca.obs}`:''}
         ${señales_informativas.obs.length> 0 ?`\n-${señales_informativas.obs}`:''}
         ${cartel_horarios.obs.length> 0 ?`\n-${cartel_horarios.obs}`:''}
         ${equipamiento_mobiliario.obs.length> 0 ?`\n-${equipamiento_mobiliario.obs}.obs`:''}${muebles.obs.length> 0 ?`\n-${muebles.obs}`:''}
         ${carta.obs.length> 0 ?`\n-${carta.obs}`:''}${iluminacion.obs.length> 0 ?`\n-${iluminacion.obs}`:''}
         ${fachada.obs.length> 0 ?`\n-${fachada.obs}`:''}${pintura.obs.length> 0 ?`\n-${pintura.obs}`:''}
         ${techos.obs.length> 0 ?`\n-${techos.obs}`:''}${pisos.obs.length> 0 ?`\n-${pisos.obs}`:''}${veredas.obs.length> 0 ?`\n-${veredas.obs}`:''}
         ${mural.obs.length> 0 ?`\n-${mural.obs}`:''}${vidrieras.obs.length> 0 ?`\n-${vidrieras.obs}`:''}`] })    
  }
  return (
    <ScrollView>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Icon 
            name="arrow-back"
            color="#FF914D"
            size={ 35 }
            style={{marginLeft:10,marginTop:15,}}
          />
        </TouchableOpacity>
      <View style={{width:'100%', alignItems:'center',marginBottom:10}} >
        <InfoLocal fecha={fecha} resultado={resultado.toFixed(2)} hora={hora} 
          nameLocal={route?.params?.local_name} direccion={route?.params?.location} 
          rubro={route?.params?.item} user_name={route?.params?.user_name}
          localidad={route?.params?.localidad} provincia={route?.params?.provincia}/>
            <Points title='Uso correcto de Marca en cartelería (tipografía y colores corporativos)' 
            seteo={setuso_marca_carteleria} num={uso_marca_carteleria.num} obs={uso_marca_carteleria.obs}/>
            <Points title='Visibilidad y presentación de la Marca'
            seteo={setvisibilidad_marca} num={visibilidad_marca.num} obs={visibilidad_marca.obs}/>           
            <Points title='Señales y cartelería informativa y señalética (estado y uso correcto)'
            seteo={setseñales_informativas} num={señales_informativas.num} obs={señales_informativas.obs}/>
            <Points title='Cartel de Horarios (colocado correctamente y actualizado)'
             seteo={setcartel_horarios} num={cartel_horarios.num} obs={cartel_horarios.obs}/>
            <Points title='Equipamiento y mobiliario (limpieza, estado y conservación)'
            seteo={setequipamiento_mobiliario} num={equipamiento_mobiliario.num} obs={equipamiento_mobiliario.obs}/>
            <Points title='Muebles y elementos (limpieza, estado y conservación)'
            seteo={setmuebles} num={muebles.num} obs={muebles.obs}/>
            <Points title='Carta de productos y precios'
            seteo={setcarta} num={carta.num} obs={carta.obs}/>
            <Points title='Iluminación (limpieza, estado y conservación) se verificará también que otorguen visibilidad e identificación a distancia'
            seteo={setiluminacion} num={iluminacion.num} obs={iluminacion.obs}/>
            <Points title='Fachada (Pintura, limpieza, estado y conservación)'
            seteo={setfachada} num={fachada.num} obs={fachada.obs}/>
            <Points title='Pintura (limpieza, estado y conservación)'
            seteo={setpintura} num={pintura.num} obs={pintura.obs}/>
            <Points title='Techos (pintura, limpieza, estado y conservación)'
            seteo={settechos} num={techos.num} obs={techos.obs}/>
            <Points title='Pisos y zócalos (limpieza, estado y conservación)'
            seteo={setpisos} num={pisos.num} obs={pisos.obs}/>
            <Points title='Veredas y espacios exteriores (limpieza, estado y conservación)'
            seteo={setveredas} num={veredas.num} obs={veredas.obs}/>
            <Points title='Mural (limpieza, estado y conservación)'
            seteo={setmural} num={mural.num} obs={mural.obs}/>
            <Points title='Vidrieras (limpias y despejadas de cualquier tipo de información o comunicación no homologada)'
            seteo={setvidrieras} num={vidrieras.num} obs={vidrieras.obs}/>
         <View style={{marginTop:20}}>
         <TouchableOpacity style={{width: 250,
                                  height: 50,
                                  borderRadius:20,
                                  backgroundColor:'#FF914D',
                                  justifyContent:'center',
                                  alignItems:'center',}}
                                    onPress={()=> enviar()}
                                    > 
                                    <Text style={{color:'white',fontSize:20,fontStyle:'italic'}}>Enviar</Text>                               
          </TouchableOpacity>
          </View>   
      </View>
      {/* <Button  title="Enviar" color="#841584" onPress={postGastro} /> */}
    </ScrollView>
  )
}
