import React from 'react'
import { StyleSheet, Text, TouchableOpacity} from 'react-native'


interface Props {
    onPress:any,
    text:string
  }
export const Buttons = ({onPress,text}:Props) => {
    return (
        <TouchableOpacity 
              style={styles.container}
              onPress={()=> onPress()}
              > 
              <Text style={styles.text}>{text}</Text>                               
        </TouchableOpacity>
)
}

const styles = StyleSheet.create({
container:{
    width: 250,
    height: 50,
    borderRadius:20,
    backgroundColor:'#FF914D',
    justifyContent:'center',
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom:15,
},
text:{
    color:'white',
    fontSize:20,
    fontStyle:'italic'
}

})