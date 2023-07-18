import { SxProps, Theme } from "@mui/material/styles";

export const formControl: SxProps<Theme> = {
  '& span': { width: '100%' }
}

export const root: SxProps<Theme> = {
  '& .label-checkbox': {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}