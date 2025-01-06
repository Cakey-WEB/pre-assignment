import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  zIndex: 1,
  bottom: 0,
  left: 0,
  right: 0,
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.6)',
  backgroundColor: '#fff',
  minHeight: '523px',
});

export const withTransition = style({
  transition: 'top 0.3s ease-in-out',
});

export const noTransition = style({
  transition: 'none',
});
