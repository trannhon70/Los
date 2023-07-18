import { ILOANNormalCollateralData, ISubItems, LegalDocsTransportType } from "types/models/loan/normal/storage/CollaretalV2";
import { ETypeLandName } from "./case";
import { ICertificateUsePurposes } from 'types/models/loan/normal/storage/CollaretalV2';
import { IMetadataConstant } from "types/models/loan/normal/configs/metadata";
import { METADATA_CONSTANT } from "utils/constants";

export const CollateralValidate ={

    status(value: string){
        return { valid: !!value, field: 'status', role: 'empty' };
    },

    valuation_id(value: string){
        return { valid: !!value, field: 'valuation_id', role: 'empty' };
    },

    valuation_date(value: number | null){
        const today = Date.now()
        if(value && value > today){
            return { valid: false, field: 'valuation_date', role: 'date' };
        }else{
            return { valid: !!value, field: 'valuation_date', role: 'empty' };
        }
    },

    valuation_unit_type(value: string){
        return { valid: !!value, field: 'valuation_unit_type', role: 'empty' };
    },

    valuation_unit(value: string){
        return { valid: !!value, field: 'valuation_unit', role: 'empty' };
    },

    valuation_center(value: string){
        return { valid: !!value, field: 'valuation_center', role: 'empty' };
    },

    independence_organization(value: string){
        return { valid: !!value, field: 'independence_organization', role: 'empty' };
    },

    other_independence_organization(value: string){
        return { valid: !!value, field: 'other_independence_organization', role: 'empty' };
    },

    purpose(value: string){
        return { valid: !!value, field: 'purpose', role: 'empty' };  // mục đích cấp tín dung
    },

    other_purpose(value: string){
        return { valid: !!value, field: 'other_purpose', role: 'empty' };  // mục đích cấp tín dung khác
    },
    // Tỷ lệ cho vay/Giá trị TSBĐ (LTV)
    max_percentage(value: number | null, type?: string, constant?: IMetadataConstant, position?: string){
        const rule = constant ? constant[METADATA_CONSTANT.COLLATERAL_LTV_MAX]?.find(i => i.id === type)?.value ?? 100 : 100
        
        if(value  && value > rule ){
            return { valid: false, field: 'max_percentage', role: 'maxDeposit', position: position }
        }
        if(value && value <= 0){
            return { valid: false, field: 'max_percentage', role: 'empty', position: position }
        }
        return { valid: true, field:'', role: ''};

    },
    // Tỷ lệ cho vay tối đa theo quy định
    max_percentage_ratio(value: number| string | null, type?: string){
        // nếu nhập thì cho phép nhập 0 đến 100
        if(value === null){
            return { valid: false, field: 'max_percentage_ratio', role: 'maxRatio' , type}
        }
        if(Number(value) > 100){
            return { valid: false, field: 'max_percentage_ratio', role: 'maxRatioOver' , type}
        }
        return { valid: true, field:'', role: ''};
    },
    address(value: string){
        return { valid: !!value, field: 'address', role: 'empty' };
    },

    // Tỉnh/TP
    province(value: string, type?: string){
        return { valid: !!value, field: 'province', role: 'empty',type };
    },

    // Quận/huyện
    district(value: string, type?: string){
        return { valid: !!value, field: 'district', role: 'empty', type };
    },

    ward(value: string, type?: string){
        return { valid: !!value, field: 'ward', role: 'empty', type };
    },

    // Loại vị trí
    positionType(value: string){
        return { valid: !!value, field: 'typeLocation', role: 'empty' };
    },

    otherPositionType(value: string){
        return { valid: !!value, field: 'other_position_type', role: 'empty' };
    },
    widthRoad(value: string){
        return { valid: !!value, field: 'widthRoad', role: 'empty' };
    },

    ratio(value: number | null, type?: string, gcnUuid?: string){
        if (value === null || value === undefined) {
            return { valid: false, field: 'ratio', role: 'empty', type: type, gcnUuid };
        }
        return { valid: true ,field: '', role: '',};
    },
    ratioString(value: string, type?: string, gcnUuid?: string) {
        return { valid: !!value, field: 'ratio', role: 'empty', type: type, gcnUuid };
    },
    value(value: number | null){
        return { valid: !!value, field: 'value', role: 'empty' };
    },
    value_mmtb(value: number | null){
        return { valid: !!value, field: 'value_mmtb', role: 'empty' };
    },
    value_ptvt(value: number | null){
        return { valid: !!value, field: 'value_ptvt', role: 'empty' };
    },
    typeCollateral(value: string){
        return { valid: !!value, field: 'typeCollateral', role: 'empty' };
    },
    license(value: string){
        return { valid: !!value, field: 'license', role: 'empty' };
    },
    colleteral_status(value: string){
        return { valid: !!value, field: 'status', role: 'empty' };
    },
    issuer(value: string){
        return { valid: !!value, field: 'issuer', role: 'empty' };
    },
    other_issuer(value: string){
        return { valid: !!value, field: 'other_issuer', role: 'empty' };
    },
    info_collatetal(value: string){
        return { valid: !!value, field: 'info_collatetal', role: 'empty' };
    },
    description(value: string){
        return { valid: !!value, field: 'description', role: 'empty' };
    },
    nonBusinessArea(value: number | string | null, field: string, type?: string){
        if(value === null) {
            return { valid: false, field: field, role: "empty", type };
        }
        if(Number(value) > 100){
            return { valid: false, field: field, role: "max", type };
            
        }
        return { valid: true };
    },
    valueOfLand(value: number | null,type?: string, gcnUuid?: string, subRest_type?: string){
        if (value === null){
            return { valid: false, field: `ValueOfLand${subRest_type ?? ""}`, role: 'empty', type , gcnUuid };
        }
        else if(Number(value) === 0){
            return { valid: false, field: `ValueOfLand${subRest_type ?? ""}`, role: 'zero', type , gcnUuid };
        }
        else if (isNaN(value)){
            return { valid: false, field: `ValueOfLand${subRest_type ?? ""}`, role: 'not_exist', type , gcnUuid};
        }else return { valid: true};


    },
     /// market
     infoGuaranteed(value: string,type?: string){
        return { valid: !!value, field: 'infoGuaranteed', role: 'empty', type: type };
    },
    ////////// info nguoi duoc uy quyen
    infoLegalOwner(value: string, field: string){
        return { valid: !!value, field: field, role: 'empty' };
    },

    infoLegalOwnerNumber(value: number | null, field: string, type?: string){
        return { valid: !!value, field: field, role: 'empty', type };
    },

    infoLegalOwnerDate(value: number | null, field: string) {
        const today = Date.now()
        // if(value && value > today && field === "contract_date"){
        //     return { valid: false, field: field, role: 'date' };
        // }
        if(value && value > today){
            return { valid: false, field: field, role: 'date' };
        }
        if (value === null) {
            return { valid: false, field: field, role: 'empty' };
        }
        // if (isNaN(value)) {
        //     return { valid: false, field: field, role: 'not_exist' };
        // }
        return { valid: true };
    },

    // số lượng từng loại
    count(value: number | null){
        return { valid: !!value, field: 'count', role: 'empty' };
    },
    // năm sản xuất
    year(value: number | null){
        return { valid: !!value, field: 'year', role: 'empty' };
    },
    // nhãn hiệu
    branch(value: string){
        return { valid: !!value, field: 'branch', role: 'empty' };
    },
        // nhãn hiệu
    other_branch(value: string){
            return { valid: !!value, field: 'other_brand', role: 'empty' };
        },
    // số loại
    model(value: string){
        return { valid: !!value, field: 'model', role: 'empty' };
    },
    // Nơi sản xuất/lắp ráp
    production(value: string){
        return { valid: !!value, field: 'production', role: 'empty' };
    },
    // tình trạng
    statusMachine(value: string){
        return { valid: !!value, field: 'status', role: 'empty' };
    },
    // Nơi sản xuất/lắp ráp
    descriptionMachine(value: string){
        return { valid: !!value, field: 'description', role: 'empty' };
    },
    // so lượng
    quantityMachine(value: number | null){
        return { valid: !!value, field: 'quantity', role: 'empty' };
    },
    // PTVT
    // loại phương tiện
    transportation_sub_type(value: string){
        return { valid: !!value, field: 'transportation_sub_type', role: 'empty' };
    },
    other_transportation_sub_type(value: string){
        return { valid: !!value, field: 'other_transportation_sub_type', role: 'empty' };
    },
    // nơi sản xuất lắp ráp
    origin_of_production(value: string){
        return { valid: !!value, field: 'origin_of_production', role: 'empty' };
    },
    other_origin_of_production(value: string){
        return { valid: !!value, field: 'other_origin_of_production', role: 'empty' };
    },

    CLCL(value: string){
        return { valid: !!value, field: 'CLCL', role: 'empty' };
    },
    number_register(value: string){
        return { valid: !!value, field: 'number_register', role: 'empty' };
    },

    descriptionLand(value: string, type?:string){
        return { valid: !!value, field: 'descriptionLand', role: 'empty', type };
    },
    legal_document_types(docs: LegalDocsTransportType[],uuid: string){
        return { valid: docs.some(e => e.documents.length > 0), field: 'legal_document_types', role: 'emptyDocs', position: uuid,message:'Vui lòng chọn loại hồ sơ pháp lý'}
    },
    purpose_using_lane(value: boolean, type?: string){
        return { valid: value, field: 'purpose_using_lane', role: 'empty', type };
    },
    purpose_using_lane_other(value: string, type?: string){
        return { valid: !!value, field: 'purpose_using_lane_other', role: 'empty', type };
    },
    quantityPTVT(value: number | null){
        if(value && value === 0){
            console.log(value,'valuevaluevalue')

            return { valid: false, field: 'quantity', role: 'empty' };
        }
        return { valid: true }
    },
    collateral(data: ILOANNormalCollateralData, type: string, metdataConstant: IMetadataConstant){

        const valuation_id = CollateralValidate.valuation_id(data.valuation_id)
        if (!valuation_id.valid) return valuation_id;

        const valuation_date = CollateralValidate.valuation_date(data.valuation_date)
        if (!valuation_date.valid) return valuation_date;

        const valuation_unit_type = CollateralValidate.valuation_unit_type(data.valuation_unit_type)
        if (!valuation_unit_type.valid) return valuation_unit_type;

        switch(data.valuation_unit_type){
            case 'APPRAISAL_BRANCH':
                // DVKD thẩm định giá
                const valuation_unit = CollateralValidate.valuation_unit(data.valuation_unit)
                if (!valuation_unit.valid) return valuation_unit;
                break;
            case 'APPRAISAL_CENTER':
                // TT.TĐTS thực hiện định giá
                const valuation_center = CollateralValidate.valuation_center(data.valuation_center)
                if (!valuation_center.valid) return valuation_center;
                break;
            case 'APPRAISAL_VALUATION':
                const independence_organization = CollateralValidate.independence_organization(data.independence_organization)
                if (!independence_organization.valid) return independence_organization;
                const other_independence_organization = CollateralValidate.other_independence_organization(data.other_independence_organization)
                if (data.independence_organization ==='13' && !other_independence_organization.valid) return other_independence_organization;
                break;
        }
        const purpose = CollateralValidate.purpose(data.purpose)
        if (!purpose.valid) return purpose;
        if(data.purpose==='OTHER'){
            const other_purpose = CollateralValidate.other_purpose(data.other_purpose)
            if (!other_purpose.valid) return other_purpose;
        }
        // validate mmtb, ptvt
        if(type === 'DEVI' || type === 'MEST'){
            const province = CollateralValidate.province(data.province)
            if (!province.valid) return province;
            const district = CollateralValidate.district(data.district)
            if (!district.valid) return district;
        }
        // if(type === 'BALC'){
        //     return CollateralValidate.max_percentage(data.max_percentage,undefined, 'BALC', metdataConstant)
        // }else{
            return CollateralValidate.max_percentage(data.max_percentage,type,metdataConstant, data.uuidActiveData)
        // }
    },
    collateralIgnore(data: ILOANNormalCollateralData, type: string, metdataConstant: IMetadataConstant){
        // validate mmtb, ptvt
        // if(type === 'DEVI' || type === 'MEST'){
        //     const province = CollateralValidate.province(data.province)
        //     if (!province.valid) return province;
        //     const district = CollateralValidate.district(data.district)
        //     if (!district.valid) return district;
        // }
        // if(type === 'BALC'){
        //     return CollateralValidate.max_percentage(data.max_percentage,undefined, 'BALC')
        // }else{
            return CollateralValidate.max_percentage(data.max_percentage, type, metdataConstant, data.uuidActiveData)
        // }
    },
    land(value: string, field: string, type?: string){
        return { valid: !!value, field: field, role: 'empty', type };
    },
    landNumber(value: number | null, field: string, type?: string){
        return { valid: !!value, field: field, role: 'empty', type };
    },

    collateralSubtypeItem(subItem: ISubItems[], type: string, metdataConstant: IMetadataConstant){
        const legalInfoMessage : string = "Thông tin pháp lý giấy chứng nhận không hợp lệ. Vui lòng kiểm tra lại"
        const ownerLengthMsg: string = "TSDB phải có ít nhất 1 thông tin pháp lý chủ sở hữu"
        // let isValid  = { valid: true, field: '', role: '', position: '', message: ''};
        for(let item of subItem){
            if(type ==='DEVI'){
                // MMTB
                const ratio = CollateralValidate.max_percentage_ratio(item.ratio)
                if (!ratio.valid) return {...ratio,position:item.activeUUID}

                const value = CollateralValidate.value_mmtb(item.value)
                if (!value.valid) return {...value,position:item.activeUUID};

                if(item.credit_extension_secured === 'Y'){
                    const info_collatetal = CollateralValidate.info_collatetal(item.info_collatetal)
                    if (!info_collatetal.valid) return {...info_collatetal,position:item.activeUUID};
                }

                // const number_register = CollateralValidate.number_register(item.number_register)
                // if (!number_register.valid) return {...number_register,position:item.activeUUID};

                // detail
                const typeCollateral = CollateralValidate.typeCollateral(item.typeCollateral)
                if (!typeCollateral.valid) return {...typeCollateral,position:item.activeUUID};

                const count = CollateralValidate.count(item.count)
                if (!count.valid) return {...count,position:item.activeUUID};

                const year = CollateralValidate.year(item.year)
                if (!year.valid) return {...year,position:item.activeUUID};

                const branch = CollateralValidate.branch(item.branch)
                if (!branch.valid) return {...branch,position:item.activeUUID};

                const model = CollateralValidate.model(item.model)
                if (!model.valid) return {...model,position:item.activeUUID};

                const production = CollateralValidate.production(item.production)
                if (!production.valid) return {...production,position:item.activeUUID};

                // const status = CollateralValidate.statusMachine(item.status)
                // if (!status.valid) return {...status,position:item.activeUUID};

                // const description = CollateralValidate.description(item.description)
                // if (!description.valid) return {...description,position:item.activeUUID};

                const quantity = CollateralValidate.quantityMachine(item.quantity)
                if (!quantity.valid) return {...quantity,position:item.activeUUID};

            }
            else if(type ==='MEST'){
                // PTVT
                // const type = 

                if(item.owner_wrapper.owner.length === 0) {
                    return {valid: false ,field: "owner", role: "empty",  position: item.activeUUID, message: ownerLengthMsg}
                }

                const ratio = CollateralValidate.max_percentage_ratio(item.ratio)
                if (!ratio.valid) return { ...ratio, position: item.activeUUID }

                const value = CollateralValidate.value_ptvt(item.value)
                if (!value.valid) return { ...value, position: item.activeUUID };

                if(item.credit_extension_secured === 'Y'){
                    const info_collatetal = CollateralValidate.info_collatetal(item.info_collatetal)
                    if (!info_collatetal.valid) return { ...info_collatetal, position: item.activeUUID };
                }

                const transportation_sub_type = CollateralValidate.transportation_sub_type(item.transportation_sub_type)
                if (!transportation_sub_type.valid) return { ...transportation_sub_type, position: item.activeUUID , message: legalInfoMessage};
                // validate otherbrand
                const ruleOtherBrand = metdataConstant['TRANS_MODEL']?.find(i => i.id === item.brand)?.other_flag === true
                
                if (item.transportation_sub_type === 'TRVE_OTHER' || item.transportation_sub_type === "SPVE_OTHER") {
                    const other_transportation_sub_type = CollateralValidate.other_transportation_sub_type(item.other_transportation_sub_type)
                    if (!other_transportation_sub_type.valid) return { ...other_transportation_sub_type, position: item.activeUUID , message: legalInfoMessage};
                     
                }

                if(item.transportation_sub_type !== 'TRVE_OTHER' && item.transportation_sub_type !== 'SPVE_OTHER'){
                    const brand = CollateralValidate.branch(item.brand)
                    if (!brand.valid) return { ...brand, position: item.activeUUID , message: legalInfoMessage};
                }

                if(ruleOtherBrand){
                    const other_branch = CollateralValidate.other_branch(item.other_brand)
                    if (!other_branch.valid) return { ...other_branch, position: item.activeUUID , message: legalInfoMessage};
                }
                const model = CollateralValidate.model(item.model)
                if (!model.valid) return { ...model, position: item.activeUUID , message: legalInfoMessage};

                const origin_of_production = CollateralValidate.origin_of_production(item.origin_of_production)
                if (!origin_of_production.valid) return { ...origin_of_production, position: item.activeUUID , message: legalInfoMessage};

                if (item.origin_of_production === 'OT') {
                    const other_origin_of_production = CollateralValidate.other_origin_of_production(item.other_origin_of_production)
                    if (!other_origin_of_production.valid) return { ...other_origin_of_production, position: item.activeUUID , message: legalInfoMessage};
                }

                // // validate checkbox legal document
                const vLegalDocumentType = CollateralValidate.legal_document_types(item.legal_document_types, item.activeUUID)
                    if(!vLegalDocumentType.valid) return {...vLegalDocumentType}
                if(item.legal_document_types.length <=0){
                    return {valid: false, field:'legal_document_types' }
                }
                const colleteral_status = CollateralValidate.colleteral_status(item.status)
                if (!colleteral_status.valid) return {...colleteral_status,position:item.activeUUID, message: legalInfoMessage};

                const description = CollateralValidate.description(item.description)
                if (!description.valid) return {...description,position:item.activeUUID, message: legalInfoMessage};

                const CLCL = CollateralValidate.CLCL(item.CLCL)
                if (!CLCL.valid) return {...CLCL,position:item.activeUUID, message: legalInfoMessage};
                
                const quantity = CollateralValidate.quantityMachine(item.quantity)
                if (!quantity.valid) return {...quantity,position:item.activeUUID, message: legalInfoMessage};

            }
            else{
                const ratio = CollateralValidate.max_percentage_ratio(item.ratio)
                if (!ratio.valid) return {...ratio,position:item.activeUUID}

                const value = CollateralValidate.value(item.value)
                if (!value.valid) return {...value,position:item.activeUUID};
                // detail
                const typeCollateral = CollateralValidate.typeCollateral(item.typeCollateral)
                if (!typeCollateral.valid) return {...typeCollateral,position:item.activeUUID};

                const license = CollateralValidate.license(item.license)
                if (!license.valid) return {...license,position:item.activeUUID};

                const colleteral_status = CollateralValidate.colleteral_status(item.status)
                if (!colleteral_status.valid) return {...colleteral_status,position:item.activeUUID};

                // type số dư...
                if(type === 'BALC'){
                    const issuer = CollateralValidate.issuer(item.issuer)
                    if (!issuer.valid) return {...issuer,position:item.activeUUID};
                    if(item.issuer === '107'){
                        const other_issuer = CollateralValidate.other_issuer(item.other_issuer)
                        if (!other_issuer.valid) return {...other_issuer,position:item.activeUUID};
                    }
                }
                const description = CollateralValidate.description(item.description)
                if (!description.valid) return {...description,position:item.activeUUID};
            }
        }
        return { valid: true }

    },
    none_empty(list:ICertificateUsePurposes[], type?: string){
        if(list.length <=0){
            return { valid: false, field: 'none_empty', role: 'empty', type };
        }
        return { valid: true};
    },
    certificate_area(value: string,type?: string){
        return { valid: !!value, field: 'certificate_area', role: 'empty', type };
    },
    // validate bất động sản form chung
    validateRest(data: ILOANNormalCollateralData, metdataConstant: IMetadataConstant){
        const status = CollateralValidate.status(data.status)
        if (!status.valid) return status;

        const valuation_id = CollateralValidate.valuation_id(data.valuation_id)
        if (!valuation_id.valid) return valuation_id;

        const valuation_date = CollateralValidate.valuation_date(data.valuation_date)
        if (!valuation_date.valid) return valuation_date;

        const valuation_unit_type = CollateralValidate.valuation_unit_type(data.valuation_unit_type)
        if (!valuation_unit_type.valid) return valuation_unit_type;

        switch(data.valuation_unit_type){
            case 'APPRAISAL_BRANCH':
                // DVKD thẩm định giá
                const valuation_unit = CollateralValidate.valuation_unit(data.valuation_unit)
                if (!valuation_unit.valid) return valuation_unit;
                break;

            case 'APPRAISAL_CENTER':
                // TT.TĐTS thực hiện định giá
                const valuation_center = CollateralValidate.valuation_center(data.valuation_center)
                if (!valuation_center.valid) return valuation_center;
                break;

            case 'APPRAISAL_VALUATION':
                const independence_organization = CollateralValidate.independence_organization(data.independence_organization)
                if (!independence_organization.valid) return independence_organization;
                const other_independence_organization = CollateralValidate.other_independence_organization(data.other_independence_organization)
                if (data.independence_organization ==='13' && !other_independence_organization.valid) return other_independence_organization;
                break;
        }

        const purpose = CollateralValidate.purpose(data.purpose)
        if (!purpose.valid) return purpose;
        if(data.purpose==='OTHER'){
            const other_purpose = CollateralValidate.other_purpose(data.other_purpose)
            if (!other_purpose.valid) return other_purpose;
        }

        const vProvince = CollateralValidate.province(data.province);
        if (!vProvince.valid) return vProvince;

        const vDistrict = CollateralValidate.district(data.district);
        if (!vDistrict.valid) return vDistrict;

        const vWard = CollateralValidate.ward(data.ward);
        if (!vWard.valid) return vWard;

        const vPositionType = CollateralValidate.positionType(data.position_type);
        if (!vPositionType.valid) return vPositionType;

        if(data.position_type === "OTHER"){
            const vOtherPositionType = CollateralValidate.otherPositionType(data.other_position_type);
            if (!vOtherPositionType.valid) return vOtherPositionType;
        }

        if(data.position_type !== 'NO_ROAD'){
            const vWidthRoad =  CollateralValidate.widthRoad(data.lane_width);
            if(!vWidthRoad.valid) return vWidthRoad;
        }

        const description =  CollateralValidate.description(data.description);
        if(!description.valid) return description;

        return CollateralValidate.max_percentage(data.max_percentage,data.type,metdataConstant, data.uuidActiveData)

    },

    validateRestIgnore(data: ILOANNormalCollateralData){
        // const status = CollateralValidate.status(data.status)
        // if (!status.valid) return status;
        // const vProvince = CollateralValidate.province(data.province);
        // if (!vProvince.valid) return vProvince;

        // const vDistrict = CollateralValidate.district(data.district);
        // if (!vDistrict.valid) return vDistrict;

        // const vWard = CollateralValidate.ward(data.ward);
        // if (!vWard.valid) return vWard;

        // const vPositionType = CollateralValidate.positionType(data.position_type);
        // if (!vPositionType.valid) return vPositionType;

        // if(data.position_type === "OTHER"){
        //     const vOtherPositionType = CollateralValidate.otherPositionType(data.other_position_type);
        //     if (!vOtherPositionType.valid) return vOtherPositionType;
        // }

        // const vWidthRoad =  CollateralValidate.widthRoad(data.lane_width);
        // if(!vWidthRoad.valid) return vWidthRoad;

        // const description =  CollateralValidate.description(data.description);
        // if(!description.valid) return description;

        return CollateralValidate.status(data.status)
    },

    ///  validate các type bất động sản
    validateTypeRest(data: ISubItems, type: string, status: string){
        const landMsg : string = "Thông tin Đất không hợp lệ. Vui lòng kiểm tra lại";
        const ctxdLandMsg : string = "Thông tin CTXD trên đất không hợp lệ. Vui lòng kiểm tra lại"
        const ctxdGCNMsg: string = "Thông tin CTXD có GCN QSH riêng không hợp lệ. Vui lòng kiểm tra lại"
        const infoAuthorizedMsg: string = "Văn bản ủy quyền phải có ít nhất 1 thông tin người được ủy quyền";
        const certificateMsg: string = "TSĐB phải ít nhất có 1 thông tin pháp lý giấy chứng nhận";
        const certificateMarketMsg: string = "TSĐB phải ít nhất có 1 thông tin pháp lý";
        const certificatePersonMsg : string = "Giấy chứng nhận phải có ít nhất 1 người sở hữu";
        const legalInfoMessage : string = "Thông tin pháp lý giấy chứng nhận không hợp lệ. Vui lòng kiểm tra lại"
        const legalInfoMarketMessage : string = "Thông tin pháp lý không hợp lệ. Vui lòng kiểm tra lại"
        const infoMarketMessage : string = "Thông tin chi tiết Sạp chợ/Ô TTTM không hợp lệ. Vui lòng kiểm tra lại"

        const legalInfoAssetMsg : string = "Thông tin đất không hợp lệ. Vui lòng kiểm tra lại"
        const departmentOwnerMsg: string = "Thông tin pháp lý chủ sở hữu không hợp lệ. Vui lòng kiểm tra lại";
        const notifyMsg: string = "TSBĐ phải có ít nhất 1 Mục đích sử dụng đất theo GCN";
        const ctxdLandLengthMsg : string = "TSDB phải có ít nhất 1 CTXD trên đất";
        const ctxdLandTypeLengthMsg: string = "TSDB phải có ít nhất 1 loại CTXD trên đất"
        const ctxdGcnQshData: string = "TSDB phải có ít nhất 1 loại CTXD có GCN QSH riêng"
        const dataTypeCTXDLengthMsg: string = "TSDB phải có ít nhất 1 thông tin loại CTXD"
        const CTXDInfoMsg :string = "Thông tin CTXD không hợp lệ. Vui lòng kiểm tra lại"
        const departmentInfoMsg: string = "Thông tin căn hộ không hợp lệ. Vui lòng kiểm tra lại"
        const departmentInfoLandMsg:string = "Thông tin Đất/Dự án không hợp lệ. Vui lòng kiểm tra lại"

        if(type === ETypeLandName.LAND){

            if(data.land.land_wrapper.from_credit_extension === "Y" && status ==='RE_MIXED'){
                const non_business_area = CollateralValidate.nonBusinessArea(data.land.land_wrapper.non_business_area,'non_business_area',ETypeLandName.LAND);
                if(!non_business_area.valid)   return {...non_business_area, gcnUuid:'', message: landMsg};
            }
            const vMaxRatio = CollateralValidate.max_percentage_ratio(data.land.land_wrapper.max_percentage, ETypeLandName.LAND);
            if(!vMaxRatio.valid)   return {...vMaxRatio,gcnUuid: '', message: landMsg};

            const vValueOfLand = CollateralValidate.valueOfLand(data.land.land_wrapper.value_of_land, ETypeLandName.LAND, "",ETypeLandName.LAND);
            if(!vValueOfLand.valid)   return {...vValueOfLand, gcnUuid: '', message: landMsg};

            if(data.land.land_wrapper.credit_extension_secured === 'Y'){
                const vInfoGuaranteed =  CollateralValidate.infoGuaranteed(data.land.land_wrapper.description,ETypeLandName.LAND);
                if(!vInfoGuaranteed.valid) return {...vInfoGuaranteed,gcnUuid: '', message: landMsg};
            }
            const dataLandOwner = data.land.land_legal_information_owner;
            if (dataLandOwner.owner.length > 0) {
                for (let i = 0; i < dataLandOwner.owner.length; ++i) {
                    if (dataLandOwner.owner[i].has_authorize === "Y") {
                        if (dataLandOwner.owner[i].authorized_persons.length === 0) {
                            return { valid: false, field: 'informationAuthorized', role: 'informationAuthorized', activeOwner: i, type: ETypeLandName.LAND, message: infoAuthorizedMsg };
                        }
                        // const activeOwner = dataLandOwner.active
                        for (let author of dataLandOwner.owner[i].authorized_persons) {
                            const activeAuthorIndex = dataLandOwner.owner[i].authorized_persons.findIndex(e => e.person_uuid === author.person_uuid)
                            const vOwnerRelationship = CollateralValidate.infoLegalOwner(author.owner_relationship, 'owner_relationship');
                            if (!vOwnerRelationship.valid) return { ...vOwnerRelationship, activeOwner: i, activeAuthor: activeAuthorIndex, type: ETypeLandName.LAND, message: landMsg};

                            const vBorrowerRelationship = CollateralValidate.infoLegalOwner(author.borrower_relationship, 'borrower_relationship');
                            if (!vBorrowerRelationship.valid) return { ...vBorrowerRelationship, activeOwner: i, activeAuthor: activeAuthorIndex, type: ETypeLandName.LAND, message: landMsg };

                            const vAuthorContract = CollateralValidate.infoLegalOwner(author.authorize_contract, 'authorize_contract');
                            if (!vAuthorContract.valid) return { ...vAuthorContract, activeOwner: i, activeAuthor: activeAuthorIndex, type: ETypeLandName.LAND , message: landMsg};
                        }
                    }
                }
            }

            if (data.land.certificate_legal_info.dataCertificate.length <= 0) {
              return { valid: false, role: 'certificates', message: certificateMsg};
            }
            if(data.land.certificate_legal_info.dataCertificate.length > 0){
                for( let i of data.land.certificate_legal_info.dataCertificate){
                    if(i.persons.length <= 0){
                        return {valid: false,role:'person_certificates' ,active:i.activeUUIDCertificateL, message: certificatePersonMsg}
                    }
                    const typeUseLand =  CollateralValidate.land(i.typeUseLand,'typeUseLand',ETypeLandName.LAND);
                    if(!typeUseLand.valid) return {...typeUseLand,active:i.activeUUIDCertificateL, message: legalInfoMessage};

                    if(i.typeUseLand === "OTHER"){
                        const typeGCN =  CollateralValidate.land(i.typeGCN,'typeGCN',ETypeLandName.LAND);
                        if(!typeGCN.valid) return {...typeGCN,active:i.activeUUIDCertificateL, message: legalInfoMessage};
                    }

                    const numberGCNLegal =  CollateralValidate.land(i.numberGCNLegal,'numberGCNLegal',ETypeLandName.LAND);
                    if(!numberGCNLegal.valid) return {...numberGCNLegal,active:i.activeUUIDCertificateL, message: legalInfoMessage};

                    // const numberGCN =  CollateralValidate.land(i.numberGCN,'numberGCN',ETypeLandName.LAND);
                    // if(!numberGCN.valid) return {...numberGCN,active:i.activeUUIDCertificateL};

                    const dateRange =  CollateralValidate.landNumber(i.dateRange,'issuedDate',ETypeLandName.LAND);
                    if(!dateRange.valid) return {...dateRange,active:i.activeUUIDCertificateL, message: legalInfoMessage};

                    const dateLocation =  CollateralValidate.land(i.dateLocation,'place_of_issue',ETypeLandName.LAND);
                    if(!dateLocation.valid) return {...dateLocation,active:i.activeUUIDCertificateL, message: legalInfoMessage};

                }
            }

            const province =  CollateralValidate.province(data.land.land_legal_infomation_asset.province,ETypeLandName.LAND);
            if(!province.valid) return {...province,pv:'', message: legalInfoAssetMsg};

            const district =  CollateralValidate.district(data.land.land_legal_infomation_asset.district,ETypeLandName.LAND);
            if(!district.valid) return {...district,pv:'', message: legalInfoAssetMsg};

            const ward =  CollateralValidate.ward(data.land.land_legal_infomation_asset.ward,ETypeLandName.LAND);
            if(!ward.valid) return {...ward,pv:'', message: legalInfoAssetMsg};

            const cprovince =  CollateralValidate.province(data.land.land_legal_infomation_asset.certificate_province,ETypeLandName.LAND);
            if(!cprovince.valid) return {...cprovince,pv:'certificate', message: legalInfoAssetMsg};

            const cdistrict =  CollateralValidate.district(data.land.land_legal_infomation_asset.certificate_district,ETypeLandName.LAND);
            if(!cdistrict.valid) return {...cdistrict,pv:'certificate', message: legalInfoAssetMsg};

            const cward =  CollateralValidate.ward(data.land.land_legal_infomation_asset.certificate_ward,ETypeLandName.LAND);
            if(!cward.valid) return {...cward,pv:'certificate', message: legalInfoAssetMsg};


            const vPurpose_using_lane =  CollateralValidate.purpose_using_lane(data.land.land_legal_infomation_asset.purpose_using_lane.length >0,ETypeLandName.LAND);
            if(!vPurpose_using_lane.valid) return {...vPurpose_using_lane, message: legalInfoAssetMsg};

            for(let i of data.land.land_legal_infomation_asset.purpose_using_lane){
                if(i==='OTHER'){
                    const purpose_using_lane_other =  CollateralValidate.land(data.land.land_legal_infomation_asset.purpose_using_lane_other,'purpose_using_lane_other',ETypeLandName.LAND);
                    if(!purpose_using_lane_other.valid) return {...purpose_using_lane_other, message: legalInfoAssetMsg};
                }
            }

            const land_type = data.land.land_legal_infomation_asset.land_asset_types

            if(land_type.length >0){
                for(let item of land_type){
                    const use_purpose =  CollateralValidate.land(item.use_purpose,'use_purpose',ETypeLandName.LAND);
                    if(!use_purpose.valid) return {...use_purpose, active:item.activeUUIDCertificateUsePurposes, message: legalInfoAssetMsg};

                    const certificate_area =  CollateralValidate.certificate_area(item.certificate_area,ETypeLandName.LAND);
                    if(!certificate_area.valid) return {...certificate_area, active:item.activeUUIDCertificateUsePurposes, message: legalInfoAssetMsg};

                    const real_area =  CollateralValidate.landNumber(item.real_area,'real_area',ETypeLandName.LAND);
                    if(!real_area.valid) return {...real_area, active:item.activeUUIDCertificateUsePurposes, message: legalInfoAssetMsg};

                    const land_use_source =  CollateralValidate.land(item.land_use_source,'land_use_source',ETypeLandName.LAND);
                    if(!land_use_source.valid) return {...land_use_source, active:item.activeUUIDCertificateUsePurposes, message: legalInfoAssetMsg};

                    if(item.land_use_source === "LS_14"){
                        const other_land_use_source =  CollateralValidate.land(item.other_land_use_source,'other_land_use_source',ETypeLandName.LAND);
                        if(!other_land_use_source.valid) return {...other_land_use_source, active:item.activeUUIDCertificateUsePurposes, message: legalInfoAssetMsg};
                    }

                    const usage_form =  CollateralValidate.land(item.usage_form,'usage_form',ETypeLandName.LAND);
                    if(!usage_form.valid) return {...usage_form, active:item.activeUUIDCertificateUsePurposes, message: legalInfoAssetMsg};

                    if(item.usage_form === "OTHER"){
                        const other_usage_form =  CollateralValidate.land(item.other_usage_form,'other_usage_form',ETypeLandName.LAND);
                        if(!other_usage_form.valid) return {...other_usage_form, active:item.activeUUIDCertificateUsePurposes, message: legalInfoAssetMsg};
                    }
                }
            }
            else{
                return {valid: false, role:'notify', field: 'land_legal_infomation_asset', message: notifyMsg}
            }



            if(data.land.land_wrapper.has_land_asset === "Y"){

                // validate CTXD
                // const vMaxRatio = CollateralValidate.ratio(Number(data.ctxd_land.ctx_land_wrapper.max_percentage),ETypeLandName.CTXD_LAND);
                // if(!vMaxRatio.valid)   return vMaxRatio;

                // const vValueOfLand = CollateralValidate.valueOfLand(data.ctxd_land.ctx_land_wrapper.value_of_land,ETypeLandName.CTXD_LAND);
                // if(!vValueOfLand.valid)   return vValueOfLand;

                // const vInfoGuaranteed =  CollateralValidate.infoGuaranteed(data.ctxd_land.ctx_land_wrapper.description,ETypeLandName.CTXD_LAND);
                // if(!vInfoGuaranteed.valid) return vInfoGuaranteed;

                // B. Thông tin Pháp lý CTXD

                const land_assets = data.ctxd_land.dataCTXDLand
                if (land_assets.length <= 0) {
                    return { valid: false, role: 'ctxd_land_length' , message: ctxdLandLengthMsg};
                }
                // CTXD trên đất
                for(let i of land_assets){

                    const asset_legal =  CollateralValidate.land(i.asset_legal,'asset_legal',ETypeLandName.CTXD_LAND);
                    if(!asset_legal.valid) return {...asset_legal, active: i.activeUUIDCTXDLand , message: ctxdLandMsg};

                    if(i.asset_legal === "OTHER"){
                        const legal_CTXD_other =  CollateralValidate.land(i.legal_CTXD_other,'legal_CTXD_other',ETypeLandName.CTXD_LAND);
                        if(!legal_CTXD_other.valid) return {...legal_CTXD_other, active: i.activeUUIDCTXDLand, message: ctxdLandMsg};
                    }

                    const province =  CollateralValidate.province(i.provice,ETypeLandName.CTXD_LAND);
                    if(!province.valid) return {...province,pv:'', message: ctxdLandMsg};

                    const district =  CollateralValidate.district(i.district,ETypeLandName.CTXD_LAND);
                    if(!district.valid) return {...district,pv:'', message: ctxdLandMsg};

                    const ward =  CollateralValidate.ward(i.ward,ETypeLandName.CTXD_LAND);
                    if(!ward.valid) return {...ward,pv:'', message: ctxdLandMsg};

                    if(i.asset_legal === "ACCEPTOWN"){
                        const cprovince =  CollateralValidate.province(i.certificate_province,ETypeLandName.CTXD_LAND);
                        if(!cprovince.valid) return {...cprovince,pv:'certificate', message: ctxdLandMsg};

                        const cdistrict =  CollateralValidate.district(i.certificate_district,ETypeLandName.CTXD_LAND);
                        if(!cdistrict.valid) return {...cdistrict,pv:'certificate', message: ctxdLandMsg};

                        const cward =  CollateralValidate.ward(i.certificate_ward,ETypeLandName.CTXD_LAND);
                        if(!cward.valid) return {...cward,pv:'certificate', message: ctxdLandMsg};
                    }
                    if (i.dataTypeCTXD.length <= 0) {
                        return { valid: false, role: 'ctxd_land_type_length' , message: ctxdLandTypeLengthMsg};
                    }
                    if(i.dataTypeCTXD.length>0){
                        for(let type of i.dataTypeCTXD){
                            const land_asset_type =  CollateralValidate.land(type.land_asset_type,'land_asset_type',ETypeLandName.CTXD_LAND);
                            if(!land_asset_type.valid) return {...land_asset_type, active:i.activeUUIDCTXDLand, child: type.activeTypeCTXD, gcnUuid: '', message: ctxdLandMsg};

                            // if(type.land_asset_type === "OTHER"){
                            //     const land_asset_type_other =  CollateralValidate.land(type.land_asset_type,'land_asset_type_other',ETypeLandName.CTXD_LAND);
                            //     if(!land_asset_type_other.valid) return {...land_asset_type_other, active:i.activeUUIDCTXDLand, child: type.activeTypeCTXD, gcnUuid: ''};
                            // }
                        }
                    }
                }

            }
        // CTXD có GCN QSH
            if(data.land.land_wrapper.has_certificated_land_asset === "Y"){
                // validate CTXD có GCN riêng
                if(data.ctxd_gcn_qsh.ctxd_gcn_qsh_data.length === 0){
                    return { valid: false, role: 'ctxd_gcn_qsh_data' , message: ctxdGcnQshData};
                }

                for(let ctxdGcn of data.ctxd_gcn_qsh.ctxd_gcn_qsh_data){

                    if(ctxdGcn.ctxd_gcn_qsh_land_info.ctx_land_wrapper.from_credit_extension === "Y" && status ==='RE_MIXED'){
                        const non_business_area = CollateralValidate.nonBusinessArea(ctxdGcn.ctxd_gcn_qsh_land_info.ctx_land_wrapper.non_business_area,'non_business_area',ETypeLandName.CTXD_GCN);
                        if(!non_business_area.valid)   return {...non_business_area,gcnUuid: ctxdGcn.uuIdCtxdGcnQsh, message: ctxdGCNMsg};
                    }
                    const vMaxRatio = CollateralValidate.max_percentage_ratio(ctxdGcn.ctxd_gcn_qsh_land_info.ctx_land_wrapper.max_percentage,ETypeLandName.CTXD_GCN);
                    if(!vMaxRatio.valid)   return {...vMaxRatio,gcnUuid: ctxdGcn.uuIdCtxdGcnQsh, message: ctxdGCNMsg};

                    // const vValueOfLand = CollateralValidate.valueOfLand(ctxdGcn.ctxd_gcn_qsh_land_info.ctx_land_wrapper.value_of_land,ETypeLandName.CTXD_GCN, "",ETypeLandName.LAND);
                    // if(!vValueOfLand.valid)   return {...vValueOfLand,gcnUuid: ctxdGcn.uuIdCtxdGcnQsh};

                    if(ctxdGcn.ctxd_gcn_qsh_land_info.ctx_land_wrapper.credit_extension_secured === 'Y'){
                        const vInfoGuaranteed =  CollateralValidate.infoGuaranteed(ctxdGcn.ctxd_gcn_qsh_land_info.ctx_land_wrapper.description,ETypeLandName.CTXD_GCN);
                        if(!vInfoGuaranteed.valid) return {...vInfoGuaranteed,gcnUuid: ctxdGcn.uuIdCtxdGcnQsh, message: ctxdGCNMsg};
                    }

                    const dataLandOwner = ctxdGcn.land_legal_information_owner;
                    if (dataLandOwner.owner.length > 0) {
                        for (let i = 0; i < dataLandOwner.owner.length; ++i) {
                            if (dataLandOwner.owner[i].has_authorize === "Y") {
                                if (dataLandOwner.owner[i].authorized_persons.length === 0) {
                                    return { valid: false, field: 'informationAuthorized', role: 'informationAuthorized', activeOwner: i, type: ETypeLandName.CTXD_GCN , message: infoAuthorizedMsg};
                                }
                                for (let author of dataLandOwner.owner[i].authorized_persons) {
                                    const activeAuthor = dataLandOwner.owner[i].authorized_persons.findIndex(e => e.person_uuid === author.person_uuid)
                                    const vOwnerRelationship = CollateralValidate.infoLegalOwner(author.owner_relationship, 'owner_relationship');
                                    if (!vOwnerRelationship.valid) return { ...vOwnerRelationship, activeOwner: i, activeAuthor: activeAuthor, type: ETypeLandName.CTXD_GCN, message: ctxdGCNMsg};

                                    const vBorrowerRelationship = CollateralValidate.infoLegalOwner(author.borrower_relationship, 'borrower_relationship');
                                    if (!vBorrowerRelationship.valid) return { ...vBorrowerRelationship, activeOwner: i, activeAuthor: activeAuthor, type: ETypeLandName.CTXD_GCN , message: ctxdGCNMsg};

                                    const vAuthorContract = CollateralValidate.infoLegalOwner(author.authorize_contract, 'authorize_contract');
                                    if (!vAuthorContract.valid) return { ...vAuthorContract, activeOwner: i, activeAuthor: activeAuthor, type: ETypeLandName.CTXD_GCN , message: ctxdGCNMsg};
                                }
                            }
                        }
                    }

                    if (ctxdGcn.certificate_legal_info.dataCertificate.length <= 0) {
                        return { valid: false, role: 'certificates' , message: certificateMsg};
                    }
                    if(ctxdGcn.certificate_legal_info.dataCertificate.length > 0){
                        for( let i of ctxdGcn.certificate_legal_info.dataCertificate){
                            if(i.persons.length <= 0){
                                return {valid: false,role:'person_certificates' ,active:i.activeUUIDCertificateL, message: certificatePersonMsg}
                            }
                            const typeUseLand =  CollateralValidate.land(i.typeUseLand,'typeUseLand',ETypeLandName.CTXD_GCN);
                            if(!typeUseLand.valid) return {...typeUseLand,active:i.activeUUIDCertificateL , message: legalInfoMessage};

                            if(i.typeUseLand === "OTHER"){
                                const typeGCN =  CollateralValidate.land(i.typeGCN,'typeGCN',ETypeLandName.CTXD_GCN);
                                if(!typeGCN.valid) return {...typeGCN,active:i.activeUUIDCertificateL, message: legalInfoMessage};
                            }
                            const numberGCNLegal =  CollateralValidate.land(i.numberGCNLegal,'numberGCNLegal',ETypeLandName.CTXD_GCN);
                            if(!numberGCNLegal.valid) return {...numberGCNLegal,active:i.activeUUIDCertificateL, message: legalInfoMessage};

                            // const numberGCN =  CollateralValidate.land(i.numberGCN,'numberGCN',ETypeLandName.CTXD_GCN);
                            // if(!numberGCN.valid) return {...numberGCN,active:i.activeUUIDCertificateL, message: legalInfoMessage};

                            const dateRange =  CollateralValidate.landNumber(i.dateRange,'issuedDate',ETypeLandName.CTXD_GCN);
                            if(!dateRange.valid) return {...dateRange,active:i.activeUUIDCertificateL, message: legalInfoMessage};

                            const dateLocation =  CollateralValidate.land(i.dateLocation,'place_of_issue',ETypeLandName.CTXD_GCN);
                            if(!dateLocation.valid) return {...dateLocation,active:i.activeUUIDCertificateL, message: legalInfoMessage};

                        }
                    }

                    // const asset_legal =  CollateralValidate.land(ctxdGcn.ctxd_gcn_qsh_land_info.dataCTXDLand.asset_legal,'asset_legal',ETypeLandName.CTXD_GCN);
                    // if(!asset_legal.valid) return {...asset_legal, gcnUuid: ctxdGcn.uuIdCtxdGcnQsh , message: CTXDInfoMsg};

                    // if(ctxdGcn.ctxd_gcn_qsh_land_info.dataCTXDLand.asset_legal === "OTHER"){
                    //     const legal_CTXD_other =  CollateralValidate.land(ctxdGcn.ctxd_gcn_qsh_land_info.dataCTXDLand.legal_CTXD_other,'legal_CTXD_other',ETypeLandName.CTXD_GCN);
                    //     if(!legal_CTXD_other.valid) return {...legal_CTXD_other, gcnUuid: ctxdGcn.uuIdCtxdGcnQsh, message: CTXDInfoMsg};
                    // }

                    const province =  CollateralValidate.province(ctxdGcn.ctxd_gcn_qsh_land_info.dataCTXDLand.provice,ETypeLandName.CTXD_GCN);
                    if(!province.valid) return {...province,pv:'', gcnUuid: ctxdGcn.uuIdCtxdGcnQsh, message: CTXDInfoMsg};

                    const district =  CollateralValidate.district(ctxdGcn.ctxd_gcn_qsh_land_info.dataCTXDLand.district,ETypeLandName.CTXD_GCN);
                    if(!district.valid) return {...district,pv:'', gcnUuid: ctxdGcn.uuIdCtxdGcnQsh, message: CTXDInfoMsg};

                    const ward =  CollateralValidate.ward(ctxdGcn.ctxd_gcn_qsh_land_info.dataCTXDLand.ward,ETypeLandName.CTXD_GCN);
                    if(!ward.valid) return {...ward,pv:'', gcnUuid: ctxdGcn.uuIdCtxdGcnQsh, message: CTXDInfoMsg};

                    const cprovince =  CollateralValidate.province(ctxdGcn.ctxd_gcn_qsh_land_info.dataCTXDLand.certificate_province,ETypeLandName.CTXD_GCN);
                    if(!cprovince.valid) return {...cprovince,pv:'certificate', gcnUuid: ctxdGcn.uuIdCtxdGcnQsh, message: CTXDInfoMsg};

                    const cdistrict =  CollateralValidate.district(ctxdGcn.ctxd_gcn_qsh_land_info.dataCTXDLand.certificate_district,ETypeLandName.CTXD_GCN);
                    if(!cdistrict.valid) return {...cdistrict,pv:'certificate', gcnUuid: ctxdGcn.uuIdCtxdGcnQsh, message: CTXDInfoMsg};

                    const cward =  CollateralValidate.ward(ctxdGcn.ctxd_gcn_qsh_land_info.dataCTXDLand.certificate_ward,ETypeLandName.CTXD_GCN);
                    if(!cward.valid) return {...cward,pv:'certificate', gcnUuid: ctxdGcn.uuIdCtxdGcnQsh, message: CTXDInfoMsg};

                    if(ctxdGcn.ctxd_gcn_qsh_land_info.dataCTXDLand.dataTypeCTXD.length > 0){
                        for(let type of ctxdGcn.ctxd_gcn_qsh_land_info.dataCTXDLand.dataTypeCTXD){
                            const land_asset_type =  CollateralValidate.land(type.land_asset_type,'land_asset_type',ETypeLandName.CTXD_GCN);
                            if(!land_asset_type.valid) return {...land_asset_type, gcnUuid: ctxdGcn.uuIdCtxdGcnQsh, child: type.activeTypeCTXD, active:"", message: CTXDInfoMsg};

                            // if(type.land_asset_type === "OTHER"){
                            //     const land_asset_type_other =  CollateralValidate.land(type.land_asset_type,'land_asset_type_other',ETypeLandName.CTXD_LAND);
                            //     if(!land_asset_type_other.valid) return {...land_asset_type_other, active:i.activeUUIDCTXDLand, child: type.activeTypeCTXD, gcnUuid: ''};
                            // }
                        }
                    }
                    else {
                        return { valid: false, role : "dataTypeCTXD", message: dataTypeCTXDLengthMsg}
                    }

                }

            }
        }
        if (type === 'MARK') {
            const dataMarket = data.market;
            if(dataMarket.maket_wrapper.from_credit_extension === "Y" && status ==='RE_MIXED'){
                const non_business_area = CollateralValidate.nonBusinessArea(dataMarket.maket_wrapper.non_business_area,'non_business_area','Other');
                if(!non_business_area.valid)   return {...non_business_area,gcnUuid: ''};
            }
            const vMaxRatio = CollateralValidate.max_percentage_ratio(data.market.maket_wrapper.max_percentage,'Other' );
            if(!vMaxRatio.valid)   return {...vMaxRatio,gcnUuid: ''};

            const vValueOfLand = CollateralValidate.valueOfLand(data.market.maket_wrapper.value_of_land,'Other', "", "MARK");
            if(!vValueOfLand.valid)   return {...vValueOfLand,gcnUuid: ''};

            if(data.market.maket_wrapper.credit_extension_secured === 'Y'){
                const vInfoGuaranteed =  CollateralValidate.infoGuaranteed(data.market.maket_wrapper.description,'Other');
                if(!vInfoGuaranteed.valid) return {...vInfoGuaranteed,gcnUuid: ''};
            }

            if (dataMarket.market_owner.owner.length > 0) {
                for (let i = 0; i < dataMarket.market_owner.owner.length; ++i) {
                    if (dataMarket.market_owner.owner[i].has_authorize === "Y") {
                        if (dataMarket.market_owner.owner[i].authorized_persons.length === 0) {
                            return { valid: false, field: 'informationAuthorized', role: 'informationAuthorized', activeOwner: i, type:'Other' , message: infoAuthorizedMsg};
                        }
                        // const activeOwner = dataMarket.market_owner.active

                        for (let author of dataMarket.market_owner.owner[i].authorized_persons) {
							const curentAuthorIndex = dataMarket.market_owner.owner[i].authorized_persons.findIndex(e => e.person_uuid === author.person_uuid)
                            const vOwnerRelationship = CollateralValidate.infoLegalOwner(author.owner_relationship, 'owner_relationship');
                            if (!vOwnerRelationship.valid) return { ...vOwnerRelationship, activeOwner: i, activeAuthor: curentAuthorIndex, type:'Other' , message: departmentOwnerMsg};

                            const vBorrowerRelationship = CollateralValidate.infoLegalOwner(author.borrower_relationship, 'borrower_relationship');
                            if (!vBorrowerRelationship.valid) return { ...vBorrowerRelationship, activeOwner: i, activeAuthor: curentAuthorIndex, type:'Other' , message: departmentOwnerMsg};

                            const vAuthorContract = CollateralValidate.infoLegalOwner(author.authorize_contract, 'authorize_contract');
                            if (!vAuthorContract.valid) return { ...vAuthorContract, activeOwner: i, activeAuthor: curentAuthorIndex, type:'Other' , message: departmentOwnerMsg};
                        }
                    }
                }
            }
            if(data.market.maket_certificates.length <= 0){
                return { valid: false, role: 'certificates' , message: certificateMarketMsg};
            }
            if (data.market.maket_certificates.length > 0) {
                for (let cer of data.market.maket_certificates) {
                    if(cer.persons.length <= 0){
                        return {valid: false,role:'person_certificates' ,active: cer.uuid_maket_certificate, message: certificatePersonMsg}
                    }
                    if (data.has_certificate_maket === "Y") {
                        const vCerName = CollateralValidate.infoLegalOwner(cer.certificate_name, 'certificate_name');
                        if (!vCerName.valid) return {...vCerName, active: cer.uuid_maket_certificate, message : legalInfoMarketMessage};

                        const vCerCode = CollateralValidate.infoLegalOwner(cer.certificate_code, 'certificate_code');
                        if (!vCerCode.valid) return {...vCerCode, active: cer.uuid_maket_certificate, message : legalInfoMarketMessage};

                        const vCerIssueDate = CollateralValidate.infoLegalOwnerDate(cer.issue_date, 'date');
                        if (!vCerIssueDate.valid) return {...vCerIssueDate, active: cer.uuid_maket_certificate, message : legalInfoMarketMessage};

                        const vCerPlaceOfIsuee = CollateralValidate.infoLegalOwner(cer.place_of_issue, 'place_of_issue');
                        if (!vCerPlaceOfIsuee.valid) return {...vCerPlaceOfIsuee, active: cer.uuid_maket_certificate, message : legalInfoMarketMessage};
                    }
                    const vCerContractName = CollateralValidate.infoLegalOwner(cer.contract_name, 'contract_name');
                    if (!vCerContractName.valid) return {...vCerContractName, active: cer.uuid_maket_certificate, message : legalInfoMarketMessage};

                    const vCerContractCode = CollateralValidate.infoLegalOwner(cer.contract_code, 'contract_code');
                    if (!vCerContractCode.valid) return {...vCerContractCode, active: cer.uuid_maket_certificate, message : legalInfoMarketMessage};

                    const vCerContractDate = CollateralValidate.infoLegalOwnerDate(cer.contract_date, 'contract_date');
                    if (!vCerContractDate.valid) return {...vCerContractDate, active: cer.uuid_maket_certificate, message : legalInfoMarketMessage};

                    const vCerContractUnit = CollateralValidate.infoLegalOwner(cer.contract_unit, 'contract_unit');
                    if (!vCerContractUnit.valid) return {...vCerContractUnit, active: cer.uuid_maket_certificate, message : legalInfoMarketMessage};
                }
            }

            const vMarketName = CollateralValidate.infoLegalOwner(data.market.maket_info.market_name, 'market_name');
            if (!vMarketName.valid) return {...vMarketName, message: infoMarketMessage};

            const vMarketCode = CollateralValidate.infoLegalOwner(data.market.maket_info.market_code, 'market_code');
            if (!vMarketCode.valid) return {...vMarketCode, message: infoMarketMessage};

            const vMarketLocation = CollateralValidate.infoLegalOwner(data.market.maket_info.location, 'marketLocation');
            if (!vMarketLocation.valid) return {...vMarketLocation, message: infoMarketMessage};

            const vMarketSector = CollateralValidate.infoLegalOwner(data.market.maket_info.sector, 'sector');
            if (!vMarketSector.valid) return {...vMarketSector, message: infoMarketMessage};

            const vMarketUseArea = CollateralValidate.infoLegalOwner(data.market.maket_info.used_area ?? '', 'used_area');
            if (!vMarketUseArea.valid) return {...vMarketUseArea, message: infoMarketMessage};

            const vMarketValueArea = CollateralValidate.infoLegalOwner(data.market.maket_info.value_area ?? '', 'value_area');
            if (!vMarketValueArea.valid) return{ ...vMarketValueArea, message: infoMarketMessage};

            const vMarketSructure = CollateralValidate.infoLegalOwner(data.market.maket_info.structure, 'structure');
            if (!vMarketSructure.valid) return {...vMarketSructure, message: infoMarketMessage};

        }
        if (type === 'APPA') {
            const dataApa =  data.department
            if(data.department.department_wrapper.from_credit_extension === "Y" && status ==='RE_MIXED'){
                const non_business_area = CollateralValidate.nonBusinessArea(dataApa.department_wrapper.non_business_area,'non_business_area','Other');
                if(!non_business_area.valid)   return {...non_business_area,gcnUuid: ''};
            }
            const vMaxRatio = CollateralValidate.max_percentage_ratio(data.department.department_wrapper.max_percentage,'Other');
            if (!vMaxRatio.valid) return {...vMaxRatio,gcnUuid: ''};

            const vValueOfLand = CollateralValidate.valueOfLand(data.department.department_wrapper.value_of_land, 'Other',"", "APPA");
            if (!vValueOfLand.valid) return {...vValueOfLand,gcnUuid: ''};

            if(data.department.department_wrapper.credit_extension_secured === 'Y'){
                const vInfoGuaranteed = CollateralValidate.infoGuaranteed(data.department.department_wrapper.description,'Other');
                if (!vInfoGuaranteed.valid) return {...vInfoGuaranteed,gcnUuid: ''};
            }

            const vProjectName = CollateralValidate.infoLegalOwner(data.department.project_name, 'project_name');
            if (!vProjectName.valid) return vProjectName;

            if (data.department.department_owner.owner.length > 0) {
                for (let i = 0; i < data.department.department_owner.owner.length; ++i) {
                    if (data.department.department_owner.owner[i].has_authorize === "Y") {
                        if (data.department.department_owner.owner[i].authorized_persons.length <= 0) {
                            return { valid: false, field: 'informationAuthorized', role: 'informationAuthorized', activeOwner: dataApa.department_owner.active, type:'Other', message: infoAuthorizedMsg};
                        }
                        // const activeOwner = dataApa.department_owner.active
                        for (let author of data.department.department_owner.owner[i].authorized_persons) {
                            const activeAuthorIndex = data.department.department_owner.owner[i].authorized_persons.findIndex(e => e.person_uuid === author.person_uuid)
                            const vOwnerRelationship = CollateralValidate.infoLegalOwner(author.owner_relationship, 'owner_relationship');
                            if (!vOwnerRelationship.valid) return {...vOwnerRelationship, activeOwner: i, activeAuthor: activeAuthorIndex, type:'Other', message: departmentOwnerMsg };

                            const vBorrowerRelationship = CollateralValidate.infoLegalOwner(author.borrower_relationship, 'borrower_relationship');
                            if (!vBorrowerRelationship.valid) return {...vBorrowerRelationship, activeOwner: i, activeAuthor: activeAuthorIndex, type:'Other', message: departmentOwnerMsg};

                            const vAuthorContract = CollateralValidate.infoLegalOwner(author.authorize_contract, 'authorize_contract');
                            if (!vAuthorContract.valid) return {...vAuthorContract, activeOwner: i, activeAuthor: activeAuthorIndex, type:'Other', message: departmentOwnerMsg};
                        }
                    }
                }
            }

            if (data.department.department_certificate_legal.length > 0) {
                for (let cer of data.department.department_certificate_legal) {
                    if(cer.persons.length <= 0){
                        return {valid: false,role:'person_certificates' ,active:cer.uuid_certificate_legal, message: certificatePersonMsg}
                    }
                    if (data.department.has_certificate === "Y") {
                        const vCerType = CollateralValidate.infoLegalOwner(cer.other_certificate_type, 'other_certificate_type');  // khoa and hào check lại
                        if (!vCerType.valid) return {...vCerType, active: cer.uuid_certificate_legal, message: legalInfoMessage}; // khoa and hào check lại

                        if (cer.other_certificate_type === "OTHER") {
                            const vCerTypeOther = CollateralValidate.infoLegalOwner(cer.other_certificate_type_other, 'other_certificate_type_other');
                            if (!vCerTypeOther.valid) return {...vCerTypeOther, active: cer.uuid_certificate_legal, message: legalInfoMessage};
                        }
                        const vCerCode = CollateralValidate.infoLegalOwner(cer.certificate_code, 'certificate_code');
                        if (!vCerCode.valid) return {...vCerCode, active: cer.uuid_certificate_legal, message: legalInfoMessage};

                        // const vCerNo = CollateralValidate.infoLegalOwnerNumber(cer.certificate_no, 'certificate_no');
                        // if (!vCerNo.valid) return {...vCerNo, active: cer.uuid_certificate_legal};

                        const vCerIssueDate = CollateralValidate.infoLegalOwnerDate(cer.issue_date, 'date');
                        if (!vCerIssueDate.valid) return {...vCerIssueDate, active: cer.uuid_certificate_legal, message: legalInfoMessage};

                        const vCerPlaceOfIsuee = CollateralValidate.infoLegalOwner(cer.place_of_issue, 'place_of_issue');
                        if (!vCerPlaceOfIsuee.valid) return {...vCerPlaceOfIsuee, active: cer.uuid_certificate_legal, message: legalInfoMessage};
                    }
                    else{
                        const vCerContractType = CollateralValidate.infoLegalOwner(cer.contract_number_type, 'contract_number_type');
                        if (!vCerContractType.valid) return {...vCerContractType, active: cer.uuid_certificate_legal, message: legalInfoMessage};

                        const vCerContractNumber = CollateralValidate.infoLegalOwner(cer.contract_number, 'contract_number');
                        if (!vCerContractNumber.valid) return {...vCerContractNumber, active: cer.uuid_certificate_legal, message: legalInfoMessage};

                        const vCerContractDate = CollateralValidate.infoLegalOwnerDate(cer.contract_date, 'contract_date');
                        if (!vCerContractDate.valid) return {...vCerContractDate, active: cer.uuid_certificate_legal, message: legalInfoMessage};
                    }
                }
            }
            if (data.department.department_info.length === 0){
                return { valid: false, field: 'department_info', role: 'department_info', message: "TSBĐ phải có ít nhất thông tin 1 căn hộ" };
            }
            if (data.department.department_info.length > 0){
                for (let apa of data.department.department_info) {
                    // const vApaHouse = CollateralValidate.infoLegalOwner(apa.apartment_type, 'house_type');
                    // if (!vApaHouse.valid) return {...vApaHouse, active: data.departmentInfoActiveUUID};

                    const vApaType = CollateralValidate.infoLegalOwner(apa.apartment_type, 'apartment_type');
                    if (!vApaType.valid) return {...vApaType, active: apa.departmentInfoActiveUUID, message: departmentInfoMsg};

                    if(apa.apartment_type === "OTHER"){
                        const vApaOther = CollateralValidate.infoLegalOwner(apa.other_apartment_type, 'other_apartment_type');
                        if (!vApaOther.valid) return {...vApaOther, active: apa.departmentInfoActiveUUID, message: departmentInfoMsg};
                    }

                    const vApaNumber = CollateralValidate.infoLegalOwner(apa.apartment_number, 'apartment_number');
                    if (!vApaNumber.valid) return {...vApaNumber, active: apa.departmentInfoActiveUUID, message: departmentInfoMsg};

                    // const vApaBlock = CollateralValidate.infoLegalOwner(apa.block, 'block');
                    // if (!vApaBlock.valid) return {...vApaBlock, active: apa.departmentInfoActiveUUID};

                    const vApaFloor = CollateralValidate.infoLegalOwner(apa.floor, 'floor');
                    if (!vApaFloor.valid) return {...vApaFloor, active: apa.departmentInfoActiveUUID, message: departmentInfoMsg};

                    const vApaArea = CollateralValidate.infoLegalOwner(apa.certificate_area, 'certificate_area_apa_info');
                    if (!vApaArea.valid) return {...vApaArea, active: apa.departmentInfoActiveUUID, message: departmentInfoMsg};

                    const vApaRealArea= CollateralValidate.infoLegalOwnerNumber(apa.real_area, 'real_area_apa_info');
                    if (!vApaRealArea.valid) return {...vApaRealArea, active: apa.departmentInfoActiveUUID, message: departmentInfoMsg};
                }
            }

            // const vApaLandAddress= CollateralValidate.infoLegalOwner(data.department.department_info_land.address, 'address');
            // if (!vApaLandAddress.valid) return {...vApaLandAddress,type: 'Other' , message: departmentInfoLandMsg};

            const vApaLandProvince = CollateralValidate.province(data.department.department_info_land.province);
            if (!vApaLandProvince.valid) return {...vApaLandProvince,type: 'Other', message: departmentInfoLandMsg};

            const vApaLandDistrict = CollateralValidate.district(data.department.department_info_land.district);
            if (!vApaLandDistrict.valid) return {...vApaLandDistrict,type: 'Other', message: departmentInfoLandMsg};

            const vApaLandWard = CollateralValidate.ward(data.department.department_info_land.ward);
            if (!vApaLandWard.valid)  return {...vApaLandWard,type: 'Other', message: departmentInfoLandMsg};

            // const vApaLandCertificateAddress= CollateralValidate.infoLegalOwner(data.department.department_info_land.certificate_address, 'address');
            // if (!vApaLandCertificateAddress.valid) return {...vApaLandCertificateAddress,type: 'certificate', message: departmentInfoLandMsg};

            const vApaLandCertificateProvince = CollateralValidate.province(data.department.department_info_land.certificate_province);
            if (!vApaLandCertificateProvince.valid) return {...vApaLandCertificateProvince, type: 'certificate', message: departmentInfoLandMsg};

            const vApaLandCertificateDistrict = CollateralValidate.district(data.department.department_info_land.certificate_district);
            if (!vApaLandCertificateDistrict.valid) return {...vApaLandCertificateDistrict, type: 'certificate', message: departmentInfoLandMsg};

            const vApaLandCertificateWard = CollateralValidate.ward(data.department.department_info_land.certificate_ward);
            if (!vApaLandCertificateWard.valid) return {...vApaLandCertificateWard, type: 'certificate', message: departmentInfoLandMsg};

            if(data.department.has_certificate === "Y"){
                if(data.department.department_info_land.use_purposes.length === 0){
                    return { valid: false, field: 'use_purposes', role: 'empty' , message: departmentInfoLandMsg};
                }
                if(data.department.department_info_land.use_purposes.some(i => i ==="OTHER") === true){
                    const vApaLandOtherPurpose= CollateralValidate.infoLegalOwner(data.department.department_info_land.other_use_purpose, 'other_use_purpose');
                    if (!vApaLandOtherPurpose.valid) return {...vApaLandOtherPurpose, message: departmentInfoLandMsg}
                }

                if(data.department.department_info_land.certificate_use_purposes.length === 0) {
                    return { valid: false, field: 'certificate_use_purposes', role: 'empty' , message: notifyMsg};
                }
            }

            if(data.department.department_info_land.certificate_use_purposes.length > 0){
                for (let usePup of data.department.department_info_land.certificate_use_purposes) {

                    const vUsePupUsePurpose = CollateralValidate.infoLegalOwner(usePup.use_purpose, 'use_purpose');
                    if (!vUsePupUsePurpose.valid) return {...vUsePupUsePurpose, active: usePup.activeUUIDCertificateUsePurposes, message: departmentInfoLandMsg};

                    const vUsePupArea= CollateralValidate.infoLegalOwner(usePup.certificate_area, 'certificate_area_apa');
                    if (!vUsePupArea.valid) return {...vUsePupArea, active: usePup.activeUUIDCertificateUsePurposes, message: departmentInfoLandMsg};

                    const vUsePupRealArea = CollateralValidate.infoLegalOwnerNumber(usePup.real_area, 'real_area_apa');
                    if (!vUsePupRealArea.valid) return {...vUsePupRealArea, active: usePup.activeUUIDCertificateUsePurposes, message: departmentInfoLandMsg};

                    const vUsePupLandSource= CollateralValidate.infoLegalOwner(usePup.land_use_source, 'land_use_source_apa');
                    if (!vUsePupLandSource.valid) return {...vUsePupLandSource, active: usePup.activeUUIDCertificateUsePurposes, message: departmentInfoLandMsg};

                    const vUsePupDuration= CollateralValidate.infoLegalOwner(usePup.duration, 'duration');
                    if (!vUsePupDuration.valid) return {...vUsePupDuration, active: usePup.activeUUIDCertificateUsePurposes, message: departmentInfoLandMsg};

                    const vUsePupUsageForm = CollateralValidate.infoLegalOwner(usePup.usage_form, 'usage_form_apa');
                    if (!vUsePupUsageForm.valid) return {...vUsePupUsageForm, active: usePup.activeUUIDCertificateUsePurposes, message: departmentInfoLandMsg};
                }
            }
        }
        return { valid: true };
    },

    validateCollateralStorage(dataIgnore: string, metadataConstant: IMetadataConstant, data?: ILOANNormalCollateralData ) {
			const subtypePTVTMsg: string = "Vui lòng chọn loại PTVT";
			const subtypeMMTBMsg: string = "Vui lòng chọn loại MMTB";
			if (data) {
				if(dataIgnore === "Y"){
					const activeData = CollateralValidate.collateral(data, data.type, metadataConstant)
					if (!activeData?.valid) {
						return { ...activeData, position: data.uuidActiveData, data: data.uuidActiveData };
					}
		
					if (data.sub_type[0].id === "" && data.type === "MEST") {
						return { valid: false, role: 'subtype', position: data.uuidActiveData, data: data.uuidActiveData, message: subtypePTVTMsg};
					}
					if (data.sub_type[0].id === "" && data.type === "DEVI") {
						return { valid: false, role: 'subtype', position: data.uuidActiveData, data: data.uuidActiveData, message: subtypeMMTBMsg};
					}
		
					const validItem = CollateralValidate.collateralSubtypeItem(data.sub_type[0].items, data.type, metadataConstant)
			
					if (!validItem?.valid) {
						return { ...validItem, data: data.uuidActiveData };
					}
					// if (data.type === "MEST") {
					//   for (let i of data.sub_type[0].items) {
					//     for (let j of i.legal_document_types) {
					//       const validDocTypes = CollateralValidate.legal_document_types(j, i.activeUUID)
					//       if (!validDocTypes?.valid) {
					//         return { ...validDocTypes };
					//       }
					//     }
					//   }
					// }
					return { valid: true, position: '' };
				}else{
					// const activeData = CollateralValidate.collateralIgnore(data, data.type)
					// if (!activeData?.valid) {
					//   return { ...activeData, position: data.uuidActiveData };
					// }
					if (data.sub_type[0].id === "" && data.type === "MEST") {
						return { valid: false, role: 'subtype', position: data.uuidActiveData, data: data.uuidActiveData, message: subtypePTVTMsg};
					}
					if (data.sub_type[0].id === "" && data.type === "DEVI") {
						return { valid: false, role: 'subtype', position: data.uuidActiveData, data: data.uuidActiveData, message: subtypeMMTBMsg};
					}
					const validItem = CollateralValidate.collateralSubtypeItem(data.sub_type[0].items, data.type, metadataConstant)
			
					if (!validItem?.valid) {
						return { ...validItem, data: data.uuidActiveData};
					}
					// if (activeCollateral.type === "MEST") {
					//   for (let i of activeCollateral.sub_type[0].items) {
					//     for (let j of i.legal_document_types) {
					//       const validDocTypes = CollateralValidate.legal_document_types(j, i.activeUUID)
					//       if (!validDocTypes?.valid) {
					//         return { ...validDocTypes };
					//       }
					//     }
					//   }
					// }
					return { valid: true, position: '' };
				}
			}
			return { valid: true, position: '' };
    },

    validateCollateralRestStorage(dataIgnore: string, metadataConstant: IMetadataConstant, data?: ILOANNormalCollateralData) {
			const subtypeMsg: string = "Vui lòng chọn loại GCN hợp khối";
			if (data) {
				if (dataIgnore === "Y") {
					const activeData = CollateralValidate.validateRest(data,metadataConstant)
					if (!activeData?.valid) {
						return { ...activeData, position: data.uuidActiveData ,data: data.uuidActiveData};
					}
					if (data.sub_type[0].child_sub_type === "") {
						return { valid: false, role: 'subtype', position: data.uuidActiveData, data: data.uuidActiveData, message: subtypeMsg};
					}
					for (let item of data.sub_type[0].items) {
						const validItem = CollateralValidate.validateTypeRest(item, data.sub_type[0].id, data.status)
						if (!validItem?.valid) {
							return { ...validItem, position: item.activeUUID, data: data.uuidActiveData};
						}
					}
					return { valid: true, position: '' };
				} else {
					const activeData = CollateralValidate.validateRestIgnore(data)
					if (!activeData?.valid) {
						return { ...activeData, position: data.uuidActiveData, data: data.uuidActiveData };
					}
					if (data.sub_type[0].child_sub_type === "") {
						return { valid: false, role: 'subtype', position: data.uuidActiveData, data: data.uuidActiveData, message: subtypeMsg};
					}
					for (let item of data.sub_type[0].items) {
						const validItem = CollateralValidate.validateTypeRest(item, data.sub_type[0].id, data.status)
						if (!validItem?.valid) {
							return { ...validItem, position: item.activeUUID, data: data.uuidActiveData };
						}
		
					}
					return { valid: true, position: '' };
				}
			}
		
			return { valid: true, position: '' };
    },

    validateAllCollateral(data: ILOANNormalCollateralData[], dataIgnore: string, metadataConstant: IMetadataConstant){
			for (let index = 0; index < data.length; index++) {
					if(data[index].type === "REST") {
						const vRest = CollateralValidate.validateCollateralRestStorage(dataIgnore, metadataConstant, data[index])
						if(!vRest.valid) return {...vRest, data: data[index].uuidActiveData}
					}
					else {
						const vOther = CollateralValidate.validateCollateralStorage(dataIgnore, metadataConstant, data[index])
						if(!vOther.valid) return {...vOther, data: data[index].uuidActiveData}
					}
			}
			return {valid: true, position: '', data: ''}
    }

}