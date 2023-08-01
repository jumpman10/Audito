import React, { useRef, useState } from 'react'
import {FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View,PermissionsAndroid} from 'react-native'
import { Points } from '../componentes/Points'
import { useGetIncidentsQuery, usePostGastronomiaMutation} from '../services/api/api'
import { StackScreenProps } from '@react-navigation/stack';
import { InfoLocal } from '../componentes/InfoLocal';
import Icon from 'react-native-vector-icons/Ionicons';
import { useForm } from '../hooks/useForm';
import { LoadingScreen } from './LoadingScreen';
import { launchCamera } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import { Buttons } from '../componentes/Buttons';
import { decode } from 'base-64';

interface Props extends StackScreenProps <any , any>{};

export const Control = ({navigation,route}  : Props) => {
  const incidentsQuery= {name:route?.params?.local_name}
  const { isSuccess, isError,error,data:result}=useGetIncidentsQuery(incidentsQuery)
  const date = new Date()
  const fecha = `${date.getDate()<=9?`0${date.getDate()}`:date.getDate()}/${(date.getMonth()+1)<=9?`0${date.getMonth()+1}`:date.getMonth()+1}/${date.getUTCFullYear()}`
  const hora = `${date.getHours()<=9?`0${date.getHours()}` : date.getHours()}:${date.getMinutes()<=9?`0${date.getMinutes()}` : date.getMinutes()}`
  const { response, onChange} = useForm({
    response: '',
  });
  const [postGastro,{isSuccess:suceso, error:error2}] = usePostGastronomiaMutation()
  const [tempImg,setTempImg] = useState([])
  const [tempImg2,setTempImg2] = useState([])
  const [modal, setModal] = useState(false)
  const [modalAviso, setModalAviso] = useState(false);
  const [modalInput, setModalInput] = useState(false)
  const [imageModal,setImageModal] = useState('')
  const [n1,setN1] = useState(0)
  const [n2,setN2] = useState(0)
  const [n3,setN3] = useState(0)
  const [n4,setN4] = useState(0)
  const [n5,setN5] = useState(0)
  const [n6,setN6] = useState(0)
  const [n7,setN7] = useState(0)
  const [n8,setN8] = useState(0)
  const [n9,setN9] = useState(0)
  const [n10,setN10] = useState(0)
  const [n11,setN11] = useState(0)
  const [n12,setN12] = useState(0)
  const [n13,setN13] = useState(0)
  const [n14,setN14] = useState(0)
  const [n15,setN15] = useState(0)
  const [n16,setN16] = useState(0)
  const [n17,setN17] = useState(0)
  const [n18,setN18] = useState(0)
  const [n19,setN19] = useState(0)
  const [n20,setN20] = useState(0)
  const [n21,setN21] = useState(0)
  const [n22,setN22] = useState(0)
  const [n23,setN23] = useState(0)
  const [n24,setN24] = useState(0)
  const [n25,setN25] = useState(0)
  const [n26,setN26] = useState(0)
  const [n27,setN27] = useState(0)
  const [n28,setN28] = useState(0) 
  const [n29,setN29] = useState(0)
  const [n30,setN30] = useState(0)
  const [n31,setN31] = useState(0)
  const [n32,setN32] = useState(0)

  const seteo = [setN1,setN2,setN3,setN4,setN5,setN6,setN7,setN8,setN9,setN10,setN11,setN12,
                 setN13,setN14,setN15,setN16,setN17,setN18,setN19,setN20,setN21,setN22,setN23,
                 setN24,setN25,setN26,setN27,setN28,setN29,setN30,setN31,setN32]

  const num = [n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16,
               n17,n18,n19,n20,n21,n22,n23,n24,n25,n26,n27,n28,n29,n30,n31,n32]
  
  const obj:any = []
  for (let i = 0; i <result?.incidents?.length; i++) {
      const objeto = {
                  name: result?.incidents[i],
                  num: num[i],
                  seteo: seteo[i],
                  val:result?.values[i]
                };
      obj.push(objeto);
  }
  const total = n1+n2+n3+n4+n5+n6+n7+n8+n9+n10+n11+n12+n13+n14+n15+n16+
                n17+n18+n19+n20+n21+n22+n23+n24+n25+n26+n27+n28+n29+n30+n31+n32 ;


function checkNum(e:number) {
      return e > 0;
  }
  const dataApi:any=[]
  for (let i = 0; i <result?.incidents?.length; i++) {
    dataApi[(i)]  = {
                name: result?.incidents[i],
                value: num[i],
                val:result?.values[i]
              };
}
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
const imageFull = (path:string)=>{
  setModal(true)
  setImageModal(path)
}
  const data = {observaciones:[response],fecha:fecha,total:total,horario:hora,
                media:total/obj.length,author_id:route?.params?.sessionId,local_id:route?.params?.localId,
                author_name:route?.params?.user_name,local_name:route?.params?.local_name, incidents:dataApi,image:tempImg2}
  const resultado = total/obj.length
  const shareImage =async()=>{
    try {
      const shareOptions = {
        title: 'Share via',
        message:
          'La auditoria fue realizada.',
        urls: tempImg2[0],
        social: Share.Social.WHATSAPP,
        whatsAppNumber: '5493816852542',
        filename: 'test' 
      };
      const result = await Share.shareSingle(shareOptions);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const enviar = ()=>{
    navigation.replace('Auditoria',{fecha:fecha,total:total,resultado_media:resultado,
      author_id: route?.params?.sessionId, local_id:route?.params?.localId,horario:hora,local_name:route?.params?.local_name,
      author_name:route?.params?.user_name,localidad:route?.params?.localidad,item:route?.params?.item,provincia:route?.params?.provincia,
      location:route?.params?.location,
      observaciones:response,incidents:dataApi,image:tempImg })  
    postGastro(data)   
    // if(tempImg.length>0){
    //   shareImage()
    // } 
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
  const prevSend = () =>{
    if(tempImg.length>0){
      convertImagesToBase64(tempImg)
    }
    setModalAviso(true)
  }
  const [pages ,setPages] = useState(1)
  const page1 = obj.slice(0, 8)
  const page2 = obj.slice(8, 16)
  const page3 = obj.slice(16, 24)
  const page4 = obj.slice(24, 32)

  return (
    <View
    style={{ flex: 1 }}
  >
        <TouchableOpacity onPress={()=>navigation.goBack()}
        style={{justifyContent:'center'
        ,alignItems:'center',position:'absolute',left:5,zIndex:1000}}>
          <Icon 
            name="arrow-back"
            color="#FF914D"
            size={ 35 }
            style={{marginLeft:10,marginTop:15,}}
          />
        </TouchableOpacity>
        
       { result ? 
       <View style={{width:'100%', alignItems:'center',
                      marginTop:55,justifyContent:'center'}} >
       <FlatList      
            data={pages===1 && page1 || pages===2 && page2  || pages===3 && page3 || pages===4 && page4  }
            keyExtractor={ (control) => control.name}
            style={{width:'100%'}}
            ListHeaderComponent={()=>(
              <View style={{alignItems:'center'}}>
              <InfoLocal fecha={fecha} resultado={resultado.toFixed(2)} hora={hora} 
          nameLocal={route?.params?.local_name} direccion={route?.params?.location} 
          rubro={route?.params?.item} user_name={route?.params?.user_name}
          localidad={route?.params?.localidad} provincia={route?.params?.provincia}/>
          </View> 
            )}      
            ListFooterComponent={()=>(
              <View style={{alignItems:'center'}}>
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
                {(response)&&(
                  <View style={styles.obs}>
                  <Text style={styles.subs}>Observaciones:</Text>
                  <Text style={{color:'black',width:'100%',padding:10,fontSize:15}}>
                    {response}
                  </Text>
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
              {/* <Buttons onPress={prevSend} text='Enviar'/>  */}
              {num.every(checkNum)===true ?
               <Buttons onPress={prevSend} text='Enviar'/> 
               :
               <Text style={styles.subs}>Completa los puntajes para enviar la Auditoria</Text>
              }
               </View>   
            )}
            showsVerticalScrollIndicator={ false }
            renderItem={ ({ item }) => ( 
              <View style={{justifyContent:'center', 
              alignItems:'center',  }}>
              <Points num={item.num} title={item.name} seteo={item.seteo} val={item.val}/>
              </View>
           )}
            /> 
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalInput}
                    style={{flex:1}}
                   >
                    <View style={{alignItems:'center',justifyContent:'center',
                          flex:1,backgroundColor:'rgba(255, 255, 255, 0.7)'}}>
                        
                        <View style={styles.modalView}>
                        <TextInput
                            style={styles.input}
                            onChangeText={ (value) => onChange( value, 'response' ) }
                            value={response}
                            placeholderTextColor='gray'
                            placeholder='Escriba las observaiones'
                            multiline
                          />
                            <TouchableOpacity
                              style={styles.button2}
                              onPress={() =>setModalInput(false) }>
                              <Icon 
                                name="close"
                                color="black"
                                size={ 45 }
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.buttonOpen}
                              onPress={() =>setModalInput(false)}>
                              <Icon 
                                name="checkmark"
                                color="white"
                                size={ 45 }
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.buttonClose}
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
                  <Modal
                    animationType="fade"
                    transparent={false}
                    visible={modal}
                   >
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <View style={styles.centeredView}>
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
                            right:'4%'}}>{fecha}</Text>
                            <TouchableOpacity
                              style={styles.button2}
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
                        visible={modalAviso}>
                        <View style={styles.centeredView2}>
                          <View style={styles.modalView2}>
                            <Text style={styles.modalText2}>¿Deseas Enviar Auditoria?</Text>
                            <TouchableOpacity
                              style={[styles.button3, styles.buttonOpen2]}
                              onPress={() =>enviar()}>
                              <Text style={styles.textStyle}>Enviar auditoria</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={[styles.button3, styles.buttonClose2]}
                              onPress={() =>setModalAviso(false)}>
                              <Text style={styles.textStyle}>Cancelar</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </Modal>
            </View> 
            : 
            <View style={{width:'100%', alignItems:'center',marginBottom:10,marginTop:55,
            justifyContent:'center',height:'100%'}} > 
            <LoadingScreen/>
            </View> 
            }
    </View>
  )}


const styles = StyleSheet.create({
  obs:{
    width:'95%',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:'6%', 
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
  input:{
    width: '100%',
    height:270,
    borderWidth:1,
    borderColor:'#EEEEEE',
    color:'black',
    backgroundColor:'#EEEEEE',
    textAlignVertical:'top',
    padding:15,
    marginVertical:5,
    borderRadius:15
  },
  subs:{
    color:'orange',
    textAlign:'center',
    width:'75%',
    padding:5,
    fontSize:15,
    fontStyle:'italic'
  },
  modalView: {
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
  buttonClose: {
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
    width:'100%',
    height:'100%',
    backgroundColor:'black',
  },
  modalText2: {
    marginBottom: 15,
    textAlign: 'center',
    color:'black'
  },
  centeredView2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor:'rgba(255, 255, 255, 0.7)'
  },
  buttonOpen2: {
    backgroundColor: 'green',
  },
  buttonClose2: {
    backgroundColor: 'red',
  },
  modalView2: {
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
  button3: {
    width: 200,
    height: 50,
    borderRadius:20,
    backgroundColor:'green',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:'2%',
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