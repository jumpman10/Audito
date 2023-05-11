import React, { useState }  from 'react'
import { Button,FlatList, Text, View,TouchableOpacity, StyleSheet, TextInput, Alert,Modal,ToastAndroid } from 'react-native'
import { useGetListbyIdQuery, useGetLocalsbyIdQuery, useSendCommentMutation } from '../services/api/api'
import { PointsResult } from '../componentes/PointsResult';
import { StackScreenProps } from '@react-navigation/stack';
import { InfoLocal } from '../componentes/InfoLocal';
import Icon from 'react-native-vector-icons/Ionicons';
import { LoadingScreen } from './LoadingScreen';
import { useForm } from '../hooks/useForm';
import { PointsLocal } from '../componentes/PointsLocal';
import Switch from '../componentes/Switch';

interface Props extends StackScreenProps <any , any>{};

export const LocalResult = ({navigation,route}:Props) => {

  const dataLocal = {local_name:route?.params?.local_name}
  const {data:resultLocal,isSuccess:sucess, error:error,isLoading} = useGetLocalsbyIdQuery(dataLocal)
  const [comment,{isSuccess:suceso, error:error2,isError,data:resultado}]= useSendCommentMutation()
  const result = route?.params?.item
  const [incidents,setIncidents]=useState<any>([])
  const [name,setName]=useState<any>("")
  const [nameIncident,setNameIncident]=useState<any>("")
  const { response, onChange} = useForm({
    response: '',
  });
  const data = {listId:route?.params?.listId, comment:[response],toChange:incidents}
  const send = () =>{
    comment(data)
  }
  const [modalVisible, setModalVisible] = useState(false);
  const sendIncidents=(item:string)=>{
    setName(item)
   const array:any =incidents.filter((e=>e === name))
    if(array.length===0){
      setIncidents([...incidents , name])
      close()
      ToastAndroid.showWithGravity(
        'Incidencia agregada',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }else{
      Alert.alert('', 'La incidencia ya existe en la lista', [
        {text: 'OK', onPress: () => close()},
      ])
    }
  }
  const remove = (item:string)=>{
    setName(item)
    const array:any =incidents.filter((e=>e === name))
    if(array.length===1){
     const result= incidents.filter((e=>e !== name))
      setIncidents(result)
      close()
      ToastAndroid.showWithGravity(
        'Incidencia quitada',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }else{
      Alert.alert('', 'La incidencia no existe en la lista', [
        {text: 'OK', onPress: () => close()},
      ])
    }
  }
  const open =(item:string)=>{
    setName(item)
    setModalVisible(true)
  }
  const close=()=>{
    setName("")
    setModalVisible(!modalVisible)
  }
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
              <View style={styles.obs}>
                <Text style={styles.subs}>Observaciones:</Text>
                      <Text style={{color:'black',width:'100%',padding:10,fontSize:15}}>{result.observaciones}</Text>
              </View>
              <View style={styles.response}>
              <Text style={styles.subs}>Respuesta:</Text>
              <TextInput
                style={styles.input}
                onChangeText={ (value) => onChange( value, 'response' ) }
                value={response}
                placeholderTextColor='gray'
                multiline
                numberOfLines={4}
                maxLength={40}
                placeholder='Escriba una respuesta'
              />
              </View>
              { incidents.length ?
              <View style={styles.obs}>
                <Text style={styles.subs}>Incidencias corregidas:</Text>
                  <FlatList
                   data={incidents}
                   keyExtractor={ (control) => control}
                   style={{width:'100%'}}
                   showsVerticalScrollIndicator={ false }
                   renderItem={ ({ item }) => ( 
                    <Text style={{width:'100%',paddingHorizontal:10,color:'white',paddingVertical:5,
                    backgroundColor:'green',marginVertical:5,fontSize:18,textAlign:'center',fontStyle:'italic' }}>{item}</Text>
                  )}
                  />
                   
              </View>:null}
              <View style={{alignItems:'center'}}>
              <TouchableOpacity style={styles.button}
                                         onPress={()=> send()}
                                         > 
                      <Text style={{color:'white',fontSize:20,fontStyle:'italic'}}>Enviar</Text>                               
               </TouchableOpacity>
               </View>   
              </View>
            )}
            showsVerticalScrollIndicator={ false }
            renderItem={ ({ item }) => ( 
              <View style={{justifyContent:'center', 
              alignItems:'center',  }}>
              <PointsResult num={item.value} title={item.name} close={close} modalVisible={modalVisible} 
              name={name} remove={remove} sendIncidents={sendIncidents}/>
              <TouchableOpacity onPress={()=>open(item.name)} 
                  style={{justifyContent:'center',height:70,alignItems:'center',position:'absolute',right:22,zIndex:1000}}>
              <Icon 
                    name="build"
                    color="#FF914D"
                    size={ 35 }
                  />
        </TouchableOpacity>
  
              </View>
           )}
            />
      </View>
      </>
      }
    </View>
  )
}



const styles = StyleSheet.create({
  obs:{
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
  },
  response:{
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
    paddingHorizontal:5,
    paddingBottom:15
  },
  button:{
    width: 250,
    height: 50,
    borderRadius:20,
    backgroundColor:'#FF914D',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:'2%',
  },
  input:{
    width: '90%',
    height:270,
    borderWidth:1,
    borderColor:'black',
    color:'black',
    backgroundColor:'#EEEEEE',
    textAlignVertical:'top',
    padding:15,
    marginVertical:5,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button2: {
    width: 200,
    height: 50,
    borderRadius:20,
    backgroundColor:'green',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:'2%',
  },
  buttonOpen: {
    backgroundColor: 'green',
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color:'black'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  subs:{
    color:'black',
    textAlign:'left',
    width:'100%',
    padding:5,
    fontSize:20
  }
})