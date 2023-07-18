import { FC, useState, memo, useEffect } from 'react';
import { BsFolderFill } from 'react-icons/bs';
import { GoFile } from 'react-icons/go';
import Box from '@mui/material/Box';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import CategoryItemOptions from './CategoryItemOptions';
import { IProfileListCategoryProfile } from 'types/models/loan/normal/storage/Forms';
import { getLOANNormalTemplateFile, getLOANNormalTemplateFileActiveTemplate, getLOANNormalTemplateFileByActiveTemplate } from 'features/loan/normal/storage/forms/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLOANNormalFormsData, setActiveTemplateFile } from 'features/loan/normal/storage/forms/actions';
import { IQueryParamsFormData } from 'features/loan/normal/storage/forms/api';
import { getLOANNormalLOSuuid } from 'features/loan/normal/storage/selectors';
import useBackdrop from 'app/hooks/useBackdrop';

const FormsCategoryGroup: FC<Omit<IProfileListCategoryProfile, 'profile_type_id'>> = props => {
  const { profile_type_list, profile_type_name, template_code } = props;
  const dispatch = useDispatch()

  const [openSub, setOpenSub] = useState(true);
  const { showBackdrop } = useBackdrop()

  const toggleSub = () => setOpenSub(!openSub);
  const active = useSelector(getLOANNormalTemplateFileActiveTemplate)
  const los_uuid = useSelector(getLOANNormalLOSuuid)
  const data = useSelector(getLOANNormalTemplateFile)
  return <List className="py-0">
    <ListItemButton className="pl-0 py-2" sx={{ borderBottom: '1px solid #9ea7ff' }} onClick={toggleSub}>
      <ListItemIcon
        className="items-center"
        sx={{
          minWidth: '48px',
          '& .forms-category-icon-folder': {
            fontSize: '1.15rem'
          }
        }}
      >
        <KeyboardArrowUpOutlinedIcon
          sx={{
            transition: 'transform ease-in-out 0.3s',
            transform: openSub ? undefined : 'rotate(180deg)',
            fontSize: '1rem'
          }}
        />
        <BsFolderFill className="forms-category-icon-folder ml-1" style={{ color: '#688fdb' }} />
      </ListItemIcon>
      <ListItemText primary={profile_type_name} className="text-primary font-medium" />
    </ListItemButton>
    <Collapse in={openSub} className="pl-6">
      <CategoryItemOptions
        className="mscb-forms-category"
        options={
          profile_type_list.map((p, p_index) => {
            return ({
              activatedIcon: p.profile_id === active?.id,
              value: p.profile_id,
              label: <Box className="flex items-center mscb-forms-category-label">
                <span className="mr-1">{`${p_index+1}. `}</span>
                <GoFile className="mr-1" style={{ fontSize: '1.125rem' }} />
                <span className="mscb-forms-category-text">{p.profile_name + ' ' + (p_index + 1)}</span>
              </Box>,
            });
          })
        }
        onChange={(cr)=>{
          // set active
          dispatch(setActiveTemplateFile(cr as string))
          // call api fetch
          showBackdrop()
          dispatch(fetchLOANNormalFormsData({
            los_uuid: los_uuid,
            id: cr,
            template_type: template_code
          } as IQueryParamsFormData));

          
        }}
        sx={{
          py: 0,
          '&.mscb-forms-category': {
            '& .MuiListItem-root': {
              borderBottom: 'none'
            },
            '& .mscb-option-list-checked .MuiTypography-root': {
              color: 'var(--mscb-primary)!important',
              fontWeight: '500!important'
            },
            '& .mscb-forms-category-label': {
              minHeight: '40px'
            },
            '& .MuiListItemButton-root': {
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 0,
              flex: 1
            },
            '& .MuiListItemText-root': {
              maxWidth: 'calc(100% - 19px)',
              height: '38px'
            },
            '& .MuiListItemIcon-root': {
              minWidth: '16px',
              '& .MuiSvgIcon-root': {
                fontSize: '19px'
              }
            },
            '& .mscb-forms-category-text': {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }
          }
        }}
      />
    </Collapse>
  </List>

}

export default memo(FormsCategoryGroup);