import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import StarRating from 'react-native-star-rating-widget'



interface Props {
  title: string,
  seteo: any,
  num: number,
  obs: string
}
export const Points = ({title,seteo,num,obs}:Props) => {

  return (
    <View style={styles.container}>
        <Text style={{color:'black',margin:5,fontSize:15,fontStyle:'italic'}}>{title}</Text>
        <StarRating
            rating={num}
            onChange={ (e) => seteo({num:e,obs:obs})}
            maxStars={4}
            enableHalfStar={false}
            animationConfig={{scale:0}}
            style={{margin:3}}
            />
            {num !==0 ? 
            <>
            <Text style={{color:num===1||num===2?'#FF914D':'green',margin:1,fontSize:12,fontStyle:'italic'}}>
              {num===1?'Malo':num===2?'Regular':num===3?'Bueno':num===4?'Muy bueno':null}
            </Text>
            </>
            : 
            null
            }
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
