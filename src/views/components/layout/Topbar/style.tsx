import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const topbarStyle = makeStyles((theme: Theme) => ({
  root: {
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, all ease 0.3s !important',

    '& .mscb-topbar-toolbar': {
      color: 'var(--mscb-primary)',

      [theme.breakpoints.up('sm')]: {
        paddingLeft: '30px',
        paddingRight: '30px',
      },

      '&-box': {
        position: 'relative',

        '& .mscb-topbar-left': {
          // left: '48px'
        },

        '& .mscb-topbar-center': {
          transform: 'translateX(-48px)',

          '& img': {
            height: '48px'
          }
        }
      },

      '& #mscb-topbar-user': {
        backgroundColor: '#f2f3f9'
      }
    },

    '& .mscb-topbar-icon': {
      fontSize: '18px'
    }
  }
})) as Function;

export default topbarStyle;