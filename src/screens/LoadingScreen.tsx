import React, { useEffect } from 'react'
import {Image,  StyleSheet, Text, View,ActivityIndicator } from 'react-native'


export const LoadingScreen = () => {



  return (
        
    <View style={{justifyContent:'center', alignItems:'center',flex:1}}>
       <Image source={require('./../assests/Logo-Audito.png')} 
                                   resizeMode='contain' resizeMethod='resize' style={{width:100,marginBottom:10,height:100}}/>
      <ActivityIndicator size={50} color={'#FF914D'}/>
    </View>
  
  )
}


const styles = StyleSheet.create({
  img:{
    width:100,
    height:100,
  }
})