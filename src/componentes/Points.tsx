import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import StarRating from 'react-native-star-rating-widget'



interface Props {
  title: string,
  seteo: any,
  num: number,
}
export const Points = ({title,seteo,num}:Props) => {

  return (
    <View style={styles.container}>
        <Text style={{color:'black',margin:5,fontSize:15,fontStyle:'italic'}}>{title}</Text>
        <StarRating
            rating={num}
            onChange={ (e) => seteo(e)}
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
  }
})
