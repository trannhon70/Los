import Box from '@mui/material/Box';
import clsx from 'clsx';
import {
  callColtrolClose,
  callControlReject,
} from 'features/loan/normal/storageControl/action';
import { ETypeButton, ETypeButtonBarRole } from 'features/loan/normal/storageControl/case';
import { checkRoleButtonBar } from 'features/loan/normal/storageGuide/selector';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ILOANURLParams } from 'types/models/loan';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import FormsCategory from 'views/pages/LOAN/widgets/Forms/Category';
import FormsMetadata from 'views/pages/LOAN/widgets/Forms/Metadata';
import FormsPDFViewer from 'views/pages/LOAN/widgets/Forms/PDFViewer';
import ModalAcceptOfficial from 'views/pages/LOAN/widgets/ModalAcceptOfficial';
import ModalReturnInit from 'views/pages/LOAN/widgets/ModalReturnInit';
import formsStyle from './style';


const FormsComponent: FC = () => {

  const classes = formsStyle();
  const dispatch = useDispatch();
  const navigate =  useNavigate();
  const params =  useParams() as ILOANURLParams;
  const [isConfim, setIsConfirm] = useState<string | null>(null);
  const [isModalReturnInit, setIsModalReturnInit] = useState<boolean>(false);
  const [isModalAcceptOfficial, setIsModalAcceptOfficial] = useState<boolean>(false);
  // const [ isConfirmClose, setIsConfirmClose ] = useState<string | null>(null);

  const checkStateGuide = useSelector(checkRoleButtonBar)

 

  const generaterTitleConfirm = (nameAction: string | null) => {
    let nameDefault: string | null = null;
    switch (nameAction) {
      case ETypeButton.close:
        nameDefault = "Bạn có chắc chắn muốn đóng hồ sơ này"
        break;
      case ETypeButton.reject:
        nameDefault = "Bạn có chắc chắn muốn từ chối hồ sơ này"
        break;
      case ETypeButton.apply:
        nameDefault = "Bạn có chắc chắn muốn trình hồ sơ này"
        break;
      case ETypeButton.accept_unofficial:
        nameDefault = "Bạn có chắc chắn muốn phê duyệt nguyên tắc hồ sơ này"
        break;
      case ETypeButton.accept_official:
        nameDefault = "Bạn có chắc chắn muốn phê duyệt chính thức hồ sơ này"
        break;
      case ETypeButton.deny_official:
        nameDefault = "Bạn có chắc chắn muốn từ chối chính thức hồ sơ này"
        break;
      case ETypeButton.deny_unofficial:
        nameDefault = "Bạn có chắc chắn muốn từ chối nguyên tắc hồ sơ này"
        break;
    }

    return nameDefault;
  }

  const onHandleCancelConfirm = () => setIsConfirm(null);

  const onHandleConfirm = () => {
    switch (isConfim) {
      case ETypeButton.close:
        dispatch(callColtrolClose({title:"Biểu mẫu",position:ETypeButtonBarRole.FORM}))
        break;
      case ETypeButton.reject:
        dispatch(callControlReject({title:"Biểu mẫu",position:ETypeButtonBarRole.FORM}))
        break;
      case ETypeButton.apply:
        // dispatch(callInitApply({title:"Biểu mẫu",position:ETypeButtonBarRole.FORM}))
        break;
    }

    setIsConfirm(null)
  };

  const onHandleCloseReturnInnit = () => setIsModalReturnInit(false);

  const onHandleSaveReturnInit = () => {
    setIsModalReturnInit(false);
  }

  const onHandleCloseAcceptOfficial = () => setIsModalAcceptOfficial(false);

  const onHandleSaveAcceptOfficial = () => setIsModalAcceptOfficial(false);
  // const onBack = () => {
  //   navigate(`/loan/normal/appraisal-approval/${params.id}/appraisal-add/notice`);
  // }
  // const onExit = () => {
  //   navigate("/");
  // };


  return <Box className={clsx(classes.root, 'mt-6')}>
    <Box className="flex justify-between">
      <FormsCategory />
      <FormsPDFViewer />
      <FormsMetadata />
    </Box>
    {/* <Box className='mt-5 mb-6'>
      <Divider className="my-6" />
      <ButtonBarRole
        isApply={false}
        hideContinue={false}
        hideSave={false}
        hideBack={!isDisabledClose}
        hideDelete={isDisabledClose}
        hideExit={isDisabledClose}
        // onExit={onExit}
        onBtnMenu={onClickApply}
        onBack={onBack}
      />
    </Box> */}

    <ModalAcceptOfficial
      open={isModalAcceptOfficial}
      onClose={onHandleCloseAcceptOfficial}
      onSave={onHandleSaveAcceptOfficial}
    />

    <ModalReturnInit
      open={isModalReturnInit}
      onClose={onHandleCloseReturnInnit}
      onSave={onHandleSaveReturnInit}
    />

    <ModalConfirm
      open={isConfim !== null}
      onClose={onHandleCancelConfirm}
      onConfirm={onHandleConfirm}
    >
      {
        (() => {
          const titleConfirm = generaterTitleConfirm(isConfim);
          return (
            <>
              <Box className="text-18 font-medium text-primary text-center">
                {titleConfirm}
              </Box>
              {
                isConfim !== ETypeButton.close && 
                isConfim !== ETypeButton.apply &&
                isConfim !== ETypeButton.accept_unofficial &&
                isConfim !== ETypeButton.accept_official &&
                isConfim !== ETypeButton.deny_official &&
                isConfim !== ETypeButton.deny_unofficial &&
                <Box className="text-14 text-secondary text-center" sx={{ fontStyle: "italic" }}>
                  Nếu bạn hủy dữ liệu sẽ không thể khôi phục
                </Box>
              }
            </>
          )
        })()
      }
    </ModalConfirm>
  </Box>

}

export default FormsComponent;