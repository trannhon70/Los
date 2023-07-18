import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { setPersonActivePosition } from 'features/loan/normal/storageApproval/cic/actions';
import { getAttachFileData, getListPerson, getPersonActivePosition, getCICFull, getListAdditionalDeclareCICDocumentData, getListMainDeclareCICDocumentData} from 'features/loan/normal/storageApproval/cic/selectors';
import { FC, Fragment, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAllObjectDocumentData, ICICDocumentInfoAPI } from 'types/models/loan/normal/storageApproval/CIC';
import ObjectList, { ObjectListOption } from 'views/components/layout/ObjectList';
import AttachmentFullCIC from 'views/pages/LOAN/widgets/AttachmentCICAll';
import * as _ from 'lodash';
import { ILOANURLParams } from "types/models/loan";
import { useParams } from "react-router";
import { useS2ConvertCICAttach } from "features/loan/normal/storageApproval/cic/handleData";
export interface UserListProps {
  userName?: string,  
  additional?: boolean
}

const UserList: FC<UserListProps> = (props) => {
  const { userName = '', additional} = props;
  const dispatch= useDispatch()
  const listPerson = useSelector(getListPerson)
  const positionActive = useSelector(getPersonActivePosition)
  const attachFileData = useSelector(getAttachFileData)
  const [attachDataOpen, setOpenAttach] = useState<{open:boolean,uuid:string}>({open:false,uuid:''});
  const listUsersMain = useSelector(getListMainDeclareCICDocumentData);
  const listUsersAdditional = useSelector(getListAdditionalDeclareCICDocumentData);
// listUsers
const dataFUllCIC = useSelector(getCICFull());

const { listUsers } = useS2ConvertCICAttach(dataFUllCIC);
  const params = useParams() as unknown as ILOANURLParams;
  const declare = params.declare ;

  const findUser = (uuid: string, attachFileData : IAllObjectDocumentData) => {
    for (let i = 0; i < Object.keys(attachFileData).length ; i++) {
      const find = attachFileData[Object.keys(attachFileData)[i]].findIndex(e => e.uuid === uuid)
      if(find !== -1) {
        return attachFileData[Object.keys(attachFileData)[i]][find]
      }
    }
  }

  const optionsListData :ObjectListOption[] = listPerson?.map((item)=>({
    label: item.detail?.full_name ? item.detail.full_name : "-",
    attachment: findUser(item.detail.person_uuid, attachFileData)?.total ?? 0,
    circle: <AccountCircleIcon />,
  })) ?? [];

  const onChangeActive = (next: number) => {
    dispatch(setPersonActivePosition(next))
  } 
  const handleOpenAttach = (index: number) => {  
    const uuid = _.get(listPerson,[index,'detail','person_uuid'],'');
    if(!uuid) return;
    setOpenAttach({uuid,open:true});
  }

  return <Fragment>
    <ObjectList
      labelLength={`Số lượng ${userName}:\u00A0`}
      current={!!~positionActive ? positionActive : 0}
      avatar
      options={optionsListData}
      enableMenu={false}
      enableAdd={false}
      onChange={onChangeActive}
      attachLabel="Tập tin"
      onAttach={handleOpenAttach}
      menuWidth='110px'
      sx={{
        '& .MuiButtonBase-root': {
          marginLeft: '14px!important',
        },
        '& .object-list-label-container': {
          display: 'flex',
          alignItems: 'center',
          borderColor: 'transparent',
          marginTop: 'unset !important',
          paddingLeft: 'unset !important',
          color: '#1e1d27',
          '& .object-list-label': {
            textDecoration: 'underline'
          },
          '& .object-list-number': {
            mt: 0,
            fontSize: 'var(--mscb-fontsize)',
            color: '#1e1d27',
            fontWeight: 400,
            textDecoration: 'underline'
          }
        },
        '& .object-list-box': {
          marginLeft: 0,
          flexDirection: 'row',
          width: '215px',
          justifyContent: 'flex-start',
          border: '1px solid #707070',
          pt: 0,
          px: 2,
          '& div:last-child':{
            marginLeft:"57px",
            marginBottom:"13px"
          },
          '& .object-list-box-name': {
            '& div:last-child':{
              marginLeft:"0px !important",
              marginBottom:"0px !important"
            },
          },
        },
        '& .object-list-box-name': {
          ml: 2,
          marginBottom:"18px"
        },
        '& .Mui-selected': {
          '& .object-list-box': {
            borderColor: 'var(--mscb-danger)'
          }
        },

        '& .object-list-add': {
          maxWidth: '230px',
          minWidth: '230px',
          justifyContent: 'center',
          '& .object-list-box': {
            width: '100%',
            justifyContent: 'center',
            borderColor: 'var(--mscb-primary)',
          },
          '& .object-list-box-name': {
            display: 'none'
          },
          '& .object-list-circle': {
            backgroundColor: 'transparent!important',
            borderColor: 'transparent!important',
            '& svg': {
              color: 'var(--mscb-primary)'
            }
          }
        }
      }}
    />
    {/* <AttachmentModalApprovalCIC 
      open={isOpen} 
      onClose={() => setOpenAttach(false)} 
      attachData={attachData}
    /> */}
     {attachDataOpen.open && 
      <AttachmentFullCIC
        open={attachDataOpen.open}
        uuidActive={attachDataOpen.uuid}
        onClose={()=>setOpenAttach({uuid:'', open:false})}
        listUsers={!!additional ? listUsersAdditional : listUsersMain}
      />
    }
  </Fragment>

}

export default UserList;