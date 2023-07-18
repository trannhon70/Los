import { Grid } from "@mui/material";
import useMasterData from "app/hooks/useMasterData";
import {
  Fragment,
  ForwardRefRenderFunction,
  useImperativeHandle,
  forwardRef,
  useRef,
  useLayoutEffect
} from "react";
import OtherAddress, { IOtherAddressRef } from "./Address";
import OtherBasic from "./Basic";
import OtherIdentity, { IOtherIdentityRef } from "./Identity";
import OtherInfo from "./OtherInfo";
import OtherUser from "./User";

export interface ILOANNormalLegalOtherRef{
  validate(): boolean;
}

export interface ILOANNormalLegalOtherProps{}

type TLOANNormalLegalOtherComponent = ForwardRefRenderFunction<
  ILOANNormalLegalOtherRef,
  ILOANNormalLegalOtherProps
>;

const LOANNormalLegalOther: TLOANNormalLegalOtherComponent = (props, ref) => {

  const addressRef = useRef<IOtherAddressRef>(null);
  const identityRef = useRef<IOtherIdentityRef>(null);
  const { register } = useMasterData();
  useImperativeHandle(ref, () => ({
    validate: () => validateCoBorrower()
  }))
  useLayoutEffect(() => {
    register("relationship", "Y")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
      <OtherUser />
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
          <OtherBasic />
        </Grid>
        <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
          <OtherIdentity 
            ref={identityRef} 
          />
        </Grid>
        <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
          <OtherAddress 
            ref={addressRef} 
          />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <OtherInfo />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default forwardRef(LOANNormalLegalOther);
