import React, { useEffect, useState } from 'react'
import { View, Image, TouchableOpacity,Text, StyleSheet, FlatList, TextInput, ScrollView, Modal } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { useGetAllListsQuery } from '../services/api/api';
import Icon from 'react-native-vector-icons/Ionicons';
import { LoadingScreen } from './LoadingScreen';
import { useForm } from '../hooks/useForm';
import { Buttons } from '../componentes/Buttons';
import { TypeAccounts } from '../componentes/TypeAccounts';

interface Props extends StackScreenProps <any , any>{};

export const AddMenu = ({navigation,route}  : Props) => {

  return (
      <ScrollView style={{flex:1}} contentContainerStyle={{alignItems:'center'}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} 
        style={{justifyContent:'center',height:70,alignItems:'center',position:'absolute',left:15,zIndex:1000}}>
          <Icon 
            name="arrow-back"
            color="#FF914D"
            size={ 35 }
          />
        </TouchableOpacity>
        <Text style={{textAlignVertical:'center',height:70,color:'black',textAlign:'center',}}>Selecciona</Text>
        <TouchableOpacity onPress={()=>{navigation.navigate('AddLocal')}} style={styles.container}>
            <Text style={styles.text}>Local</Text>
            <Text style={styles.item}>Añade información del Local</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('AddLocalAccount')}} style={styles.container}>
            <Text style={styles.text}>Usuario</Text>
            <TypeAccounts/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('AddIncidents')}}  style={styles.container}>
            <Text style={styles.text}>Incidencias</Text>
            <Text style={styles.item}>Añade incidencias a un local</Text>
        </TouchableOpacity>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{    
    width:'90%', 
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
      elevation: 5
  },
  buttons:{   
      width:'90%',  
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
      padding:10
  },
  text:{
    color:'white',fontSize:20,fontStyle:'italic',
    textAlign:'center',textDecorationLine:'underline',backgroundColor:'#FF914D',
    borderTopLeftRadius:15,borderTopRightRadius:15,height:45,textAlignVertical:'center'
  },
  input:{
    width:'100%',
    height: 40,
    marginVertical: 15,
    paddingHorizontal: 10,
    paddingVertical:10,
    color:'black',
    fontSize:15
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor:'rgba(255, 255, 255, 0.7)'
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color:'black'
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
  button3:{
    width: 50,
    height: 50,
    borderRadius:25,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top:'2%',
    left:'2%'
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
  button:{
    width: 250,
    height: 50,
    borderRadius:20,
    backgroundColor:'#FF914D',
    justifyContent:'center',
    alignItems:'center',
    marginVertical:'2%',
  },
  item:{
    color:'black',
    fontSize:14,
    padding:10,
    height:60,
    textAlignVertical:'center',
    textDecorationLine:'underline',
    textDecorationStyle:'solid',
  },
  textresp:{
    padding:10,
    fontSize:15,
    color:'black',
    height: 60,
    textAlignVertical:'center'
  }
})