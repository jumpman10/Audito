import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import Login from '../screens/Login';
import { AuthContext } from '../context/AuthContext/authContext';
import { LoadingScreen } from '../screens/LoadingScreen';
import { Result } from '../screens/Results';
import { Lists } from '../screens/Lists';
import { Control } from '../screens/Control';
import { Locals } from '../screens/Locals';
import { LocalsList } from '../screens/LocalsList';
import { LocalsDetail } from '../screens/LocalsDetail';
import { AllLists } from '../screens/AllLists';
import { AllResults } from '../screens/AllResults';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../services/asyncStoraje';
import { handleLogin } from '../redux/authentication';
import { Auditoria } from '../screens/Auditoria';




export type RootStackParams = {
 Home:undefined,
 Login:undefined,
 Result:undefined,
 Lists:undefined,
 Control:undefined,
 Locals:undefined,
 LocalsList:undefined,
 LocalsDetail:undefined,
 AllLists:undefined,
 AllResults:undefined,
 Auditoria:undefined,
}
const Stack = createStackNavigator<RootStackParams>();


export const Screens= () => {

  const sessionId = useSelector(store => store.auth.sessionId)
  const dispatch = useDispatch()
  useEffect(() => {
    if(!sessionId){
    getData('authData', true).then((authdata)=>{
      dispatch(handleLogin({userName:authdata.userName,sessionId:authdata.sessionId, role:authdata.role}))
    })
    }
  }, [])

  return (
    <Stack.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: 'white',
        flex:1,
      },
    }}>
 
          <Stack.Screen name="Home" component={Home} 
          options={{  headerShown:false }}/>   
          <Stack.Screen name="Locals" component={Locals} 
          options={{  headerShown:false }}/> 
          <Stack.Screen name="LocalsList" component={LocalsList} 
          options={{  headerShown:false }}/> 
          <Stack.Screen name="LocalsDetail" component={LocalsDetail} 
          options={{  headerShown:false }}/> 
          <Stack.Screen name="AllLists" component={AllLists} 
          options={{  headerShown:false }}/>
          <Stack.Screen name="AllResults" component={AllResults} 
          options={{  headerShown:false }}/>
          <Stack.Screen name="Lists" component={Lists} 
          options={{  headerShown:false }}/>
          <Stack.Screen name="Control" component={Control} 
          options={{  headerShown:false }}/>
          <Stack.Screen name="Result" component={Result} 
          options={{  headerShown:false }}/>  
          <Stack.Screen name="Auditoria" component={Auditoria} 
          options={{  headerShown:false }}/>  
          <Stack.Screen name="Login" component={Login} 
          options={{  headerShown:false }}/> 
    </Stack.Navigator>
  );
}