import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  zIndex: 1,
  bottom: 0,
  left: 0,
  right: 0,
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.6)',
  transition: 'height 0.3s ease',
  backgroundColor: '#fff',
});