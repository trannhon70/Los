import {
  Fragment,
  ForwardRefRenderFunction,
  useImperativeHandle,
  forwardRef,
  useRef
} from "react";
import Grid from "@mui/material/Grid";
import CoBorrowerBasic from "./Basic";
import CoBorrowerIdentity, { ICoBorrowerIdentityRef } from "./Identity";
import CoBorrowerAddress, { ICoBorrowerAddresssRef } from "./Address";
import CoBorrowerUser from "./User";



export interface ILOANNormalLegalCoBorrowerRef{
  validate(): boolean;
}

export interface ILOANNormalLegalCoBorrowerProps{}

type TLOANNormalLegalCoBorrowerComponent = ForwardRefRenderFunction<
  ILOANNormalLegalCoBorrowerRef,
  ILOANNormalLegalCoBorrowerProps
>;

const LOANNormalLegalCoBorrower: TLOANNormalLegalCoBorrowerComponent = (props, ref) => {


  const addressRef = useRef<ICoBorrowerIdentityRef>(null);
  const identityRef = useRef<ICoBorrowerAddresssRef>(null);



  useImperativeHandle(ref, () => ({
    validate: () => validateCoBorrower()
  }))

  const validateCoBorrower = () => {
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

  return (
    <Fragment>
      <CoBorrowerUser />
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
          <CoBorrowerBasic  />
        </Grid>
        <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
          <CoBorrowerIdentity
            ref={ identityRef }
          />
        </Grid>
        <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
          <CoBorrowerAddress 
            ref={ addressRef }
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default forwardRef(LOANNormalLegalCoBorrower);
