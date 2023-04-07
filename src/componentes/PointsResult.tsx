import React from 'react'
import { Text, TextInput, View,StyleSheet } from 'react-native'
import StarRating from 'react-native-star-rating-widget'



interface Props {
  title: string,
  num: number,
}
export const PointsResult = ({title,num}:Props) => {

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
            <Text style={{color:'black',margin:1,fontSize:12,fontStyle:'italic'}}>
              {num===1?'Malo':num===2?'Regular':num===3?'Bueno':num===4?'Muy bueno':null}
            </Text>


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
  }
})
