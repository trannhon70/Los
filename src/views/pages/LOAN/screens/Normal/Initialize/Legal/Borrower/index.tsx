import {
  Fragment,
  useRef,
  useState,
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle
} from "react";
import Grid from "@mui/material/Grid";
import BorrowerBasic from "./Basic";
import Input from "views/components/base/Input";
import { Box } from "@mui/material";
import BorrowerOther from "./Other";
import BorrowerIdentity, { IBorrowerIdentityRef } from "./Identity";
import BorrowerAddress, { IBorrowerAddressRef } from "./Address";
import DeclareCheck from "views/components/widgets/DeclareCheck";
import { useDispatch, useSelector } from "react-redux";
import {  deleteLegal, setLegalBorrowerDeclare } from "features/loan/normal/storage/legal/actions";
import { getBranchCodeUser, getLOANNormalStorageLegalBorrower } from "features/loan/normal/storage/legal/selectors";
import ModalConfirm from "views/components/layout/ModalConfirm";
import { generateLegalDeclareTypeName } from "utils";
import { useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";

export interface IBorrowerRef{
  validate(): boolean;
}

export interface IBorrowerProps{}

type BorrowerComponent = ForwardRefRenderFunction<
  IBorrowerRef, 
  IBorrowerProps
>

const Borrower: BorrowerComponent = (props, ref) => {

  const dispatch = useDispatch();
  const params = useParams() as unknown as ILOANURLParams;
  const valueDeclare = useSelector(getLOANNormalStorageLegalBorrower)
  const ruleDisabled = useSelector(getRuleDisbled)


  const [ valueChangeDeclare, setValueChangeDeclare ] = useState<string[]>([]);
  const [ declareRemoveFrom, setDeclareRemoveType ] = useState<string | null>(null);
  const [ isUpdateDeclare, setIsUpdateDeclare ] = useState<boolean>(false);

  const identityRef = useRef<IBorrowerIdentityRef>(null);
  const addressRef = useRef<IBorrowerAddressRef>(null);


  useImperativeHandle(ref, () => ({
    validate: () => validateBorrower()
  }))

  const validateBorrower = () => {
    const validateIdentity = identityRef.current?.validate() ?? true;
    if(!validateIdentity){
      return false;
    }
    const validateAddress = addressRef.current?.validate() ?? true;
    if(!validateAddress){
      return false;
    }
    return true;
  }

  const changeDeclare = (value: string[]) => {
    const compareString = compareDeclareTypeLegalForm(valueDeclare, value);
    if (compareString !== null){
      setValueChangeDeclare(value);
      setDeclareRemoveType(compareString);
    }else{
      dispatch(setLegalBorrowerDeclare(value));
    }
  };

  /**
   * Check Declare type
   * If Declare Type === true 
   *   Show Modal complete delete
   *   If id existed call Api delete
   *   else Remove data stored
   *   Clear data form UI
   * 
   */
  const compareDeclareTypeLegalForm = (
    arrDeclareTypePre: string[], 
    arrDeclateTypeNext: string[]
  ) => {
    let compareString: string | null = null;
    if(arrDeclateTypeNext.length > 0){
      arrDeclareTypePre.forEach(pre => {
        if(arrDeclateTypeNext.indexOf(pre) < 0){
          return compareString = pre;
        }
      })
    }
    
    if (
      arrDeclateTypeNext.length === 0 && 
      arrDeclareTypePre.length === 1
    ){
      return compareString = arrDeclareTypePre[0]
    }

    return compareString;
  }

  const handleCancelConfirmRemoveDelcareType = () => {
    setDeclareRemoveType(null);
    dispatch(setLegalBorrowerDeclare(valueDeclare));
  }

  const handleConfirmRemoveDelcareType = () => {
    if(
      declareRemoveFrom !== null &&
      declareRemoveFrom.length > 0 && 
      params && 
      params.id !== "-"
    ){
      dispatch(deleteLegal({declare_type: declareRemoveFrom, los_uuid: params?.id ?? ""},{valueChangeDeclare: valueChangeDeclare , valueDeclare: valueDeclare} ));
      setIsUpdateDeclare(true);
    }
    setDeclareRemoveType(null);
  }

  const dataBranch = useSelector(getBranchCodeUser)
  const valueBranch = `${dataBranch?.branch?.branch_code} - ${dataBranch?.branch?.branch_name}`
  
  return (
    <Fragment>
      <Grid item xl={12} md={12} xs={12}>
        <Grid container>
          <Grid
            item
            xl={3}
            md={3}
            xs={12}
            className={`mr-8`}
          >
            <Input
              label="1. Đơn vị"
              disabled
              sx={{
                "& label": {
                  fontSize: "14px",
                },
              }}
              value={valueBranch}
            />
          </Grid>
          <Grid item xl={8} md={5} xs={12}>
            
              <DeclareCheck onChange={changeDeclare} value={valueDeclare} disabled={ ruleDisabled } />
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
          <BorrowerBasic />
        </Grid>
        <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
          <Box className="flex-column h-full">
            <Box sx={{ flex: 1, minHeight: "calc(50% - 10px)" }}>
              <BorrowerOther />
            </Box>
            <Box className="h-full pt-5 mt-5">
              <BorrowerIdentity 
                ref={identityRef}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
          <BorrowerAddress 
            ref={addressRef}
          />
        </Grid>
      </Grid>

      {
        (() => {
          if (declareRemoveFrom !== null){
            const nameRemove: string =  generateLegalDeclareTypeName(declareRemoveFrom);
            return(
              <ModalConfirm 
                open={ declareRemoveFrom !== null } 
                onClose={ handleCancelConfirmRemoveDelcareType } 
                onConfirm={ handleConfirmRemoveDelcareType }
              >
                <Box className="text-18 font-medium text-primary text-center whitespace-no-wrap">
                  Bạn có chắc chắn muốn xóa {nameRemove} ?
                </Box>
              </ModalConfirm>
            )
          }
        })()
      }
    </Fragment>
  );
};

export default forwardRef(Borrower);
