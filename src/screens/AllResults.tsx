import React, { useState }  from 'react'
import { Button,FlatList, Text, View,TouchableOpacity,StyleSheet, Image, Modal } from 'react-native'
import { useGetGastronomiaQuery, useGetListbyIdQuery, useGetLocalsbyIdQuery } from '../services/api/api'
import { PointsResult } from '../componentes/PointsResult';
import { StackScreenProps } from '@react-navigation/stack';
import { InfoLocal } from '../componentes/InfoLocal';
import Icon from 'react-native-vector-icons/Ionicons';
import { LoadingScreen } from './LoadingScreen';
import { PointsLocal } from '../componentes/PointsLocal';
import { ResultadoMedia } from '../componentes/ResultadoMedia';

interface Props extends StackScreenProps <any , any>{};

export const AllResults = ({navigation,route}:Props) => {

  const dataLocal = {local_name:route?.params?.local_name}
  const {data:resultLocal,isSuccess:sucess, error:error,isLoading} = useGetLocalsbyIdQuery(dataLocal)
  const getdata = {listId:route?.params?.listId, sessionId:route?.params?.author_id,local_name:route?.params?.local_name}
  const {data:result,isSuccess,isLoading:loadingResult} = useGetGastronomiaQuery(getdata)
  const [pages ,setPages] = useState(1)
  const page1 = result?.incidents?.slice(0, 8)
  const page2 = result?.incidents?.slice(8, 16)
  const page3 = result?.incidents?.slice(16, 24)
  const page4 = result?.incidents?.slice(24, 32)
  const [modal, setModal] = useState(false)
  const [imageModal,setImageModal] = useState('')
  const imageFull = (path:string)=>{
    setModal(true)
    setImageModal(path)
  }
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
      <View style={{width:'100%', alignItems:'center',marginBottom:10,marginTop:55}} >        
          <FlatList        
            data={pages===1 && page1 || pages===2 && page2  || pages===3 && page3 || pages===4 && page4}
            keyExtractor={ (control) => control.name}
            style={{width:'100%'}}
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
                { (result?.observaciones[0]?.length>0) && 
                (<View style={styles.obs}>
                <Text style={styles.subs}>Observaciones:</Text>
                      <Text style={{color:'black',width:'100%',padding:10,fontSize:15}}>{result?.observaciones}</Text>
                </View>)
                }
                {(result?.image?.length>0)&&
                  (<View style={styles.obs}>
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
              {(result?.change === "inprocess" &&result?.comment[0]?.length>0) &&
                (<View style={styles.obs}>
                <Text style={styles.subs}>Respuesta:</Text>
                      <Text style={{color:'black',width:'100%',padding:10,fontSize:15}}>{result?.comment}</Text>
                </View>)
              }
              </View>
            )}
            showsVerticalScrollIndicator={ false }
            renderItem={ ({ item }) => ( 
              <View style={{justifyContent:'center', 
              alignItems:'center',  }}>
              <PointsLocal num={item.value} title={item.name} val={item.val}/>
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
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subs:{
    color:'orange',
    textAlign:'center',
    width:'75%',
    padding:5,
    fontSize:15,
    fontStyle:'italic'
  },
  imageModal:{
    width:'100%',
    height:'100%',
    backgroundColor:'black',
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
