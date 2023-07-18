import { SxProps, Theme } from '@mui/system';
                    
export const SxHeaderRow: SxProps<Theme> = { 
  '& .MuiTableCell-root':{
    backgroundColor: '#1825aa',
    color: '#fff!important',
    borderRightColor: '#fff!important',
    borderLeftColor: '#fff!important',
    '&:first-child': {
      borderLeftColor: '#353535!important',
    },
    '&:last-child':{
      borderRightColor: '#353535!important',
    }
  }
}

export const SxTable : SxProps<Theme> = {
  '& .MuiTableCell-root':{ 
    color: '#353535',
    fontWeight: 500
  }
}