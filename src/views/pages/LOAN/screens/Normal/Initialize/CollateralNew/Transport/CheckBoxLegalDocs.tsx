import React, {
  ForwardRefRenderFunction,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import { useRef, ReactNode } from "react";
import useMasterData from "app/hooks/useMasterData";
import Checkbox, {
  CheckboxRef,
  CheckboxValue,
} from "views/components/base/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { setCheckboxTransportType, setCheckboxTransportTypeInput } from "features/loan/normal/storage/collateralV2/actions";
import { LegalDocsTransportType } from "types/models/loan/normal/storage/CollaretalV2";
import Label from "views/components/base/Label";
import Box from "@mui/material/Box";
import Input from "views/components/base/Input";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";
import useNormalCollateralMessage from "app/hooks/useNormalCollateralMessage";

interface CheckBoxLegalDocsProps {
  label?: ReactNode;
  required?: boolean;
  message?: string;
  valueDocs?: LegalDocsTransportType[];
  onChange?(value: string): void;
  disabled?: boolean;
  uuidActiveData?: string;
  uuidActiveSubType?: string;
  uuidActiveItem?: string;
  handleChangeParent():void;
  handleChangeChild(parentId: string,otherFlag: string,otherValue?: string | null) :void;
}

export interface CheckBoxRef {
  getValue(): CheckboxValue[];
  getValueChild(): CheckboxValue[];
}

export type CheckBoxComponent = ForwardRefRenderFunction<
  CheckBoxRef,
  CheckBoxLegalDocsProps
>;

const CheckBoxLegalDocs: CheckBoxComponent = (props, ref) => {
  const { valueDocs, uuidActiveData, uuidActiveSubType, uuidActiveItem ,handleChangeParent,handleChangeChild} =
    props;
  const { ListLegalDocument, register } = useMasterData();
    
  useEffect(() => {
    register('listLegalDocument')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const dispatch = useDispatch();
  const ruleDisabled = useSelector(getRuleDisbled);
  const checkboxRef = useRef<CheckboxRef>(null);
  const chilCheckboxRef = useRef<CheckboxRef>(null);
  const getMessage = useNormalCollateralMessage();

  useImperativeHandle(ref, () => ({
    getValue: () => {
      return checkboxRef.current?.getValue() ?? [];
    },
    getValueChild: () => {
      return chilCheckboxRef.current?.getValue() ?? [];
    },
  }));

  const handleChangeChildInput = (
    parentId: string,
    otherFlag: string,
    otherValue?: string | null
  ) => {
    dispatch(
      setCheckboxTransportTypeInput("", {
        uuidActiveData: uuidActiveData ?? "",
        uuidActiveSubtype: uuidActiveSubType ?? "",
        uuidActiveitems: uuidActiveItem ?? "",
        parentId: parentId,
        otherFlag,
        otherValue,
      })
    );
  };

  return (
    <>
      <Label className="font-medium" required>
        1. Danh mục hồ sơ pháp lý
      </Label>
      {
        getMessage('legal_document_types') && <p className="text-danger my-0 text-13">
          {getMessage('legal_document_types')}
        </p>
      }
      {ListLegalDocument?.map((i, idx) => {
        return (
          <Box key={idx}>
            <Checkbox
              sx={{
                "& .MuiTypography-root":{
                  fontWeight: 500,
                  color: "var(--mscb-disable)",
                  fontSize: '13px'
                }
              }}
              ref={checkboxRef}
              options={[
                {
                  label: i.legal_document_name,
                  value: i.legal_document_code,
                  checked:
                    i.legal_document_code ===
                    valueDocs?.find((j) => j.id === i.legal_document_code)?.id,
                },
              ]}
              onChange={handleChangeParent}
              disabled={ruleDisabled}
            />
            <Box sx={{ display: "flex", marginLeft: "30px" }}>
              {i.list?.map((j, jdx) => {
                const active =
                  valueDocs
                    ?.find((j) => j.id === i.legal_document_code)
                    ?.documents.find((x) => x.id === j.document_code)
                    ?.other_value_flag !== "Y";
                if (j.other_value_flag === "Y") {
                  return (
                    <Box key={jdx} sx={{ display: "flex" }}>
                      <Checkbox
                        sx={{
                          "& .MuiFormControlLabel-label":{
                            fontWeight: "400!important",
                            color: "var(--mscb-disable)",
                            fontSize: '13px!important'
                          }
                        }}
                        ref={chilCheckboxRef}
                        options={[
                          {
                            label: j.document_name,
                            value: j.document_code,
                            disabled:
                              valueDocs?.find(
                                (j) => j.id === i.legal_document_code
                              )?.id !== i.legal_document_code,
                            checked:
                              j.document_code ===
                              valueDocs
                                ?.find((j) => j.id === i.legal_document_code)
                                ?.documents.find(
                                  (i) => i.id === j.document_code
                                )?.id,
                          },
                        ]}
                        onChange={() => {
                          handleChangeChild( i.legal_document_code, j.other_value_flag);
                        }}
                        disabled={ruleDisabled ||  valueDocs?.find(
                          (j) => j.id === i.legal_document_code
                        )?.id !== i.legal_document_code}
                      />
                      <Input
                        disabled={active || ruleDisabled}
                        onDebounce={(val) => {
                          handleChangeChildInput(
                            i.legal_document_code,
                            j.other_value_flag,
                            val
                          );
                        }}
                        value={
                          active
                            ? " "
                            : valueDocs?.find(
                                (j) => j.id === i.legal_document_code
                              )?.other_document ?? ""
                        }
                      />
                    </Box>
                  );
                } else {
                  return (
                    <Checkbox
                      key={jdx}
                      ref={chilCheckboxRef}
                      sx={{
                        "& .MuiFormControlLabel-label":{
                          fontWeight: "400!important",
                          color: "var(--mscb-disable)",
                          fontSize: '13px!important'
                        }
                      }}
                      // disabled={true} ???
                      options={[
                        {
                          label: j.document_name,
                          value: j.document_code,
                          disabled:
                            valueDocs?.find(
                              (j) => j.id === i.legal_document_code
                            )?.id !== i.legal_document_code,
                          checked:
                            j.document_code ===
                            valueDocs
                              ?.find((j) => j.id === i.legal_document_code)
                              ?.documents.find((i) => i.id === j.document_code)
                              ?.id,
                        },
                      ]}
                      onChange={() => {
                        handleChangeChild(
                          i.legal_document_code,
                          j.other_value_flag
                        );
                      }}
                      disabled={ruleDisabled ||  valueDocs?.find(
                        (j) => j.id === i.legal_document_code
                      )?.id !== i.legal_document_code}
                    />
                  );
                }
              })}
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default forwardRef(CheckBoxLegalDocs);
