import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { TreeItem, TreeView } from "@mui/lab";
import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Typography } from "@mui/material";
import FolderIcon from "assets/images/folder.png";
import { getLOANNormalFormCategoryProfile, getLOANNormalTemplateFile } from "features/loan/normal/storage/forms/selectors";
import moment from "moment";
import React, { Fragment, useRef } from "react";
import ScrollBar from 'react-custom-scrollbars-2';
import { FaRegFileAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import CardOutside from "views/components/layout/CardOutside";
import Scrollbar from "views/components/layout/Scrollbar";
import Tabs from "views/components/layout/Tabs";
import Radio, { RadioRef } from "./Radio";
import { colorPath, root, rowLine } from "./style";

const Category: React.FC = () => {
  const CategoryRef = useRef<RadioRef>(null);
  const onChangeSelected = () => { };
  // const cifApproveInfo = useSelector(CifApproveInfo)
  const categoryProfile = useSelector(getLOANNormalFormCategoryProfile);
  const templateFolder = useSelector(getLOANNormalTemplateFile);

  const totalFile = templateFolder?.folder?.reduce((prev, cur) => {
    return prev + (cur?.children?.length ?? 0)
  },0)

  return (
    <Box sx={root}>
      <CardOutside label="BIỂU MẪU" sx={ {'& > .mscb-outside-card-content':{paddingRight:'0px'}}}>
        <Box className="container">
          <ScrollBar style={{ height: '100%' }} className="scroll-container">
            {templateFolder?.folder?.map(folder => (
              <TreeView
                key={`folder-${folder.name}`}
                defaultCollapseIcon={[
                  <div style={{display:'flex',alignItems: 'center', marginLeft:'5px'}}><ExpandLessIcon/></div>,
                  <img src={FolderIcon} alt="" className="iconCollapse" />,
                ]}
                defaultExpandIcon={[
                  <div style={{display:'flex',alignItems: 'center', marginLeft:'5px'}}><ChevronRightIcon fontSize="large" /></div>,
                  <img src={FolderIcon} alt="" className="iconCollapse" />,
                ]}
                defaultExpanded={[templateFolder.folder[0].name]}
                sx={{
                  height: 240,
                  flexGrow: 1,
                  maxWidth: 600,
                  overflowY: "auto",
                }}
              >
                <TreeItem
                  nodeId={`${folder.name}`}
                  label={folder.name}
                  className="label"
                >
                  <Radio
                    required
                    position="start"
                    row={false}
                    variant="checkbox"
                    options={folder.children.map(file => ({
                      key: file.id,
                      value: file.template_code,
                      label: file.template_code,
                      disabled: !file.actived_flag,
                      version: file.fill_data_history_id,
                      template_uuid: file.id,
                      actived_flag: file.actived_flag,
                      approved_flag: file.approved_flag
                    }))}
                    name={folder.name}
                    ref={CategoryRef}
                    onChange={onChangeSelected}
                    islabelIcon={true}
                    labelIcon={<FaRegFileAlt className="radio-icon" />}
                  />
                </TreeItem>
              </TreeView>
            ))}
          </ScrollBar>
        </Box>
        <div style={{marginRight:'21px'}}>
        <div style={{display: 'flex', alignItems:'center'}}>
        <span>
          Tổng số biểu mẫu đã duyệt
        </span>
        <Box sx={{alignItems: 'center'}} className="boxResult">0/{totalFile}</Box>
        </div>
        </div>
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
        {/* <ApprovalProcess /> */}
      </CardOutside>
    </Box>
  );
};
export default Category;
