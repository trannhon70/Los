import { makeStyles } from "@mui/styles";

const listStyle = makeStyles(() => ({
  root: {
    backgroundColor: 'var(--mscb-gray)',

    '& .MuiListItem-root': {
      padding: '0 16px',

      '&.active .MuiTypography-root': {
        color: 'var(--mscb-danger)',
        fontWeight: 500
      }
    },

    '& .MuiListItemButton-root': {
      borderBottom: '1px solid #d7d8e4',
      padding: '0 25px 0 0!important',
      minHeight: '36px'
    },

    '& .MuiCheckbox-root': {
      padding: '4px 0',
      marginRight: 0
    },

    '& .MuiTypography-root': {
      lineHeight: '22px'
    }
  }
})) as Function;

export default listStyle;