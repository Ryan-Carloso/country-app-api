import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './body/HomeScreen';
import CountryDetailsScreen from './Header/CountryDetailsScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} // Remove o cabeçalho para esta tela
 
        />
        <Stack.Screen
          name="CountryDetails"
          component={CountryDetailsScreen}
          options={{ headerShown: false }} // Remove o cabeçalho para esta tela

        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;