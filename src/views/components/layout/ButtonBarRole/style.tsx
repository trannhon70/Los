import { SxProps, Theme } from '@mui/system';

export const SxStyleSkelekon: SxProps<Theme> = {
    padding:0,
    height:"36px",
    "& .MuiSkeleton-root":{
        minWidth: '100px',
        height:"62px",
        maxWidth:"250px",
    }
};
