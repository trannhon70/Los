import { FC, Fragment, useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import TitleSquare from 'views/components/layout/TitleSquare';
import CardInside from 'views/components/layout/CardInside';
// import Scrollbar from 'views/components/layout/Scrollbar';
import Label from 'views/components/base/Label';
import DownloadIcon from '@mui/icons-material/Download';
import Checkbox from 'views/components/base/Checkbox';
import { GrDocumentUpload } from 'react-icons/gr';
import IconButton from '@mui/material/IconButton';
import { BiChevronDownCircle } from 'react-icons/bi';
import Collapse from '@mui/material/Collapse';
import AttachmentDetail from './Detail';
import {
  DataFile,
  Document,
  ILOANNormalStorageIncomeDeclare,
  ILOANNormalStorageIncomeDeclareSalary,
} from 'types/models/loan/normal/storage/Income';
import { useParams } from 'react-router';
import { ILOANURLParams } from 'types/models/loan';
import { generateLOCALUUID, generateUUID, PREFIX_LOCAL } from 'utils';
import { urlToDeclare, urlToIncomeSource } from 'views/pages/LOAN/utils';
import { useDispatch, useSelector } from 'react-redux';
import { setIncomeSourceDocumentData, removeFile, downloadMultiAllFile } from 'features/loan/normal/storage/income/action';
import { getLOANNormalStorageIncomeDocumentSourceList } from 'features/loan/normal/storage/income/selector';
import attachmentStyleIncome from './style';
import * as _ from 'lodash';
import ModalConfirm from 'views/components/layout/ModalConfirm';

import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { getCurrentUser } from 'features/auth/store/slice';
import useNotify from 'app/hooks/useNotify';
import useMasterData from 'app/hooks/useMasterData';

export interface IncomeAttachmentProps {
  isTitle?: boolean;
  prefix?: string;
  dataDocument?: Document[];
  onChangeFile?(value: Document[]): void;
  isDisabled?: boolean;
}
const MASTER_ITEM = '<Parent>';
const SUB_ITEM = '<SubItem>';
const IncomeAttachment: FC<IncomeAttachmentProps> = props => {
  const {
    isTitle,
    prefix = '',
    isDisabled = false,
  } = props;
  const classes = attachmentStyleIncome()
  // const paramsRequest = "NGUON_THU/?type_loan=Loan";
  const dispatch = useDispatch();
  const params = useParams() as ILOANURLParams;
  const notify = useNotify()
  const { EnvGlobal, register } = useMasterData()
    
  useEffect(() => {
    register('envGlobal')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const incomeTypeURL = params['*'];
  const declareTypeURL = params.declare ?? '';
  const incomeType = urlToIncomeSource(incomeTypeURL) as keyof ILOANNormalStorageIncomeDeclareSalary;
  const declareType = urlToDeclare(declareTypeURL) as keyof ILOANNormalStorageIncomeDeclare;
  const ruleDisabled = useSelector(getRuleDisbled)
  const currentUser = useSelector(getCurrentUser)
  const StateDocument = useSelector(getLOANNormalStorageIncomeDocumentSourceList(declareType, params.uuid ?? '', incomeType));

  const inputChooseFileElement = useRef<HTMLInputElement>(null);
  const [openDetail, setOpenDetail] = useState<(string | number)[]>([]);
  const [selected, setSelected] = useState<Document[]>([]);
  const [documentId, setDocumentId] = useState<number | null>(null);
  const [visibledModal, setVisibledModal] = useState<{ id: string, docId: number } | null>(null);

  const acceptFileDocument = '.doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .txt';
  const acceptFileImage = '.jpg, .jpeg, .png, .gif, .bmp';

  useEffect(() => {
    const defaultOpen = _.get(_.first(_.filter(StateDocument, (o) => o.data_file.length > 0)), 'document_id');
    if (defaultOpen) setOpenDetail([defaultOpen]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickCollapse = (id: string | number) => () => {
    let temp = [...openDetail];
    let idx = temp.indexOf(id);
    if (idx === -1) {
      temp.push(id);
    } else {
      temp.splice(idx, 1);
    }
    setOpenDetail(temp);
  };

  const openDocumentGroup = (id: string | number) => {
    let temp = [...openDetail];
    let idx = temp.indexOf(id);
    if (idx === -1) {
      temp.push(id);
    }
    setOpenDetail(temp);
  }

  const handleCheckbox = (id: string) => (checked: boolean) => {

    if (id.includes(MASTER_ITEM)) {
      const idDoc = +id.replace(MASTER_ITEM, '');
      let currentDoc = StateDocument?.find((item) => item.document_id === idDoc);
      if (!currentDoc) return;
      const temp = [...selected];
      const isExist = selected.findIndex(item => item.document_id === idDoc);
      if (isExist === -1) {
        // const data= JSON.parse(JSON.stringify(currentDoc));
        const data = { ...currentDoc, data_file: [...currentDoc.data_file] };
        temp.push(data);
      } else {
        temp.splice(isExist, 1);
      }
      setSelected(temp);
      return;
    }
    let data = id.split(SUB_ITEM);
    const idxDoc = +data[0];
    const idxSubItem = data[1];
    const dataItem = JSON.parse(data[2]);
    const temp = [...selected];
    const currentDoc = temp.find(item => item.document_id === idxDoc);
    if (!currentDoc) {
      let stateDoc = StateDocument?.find((item) => item.document_id === idxDoc);
      if (stateDoc) {
        temp.push({
          document_id: stateDoc.document_id,
          document_name: stateDoc.document_name,
          document_type: stateDoc.document_type,
          data_file: [dataItem],
        })
      }
    } else {
      let existIdx = currentDoc.data_file.findIndex(item => item.uuid === idxSubItem);
      if (existIdx !== -1) {
        currentDoc.data_file = [...currentDoc.data_file.filter(item => item.uuid !== idxSubItem)];
      } else {
        currentDoc.data_file.push(dataItem);
      }
    }
    setSelected(temp);
  }

  const onHandlerForm = (document_id: number | string) => {
    if (document_id !== documentId) {
      setDocumentId(Number(document_id));
    }
  }

  const encodeBase64File = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result?.toString())
      };
      reader.onerror = reject;
    });
  }

  const changeChooseFile = async (_event: any, document_id: number | string) => {
    openDocumentGroup(document_id);
    const fileList = await _event.target.files;

    
    if (fileList && fileList?.length > 0) {
      let dataFile: DataFile[] = []
      for (let i = 0; i < fileList.length; i++) {
        await encodeBase64File(fileList[i] as File).then(data => {
          const currentTime = Number(new Date())/1000;
          const localUUID = generateLOCALUUID();
          dataFile.push(
            {
              uuid: localUUID,
              created_at: currentTime,
              created_by:  "",
              created_by_name:  "",
              name: fileList[i]?.name,
              content_type: fileList[i]?.type,
              file_upload: String(data as string),
              size: fileList[i]?.size,
              updated_at : currentTime, 
              updated_by: "", 
              updated_by_name: "", 
              custom_keys : {
                document_id: document_id,
                local_id: localUUID
              } 
            }
          )
        });
      }

      const acceptFiles: DataFile[] = [];
      const size  = Number(EnvGlobal.find(i => i.code === 'FILE_MAX_SIZE')?.value ?? 0)
      if(dataFile.some(e => e.size && e.size > size)){
        return notify(`Dung lượng file không được lớn hơn ${size/1024/1024}MB`,'error')
      }
      else {
        for (let i = 0; i < dataFile.length; i++) {
          await fetch(dataFile[i]?.file_upload ?? '')
            .then((res) => {
              acceptFiles.push(dataFile[i]);
            })
            .catch((error) => {
              console.log(error);
              notify('Không cho phép gửi file rỗng', 'warning');
            })
        }
        if (acceptFiles.length > 0) {
          dispatch(setIncomeSourceDocumentData(acceptFiles, {
            declare: declareType,
            document_id: Number(document_id),
            activeType: incomeType as keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource">
          }))
        }
      }
    }
  }

  const handleDeleteFile = (uuid: string, documentId: string | number) => {
    if (uuid && documentId) {
      dispatch(removeFile(uuid, {
        declare: declareType,
        document_id: +documentId,
        activeType: incomeType as keyof Omit<ILOANNormalStorageIncomeDeclareSalary, "uuidDeclare" | "activeIncomeSource">,
      }))
    }
  }

  const onChangeAll = (checked: boolean) => {
    if (checked) {
      const temp = JSON.parse(JSON.stringify(StateDocument));
      setSelected(temp);

    } else {
      setSelected([]);
    }
  }

  const onDownloadMultiAllFile = () => {
    let arr: any = [];
    selected.map((x: any) => {
      return (
        x.data_file.map((y: any) => {
          return (
            arr.push(y.uuid)
          )
        })
      )
    });
    dispatch(downloadMultiAllFile(arr));
  }

  const checkIndeterminate = (idDoc: number) => {
    const selectDoc = selected.find((item) => item.document_id === idDoc);
    const baseDoc = StateDocument?.find((item) => item.document_id === idDoc);
    if (!selectDoc || !baseDoc) return false;
    if (selectDoc.data_file.length === 0) return false;
    return !(selectDoc.data_file.length === baseDoc.data_file.length);
  }

  const checkIndeterminateAll = (): 'indeterminate' | 'all' | null => {
    if (selected.length === 0) return null;
    let countSelect = 0;
    StateDocument?.forEach(item => {
      const selectDoc = selected.find((it) => it.document_id === item.document_id);
      if (selectDoc) {
        const baseLength = item.data_file.length;
        if (baseLength === selectDoc.data_file.length) {
          countSelect++;
        }
      }
    })
    if (countSelect === 0) return null;
    return (StateDocument?.length === countSelect) ? 'all' : 'indeterminate';
  }
  const statusAll = checkIndeterminateAll();

  const handleOnCloseModal = () => {
    setVisibledModal(null);
  }

  const onHandleDeleteFile = () => {
    if (!visibledModal) return;
    const { docId, id } = visibledModal;
    handleDeleteFile(id, docId);
    handleOnCloseModal();
  }

  const renderAccept = (type: any) => {
    let accept = '';
    switch (type) {
      case 'DOCUMENT':
        accept = acceptFileDocument;
        break;
      case 'IMAGE':
        accept = acceptFileImage;
        break;

      default:
        break;
    }
    return accept;
  }

  const renderAttachmentGroup = () => {
    return <Box>
      {
        StateDocument && StateDocument.map((d, index) => {
          let isOpen = openDetail.includes(d.document_id);
          let currentSelected = selected.find(item => item.document_id === d.document_id);
          return (
            <Fragment key={d.document_id}>
              <Box className="flex items-center justify-between " sx={{ 
                mr: '-8px', 
                lineHeight: '2rem',
                '& .MuiTypography-root':{
                  fontWeight: 500
                } 
              }}>
                <Label bold color={d.data_file.length > 0 ? 'var(--mscb-primary)' : 'var(--mscb-secondary)'}>
                  <Checkbox
                    sx={{
                      '& label': {
                        marginLeft: '0!important',
                      }
                    }}
                    isIndeterminate={!!checkIndeterminate(d.document_id)}
                    checked={currentSelected && (currentSelected.data_file.length === d.data_file.length)}
                    onChecked={handleCheckbox(MASTER_ITEM + d.document_id.toString())}
                  >
                    {`${index + 1}. ${d.document_name}`}
                  </Checkbox>
                </Label>
                <Box className="flex items-center">
                  <Box
                    className="flex items-center"
                    sx={{
                      cursor: 'pointer',
                      fontSize: '13px',
                      borderRight: '1px solid #d8d8d8',
                      pr: '12px',
                      color: 'var(--mscb-primary)',
                      transition: 'all ease 0.3s',
                      '&:hover': {
                        color: 'var(--mscb-primary)'
                      },
                      '& svg': {
                        color: 'var(--mscb-primary)'
                      },
                      '& span': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    <Box
                      className="flex items-center"
                      sx={{
                        fontSize: '13px',
                      }}
                      onClick={() => onHandlerForm(d.document_id)}
                    >
                      {!ruleDisabled ? <GrDocumentUpload className="mr-1" /> : null}
                      <label className="flex items-center" >
                        {!ruleDisabled ? <span>Tải lên tập tin</span> : null}
                        <input
                          type="file"
                          ref={inputChooseFileElement}
                          hidden={true}
                          className={isDisabled ? "hidden" : "input-hidden hidden file"}
                          multiple
                          onChange={(event) => {
                            changeChooseFile(event, d.document_id);
                            // this code clear data file after choose file
                            setTimeout(() => {
                              event.target.value = '';
                            }, 1000);
                          }}
                          disabled={isDisabled}
                          accept={renderAccept(d.document_type)}
                        />
                      </label>
                    </Box>
                  </Box>
                  <IconButton
                    color={d.data_file.length > 0 ? 'primary' : 'secondary'}
                    sx={{
                      '& svg': {
                        transition: 'all ease 0.3s',
                        ...(isOpen ? {} : { transform: 'rotate(-90deg)' }),
                        fontSize: '24px',
                      }
                    }}
                    onClick={clickCollapse(d.document_id)}
                  >
                    <BiChevronDownCircle />
                  </IconButton>
                </Box>
              </Box>
              <Collapse in={isOpen}>
                <Box
                  sx={{
                    '& .mscb-attachment-detail': {
                      '&:last-child': {
                        '& .mscb-attachment-detail-info': {
                          borderBottom: 'none!important',
                          pb: '0!important'
                        }
                      }
                    }
                  }}
                >
                  {
                    d.data_file.map(df => {
                      return <AttachmentDetail
                        dataFile={df}
                        key={df.uuid}
                        checked={currentSelected && !!currentSelected.data_file.find(item => item.uuid === df.uuid)}
                        onChecked={handleCheckbox(`${d.document_id}${SUB_ITEM}${df.uuid}${SUB_ITEM}${JSON.stringify(df)}`)}
                        onDeleteFile={(idFile) => setVisibledModal({ id: idFile, docId: d.document_id })}
                      />
                    })
                  }
                </Box>
              </Collapse>
            </Fragment>
          )
        })
      }
    </Box>
  }

  return <Fragment>
    <Box className="h-full flex-column pt-6" style={{ borderBottom: "1px soolid #DCDCDC" }}>
      {
        isTitle ?
          <TitleSquare>{prefix} Tài liệu đính kèm</TitleSquare> :
          <Label bold>{prefix} Tài liệu đính kèm</Label>
      }

      <Box className="h-full">
        <CardInside
          classBody="h-full pb-5 pr-0"
          sx={{
            height: 'calc(100% - 20px)',
            '& .card-inside-body': {
              padding: 0
            }
          }}
        >
          <Box className="flex items-center">
            <div style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              backgroundColor: 'rgb(242, 243, 249)',
              padding: '10px 20px'
            }}>
              <Checkbox sx={{
                '& label': {
                  marginLeft: '0!important'
                }
              }}
                isIndeterminate={statusAll === 'indeterminate'}
                checked={statusAll === 'all'}
                onChecked={onChangeAll}
              > Chọn tất cả </Checkbox>
              <div className={`flex items-center ${selected?.length > 0 ? classes.downloadMulti : classes.disabledDownloadMulti}`} onClick={onDownloadMultiAllFile}>
                <DownloadIcon className="mr-1" />
                <span className="downloadAll">Tải xuống tập tin</span>
              </div>
            </div>
          </Box>
          {/* <Scrollbar> */}
          <Box className="pr-6 pl-5">
            {renderAttachmentGroup()}
          </Box>
          {/* </Scrollbar> */}
        </CardInside>
      </Box >
      <ModalConfirm open={Boolean(visibledModal)} onClose={handleOnCloseModal} onConfirm={onHandleDeleteFile}>
        <Box className="text-18 font-medium text-primary text-center">
          Bạn có chắc chắn muốn xóa file ?
        </Box>
      </ModalConfirm>
    </Box >

  </Fragment>
}

export default IncomeAttachment;