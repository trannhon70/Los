import {
  Fragment,
  ForwardRefRenderFunction,
  useImperativeHandle,
  forwardRef,
  useRef,
  useLayoutEffect
} from "react";
import Grid from "@mui/material/Grid";
import CoPayerBasic from "./Basic";
import CoPayerIdentity, { ICoPayerIdentityRef } from "./Identity";
import CoPayerAddress, { ICoPayerAddressRef } from "./Address";
import CoPayerUser from "./User";
import useMasterData from "app/hooks/useMasterData";

export interface ILOANNormalLegalCoPayerRef{
  validate(): boolean;
}

export interface ILOANNormalLegalCoPayerProps{}

type TLOANNormalLegalCoPayerComponent = ForwardRefRenderFunction<
  ILOANNormalLegalCoPayerRef,
  ILOANNormalLegalCoPayerProps
>;

const LOANNormalLegalCoPayer: TLOANNormalLegalCoPayerComponent = (
  props, ref
) => {

  const addressRef = useRef<ICoPayerAddressRef>(null);
  const identityRef = useRef<ICoPayerIdentityRef>(null);
  useImperativeHandle(ref, () => ({
    validate: () => validateCoPayer(),
  }))
  const { register } = useMasterData();
  useLayoutEffect(() => {
    register("relationship", "N")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const validateCoPayer = () => {
    let isValid: boolean = true;

    const validateIdentity = identityRef.current?.validate() ?? true;
    if(!validateIdentity){
      return isValid = false;
    }

    const validateAddress = addressRef.current?.validate() ?? true;
    if(!validateAddress){
      return isValid = false
    }

    return isValid
  }

  return (
    <Fragment>
      <CoPayerUser />
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
          <CoPayerBasic />
        </Grid>
        <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
          <CoPayerIdentity 
            ref={identityRef}
          />
        </Grid>
        <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
          <CoPayerAddress 
            ref={addressRef}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default forwardRef(LOANNormalLegalCoPayer);
