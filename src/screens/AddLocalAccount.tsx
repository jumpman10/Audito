import React, { useEffect, useState } from 'react'
import { View, Image, TouchableOpacity,Text, StyleSheet, FlatList, TextInput, ScrollView, Modal, ToastAndroid } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { useGetAllListsQuery, usePostAccountMutation } from '../services/api/api';
import Icon from 'react-native-vector-icons/Ionicons';
import { LoadingScreen } from './LoadingScreen';
import { useForm } from '../hooks/useForm';
import { Buttons } from '../componentes/Buttons';

interface Props extends StackScreenProps <any , any>{};

export const AddLocalAccount = ({navigation,route}  : Props) => {
  

const [postAccount,{isSuccess:suceso, error:error2,isLoading}] = usePostAccountMutation()
const { email, onChange, password,confirmPassword,name,lastName} = useForm({
        email: '',
        password: '',
        confirmPassword:'',
        name: route?.params?.name.length > 0 ? route?.params?.name : '',
        lastName:''
});
const [error,setError] = useState(false)
const [modalVisible, setModalVisible] = useState(false);
const [hidePassword,setHidePassword] = useState(true)
const [hidePassword2,setHidePassword2] = useState(true)
const hide = () =>{
  if(hidePassword===true){
    setHidePassword(false)
  }else{
    setHidePassword(true)
  }
}
const hide2 = () =>{
  if(hidePassword2===true){
    setHidePassword2(false)
  }else{
    setHidePassword2(true)
  }
}
const data = {name:name, email:email, lastName:lastName, password:password,type:route?.params?.type}
const send = () =>{
  if(password === confirmPassword){
    postAccount(data)
  }else{
    setError(true)
  }
   
}
if(suceso && !isLoading){
  navigation.replace('Home')
  ToastAndroid.showWithGravity(
    'Cuenta agregada correctamente',
    ToastAndroid.SHORT,
    ToastAndroid.CENTER,
  );
}
const verify = [name,email,password,route?.params?.type,lastName,confirmPassword]
const verifyLocal = [name,email,password,route?.params?.type,confirmPassword]
function check(e:any) {
    return e.length > 0 ;
}
  return (
      <ScrollView contentContainerStyle={{flex:1}}>
        { 
        isLoading ? 
        <View style={{flex:1}} >
        <TouchableOpacity onPress={()=>navigation.goBack()} 
        style={{justifyContent:'center',height:70,alignItems:'center',position:'absolute',left:15,zIndex:1000}}>
          <Icon 
            name="arrow-back"
            color="#FF914D"
            size={ 35 }
          />
        </TouchableOpacity>
        <LoadingScreen/>
        </View>
        
        :
       
        <ScrollView style={{flex:1}} contentContainerStyle={{alignItems:'center'}}>
         <TouchableOpacity onPress={()=>navigation.goBack()} 
        style={{justifyContent:'center',height:70,alignItems:'center',position:'absolute',left:15,zIndex:1000}}>
          <Icon 
            name="arrow-back"
            color="#FF914D"
            size={ 35 }
          />
        </TouchableOpacity>
        <Text style={{textAlignVertical:'center',height:70,color:'black',textAlign:'center',}}>
          {
          route?.params?.type==='admin'&& 'Cuenta de Administrador'||
          route?.params?.type==='auditor'&&'Cuenta de Auditor'||
          route?.params?.type==='local'&&'Cuenta de Local'
          }</Text>
        <View style={styles.container}>
            <Text style={styles.text}>Email</Text>
            <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={ (value) => onChange( value, 'email' ) }
            value={email}
            placeholderTextColor='gray'
            >
            </TextInput>
        </View>
        { route?.params?.type !== 'local' &&
        <View style={styles.container}>
            <Text style={styles.text}>Nombre</Text>
            <TextInput
            style={styles.input}
            placeholder="Nombre"
            onChangeText={ (value) => onChange( value, 'name' ) }
            value={name}
            placeholderTextColor='gray'
            >
            </TextInput>
        </View>
        }
        { route?.params?.type !== 'local' &&
        <View style={styles.container}>
            <Text style={styles.text}>Apellido</Text>
            <TextInput
            style={styles.input}
            placeholder="Apellido"
            onChangeText={ (value) => onChange( value, 'lastName' ) }
            value={lastName}
            placeholderTextColor='gray'
            >
            </TextInput>
        </View>
        }
        <View style={styles.container}>
            <Text style={styles.text}>Contraseña</Text>
            <View style={{flexDirection:'row', width:'100%', alignItems:'center'}}>
              <TextInput
              style={error ? styles.inputpass : styles.input}
              placeholder="Contraseña"
              onChangeText={ (value) => onChange( value, 'password' ) }
              value={password}
              secureTextEntry={hidePassword}
              autoComplete="password"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor='gray'
              returnKeyType="send"
              >
              </TextInput>
              <TouchableOpacity onPress={()=>hide()} 
                style={{position:'absolute', right:'2%',zIndex:1000}}>
                  {
                    hidePassword===true ?
                <Icon 
                name="eye"
                color="#FF914D"
                size={ 35 }
                />
                :
                <Icon 
                name="eye-off"
                color="#FF914D"
                size={ 35 }
                />
                  }
              </TouchableOpacity>
            </View>
            {
              (error)&&
              (<Text style={styles.textError}>Las contraseñas no coinciden</Text>)
            }
        </View>
        <View style={styles.container}>
            <Text style={styles.text}>Repetir contraseña</Text>
            <View style={{flexDirection:'row', width:'100%', alignItems:'center'}}>
              <TextInput
              style={error ? styles.inputpass : styles.input}
              placeholder="Contraseña"
              onChangeText={ (value) => onChange( value, 'confirmPassword' ) }
              value={confirmPassword}
              secureTextEntry={hidePassword2}
              autoComplete="password"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor='gray'
              returnKeyType="send"
              >
              </TextInput>
              <TouchableOpacity onPress={()=>hide2()} 
                style={{position:'absolute', right:'2%',zIndex:1000}}>
                  {
                    hidePassword2===true ?
                <Icon 
                name="eye"
                color="#FF914D"
                size={ 35 }
                />
                :
                <Icon 
                name="eye-off"
                color="#FF914D"
                size={ 35 }
                />
                  }
              </TouchableOpacity>
            </View>
            {
              (error)&&
              (<Text style={styles.textError}>Las contraseñas no coinciden</Text>)
            }
        </View>
        <View style={{marginTop:15}}>
        { 
        route?.params?.type !== 'local' ?
        verify.every(check)===true ?
               <Buttons text='Crear' onPress={()=>send()}/>
               :
               <Text style={styles.subs}>Completa los campos</Text>
               
               :
               
        verifyLocal.every(check)===true ?
               <Buttons text='Crear' onPress={()=>send()}/>
               :
               <Text style={styles.subs}>Completa los campos</Text>
        }
        </View>
        </ScrollView>
}
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
  inputpass:{
    width:'100%',
    height: 40,
    marginVertical: 15,
    paddingHorizontal: 10,
    paddingVertical:10,
    color:'black',
    fontSize:15,
    borderBottomColor:'red',
    borderBottomWidth:1
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
  },
  subs:{
    color:'orange',
    textAlign:'center',
    width:'75%',
    padding:5,
    fontSize:15,
    fontStyle:'italic'
  },
  textError:{
    color:'red',
    fontSize:13,
    paddingHorizontal:10,
  }
})