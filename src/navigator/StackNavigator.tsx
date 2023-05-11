import React, { useEffect,useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import { getData } from '../services/asyncStoraje';
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