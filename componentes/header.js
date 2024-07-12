import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ToggleThemeButton from './ToggleThemeButton';

const Header = ({ currentTheme, toggleTheme }) => {
  return (
    <View style={[styles.header, { backgroundColor: currentTheme.headerBackground }]}>
      <Text style={[styles.headerText, { color: currentTheme.headerText }]}>My App</Text>
      <ToggleThemeButton currentTheme={currentTheme} toggleTheme={toggleTheme} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});