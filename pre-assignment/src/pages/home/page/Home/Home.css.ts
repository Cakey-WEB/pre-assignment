import { globalTheme } from '@styles/theme.css';
import { style } from '@vanilla-extract/css';

export const home = style({
  color: globalTheme.color.orange,
  fontSize: '1.6rem',
  backgroundColor: globalTheme.color.green,
  width: '100%',
  height: '100%',
  border: '1px solid',
});
