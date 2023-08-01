import React  from 'react'
import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { removeData } from '../services/asyncStoraje';
import { LoadingScreen } from './LoadingScreen';
import LinearGradient from 'react-native-linear-gradient';

interface Props extends StackScreenProps <any , any>{};

export const Home = ({navigation,route}  : Props) => {
  const sessionId = useSelector(store => store.auth.sessionId)
  const role = useSelector(store => store.auth.role)
  const userName = useSelector(store => store.auth.userName)


  return (
    <LinearGradient  colors={['#FF914D','white']}
      start={{x: 0.0, y: 1}} 
      end={{x: 0.0, y: 0.75}} 
      style={{flex:1}}
      >
      <View style={styles.container}>
       
        <Image source={require('./../assests/Logo-Audito.png')} 
        resizeMode='contain' resizeMethod='resize' 
        style={{width:'30%',height:'15%',marginTop:'10%',zIndex:1000}}/>
        <Image source={require('./../assests/Audito-Logo-Large.png')} 
        resizeMode='contain' resizeMethod='resize' 
        style={{width:'40%',height:'10%',zIndex:1000,}}/>
        {(role === 'auditor') &&  
        (<>
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
        </>)
      }
        
          { (role === 'admin') && 
        (<>
        <View style={styles.row}>
        <TouchableOpacity style={styles.buttons} onPress={()=>navigation.navigate('AddMenu',{sessionId:route?.params?.sessionId})}>
            <Icon 
              name="add-circle"
              color="#FF914D"
              size={ 35 }
            />
            <Text style={styles.text}>Nuevo</Text>
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
          <TouchableOpacity style={styles.buttons} onPress={()=>navigation.navigate('AllCategories',{sessionId:route?.params?.sessionId})}>
            <Icon 
              name="document-text"
              color="#FF914D"
              size={ 35 }
            />
            <Text style={styles.text} >Auditorias</Text>
          </TouchableOpacity>
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
        )
        }
       { (role === 'local') && 
        (<>
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
        </>)
        }
        
          <Text style={styles.textSlice}>Produced by</Text>
          <Image source={require('./../assests/SliceLogo.png')} 
          resizeMode='contain' resizeMethod='resize' 
          style={{width:'10%',height:'5%',zIndex:1000}}/>
          <Text style={[styles.textSlice,styles.margin0]}>Slice</Text>
      </View>
      </LinearGradient>
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
    borderColor:'#DDDDDD',
    borderWidth:0.5
  },
  text:{
    color:'black',fontSize:15,position:'absolute',bottom:'15%'
  },
  textSlice:{
    color:'black',fontSize:8,marginTop:'15%'
  },
  margin0:{marginTop:0},
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