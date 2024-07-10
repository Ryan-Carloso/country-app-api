// navigation.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import CountryDetailScreen from './CountryDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CountryDetail" component={CountryDetailScreen} options={{ title: 'Country Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;