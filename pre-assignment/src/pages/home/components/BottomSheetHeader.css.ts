import { style } from '@vanilla-extract/css';

export const wrapper = style({
  height: '1rem',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  position: 'relative',
  paddingTop: '16px',
  paddingBottom: '4px',
});

export const handle = style({
  width: '32px',
  height: '4px',
  borderRadius: '2px',
  backgroundColor: '#d0d0d0',
  margin: 'auto',
});
