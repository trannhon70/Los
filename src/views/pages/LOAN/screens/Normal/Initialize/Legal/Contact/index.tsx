import { FC, Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import ContactBasic from "./Basic";
import ContactAddress from "./Address";
import ContactUser from "./User";
import { useDispatch, useSelector } from "react-redux";
import { getLOANLegalOtherValue, getLOANNormalAllFullName } from "features/loan/normal/storage/legal/selectors";
import AutocompleteMultiple, {
  AutocompleteMultipleOption,
  AutocompleteMultipleRef
} from "views/components/base/AutocompleteMultiple";
import { setDataPersonContact } from "features/loan/normal/storage/legal/actions";
import useMasterData from "app/hooks/useMasterData";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";

const LOANNormalLegalContact: FC = () => {

  const dataContact = useSelector(getLOANNormalAllFullName);
  const ruleDisabled = useSelector(getRuleDisbled)

  const dispatch = useDispatch();

  const options:AutocompleteMultipleOption[] = dataContact.map(item=>({
    label: item.label.toUpperCase(),
    value: item.value,
  }))
  const valueList = useSelector(getLOANLegalOtherValue);
  const { register } = useMasterData();
  useLayoutEffect(() => {
    register("relationship", "N")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const useListRef = useRef<AutocompleteMultipleRef>(null);

  const onChangeAuto = () =>{
    const dataList = useListRef.current?.getValue() ?? [];
    const datadis = dataList.map(item=>item.value) as string[]
    dispatch(setDataPersonContact(datadis,{declare:""}))
  }

  return (
    <Fragment>
      {/* <ContactDrop /> */}
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={2} md={3} xs={12}>
          <span style={{ color: "#eb0029" }}>
            Xin vui lòng chọn từ danh sách hoặc tạo người liên hệ mới
          </span>
        </Grid>
        <Grid item xl={4} md={6} xs={6}>
          <AutocompleteMultiple
            tag 
            required
            value={valueList}
            onChange={onChangeAuto}
            options={options}
            ref={useListRef}
            disabled= { ruleDisabled }
          />

        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <ContactUser />
        </Grid>
        <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
          <ContactBasic />
        </Grid>
        <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
          <ContactAddress />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default LOANNormalLegalContact;
