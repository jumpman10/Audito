import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react'
import { Image,TextInput, View,TouchableOpacity, Alert,StyleSheet, Text, ToastAndroid } from 'react-native'
import { useForm } from '../hooks/useForm';
import { useLazyLoginQuery} from '../services/api/api';
import { setData } from '../services/asyncStoraje';
import { useDispatch } from 'react-redux';
import { handleLogin } from '../redux/authentication';
import { LoadingScreen } from './LoadingScreen';
import LinearGradient from 'react-native-linear-gradient';
import { Buttons } from '../componentes/Buttons';



interface Props extends StackScreenProps <any , any>{};

const Login = ({navigation}  : Props) => {

const dispatch = useDispatch()
const [error ,setError] = useState(false)
const { mail, onChange, password } = useForm({
    password: '',
    mail: '',
  });
  const data = {email:mail,password:password}
const [login,{isSuccess:suceso, error:error2,isError,data:resultado,isLoading}]= useLazyLoginQuery()
if(suceso && !isLoading){
  dispatch(handleLogin({role:resultado.type,sessionId:resultado.sessionId,userName:resultado.name}))
  navigation.replace('Screens',{screen:'Home',params:{sessionId:resultado.sessionId,type:resultado.type,name:resultado.name}})
}
const log=()=>{
  if(mail.length && password.length){
    login(data).then((result)=>{
      let sessionId = result.data.sessionId
      let userName = result.data.name
      let role = result.data.type
      setData('authData',{sessionId,userName,role})
    })
    .catch((error) => {
      setError(true)
      ToastAndroid.showWithGravity(
        'Uno o dos de los datos es incorrecto. Por favor verifícalos e ingresa de nuevo',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    })
  }else{
    setError(true)
    ToastAndroid.showWithGravity(
      '¡Error! Debe llenar los campos',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }
}

return (
  <LinearGradient colors={['#FF914D','white']}
      start={{x: 0.0, y: 1}} 
      end={{x: 0.0, y: 0.75}} 
      style={{flex:1}}
      >
 
                          <View style={styles.containerView} >     
                              {isLoading ? <LoadingScreen/> :
                              <>
                            <Image source={require('./../assests/Logo-Audito.png')} 
                                   resizeMode='contain' resizeMethod='resize' style={styles.logo}/>
                                <View style={styles.inputsPosition}>
                                    <TextInput
                                      style={{width:300,height: 40,margin: 15,borderBottomWidth: 1,paddingHorizontal: 10,
                                        paddingVertical:10,borderColor: !error ? 'black':'red',color:'black'}}
                                      placeholder="email"
                                      onChangeText={ (value) => onChange( value, 'mail' ) }
                                      value={mail}
                                      placeholderTextColor='gray'
                                    >
                                    </TextInput>
                                    <TextInput
                                      style={{width:300,height: 40,margin: 15,borderBottomWidth: 1,paddingHorizontal: 10,
                                        paddingVertical:10,borderColor: !error ? 'black':'red',color:'black'}}
                                      placeholder="contraseña"
                                      onChangeText={ (value) => onChange( value, 'password' ) }
                                      value={password}
                                      autoCorrect={false}
                                      secureTextEntry={true}
                                      placeholderTextColor='gray'
                                      >                            
                                    </TextInput>
                                </View>
                                <View style={styles.positionBtnLogin}>
                                    <Buttons onPress={log} text='Inicio'/>                               
                                </View>
                                <Text style={styles.textSlice}>Produced by</Text>
                                <Image source={require('./../assests/SliceLogo.png')} 
                                resizeMode='contain' resizeMethod='resize' 
                                style={{width:'10%',height:'5%',zIndex:1000}}/>
                                <Text style={[styles.textSlice,styles.margin0]}>Slice</Text>
                                </>
                               }
                          </View>
    </LinearGradient>
                          
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
    inputsPosition:{
    },
    logo: {
      width: '30%',
      height:'20%',
      marginTop:120
    },
    btnLogin:{
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
    },
    positionBtnLogin:{
      marginTop:10
    },
    textLogin:{
      justifyContent:'center',
      alignSelf:'center',
      fontSize:33,
      color:'#B7E4F9FF'
    },
    textSlice:{
      color:'black',fontSize:8,marginTop:'55%'
    },
    margin0:{marginTop:0},
  
  })
export default Login


