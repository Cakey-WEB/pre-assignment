import { style } from '@vanilla-extract/css';

export const content = style({
  height: '100%',
  overflowY: 'scroll',
  backgroundColor: 'pink',
});

export const tabWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  gap: '10rem',
});

export const cardWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  height: '7rem',
  backgroundColor: '#4074E5',
});

export const cardContainer = style({
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const contentContainer = style({
  overflowY: 'auto',
  maxHeight: '523px',
});
