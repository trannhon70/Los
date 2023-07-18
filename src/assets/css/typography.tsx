import { makeStyles } from "@mui/styles";

const typographyStyle = makeStyles(() => ({
  '@global': {
    a: { 
      textDecoration: 'none', 
      color: 'inherit' 
    },
    '.ellipsis': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: 'block',
    },
    '.whitespace-pre-wrap': {
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
    },
    '.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6': {
      margin: '0 0 0.5rem',
      lineHeight: '1.1',
      color: 'inherit',
    },
    '.h1, h1': { fontSize: '2rem' },
    '.h2, h2': { fontSize: '1.75rem' },
    '.h3, h3': { fontSize: '1.5rem' },
    '.h4, h4': { fontSize: '1.25rem' },
    '.h5, h5': { fontSize: '1rem' },
    '.h6, h6': { fontSize: '0.875rem' },
    '.whitespace-pre': { whiteSpace: 'pre' },
    '.whitespace-no-wrap': { whiteSpace: 'nowrap' },
    '.line-height-1': { lineHeight: 1 },
    '.caption': { font: 'var(--font-caption)' },
    '.subtitle-1': { font: 'var(--font-subtitle-1)' },
    '.subtitle-2': { font: 'var(--font-subtitle-2)' },
    '.heading': { font: 'var(--font-heading)' },
    '.title': { font: 'var(--font-title)' },
    '.display-1': { font: 'var(--font-display-1)' },
    '.display-2': { font: 'var(--font-display-2)' },
    '.display-3': { font: 'var(--font-display-3)' },
    '.display-4': { font: 'var(--font-display-4)' },
    '.capitalize': { textTransform: 'capitalize!important' },
    '.font-normal': { fontWeight: 'normal!important' },
    '.font-light': { fontWeight: '300!important' },
    '.font-medium': { fontWeight: '500!important' },
    '.font-semibold': { fontWeight: '600!important' },
    '.font-bold': { fontWeight: '700!important' },
    '.style-iatalic': { fontStyle: 'italic!important'}
  }
}));

export default typographyStyle;