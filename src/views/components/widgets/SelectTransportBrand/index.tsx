import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import Autocomplete from 'views/components/base/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConfigMetadataConstant,  } from 'features/loan/normal/configs/actions';
import { getLOANNormalConfigMetadataConstant } from './../../../../features/loan/normal/configs/metadata/selector';
import { METADATA_CONSTANT } from 'utils/constants';

export interface SelectTranportBrandProps {
    trasportTypeParent?: string;
    transportTypeId?: string;
    label?: ReactNode;
    required?: boolean;
    message?: string;
    value?: string;
    disabled?: boolean;
    onChange?(value: string): void;
    placeholder?: string;
}

const SelectTransportBrand: FC<SelectTranportBrandProps> = props => {

    const { label, required, message, value, onChange, transportTypeId, trasportTypeParent, disabled, placeholder } = props;
    const dispatch = useDispatch()
    const [CurrentTransportTypeId, setCurrentTransportTypeId] = useState<string | undefined>(transportTypeId);
    const [CurrentValue, setCurrentValue] = useState<string | undefined>(value);
    const Current = useRef<string | undefined>(value);
    const metadataConstant = useSelector(getLOANNormalConfigMetadataConstant) 

    useEffect(() => {
        trasportTypeParent && CurrentTransportTypeId && dispatch(fetchConfigMetadataConstant({
            TRANS_MODEL: {
                tran_type_parent_id: trasportTypeParent,
                tran_type_id: CurrentTransportTypeId ?? ""
            },
            DOCUMENT_GROUP_TYPE: {}
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trasportTypeParent, CurrentTransportTypeId]);


    useEffect(() => {
        setCurrentTransportTypeId(transportTypeId);
    }, [transportTypeId]);

    useEffect(() => {
        Current.current = value;
        setCurrentValue(value);
    }, [value]);

    useEffect(() => {
        if (CurrentValue !== Current.current) {
            Current.current = CurrentValue;
            onChange && onChange(CurrentValue ?? '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [CurrentValue]);

    const changeSelect = (value: string) => {
        setCurrentValue(value);
    }

    const options = metadataConstant?.data[METADATA_CONSTANT.TRANS_MODEL]?.map(d => ({ value: d.id, label: d.name }));

    return <Autocomplete
        label={label}
        required={required}
        value={CurrentValue}
        message={message}
        onChange={changeSelect}
        options={options}
        disabled={disabled}
        placeholder={placeholder}
    />

}

export default SelectTransportBrand;