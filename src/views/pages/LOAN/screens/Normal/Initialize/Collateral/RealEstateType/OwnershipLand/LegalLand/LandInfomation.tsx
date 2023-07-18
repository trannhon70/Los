import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import useMasterData from "app/hooks/useMasterData";
import useNormalCollateralMessage from 'app/hooks/useNormalCollateralMessage';
import useNotify from "app/hooks/useNotify";
import {
    setLandInformationAsset,
    setLandInformationAssetDataLocation,
    setLandInformationAssetDataLocationCertificate
} from "features/loan/normal/storage/collateralV2/actions";
import { getLoanNormalSubTypeItemsActive, getLOANormalStoreColalteralLandAssetType } from "features/loan/normal/storage/collateralV2/selector";
import { getRuleDisbled } from 'features/loan/normal/storageGuide/selector';
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ILegalLandInformatioAsset } from "types/models/loan/normal/storage/CollaretalV2";
import AutocompleteMultiple, {
    AutocompleteMultipleOption,
    AutocompleteMultipleRef
} from "views/components/base/AutocompleteMultiple";
import Input from 'views/components/base/Input';
import CardInside from 'views/components/layout/CardInside';
import IconCopy from "views/components/layout/IconCopy";
import SelectLocation, { SelectLocationValue } from "views/components/widgets/SelectLocation";
import ModalCollateralAddress from "views/pages/LOAN/widgets/ModalCollateralAddress";
import { SxAutoCompleteTagUsePurposes } from "../../../style";

export interface ILandInfomationProps{
    uuIdData?: string;
    uuIdSubType?: string;
}

const LandInfomation: FunctionComponent<ILandInfomationProps> = (props ) => {

    const { uuIdData = "", uuIdSubType = ""} = props;
    const { PurposeUsingLane } = useMasterData();

    const ruleDisabled = useSelector(getRuleDisbled)
    const dispatch = useDispatch();
    const notify = useNotify();

    const purposeUsingLaneElement = useRef<AutocompleteMultipleRef>(null);

    const [isModalOpenReal,setIsOpenModalReal] = useState<boolean>(false)
    const [isModalOpenGCN,setIsModalOpenGCN] = useState<boolean>(false)


    const landAssetType = useSelector(getLOANormalStoreColalteralLandAssetType(uuIdData, uuIdSubType));
    const SubTypeItemsActive = useSelector(getLoanNormalSubTypeItemsActive( uuIdData, uuIdSubType ))
    const onChangeSubItemInfomationAsset = (value: string | number | null | string[] | number[], key: keyof ILegalLandInformatioAsset) => {
        dispatch(setLandInformationAsset(value, { uuIdData: uuIdData, uuIdSubtype: uuIdSubType, key }))
    }

    const changeLocation = (data: SelectLocationValue) => {
        const { country, ...remain } = data;
        dispatch(setLandInformationAssetDataLocation(remain, { uuidData: uuIdData, uuidSubType: uuIdSubType }))
    }

    const changeLocationCertificate = (data: SelectLocationValue) => {
        const { country, ...remain } = data;
        dispatch(setLandInformationAssetDataLocationCertificate(remain, { uuidData: uuIdData, uuidSubType: uuIdSubType }))
    }

    const optionsPurposeUsingLane: AutocompleteMultipleOption[] = PurposeUsingLane.map(pul => ({
        label: pul.name,
        value: pul.code
    }))
    const indexOther = landAssetType?.purpose_using_lane.includes("OTHER")
    const onHandlePurposeUsingLane = () => {
        let purposeUsingLaneElementValue = () => purposeUsingLaneElement.current?.getValue() ?? [];
        onChangeSubItemInfomationAsset(purposeUsingLaneElementValue().map(pul => pul.value.toString()), "purpose_using_lane")

    }
    useEffect(()=>{
        if(!indexOther){
            onChangeSubItemInfomationAsset('', "purpose_using_lane_other");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[indexOther])
    const getMessage = useNormalCollateralMessage();
    const openModalReal = () =>{
        setIsOpenModalReal(!isModalOpenReal)
    }
    const openModalGCN = () =>{
        setIsModalOpenGCN(!isModalOpenGCN)
    }
    
    return (
        <CardInside
            title="I. Thông tin chi tiết đất"
            sx={{
                "& legend": {
                    fontSize: '16px'
                }
            }}
        >
            <Grid container spacing={3} className="pl-4 pb-4">
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} 
                    sx={{
                        "& .icon-copy": {
                          zIndex: "1000",
                          position: "absolute",
                          cursor: "pointer"
                        },
                    }}
                >
                    <SelectLocation
                        col={3}
                        label={[
                            '2. Tỉnh/TP',
                            '3. Quận/huyện',
                            '4. Phường/xã'
                        ]}
                        before={
                            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}  
                                sx={{
                                    display: 'flex',
                                    flexFlow: 'row-reverse'
                                }}
                            >
                                <Input
                                    label="1. Địa chỉ thực tế thửa đất"
                                    onDebounce={(value) => onChangeSubItemInfomationAsset(value, "address")}
                                    value={landAssetType?.address ?? ""}
                                    disabled={ruleDisabled}
                                />
                                <IconButton
                                    sx={{
                                        padding: 0
                                    }}
                                    className="icon-copy"
                                    onClick={openModalReal}
                                >
                                    <IconCopy />
                                </IconButton>
                            </Grid>
                        }
                        onChange={changeLocation}
                        value={{
                            country: "VN",
                            province: landAssetType?.province ?? "",
                            district: landAssetType?.district ?? "",
                            ward: landAssetType?.ward ?? ""
                        }}
                        message={[
                            getMessage('province',{position:SubTypeItemsActive,pv:''}),
                            getMessage('district',{position:SubTypeItemsActive,pv:''}),
                            getMessage('ward',{position:SubTypeItemsActive,pv:''}),
                        ]}
                        required={[true, true, true]}
                        disabled={ruleDisabled}
                    />
                </Grid>

                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} 
                    sx={{
                        "& .icon-copy": {
                        zIndex: "1000",
                        position: "absolute",
                        cursor: "pointer"
                        },
                    }}
                >
                    <SelectLocation
                        col={3}
                        label={[
                            '6. Tỉnh/TP',
                            '7. Quận/huyện',
                            '8. Phường/xã'
                        ]}
                        disabled={ruleDisabled}
                        before={
                            <Grid item xl={3} lg={3} md={3} sm={12} xs={12} 
                                sx={{
                                    display: 'flex',
                                    flexFlow: 'row-reverse'
                                }}
                            >
                                <Input
                                    label="5. Địa chỉ theo GCN"
                                    onDebounce={(value) => onChangeSubItemInfomationAsset(value, "certificate_address")}
                                    value={landAssetType?.certificate_address ?? ""}
                                    disabled={ruleDisabled}
                                />
                                <IconButton
                                    sx={{
                                        padding: 0
                                    }}
                                    className="icon-copy"
                                    onClick={openModalGCN}
                                >
                                    <IconCopy />
                                </IconButton>
                            </Grid>
                        }
                        value={{
                            country: "VN",
                            province: landAssetType?.certificate_province ?? "",
                            district: landAssetType?.certificate_district ?? "",
                            ward: landAssetType?.certificate_ward ?? ""
                        }}
                        onChange={changeLocationCertificate}
                        required={[true, true, true]}
                        message={[
                            getMessage('province',{position:SubTypeItemsActive,pv:'certificate'}),
                            getMessage('district',{position:SubTypeItemsActive,pv:'certificate'}),
                            getMessage('ward',{position:SubTypeItemsActive,pv:'certificate'}),
                        ]}
                    />
                </Grid>

                <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                    <AutocompleteMultiple
                        label="9. Mục đích sử dụng đất (theo thẩm định giá)"
                        tag
                        required
                        disabled={ruleDisabled}
                        options={optionsPurposeUsingLane}
                        onChange={onHandlePurposeUsingLane}
                        ref={purposeUsingLaneElement}
                        value={landAssetType?.purpose_using_lane ?? []}
                        sx={SxAutoCompleteTagUsePurposes}
                        message={getMessage('purpose_using_lane',{position:SubTypeItemsActive})}
                    />
                </Grid>

                <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                    <Input
                        label="10. Mục đích sử dụng đất (theo thẩm định giá) khác"
                        onDebounce={(value) => onChangeSubItemInfomationAsset(value, "purpose_using_lane_other")}
                        value={landAssetType?.purpose_using_lane_other ?? ""}
                        disabled={(landAssetType?.purpose_using_lane.includes("OTHER") ? false : true)  || ruleDisabled}
                        required={landAssetType?.purpose_using_lane.includes("OTHER") ? true : false}
                        message={getMessage('purpose_using_lane',{position:SubTypeItemsActive})}
                    />
                </Grid>
            </Grid>
            <ModalCollateralAddress open={isModalOpenReal} onClose={openModalReal} onSave={(data) => {
                onChangeSubItemInfomationAsset(data.apartment, "address")
                onChangeSubItemInfomationAsset(data.province, 'province');
                onChangeSubItemInfomationAsset(data.district, 'district');
                onChangeSubItemInfomationAsset(data.ward, 'ward');
                openModalReal()
                notify('Copy địa chỉ thành công', 'success')
            }} />
            <ModalCollateralAddress open={isModalOpenGCN} onClose={openModalGCN} onSave={(data) => {
                onChangeSubItemInfomationAsset(data.apartment, 'certificate_address')
                onChangeSubItemInfomationAsset(data.province, 'certificate_province');
                onChangeSubItemInfomationAsset(data.district, 'certificate_district');
                onChangeSubItemInfomationAsset(data.ward, 'certificate_ward');
                openModalGCN()
                notify('Copy địa chỉ thành công', 'success')
            }} />
        </CardInside>
           
    )
}

export default LandInfomation;
