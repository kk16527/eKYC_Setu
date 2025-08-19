// import React, { createContext, useState, useContext } from 'react';
// import { DarkTheme, DefaultTheme } from '@react-navigation/native';
// import { Appearance } from "react-native";

// const currentTheme = Appearance.getColorScheme(); 
// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   // console.log('IS_DARK_THEME:', IS_DARK_THEME);
//   const [isDarkTheme, setIsDarkTheme] = useState(currentTheme=="dark"?true:false);

//   const toggleTheme = () => {
//     setIsDarkTheme((prevTheme) => !prevTheme);
//   };

//   return (
//     <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, theme: isDarkTheme ? DarkTheme : DefaultTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);




import React, { createContext, useState, useContext, useEffect } from 'react';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Appearance } from "react-native";
// import SyncStorage from 'sync-storage';
 
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(Appearance.getColorScheme() === "dark");

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkTheme(colorScheme === "dark");
    });

    return () => subscription.remove(); // Cleanup on unmount
  }, []);


  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
    // SyncStorage.set('isDarkTheme', !isDarkTheme);

  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, theme: isDarkTheme ? DarkTheme : DefaultTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
