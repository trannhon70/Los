import { makeStyles } from "@mui/styles";

const InitLoanStyle = makeStyles(() => ({
   initRoot: {
    '& .tab-button': {
        margin: '0 20px',
        paddingBottom: '20px',
        borderTop: '1px solid #d5d5d5',
        '& button.MuiButton-root': {
            boxShadow: 'none',
            width: '99px',
        },
        '& .btn-gray': {
            backgroundColor: '#7d7d7d !important',
        }
    },
    // '& .mscb-tabpanel-container': {
    //     '& .react-swipeable-view-container': {
    //         '& >div': {
    //             overflow: 'inherit !important',
    //         }
    //     }
    // }
   },
})) as Function;

export default  InitLoanStyle;