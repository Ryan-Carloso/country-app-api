import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ToggleThemeButton = ({ currentTheme, toggleTheme }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: currentTheme.buttonBackground }]}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>Toggle Theme</Text>
    </TouchableOpacity>
  );
};

export default ToggleThemeButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});