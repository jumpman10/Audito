import React, { useEffect,useState } from 'react'
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
import { Screens } from './Screen';




export type RootStackParams = {
  Screens:undefined,
  Login:undefined,
}
const Stack = createStackNavigator<RootStackParams>();


export const StackNavigator= () => {

  const [logged, setlogged] = useState(false)

  const getAuth = async () => {
    const auth = await getData('authData', true)
    if (auth?.sessionId) {
      setlogged(true)
    }
    else {
      setlogged(false)
    }
  }
  useEffect(() => {
    getAuth()
  }, [logged])

  return (
    <Stack.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: 'white',
        flex:1,
      },
    }}>
      {logged?  
       <Stack.Screen name="Screens" component={Screens} 
       options={{headerShown:false}} />        

          :
          <>
          <Stack.Screen name="Login" component={Login} 
          options={{headerShown:false}} />
          <Stack.Screen name="Screens" component={Screens} 
          options={{headerShown:false}} />
          </>
          }


    </Stack.Navigator>
  );
}