import { globalStyle } from '@vanilla-extract/css';

globalStyle('html, body', {
  fontSize: '62.5%',
  maxWidth: '375px',
  width: '100%',
  minHeight: '100dvh',
  margin: '0 auto',
  scrollBehavior: 'smooth',
});

globalStyle('input, button', {
  border: 'none',
  outline: 'none',
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});
