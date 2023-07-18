import { SxBaseApp } from 'types/app';

export const SxModalContainer: SxBaseApp = {
  '& .MuiPaper-root': {
    minHeight: '430px',
    minWidth: '600px',
    position: 'relative',
    borderRadius: 0,
    '& .MuiDialogContent-root': {
      padding: '16px 24px',
      borderBottom: 'unset !important',
    },
    '& .MuiDialogActions-root': {
      padding: '0px 24px 30px 24px',
    },
  },
};

export const SxTable: SxBaseApp = {
  '& .MuiTableCell-root': {
    border: 'none',
    '&:first-child': {
      width: '30%',
      verticalAlign: 'top',
    },
  },
};
