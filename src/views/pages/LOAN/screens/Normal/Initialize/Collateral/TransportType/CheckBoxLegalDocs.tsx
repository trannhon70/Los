import useMasterData from 'app/hooks/useMasterData';
import { setCheckboxTransportType } from 'features/loan/normal/storage/collateralV2/actions';
import { forwardRef, ForwardRefRenderFunction, ReactNode, useEffect, useImperativeHandle, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LegalDocsTransportType } from 'types/models/loan/normal/storage/CollaretalV2';
import Checkbox, { CheckboxRef, CheckboxValue } from 'views/components/base/Checkbox';
import Label from 'views/components/base/Label';

import Box from '@mui/material/Box';
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import Input from 'views/components/base/Input';


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
}



export interface CheckBoxRef {
    getValue(): CheckboxValue[];
}

export type CheckBoxComponent = ForwardRefRenderFunction<
    CheckBoxRef,
    CheckBoxLegalDocsProps
>;

const CheckBoxLegalDocs: CheckBoxComponent = (props, ref) => {
    const { 
            valueDocs,
            uuidActiveData,
            uuidActiveSubType,
            uuidActiveItem,
        } = props;
    const { ListLegalDocument, register } = useMasterData();
      
  useEffect(() => {
    register('listLegalDocument')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
    const dispatch = useDispatch();
    const ruleDisabled = useSelector(getRuleDisbled)
    const checkboxRef = useRef<CheckboxRef>(null)
    const chilCheckboxRef = useRef<CheckboxRef>(null)

    useImperativeHandle(ref, () => ({
        getValue: () => {
            return checkboxRef.current?.getValue() ?? []
        }
    }));
    const handleChangeParent = () =>{
        dispatch(setCheckboxTransportType("",{
            uuidActiveData:uuidActiveData ?? "",
            uuidActiveSubtype:uuidActiveSubType ?? "",
            uuidActiveitems:uuidActiveItem ?? "",
            dataMeta:checkboxRef.current?.getValue() ?? [],
            parentId: undefined,
            otherFlag:''
        }))
        // setCheckedParent()
    }
    const handleChangeChild = (parentId: string,otherFlag: string,otherValue?: string| null) =>{
        dispatch(setCheckboxTransportType("",{
            uuidActiveData:uuidActiveData ?? "",
            uuidActiveSubtype:uuidActiveSubType ?? "",
            uuidActiveitems:uuidActiveItem ?? "",
            dataMeta:chilCheckboxRef.current?.getValue() ?? [],
            parentId: parentId,
            otherFlag,
            otherValue
        }))
    }

    return (
        <>
            <Label className="font-medium" required>1. Danh mục hồ sơ pháp lý</Label>
            {
                ListLegalDocument?.map((i,idx)=>{
                    return <Box key={idx}>
                                <Checkbox ref={checkboxRef} options={[
                                    {label:i.legal_document_name,
                                    value:i.legal_document_code,
                                    checked: i.legal_document_code === valueDocs?.find(j => j.id === i.legal_document_code)?.id}]} 
                                    onChange={handleChangeParent}
                                    disabled={ ruleDisabled }
                                />
                                <Box sx={{display:"flex", marginLeft:"30px"}}>
                                {
                                    i.list?.map((j,jdx)=>{
                                        const active  = valueDocs?.find(j => j.id === i.legal_document_code)?.documents.find(i => i.id === j.document_code)?.other_value_flag!=='Y'
                                        if(j.other_value_flag === 'Y'){
                                           return <Box key={jdx} sx={{display:"flex"}}>
                                                <Checkbox 
                                                    ref={chilCheckboxRef} 
                                                    options={[
                                                        {
                                                            label:j.document_name,
                                                            value:j.document_code,
                                                            disabled:valueDocs?.find(j => j.id === i.legal_document_code)?.id !== i.legal_document_code,
                                                            checked: j.document_code === valueDocs?.find(j => j.id === i.legal_document_code)?.documents.find(i => i.id === j.document_code)?.id
                                                        }]} 
                                                    onChange={()=>{
                                                        handleChangeChild(i.legal_document_code,j.other_value_flag)
                                                    }}
                                                    disabled={ ruleDisabled }
                                                    
                                                />
                                                <Input 
                                                    disabled={active || ruleDisabled}
                                                    onDebounce={(val) =>{
                                                     handleChangeChild(i.legal_document_code,j.other_value_flag,val)
                                                    }} 
                                                    value={
                                                        active ? " ": valueDocs?.find(j => j.id === i.legal_document_code)?.other_document ?? ''
                                                    }
                                                />
                                           </Box>
                                        } else{
                                            return  <Checkbox 
                                            key={jdx}
                                            ref={chilCheckboxRef} 
                                            // disabled={true} ???
                                            options={[
                                                {
                                                    label:j.document_name,
                                                    value:j.document_code,
                                                    disabled:valueDocs?.find(j => j.id === i.legal_document_code)?.id !== i.legal_document_code,
                                                    checked: j.document_code === valueDocs?.find(j => j.id === i.legal_document_code)?.documents.find(i => i.id === j.document_code)?.id
                                                }]} 
                                            onChange={()=>{
                                                handleChangeChild(i.legal_document_code,j.other_value_flag)
                                            }}
                                            disabled={ ruleDisabled }
                                    />
                                        }
                                    })
                                }
                                </Box>
                    </Box>
                })
            }
        </>
    )
}

export default forwardRef(CheckBoxLegalDocs)
