import { globalStyle } from '@vanilla-extract/css';
import './layers.css';
import './reset.css';

globalStyle('html', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

globalStyle('#root', {
  maxWidth: '430px',
  minWidth: '375px',
  width: '100dvw',
  minHeight: '100dvh',
  fontSize: '62.5%',
});
