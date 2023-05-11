import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import StarRating from 'react-native-star-rating-widget'



interface Props {
  title: string,
  seteo: any,
  num: number,
  newNum:number,
  toChange:string
}
export const PointsPut = ({title,seteo,num,newNum,toChange}:Props) => {

  return (
    <View style={styles.container}>
        <Text style={{color:'black',margin:5,fontSize:15,fontStyle:'italic'}}>{title}</Text>
        {toChange=== title ? 
              <View style={styles.noti}><Text style={styles.textNoti}>!</Text></View>
              : null}
        <StarRating
            rating={toChange === title && newNum !== 0 ? newNum: num}
            onChange={toChange=== title ?(e) => seteo(e) : (e) =>(e)}
            maxStars={4}
            enableHalfStar={false}
            animationConfig={{scale:0}}
            style={{margin:3}}
            />
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
  },
  noti:{
    backgroundColor:'red',
    width:40,
    height:40,
    borderRadius:20,
    position:'absolute',
    right:'5%',
    top:'-5%',
    justifyContent:'center',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textNoti:{
    textAlign:'center',
    fontSize:20,
    color:'white',
   
  }
})
