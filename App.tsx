import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigator/StackNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { AuthProvider } from './src/context/AuthContext/authContext';


const AppState = ({children}: {children: JSX.Element | JSX.Element[]}) =>{
  return(
    <AuthProvider>
        {children}
    </AuthProvider>
  )
}


const App = () => {
  return (
<Provider store={store}>
   <NavigationContainer>
        <AppState>
          <StackNavigator/>
        </AppState>
   </NavigationContainer>
</Provider>
  )
}



export  default App;