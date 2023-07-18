import { Draft, PayloadAction } from "@reduxjs/toolkit"
import { ILOANNormalState } from "types/models/loan/normal";
import {
  ILOANNormalStorageAddress,
  ILOANNormalStorageIdentity,
  ILOANNormalStorageLegalDeclareAddress,
  ILOANNormalStorageLegalBorrowerOther,
  ILOANNormalStorageLegalDeclareBasic,
  ILOANNormalLegalBorrower,
  ILoanNormalLegalAPI,
  ILOANNormalStorageLegalDeclareState,
  ILOANNormalStorageLegalValidate,
  IParamDeleteLOANNormalStoredLegal,
  ILOANNormalLegalReLrt,
  ILOANNormalLegalRelated,
  ILOANNormalChildFile,
  ILOANNormalUpload,
  ILOANNormalStorageLegalFile,
  ILOANNormalLegalBor,
  ILOANNormalLegalRe,
  ILOANNormalAlertBlackListData,
} from "types/models/loan/normal/storage/Legal";
import { generateLOCALUUID, generateUUID, PREFIX_LOCAL,getUuidRemovePrefix } from "utils";
import { generateEmptyAddress } from "views/pages/LOAN/utils";
import { autoFillAllLegal, autofillBorrower, autofillCopayer } from "./autofill";
import {
  generateEmptyChildFile,
  generateEmptyFile,
  generateLoanLegalUser
} from "./generateEmptyLegal";
import * as _ from 'lodash';

export enum ELegalTypeScreen{
  BORROWER = "BORROWER",
  MARRIAGE = "MARRIAGE",
  CO_PAYER = "CO_PAYER",
  CO_BRW = "CO_BRW",
  REALTED = "RELATED",
  LAW_RLT = "LAW_RLT",
  OTHER = "OTHER"
}

export const LegalCase = {

  setLegalValidate(state: Draft<ILOANNormalState>, action: PayloadAction<ILOANNormalStorageLegalValidate>){
    state.storage.legal.validate = action.payload;
  },
  autofillBorrower(state: Draft<ILOANNormalState>, action: PayloadAction<string>){
    state.storage.legal.data.BORROWER = autofillBorrower
  },
  autofillCoPayer(state: Draft<ILOANNormalState>, action: PayloadAction<string>){
    state.storage.legal.data.CO_PAYER.info = autofillCopayer()
  },
  autofillAllLegal(state: Draft<ILOANNormalState>, action: PayloadAction<string>){
    state.storage.legal = autoFillAllLegal
  },


  setLegalBorrowerDeclare(state: Draft<ILOANNormalState>, action: PayloadAction<string[]>){
    state.storage.legal.data.BORROWER.info[0].declare = [ ...action.payload ];
  },

  addLegalDeclareIdentity:{
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<
        ILOANNormalStorageIdentity[], 
        string, 
        { 
          declare:string,
          uuid_persion?: string
        }
      >
    ) {
      const legalSreen: string = action.meta.declare;
      if(
        legalSreen === ELegalTypeScreen.BORROWER || 
        legalSreen === ELegalTypeScreen.MARRIAGE
      ){
        state.storage.legal.data[action.meta.declare].info = 
        state.storage.legal.data[action.meta.declare].info.map((item=>{
            item.identity = action.payload
            return { ...item }
        }))
      }
      else {
       
        if (!action.meta.uuid_persion || action.meta.uuid_persion.length === 0){
          return;
        }


        state.storage.legal.data[action.meta.declare].info = 
          state.storage.legal.data[action.meta.declare].info.map(
            (leInfo) => {
              if (leInfo.uuidActiveLocal === action.meta.uuid_persion){
                leInfo.identity = action.payload;
              }
              return {...leInfo}
            }
          )
      }
        
    },
    prepare(
      payload: ILOANNormalStorageIdentity[], 
      meta: { 
        declare: string,
        uuid_persion?: string
      }
    ) {
      return { payload, meta };
    }
  },

  /// basic info

  setLegalFullNameBasicInfo:{
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string | number | null, string, {declare:string,key:keyof ILOANNormalStorageLegalDeclareBasic }>) {
      state.storage.legal.data[action.meta.declare].info = 
      state.storage.legal.data[action.meta.declare].info.map((item=>{
          item.basic = {
            ...item.basic,
            [action.meta.key]:action.payload
          }
          return { ...item }
      }))
    },
    prepare(payload: string | number | null, meta: {declare:string,key:keyof ILOANNormalStorageLegalDeclareBasic }) {
      return { payload, meta };
    }
  },

  setLegalOtherData:{
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string | number | null, string, {declare:string,key:keyof ILOANNormalStorageLegalBorrowerOther, uuidActiveUser?: string }>) {
      if (action.meta.declare === ELegalTypeScreen.LAW_RLT){
        if (action.meta.uuidActiveUser){
          state.storage.legal.data[action.meta.declare].info = 
            state.storage.legal.data[action.meta.declare].info.map((item=>{
              if(item.uuidActiveLocal === action.meta.uuidActiveUser){
                
                item.other = {
                  ...item.other,
                  [action.meta.key]:action.payload
                }
              }
                return { ...item }
            }))
        }
      }
      else if(action.meta.declare === ELegalTypeScreen.OTHER){
        if (action.meta.uuidActiveUser){
          state.storage.legal.data[action.meta.declare].info = 
            state.storage.legal.data[action.meta.declare].info.map((item=>{
              if(item.uuidActiveLocal === action.meta.uuidActiveUser){
                
                item.other = {
                  ...item.other,
                  [action.meta.key]:action.payload
                }
              }
                return { ...item }
            }))
        }
      }
      else{
        state.storage.legal.data[action.meta.declare].info = 
          state.storage.legal.data[action.meta.declare].info.map((item=>{
              item.other = {
                ...item.other,
                [action.meta.key]:action.payload
              }
              return { ...item }
          }))
      }
    },
    prepare(payload: string | number | null, meta: {declare:string, key:keyof ILOANNormalStorageLegalBorrowerOther, uuidActiveUser?: string }) {
      return { payload, meta };
    }
  },

  /// useList 
  addLegalUseList:{
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string | number | null, string, {declare:string }>) {
      
      const activeUserList = generateUUID();
      state.storage.legal.data[action.meta.declare].uuidActiveLocal = activeUserList;
      
      if (action.meta.declare === ELegalTypeScreen.LAW_RLT){
        
        state.storage.legal.data[action.meta.declare].info.push({
          ...generateLoanLegalUser(),
          basic: {
            customerType: "I",
            person_uuid:"",
            fullname: "",
            birthday:  null,
            placeOfBirth: "",
            gender: "",
            national: "VN",
            marriageStatus: "",
            ownerProperty: "",
            under18:  null,
            over18:  null,
            telephone: "",
            mobile: "",
            email: "",
            education: "",
            ecomonic: "",
            relationship: "",
            tax: "",
            cif: ""
          },
          identity: [
            {
              type: "",
              num: "",
              issuedDate: null,
              expiredDate: null,
              placeOfIssue: "",
              primaryFlag: true,
              uuid: generateUUID(),
              uuidRemote: generateLOCALUUID(),
            }
          ], 
          address: {
            location: "",
            resident: "",
            address: [
              {
                ...generateEmptyAddress(), 
                uuid: generateUUID(), 
                primaryFlag: true
              }
            ]
          },
          uuidActiveLocal:activeUserList
        })
      } 
      else if ( action.meta.declare === ELegalTypeScreen.REALTED){
        state.storage.legal.data[action.meta.declare].info.push({
          ...generateLoanLegalUser(),
          basic: {
            customerType: "I",
            person_uuid:"",
            fullname: "",
            birthday:  null,
            placeOfBirth: "",
            gender: "",
            national: "VN",
            marriageStatus: "",
            ownerProperty: "",
            under18:  null,
            over18:  null,
            telephone: "",
            mobile: "",
            email: "",
            education: "",
            ecomonic: "",
            relationship: "",
            tax: "",
            cif: ""
          },
          address: {
            location: "",
            resident: "", 
            address: [
              {
                ...generateEmptyAddress(), 
                uuid: generateUUID(), 
                primaryFlag: true,
              }
            ]
          },
          uuidActiveLocal:activeUserList
        })
      }
      else{
        state.storage.legal.data[action.meta.declare].info.push({
          ...generateLoanLegalUser(),
          uuidActiveLocal:activeUserList,
          // identity: [
          //   {
          //     type: "",
          //     num: "",
          //     issuedDate: null,
          //     expiredDate: null,
          //     placeOfIssue: "",
          //     primaryFlag: true,
          //     uuid: generateUUID(),
          //     uuidRemote: "",
          //   }
          // ]
        })
      }

    },
    prepare(payload: string | number | null, meta: {declare:string }) {
      return { payload, meta };
    }
  },

  onchangeUseList:{
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string , string, {declare:string }>) {
       state.storage.legal.data[action.meta.declare].uuidActiveLocal = action.payload;

    },
    prepare(payload: string, meta: {declare:string }) {
      return { payload, meta };
    }
  },

  onChangeDataUseList:{
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string | number | null , string, {declare:string , uuidActiveUser:string ,
       key:keyof ILOANNormalStorageLegalDeclareBasic}>) {
        state.storage.legal.data[action.meta.declare].info = 
        state.storage.legal.data[action.meta.declare].info.map(item=>{
        if(item.uuidActiveLocal === action.meta.uuidActiveUser){
          item.basic = {
            ...item.basic,
            [action.meta.key] : action.payload
          }
        }
        return {...item }
      })
    },
    prepare(payload: string | number | null, meta: {declare:string ,uuidActiveUser:string,
      key:keyof ILOANNormalStorageLegalDeclareBasic}) {
      return { payload, meta };
    }
  },

  saveLegalBorrower(state:Draft<ILOANNormalState>,action:PayloadAction<boolean>){},
  saveLegalMarriage(state:Draft<ILOANNormalState>,action:PayloadAction<boolean>){},
  saveLegalCoBorrower(state:Draft<ILOANNormalState>,action:PayloadAction<boolean>){},
  saveLegalCoPayer(state:Draft<ILOANNormalState>,action:PayloadAction<boolean>){},
  saveLegalContact(state:Draft<ILOANNormalState>,action:PayloadAction<boolean>){},
  saveLegalRelated(state:Draft<ILOANNormalState>,action:PayloadAction<boolean>){},
  saveLegalOther(state:Draft<ILOANNormalState>,action:PayloadAction<boolean>){},
  deleteLegal:{
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<
        IParamDeleteLOANNormalStoredLegal,
        string,
        { 
          valueChangeDeclare: string[];
          valueDeclare: string[];
        }
      >
    ){
     
    },
    prepare(
      payload: IParamDeleteLOANNormalStoredLegal,
       meta: { 
        valueChangeDeclare: string[];
        valueDeclare: string[];
      }
    ) {
      return { payload, meta };
    }
  },

  deleteLegalUserListLocal:{reducer(state: Draft<ILOANNormalState>,  action: PayloadAction<string,string, { declare:string }>){
    state.storage.legal.data[action.meta.declare].info = 
    state.storage.legal.data[action.meta.declare].info?.filter(item=>item.uuidActiveLocal !== action.payload)
    const length = state.storage.legal.data[action.meta.declare].info.length;
    if(length>0){
      state.storage.legal.data[action.meta.declare].uuidActiveLocal 
      = state.storage.legal.data[action.meta.declare].info[length-1].uuidActiveLocal
    }
    if(length === 0){
      state.storage.legal.data.BORROWER.info[0].declare =
      state.storage.legal.data.BORROWER.info[0].declare.filter(item=>item !== action.meta.declare)
    }
  },
  prepare( payload: string, meta: { declare:string, }) {
    return { payload, meta };
  }
  },

  deleteLegalUserListByPersonUUID:{
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<
        IParamDeleteLOANNormalStoredLegal,
        string,
        { 
          valueChangeDeclare: string[];
          valueDeclare: string[];
          person_uuid:string;
        }
      >
    ){
      // const declareType = action.payload.declare_type?.toUpperCase();
      // let typeCheck: string = "";
      // typeCheck = declareType === "CO-BORROWER" ? 
      // ELegalTypeScreen.CO_BRW : declareType === "LEGAL-RELATED" ? 
      // ELegalTypeScreen.LAW_RLT : declareType === "CO-PAYER" ?
      // ELegalTypeScreen.CO_PAYER : declareType
      // if(state.storage.full.data){
      //   if(typeCheck === ELegalTypeScreen.CO_BRW){
      //     state.storage.full.data.form.legal_info_form.data.co_brw = state.storage.full.data.form.legal_info_form.data.co_brw
      //     .filter(item=>item.basic_info.uuid !== action.meta.person_uuid)
      //   }
      //   if(typeCheck === ELegalTypeScreen.CO_PAYER){
      //     state.storage.full.data.form.legal_info_form.data.co_payer = state.storage.full.data.form.legal_info_form.data.co_payer
      //     .filter(item=>item.basic_info.uuid !== action.meta.person_uuid)
      //   }
      //   if(typeCheck === ELegalTypeScreen.OTHER){
      //     state.storage.full.data.form.legal_info_form.data.others = state.storage.full.data.form.legal_info_form.data.others
      //     .filter(item=>item.basic_info.uuid !== action.meta.person_uuid)
      //   }
      //   if(typeCheck === ELegalTypeScreen.LAW_RLT){
      //     state.storage.full.data.form.legal_info_form.data.law_rlt = state.storage.full.data.form.legal_info_form.data.law_rlt
      //     .filter(item=>item.basic_info.uuid !== action.meta.person_uuid)
      //   }
      //   if(typeCheck === ELegalTypeScreen.REALTED){
      //     state.storage.full.data.form.legal_info_form.data.related.other_person = state.storage.full.data.form.legal_info_form.data.related.other_person
      //     .filter(item=>item.basic_info.uuid !== action.meta.person_uuid)
      //   }
      // }
    },
    prepare(
      payload: IParamDeleteLOANNormalStoredLegal,
       meta: { 
        valueChangeDeclare: string[];
        valueDeclare: string[];
        person_uuid:string;
      }
    ) {
      return { payload, meta };
    }
  },

  deleteLegalUserListByPersonUUIDFull:{
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<
        IParamDeleteLOANNormalStoredLegal,
        string,
        { 
          valueChangeDeclare: string[];
          valueDeclare: string[];
          person_uuid:string;
        }
      >
    ){
      const declareType = action.payload.declare_type?.toUpperCase();
      let typeCheck: string = "";
      typeCheck = declareType === "CO-BORROWER" ? 
      ELegalTypeScreen.CO_BRW : declareType === "LEGAL-RELATED" ? 
      ELegalTypeScreen.LAW_RLT : declareType === "CO-PAYER" ?
      ELegalTypeScreen.CO_PAYER : declareType
      if(state.storage.full.data){
        if(typeCheck === ELegalTypeScreen.CO_BRW){
          state.storage.full.data.form.legal_info_form.data.co_brw = state.storage.full.data.form.legal_info_form.data.co_brw
          .filter(item=>item.basic_info.uuid !== action.meta.person_uuid)
        }
        if(typeCheck === ELegalTypeScreen.CO_PAYER){
          state.storage.full.data.form.legal_info_form.data.co_payer = state.storage.full.data.form.legal_info_form.data.co_payer
          .filter(item=>item.basic_info.uuid !== action.meta.person_uuid)
        }
        if(typeCheck === ELegalTypeScreen.OTHER){
          state.storage.full.data.form.legal_info_form.data.others = state.storage.full.data.form.legal_info_form.data.others
          .filter(item=>item.basic_info.uuid !== action.meta.person_uuid)
        }
        if(typeCheck === ELegalTypeScreen.LAW_RLT){
          state.storage.full.data.form.legal_info_form.data.law_rlt = state.storage.full.data.form.legal_info_form.data.law_rlt
          .filter(item=>item.basic_info.uuid !== action.meta.person_uuid)
        }
        if(typeCheck === ELegalTypeScreen.REALTED){
          state.storage.full.data.form.legal_info_form.data.related.other_person = state.storage.full.data.form.legal_info_form.data.related.other_person
          .filter(item=>item.basic_info.uuid !== action.meta.person_uuid)
        }
      }
    },
    prepare(
      payload: IParamDeleteLOANNormalStoredLegal,
       meta: { 
        valueChangeDeclare: string[];
        valueDeclare: string[];
        person_uuid:string;
      }
    ) {
      return { payload, meta };
    }
  },
  uploadLegalFileMulti(state: Draft<ILOANNormalState>, action: PayloadAction<ILOANNormalUpload>){},
  downloadLegalFileMulti(state: Draft<ILOANNormalState>, action: PayloadAction<string[]>){},

  mapUploadDataStored:{
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<
        ILOANNormalChildFile[] , 
        string, 
        { 
          declare:string, 
          uuid_user: string; 
          uuid_document_info_list: string;
        }
      >
    ) {
      state.storage.legal.data[action.meta.declare].info = state.storage.legal.data[action.meta.declare].info.map(item=>{
          if(item.uuidActiveLocal === action.meta.uuid_user){
            item.document_info_list = item.document_info_list.map( dil => {
              dil.child_files = action.payload
              return dil
            })
          }
          return {...item }
        })
    },
    prepare(
      payload: ILOANNormalChildFile[],
       meta: { 
        declare:string,
        uuid_user: string;
        uuid_document_info_list: string
      }
    ) {
      return { payload, meta };
    }
  },
  
  mappingLegalDataFileAlterUpload:{
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<
      ILOANNormalStorageLegalFile[], 
        string, 
        { 
          declare:string, 
          uuid_user: string;
        }
      >
    ) { 
      const dataActive = state.storage.legal.data[action.meta.declare].uuidActiveLocal;
      const currentInfo = state.storage.legal.data[action.meta.declare]?.info.find(it=>it.uuidActiveLocal === dataActive);
      if(currentInfo){
        currentInfo.document_info_list = [...action.payload]
        // action.payload.forEach(fileResponse=>{
        //   if(!fileResponse) return;
        //   const customKeys = fileResponse.custom_keys;
        //   if(!customKeys) return;
        //   const {idDoc , local_id}= customKeys;
        //   const currentDoc = currentInfo.document_info_list.find(doc => doc.document_id === idDoc);
        //   if(!currentDoc) return;
        //   if(currentDoc.uuidActiveFile.includes(PREFIX_LOCAL)){
        //     currentDoc.uuidActiveFile = currentDoc.uuidActiveFile.replace(PREFIX_LOCAL,'');
        //   }
        //   const currentIdxFile = currentDoc.child_files.findIndex(file => file.uuid === local_id);
        //   if(currentIdxFile === -1) return;
        //   currentDoc.child_files[currentIdxFile]={...fileResponse};
        // });
      };
    },
    prepare(
      payload: ILOANNormalStorageLegalFile[],
       meta: { 
        declare:string,
        uuid_user: string;
      }
    ) {
      return { payload, meta };
    }
  },

  setLegalDeclareAddress:{
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<
        ILOANNormalStorageAddress[] | string | number | null , 
        string, 
        { 
          declare:string, 
          key: keyof ILOANNormalStorageLegalDeclareAddress
          uuid_persion?: string; 
        }
      >
    ) {
      const legalSreen: string = action.meta.declare;
      if(
        legalSreen === ELegalTypeScreen.BORROWER || 
        legalSreen === ELegalTypeScreen.MARRIAGE
      ){
        state.storage.legal.data[action.meta.declare].info = 
        state.storage.legal.data[action.meta.declare].info.map((item=>{
          item.address = {
            ...item.address,
            [action.meta.key]: action.payload
          }
          return {...item}
        }))
      }
      else {
       
        if (!action.meta.uuid_persion || action.meta.uuid_persion.length === 0){
          return;
        }
        state.storage.legal.data[action.meta.declare].info = 
          state.storage.legal.data[action.meta.declare].info.map(
            (leInfo) => {
              if (leInfo.uuidActiveLocal === action.meta.uuid_persion){
                leInfo.address = {
                  ...leInfo.address,
                  [action.meta.key]: action.payload
                }
              }
              return {...leInfo}
            }
          )
      }
    },
    prepare(
      payload: ILOANNormalStorageAddress[] | string | number | null,
       meta: { 
        declare:string,
        key: keyof ILOANNormalStorageLegalDeclareAddress,
        uuid_persion?: string;
      }
    ) {
      return { payload, meta };
    }
  },

  addLOANNormalStorageLegalDeclareAddress: {
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<
        ILOANNormalStorageAddress , 
        string, 
        { declare:string, uuid_persion?: string}
      >
    ) {
      const legalSreen: string = action.meta.declare;
      if(
        legalSreen === ELegalTypeScreen.BORROWER || 
        legalSreen === ELegalTypeScreen.MARRIAGE
      ){
        state.storage.legal.data[action.meta.declare].info = 
        state.storage.legal.data[action.meta.declare].info.map((item=>{
          item.address.address = [...item.address.address, {...action.payload}];
          return {...item}
        }))
      }
      else {
       
        if (!action.meta.uuid_persion || action.meta.uuid_persion.length === 0){
          return;
        }
        state.storage.legal.data[action.meta.declare].info = 
          state.storage.legal.data[action.meta.declare].info.map(
            (leInfo) => {
              if (leInfo.uuidActiveLocal === action.meta.uuid_persion){
                leInfo.address.address = [...leInfo.address.address, {...action.payload}];
              }
              return {...leInfo}
            }
          )
      }
    },
    prepare(
      payload: ILOANNormalStorageAddress,
       meta: { 
        declare:string,
        uuid_persion?: string
      }
    ) {
      return { payload, meta };
    }
  },

  setLocation: {
    reducer(
      state: Draft<ILOANNormalState>,
      action: PayloadAction<
        Pick<ILOANNormalStorageAddress ,"apartment" | "province" | "district" | "ward">,
        string,
        {
          declare:string , 
          uuid_persion?: string
        }
      >
    ) {
     

      if (!action.meta.uuid_persion || action.meta.uuid_persion.length === 0){
        return;
      }

      state.storage.legal.data[action.meta.declare].info = 
        state.storage.legal.data[action.meta.declare].info.map(
          (leInfo) => {
            if (leInfo.uuidActiveLocal === action.meta.uuid_persion){
              leInfo.address.address = leInfo.address.address.map(ad => {
                   ad = {
                    ...ad,
                    apartment: action.payload.apartment,
                    province: action.payload.province,
                    district: action.payload.district,
                    ward: action.payload.ward,
                   }
                  return {...ad}
                })
            }
            
            return {...leInfo}
          }
        )
    },
    prepare(
      payload: Pick<ILOANNormalStorageAddress ,"apartment" | "province" | "district" | "ward">,
      meta: {
        declare:string , 
        uuid_persion?: string
      }
    ) {
      return { payload, meta };
    },
  },

  updateLOANNormalStorageLegalDeclareAddress:{
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<
        ILOANNormalStorageAddress , 
        string, 
        { declare:string , uuid_persion?: string}
      >
    ) {
      const legalSreen: string = action.meta.declare;
      if(
        legalSreen === ELegalTypeScreen.BORROWER || 
        legalSreen === ELegalTypeScreen.MARRIAGE
      ){
        state.storage.legal.data[action.meta.declare].info = 
          state.storage.legal.data[action.meta.declare].info.map((item=>{
            item.address.address = item.address.address.map(ad => {
                if (ad.uuid === action.payload.uuid){
                  ad = action.payload
                }
                return {...ad}
              })
              return {...item}
            }))
          }
      else {
        if (!action.meta.uuid_persion || action.meta.uuid_persion.length === 0){
          return;
        }

        state.storage.legal.data[action.meta.declare].info = 
          state.storage.legal.data[action.meta.declare].info.map(
            (leInfo) => {
              if (leInfo.uuidActiveLocal === action.meta.uuid_persion){
                leInfo.address.address = leInfo.address.address.map(ad => {
                    if (ad.uuid === action.payload.uuid){
                      ad = action.payload
                    }
                    return {...ad}
                  })
              }
              return {...leInfo}
            }
          )
      }
    },
    prepare(
      payload: ILOANNormalStorageAddress,
       meta: { 
        declare:string,
        uuid_persion?: string
      }
    ) {
      return { payload, meta };
    }
  },

  setLegallDeclareIdentityInfo:{
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<string | number | null, string, 
          { 
            declare:string,
            key: keyof ILOANNormalStorageIdentity, 
            uuidInden: string
          }
        >
    ) {

      state.storage.legal.data[action.meta.declare].info = 
      state.storage.legal.data[action.meta.declare].info.map((item=>{
          item.identity =  item.identity.map(
            (iden) => {
              if (iden.uuid === action.meta.uuidInden){
                return {
                  ...iden,
                  [action.meta.key]: action.payload
                }
              }
              return {...iden}
            }
          )
          return { ...item }
      }))
    },
    prepare(
      payload: string | number | null, 
      meta: { 
        declare:string,
        key: keyof ILOANNormalStorageIdentity,
        uuidInden: string 
      }) {
      return { payload, meta };
    }
  },

  updateLegalResBorrower:{
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<ILOANNormalLegalBorrower,string, string>
    ) {
      
      const dataBor = action.payload;
      const declareType = action.meta.toUpperCase();
      if(declareType === 'MARRIAGE'){
        if(state.storage.full.data){
          state.storage.full.data.form.legal_info_form.data.marriage = action.payload 
        }
      }
      if(declareType === 'BORROWER'){
        if(state.storage.full.data){
          state.storage.full.data.form.legal_info_form.data.borrower = action.payload 
        }
      }


      const uuid = dataBor.basic_info.uuid ?? '';
      const currentDocument:ILOANNormalStorageLegalFile[] = _.get(state.storage,['legal','data',declareType,'info',0,'document_info_list'],[]);
      const activeDocument:ILOANNormalStorageLegalFile[] = [...currentDocument];
      dataBor?.document_info_list?.forEach(doc=>{
        doc.child_files.forEach(file=>{
          const idDoc = file?.custom_keys?.idDoc ?? '';
          const currentDoc = activeDocument.find(d=>d?.document_id?.toString() === idDoc?.toString());
          if(!currentDoc) return;
          const idxFile = currentDoc.child_files.findIndex(f=>f.uuid === file.uuid);
          if(idxFile !== -1) return;
          currentDoc.child_files.push(file);
        })
      });
      state.storage.legal.data[declareType].info[0] = {
        ...state.storage.legal.data[declareType].info[0],
        declare: [...state.storage.legal.data[declareType].info[0].declare],
        cif: dataBor?.cif,
        uuidActiveLocal: uuid,
        basic: {
          ...state.storage.legal.data[declareType].info[0]?.basic,
          person_uuid: dataBor?.basic_info?.uuid ?? "",
          fullname: dataBor?.basic_info?.full_name ?? "",
          customerType: dataBor?.basic_info?.customer_type_info?.id ?? "",
          birthday: (Number(dataBor?.basic_info?.date_of_birth) ?? 0) * 1000,
          placeOfBirth: dataBor?.basic_info?.place_of_birth ?? "",
          gender: dataBor?.basic_info?.gender_info?.id ?? "",
          national: dataBor?.basic_info?.country_info?.country_code ?? "",
          marriageStatus: dataBor?.basic_info?.marital_status_info?.id ?? "",
          ownerProperty: dataBor?.basic_info?.current_house_owner_status_info?.id ?? "",
          under18: dataBor?.basic_info?.dependent_person_under_18 ?? null,
          over18: dataBor?.basic_info?.dependent_person_over_18 ?? null,
          mobile: dataBor?.basic_info?.mobile_num ?? "",
          telephone: dataBor?.basic_info?.telephone_num ?? "",
          email: dataBor?.basic_info?.email ?? "",
          education: dataBor?.basic_info?.educational_status_info?.id ?? "",
          ecomonic: dataBor?.basic_info?.economic_profession_info?.id ?? "",
        },
        other: {
          ...state.storage.legal.data[declareType].info[0]?.other,
          career: dataBor?.other_info?.career_info?.id,
          fatca: dataBor?.other_info?.fatca_info?.id,
          income3Month: dataBor?.other_info?.average_income_3m_amount?.id,
        },
        identity: [
          ...dataBor.identity_info?.map((item, idx) => ({
            type: item?.identity_type?.id,
            num: item?.identity_num,
            issuedDate: (item?.issued_date ?? 0) * 1000,
            expiredDate: (item?.expired_date ?? 0) * 1000,
            placeOfIssue: item?.place_of_issue,
            primaryFlag: item?.primary_flag,
            uuid: item?.uuid,
            uuidRemote: generateLOCALUUID(),
          })) as ILOANNormalStorageIdentity[]
        ],
        address: {
          ...state.storage.legal.data[declareType].info[0].address,
          resident: dataBor?.address_info[0]?.resident_status_info?.id,
          location: dataBor?.address_info[0]?.fcc_location,
          address: dataBor?.address_info?.map((add, idx) => ({
            type: add?.address_type?.id,
            apartment: add?.address,
            province: add?.province_info?.province_code,
            district: add?.district_info?.district_code,
            ward: add?.ward_info?.ward_code,
            primaryFlag: add?.primary_flag,
            uuid: add?.uuid,
            uuidRemote: ""
          })) as ILOANNormalStorageAddress[]
        },
        document_info_list: activeDocument?.map(doc=>({
          ...doc,
          uuidActiveFile:getUuidRemovePrefix(doc.uuidActiveFile),
        })) ?? [],
        uuidActiveFile: "",
      }
      state.storage.legal.data[declareType].uuidActiveLocal = uuid;
    },
    prepare(
      payload: ILOANNormalLegalBorrower, 
      meta: string)
    {
      return { payload, meta };
    }
  },


  updateLegalResListCoBorrower:{
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<ILOANNormalLegalBorrower[],string, string>
    ) {
      const dataCoBor = action.payload
      const declareType = action.meta.toUpperCase()
      let typeCheck: string = "";
      typeCheck = declareType === "CO-BORROWER" ? 
      ELegalTypeScreen.CO_BRW : declareType === "LEGAL-RELATED" ? 
      ELegalTypeScreen.LAW_RLT : declareType === "CO-PAYER" ?
      ELegalTypeScreen.CO_PAYER : declareType === "OTHER" ? ELegalTypeScreen.OTHER : declareType
      if(typeCheck === ELegalTypeScreen.CO_BRW){
        if(state.storage.full.data){
          state.storage.full.data.form.legal_info_form.data.co_brw = action.payload 
        }
      }
      if(typeCheck === ELegalTypeScreen.CO_PAYER){
        if(state.storage.full.data){
          state.storage.full.data.form.legal_info_form.data.co_payer = action.payload 
        }
      }
      if(typeCheck === ELegalTypeScreen.OTHER){
        if(state.storage.full.data){
          state.storage.full.data.form.legal_info_form.data.others = action.payload
        }
      }
      const getActiveDocument = (dataDocDeclare:ILOANNormalStorageLegalFile[],currentDocState:ILOANNormalStorageLegalFile[])=>{
        if(dataDocDeclare.length === 0)   return [];
        const activeDocument:ILOANNormalStorageLegalFile[] = [...currentDocState];
        dataDocDeclare.forEach(doc=>{
          doc.child_files.forEach(file=>{
            const idDoc = file?.custom_keys?.idDoc ?? '';
            const currentDoc = activeDocument.find(d=>d?.document_id?.toString() === idDoc?.toString());
            if(!currentDoc) return;
            const idxFile = currentDoc.child_files.findIndex(f=>f.uuid === file.uuid);
            if(idxFile !== -1) return;
            currentDoc.child_files.push(file);
          })
        });
        return activeDocument;
      }
      const dataMapCobor: ILOANNormalStorageLegalDeclareState[] = [];
        if(dataCoBor.length > 0){
          for (let i=0; i<dataCoBor.length; i++){
            const listDeclare = state.storage.legal.data[typeCheck]?.info ??[];
            const dataActiveLocal = listDeclare.map(item=>item.uuidActiveLocal);
            const currentDoc = _.get(listDeclare.find(it=>it?.basic?.person_uuid === (dataCoBor[i].basic_info?.uuid ?? "")),['document_info_list'],[]);
            dataMapCobor.push({
              uuidActiveFile:"",// activeFile
              document_info_list:getActiveDocument(dataCoBor[i].document_info_list,currentDoc)?.map(doc=>({
                ...doc,
                uuidActiveFile: doc.uuidActiveFile ?? generateUUID(),
              }))??[],
              uuidActiveLocal: dataActiveLocal[i],
              declare:[],
              basic:{
                person_uuid:dataCoBor[i].basic_info?.uuid ?? "",
                fullname:dataCoBor[i].basic_info?.full_name,
                customerType:dataCoBor[i].basic_info?.customer_type_info?.id,
                birthday:(dataCoBor[i].basic_info?.date_of_birth ?? 0 ) * 1000,
                placeOfBirth:dataCoBor[i].basic_info?.place_of_birth,
                gender: dataCoBor[i].basic_info?.gender_info?.id,
                national:dataCoBor[i].basic_info?.country_info?.country_code ,
                marriageStatus:dataCoBor[i].basic_info?.marital_status_info?.id,
                ownerProperty:dataCoBor[i].basic_info?.current_house_owner_status_info?.id ,
                under18:dataCoBor[i].basic_info?.dependent_person_under_18,
                over18: dataCoBor[i].basic_info?.dependent_person_over_18,
                mobile: dataCoBor[i].basic_info?.mobile_num ?? "",
                telephone:dataCoBor[i].basic_info?.telephone_num  ?? "",
                email:dataCoBor[i].basic_info?.email ?? "" ,
                education:dataCoBor[i].basic_info?.educational_status_info?.id ,
                ecomonic:dataCoBor[i].basic_info?.economic_profession_info?.id ,
                relationship:dataCoBor[i].basic_info?.customer_family_relationship_info?.id ,
                tax:dataCoBor[i].basic_info?.tax_code_or_identity ?? "",
                cif:dataCoBor[i].basic_info?.cif_data?.cif_num ?? "",
              },
              identity:typeCheck === "LAW_RLT" ? [{
                type: dataCoBor[i]?.identity_info[0]?.id,
                num: dataCoBor[i]?.identity_info[0]?.identity_num,
                issuedDate:(dataCoBor[i]?.identity_info[0]?.issued_date ?? 0) * 1000,
                expiredDate:(dataCoBor[i]?.identity_info[0]?.expired_date ?? 0) * 1000,
                placeOfIssue:dataCoBor[i]?.identity_info[0]?.place_of_issue,
                primaryFlag:dataCoBor[i]?.identity_info[0]?.primary_flag,
                uuid: generateUUID(),
                uuidRemote: generateLOCALUUID(),
              }] as ILOANNormalStorageIdentity[] : dataCoBor?.length > 0 ?  [
                ...dataCoBor[i]?.identity_info?.map((item,idx)=>({
                  type:item?.identity_type?.id,
                  num:item?.identity_num,
                  issuedDate:(item?.issued_date ?? 0) * 1000,
                  expiredDate:(item?.expired_date ?? 0) * 1000,
                  placeOfIssue:item?.place_of_issue,
                  primaryFlag:item?.primary_flag,
                  uuid:item?.uuid,
                  uuidRemote: generateLOCALUUID(),
                })) as ILOANNormalStorageIdentity[] ?? []
               ] : [],
              address:typeCheck ==="LAW_RLT" ? {} as ILOANNormalStorageLegalDeclareAddress  : {
                resident:dataCoBor[i]?.address_info[0]?.resident_status_info?.id ? dataCoBor[i]?.address_info[0]?.resident_status_info?.id : "",
                location:dataCoBor[i]?.address_info[0]?.resident_status_info?.id ? dataCoBor[i]?.address_info[0]?.resident_status_info?.id : "",
                address: dataCoBor[i]?.address_info?.map((add,idx)=>({
                  type:add?.address_type?.id,
                  apartment:add?.address,
                  province:add?.province_info?.province_code,
                  district:add?.district_info?.district_code,
                  ward:add?.ward_info?.ward_code,
                  primaryFlag:add?.primary_flag,
                  uuid:add?.uuid,
                  uuidRemote:""
                })) as ILOANNormalStorageAddress[] ?? []
              },
              other: typeCheck ==="LAW_RLT" ? {
                note: dataCoBor[i].other_info?.note ?? ""
              } as ILOANNormalStorageLegalBorrowerOther : {
                career:dataCoBor[i].other_info?.career_info?.id,
                fatca:dataCoBor[i].other_info?.fatca_info?.id,
                income3Month:dataCoBor[i].other_info?.average_income_3m_amount?.id,
                note: dataCoBor[i].note ?? ""
              },
            }) as unknown as ILOANNormalStorageLegalDeclareState[]
          }
        }
        state.storage.legal.data[typeCheck] = {
          ...state.storage.legal.data[typeCheck],
          info: dataMapCobor,
          uuidActiveLocal: state.storage.legal.data[typeCheck].uuidActiveLocal
        };
    },
    prepare(
      payload: ILOANNormalLegalBorrower[], 
      meta: string)
    {
      return { payload, meta };
    }
  },

  updateLegalResListLegalRelated:{ // nguoi lien quan theo quy ding pháp luat
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<ILOANNormalLegalReLrt[],string, string>
    ) {
      if(state.storage.full.data){
        state.storage.full.data.form.legal_info_form.data.law_rlt = action.payload
      }
      const dataLawRlt = action.payload

      const dataMapLegalReLatd: ILOANNormalStorageLegalDeclareState[] = [];
      if(dataLawRlt.length > 0){
        for (let i=0; i<dataLawRlt.length; i++){
          const dataActiveLocal = state.storage.legal.data.LAW_RLT.info.map(item=>item.uuidActiveLocal)
          dataMapLegalReLatd.push({
            uuidActiveFile:"",// activeFile
            document_info_list:dataLawRlt[i]?.document_info_list?.map(doc=>{
              const localDoc = state.storage.legal.data.LAW_RLT.info[i]?.document_info_list?.find(localDoc => localDoc.document_id === doc.document_id)
              return {
                ...doc,
                uuidActiveFile: localDoc?.uuidActiveFile ?? generateUUID(),
              }})??[], //list file
            uuidActiveLocal: dataActiveLocal[i],
            declare:[],
            basic:{
              person_uuid:dataLawRlt[i].basic_info?.uuid ?? "",
              fullname:dataLawRlt[i].basic_info?.full_name,
              customerType:dataLawRlt[i].basic_info?.customer_type_info?.id,
              birthday:(dataLawRlt[i].basic_info?.date_of_birth ?? 0 ) * 1000,
              placeOfBirth:dataLawRlt[i].basic_info?.place_of_birth,
              gender: dataLawRlt[i].basic_info?.gender_info?.id,
              national:dataLawRlt[i].basic_info?.country_info?.country_code ?? "VN",
              marriageStatus:dataLawRlt[i].basic_info?.marital_status_info?.id,
              ownerProperty:dataLawRlt[i].basic_info?.current_house_owner_status_info?.id ,
              under18:dataLawRlt[i].basic_info?.dependent_person_under_18,
              over18: dataLawRlt[i].basic_info?.dependent_person_over_18,
              mobile: dataLawRlt[i].basic_info?.mobile_num ?? "",
              telephone:dataLawRlt[i].basic_info?.telephone_num  ?? "",
              email:dataLawRlt[i].basic_info?.email ?? "" ,
              education:dataLawRlt[i].basic_info?.educational_status_info?.id ,
              ecomonic:dataLawRlt[i].basic_info?.economic_profession_info?.id ,
              relationship:dataLawRlt[i].basic_info?.customer_family_relationship_info?.id ,
              tax:dataLawRlt[i].basic_info?.tax_code_or_identity ?? "",
              cif:dataLawRlt[i].basic_info?.cif_data?.cif_num ?? "",
            },
            identity: dataLawRlt[i]?.identity_info.identity_num.length > 0 ? [
              {
                type:dataLawRlt[i]?.identity_info?.identity_type?.id,
                num:dataLawRlt[i]?.identity_info?.identity_num,
                issuedDate:(dataLawRlt[i]?.identity_info?.issued_date ?? 0) * 1000,
                expiredDate:(dataLawRlt[i]?.identity_info?.expired_date ?? 0) * 1000,
                placeOfIssue:dataLawRlt[i]?.identity_info?.place_of_issue,
                primaryFlag:dataLawRlt[i]?.identity_info?.primary_flag,
                uuid:dataLawRlt[i]?.identity_info?.uuid,
                uuidRemote: generateLOCALUUID(),
              } as ILOANNormalStorageIdentity
            ] : [],
            address:{
              resident:dataLawRlt[i]?.address_info?.resident_status_info?.id,
              location:dataLawRlt[i]?.address_info?.resident_status_info?.id,
              address: [
                {
                  type: dataLawRlt[i]?.address_info?.address_type?.id,
                  apartment: dataLawRlt[i]?.address_info.address,
                  province: dataLawRlt[i]?.address_info?.province_info?.province_code,
                  district: dataLawRlt[i]?.address_info.district_info?.district_code,
                  ward: dataLawRlt[i]?.address_info.ward_info?.ward_code,
                  primaryFlag: dataLawRlt[i]?.address_info?.primary_flag,
                  uuid: dataLawRlt[i]?.address_info?.uuid,
                  uuidRemote:""
                }
              ] as ILOANNormalStorageAddress[] ?? []
            },
            other:{
              note: dataLawRlt[i]?.note ?? "",
              career: "",
              fatca: "",
              income3Month: ""
            } as ILOANNormalStorageLegalBorrowerOther,
          })
        }
      }
      state.storage.legal.data.LAW_RLT = {
        ...state.storage.legal.data.LAW_RLT,
        info: dataMapLegalReLatd,
        uuidActiveLocal: state.storage.legal.data.LAW_RLT.uuidActiveLocal
      };


    },
    prepare(
      payload: ILOANNormalLegalReLrt[], 
      meta: string)
    {
      return { payload, meta };
    }
  },

  updateLegalResListLegalContact:{ // nguoi lien he
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<ILOANNormalLegalRelated,string, string>
    ) {
      if(state.storage.full.data){
        state.storage.full.data.form.legal_info_form.data.related = action.payload
      }
      const dataRelated = action.payload.other_person;
      const listPersionLost = action.payload.person_los;

      const dataMapRelated: ILOANNormalStorageLegalDeclareState[] = [];
      if(dataRelated.length > 0){
        for (let i=0; i<dataRelated.length; i++){
          const dataActiveLocal = state.storage.legal.data.RELATED.info.map(item=>item.uuidActiveLocal)
          dataMapRelated.push({
            uuidActiveFile:"",// activeFile
            document_info_list: dataRelated[i]?.document_info_list?.map(doc=>{
              const localDoc = state.storage.legal.data.RELATED.info[i]?.document_info_list?.find(localDoc => localDoc.document_id === doc.document_id)
              return {
              ...doc,
              uuidActiveFile: localDoc?.uuidActiveFile ?? generateUUID(),
            }})??[],
            uuidActiveLocal: dataActiveLocal[i],
            declare:[],
            basic:{
              person_uuid:dataRelated[i].basic_info?.uuid ?? "",
              fullname:dataRelated[i].basic_info?.full_name,
              customerType:dataRelated[i].basic_info?.customer_type_info?.id,
              birthday:(dataRelated[i].basic_info?.date_of_birth ?? 0 ) * 1000,
              placeOfBirth:dataRelated[i].basic_info?.place_of_birth,
              gender: dataRelated[i].basic_info?.gender_info?.id,
              national:dataRelated[i].basic_info?.country_info?.country_code ?? "VN",
              marriageStatus:dataRelated[i].basic_info?.marital_status_info?.id,
              ownerProperty:dataRelated[i].basic_info?.current_house_owner_status_info?.id ,
              under18:dataRelated[i].basic_info?.dependent_person_under_18,
              over18: dataRelated[i].basic_info?.dependent_person_over_18,
              mobile: dataRelated[i].basic_info?.mobile_num ?? "",
              telephone:dataRelated[i].basic_info?.telephone_num  ?? "",
              email:dataRelated[i].basic_info?.email ?? "" ,
              education:dataRelated[i].basic_info?.educational_status_info?.id ,
              ecomonic:dataRelated[i].basic_info?.economic_profession_info?.id ,
              relationship:dataRelated[i].basic_info?.customer_family_relationship_info?.id ,
              tax:dataRelated[i].basic_info?.tax_code_or_identity ?? "",
              cif:dataRelated[i].basic_info?.cif_data?.cif_num ?? "",
            },
            identity:[],
            address:{
              resident:dataRelated[i]?.address_info?.resident_status_info?.id,
              location:dataRelated[i]?.address_info?.resident_status_info?.id,
              address: [
                {
                  type: dataRelated[i]?.address_info?.address_type.id,
                  apartment: dataRelated[i]?.address_info?.address,
                  province: dataRelated[i]?.address_info?.province_info?.province_code,
                  district: dataRelated[i]?.address_info?.district_info?.district_code,
                  ward: dataRelated[i]?.address_info?.ward_info?.ward_code,
                  primaryFlag: dataRelated[i]?.address_info?.primary_flag,
                  uuid: dataRelated[i]?.address_info?.uuid === null ? generateUUID() : dataRelated[i]?.address_info?.uuid,
                  uuidRemote:""
                }
              ] as ILOANNormalStorageAddress[] ?? []
            },
            other:{ } as ILOANNormalStorageLegalBorrowerOther,
          })
        }
      }
      state.storage.legal.data.RELATED = {
        ...state.storage.legal.data.RELATED,
        info: dataMapRelated,
        listContactPersonUUID: listPersionLost.map(lt =>lt.person_uuid),
        uuidActiveLocal: state.storage.legal.data.RELATED.uuidActiveLocal
      };


    },
    prepare(
      payload: ILOANNormalLegalRelated, 
      meta: string)
    {
      return { payload, meta };
    }
  },
  updateLegalDataFromCif:{
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<string, string, {data : ILOANNormalLegalBor, cif: string}>
    ) {

      const dataBor = action.meta.data;
      const newUser = generateLoanLegalUser()
      const dataActiveLocal = dataBor?.basic_info?.uuid ?? "";
      state.storage.legal.data.BORROWER.uuidActiveLocal = dataActiveLocal
      state.storage.legal.data.BORROWER.info[0] = {
        ...newUser,
        cif: action.meta.cif,
        declare: [...state.storage.legal.data.BORROWER.info[0].declare],
        uuidActiveLocal:dataActiveLocal,
        basic:{
          ...newUser.basic,
          person_uuid:dataBor?.basic_info?.uuid ?? "",
          fullname:dataBor?.basic_info?.full_name ?? "",
          customerType:dataBor?.basic_info?.customer_type_info?.id ?? "",
          birthday: dataBor?.basic_info?.date_of_birth ? dataBor?.basic_info?.date_of_birth * 1000 : 0,
          placeOfBirth:dataBor?.basic_info?.place_of_birth ?? "",
          gender: dataBor?.basic_info?.gender_info?.id ?? "",
          national:dataBor?.basic_info?.country_info?.country_code ?? "VN",
          marriageStatus:dataBor?.basic_info?.marital_status_info?.id ?? "",
          ownerProperty:dataBor?.basic_info?.current_house_owner_status_info?.id ?? "",
          under18:dataBor?.basic_info?.dependent_person_under_18 ?? 0,
          over18: dataBor?.basic_info?.dependent_person_over_18 ?? 0,
          mobile: dataBor?.basic_info?.mobile_num ?? "",
          telephone:dataBor?.basic_info?.telephone_num  ?? "",
          email:dataBor?.basic_info?.email ?? "" ,
          education:dataBor?.basic_info?.educational_status_info?.id ?? "",
          ecomonic:dataBor?.basic_info?.economic_profession_info?.id ?? "",
          // relationship:dataBor?.basic_info?.customer_family_relationship_info?.id ?? "",
          // tax:dataBor?.basic_info?.tax_code_or_identity ?? "",
          // cif:dataBor?.basic_info?.cif_data?.cif_num ?? "",
        },
       other:{
         ...newUser.other,
        career:dataBor?.other_info?.career_info?.id ?? "",
        fatca:dataBor?.other_info?.fatca_info?.id ?? "",
        income3Month:dataBor?.other_info?.average_income_3m_amount?.id ?? "",
        note: ""
       },
       identity:[
        ...newUser.identity,
        ...dataBor?.identity_info?.map((item,idx)=>({
          type:item?.identity_type?.id ?? "",
          num:item?.identity_num ?? "",
          issuedDate:item?.issued_date ? item?.issued_date*1000 : null,
          expiredDate:item?.expired_date ? item?.expired_date * 1000 : null,
          placeOfIssue:item?.place_of_issue ?? "",
          primaryFlag:item?.primary_flag ?? false,
          uuid:item?.uuid ?? "",
          uuidRemote: generateLOCALUUID(),
        })) as ILOANNormalStorageIdentity[] ?? []
       ],
       address:{
        ...newUser.address,
        resident: dataBor?.address_info[0]?.resident_status_info?.id ?? '',
        location:dataBor?.address_info[0]?.fcc_location ?? '',
        address:dataBor?.address_info?.map((add,idx)=>({
          type:add?.address_type?.id ?? "",
          apartment: add?.address ?? "",
          province:add?.province_info?.province_code ?? "",
          district:add?.district_info?.district_code ?? "",
          ward:add?.ward_info?.ward_code ?? "",
          primaryFlag:add?.primary_flag ?? true,
          uuid:add?.uuid ?? generateUUID(),
          uuidRemote:""
        })) as ILOANNormalStorageAddress[] ?? []
       },
       document_info_list:dataBor?.document_info_list?.map((docss,idx)=>({
         uuidActiveFile:generateUUID(),
         document_id:docss.document_id,
         document_name:docss.document_name,
         child_files:docss?.child_files?.map((child,idxchi)=>({
          uuid:child.uuid,
          name:child.name,
          content_type:child.content_type,
          display_order:idxchi+1,
          created_at:child.created_at,
          created_by:child.created_by,
          created_by_name: child.created_by_name,
          updated_at: child.updated_at,
          updated_by: child.updated_by,
          updated_by_name: child.updated_by_name,
          description: child.description
          // updated_at:child.updated_at,
          // updated_by:child.updated_by,
        })) as ILOANNormalChildFile[]??[]
       })) as ILOANNormalStorageLegalFile[]??[]
      }
    },

    prepare(
      payload: string, 
      meta: {
        data: ILOANNormalLegalBor,
        cif: string
      })
    {
      return { payload, meta };
    }
  },

  updateLegalFullData:{
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<ILoanNormalLegalAPI ,string, string>
    ) {

      const dataBor = action.payload?.data?.borrower;
      const dataMar = action.payload?.data?.marriage;
      const dataCoBor = action.payload.data?.co_brw;
      const dataCoPayer = action.payload.data?.co_payer;
      const dataLawRlt = action.payload.data?.law_rlt;
      const dataRelated = action.payload.data?.related.other_person;
      const listPerion = action.payload.data.related.person_los;
      
      const dataOrther = action.payload.data?.others;
      const declareCheck = [];
      if (dataMar && dataMar?.basic_info?.uuid.length > 0){
        declareCheck.push(ELegalTypeScreen.MARRIAGE);
      }
      if (dataCoBor.length > 0){
        declareCheck.push(ELegalTypeScreen.CO_BRW);
      }
      if (dataCoPayer.length > 0){
        declareCheck.push(ELegalTypeScreen.CO_PAYER);
      }
      if (dataLawRlt.length > 0 ){
        declareCheck.push(ELegalTypeScreen.LAW_RLT);
      }
      // if (dataRelated.length > 0){
      //   declareCheck.push(ELegalTypeScreen.REALTED);
      // }
      // contact is required
      declareCheck.push(ELegalTypeScreen.REALTED);
      if (dataOrther.length > 0){
        declareCheck.push(ELegalTypeScreen.OTHER);
      }

      const dataActiveLocal = dataBor?.basic_info?.uuid ?? "";
      state.storage.legal.data.BORROWER.uuidActiveLocal = dataActiveLocal
      state.storage.legal.data.BORROWER.info[0] = {
        ...state.storage.legal.data.BORROWER.info[0],
        cif: dataBor?.cif,
        declare: [...declareCheck],
        uuidActiveLocal:dataActiveLocal,
        basic:{
          ...state.storage.legal.data.BORROWER.info[0].basic,
          person_uuid:dataBor?.basic_info?.uuid ?? "",
          fullname:dataBor?.basic_info?.full_name ?? "",
          customerType:dataBor?.basic_info?.customer_type_info?.id ?? "",
          birthday:(dataBor?.basic_info?.date_of_birth ?? 0 ) * 1000 ?? 0,
          placeOfBirth:dataBor?.basic_info?.place_of_birth ?? "",
          gender: dataBor?.basic_info?.gender_info?.id ?? "",
          national:dataBor?.basic_info?.country_info?.country_code ?? "VN",
          marriageStatus:dataBor?.basic_info?.marital_status_info?.id ?? "",
          ownerProperty:dataBor?.basic_info?.current_house_owner_status_info?.id ?? "",
          under18:dataBor?.basic_info?.dependent_person_under_18 ?? 0,
          over18: dataBor?.basic_info?.dependent_person_over_18 ?? 0,
          mobile: dataBor?.basic_info?.mobile_num ?? "",
          telephone:dataBor?.basic_info?.telephone_num  ?? "",
          email:dataBor?.basic_info?.email ?? "" ,
          education:dataBor?.basic_info?.educational_status_info?.id ?? "",
          ecomonic:dataBor?.basic_info?.economic_profession_info?.id ?? "",
          // relationship:dataBor?.basic_info?.customer_family_relationship_info?.id ?? "",
          // tax:dataBor?.basic_info?.tax_code_or_identity ?? "",
          // cif:dataBor?.basic_info?.cif_data?.cif_num ?? "",
        },
       other:{
        ...state.storage.legal.data.BORROWER.info[0]?.other ?? "",
        career:dataBor?.other_info?.career_info?.id ?? "",
        fatca:dataBor?.other_info?.fatca_info?.id ?? "",
        income3Month:dataBor?.other_info?.average_income_3m_amount?.id ?? "",
        note: ""
       },
       identity:[
        // ...state.storage.legal.data.BORROWER?.info[0]?.identity,
        ...dataBor?.identity_info?.map((item,idx)=>({
          type:item?.identity_type?.id,
          num:item?.identity_num,
          issuedDate:(item?.issued_date ?? 0)*1000,
          expiredDate:(item?.expired_date ?? 0 ) * 1000,
          placeOfIssue:item?.place_of_issue,
          primaryFlag:item?.primary_flag,
          uuid:item?.uuid,
          uuidRemote: generateLOCALUUID(),
        })) as ILOANNormalStorageIdentity[] ?? []
       ],
       address:{
        ...state.storage.legal.data.BORROWER.info[0].address,
        resident: dataBor?.address_info[0]?.resident_status_info?.id ?? '',
        location:dataBor?.address_info[0]?.fcc_location ?? '',
        address:dataBor?.address_info?.map((add,idx)=>({
          type:add?.address_type?.id,
          apartment: add?.address,
          province:add?.province_info?.province_code,
          district:add?.district_info?.district_code,
          ward:add?.ward_info?.ward_code,
          primaryFlag:add?.primary_flag,
          uuid:add?.uuid,
          uuidRemote:""
        })) as ILOANNormalStorageAddress[] ?? []
       },
       document_info_list:dataBor?.document_info_list?.map((docss,idx)=>({
         uuidActiveFile:generateUUID(),
         document_id:docss.document_id,
         document_name:docss.document_name,
         child_files:docss?.child_files?.map((child,idxchi)=>({
          uuid:child.uuid,
          name:child.name,
          content_type:child.content_type,
          display_order:idxchi+1,
          created_at:child.created_at,
          created_by:child.created_by,
          created_by_name: child.created_by_name,
          updated_at: child.updated_at,
          updated_by: child.updated_by,
          updated_by_name: child.updated_by_name,
          description: child.description
          // updated_at:child.updated_at,
          // updated_by:child.updated_by,
        })) as ILOANNormalChildFile[]??[]
       })) as ILOANNormalStorageLegalFile[]??[]
      }
      const dataActiveMarr = dataMar?.basic_info?.uuid ?? "";
      state.storage.legal.data.MARRIAGE.uuidActiveLocal = dataActiveMarr
      state.storage.legal.data.MARRIAGE.info[0] = {
        ...state.storage.legal.data?.MARRIAGE?.info[0],
        uuidActiveLocal:dataActiveMarr,
        basic:{
          ...state.storage.legal.data.MARRIAGE.info[0]?.basic,
          person_uuid:dataMar?.basic_info?.uuid ?? "",
          fullname:dataMar?.basic_info?.full_name ?? '',
          customerType:dataMar?.basic_info?.customer_type_info?.id ??'',
          birthday:(dataMar?.basic_info?.date_of_birth ?? 0 ) * 1000,
          placeOfBirth:dataMar?.basic_info?.place_of_birth ?? '',
          gender: dataMar?.basic_info?.gender_info?.id ?? '',
          national:dataMar?.basic_info?.country_info?.country_code ?? "VN",
          marriageStatus:dataMar?.basic_info?.marital_status_info?.id ?? '',
          ownerProperty:dataMar?.basic_info?.current_house_owner_status_info?.id ?? '',
          under18:dataMar?.basic_info?.dependent_person_under_18 ?? null,
          over18: dataMar?.basic_info?.dependent_person_over_18 ?? null,
          mobile: dataMar?.basic_info?.mobile_num ?? "",
          telephone:dataMar?.basic_info?.telephone_num  ?? "",
          email:dataMar?.basic_info?.email ?? "" ,
          education:dataMar?.basic_info?.educational_status_info?.id ?? "" ,
          ecomonic:dataMar?.basic_info?.economic_profession_info?.id ?? "",
          relationship:dataMar?.basic_info?.customer_family_relationship_info?.id ?? "" ,
          tax:dataMar?.basic_info?.tax_code_or_identity ?? "",
          cif:dataMar?.basic_info?.cif_data?.cif_num ?? "",
        },
       other:{
        ...state.storage.legal.data.MARRIAGE.info[0]?.other ?? "",
        career:dataMar?.other_info?.career_info?.id ?? "",
        fatca:dataMar?.other_info?.fatca_info?.id ?? "",
        income3Month:dataMar?.other_info?.average_income_3m_amount?.id ?? "",
        note: ""
       },
       identity:[
        ...state.storage.legal.data.MARRIAGE.info[0]?.identity,
        ...dataMar?.identity_info?.map((item,idx)=>({
          type:item?.identity_type?.id,
          num:item?.identity_num,
          issuedDate:(item?.issued_date ?? 0) * 1000,
          expiredDate:(item?.expired_date ?? 0) * 1000,
          placeOfIssue:item?.place_of_issue,
          primaryFlag:item?.primary_flag,
          uuid:item?.uuid,
          uuidRemote: generateLOCALUUID(),
        })) as ILOANNormalStorageIdentity[] ?? []
       ],
       address:{
        ...state.storage.legal.data.MARRIAGE.info[0].address,
        resident:dataMar?.address_info[0]?.resident_status_info?.id ?? "",
        location:dataMar?.address_info[0]?.resident_status_info?.id ?? "",
        address:dataMar?.address_info?.map((add,idx)=>({
          type:add?.address_type?.id,
          apartment: add?.address,
          province:add?.province_info?.province_code,
          district:add?.district_info?.district_code,
          ward:add?.ward_info?.ward_code,
          primaryFlag:add?.primary_flag,
          uuid:add?.uuid,
          uuidRemote:""
        })) as ILOANNormalStorageAddress[] ?? []
       },
       document_info_list:dataMar?.document_info_list?.map((docss,idx)=>({
        uuidActiveFile:generateUUID(),
        document_id:docss.document_id,
        document_name:docss.document_name,
        child_files:docss?.child_files?.map((child,idxchi)=>({
         uuid:child.uuid,
         name:child.name,
         content_type:child.content_type,
         display_order:idxchi+1,
         created_at:child.created_at,
          created_by:child.created_by,
          created_by_name: child.created_by_name,
          updated_at: child.updated_at,
          updated_by: child.updated_by,
          updated_by_name: child.updated_by_name,
         description: child.description
         // updated_at:child.updated_at,
         // updated_by:child.updated_by,
       })) as ILOANNormalChildFile[]??[]
      })) as ILOANNormalStorageLegalFile[]??[]
      }

      const dataMapCobor: ILOANNormalStorageLegalDeclareState[] = [];
      if(dataCoBor.length > 0){
        for (let i=0; i<dataCoBor.length; i++){
          dataMapCobor.push({
            uuidActiveFile:"",// activeFile
            uuidActiveLocal: dataCoBor[i]?.basic_info?.uuid,
            declare:[],
            basic:{
              person_uuid:dataCoBor[i].basic_info?.uuid ?? "",
              fullname:dataCoBor[i].basic_info?.full_name,
              customerType:dataCoBor[i].basic_info?.customer_type_info?.id,
              birthday:(dataCoBor[i].basic_info?.date_of_birth ?? 0 ) * 1000,
              placeOfBirth:dataCoBor[i].basic_info?.place_of_birth,
              gender: dataCoBor[i].basic_info?.gender_info?.id,
              national:dataCoBor[i].basic_info?.country_info?.country_code ?? "VN",
              marriageStatus:dataCoBor[i].basic_info?.marital_status_info?.id,
              ownerProperty:dataCoBor[i].basic_info?.current_house_owner_status_info?.id ,
              under18:dataCoBor[i].basic_info?.dependent_person_under_18,
              over18: dataCoBor[i].basic_info?.dependent_person_over_18,
              mobile: dataCoBor[i].basic_info?.mobile_num ?? "",
              telephone:dataCoBor[i].basic_info?.telephone_num  ?? "",
              email:dataCoBor[i].basic_info?.email ?? "" ,
              education:dataCoBor[i].basic_info?.educational_status_info?.id ,
              ecomonic:dataCoBor[i].basic_info?.economic_profession_info?.id ,
              relationship:dataCoBor[i].basic_info?.customer_family_relationship_info?.id ,
              tax:dataCoBor[i].basic_info?.tax_code_or_identity ?? "",
              cif:dataCoBor[i].basic_info?.cif_data?.cif_num ?? "",
            },
            identity:[
              ...dataCoBor[i]?.identity_info?.map((item,idx)=>({
                type:item?.identity_type?.id,
                num:item?.identity_num,
                issuedDate:(item?.issued_date ?? 0) * 1000,
                expiredDate:(item?.expired_date ?? 0) * 1000,
                placeOfIssue:item?.place_of_issue,
                primaryFlag:item?.primary_flag,
                uuid:item?.uuid,
                uuidRemote: generateLOCALUUID(),
              })) as ILOANNormalStorageIdentity[] ?? []
             ],
            address:{
              resident:dataCoBor[i]?.address_info[0]?.resident_status_info?.id,
              location:dataCoBor[i]?.address_info[0]?.resident_status_info?.id,
              address: dataCoBor[i]?.address_info?.map((add,idx)=>({
                type:add?.address_type?.id,
                apartment:add?.address,
                province:add?.province_info?.province_code,
                district:add?.district_info?.district_code,
                ward:add?.ward_info?.ward_code,
                primaryFlag:add?.primary_flag,
                uuid:add?.uuid,
                uuidRemote:""
              })) as ILOANNormalStorageAddress[] ?? []
            },
            other:{
              career:dataCoBor[i].other_info?.career_info?.id ?? "",
              fatca:dataCoBor[i].other_info?.fatca_info?.id ?? "",
              income3Month:dataCoBor[i].other_info?.average_income_3m_amount?.id ?? "",
              note: dataCoBor[i].other_info?.note ?? ""
            },
            document_info_list:dataCoBor[i]?.document_info_list?.map((docss,idx)=>({
              uuidActiveFile:generateUUID(),
              document_id:docss.document_id,
              document_name:docss.document_name,
              child_files:docss?.child_files?.map((child,idxchi)=>({
                uuid:child.uuid,
                name:child.name,
                content_type:child.content_type,
                display_order:idxchi+1,
                created_at:child.created_at,
                created_by:child.created_by,
                created_by_name: child.created_by_name,
                updated_at: child.updated_at,
                updated_by: child.updated_by,
                updated_by_name: child.updated_by_name,
                description: child.description
               // updated_at:child.updated_at,
               // updated_by:child.updated_by,
             })) as ILOANNormalChildFile[]??[]
            })) as ILOANNormalStorageLegalFile[]??[]
          })
        }
      }
      state.storage.legal.data.CO_BRW = {
        ...state.storage.legal.data.CO_BRW,
        info: dataMapCobor,
        uuidActiveLocal: dataMapCobor.length > 0 ? dataMapCobor[0].uuidActiveLocal : ""
      };

      const dataMapCoPayer: ILOANNormalStorageLegalDeclareState[] = [];
      if(dataCoPayer.length > 0){
        for (let i=0; i<dataCoPayer.length; i++){
          dataMapCoPayer.push({
            uuidActiveFile:"",// activeFile
            uuidActiveLocal: dataCoPayer[i]?.basic_info?.uuid,
            declare:[],
            basic:{
              person_uuid:dataCoPayer[i].basic_info?.uuid ?? "",
              fullname:dataCoPayer[i].basic_info?.full_name,
              customerType:dataCoPayer[i].basic_info?.customer_type_info?.id,
              birthday:(dataCoPayer[i].basic_info?.date_of_birth ?? 0 ) * 1000,
              placeOfBirth:dataCoPayer[i].basic_info?.place_of_birth,
              gender: dataCoPayer[i].basic_info?.gender_info?.id,
              national:dataCoPayer[i].basic_info?.country_info?.country_code ?? "VN",
              marriageStatus:dataCoPayer[i].basic_info?.marital_status_info?.id,
              ownerProperty:dataCoPayer[i].basic_info?.current_house_owner_status_info?.id ,
              under18:dataCoPayer[i].basic_info?.dependent_person_under_18,
              over18: dataCoPayer[i].basic_info?.dependent_person_over_18,
              mobile: dataCoPayer[i].basic_info?.mobile_num ?? "",
              telephone:dataCoPayer[i].basic_info?.telephone_num  ?? "",
              email:dataCoPayer[i].basic_info?.email ?? "" ,
              education:dataCoPayer[i].basic_info?.educational_status_info?.id ,
              ecomonic:dataCoPayer[i].basic_info?.economic_profession_info?.id ,
              relationship:dataCoPayer[i].basic_info?.customer_family_relationship_info?.id ,
              tax:dataCoPayer[i].basic_info?.tax_code_or_identity ?? "",
              cif:dataCoPayer[i].basic_info?.cif_data?.cif_num ?? "",
            },
            identity:[
              ...dataCoPayer[i]?.identity_info?.map((item,idx)=>({
                type:item?.identity_type?.id,
                num:item?.identity_num,
                issuedDate:(item?.issued_date ?? 0) * 1000,
                expiredDate:(item?.expired_date ?? 0) * 1000,
                placeOfIssue:item?.place_of_issue,
                primaryFlag:item?.primary_flag,
                uuid:item?.uuid,
                uuidRemote: generateLOCALUUID(),
              })) as ILOANNormalStorageIdentity[] ?? []
             ],
            address:{
              resident:dataCoPayer[i]?.address_info[0]?.resident_status_info?.id,
              location:dataCoPayer[i]?.address_info[0]?.resident_status_info?.id,
              address: dataCoPayer[i]?.address_info?.map((add,idx)=>({
                type:add?.address_type?.id,
                apartment:add?.address,
                province:add?.province_info?.province_code,
                district:add?.district_info?.district_code,
                ward:add?.ward_info?.ward_code,
                primaryFlag:add?.primary_flag,
                uuid:add?.uuid,
                uuidRemote:""
              })) as ILOANNormalStorageAddress[] ?? []
            },
            other:{
              career:dataCoPayer[i].other_info?.career_info?.id ?? "",
              fatca:dataCoPayer[i].other_info?.fatca_info?.id ?? "",
              income3Month:dataCoPayer[i].other_info?.average_income_3m_amount?.id ?? "",
              note: dataCoPayer[i].other_info?.note ?? ""
            },
            document_info_list:dataCoPayer[i]?.document_info_list?.map((docss,idx)=>({
              uuidActiveFile:generateUUID(),
              document_id:docss.document_id,
              document_name:docss.document_name,
              child_files:docss?.child_files?.map((child,idxchi)=>({
                uuid:child.uuid,
                name:child.name,
                content_type:child.content_type,
                display_order:idxchi+1,
                created_at:child.created_at,
                created_by:child.created_by,
                created_by_name: child.created_by_name,
                updated_at: child.updated_at,
                updated_by: child.updated_by,
                updated_by_name: child.updated_by_name,
                description: child.description
               // updated_at:child.updated_at,
               // updated_by:child.updated_by,
             })) as ILOANNormalChildFile[]??[]
            })) as ILOANNormalStorageLegalFile[]??[]
          })
        }
      }
      state.storage.legal.data.CO_PAYER = {
        ...state.storage.legal.data.CO_PAYER,
        info: dataMapCoPayer,
        uuidActiveLocal: dataMapCoPayer.length > 0 ? dataMapCoPayer[0].uuidActiveLocal : ""
      };

      const dataMapLegalReLatd: ILOANNormalStorageLegalDeclareState[] = [];
      if(dataLawRlt.length > 0){
        for (let i=0; i<dataLawRlt.length; i++){
          dataMapLegalReLatd.push({
            uuidActiveFile:"",// activeFile
            uuidActiveLocal: dataLawRlt[i]?.basic_info?.uuid,
            declare:[],
            basic:{
              person_uuid:dataLawRlt[i].basic_info?.uuid ?? "",
              fullname:dataLawRlt[i].basic_info?.full_name,
              customerType:dataLawRlt[i].basic_info?.customer_type_info?.id,
              birthday:(dataLawRlt[i].basic_info?.date_of_birth ?? 0 ) * 1000,
              placeOfBirth:dataLawRlt[i].basic_info?.place_of_birth,
              gender: dataLawRlt[i].basic_info?.gender_info?.id,
              national:dataLawRlt[i].basic_info?.country_info?.country_code ?? "VN",
              marriageStatus:dataLawRlt[i].basic_info?.marital_status_info?.id,
              ownerProperty:dataLawRlt[i].basic_info?.current_house_owner_status_info?.id ,
              under18:dataLawRlt[i].basic_info?.dependent_person_under_18,
              over18: dataLawRlt[i].basic_info?.dependent_person_over_18,
              mobile: dataLawRlt[i].basic_info?.mobile_num ?? "",
              telephone:dataLawRlt[i].basic_info?.telephone_num  ?? "",
              email:dataLawRlt[i].basic_info?.email ?? "" ,
              education:dataLawRlt[i].basic_info?.educational_status_info?.id ,
              ecomonic:dataLawRlt[i].basic_info?.economic_profession_info?.id ,
              relationship:dataLawRlt[i].basic_info?.customer_family_relationship_info?.id ,
              tax:dataLawRlt[i].basic_info?.tax_code_or_identity ?? "",
              cif:dataLawRlt[i].basic_info?.cif_data?.cif_num ?? "",
            },
            identity: dataLawRlt[i]?.identity_info.identity_num.length > 0 ? [
              {
                type:dataLawRlt[i]?.identity_info?.identity_type?.id,
                num:dataLawRlt[i]?.identity_info?.identity_num,
                issuedDate:(dataLawRlt[i]?.identity_info?.issued_date ?? 0) * 1000,
                expiredDate:(dataLawRlt[i]?.identity_info?.expired_date ?? 0) * 1000,
                placeOfIssue:dataLawRlt[i]?.identity_info?.place_of_issue,
                primaryFlag:dataLawRlt[i]?.identity_info?.primary_flag,
                uuid:dataLawRlt[i]?.identity_info?.uuid,
                uuidRemote: ""
              } as ILOANNormalStorageIdentity
            ] : [],
            address:{
              resident:dataLawRlt[i]?.address_info?.resident_status_info?.id,
              location:dataLawRlt[i]?.address_info?.resident_status_info?.id,
              address: [
                {
                  type: dataLawRlt[i]?.address_info?.address_type?.id,
                  apartment: dataLawRlt[i]?.address_info.address,
                  province: dataLawRlt[i]?.address_info?.province_info?.province_code,
                  district: dataLawRlt[i]?.address_info.district_info?.district_code,
                  ward: dataLawRlt[i]?.address_info.ward_info?.ward_code,
                  primaryFlag: dataLawRlt[i]?.address_info?.primary_flag,
                  uuid: dataLawRlt[i]?.address_info?.uuid,
                  uuidRemote:""
                }
              ] as ILOANNormalStorageAddress[] ?? []
            },
            other:{
              note: dataLawRlt[i]?.note ?? "",
              career: "",
              fatca: "",
              income3Month: ""
            } as ILOANNormalStorageLegalBorrowerOther,
            document_info_list:dataLawRlt[i]?.document_info_list?.map((docss,idx)=>({
              uuidActiveFile:generateUUID(),
              document_id:docss.document_id,
              document_name:docss.document_name,
              child_files:docss?.child_files?.map((child,idxchi)=>({
                uuid:child.uuid,
                name:child.name,
                content_type:child.content_type,
                display_order:idxchi+1,
                created_at:child.created_at,
                created_by:child.created_by,
                created_by_name: child.created_by_name,
                updated_at: child.updated_at,
                updated_by: child.updated_by,
                updated_by_name: child.updated_by_name,
                description: child.description
               // updated_at:child.updated_at,
               // updated_by:child.updated_by,
             })) as ILOANNormalChildFile[] ?? []
            })) as ILOANNormalStorageLegalFile[]??[]
          })
        }
      }
      state.storage.legal.data.LAW_RLT = {
        ...state.storage.legal.data.LAW_RLT,
        info: dataMapLegalReLatd,
        uuidActiveLocal: dataMapLegalReLatd.length > 0 ? dataMapLegalReLatd[0].uuidActiveLocal : ""
      };


      const dataMapRelated: ILOANNormalStorageLegalDeclareState[] = [];
      if(dataRelated.length > 0){
        for (let i=0; i<dataRelated.length; i++){
          dataMapRelated.push({
            uuidActiveFile:"",// activeFile
            uuidActiveLocal: dataRelated[i]?.basic_info?.uuid,
            declare:[],
            basic:{
              person_uuid:dataRelated[i].basic_info?.uuid ?? "",
              fullname:dataRelated[i].basic_info?.full_name,
              customerType:dataRelated[i].basic_info?.customer_type_info?.id,
              birthday:(dataRelated[i].basic_info?.date_of_birth ?? 0 ) * 1000,
              placeOfBirth:dataRelated[i].basic_info?.place_of_birth,
              gender: dataRelated[i].basic_info?.gender_info?.id,
              national:dataRelated[i].basic_info?.country_info?.country_code ?? "VN",
              marriageStatus:dataRelated[i].basic_info?.marital_status_info?.id,
              ownerProperty:dataRelated[i].basic_info?.current_house_owner_status_info?.id ,
              under18:dataRelated[i].basic_info?.dependent_person_under_18,
              over18: dataRelated[i].basic_info?.dependent_person_over_18,
              mobile: dataRelated[i].basic_info?.mobile_num ?? "",
              telephone:dataRelated[i].basic_info?.telephone_num  ?? "",
              email:dataRelated[i].basic_info?.email ?? "" ,
              education:dataRelated[i].basic_info?.educational_status_info?.id ,
              ecomonic:dataRelated[i].basic_info?.economic_profession_info?.id ,
              relationship:dataRelated[i].basic_info?.customer_family_relationship_info?.id ,
              tax:dataRelated[i].basic_info?.tax_code_or_identity ?? "",
              cif:dataRelated[i].basic_info?.cif_data?.cif_num ?? "",
            },
            identity:[],
            address:{
              resident:dataRelated[i]?.address_info?.resident_status_info?.id,
              location:dataRelated[i]?.address_info?.resident_status_info?.id,
              address: [
                {
                  type: dataRelated[i]?.address_info?.address_type.id,
                  apartment: dataRelated[i]?.address_info?.address,
                  province: dataRelated[i]?.address_info?.province_info?.province_code,
                  district: dataRelated[i]?.address_info?.district_info?.district_code,
                  ward: dataRelated[i]?.address_info?.ward_info?.ward_code,
                  primaryFlag: dataRelated[i]?.address_info?.primary_flag,
                  uuid: dataRelated[i]?.address_info?.uuid === null ? generateUUID() : dataRelated[i]?.address_info?.uuid,
                  uuidRemote:""
                }
              ] as ILOANNormalStorageAddress[] ?? []
            },
            other:{ } as ILOANNormalStorageLegalBorrowerOther,
            document_info_list:dataRelated[i]?.document_info_list?.map((docss,idx)=>({
              uuidActiveFile:generateUUID(),
              document_id:docss.document_id,
              document_name:docss.document_name,
              child_files:docss?.child_files?.map((child,idxchi)=>({
               uuid:child.uuid,
               name:child.name,
               content_type:child.content_type,
               display_order:idxchi+1,
               created_at:child.created_at,
              created_by:child.created_by,
              created_by_name: child.created_by_name,
              updated_at: child.updated_at,
              updated_by: child.updated_by,
              updated_by_name: child.updated_by_name,
               description: child.description
               // updated_at:child.updated_at,
               // updated_by:child.updated_by,
             })) as ILOANNormalChildFile[]??[]
            })) as ILOANNormalStorageLegalFile[]??[]
          })
        }
      }
      state.storage.legal.data.RELATED = {
        ...state.storage.legal.data.RELATED,
        info: dataMapRelated,
        listContactPersonUUID: listPerion.map(d => d?.person_uuid),
        uuidActiveLocal: dataMapRelated.length > 0 ? dataMapRelated[0].uuidActiveLocal : ""
      };
      
      const dataMapOther: ILOANNormalStorageLegalDeclareState[] = [];
      if(dataOrther.length > 0) {
        for(let i = 0; i < dataOrther.length; i++){
          dataMapOther.push({
            uuidActiveFile:"",// activeFile
            uuidActiveLocal: dataOrther[i]?.basic_info?.uuid,
            declare:[],
            basic:{
              person_uuid:dataOrther[i].basic_info?.uuid ?? "",
              fullname:dataOrther[i].basic_info?.full_name,
              customerType:dataOrther[i].basic_info?.customer_type_info?.id,
              birthday:(dataOrther[i].basic_info?.date_of_birth ?? 0 ) * 1000,
              placeOfBirth:dataOrther[i].basic_info?.place_of_birth,
              gender: dataOrther[i].basic_info?.gender_info?.id,
              national:dataOrther[i].basic_info?.country_info?.country_code ?? "VN",
              marriageStatus:dataOrther[i].basic_info?.marital_status_info?.id,
              ownerProperty:dataOrther[i].basic_info?.current_house_owner_status_info?.id ,
              under18:dataOrther[i].basic_info?.dependent_person_under_18,
              over18: dataOrther[i].basic_info?.dependent_person_over_18,
              mobile: dataOrther[i].basic_info?.mobile_num ?? "",
              telephone:dataOrther[i].basic_info?.telephone_num  ?? "",
              email:dataOrther[i].basic_info?.email ?? "" ,
              education:dataOrther[i].basic_info?.educational_status_info?.id ,
              ecomonic:dataOrther[i].basic_info?.economic_profession_info?.id ,
              relationship:dataOrther[i].basic_info?.customer_family_relationship_info?.id ,
              tax:dataOrther[i].basic_info?.tax_code_or_identity ?? "",
              cif:dataOrther[i].basic_info?.cif_data?.cif_num ?? "",
            },
            identity:[
              ...dataOrther[i]?.identity_info?.map((item,idx)=>({
                type:item?.identity_type?.id,
                num:item?.identity_num,
                issuedDate:(item?.issued_date ?? 0) * 1000,
                expiredDate:(item?.expired_date ?? 0) * 1000,
                placeOfIssue:item?.place_of_issue,
                primaryFlag:item?.primary_flag,
                uuid:item?.uuid,
                uuidRemote: generateLOCALUUID(),
              })) as ILOANNormalStorageIdentity[] ?? []
              ],
            address:{
              resident:dataOrther[i]?.address_info[0]?.resident_status_info?.id,
              location:dataOrther[i]?.address_info[0]?.resident_status_info?.id,
              address: dataOrther[i]?.address_info?.map((add,idx)=>({
                type:add?.address_type?.id ?? "",
                apartment: add?.address ?? "",
                province:add?.province_info?.province_code ?? "",
                district:add?.district_info?.district_code ?? "",
                ward:add?.ward_info?.ward_code ?? "",
                primaryFlag:add?.primary_flag ?? "",
                uuid:add?.uuid ?? "",
                uuidRemote:""
              })) as ILOANNormalStorageAddress[] ?? []
            },
            other:{
              career:dataOrther[i].other_info?.career_info?.id ?? "",
              fatca:dataOrther[i].other_info?.fatca_info?.id ?? "",
              income3Month:dataOrther[i].other_info?.average_income_3m_amount?.id ?? "",
              note: dataOrther[i].note ?? ""
            },
            document_info_list:dataOrther[i]?.document_info_list?.map((docss,idx)=>({
              uuidActiveFile:generateUUID(),
              document_id:docss.document_id,
              document_name:docss.document_name,
              child_files:docss?.child_files?.map((child,idxchi)=>({
               uuid:child.uuid,
               name:child.name,
               content_type:child.content_type,
               display_order:idxchi+1,
               created_at:child.created_at,
              created_by:child.created_by,
              created_by_name: child.created_by_name,
              updated_at: child.updated_at,
              updated_by: child.updated_by,
              updated_by_name: child.updated_by_name,
               description: child.description
             })) as ILOANNormalChildFile[]??[]
            })) as ILOANNormalStorageLegalFile[]??[]
          })
        }
      }
      state.storage.legal.data.OTHER = {
        ...state.storage.legal.data.OTHER,
        info: dataMapOther,
        uuidActiveLocal: dataMapOther.length > 0 ? dataMapOther[0].uuidActiveLocal : ""
      };
    },

    prepare(
      payload: ILoanNormalLegalAPI, 
      meta: string)
    {
      return { payload, meta };
    }
  },

  clearForm(state: Draft<ILOANNormalState>, action: PayloadAction<string>){
    const declare = state.storage.legal.data[action.payload].info[0]?.declare
    if(action.payload === ELegalTypeScreen.BORROWER || action.payload === ELegalTypeScreen.MARRIAGE){
      state.storage.legal.data[action.payload].info[0] = {
        ...generateLoanLegalUser(),
        declare: declare,
        address:{
          location:"",
          resident:"",
          address:[]
        }
      }
    }
    if(action.payload === ELegalTypeScreen.LAW_RLT){
      const activeUserLaw = state.storage.legal.data[action.payload].uuidActiveLocal
      state.storage.legal.data[action.payload].info = state.storage.legal.data[action.payload].info.map(item=>{
        if(item.uuidActiveLocal === activeUserLaw){
          item = {
            ...generateLoanLegalUser(),
            declare: declare,
            basic: {
              customerType: "I",
              person_uuid:"",
              fullname: "",
              birthday:  null,
              placeOfBirth: "",
              gender: "",
              national: "VN",
              marriageStatus: "",
              ownerProperty: "",
              under18:  null,
              over18:  null,
              telephone: "",
              mobile: "",
              email: "",
              education: "",
              ecomonic: "",
              relationship: "",
              tax: "",
              cif: ""
            },
            identity: [
              {
                type: "",
                num: "",
                issuedDate: null,
                expiredDate: null,
                placeOfIssue: "",
                primaryFlag: true,
                uuid: generateUUID(),
                uuidRemote: "",
              }
            ], 
            address: {
              location: "",
              resident: "",
              address: [
                {
                  ...generateEmptyAddress(),
                  province:"",
                  district:"",
                  ward:"",  
                  uuid: generateUUID(), 
                  primaryFlag: true
                }
              ]
            },
          }
          item.uuidActiveLocal = activeUserLaw
        }
        return {...item}
      })
    }else if ( action.payload === ELegalTypeScreen.REALTED){
      const activeUserRelated= state.storage.legal.data[action.payload].uuidActiveLocal

      state.storage.legal.data[action.payload].info = state.storage.legal.data[action.payload].info.map(item=>{
        if(item.uuidActiveLocal === activeUserRelated){
          item = {
            ...generateLoanLegalUser(),
            declare: declare ?? [],
            basic: {
              customerType: "I",
              person_uuid:"",
              fullname: "",
              birthday:  null,
              placeOfBirth: "",
              gender: "",
              national: "VN",
              marriageStatus: "",
              ownerProperty: "",
              under18:  null,
              over18:  null,
              telephone: "",
              mobile: "",
              email: "",
              education: "",
              ecomonic: "",
              relationship: "",
              tax: "",
              cif: ""
            },
            address: {
              location: "",
              resident: "", 
              address: [
                {
                  ...generateEmptyAddress(), 
                  uuid: generateUUID(), 
                  primaryFlag: true,
                }
              ]
            },
          }
          item.uuidActiveLocal = activeUserRelated
        }
        return {...item}
      })
    }
    else{
      const activeUser = state.storage.legal.data[action.payload].uuidActiveLocal
      state.storage.legal.data[action.payload].info = state.storage.legal.data[action.payload].info?.map((da,idx)=>{
        if(da.uuidActiveLocal === activeUser){
          da = {
            ...generateLoanLegalUser(),
            declare: declare ?? [],
          }
          da.uuidActiveLocal = activeUser
        }
        return {...da}
      })
    }
  },

  setDataPersonContact:{
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<
      string[] | number[],
        string, 
        { declare:string }
      >
    ) {
      state.storage.legal.data.RELATED.listContactPersonUUID = action.payload
    },
    prepare(
      payload: string[] | number[],
       meta: { 
        declare:string,
      }
    ) {
      return { payload, meta };
    }
  },
  
  deleteLegalUserList:{reducer(state: Draft<ILOANNormalState>,  action: PayloadAction<string,string, { declare:string }>){
    state.storage.legal.data[action.meta.declare].info = 
    state.storage.legal.data[action.meta.declare].info?.filter(item=>item.basic.person_uuid !== action.payload)
    const length = state.storage.legal.data[action.meta.declare].info.length;
    if(length>0){
      state.storage.legal.data[action.meta.declare].uuidActiveLocal 
      = state.storage.legal.data[action.meta.declare].info[length-1].uuidActiveLocal
    }
    if(length === 0){
      state.storage.legal.data[action.meta.declare].uuidActiveLocal = ''
    }
  },
  prepare( payload: string, meta: { declare:string, }) {
    return { payload, meta };
  }
  },

  clearFormDELETE(state: Draft<ILOANNormalState>, action: PayloadAction<string>){
    if(action.payload === ELegalTypeScreen.MARRIAGE){
      state.storage.legal.data[action.payload].info[0] = {
        ...generateLoanLegalUser(),
        address:{
          location:"",
          resident:"",
          address:[]
        }
      }
    }
    else{
      state.storage.legal.data[action.payload] = {
        uuidActiveLocal: "",
        listContactPersonUUID:[],
        info: [],
      }
    }
  },

  // file handle 
  addDataFile:{
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<string, string,{ declare:string }>
    ) {
      const dataActive = state.storage.legal?.data[action.meta.declare]?.uuidActiveLocal;
      state.storage.legal.data[action.meta.declare].info =state.storage.legal.data[action.meta.declare].info =
      state.storage.legal.data[action.meta.declare].info =state.storage.legal.data[action.meta.declare].info?.map((item,idx)=>{
        if(item.uuidActiveLocal === dataActive){
          const activeUUIDFile = `${PREFIX_LOCAL}${generateUUID()}`;
          item.uuidActiveFile = activeUUIDFile;
           item.document_info_list.push({
             ...generateEmptyFile(),
             uuidActiveFile:activeUUIDFile
           })
        }
        return {...item}
      })
    },
    prepare(payload: string,meta: { declare:string, }) {
      return { payload, meta };
    }
  },

  onChangeSelectFileList:{
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<string | number , string,{ declare:string,uuidFileActive:string,optionData?:{label:string} }>
    ) {
      const dataActive = state.storage.legal?.data[action.meta.declare]?.uuidActiveLocal;
      state.storage.legal.data[action.meta.declare].info =state.storage.legal.data[action.meta.declare].info =
      state.storage.legal.data[action.meta.declare].info =state.storage.legal.data[action.meta.declare].info?.map((item,idx)=>{
        if(item.uuidActiveLocal === dataActive){
          item.document_info_list = item.document_info_list?.map(f=>{
            if(f.uuidActiveFile === action.meta.uuidFileActive){
              f.document_id = action.payload;
              f.document_name = _.get(action,'meta.optionData.label','');
            }
            return {...f}
          })            
        }
        return {...item}
      })
    },
    prepare(payload: string | number,meta: { declare:string ,uuidFileActive:string,optionData?:{label:string} }) {
      return { payload, meta };
    }
  },

  addDataChildFile:{
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<string, string,{ declare:string,uuidFileActive:string }>
    ) {
      const dataActive = state.storage.legal.data[action.meta.declare].uuidActiveLocal;
      state.storage.legal.data[action.meta.declare].info?.map((item,idx)=>{
        if(item.uuidActiveLocal === dataActive){
           item.document_info_list = item.document_info_list?.map((docs,idx)=>{
             if(docs.uuidActiveFile === action.meta.uuidFileActive){
                const uuidChildFile = `${PREFIX_LOCAL}${generateUUID()}`;
                docs.child_files.push({
                  ...generateEmptyChildFile(),
                   uuid:uuidChildFile
                })
             }
             return {...docs}
           })
        }
        return {...item}
      })
    },
    prepare(payload: string,meta: { declare:string, uuidFileActive:string}) {
      return { payload, meta };
    }
  },
  deleteDataLegalAllFile:{
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<string, string,{ declare:string,uuidFileActive:string }>
    ) {
      const dataActive = state.storage.legal.data[action.meta.declare].uuidActiveLocal;
     
      state.storage.legal.data[action.meta.declare].info =state.storage.legal.data[action.meta.declare].info =
      state.storage.legal.data[action.meta.declare].info =state.storage.legal.data[action.meta.declare].info?.map((item,idx)=>{
        if(item.uuidActiveLocal === dataActive){
           item.document_info_list = [];
        }
        return {...item}
      })
    },
    prepare(payload: string,meta: { declare:string, uuidFileActive:string}) {
      return { payload, meta };
    }
  },
  deleteDataFile:{
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<string, string,{ declare:string,uuidFileActive:string }>
    ) {
      const dataActive = state.storage.legal.data[action.meta.declare].uuidActiveLocal;
     
      state.storage.legal.data[action.meta.declare].info =state.storage.legal.data[action.meta.declare].info =
      state.storage.legal.data[action.meta.declare].info =state.storage.legal.data[action.meta.declare].info?.map((item,idx)=>{
        if(item.uuidActiveLocal === dataActive){
           item.document_info_list = item.document_info_list?.filter(docs=>docs.uuidActiveFile !== action.meta.uuidFileActive)
        }
        return {...item}
      })
    },
    prepare(payload: string,meta: { declare:string, uuidFileActive:string}) {
      return { payload, meta };
    }
  },

  deleteDataChildFile:{
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<string, string,{ declare:string,uuidFileActive:string,uuidChildFile:string }>
    ) {
      const dataActive = state.storage.legal.data[action.meta.declare].uuidActiveLocal;
     
      state.storage.legal.data[action.meta.declare].info =state.storage.legal.data[action.meta.declare].info =
      state.storage.legal.data[action.meta.declare].info =state.storage.legal.data[action.meta.declare].info?.map((item,idx)=>{
        if(item.uuidActiveLocal === dataActive){
           item.document_info_list = item.document_info_list?.map(docs=>{
             if(docs.uuidActiveFile === action.meta.uuidFileActive){
               docs.child_files = docs.child_files.filter(ch =>ch.uuid !== action.meta.uuidChildFile)
             }
             return {...docs}
           })
        }
        return {...item}
      })
    },
    prepare(payload: string,meta: { declare:string, uuidFileActive:string,uuidChildFile:string}) {
      return { payload, meta };
    }
  },
  setAddttacmentContent:{
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<string, string,{ declare:string, uuidDoc:string | number, uuidFile:string|number }>
    ) {
      const dataActive = state.storage.legal.data[action.meta.declare].uuidActiveLocal;
      const currentInfo = state.storage.legal.data[action.meta.declare]?.info.find(it=>it.uuidActiveLocal === dataActive);
      if(currentInfo){
        const currentDoc = currentInfo.document_info_list?.find(doc => doc.uuidActiveFile === action.meta.uuidDoc);
        if(currentDoc){
        const currentIndexFile = currentDoc.child_files.findIndex(file=>file.uuid === action.meta.uuidFile);
          if(currentIndexFile !== -1){
            currentDoc.child_files[currentIndexFile].description = action.payload;
          }
        }
      };
    },
    prepare(payload: string, meta: { declare:string ,uuidDoc:string | number, uuidFile:string|number}) {
      return { payload, meta };
    }
  },
  setAddttacmentFile: {
    reducer(
      state: Draft<ILOANNormalState>, 
      action: PayloadAction<ILOANNormalChildFile[], string,{ declare:string, uuidUserActive:string, uuidFileActive:string|number }>
    ) {
      const dataActive = state.storage.legal.data[action.meta.declare].uuidActiveLocal;
      const currentInfo = state.storage.legal.data[action.meta.declare]?.info.find(it=>it.uuidActiveLocal === dataActive);
      if(currentInfo){
        const currentDoc = currentInfo.document_info_list?.find(doc => doc.uuidActiveFile ===action.meta.uuidFileActive);
        action.payload.forEach(filePayload => {
          if(!currentDoc) return;
          const currentIndexFile = currentDoc.child_files.findIndex(file=>file.uuid === filePayload.uuid);
          if(currentIndexFile === -1){
            currentDoc.child_files.push(filePayload);
            return;
          }
          currentDoc.child_files[currentIndexFile] = {...filePayload};
        });
      };
    },
    prepare(payload: ILOANNormalChildFile[], meta: { declare:string, uuidUserActive:string, uuidFileActive:string|number}) {
      return { payload, meta };
    }
  },
  updatedOldDataLOANNormalLegalDocument(state: Draft<ILOANNormalState>,action:PayloadAction<{declare:string,person_uuid:string}>){
    const legalData:ILoanNormalLegalAPI['data']| undefined =_.get(state.storage,'full.data.form.legal_info_form.data');
    const mappingDocLegal=(docData:ILOANNormalStorageLegalFile[] | undefined)=>{
      if(!docData) return [];
      return docData.map((docss,idx)=>({
        uuidActiveFile:generateUUID(),
        document_id:docss.document_id,
        document_name:docss.document_name,
        child_files:docss?.child_files?.map((child,idxchi)=>({
         uuid:child.uuid,
         name:child.name,
         content_type:child.content_type,
         display_order:idxchi+1,
         created_at:child.created_at,
          created_by:child.created_by,
          created_by_name: child.created_by_name,
          updated_at: child.updated_at,
          updated_by: child.updated_by,
          updated_by_name: child.updated_by_name,
         description: child.description
         // updated_at:child.updated_at,
         // updated_by:child.updated_by,
       })) as ILOANNormalChildFile[] ?? []
      })) as ILOANNormalStorageLegalFile[]??[];
    }
    const currentDeclare:ILOANNormalStorageLegalDeclareState | undefined = _.get(state.storage,['legal','data',action.payload.declare,'info'],[]).find(it=>it.basic.person_uuid === action.payload.person_uuid);
    if(legalData && currentDeclare){
      switch(action.payload?.declare?.toLocaleUpperCase()){
        case "BORROWER":{
          const data:ILOANNormalLegalBor | null = legalData.borrower;
          currentDeclare.document_info_list = mappingDocLegal(data?.document_info_list);
          break;
        }
        case "MARRIAGE":{
          const data:ILOANNormalLegalBorrower  | null = legalData.marriage;
          currentDeclare.document_info_list = mappingDocLegal(data?.document_info_list);
          break;
        }
        case "CO_BRW":{
          const data:ILOANNormalLegalBorrower[] | null = legalData.co_brw;
          const currentData = data.find(it=>it.basic_info.uuid === action.payload.person_uuid);
          if(currentData) currentDeclare.document_info_list =  mappingDocLegal(currentData?.document_info_list);
          break;
        }
        case "CO_PAYER":{
          const data:ILOANNormalLegalBorrower[] | null = legalData.co_payer;
          const currentData = data.find(it=>it.basic_info.uuid === action.payload.person_uuid);
          if(currentData) currentDeclare.document_info_list =  mappingDocLegal(currentData?.document_info_list);
          break;
        }
        case "LAW_RLT":{
          const data:ILOANNormalLegalReLrt[] | null = legalData.law_rlt;
          const currentData = data.find(it=>it.basic_info.uuid === action.payload.person_uuid);
          if(currentData) currentDeclare.document_info_list =  mappingDocLegal(currentData?.document_info_list);
          break;
        }
        case "RELATED":{
          const data:ILOANNormalLegalRe[] | null = legalData.related.other_person;
          const currentData = data.find(it=>it.basic_info.uuid === action.payload.person_uuid);
          if(currentData) currentDeclare.document_info_list =  mappingDocLegal(currentData?.document_info_list);
          break;
        }
        case "OTHER":{
          const data:ILOANNormalLegalBorrower[] | null = legalData.others;
          const currentData = data.find(it=>it.basic_info.uuid === action.payload.person_uuid);
          if(currentData) currentDeclare.document_info_list =  mappingDocLegal(currentData?.document_info_list);
          break;
        }
        default: {};
      }
    }
  },

  fetchCif(state: Draft<ILOANNormalState>, action: PayloadAction<string>){},

  onChangeContinue(state: Draft<ILOANNormalState>, action: PayloadAction<number>){},
  onChangeBack(state: Draft<ILOANNormalState>, action: PayloadAction<number>){},

  clearBlackListAlert(state: Draft<ILOANNormalState>){
    state.storage.legal.blacklist = null
  },
  setBlackListAlert(state: Draft<ILOANNormalState> , action: PayloadAction<ILOANNormalAlertBlackListData[]>){
    state.storage.legal.blacklist = action.payload
  }

}

// export const setAddttacmentContent = NormalActions.setAddttacmentContent;
// export const setAddttacmentFile = NormalActions.setAddttacmentFile;
// export const addDataFile = NormalActions.addDataFile;
// export const addDataChildFile = NormalActions.addDataChildFile;
// export const onChangeSelectFileList = NormalActions.onChangeSelectFileList;
// export const deleteDataLegalAllFile = NormalActions.deleteDataLegalAllFile;
// export const deleteDataFile = NormalActions.deleteDataFile;
// export const deleteDataChildFile = NormalActions.deleteDataChildFile;