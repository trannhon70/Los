import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Typography
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { fetchLOANNormalFormCategoryProfile } from 'features/loan/normal/storage/forms/actions';
import {
  getLOANNormalFormCategoryProfile, getLOANNormalTemplateFile,
} from 'features/loan/normal/storage/forms/selectors';
import { FC, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import CardOutside from 'views/components/layout/CardOutside';
import Scrollbar from 'views/components/layout/Scrollbar';
import Tabs from 'views/components/layout/Tabs';
import FormsCategoryGroup from './CategoryGroup';

const FormsCategory: FC = () => {
  const dispatch = useDispatch();
  const categoryProfile = useSelector(getLOANNormalFormCategoryProfile);
  const templateFile = useSelector(getLOANNormalTemplateFile);


  useEffect(() => {
    !categoryProfile.data?.profile_list.length
    && !categoryProfile.data?.total_approval
    && !categoryProfile.fetching
    && !categoryProfile.fetched
    && dispatch(fetchLOANNormalFormCategoryProfile());
  });

  return <Box
    sx={{
      height: '922px',
      width: '298px',
      '& .mscb-outside-card': {
        flex: 1,
        '& .mscb-outside-card-label': {
          display: 'inline-flex',
          boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.06)',
          backgroundColor:'var(--mscb-primary) !important',
          color:'#fff !important'
        },
        '& .mscb-outside-card-content': {
          height: '100%',
          px: 0
        }
      }
    }}
  >
    <CardOutside label="Danh mục hồ sơ" className="h-full flex-column ">
      <Box className="h-full flex-column" sx={{ flex: 1 }}>
        <Box className="h-full pl-6">
          <Scrollbar>
            <Box className="pr-6">
              {templateFile?.folder?.map(c => {
                return <FormsCategoryGroup
                  key={c.name}
                  profile_type_list={c?.children?.map(i => ({
                    profile_id: i.id,
                    profile_name: c.name,
                    activated_flag: i.is_primary,
                  }))}
                  // profile_type_list={[]}
                  profile_type_name={c.name}
                  template_code={ c.name }
                />;
              })}
            </Box>
          </Scrollbar>

        </Box>
        <Box>
          <Box sx={{display:"flex"}}>
            <Box sx={{ fontSize: '14px'}}>Tổng số biểu mẫu đã duyệt: </Box>
            <Box className="text-right">
              <Button
                variant="outlined"
                color="error"
                className="ml-8 font-medium"
                sx={{
                  borderRadius: 0,
                  height: '22px',
                  p: '0 3px',
                  justifyContent: 'flex-end'
                }}
              >
                {categoryProfile.data?.total_approval}
              </Button>
            </Box>
          </Box>
          <Tabs
            tabs={['QUÁ TRÌNH XỬ LÝ HỒ SƠ']}
            sx={{
              '& .MuiTab-root':{
                paddingLeft:'0px'
              },
              '& .scrollbar-activities': {
                height: "374px",
                '& .list-container': {
                  paddingRight: '10px',
                  '& .MuiListSubheader-root': {
                    fontSize: '15px',
                    color: "#000",
                    fontWeight: 500
                  },
                  '& .MuiListItemSecondaryAction-root': {
                    top: "25%",
                    '& button': {
                      color: 'var(--mscb-primary)'
                    }
                  },
                  '& .open-date': {
                    fontStyle: "italic",
                    color: "#707070",
                    fontWeight: 300
                  },
                  '& inline': {
                    display: 'inline',
                    fontStyle: "italic",
                    color: '#070c46'
                  }
                }
              }
            }}
          >
            <Scrollbar
              className='scrollbar-activities'
              height="400px"
            >
              {categoryProfile.data?.date_logs.map((d, d_index) => {
                const { date, logs } = d;
                return (
                  <Fragment key={d_index}>
                    <List className='list-container'
                      subheader={
                        <ListSubheader component="div" id="nested-list-subheader" sx={{padding: 0}}>
                          {date}
                        </ListSubheader>
                      }
                    >
                      {logs.map((l, l_index) => {
                        const { content, created_at, department_code, user_avatar_url, user_fullname } = l;
                        return (
                          <Fragment key={l_index}>
                            {l_index === 0 ? <Divider /> : ""}
                            <ListItem button divider alignItems="flex-start" sx={{padding: '0 0 0 2px'}}>
                              <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={user_avatar_url || 'https://picsum.photos/200/300'} />
                              </ListItemAvatar>
                              <ListItemText
                                sx={{
                                  '& .MuiListItemText-secondary': {
                                    marginLeft: '-58px',
                                    marginTop: '8px',
                                  }
                                }}
                                primary={
                                  <Fragment>
                                    <Typography >
                                      {`${user_fullname} - ${department_code}`}
                                    </Typography>
                                    <span className='open-date'>
                                      {moment(created_at).format('DD/MM/YYYY HH:MM')}
                                    </span>
                                  </Fragment>
                                }
                                secondary={
                                  <Fragment>
                                    <Typography component="span" className='inline'>
                                      {content}
                                    </Typography>
                                  </Fragment>
                                }
                              />
                            </ListItem>
                          </Fragment>
                        );
                      })}
                    </List>
                  </Fragment>
                );
              })}
            </Scrollbar>
          </Tabs>
        </Box>
      </Box>
    </CardOutside>
  </Box>

}

export default FormsCategory;