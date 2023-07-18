import { makeStyles } from "@mui/styles";

const tabsStyle = makeStyles(() => ({
  Tabs: {
    '&.tabs-bg': {
      '&>.MuiTabs-root': {
        minHeight: '33px',
        border: '1px solid var(--mscb-primary)',

        '&>.MuiTabs-scroller': {
          '&>.MuiTabs-flexContainer': {
            '&>.MuiTab-root': {
              color: 'var(--mscb-primary)',
              fontWeight: 'normal',
              minHeight: '31px',
              maxHeight: '31px'
            },
            '&>.Mui-selected': {
              backgroundColor: 'var(--mscb-primary)',
              transition: 'all ease 0.3s',
              color: '#fff'
            }
          }
        }
      }
    },

    '&>.mscb-tabpanel-container': {
      '&>.react-swipeable-view-container': {
        height: '100%'
      }
    }
  }
}));

export default tabsStyle;