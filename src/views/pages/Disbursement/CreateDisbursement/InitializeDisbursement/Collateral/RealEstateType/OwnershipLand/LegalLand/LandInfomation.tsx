import Grid from '@mui/material/Grid';
import useMasterData from "app/hooks/useMasterData";
import { FunctionComponent, useEffect, useRef } from "react";
import { ILegalLandInformatioAsset } from "types/models/loan/normal/storage/CollaretalV2";
import AutocompleteMultiple, {
    AutocompleteMultipleOption,
    AutocompleteMultipleRef
} from "views/components/base/AutocompleteMultiple";
import Input from 'views/components/base/Input';
import CardInside from 'views/components/layout/CardInside';
import SelectLocation, { SelectLocationValue } from "views/components/widgets/SelectLocation";
import { SxAutoCompleteTag } from "../../../style";

const LandInfomation: FunctionComponent = ( ) => {

    const { PurposeUsingLane } = useMasterData();
  
    const purposeUsingLaneElement = useRef<AutocompleteMultipleRef>(null);


    const onChangeSubItemInfomationAsset = (value: string | number | null | string[] | number[], key: keyof ILegalLandInformatioAsset) => {
    }

    const changeLocation = (data: SelectLocationValue) => {
    }

    const changeLocationCertificate = (data: SelectLocationValue) => {
    }

    const optionsPurposeUsingLane: AutocompleteMultipleOption[] = PurposeUsingLane.map(pul => ({
        label: pul.name,
        value: pul.code
    }))

    const onHandlePurposeUsingLane = () => {
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
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <SelectLocation
                        col={3}
                        label={[
                            '2. Tỉnh/TP',
                            '3. Quận/huyện',
                            '4. Phường/xã'
                        ]}
                        before={
                            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                                <Input
                                    label="1. Địa chỉ thực tế thửa đất"
                                    onDebounce={(value) => onChangeSubItemInfomationAsset(value, "address")}
                                />
                            </Grid>
                        }
                        onChange={changeLocation}
                    />
                </Grid>

                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <SelectLocation
                        col={3}
                        label={[
                            '6. Tỉnh/TP',
                            '7. Quận/huyện',
                            '8. Phường/xã'
                        ]}
                        before={
                            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                                <Input
                                    label="5. Địa chỉ theo GCN"
                                />
                            </Grid>
                        }
                        onChange={changeLocationCertificate}
                    />
                </Grid>

                <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                    <AutocompleteMultiple
                        label="9. Mục đích sử dụng đất (theo thẩm định giá)"
                        tag
                        required
                        options={optionsPurposeUsingLane}
                        onChange={onHandlePurposeUsingLane}
                        ref={purposeUsingLaneElement}
                        sx={SxAutoCompleteTag}
                    />
                </Grid>

                <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                    <Input
                        label="10. Mục đích sử dụng đất (theo thẩm định giá) khác"
                    />
                </Grid>
            </Grid>
        </CardInside>

    )
}

export default LandInfomation;
