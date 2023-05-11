import React from 'react'
import { Text, TextInput, View,StyleSheet,Modal,Alert,TouchableOpacity } from 'react-native'
import StarRating from 'react-native-star-rating-widget'



interface Props {
  title: string,
  num: number,
  modalVisible:boolean,
  sendIncidents:any,
  remove:any,
  close:any,
  name:string
}
export const PointsResult = ({title,num,modalVisible,close,remove,sendIncidents,name}:Props) => {

  return (
    <View style={styles.container}>
        <Text style={{color:'black',margin:5,fontSize:15,fontStyle:'italic'}}>{title}</Text>
        <StarRating
            rating={num}
            onChange={(num)=>{num}}
            maxStars={4}
            enableHalfStar={false}
            animationConfig={{scale:0}}
            style={{margin:3}}
            />   
                      <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}>
                        <View style={styles.centeredView}>
                          <View style={styles.modalView}>
                            <Text style={styles.modalText}>{name}</Text>
                            <TouchableOpacity
                              style={[styles.button2, styles.buttonOpen]}
                              onPress={() =>sendIncidents(title)}>
                              <Text style={styles.textStyle}>Agregar</Text>
                            </TouchableOpacity>
                            <Text style={{color:'black',textAlign:'left',width:'100%',fontSize:10,fontStyle:'italic'}}>*Agregar incidencia en la lista</Text>
                            <TouchableOpacity
                              style={[styles.button2, styles.buttonClose]}
                              onPress={() =>remove(title)}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
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
  }, modalView: {
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
  button:{
    width: 250,
    height: 50,
    borderRadius:20,
    backgroundColor:'#FF914D',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:'2%',
  },
})
