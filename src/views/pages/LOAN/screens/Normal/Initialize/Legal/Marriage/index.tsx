import { forwardRef, useRef, ForwardRefRenderFunction, useImperativeHandle } from "react";
import Grid from "@mui/material/Grid";
import MarriageBasic from "./Basic";
import MarriageIdentity, { IMarriageIdentityRef } from "./Identity";
import MarriageAddress, { IMarriageAddressRef } from "./Address";


export interface ILOANNormalLegalMarriageRef{
  validate(): boolean;
}

export interface ILOANNormalLegalMarriageProps{}

type TLOANNormalLegalMarriageComponent = ForwardRefRenderFunction<
  ILOANNormalLegalMarriageRef,
  ILOANNormalLegalMarriageProps
>;

const LOANNormalLegalMarriage: TLOANNormalLegalMarriageComponent = (props, ref) => {

  const addressRef = useRef<IMarriageAddressRef>(null);
  const identityRef = useRef<IMarriageIdentityRef>(null);

  useImperativeHandle(ref, () => ({
    validate: () => validateMarriage()
  }))

  const validateMarriage = () => {
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
    <Grid container spacing={3} className="mt-0">
      <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
        <MarriageBasic />
      </Grid>
      <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
        <MarriageIdentity 
          ref={ identityRef }
        />
      </Grid>
      <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
        <MarriageAddress 
          ref={ addressRef }
        />
      </Grid>
    </Grid>
  );
};

export default forwardRef(LOANNormalLegalMarriage);
