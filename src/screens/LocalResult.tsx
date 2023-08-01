import React, { useState }  from 'react'
import { Button,FlatList, Text, View,TouchableOpacity, StyleSheet, TextInput, Alert,Modal,ToastAndroid, Image } from 'react-native'
import { useGetGastronomiaQuery, useGetListbyIdQuery, useGetLocalsbyIdQuery, useSendCommentMutation } from '../services/api/api'
import { PointsResult } from '../componentes/PointsResult';
import { StackScreenProps } from '@react-navigation/stack';
import { InfoLocal } from '../componentes/InfoLocal';
import Icon from 'react-native-vector-icons/Ionicons';
import { LoadingScreen } from './LoadingScreen';
import { useForm } from '../hooks/useForm';
import { PointsLocal } from '../componentes/PointsLocal';
import Switch from '../componentes/Switch';
import { Buttons } from '../componentes/Buttons';
import { ResultadoMedia } from '../componentes/ResultadoMedia';
import { decode, encode } from 'base-64';
import RNFetchBlob from 'rn-fetch-blob';
import { Buffer } from 'buffer'
import { launchCamera } from 'react-native-image-picker';

interface Props extends StackScreenProps <any , any>{};

export const LocalResult = ({navigation,route}:Props) => {

  const dataLocal = {local_name:route?.params?.local_name}
  const {data:resultLocal,isSuccess:sucess, error:errorDataLocal,isLoading} = useGetLocalsbyIdQuery(dataLocal)
  const getdata = {listId:route?.params?.listId, sessionId:route?.params?.author_id,local_name:route?.params?.local_name}
  const {data:result,isSuccess, error,isLoading:loadingResult} = useGetGastronomiaQuery(getdata)
  const [comment,{isSuccess:suceso, error:error2,isError,data:resultado,isLoading:loadingPut}]= useSendCommentMutation()
  const [incidents,setIncidents]=useState<any>([])
  const [name,setName]=useState<any>("")
  const [tempImg,setTempImg] = useState([])
  const [tempImg2,setTempImg2] = useState([])
  const takePhotos = () =>{
    launchCamera({
      mediaType:'photo',
      quality:0.5,
      cameraType:'back',
      maxWidth: 800, 
      maxHeight: 800, 
      },(resp)=>{
        if(resp.didCancel) return
        if(!resp.assets?.map(e=>e.uri)) return
        setTempImg([...tempImg , resp.assets?.map(e=>e.uri)?.join('')])
        // if(tempImg)setTempImg2(resp.assets?.map(e=>e.uri)?.join(''))
      })
  }
  const convertImagesToBase64 = async(imagePaths) => {
    try {
      const base64Images = await Promise.all(
        imagePaths.map(async (path) => {
          const base64Data = await RNFetchBlob.fs.readFile(path, 'base64');
          return `data:image/jpeg;base64,${base64Data}`;
        })
      );
      setTempImg2(base64Images);
    } catch (error) {
      console.log('Error al convertir las imágenes a base64:', error);
    }
  };
  const { response, onChange} = useForm({
    response: '',
  });
  const data = {listId:route?.params?.listId, comment:[response],toChange:incidents,change:'inprocess',image:tempImg2}
  const send = () =>{
    comment(data)
    if(!loadingPut){
    navigation.replace('Home')
    ToastAndroid.showWithGravity(
      'Respuesta enviada',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }
  }
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAviso, setModalAviso] = useState(false);
  const [modalInput, setModalInput] = useState(false);
  const [modal, setModal] = useState(false)
  const [imageModal,setImageModal] = useState('')
  const imageFull = (path:string)=>{
    setModal(true)
    setImageModal(path)
  }
  const sendIncidents=(item:string)=>{
    setName(item)
   const array:any =incidents.filter((e=>e === name))
    if(array.length===0){
      close()
      setIncidents([...incidents , name])
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
  const upModalAviso = ()=>{
    convertImagesToBase64(tempImg)
    setModalAviso(true)
  }
  const [pages ,setPages] = useState(1)
  const page1 = result?.incidents.slice(0, 8)
  const page2 = result?.incidents.slice(8, 16)
  const page3 = result?.incidents.slice(16, 24)
  const page4 = result?.incidents.slice(24, 32)
  return (
<View style={{flex:1}}>       
        {isLoading && loadingResult ? <LoadingScreen/>:
        <>
        <TouchableOpacity onPress={()=>navigation.goBack()} 
            style={{justifyContent:'center',height:70,alignItems:'center',position:'absolute',left:15,zIndex:1000}}>
            <Icon 
              name="arrow-back"
              color="#FF914D"
                size={ 35 }
             />
          </TouchableOpacity>
      <View style={{width:'100%', alignItems:'center',marginTop:55}} >        
          <FlatList        
            data={pages===1 && page1 || pages===2 && page2  || pages===3 && page3 || pages===4 && page4}
            keyExtractor={ (control) => control.name}
            style={{width:'100%'}}
            initialNumToRender={16}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={()=>(
              <View style={{ alignItems:'center'}}>
              <InfoLocal fecha={result?.fecha} resultado={Number(result?.media).toFixed(2)} hora={result?.horario} 
              nameLocal={resultLocal?.name} direccion={resultLocal?.location} rubro={resultLocal?.item} user_name={result?.author_name}
              localidad={resultLocal?.localidad} provincia={resultLocal?.provincia}/>
              <ResultadoMedia num={result?.media} title={'Resultado de visita'} val={5}/>
              <Text style={{color:'black',fontSize:20,marginVertical:10,
                fontStyle:'italic',textDecorationLine:'underline',}}>Incidencias</Text>
              </View>
            )}
            ListFooterComponent={()=>(
              
              <View style={{ alignItems:'center'}}>
                 <View style={{flexDirection:'row', width:'100%',
                alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity 
              style={{width: 50,height: 50,borderRadius:25,justifyContent:'center',
                    backgroundColor:'white',alignItems:'center',marginHorizontal:25}} onPress={()=>pages > 1 && setPages(pages-1)}> 
                    <Icon 
                    name="chevron-back"
                    color="grey"
                    size={ 30 }
                    />                               
               </TouchableOpacity>
               <Text style={{color:'black'}}>{pages}/4</Text>
               <TouchableOpacity 
              style={{width: 50,height: 50,borderRadius:25,justifyContent:'center',
              backgroundColor:'white', alignItems:'center',marginHorizontal:25}} onPress={()=>pages<4 && setPages(pages+1)}> 
                    <Icon 
                    name="chevron-forward"
                    color="grey"
                    size={ 30 }
                    />                               
               </TouchableOpacity>
               </View>
              {(result?.observaciones[0]?.length>0)&&
                (<View style={styles.obs}>
                <Text style={styles.subs}>Observaciones:</Text>
                      <Text style={{color:'black',width:'100%',padding:10,fontSize:15}}>{result?.observaciones}</Text>
                </View>)
              }
              {(result?.image?.length>0)&&
             ( <View style={styles.obs}>
                <Text style={styles.subs}>Imágenes:</Text>
                    {    result?.image?.map((e,index)=>(
                       <TouchableOpacity onPress={()=>imageFull(e)} key={index}>
                          <Image 
                          key={index}
                          source={{uri:e}}
                          resizeMode='cover'
                          style= {{width:250,height:350, marginVertical:'3%',borderWidth:1,borderColor:'black'}}
                          />
                       </TouchableOpacity>
                    ))
                    } 
              </View>)
              }
        
              { result?.change==='finalized' ? null : 
              <>
              <View style={{width:'75%', flexDirection:'row',
                            justifyContent:'space-between',marginVertical:20}}>
                               <TouchableOpacity 
                               style={styles.buttonsadds} onPress={()=>setModalInput(true)}> 
                                     <Icon 
                                     name="pencil"
                                     color="white"
                                     size={ 45 }
                                     />                               
                               </TouchableOpacity>  
                               <TouchableOpacity 
                               style={styles.buttonsadds} onPress={()=>takePhotos()}> 
                                     <Icon 
                                     name="camera"
                                     color="white"
                                     size={ 45 }
                                     />                               
                               </TouchableOpacity>
               </View>                 
              
              {
                (response)&&(
                  <View style={styles.response}>
                    <Text style={styles.subs}>Respuesta:</Text>
                  <Text style={{color:'black',width:'100%',padding:10,fontSize:15}}>{response}</Text>
                  </View>
                )
              }
              {
                (tempImg.length>0)&&
                (
                  <View style={styles.obs}>
                  <Text style={styles.subs}>Imagenes:</Text>
                    { 
                    tempImg.map((e, index)=>(
                      <TouchableOpacity onPress={()=>imageFull(e)} key={index}>
                        <Image 
                        source={{uri:e}}
                        resizeMode='cover'
                        style= {{width:250,height:350, marginVertical:'3%',borderWidth:1,borderColor:'black'}}
                        />
                      </TouchableOpacity>
                    ))
                    }
                    </View> 
                )
              }
              </>
              }
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
              {result?.change === "finalized" ? null :  
              <View style={{alignItems:'center'}}>
               <Buttons onPress={upModalAviso} text='Enviar repuesta'/>
               </View> 
                } 
   
              </View>
            )}
            showsVerticalScrollIndicator={ false }
            
            renderItem={ ({ item }) => ( 
              <View style={{width:'100%', alignItems:'center'}}>
              <View style={styles.cards}>
              <PointsResult num={item.value} title={item.name} close={close} modalVisible={modalVisible} 
              name={name} remove={remove} sendIncidents={sendIncidents} val={item.val}/>
        {  result?.change === 'finalized' || item.value ===item.val ? null :            
            <TouchableOpacity onPress={()=>open(item.name)} 
                  style={{justifyContent:'center',height:50,alignItems:'center'}}>
              <Icon 
                    name="build"
                    color="#FF914D"
                    size={ 35 }
                  />
            </TouchableOpacity>}
              </View>
              </View>
           )}
            />
           <Modal
                    animationType="fade"
                    transparent={false}
                    visible={modal}
                   >
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <View style={styles. imageModal}>
                            <Image
                            source={{uri:imageModal}}
                            resizeMode='contain'
                            resizeMethod='resize'
                            style= {{flex:1}}
                            />
                            <View style= {{width:50,position:'absolute', bottom:'15%',
                            right:'4%'}}>
                            <Image
                            source={require('../assests/Logo-Audito.png')}
                            resizeMode='contain'
                            resizeMethod='resize'
                            style= {{width:50,height:50}}
                            />
                            </View>
                            <Text style={{color:'white',position:'absolute',bottom:'10%',
                            right:'4%'}}>{result?.fecha}</Text>
                            <TouchableOpacity
                              style={styles.button3}
                              onPress={() =>setModal(false)}>
                               <Icon 
                                name="close"
                                color="white"
                                size={ 45 }
                                />
                            </TouchableOpacity>
                        </View>
                        </View>
                  </Modal>
                      <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}>
                        <View style={styles.centeredView}>
                          <View style={styles.modalView}>
                            <Text style={styles.modalText}>{name}</Text>
                            <TouchableOpacity
                              style={[styles.button2, styles.buttonOpen]}
                              onPress={() =>sendIncidents(name)}>
                              <Text style={styles.textStyle}>Agregar</Text>
                            </TouchableOpacity>
                            <Text style={{color:'black',textAlign:'left',width:'100%',fontSize:10,fontStyle:'italic'}}>*Agregar incidencia en la lista</Text>
                            <TouchableOpacity
                              style={[styles.button2, styles.buttonClose]}
                              onPress={() =>remove(name)}>
                              <Text style={styles.textStyle}>Quitar</Text>
                            </TouchableOpacity>
                            <Text style={{color:'black',textAlign:'left',width:'100%',fontSize:10,fontStyle:'italic'}}>*Quitar incidencia de la lista</Text>
                            <TouchableOpacity
                              style={styles.button}
                              onPress={() =>close()}>
                              <Text style={styles.textStyle}>Listo</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </Modal>   
            <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalInput}
                    style={{flex:1}}
                   >
                    <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                        <View style={styles.modalViewInput}>
                        <TextInput
                            style={styles.input}
                            onChangeText={ (value) => onChange( value, 'response' ) }
                            value={response}
                            placeholderTextColor='gray'
                            placeholder='Escriba las observaiones'
                            multiline
                          />
                            <TouchableOpacity
                              style={styles.cancel}
                              onPress={() =>setModalInput(false) }>
                              <Text style={styles.textStyle}>X</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.check}
                              onPress={() =>setModalInput(false)}>
                              <Icon 
                                name="checkmark"
                                color="white"
                                size={ 45 }
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.trash}
                              onPress={() =>onChange( '' , 'response' ) }>
                              <Icon 
                                name="trash"
                                color="white"
                                size={ 45 }
                                /> 
                            </TouchableOpacity>
                        </View>
                      </View>
                  </Modal>
      </View>
      </>
      }
                  <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalAviso}>
                        <View style={styles.centeredView}>
                          <View style={styles.modalView}>
                            <Text style={styles.modalText}>Recuerda que solo puedes enviar una sola respuesta en todo el mes. Recomendación: -Realiza todas las correciones y envia la respuesta.</Text>
                            <TouchableOpacity
                              style={[styles.button2, styles.buttonOpen]}
                              onPress={() =>send()}>
                              <Text style={styles.textStyle}>Enviar repuesta</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={[styles.button2, styles.buttonClose]}
                              onPress={() =>setModalAviso(false)}>
                              <Text style={styles.textStyle}>Cancelar</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </Modal> 
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
    padding:5,
    borderColor:'#DDDDDD',
    borderWidth:0.5
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
    paddingBottom:15,
    borderColor:'#DDDDDD',
    borderWidth:0.5
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
    width: '100%',
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
    borderColor:'#DDDDDD',
    borderWidth:0.5
  },
  modalViewInput:{
    width:'85%',
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
    borderColor:'#DDDDDD',
    borderWidth:0.5
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
  button3:{
    width: 50,
    height: 50,
    borderRadius:25,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top:'2%',
    left:'2%'
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
    backgroundColor:'rgba(255, 255, 255, 0.7)'
  },
  imageModal:{
    width:'100%',
    height:'100%',
    backgroundColor:'black',
  },
  subs:{
    color:'orange',
    textAlign:'center',
    width:'75%',
    padding:5,
    fontSize:15,
    fontStyle:'italic'
  },
  check:{
    width: 50,
    height: 50,
    borderRadius:25,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    backgroundColor: 'green',
    bottom:'3%',
    right:'10%'
  },
  trash:{
    width: 50,
    height: 50,
    borderRadius:25,
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    bottom:'3%',
    left:'10%'
  },
  cancel:{
    width: 50,
    height: 50,
    borderRadius:25,
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top:'1%',
    left:'1%'
  },
  cards:{
    justifyContent:'center', 
    alignItems:'center',marginVertical:7,
    width:'85%',
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
    padding:5,
    borderColor:'#DDDDDD',
    borderWidth:0.5
  },
  buttonsadds:{
    width: 70,
    height: 70,
    borderRadius:35,
    backgroundColor:'#FF914D',
    justifyContent:'center',                 
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
})