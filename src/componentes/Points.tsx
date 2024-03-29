import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import StarRating from 'react-native-star-rating-widget'



interface Props {
  title: string,
  seteo: any,
  num: number,
  val:number
}
export const Points = ({title,seteo,num,val}:Props) => {

  return (
    <View style={styles.container}>
        <Text style={{color:'black',margin:5,fontSize:15,fontStyle:'italic'}}>{title}</Text>
        <StarRating
            rating={num}
            onChange={ (e) => seteo(e)}
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
    width:'85%',
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
  }
})
