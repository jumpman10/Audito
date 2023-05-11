import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react'
import { Animated, Image, ImageBackground, TextInput, View,KeyboardAvoidingView, 
  Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert,StyleSheet, Text } from 'react-native'
import { useForm } from '../hooks/useForm';
import { AuthContext } from '../context/AuthContext/authContext';
import axios from 'axios';
import { useLazyLoginQuery} from '../services/api/api';
import { getData, setData } from '../services/asyncStoraje';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogin } from '../redux/authentication';
import { LoadingScreen } from './LoadingScreen';



interface Props extends StackScreenProps <any , any>{};

const Login = ({navigation}  : Props) => {

const dispatch = useDispatch()
  
  const { mail, onChange, password } = useForm({
    password: '',
    mail: '',
  });
  const data = {email:mail,password:password}
const [login,{isSuccess:suceso, error:error2,isError,data:resultado,isLoading}]= useLazyLoginQuery()
if(suceso){
  navigation.replace('Screens',{screen:'Home',params:{sessionId:resultado.sessionId,type:resultado.type,name:resultado.name}})
  dispatch(handleLogin({role:resultado.type,sessionId:resultado.sessionId,userName:resultado.name}))
}
const log=()=>{
login(data).then((result)=>{
  let sessionId = result.data.sessionId
  let userName = result.data.name
  let role = result.data.type
setData('authData',{sessionId,userName,role})
})
}

return (
 
                          <View style={styles.containerView} >     
                              {isLoading ? <LoadingScreen/> :
                              <>
                            <Image source={require('./../assests/Audito-Logo-Large.png')} 
                                   resizeMode='contain' resizeMethod='resize' style={styles.logo}/>
                                <View style={styles.inputsPosition}>
                                    <TextInput
                                      style={styles.input}
                                      placeholder="email"
                                      onChangeText={ (value) => onChange( value, 'mail' ) }
                                      value={mail}
                                      placeholderTextColor='gray'
                                    >
                                    </TextInput>
                                    <TextInput
                                      style={styles.input}
                                      placeholder="password"
                                      onChangeText={ (value) => onChange( value, 'password' ) }
                                      value={password}
                                      autoCorrect={false}
                                      secureTextEntry={true}
                                      placeholderTextColor='gray'
                                      >                            
                                    </TextInput>
                                </View>
                                <View style={styles.positionBtnLogin}>
                                    <TouchableOpacity style={styles.btnLogin}
                                    onPress={()=> log()}
                                    > 
                                    <Text style={{color:'white',fontSize:20,fontStyle:'italic'}}>Inicio</Text>                               
                                    </TouchableOpacity>
                                </View>
                                </>
                               }
                          </View>
                          
  )
}
const styles = StyleSheet.create({
    containerView: {
      flex: 1,
      flexDirection:'column',
      alignItems:'center'
    },
    image: {
      flex: 1,
    },
    input: {
      width:300,
      height: 40,
      margin: 15,
      borderBottomWidth: 1,
      paddingHorizontal: 10,
      paddingVertical:10,
      borderColor:'black',
      color:'black'
    },
    inputsPosition:{
    },
    logo: {
      width: '100%',
      marginTop:40
    },
    btnLogin:{
      width: 250,
      height: 50,
      borderRadius:20,
      backgroundColor:'#FF914D',
      justifyContent:'center',
      alignItems:'center',
    },
    positionBtnLogin:{
      marginTop:10
    },
    textLogin:{
      justifyContent:'center',
      alignSelf:'center',
      fontSize:33,
      color:'#B7E4F9FF'
    }
  
  })
export default Login


