import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/Home';
import Chat from './src/Chat';
import DarkGPT from './src/DarkGPT'
import API from './src/API'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="DarkGPT" component={DarkGPT} />
        <Stack.Screen name="API" component={API} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;