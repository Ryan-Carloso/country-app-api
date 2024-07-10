// darkorwhite.js

import React, { useState } from 'react';

const useDarkOrWhiteTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const lightTheme = {
    backgroundColor: '#ffffff',
    color: '#000000',
    buttonBackground: '#007bff',
    buttonText: '#ffffff',
  };

  const darkTheme = {
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    buttonBackground: '#ffffff',
    buttonText: '#000000',
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return {
    currentTheme,
    toggleTheme,
  };
};

export default useDarkOrWhiteTheme;