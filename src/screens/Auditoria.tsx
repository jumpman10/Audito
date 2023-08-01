import React, { useState }  from 'react'
import { Text, View,TouchableOpacity,FlatList,Modal, StyleSheet  } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { InfoLocal } from '../componentes/InfoLocal';
import Icon from 'react-native-vector-icons/Ionicons';
import { PointsLocal } from '../componentes/PointsLocal';
import { ResultadoMedia } from '../componentes/ResultadoMedia';
import { Image } from 'react-native';

interface Props extends StackScreenProps <any , any>{};

export const Auditoria = ({navigation,route}:Props) => {

  const result = route?.params?.incidents
  const [pages ,setPages] = useState(1)
  const page1 = result.slice(0, 8)
  const page2 = result.slice(8, 16)
  const page3 = result.slice(16, 24)
  const page4 = result.slice(24, 32)
  const [modal, setModal] = useState(false)
  const [imageModal,setImageModal] = useState('')
  const imageFull = (path:string)=>{
    setModal(true)
    setImageModal(path)
  }
  return (
    <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Icon 
            name="arrow-back"
            color="#FF914D"
            size={ 35 }
            style={{marginLeft:10,marginTop:15}}
          />
        </TouchableOpacity>
        <FlatList        
            data={pages===1 && page1 || pages===2 && page2  || pages===3 && page3 || pages===4 && page4}
            keyExtractor={ (control) => control.name}
            initialNumToRender={16}
            onEndReachedThreshold={0.5}
            style={{width:'100%'}}
            showsVerticalScrollIndicator={ false }
            ListHeaderComponent={()=>(
              <View style={{marginTop:10,alignItems:'center'}}>
              <InfoLocal fecha={route?.params?.fecha} resultado={route?.params?.resultado_media.toFixed(2)} hora={route?.params?.horario} 
              nameLocal={route?.params?.local_name} direccion={route?.params?.location} rubro={route?.params?.item} user_name={route?.params?.author_name}
              localidad={route?.params?.localidad} provincia={route?.params?.provincia}/>
              <ResultadoMedia num={route?.params?.resultado_media} title={'Resultado de visita'} val={5}/>
              <Text style={{color:'black',fontSize:20,marginVertical:10,
                fontStyle:'italic',textDecorationLine:'underline',}}>Incidencias</Text>
              </View>
              )}
              ListFooterComponent={()=>(
                <View style={{marginTop:20,alignItems:'center'}}>
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
               {(route?.params?.observaciones[0]?.length > 0) &&
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
                            <Text style={{    
                                 color:'orange',
                                 textAlign:'center',
                                 width:'75%',
                                 padding:5,
                                 fontSize:15,
                                 fontStyle:'italic'}}>Observaciones:</Text>
                              <Text style={{color:'black',width:'100%',padding:10,fontSize:15}}>{route?.params?.observaciones}</Text>
              </View>
              }
              { (route?.params?.image?.length > 0) &&
              (<View style={{
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
                            <Text style={{    
                                  color:'orange',
                                  textAlign:'center',
                                  width:'75%',
                                  padding:5,
                                  fontSize:15,
                                  fontStyle:'italic'}}>Imagenes:</Text>
                              { 
                    route?.params?.image?.map((e,index)=>(
                      <TouchableOpacity onPress={()=>imageFull(e)} key={index}>
                        <Image
                        source={{uri:e}}
                        resizeMode='cover'
                        style= {{width:250,height:350, marginVertical:'3%',borderWidth:1,borderColor:'black'}}
                        />
                       </TouchableOpacity> 
                    ))
                    }
              </View>)
              }
              </View>
              )}
            renderItem={ ({ item }) => ( 
              <View style={{justifyContent:'center', 
              alignItems:'center',  }}>
              <PointsLocal num={item.value} title={item.name} val={item.val} />
              </View>
           )}
            />
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
                            </View>
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
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    width:'100%',
    height:'100%',
    backgroundColor:'black',
  },  
  button2: {
    width: 50,
    height: 50,
    borderRadius:25,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top:'0%',
    left:'0%'
  },
})