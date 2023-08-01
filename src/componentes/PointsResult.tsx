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
  name:string,
  val:number
}
export const PointsResult = ({title,num,modalVisible,close,remove,sendIncidents,name,val}:Props) => {

  return (
    <View style={styles.container}>
        <Text style={{color:'black',margin:5,fontSize:15,fontStyle:'italic'}}>{title}</Text>
        <StarRating
            rating={num}
            onChange={(num)=>{num}}
            maxStars={val}
            enableHalfStar={false}
            animationConfig={{scale:1.1,duration:300,delay:300}}
            style={{margin:3}}
            starStyle={{marginHorizontal:1 }}
            enableSwiping= {false}
            starSize={34}
            />    
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:'2%', 
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
