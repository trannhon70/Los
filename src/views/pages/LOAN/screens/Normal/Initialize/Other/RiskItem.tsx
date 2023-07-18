import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import useNormalOtherMessage from 'app/hooks/useNormalOtherMessage';
import Edit from 'assets/images/edit.png';
import { deleteRiskType, setMeasuresLimitRisk, setRiskType } from 'features/loan/normal/storage/other/action';
import { getAnalysis } from 'features/loan/normal/storage/other/selectors';
import { FC, Fragment, useEffect, useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { ILOANNormalStorageRisksGroup } from 'types/models/loan/normal/storage/Other';
import Input from 'views/components/base/Input';
import ModalConfirm from 'views/components/layout/ModalConfirm';
import SelectRiskType from 'views/components/widgets/SelectRiskType';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import useBackdrop from 'app/hooks/useBackdrop';
import TextArea  from 'views/components/base/TextArea';

export interface RiskItemProps {
  data: ILOANNormalStorageRisksGroup;
  stt: number;
}

const RiskItem: FC<RiskItemProps> = (props) => {

  const { data, stt } = props;

  const { showBackdrop } = useBackdrop()
  const dispatch = useDispatch();
  const dataAnalysis = useSelector(getAnalysis);
  const getMessage = useNormalOtherMessage();
  const [disabled, setDisabled] = useState<boolean>(false) ;
  const [isModalConfirm, setIsModalConfirm] = useState<boolean>(false);
  const [ message, setMessage] = useState('');
  const ruleDisabled = useSelector(getRuleDisbled)

  const handleEdit = () => {
    if(disabled === false){
      setDisabled(true);
    }else {
      setDisabled(false)
    }
  }


  useEffect(() => {
    if (data.displayOrder === 1){
      setDisabled(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.displayOrder])


  const handleChangeRiskType = (value: string) => {
    const isEsixt = dataAnalysis.risksGroup.find(a => a.riskInfo === value)

    if (isEsixt) {
      setMessage("Loại rủi ro này đã được cập nhật");
    }else{
      setMessage("");
    }
    dispatch(setRiskType(value, { dataRiskType: data }))
    
  }
  const changeMeasuresLimitRisk = (value: string) => dispatch(setMeasuresLimitRisk(value, {uuid: data.uuid}));

  
  const handleDelete = () => {
    setIsModalConfirm(!isModalConfirm);
  }

  const onHandleCancelConfirm = () => {
      setIsModalConfirm(!isModalConfirm);
  }

  const onHandleConfirm = () =>{
    showBackdrop(true)
    dispatch(deleteRiskType(data.uuid))
    setIsModalConfirm(!isModalConfirm);
  }

  return <Fragment>
    <TableRow sx={{
      // borderBottom: '1px solid rgba(224, 224, 224, 1) !important',
      '&:last-child': {
        '& td': {
          borderBottom: 'unset !important'
        }
      }
    }}>
      <TableCell width="185px" className="pl-0" sx={{
        verticalAlign: "top",
        "& .ellipsis": {
          'color': 'var(--mscb-secondary) !important',
        }

      }}>
        <SelectRiskType
          label="1. Loại rủi ro"
          onChange={handleChangeRiskType}
          value={data.riskInfo}
          message={getMessage('riskInfo', { position: stt }) || message}
          disabled={disabled || ruleDisabled}
          required
        />
      </TableCell>
      <TableCell className="pr-0">
        <TextArea
          label="2. Biện pháp hạn chế rủi ro"
          onDebounce={changeMeasuresLimitRisk}
          value={data.measuresLimitRisk}
          message={getMessage('measuresLimitRisk', { position: stt })}
          disabled={disabled || ruleDisabled}
          required
          maxlength={500}
        />
      </TableCell>
      <TableCell width="72px" className="px-0" sx={{verticalAlign: "top"}}>
        <Box className="flex h-full" sx={{ pt: '30px', '& svg': { color: 'primary.main' } }}>
          <IconButton onClick={() => handleEdit()} disabled={ruleDisabled}>
          <img src={Edit} alt="edit" />
          </IconButton>
          <IconButton sx={{ width: '36px' }} onClick={() => handleDelete()} disabled={ruleDisabled}>
            <IoTrashOutline style={{fontSize: '1.5rem'}}/>
          </IconButton>
        </Box>
      </TableCell>

    </TableRow>
    <ModalConfirm
      open={isModalConfirm}
      children="Bạn có chắc chắn muốn xóa loại rủi ro này"
      labelConfirm="Xác nhận"
      labelCancel="Hủy"
      onClose={onHandleCancelConfirm}
      onConfirm={onHandleConfirm}
    />
  </Fragment>
}

export default RiskItem;