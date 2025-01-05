import { style } from '@vanilla-extract/css';

export const overlay = style({
  position: 'fixed',
  zIndex: 1,
  top: 0,
  maxWidth: '37.5rem',
  width: '100%',
  height: '100dvh',
});

export const container = style({
  position: 'fixed',
  zIndex: 2,
  bottom: 0,
  maxWidth: '37.5rem',
  width: '100%',
  height: '100vh',
  backgroundColor: 'white',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
  padding: '0 1.6rem',
  willChange: 'transform',
});

export const handlerContainer = style({
  padding: '2rem 0',
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
});

export const handler = style({
  cursor: 'grab',
  userSelect: 'none',
});

export const header = style({
  textAlign: 'center',
  fontSize: '1.5rem',
  fontWeight: '600',
});

export const content = style({
  padding: '1rem',
  height: 'calc(80vh - 4.4rem)',
  overflowY: 'auto',
});

export const cardList = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem',
});

export const card = style({
  background: '#f5f5f5',
  height: '10rem',
  borderRadius: '8px',
  alignContent: 'center',
  textAlign: 'center',
});
