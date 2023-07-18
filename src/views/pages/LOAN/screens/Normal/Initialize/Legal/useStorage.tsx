import { getAllDataCollateral } from "features/loan/normal/storage/collateralV2/selector";
import {
  getLOANLegalOtherValue,
  getLOANNormalAllFullName,
  getLOANNormalLegalAll,
  getModifyDate
} from "features/loan/normal/storage/legal/selectors";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { ILOANNormalStorageAddress,
  ILOANNormalStorageIdentity,
  ILOANNormalStorageLegalDeclareBasic,
} from "types/models/loan/normal/storage/Legal";
import { generateUUID } from "utils";

const useStorage = (name: string) => {
  const arrDeclare = ["BORROWER", "MARRIAGE", "CO_PAYER", "CO_BRW", "RELATED", "LAW_RLT", "OTHER"];

  const Name = useRef(name);
  const LegalData = useSelector(getLOANNormalLegalAll);
  const dataFullNameContact = useSelector(getLOANNormalAllFullName)
  const valueList = useSelector(getLOANLegalOtherValue);
  const valueModify = useSelector(getModifyDate);

  const dataAddressCollateral = useSelector(getAllDataCollateral);
  
  const AllAddress = () => {
    let arrAddress: ILOANNormalStorageAddress[] = [];
    
    arrDeclare.map(declare => {
      const legalData = LegalData.data[declare]?.info;
      legalData.map(lgd => {
        lgd.address.address.map(d => {
          if (declare !== Name.current){
            
            arrAddress.push(
              Object.assign(
                {},
                d, 
                {
                  ...d, 
                  primaryFlag: false
                }
              )
            )
          }
          else{
            arrAddress.push(d);
          }
          
          return null;
        })
        return null;
      });
      return null;
    })
    arrAddress = arrAddress.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.type === value.type 
      && t.apartment === value.apartment 
      && t.district === value.district 
      && t.ward === value.ward
      && t.province === value.province
    )))
    return arrAddress
  }
  
  const AllAddressCopy = () => {
    let arrAddress:any [] = [];
    arrDeclare.map(declare => {
      const legalData = LegalData.data[declare]?.info;
      legalData.map(lgd => {
        return arrAddress.push({
          declare: declare,
          name: lgd.basic.fullname,
          identity : lgd.identity[0]?.num,
          address: lgd.address.address
        })
      });
      return null;
    })
    return arrAddress.filter(x => x.address.length)
  }
  

  const allIdentity =() =>{
    let arrIdentity :ILOANNormalStorageIdentity[] =[];
    arrDeclare.map(declare => {
      const legalData = LegalData.data[declare]?.info;
      legalData.map(lgd => {
        lgd.identity.map(d => {
          if (declare !== Name.current){
            arrIdentity.push({
              ...d,
              primaryFlag:false
            })
          }
          else{
            arrIdentity.push(d);
          }
          return null;
        })
        return null;
      });
      return null;
    })
    return arrIdentity;
  }

  const allBasicInfo =() =>{
    let arrbasicInfo :ILOANNormalStorageLegalDeclareBasic[] =[];
    arrDeclare.map(declare => {
      const legalData = LegalData.data[declare]?.info;
      legalData.map(lgd => {
        if(declare !== Name.current){
          arrbasicInfo.push({
            ...lgd.basic
          })
        }
        return null;
      });
      return null;
    })
    return arrbasicInfo;
  }

  const validatelegal = () => LegalData.validate;

  const isCheckOnSave = () =>{
    return !~LegalData.data.BORROWER.info[0].declare.indexOf(name);
  }

  const dataAllCollateral = () => {
    // let arr : any [] =[];
    let arr: ILOANNormalStorageAddress[] = [];
    const dataActive = generateUUID()
    dataAddressCollateral.data?.map((item,idx)=>{ // uuidData
      if(item.type === "REST"){
        arr.push({
          province:item.province,
          district:item.district,
          ward:item.ward,
          apartment:item.address,
          type: "COLLA",
          primaryFlag: false,
          uuid: `REST${idx + 1}`,
          uuidRemote: '',
        })
        if(item.sub_type.length >0){
          item.sub_type[0].items.map(sub=>{ // cuc A 
            arr.push({
              apartment:sub.land.land_legal_infomation_asset.address,
              province:sub.land.land_legal_infomation_asset.province,
              district:sub.land.land_legal_infomation_asset.district,
              ward:sub.land.land_legal_infomation_asset.ward,
              type: "COLLA",
              primaryFlag: false,
              uuid: `RESTLAND${idx + 1}`,
              uuidRemote: '',
            })
            arr.push({
              apartment:sub.land.land_legal_infomation_asset.certificate_address,
              province:sub.land.land_legal_infomation_asset.certificate_province,
              district:sub.land.land_legal_infomation_asset.certificate_district,
              ward:sub.land.land_legal_infomation_asset.certificate_ward,
              type: "COLLA",
              primaryFlag: false,
              uuid: `RESTLANDCER${idx +1}`,
              uuidRemote: '',
            })
            sub.ctxd_land.dataCTXDLand?.map(ct=>{ // cuc B
              if(ct.address){  
                arr.push({
                  apartment:ct.address,
                  province:ct.provice,
                  district:ct.district,
                  ward:ct.ward,
                  type: "COLLA",
                  primaryFlag: false,
                  uuid: 'RESTCTXDLAND',
                  uuidRemote: '',
                })
              }
              return ct
            })
            sub.ctxd_gcn_qsh?.ctxd_gcn_qsh_data?.map(q=>{
              if(q?.ctxd_gcn_qsh_land_info?.dataCTXDLand?.address){
                arr.push({   // Địa chỉ thực tế nhà ở/CTXD
                  apartment:q.ctxd_gcn_qsh_land_info.dataCTXDLand.address,
                  province:q.ctxd_gcn_qsh_land_info.dataCTXDLand.provice,
                  district:q.ctxd_gcn_qsh_land_info.dataCTXDLand.district,
                  ward:q.ctxd_gcn_qsh_land_info.dataCTXDLand.ward,
                  type: "COLLA",
                  primaryFlag: false,
                  uuid: 'RESTCTXDLANDReal',
                  uuidRemote: '',
                })
                arr.push({  // Địa chỉ theo GCN
                  apartment:q.ctxd_gcn_qsh_land_info.dataCTXDLand.certificate_address,
                  province:q.ctxd_gcn_qsh_land_info.dataCTXDLand.certificate_province,
                  district:q.ctxd_gcn_qsh_land_info.dataCTXDLand.certificate_district,
                  ward:q.ctxd_gcn_qsh_land_info.dataCTXDLand.certificate_ward,
                  type: "COLLA",
                  primaryFlag: false,
                  uuid: 'RESTCTXDLANDGCN',
                  uuidRemote: '',
                })

              }
              return {...q}
            })
            arr.push({ // chung cư
              apartment:sub.department.department_info_land.address,
              province:sub.department.department_info_land.province,
              district:sub.department.department_info_land.district,
              ward:sub.department.department_info_land.ward,
              type: "COLLA",
              primaryFlag: false,
              uuid: "APA",
              uuidRemote: '',
            })
            return {...sub}
          })
        } 
        return arr
      }
      return {...item}
    })

    arrDeclare.map(declare => {
      const legalData = LegalData.data[declare]?.info;
      legalData.map(lgd => {
        lgd.address.address.map(d => {
          if (declare !== Name.current){
            
            arr.push(
              Object.assign(
                {},
                d, 
                {
                  ...d, 
                  primaryFlag: false
                }
              )
            )
          }
          else{
            arr.push(d);
          }
          
          return null;
        })
        return null;
      });
      return null;
    })

    arr = arr?.filter(it => (it.apartment?.length  || it.province?.length || it.district?.length || it.ward?.length)).filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.type === value.type 
      && t.apartment === value.apartment 
      && t.district === value.district 
      && t.ward === value.ward
      && t.province === value.province
    )))

    return arr
  }


  return {
    validateLegal: validatelegal(),
    allAddress: AllAddress(),
    AllAddressCopy: AllAddressCopy(),
    allIdentity:allIdentity(),
    allBasicInfo: allBasicInfo(),
    isCheckOnSave: isCheckOnSave(),
    dataFullNameContact:dataFullNameContact,
    valueList:valueList,
    declareCheckLegal: LegalData.data.BORROWER.info[0].declare,
    valueModify:valueModify,
    dataAllCollateral:dataAllCollateral()
  }

}

export default useStorage;