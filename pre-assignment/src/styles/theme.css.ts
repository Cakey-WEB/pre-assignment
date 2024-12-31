import { createGlobalTheme } from '@vanilla-extract/css';

export const globalTheme = createGlobalTheme(':root', {
  color: {
    orange: '#FF6E10',
    green: '#018C57',
    black: '#1C1C1C',
    gray: '#5E5E5E',
    lightgray: '#ADADAD',
  },
});
