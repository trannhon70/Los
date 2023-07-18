import React, { FC, useEffect } from 'react'
import { useRef, ReactNode } from 'react';
import useMasterData from 'app/hooks/useMasterData';

import Checkbox, { CheckboxRef } from 'views/components/base/Checkbox';

import { IListLegalDocument, IListLegalDocumentListData } from 'types/models/master-data/state';
import checboxListStyles from './style';
import clsx from 'clsx';
import { Box, FormControlLabel } from '@mui/material';
import Label from 'views/components/base/Label';

interface CheckboxGroupPTVTProps {
    label?: ReactNode;
    required?: boolean;
    message?: string;
    value?: string;
    onChange?(value: string): void;
    disabled?: boolean;
}

const CheckboxGroupPTVT: FC<CheckboxGroupPTVTProps> = (props) => {
    const { label, required, message, value, onChange, disabled } = props;

    const { ListLegalDocument, register } = useMasterData();

    useEffect(() => {
        register('listLegalDocument')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    const checkboxRef = useRef<CheckboxRef>(null)
    const classes = checboxListStyles()
    const handleChange = () => {

        // dispatch action luu store
    };
    const ILegalDoc = [
        {
            id: 'CERT',
            documents: [

            ]
        },
        {
            id: 'DECL',
            documents: [{
                id: "DECL_1",
                other_value_flag: "N"
            },
            {
                id: "DECL_2",
                other_value_flag: "N"
            }]
        }
    ]

    const renderCheckbox = () => {
        let rs = [<></>]
        ListLegalDocument.forEach((value, index) => {
            rs = [...rs, <Checkbox
                className={clsx(classes.root)}
                key={index}
                options={value.list?.map(listItem => ({
                    label: listItem.document_name,
                    checked: listItem.document_code === ILegalDoc.find(j => j.id === value.legal_document_code)?.documents.find(i => i.id === listItem.document_code)?.id,
                    value: listItem.document_code,
                })).reverse().concat([{
                    label: value.legal_document_name,
                    checked: value.legal_document_code === ILegalDoc.find(j => j.id === value.legal_document_code)?.id,
                    value: value.legal_document_code,
                }
                ]).reverse()
                }
                ref={checkboxRef}
                // onChange={handleChange}
            />]
        })
        return rs
    }
    return (
        <>
            <Label required>1. Danh mục hồ sơ pháp lý</Label>
            {
                ListLegalDocument.map(item => {
                    return (
                        <Box>
                            <FormControlLabel
                                label={item.legal_document_name}
                                control={
                                    <Checkbox onChange={() => {
                                        // handleChange(item)
                                    }} />
                                } />
                            <Box>
                                {
                                    item.list && item.list.map(child => {
                                        return <FormControlLabel
                                            label={child.document_name}
                                            className="ml-2"
                                            control={
                                                <Checkbox onChange={() => {
                                                    // handleChange(child)
                                                }} />
                                            } />
                                    })
                                }
                            </Box>
                        </Box>

                    )
                })
            }


        </>
    )
}

export default CheckboxGroupPTVT
