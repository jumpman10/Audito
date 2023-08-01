import React, { useEffect, useState }  from 'react'
import { Button, Text,ScrollView, View,TouchableOpacity, FlatList,Modal,StyleSheet,ToastAndroid, Image } from 'react-native'
import { useGetGastronomiaQuery, useGetLocalsbyIdQuery, usePutIncidentsMutation } from '../services/api/api'
import { PointsResult } from '../componentes/PointsResult';
import { StackScreenProps } from '@react-navigation/stack';
import { InfoLocal } from '../componentes/InfoLocal';
import Icon from 'react-native-vector-icons/Ionicons';
import { LoadingScreen } from './LoadingScreen';
import { PointsPut } from '../componentes/PointsPut';
import { Buttons } from '../componentes/Buttons';
import { ResultadoMedia } from '../componentes/ResultadoMedia';



interface Props extends StackScreenProps <any , any>{};

export const Result = ({navigation,route}:Props) => {
  const d = new Date()
  const [modalAviso, setModalAviso] = useState(false);
  const data = {listId:route?.params?.listId, sessionId:route?.params?.sessionId,local_name:route?.params?.local_name}
  const {data:result,isSuccess:suceso, error:error2,isLoading} = useGetGastronomiaQuery(data)
  const dataLocal = {local_name:route?.params?.local_name}
  const {data:resultLocal,isSuccess:sucess, error:error,isLoading:isLoadingLocal} = useGetLocalsbyIdQuery(dataLocal)
  const [sendIncidents,{data:resultado}]= usePutIncidentsMutation()
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
  const seteo = [setN1,setN2,setN3,setN4,setN5,setN6,setN7,setN8,setN9,setN10,setN11,setN12,
                 setN13,setN14,setN15,setN16,setN17,setN18,setN19,setN20,setN21,setN22,setN23,
                 setN24,setN25,setN26,setN27,setN28,setN29,setN30]

  const num = [n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12,n13,n14,n15,n16,
               n17,n18,n19,n20,n21,n22,n23,n24,n25,n26,n27,n28,n29,n30]
  const obj:any = []
  if(isLoading===false){
               for (let i = 0; i <result?.incidents?.length; i++) {
                   const objeto = {
                               name: result?.incidents?.map(e=>e.name)[i],
                               value: result?.incidents?.map(e=>e.value)[i],
                               val: result?.incidents?.map(e=>e.val)[i],
                               seteo: seteo[i],
                               newNum:num[i],
                               toChange: result?.toChange?.includes(result?.incidents?.map(e=>e.name)[i]) ? result?.incidents?.map(e=>e.name)[i] : ""
                             };
                   obj.push(objeto);
               }}
  const dataApi:any=[]
               for (let i = 0; i <result?.incidents?.length; i++) {
                 dataApi[(i)]  = {
                             name: result?.incidents?.map(e=>e.name)[i],
                             value: result?.toChange?.includes(result?.incidents?.map(e=>e.name)[i])? num[i] : result?.incidents?.map(e=>e.value)[i] ,
                             val:result?.incidents?.map(e=>e.val)[i]
                           };
             }   
             
  const total = dataApi.reduce((acumulador:number, objeto:number) => acumulador + objeto.value, 0);          
  const closeAudit = {media:total/obj.length,sessionId:route?.params?.sessionId,listId:route?.params?.listId,
  author_name:route?.params?.user_name,local_name:route?.params?.local_name, incidents:dataApi,change:'finalized'}                  

  const send = () =>{
    sendIncidents(closeAudit)
    setModalAviso(false)
    setModalAviso(false)
    navigation.replace('Home')
    ToastAndroid.showWithGravity(
      'Auditoria cerrada',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  } 
  const upModalAviso = ()=>{
    setModalAviso(true)
  }
  const [modal, setModal] = useState(false)
  const [imageModal,setImageModal] = useState('')
  const imageFull = (path:string)=>{
    setModal(true)
    setImageModal(path)
  }
  const [pages ,setPages] = useState(1)
  const page1 = obj.slice(0, 8)
  const page2 = obj.slice(8, 16)
  const page3 = obj.slice(16, 24)
  const page4 = obj.slice(24, 32)
  return (
    <View style={{flex:1}}>       
        {isLoading && isLoadingLocal? <LoadingScreen/>:
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
          {result ?   
          <>     
          <FlatList        
            data={pages===1 && page1 || pages===2 && page2  || pages===3 && page3 || pages===4 && page4 }
            keyExtractor={ (control) => control.name}
            initialNumToRender={16}
            onEndReachedThreshold={0.5}
            style={{width:'100%'}}
            ListHeaderComponent={()=>(
              <View style={{ alignItems:'center'}}>
              <InfoLocal fecha={result.fecha} resultado={Number(result.media).toFixed(2)} hora={result.horario} 
              nameLocal={resultLocal?.name} direccion={resultLocal?.location} rubro={resultLocal?.item} user_name={result.author_name}
              localidad={resultLocal?.localidad} provincia={resultLocal?.provincia}/>
              <ResultadoMedia num={result.media} title={'Resultado de visita'} val={5}/>
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
                      <Text style={{color:'black',width:'100%',padding:10,fontSize:15}}>{result.observaciones}</Text>
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
              {(result?.change === "inprocess" && result?.comment[0]?.length>0)&&
              (<View style={styles.obs}>
                <Text style={styles.subs}>Respuesta:</Text>
                      <Text style={{color:'black',width:'100%',padding:10,fontSize:15}}>{result.comment}</Text>
              </View>)
            }
                { result.change === "inprocess" ? 
                <View style={{marginTop:20,alignItems:'center'}}>
                 <Buttons onPress={upModalAviso} text='Cerrar auditoria'/>
                 <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalAviso}>
                        <View style={styles.centeredView}>
                          <View style={styles.modalView}>
                            <Text style={styles.modalText}>¿Deseas cerrar Auditoria?</Text>
                            <TouchableOpacity
                              style={[styles.button2, styles.buttonOpen]}
                              onPress={() =>send()}>
                              <Text style={styles.textStyle}>Cerrar auditoria</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={[styles.button2, styles.buttonClose]}
                              onPress={() =>setModalAviso(false)}>
                              <Text style={styles.textStyle}>Cancelar</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </Modal> 
                 </View> : null}      
              </View>
            )}
            showsVerticalScrollIndicator={ false }
            renderItem={ ({ item }) => ( 
              <View style={{justifyContent:'center', 
              alignItems:'center',  }}>
              <PointsPut val={item.val} num={item.value} title={item.name} seteo={item.seteo} newNum={item.newNum} toChange={item.toChange}/>
              </View>
           )}
            /> 
            <Modal
                    animationType="fade"
                    transparent={false}
                    visible={modal}
                   >
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <View style={styles.imageModal}>
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
                  </>
             :null}
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
})