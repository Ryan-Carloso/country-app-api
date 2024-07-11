import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import CountryDetailsScreen from './CountryDetailsScreen';

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
          options={{
            headerStyle: { 
              backgroundColor: 'black',
              borderBottomWidth: 0, // Removes the bottom border line

            }, // Header background color
            headerTintColor: 'white', // Header text color
            cardStyle: { backgroundColor: 'black' }, // Screen background color
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;