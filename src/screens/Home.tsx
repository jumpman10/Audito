import React  from 'react'
import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { removeData } from '../services/asyncStoraje';
import { LoadingScreen } from './LoadingScreen';

interface Props extends StackScreenProps <any , any>{};

export const Home = ({navigation,route}  : Props) => {
  const sessionId = useSelector(store => store.auth.sessionId)
  const role = useSelector(store => store.auth.role)
  const userName = useSelector(store => store.auth.userName)


  return (
      <View style={styles.container}>
       
        <Image source={require('./../assests/Audito-Logo-Large.png')} 
        resizeMode='contain' resizeMethod='resize' style={{width:'100%',marginTop:'10%'}}/>
        {role === 'auditor' ? 
        <>
        <View style={styles.row}>
          <TouchableOpacity style={styles.buttons} onPress={()=>navigation.navigate('Locals',{sessionId:sessionId,name:userName})}>
            <Icon 
              name="add-circle"
              color="#FF914D"
              size={ 35 }
            />
            <Text style={styles.text}>Nuevo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={()=>navigation.navigate('Lists',{sessionId:sessionId})}>
            <Icon 
              name="document-text"
              color="#FF914D"
              size={ 35 }
            />
            <Text style={styles.text} >Auditorias</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.buttons} onPress={async () => {
            try {
              await removeData('authData')
              navigation.replace('Login')
            } catch (error) {
              console.log('file: Menu.tsx ~ line 163 ~ error', error)
            }
          }}>
            <Icon 
              name="log-out"
              color="#FF914D"
              size={ 35 }
            />
            <Text style={styles.text}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
        </>
        
        :
           role === 'admin'?
        <>
        <View style={styles.row}>
          <TouchableOpacity style={styles.buttons} onPress={()=>navigation.navigate('AllLists',{sessionId:route?.params?.sessionId})}>
            <Icon 
              name="document-text"
              color="#FF914D"
              size={ 35 }
            />
            <Text style={styles.text} >Auditorias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={()=>navigation.navigate('LocalsList',{sessionId:route?.params?.sessionId})}>
            <Icon 
              name="home"
              color="#FF914D"
              size={ 35 }
            />
            <Text style={styles.text}>Locales</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.buttons} onPress={async () => {
            try {
              await removeData('authData')
              navigation.replace('Login')
            } catch (error) {
              console.log('file: Menu.tsx ~ line 163 ~ error', error)
            }
          }}>
            <Icon 
              name="log-out"
              color="#FF914D"
              size={ 35 }
            />
            <Text style={styles.text}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
        </>
        :
        <>
        <View style={styles.row}>
          <TouchableOpacity style={styles.buttons} onPress={()=>navigation.navigate('ListsforLocal',{sessionId:sessionId,userName:userName})}>
            <Icon 
              name="document-text"
              color="#FF914D"
              size={ 35 }
            />
            <Text style={styles.text} >Auditorias</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.buttons} onPress={async () => {
            try {
              await removeData('authData')
              navigation.replace('Login')
            } catch (error) {
              console.log('file: Menu.tsx ~ line 163 ~ error', error)
            }
          }}>
            <Icon 
              name="log-out"
              color="#FF914D"
              size={ 35 }
            />
            <Text style={styles.text}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
        </>
        }
        
      </View>
  )
}


const styles = StyleSheet.create({
  container:{
    height:'100%',width:'100%',alignItems:'center'
  },
  buttons:{
    width:'40%',height:'70%', justifyContent:'center',alignItems:'center',
    margin:'7%', borderRadius:15,backgroundColor:'white',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text:{
    color:'black',fontSize:15,fontStyle:'italic',position:'absolute',bottom:'15%'
  },
  title:{
    color:'black',fontSize:30,position:'absolute',top:'13%',fontFamily:'EAGLESE PRO'
  },
  row: {
    height:'25%',
    flexDirection: 'row',
    marginHorizontal:'7%',
    alignItems:'center'
  },
})