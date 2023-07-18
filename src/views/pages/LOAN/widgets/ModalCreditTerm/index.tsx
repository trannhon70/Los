import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import useNotify from 'app/hooks/useNotify';
import { deleteLOANNormalCreditTerm } from 'features/loan/normal/storage/forms/actions';
import { getRuleEditCreditTerm } from 'features/loan/normal/storage/forms/selectors';
import { ValidateCreditTerm } from 'features/loan/normal/storage/forms/validate';
import _, { cloneDeep } from 'lodash';
import { FC, useEffect, useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { IConditionDetail, IConditions, ICreditTerm } from 'types/models/loan/normal/storage/Forms';
import { generateLOCALUUID, PREFIX_LOCAL } from 'utils';
import Input from 'views/components/base/Input';
import TextTooltip from 'views/components/base/TextTooltip';
import CardInside from 'views/components/layout/CardInside';
import Modal from 'views/components/layout/Modal';
import ModalConfirm from 'views/components/layout/ModalConfirm';

export interface ModalApply {}

export interface IConditionPosition {
  role: string,
  conType: string,
  index: number,
  uuid: string
}
export interface IModalCreditTermProps {
  open: boolean;
  onClose?: () => void;
  onSave?: (data : IConditions, role: string) => void;
  role?: string;
  data: ICreditTerm;
}

const ModalCreditTerm: FC<IModalCreditTermProps> = (props) => {
  const { open, onClose, onSave, role, data } = props;
  const isControlRole = role === 'CONTROLLER_BRANCH';
  const isApproveRole = role === 'APPROVER_BRANCH';
  const roleType = isControlRole ? 'idea_controller' : 'idea_approver';

  const dispatch = useDispatch()
  const notify = useNotify()
  const [localData, setLocalData] = useState<ICreditTerm>(data);
  const [uuidInvalid, setUuidInvald] = useState<string>("")
  const [deleteCondition, setDeleteCondition] = useState<IConditionPosition | null>(null)

  const getRuleEdit = useSelector(getRuleEditCreditTerm)
  
  useEffect(() => {
    if(localData !== data){
      setLocalData(data)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data])


  const handleClose = () => onClose && onClose();
  
  const handleSave = () => {
    const validate = ValidateCreditTerm.creditTerm(localData, roleType)
    setUuidInvald(validate.uuid)
    if(validate.valid){
      onSave && onSave(isControlRole ? localData.idea_controller : localData.idea_approver, roleType);
    }
    else {
      notify("Thông tin nhập liệu không hợp lệ. Vui lòng kiểm tra lại", "error")
      return
    }
  }

  const handleChangeNote = (position: {
    role: string,
    conType: string,
    index: number
  }) => (value: string) => {

    const newData = cloneDeep(localData)
    _.set(newData, [position.role, position.conType, `${position.index}`, 'note'], value)
    setLocalData(newData)
  }

  const handleRemoveCondition = (position: IConditionPosition) => () => {
    setDeleteCondition(position)
  }

  const handleConfirmRemoveCondition = () => {
    if(deleteCondition){
      onRemoveCondition(deleteCondition)
    }
    setDeleteCondition(null)
  }

  const onRemoveCondition = (position: {
    role: string,
    conType: string,
    index: number,
    uuid: string
  }) => {
    if(position.uuid.includes(PREFIX_LOCAL)){
      const newData = cloneDeep(localData)
      _.remove((_.get(newData, [position.role, position.conType])), function(n : IConditionDetail) {
        return n.uuid === position.uuid
      })
      setLocalData(newData)
      notify("Xóa thành công", "success")
    }
    else {
      dispatch(deleteLOANNormalCreditTerm(position))
    }
  }
  
  const handleAddCondition = (position: {
    role: string,
    conType: string,
  }) => () => {

    const conTypeCode = position.conType === "pre_disbursement_conditions" ? "PRE_CON" : "AFTER_CON";
    const roleCode = position.role === "idea_controller" ? "S1_CTRL" : "S1_APPR";

    const newData = cloneDeep(localData)
    const newListCon = _.concat((_.get(newData, [position.role, position.conType])), [{
      uuid: generateLOCALUUID(),
      note: '',
      disb_def_type: conTypeCode,
      prog_rule_type: roleCode
    }])

    _.set(newData, [position.role, position.conType], newListCon)
    setLocalData(newData)
  }
  const getMessage = (uuid: string) => {
    return uuidInvalid === uuid ? "Vui lòng nhập thông tin" : ""
  }
    
  return (
    <Modal
      open={open}
      onClose={handleClose}
      isStatic
      sx={{
        '& .MuiPaper-root': {
          minHeight: '430px',
          minWidth: '900px',
          position: 'relative',
          borderRadius: 0,
          '& .MuiDialogContent-root': {
            padding: '16px 24px',
            borderBottom: 'unset !important',
          },
          '& .MuiDialogActions-root': {
            padding: '0px 24px 30px 24px',
          },
        },
      }}
      footer={
        <Box className="pt-2">
          <Button
            variant="contained"
            color="error"
            className={`mr-3`}
            style={{ borderRadius: 'unset', minWidth: 100 }}
            onClick={handleClose}
          >
            HỦY
          </Button>
          {
            (getRuleEdit.control || getRuleEdit.approval) && <Button
            variant="contained"
            color="primary"
            style={{ borderRadius: 'unset', minWidth: 100 }}
            onClick={handleSave}
            >
              LƯU
            </Button>
          }
          
        </Box>
      }
    >
      <Grid container xs={12}>
        <Grid item xs={10}>
          <TextTooltip
            sx={{ fontSize: '18px', fontWeight: '500', color: '#1825aa' }}
          >
            ĐIỀU KIỆN CTD
          </TextTooltip>
        </Grid>
        <Grid item xs={2} sx={{ textAlign: 'end', paddingRight: '10px' }}>
          <IconButton
            onClick={handleClose}
            color="error"
            sx={{
              position: 'absolute',
              right: '0.8rem',
              top: '0.5rem',
              marginRight: '10px',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
      <CardInside title="I. Ý kiến CKS">
        <Grid container className="pl-4 pb-4">
          <Grid className="mb-3" item xs={12}>
            <Typography variant="h6" className="text-14">1. Điều kiện trước giải ngân <span className="text-danger">(*)</span> </Typography>
            {
              localData?.idea_controller?.pre_disbursement_conditions?.map((con, index) => (
                  <Box key={con.uuid} className="flex mb-3 items-start">
                    <Input
                      maxlength={1000}
                      disabled={!getRuleEdit.control}
                      className="mt-2"
                      value={con.note}
                      onChange={handleChangeNote({
                        role: 'idea_controller',
                        conType: "pre_disbursement_conditions", 
                        index
                      })}
                      message={getMessage(con.uuid)}
                    />
                    {getRuleEdit.control && (
                      <IconButton 
                        className="ml-3 mt-2" 
                        onClick={handleRemoveCondition({
                          role: 'idea_controller',
                          conType: "pre_disbursement_conditions", 
                          index,
                          uuid: con.uuid
                        })}
                        >
                        <IoTrashOutline
                          style={{
                            fontSize: '1.5rem',
                            color: 'var(--mscb-primary)',
                          }}
                        />
                      </IconButton>
                    )}
                  </Box>
                )
              )
            }
            {
              getRuleEdit.control && (
              <Grid item xl={12} md={12} xs={12}>
                <Box className="flex justify-end">
                  <Button
                    variant="outlined"
                    color="primary"
                    className="ml-3"
                    sx={{
                      borderRadius: 'unset',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onClick={handleAddCondition({
                      role: 'idea_controller',
                      conType: "pre_disbursement_conditions", 
                    })}
                  >
                    <AddIcon sx={{ fontSize: '16px' }} />
                    Thêm điều kiện
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
          <Grid className="mb-3" item xs={12}>
            <Typography variant="h6" className="text-14 mt-1"> 2. Điều kiện sau giải ngân <span className="text-danger">(*)</span>
            </Typography>
            {localData?.idea_controller?.conditions_after_disbursement?.map((con, index) => (
                <Box key={con.uuid} className="flex mb-3 items-start">
                  <Input
                      maxlength={1000}
                      disabled={!getRuleEdit.control}
                    className="mt-2"
                    value={con.note}
                    onChange={handleChangeNote({
                      role: 'idea_controller',
                      conType: "conditions_after_disbursement", 
                      index
                    })}
                    message={getMessage(con.uuid)}
                  />
                  {getRuleEdit.control && (
                    <IconButton 
                      className="ml-3 mt-2" 
                      onClick={handleRemoveCondition({
                        role: 'idea_controller',
                        conType: "conditions_after_disbursement", 
                        index,
                        uuid: con.uuid
                      })}
                    >
                      <IoTrashOutline
                        style={{
                          fontSize: '1.5rem',
                          color: 'var(--mscb-primary)',
                        }}
                      />
                    </IconButton>
                  )}
                </Box>
              )
            )}
            {
              getRuleEdit.control && (
              <Grid item xl={12} md={12} xs={12}>
                <Box className="flex justify-end">
                  <Button
                    variant="outlined"
                    color="primary"
                    className="ml-3"
                    sx={{
                      borderRadius: 'unset',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onClick={handleAddCondition({
                      role: 'idea_controller',
                      conType: "conditions_after_disbursement", 
                    })}
                    // onClick={handleAddConditions(ConditionsType.Before)}
                  >
                    <AddIcon sx={{ fontSize: '16px' }} />
                    Thêm điều kiện
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>
      </CardInside>
      {isApproveRole && (
        <CardInside title="II. Ý kiến CPD">
        <Grid container className="pl-4 pb-4">
          <Grid className="mb-3" item xs={12}>
            <Typography variant="h6" className="text-14">1. Điều kiện trước giải ngân <span className="text-danger">(*)</span> </Typography>
            {
              localData?.idea_approver?.pre_disbursement_conditions?.map((con, index) => (
                  <Box key={con.uuid} className="flex mb-3 items-start">
                    <Input
                      maxlength={1000}
                      disabled={!getRuleEdit.approval}
                      className="mt-2"
                      value={con.note}
                      onChange={handleChangeNote({
                        role: 'idea_approver',
                        conType: "pre_disbursement_conditions", 
                        index
                      })}
                      message={getMessage(con.uuid)}
                    />
                    {getRuleEdit.approval && (
                      <IconButton 
                        className="ml-3 mt-2" 
                        onClick={handleRemoveCondition({
                          role: 'idea_approver',
                          conType: "pre_disbursement_conditions", 
                          index,
                          uuid: con.uuid
                        })}
                      >
                        <IoTrashOutline
                          style={{
                            fontSize: '1.5rem',
                            color: 'var(--mscb-primary)',
                          }}
                        />
                      </IconButton>
                    )}
                  </Box>
                )
              )
            }
            {
              getRuleEdit.approval && (
              <Grid item xl={12} md={12} xs={12}>
                <Box className="flex justify-end">
                  <Button
                    variant="outlined"
                    color="primary"
                    className="ml-3"
                    sx={{
                      borderRadius: 'unset',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onClick={handleAddCondition({
                      role: 'idea_approver',
                      conType: "pre_disbursement_conditions", 
                    })}
                    // onClick={handleAddConditions(ConditionsType.Before)}
                  >
                    <AddIcon sx={{ fontSize: '16px' }} />
                    Thêm điều kiện
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
          <Grid className="mb-3" item xs={12}>
            <Typography variant="h6" className="text-14 mt-1"> 2. Điều kiện sau giải ngân <span className="text-danger">(*)</span>
            </Typography>
            {localData?.idea_approver?.conditions_after_disbursement?.map((con, index) => (
                <Box key={con.uuid} className="flex mb-3 items-start">
                  <Input
                    maxlength={1000}
                    disabled={!getRuleEdit.approval}
                    className="mt-2"
                    value={con.note}
                    onChange={handleChangeNote({
                      role: 'idea_approver',
                      conType: "conditions_after_disbursement", 
                      index
                    })}
                    message={getMessage(con.uuid)}
                  />
                  {getRuleEdit.approval && (
                    <IconButton 
                      className="ml-3 mt-2" 
                      onClick={handleRemoveCondition({
                        role: 'idea_approver',
                        conType: "conditions_after_disbursement", 
                        index,
                        uuid: con.uuid
                      })}
                    >
                      <IoTrashOutline
                        style={{
                          fontSize: '1.5rem',
                          color: 'var(--mscb-primary)',
                        }}
                      />
                    </IconButton>
                  )}
                </Box>
              )
            )}
            {
              getRuleEdit.approval && (
              <Grid item xl={12} md={12} xs={12}>
                <Box className="flex justify-end">
                  <Button
                    variant="outlined"
                    color="primary"
                    className="ml-3"
                    sx={{
                      borderRadius: 'unset',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onClick={handleAddCondition({
                      role: 'idea_approver',
                      conType: "conditions_after_disbursement", 
                    })}
                    // onClick={handleAddConditions(ConditionsType.Before)}
                  >
                    <AddIcon sx={{ fontSize: '16px' }} />
                    Thêm điều kiện
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>
      </CardInside>
      )}
      <ModalConfirm
        open={deleteCondition !== null}
        onClose={() => setDeleteCondition(null)}
        onConfirm={handleConfirmRemoveCondition}
      >
        <Box className="text-18 font-medium text-primary text-center">
          {`Bạn có chắc muốn xoá điều kiện này ?`}
        </Box>
        <Box className="text-center">
          {`Các thông tin của điều kiện này sẽ mất hoàn toàn!`}
        </Box>
      </ModalConfirm>
    </Modal>
  );
};
export default ModalCreditTerm;
