import { makeStyles } from "@mui/styles";

const itemStyle = makeStyles(() => ({
  StatisticItem: {
    height: '93px',

    '& .mscb-statistic-name,& .mscb-statistic-count-value': {
      fontSize: '14px',
      fontWeight: 500
    },
    '& .mscb-statistic-total-icon': {
      fontSize: '1.85rem',
      marginRight: '12px'
    },

    '& .mscb-statistic-total-value': {
      fontSize: '1.5rem',
      fontWeight: 500
    },

    '& .singleline-statistic-name':{
      fontSize: '22px',
      fontWeight: 'bold',
    },
    '& .singleline-statistic-total':{
      width: 'fit-content',
      justifyContent: 'flex-end',
      '& span':{
          fontSize: '32px',
      }
    },
    '& .ext-statistic-total-icon': {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      '& svg':{
        fontSize: '1.85rem',
        marginRight: '12px',
        // strokeWidth: '1rem'
      }
    },
  },
}));

export default itemStyle;