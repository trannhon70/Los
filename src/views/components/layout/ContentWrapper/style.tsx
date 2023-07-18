import { makeStyles } from "@mui/styles";

const wrapperStyle = makeStyles(() => ({

  root: {
    transition: 'all ease 0.3s',
    marginLeft: 'var(--mscb-sidebar-width)',
    width: 'calc(100% - var(--mscb-sidebar-width))',
    paddingTop: 'var(--mscb-topbar-height)'
  },

  wrapper: {
    padding: '30px'
  },
  smooth :{
    '& > div > div':{
      scrollBehavior: 'smooth'
    }
  }
})) as Function;

export default wrapperStyle;