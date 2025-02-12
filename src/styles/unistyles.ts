import { StyleSheet } from 'react-native-unistyles';

const darkTheme = {
  colors: {
    background: '#0F0C0C',
    black: '#050505',
    white: '#FFFFFF',
    gray1: '#8F8F8F',
    gray2: '#1F1F1F',
    primary: '#9D0208',
    danger: '#A71829',
    success: '#6CBF6C',
  },
};

const lightTheme = {
  colors: {
    background: '#FCFCFC',
    black: '#050505',
    white: '#FFFFFF',
    gray1: '#0f0',
    gray2: '#1F1F1F',
    primary: '#9D0208',
    danger: '#A71829',
    success: '#6CBF6C',
  },
};

const appThemes = {
  dark: darkTheme,
  light: lightTheme,
};

type AppThemes = typeof appThemes;

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  settings: {
    initialTheme: 'dark',
  },
  themes: appThemes,
});
