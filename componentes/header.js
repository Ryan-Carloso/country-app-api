import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ToggleThemeButton from './ToggleThemeButton';
import ButtonContainer from './ButtonContainer';

const Header = ({ currentTheme, toggleTheme }) => {
  return (
    <View style={[styles.header, { backgroundColor: currentTheme.headerBackground }]}>
      <Text style={[styles.headerText, { color: currentTheme.color }]}>My App</Text>
      <ToggleThemeButton currentTheme={currentTheme} toggleTheme={toggleTheme} />
      
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});