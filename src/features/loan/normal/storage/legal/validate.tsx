

import { is } from "immer/dist/internal";
import { ILOANNormalStorageLegalDeclareState } from "types/models/loan/normal/storage/Legal";
import { compareTimestampOnlyDate } from "utils";
import { timestampToDate } from "utils/date";
import { AddressType, AgeCalculate, _calculateAge } from "views/pages/LOAN/utils";
import { PhoneMobileVN } from "views/pages/LOAN/utils/phoneVN";

export const ValidateLegal = {

  fullname(value: string, role?: string, position?: string){
    return { valid: !!value, field: 'fullname', role: role ? role : 'empty', position: position }; 
  },

  customerType(value: string, role?: string, position?: string){
    return { valid: !!value, field: 'customerType', role: role ? role : 'empty', position: position }; 
  },

  birthday(value: number | null, role?: string, position?: string){
    if (value === null){
      return { valid: false, field: 'birthday', role: role ? role : 'empty', position: position };
    }
    const Age =  AgeCalculate(timestampToDate(value / 1000,'MM/DD/YYYY')) ?? 0

    if (isNaN(value)){
      return { valid: false, field: 'birthday', role: 'not_exist', position: position };
    }

    if(Age < 18 || Age > 75){

      return { valid: false, field: 'birthday', role: 'birthday', position: position };
    }
    return { valid: true, field: 'birthday', role: '', position: position };
  },

  gender(value: string, role?: string, position?: string){
    return { valid: !!value, field: 'gender', role: role ? role : 'empty', position: position }; 
  },

  telephone(value: string, role?: string, position?: string, isValid?: boolean){
    if (!value){
      return { valid: true, field: 'telephone', role: role ? role : 'empty', position: position };
    }
    // if (!value.match(/^0\d{11}$/g)){
    //   return { valid: false, field: 'telephone', role: 'invalid_format', position: position };
    // }

    if(value.length < 9 || value.length > 12){
      return { valid: false, field: 'telephone', role: 'invalid_phone_vn', position: position };
    }

    // tam thời k check đầu số VN
    // if (!~TelephoneVN.indexOf(value.substr(0, 4))){
    //   return { valid: false, field: 'telephone', role: 'invalid_phone_vn', position: position };
    // }

    if(value === "" || value === null){
      return { valid: true, field: 'telephone', role: '', position: position};
    }
   
    return { valid: true, field: 'telephone', role: '', position: position};
  },

  national(value: string, role?: string, position?: string){
    return { valid: !!value, field: 'national', role: role ? role : 'empty', position: position }; 
  },

  marriageStatus(value: string, role?: string, position?: string){
    return { valid: !!value, field: 'marriageStatus', role: role ? role : 'empty', position: position }; 
  },

  ownerProperty(value: string, role?: string, position?: string){
    return { valid: !!value, field: 'ownerProperty', role: role ? role : 'empty', position: position }; 
  },

  mobile(value: string,arrMobile: string[], role?: string, position?: string, isValid?: boolean){

    if (!value){
      return { valid: false, field: 'mobile', role: role ? role : 'empty', position: position };
    }

    if (!value.match(/^0\d{9}$/g)){
      return { valid: false, field: 'mobile', role: 'invalid_format', position: position };
    }

    if (!~PhoneMobileVN.indexOf(value.substr(0, 3))){
      return { valid: false, field: 'mobile', role: 'invalid_phone_vn', position: position };
    }

    if (isValid){
      return { valid: false, field: 'mobile', role: 'invalid_exited', position: position };
    }
    
    const isExist = arrMobile?.indexOf(value) >= 0 ? true : false;
    if (isExist){
      return { valid: false, field: 'mobile', role: 'is_exist', position: position };
    }
   
    return { valid: true, field: 'mobile', role: '', position: ""};
  },

  email(value: string ,position?: string,){

    if (value && !value.match(/^[a-z\d_.-]+@([a-z\d_-]+\.){1,2}[a-z]{2,}$/gi)){
      return { valid: false, field: 'email', role: 'invalid_format', position: position};
    }
    if (value && value.length > 255){
      return { valid: false, field: 'email', role: 'max_length', position: position};
    }
    return { valid: true, field: '', role: '', position: "" };
  },

  ecomonic(value: string, role?: string, position?: string){
    return { valid: !!value, field: 'ecomonic', role: role ? role : 'empty', position: position }; 
  },

  fatca(value: string, role?: string, position?: string){
    return { valid: !!value, field: 'fatca', role: role ? role : 'empty', position: position }; 
  },

  career(value: string, role?: string, position?: string){
    return { valid: !!value, field: 'career', role: role ? role : 'empty', position: position }; 
  },

  income3Month(value: string, role?: string, position?: string){
    return { valid: !!value, field: 'income3Month', role: role ? role : 'empty', position: position }; 
  },

  num(value: string, type: string, arrIdentity: string[], role?: string, position?: string){
    let isValid = { valid: true, field: '', role: '', position: "" };
    // if (!value){
    //   return isValid ={ valid: false, field: 'num', role: role ? role : 'empty', position: position ? position : "" };
    // }
    
    // if (type !== "PASSPORT" && value.length > 9 && value.length < 12){
    //   return isValid = { valid: false, field: 'num', role: 'invalid_format', position: position ? position : "" };
    // }

    // if (type === 'PASSPORT' ){
    //   return isValid ={
    //     valid: true,
    //     field: 'num',
    //     role: 'invalid_format',
    //     position: position ? position : ""
    //   }
    // }

    // if (!value.match(/^\d{9}(\d{3})?$/g)){
    //   return isValid = { valid: false, field: 'num', role: 'invalid_format', position: position ? position : "" };
    // }

    // if(type !== "PASSPORT" && value.length > 9 && value.length < 12){
    //   return isValid ={
    //     valid: false,
    //     field: 'num',
    //     role: 'empty',
    //     position: position ? position : ""
    //   }
    // }
  
    // if(type !== "PASSPORT" && value.length > 9 && value.length < 12){
    //   return isValid ={
    //     valid: false,
    //     field: 'num',
    //     role: 'empty',
    //     position: position ? position : ""
    //   }
    // }

    // return isValid

    const checkCharNumPassPort = (val:string):boolean=>{
      if(!val.charAt(0).match(/[a-zA-Z]/)){
        return false
      }else{
      for(let i = 0 ;i < val.length ;i++){
        if(val.charAt(i+1).match(/[a-zA-Z]/)){  
          return false;
        }
      }
      }
      return true
    }
    if (!value){
      return { valid: false, field: 'num', role: 'empty' , position: position ? position : ""};
    }
    if (type === 'PASSPORT'){
      if(checkCharNumPassPort(value) === false && value.length === 8){
        return isValid = {
          valid: false,
          field: 'num',
          role: 'passport',
          position: position ? position : ""
        }
      }

      if(value.length !== 8){
        return isValid = {
          valid: false,
          field: 'num',
          role: 'passport',
          position: position ? position : ""
        }
      }
    }

    if (type !== 'PASSPORT' && !value.match(/^\d{9}(\d{3})?$/g)){
      return isValid = { valid: false, field: 'num', role: 'invalid_format' , position: position ? position : ""};
    }
    
    return isValid
  },

  numTax(value: string, type: string,typePerson:string, arrIdentity: string[], role?: string, position?: string){
    let isValid = { valid: true, field: '', role: '', position: "" };
    if (!value){
      return isValid ={ valid: false, field: 'numtax', role: role ? role : 'empty', position: position ? position : "" };
    }
    const checkChar = (val:string):boolean=>{
      if(!val.charAt(0).match(/[a-zA-Z]/)){
        return false
      }else{
      for(let i = 0 ;i < val.length ;i++){
        if(val.charAt(i+1).match(/[a-zA-Z]/)){  
          return false;
        }
      }
      }
      return true
    }
    if(typePerson === "I"){
      if(type !== "PASSPORT" && value.length !== 9 && value.length !== 12 && value.length !==20 && value.length !==8){
        return isValid ={
          valid: false,
          field: 'numtax',
          role: 'empty',
          position: position ? position : "" 
        }
      }
      if(value.length === 8 &&  checkChar(value) === false ){
        return isValid ={
          valid: false,
          field: 'numtax',
          role: 'empty',
          position: position ? position : "" 
        }
      }
      if(value.length === 9 && value.match(/[a-zA-Z]/)){
        return isValid ={
          valid: false,
          field: 'numtax',
          role: 'empty',
          position: position ? position : "" 
        }
      }
      if(value.length === 12 && value.match(/[a-zA-Z]/)){
        return isValid ={
          valid: false,
          field: 'numtax',
          role: 'empty',
          position: position ? position : "" 
        }
      }
    }
    if(typePerson === "B" || typePerson === "C"){
      if(value.match(/[a-zA-Z]/)){
        return isValid ={
          valid: false,
          field: 'numtax',
          role: 'tax',
          position: position ? position : "" 
        }
      }
      if(value.length <= 9 || value.length >= 21){
        return isValid ={
          valid: false,
          field: 'numtax',
          role: 'tax',
          position: position ? position : "" 
        }
      }
    }
    
    return isValid
  },

  issuedDate(value: number | null, role?: string, position?: string){
    if (value === null){
      return { valid: false, field: 'issuedDate', role: role ? role : 'empty', position: position };
    }

    if (isNaN(value)){
      return { valid: false, field: 'issuedDate', role: 'not_exist', position: position };
    }

    return { valid: true, field: 'issuedDate', role: '', position: position };
  },

  expiredDate(value: number | null, issuedDate?: number | null, role?: string, position?: string){
    let isValid = { valid: true, field: '', role: '', position: "" };
    const today = Date.now()
    
    if (value === null){
      return isValid = { valid: false, field: 'expiredDate', role: role ? role : 'empty', position: position ? position : "" };
    }

    if (isNaN(value)){
      return isValid = { valid: false, field: 'expiredDate', role: 'not_exist', position: position ? position : "" };
    }
    if(value < today){
      return isValid = { valid: false, field: 'expiredDate', role: 'bigger_than_today', position: position ? position : "" };
    }
    if (issuedDate !== undefined && issuedDate !== null){
      const compare = compareTimestampOnlyDate(value, issuedDate);
      return isValid = { valid: compare > 0, field: 'expiredDate', role: 'less_than_issued_date', position: position ? position : "" };
    }



    return isValid;
  },

  placeOfIssue(value: string, role?: string, position?: string){
    return { valid: !!value, field: 'placeOfIssue', role: role ? role : 'empty', position: position }; 
  },

  resident(value: string, role?: string, position?: string){
    return { valid: !!value, field: 'resident', role: role ? role : 'empty', position: position }; 
  },

  location(value: string, role?: string, position?: string){
    return { valid: !!value, field: 'location', role: role ? role : 'empty', position: position }; 
  },

  apartment(value: string, role?: string, field?: string, position?: string){
    return { valid: !!value, field: field ?? 'apartment', role: role ? role : 'empty', position: position }; 
  },

  province(value: string, role?: string, field?: string, position?: string){
    return { valid: !!value, field: field ?? 'province', role: role ? role : 'empty', position: position }; 
  },

  district(value: string, role?: string, field?: string, position?: string){
    return { valid: !!value, field: field ?? 'district', role: role ? role : 'empty', position: position }; 
  },

  ward(value: string, role?: string, field?: string, position?: string){
    return { valid: !!value, field: field ?? 'ward', role: role ? role : 'empty', position: position }; 
  },

  education(value: string, role?: string, field?: string, position?: string){
    return { valid: !!value, field: field ?? 'education', role: role ? role : 'empty', position: position }; 
  },

  relationship(value: string, role?: string, position?: string){
    return { valid: !!value, field: 'relationship', role: role ? role : 'empty', position: position }; 
  },


  tax(value: string, type: string, position?: string){
    if (type === 'I'){
      const v = this.num(value, '', []);
      return { ...v, field: 'tax', role: v.role + '_id' };
    }
    else{
      if (!value) return { valid: false, field: 'tax', role: 'empty_tax' };

      return {
        valid: !!value.match(/^\d{9}$/),
        field: 'tax',
        role: 'invalid_format_tax',
        position: position
      }
    }

  },

  
  cif(value: string){
    if (!value) return { valid: true };

    if (!value.match(/^\d{7}$/gi)){
      return { valid: false, field: 'cif', role: 'invalid_format' };
    }

    return { valid: true };
  },

  borrower(data: ILOANNormalStorageLegalDeclareState){
    let isValid = { valid: true, field: '', role: ''};

    const vFullName = ValidateLegal.fullname(data.basic.fullname);
    if (!vFullName.valid) return isValid = vFullName;

    const vCustomerType = ValidateLegal.customerType(data.basic.customerType);
    if (!vCustomerType.valid) return isValid = vCustomerType;

    const vBirthday = ValidateLegal.birthday(data.basic.birthday);
    if (!vBirthday.valid) return isValid = vBirthday;

    const vGender = ValidateLegal.gender(data.basic.gender);
    if (!vGender.valid) return isValid = vGender;

    const vtelephone = ValidateLegal.telephone(data.basic.telephone);
    if (!vtelephone.valid) return isValid = vtelephone;

    // const vNational = ValidateLegal.national(data.basic.national ?? "");
    // if (!vNational.valid) return isValid = vNational;

    const vMarriageStatus = ValidateLegal.marriageStatus(data.basic.marriageStatus);
    if (!vMarriageStatus.valid) return isValid = vMarriageStatus;

    const vOwnerProperty = ValidateLegal.ownerProperty(data.basic.ownerProperty);
    if (!vOwnerProperty.valid) return isValid = vOwnerProperty;

    const vMobile = ValidateLegal.mobile(data.basic.mobile, []);
    if (!vMobile.valid) return isValid = vMobile;
    const vEmail= ValidateLegal.email(data.basic.email);
    if (!vEmail.valid) return isValid = vEmail;

    const vEducation = ValidateLegal.education(data.basic.education);
    if (!vEducation.valid) return isValid = vEducation;

    const vEcomonic = ValidateLegal.ecomonic(data.basic.ecomonic);
    if (!vEcomonic.valid) return isValid = vEcomonic;

    const vFatca = ValidateLegal.fatca(data.other.fatca);
    if (!vFatca.valid) return isValid = vFatca;

    const vCareer = ValidateLegal.career(data.other.career);
    if (!vCareer.valid) return isValid = vCareer;
    
    const vIncome3Month = ValidateLegal.income3Month(data.other.income3Month);
    if (!vIncome3Month.valid) return isValid = vIncome3Month;

    const primaryIdentity = data.identity.find(d => d.primaryFlag);
    if (!primaryIdentity){
      return isValid = { valid: false, field: 'num', role: 'empty' };
    }
    else{
      const vNum = ValidateLegal.num(primaryIdentity.num, primaryIdentity.type, []);
      if (!vNum.valid) return  isValid = vNum;

      const vIssuedDate = ValidateLegal.issuedDate(primaryIdentity.issuedDate);
      if (!vIssuedDate.valid) return  isValid = vIssuedDate;

      // issue 9561
      const vExpiredDate = ValidateLegal.expiredDate(primaryIdentity.expiredDate, primaryIdentity.issuedDate);
      if (!vExpiredDate.valid) return  isValid = vExpiredDate; 

      const vPlaceOfIssue = ValidateLegal.placeOfIssue(primaryIdentity.placeOfIssue);
      if (!vPlaceOfIssue.valid) return  isValid = vPlaceOfIssue;
    }

    const vResident = ValidateLegal.resident(data.address.resident);
    if (!vResident.valid) return isValid = vResident;

    const vLocation = ValidateLegal.location(data.address.location);
    if (!vLocation.valid) return isValid = vLocation;


    const address = data.address.address;
    if (address.length === 0){
      return isValid = { valid: false, field:'permanent_apartment', role: 'empty' };
    }

    const permanentAddress = address.find(ad => ad.type === AddressType.PERMANENT && ad.primaryFlag);
    const tempAddress = address.find( ad => ad.type === AddressType.TEMP && ad.primaryFlag);

    if(!permanentAddress){
      return isValid = { valid: false, field:'permanent_apartment', role: 'empty' };
    }
    else{
      const vPermanentAddressApartment = ValidateLegal.apartment(permanentAddress.apartment, "permanent_apartment");
      if (!vPermanentAddressApartment.valid) return isValid = vPermanentAddressApartment;

      const vProvince = ValidateLegal.province(permanentAddress.apartment, "permanent_province");
      if (!vProvince.valid) return isValid = vProvince;

      const vDistrict = ValidateLegal.district(permanentAddress.district, "permanent_district");
      if (!vDistrict.valid) return isValid = vDistrict;

      const vWard = ValidateLegal.ward(permanentAddress.ward, "permanent_ward");
      if (!vWard.valid) return isValid = vWard;
    }

    if(!tempAddress){
      return isValid = { valid: false, field:'mailing_apartment', role: 'empty' };
    }
    else{
      const vMailingAddressApartment = ValidateLegal.apartment(tempAddress.apartment, "mailing_apartment");
      if (!vMailingAddressApartment.valid) return isValid = vMailingAddressApartment;

      const vMailingProvince = ValidateLegal.province(tempAddress.apartment, "mailing_province");
      if (!vMailingProvince.valid) return isValid = vMailingProvince;

      const vMailingDistrict = ValidateLegal.district(tempAddress.district, "mailing_district");
      if (!vMailingDistrict.valid) return isValid = vMailingDistrict;

      const vMailingWard = ValidateLegal.ward(tempAddress.ward, "mailing_ward");
      if (!vMailingWard.valid) return isValid = vMailingWard;
    }

    return isValid;
  },

  marriage(data: ILOANNormalStorageLegalDeclareState){
    let isValid = { valid: true, field: '', role: ''};
   

    const vFullName = ValidateLegal.fullname(data.basic.fullname, "empty_marriage");
    if (!vFullName.valid) return isValid = vFullName;

    const vBirthday = ValidateLegal.birthday(data.basic.birthday === 0 ? null : data.basic.birthday);
    if (!vBirthday.valid) return isValid = vBirthday;

    const vGender = ValidateLegal.gender(data.basic.gender);
    if (!vGender.valid) return isValid = vGender;

    const vNational = ValidateLegal.national(data.basic?.national ?? "");
    if (!vNational.valid) return isValid = vNational;

    const vMobile = ValidateLegal.mobile(data.basic.mobile, []);
    if (!vMobile.valid) return isValid = vMobile;

    const vtelephone = ValidateLegal.telephone(data.basic.telephone);
    if (!vtelephone.valid) return isValid = vtelephone;

    const vEmail= ValidateLegal.email(data.basic.email);
    if (!vEmail.valid) return isValid = vEmail;

    const primaryIdentity = data.identity.find(d => d.primaryFlag);
    if (!primaryIdentity){
      return isValid = { valid: false, field: 'num', role: 'empty' };
    }
    else{
      const vNum = ValidateLegal.num(primaryIdentity.num, primaryIdentity.type, []);
      if (!vNum.valid) return  isValid = vNum;

      const vIssuedDate = ValidateLegal.issuedDate(primaryIdentity.issuedDate);
      if (!vIssuedDate.valid) return  isValid = vIssuedDate;

      const vExpiredDate = ValidateLegal.expiredDate(primaryIdentity.expiredDate, primaryIdentity.issuedDate);
      if (!vExpiredDate.valid) return  isValid = vExpiredDate;

      const vPlaceOfIssue = ValidateLegal.placeOfIssue(primaryIdentity.placeOfIssue);
      if (!vPlaceOfIssue.valid) return  isValid = vPlaceOfIssue;
    }

    const address = data.address.address;
    if (address.length === 0){
      return isValid = { valid: false, field:'permanent_apartment', role: 'empty' };
    }

    const permanentAddress = address.find(ad => ad.type === AddressType.PERMANENT && ad.primaryFlag);
    const tempAddress = address.find( ad => ad.type === AddressType.TEMP && ad.primaryFlag);

    if(!permanentAddress){
      return isValid = { valid: false, field:'permanent_apartment', role: 'empty' };
    }
    else{
      const vPermanentAddressApartment = ValidateLegal.apartment(permanentAddress.apartment, "permanent_apartment");
      if (!vPermanentAddressApartment.valid) return isValid = vPermanentAddressApartment;

      const vProvince = ValidateLegal.province(permanentAddress.apartment, "permanent_province");
      if (!vProvince.valid) return isValid = vProvince;

      const vDistrict = ValidateLegal.district(permanentAddress.district, "permanent_district");
      if (!vDistrict.valid) return isValid = vDistrict;

      const vWard = ValidateLegal.ward(permanentAddress.ward, "permanent_ward");
      if (!vWard.valid) return isValid = vWard;
    }

    if(!tempAddress){
      return isValid = { valid: false, field:'mailing_apartment', role: 'empty' };
    }
    else{
      const vMailingAddressApartment = ValidateLegal.apartment(tempAddress.apartment, "mailing_apartment");
      if (!vMailingAddressApartment.valid) return isValid = vMailingAddressApartment;

      const vMailingProvince = ValidateLegal.province(tempAddress.apartment, "mailing_province");
      if (!vMailingProvince.valid) return isValid = vMailingProvince;

      const vMailingDistrict = ValidateLegal.district(tempAddress.district, "mailing_district");
      if (!vMailingDistrict.valid) return isValid = vMailingDistrict;

      const vMailingWard = ValidateLegal.ward(tempAddress.ward, "mailing_ward");
      if (!vMailingWard.valid) return isValid = vMailingWard;
    }

    return isValid;
  },

  coBorrower(data: ILOANNormalStorageLegalDeclareState[]){
    let isValid = { valid: true, field: '', role: '', position: ''};

    if(data.length === 0){
      return isValid;
    }

    const arrIdentity = data.map(d => d.identity.find(i => i.primaryFlag)?.num ?? "").filter(df=> df.length > 0);

    for(let da of data){
      const vFullName = ValidateLegal.fullname(
        da.basic.fullname, 
        "empty_co_borrower",
        da.uuidActiveLocal
      );
      if (!vFullName.valid) return isValid = {...vFullName, position: da.uuidActiveLocal };
 
      const vBirthday = ValidateLegal.birthday(da.basic.birthday, undefined ,da.uuidActiveLocal);
      if (!vBirthday.valid) return isValid = {...vBirthday, position: da.uuidActiveLocal };

      const vGender = ValidateLegal.gender(da.basic.gender, undefined ,da.uuidActiveLocal);
      if (!vGender.valid) return isValid = {...vGender, position: da.uuidActiveLocal };

      const vNational = ValidateLegal.national(da.basic.national ?? "", undefined ,da.uuidActiveLocal);
      if (!vNational.valid) return isValid = {...vNational, position: da.uuidActiveLocal };

      const vMobile = ValidateLegal.mobile(da.basic.mobile, [], undefined,da.uuidActiveLocal, undefined);
      if (!vMobile.valid) return isValid = {...vMobile, position: da.uuidActiveLocal };

      const vtelephone = ValidateLegal.telephone(da.basic.telephone,undefined,da.uuidActiveLocal);
      if (!vtelephone.valid) return isValid = {...vtelephone, position: da.uuidActiveLocal };
      
      const vEmail= ValidateLegal.email(da.basic.email,da.uuidActiveLocal);
      if (!vEmail.valid) return isValid = {...vEmail,position: da.uuidActiveLocal };

      const vRelationship = ValidateLegal.relationship(da?.basic?.relationship ?? "", "empty" ,da.uuidActiveLocal);
      if (!vRelationship.valid) return isValid = {...vRelationship, position: da.uuidActiveLocal};

      const primaryIdentity = da.identity.find(d => d.primaryFlag);
      if (!primaryIdentity){
        return isValid = { valid: false, field: 'num', role: 'empty', position: da.uuidActiveLocal };
      }
      else{
        const vNum = ValidateLegal.num(primaryIdentity.num, primaryIdentity.type,arrIdentity, undefined ,da.uuidActiveLocal);
        if (!vNum.valid) return  isValid = {...vNum, position: da.uuidActiveLocal };

        const vIssuedDate = ValidateLegal.issuedDate(primaryIdentity.issuedDate, undefined ,da.uuidActiveLocal);
        if (!vIssuedDate.valid) return  isValid = {...vIssuedDate, position: da.uuidActiveLocal };

        const vExpiredDate = ValidateLegal.expiredDate(primaryIdentity.expiredDate, primaryIdentity.issuedDate, undefined ,da.uuidActiveLocal);
        if (!vExpiredDate.valid) return  isValid = {...vExpiredDate, position: da.uuidActiveLocal};

        const vPlaceOfIssue = ValidateLegal.placeOfIssue(primaryIdentity.placeOfIssue, undefined ,da.uuidActiveLocal);
        if (!vPlaceOfIssue.valid) return  isValid = {...vPlaceOfIssue, position: da.uuidActiveLocal};
      }

      const address = da.address.address;
      if (address.length === 0){
        return isValid = { valid: false, field:'permanent_apartment', role: 'empty', position: da.uuidActiveLocal};
      }

      const permanentAddress = address.find(ad => ad.type === AddressType.PERMANENT && ad.primaryFlag);
      const tempAddress = address.find( ad => ad.type === AddressType.TEMP && ad.primaryFlag);

      if(!permanentAddress){
        return isValid = { valid: false, field:'permanent_apartment', role: 'empty', position: da.uuidActiveLocal};
      }
      else{
        const vPermanentAddressApartment = ValidateLegal.apartment(permanentAddress.apartment, "permanent_apartment");
        if (!vPermanentAddressApartment.valid) return isValid = {...vPermanentAddressApartment, position: da.uuidActiveLocal};

        const vProvince = ValidateLegal.province(permanentAddress.apartment, "permanent_province");
        if (!vProvince.valid) return isValid = {...vProvince, position: da.uuidActiveLocal};

        const vDistrict = ValidateLegal.district(permanentAddress.district, "permanent_district");
        if (!vDistrict.valid) return isValid = {...vDistrict, position: da.uuidActiveLocal};

        const vWard = ValidateLegal.ward(permanentAddress.ward, "permanent_ward");
        if (!vWard.valid) return isValid = {...vWard, position: da.uuidActiveLocal };
      }

      if(!tempAddress){
        return isValid = { valid: false, field:'mailing_apartment', role: 'empty', position: da.uuidActiveLocal };
      }
      else{
        const vMailingAddressApartment = ValidateLegal.apartment(tempAddress.apartment, "mailing_apartment");
        if (!vMailingAddressApartment.valid) return isValid = {...vMailingAddressApartment, position: da.uuidActiveLocal };

        const vMailingProvince = ValidateLegal.province(tempAddress.apartment, "mailing_province");
        if (!vMailingProvince.valid) return isValid = {...vMailingProvince, position: da.uuidActiveLocal };

        const vMailingDistrict = ValidateLegal.district(tempAddress.district, "mailing_district");
        if (!vMailingDistrict.valid) return isValid = {...vMailingDistrict, position: da.uuidActiveLocal };

        const vMailingWard = ValidateLegal.ward(tempAddress.ward, "mailing_ward");
        if (!vMailingWard.valid) return isValid = {...vMailingWard, position: da.uuidActiveLocal };
      }
    }

    return isValid;
  },

  coPayer(data: ILOANNormalStorageLegalDeclareState[]){
    let isValid = { valid: true, field: '', role: '', position: ''};

    if(data.length === 0){
      return isValid;
    }
    for(let da of data)
    {

      const vFullName = ValidateLegal.fullname(
        da.basic.fullname, 
        "empty_co_payer",
        da.uuidActiveLocal
      );
      if (!vFullName.valid) return isValid = {...vFullName, position: da.uuidActiveLocal};
      
      const vBirthday = ValidateLegal.birthday(da.basic.birthday, undefined ,da.uuidActiveLocal);
      if (!vBirthday.valid) return isValid = {...vBirthday, position: da.uuidActiveLocal};

      const vGender = ValidateLegal.gender(da.basic.gender, undefined ,da.uuidActiveLocal);
      if (!vGender.valid) return isValid = {...vGender, position: da.uuidActiveLocal};

      const vNational = ValidateLegal.national(da.basic.national ?? "", undefined ,da.uuidActiveLocal);
      if (!vNational.valid) return isValid = {...vNational, position: da.uuidActiveLocal};

      const vMobile = ValidateLegal.mobile(da.basic.mobile,[], undefined ,da.uuidActiveLocal);
      if (!vMobile.valid) return isValid = {...vMobile, position: da.uuidActiveLocal};

      const vtelephone = ValidateLegal.telephone(da.basic.telephone,undefined,da.uuidActiveLocal);
      if (!vtelephone.valid) return isValid = {...vtelephone, position: da.uuidActiveLocal };

      const vEmail= ValidateLegal.email(da.basic.email,da.uuidActiveLocal);
      if (!vEmail.valid) return isValid = {...vEmail,position: da.uuidActiveLocal };

      const vRelationship = ValidateLegal.relationship(da.basic.relationship, "empty" ,da.uuidActiveLocal);
      if (!vRelationship.valid) return isValid = {...vRelationship, position: da.uuidActiveLocal};

      const primaryIdentity = da.identity.find(d => d.primaryFlag);
      if (!primaryIdentity){
        return isValid = { valid: false, field: 'num', role: 'empty', position: da.uuidActiveLocal };
      }
      else{
        const vNum = ValidateLegal.num(primaryIdentity.num, primaryIdentity.type, [], undefined ,da.uuidActiveLocal);
        if (!vNum.valid) return  isValid = {...vNum, position: da.uuidActiveLocal};

        const vIssuedDate = ValidateLegal.issuedDate(primaryIdentity.issuedDate, undefined ,da.uuidActiveLocal);
        if (!vIssuedDate.valid) return  isValid = {...vIssuedDate, position: da.uuidActiveLocal};

        const vExpiredDate = ValidateLegal.expiredDate(primaryIdentity.expiredDate, primaryIdentity.issuedDate, undefined ,da.uuidActiveLocal);
        if (!vExpiredDate.valid) return  isValid = {...vExpiredDate, position: da.uuidActiveLocal};

        const vPlaceOfIssue = ValidateLegal.placeOfIssue(primaryIdentity.placeOfIssue, undefined ,da.uuidActiveLocal);
        if (!vPlaceOfIssue.valid) return  isValid = {...vPlaceOfIssue, position: da.uuidActiveLocal};
      }

      const address = da.address.address;
      if (address.length === 0){
        return isValid = { valid: false, field:'permanent_apartment', role: 'empty', position: da.uuidActiveLocal };
      }

      const permanentAddress = address.find(ad => ad.type === AddressType.PERMANENT && ad.primaryFlag);
      const tempAddress = address.find( ad => ad.type === AddressType.TEMP && ad.primaryFlag);

      if(!permanentAddress){
        return isValid = { valid: false, field:'permanent_apartment', role: 'empty', position: da.uuidActiveLocal };
      }
      else{
        const vPermanentAddressApartment = ValidateLegal.apartment(permanentAddress.apartment, "permanent_apartment");
        if (!vPermanentAddressApartment.valid) return isValid = {...vPermanentAddressApartment, position: da.uuidActiveLocal};

        const vProvince = ValidateLegal.province(permanentAddress.apartment, "permanent_province");
        if (!vProvince.valid) return isValid = {...vProvince, position: da.uuidActiveLocal};

        const vDistrict = ValidateLegal.district(permanentAddress.district, "permanent_district");
        if (!vDistrict.valid) return isValid = {...vDistrict, position: da.uuidActiveLocal};

        const vWard = ValidateLegal.ward(permanentAddress.ward, "permanent_ward");
        if (!vWard.valid) return isValid = {...vWard, position: da.uuidActiveLocal};
      }

      if(!tempAddress){
        return isValid = { valid: false, field:'mailing_apartment', role: 'empty', position: da.uuidActiveLocal };
      }
      else{
        const vMailingAddressApartment = ValidateLegal.apartment(tempAddress.apartment, "mailing_apartment");
        if (!vMailingAddressApartment.valid) return isValid = {...vMailingAddressApartment, position: da.uuidActiveLocal};

        const vMailingProvince = ValidateLegal.province(tempAddress.apartment, "mailing_province");
        if (!vMailingProvince.valid) return isValid = {...vMailingProvince, position: da.uuidActiveLocal};

        const vMailingDistrict = ValidateLegal.district(tempAddress.district, "mailing_district");
        if (!vMailingDistrict.valid) return isValid = {...vMailingDistrict, position: da.uuidActiveLocal};

        const vMailingWard = ValidateLegal.ward(tempAddress.ward, "mailing_ward");
        if (!vMailingWard.valid) return isValid = {...vMailingWard, position: da.uuidActiveLocal};
      }
    }

    return isValid;
  },

  legalRelated(data: ILOANNormalStorageLegalDeclareState[]){
    let isValid = { valid: true, field: '', role: '', position: ''};

    if(data.length === 0){
      return isValid;
    }
    for(let da of data)
    { 
      const vFullName = ValidateLegal.fullname(
        da.basic.fullname, "empty_legal_related", da.uuidActiveLocal
      );
      if (!vFullName.valid) return isValid = {...vFullName, position: da.uuidActiveLocal };

      const vNum = ValidateLegal.numTax(da.identity[0].num, "CIF_ID_TYPE",da.basic.customerType ,[], undefined ,da.uuidActiveLocal);
      if (!vNum.valid) return  isValid = {...vNum, position: da.uuidActiveLocal };

      const vRelationship = ValidateLegal.relationship(da.basic.relationship, "empty" ,da.uuidActiveLocal);
      if (!vRelationship.valid) return isValid = {...vRelationship, position: da.uuidActiveLocal };

      if(da.basic.mobile.length > 0){
        const vMobile = ValidateLegal.mobile(da.basic.mobile, [], undefined ,da.uuidActiveLocal);
        if (!vMobile.valid) return isValid = {...vMobile,  position: da.uuidActiveLocal };
      }

      isValid = { valid: true, field: '', role: '', position: da.uuidActiveLocal}
    }

    return isValid;
  },

  contact(data: ILOANNormalStorageLegalDeclareState[]){
    let isValid = { valid: true, field: '', role: '', position: ''};

    if(data.length === 0){
      return isValid;
    }
    for(let da of data)
   { 
      const vFullName = ValidateLegal.fullname(
        da.basic.fullname, "empty_legal_contact", da.uuidActiveLocal
      );
      if (!vFullName.valid) return isValid = {...vFullName, position: da.uuidActiveLocal };

      const vRelationship = ValidateLegal.relationship(da.basic.relationship, "empty" ,da.uuidActiveLocal);
      if (!vRelationship.valid) return isValid = {...vRelationship, position: da.uuidActiveLocal };

      const vMobile = ValidateLegal.mobile(da.basic.mobile, [], undefined ,da.uuidActiveLocal);
      if (!vMobile.valid) return isValid = {...vMobile, position: da.uuidActiveLocal };
  
      const vEmail= ValidateLegal.email(da.basic.email,da.uuidActiveLocal);
      if (!vEmail.valid) return isValid = {...vEmail,position: da.uuidActiveLocal };

      if (da.address?.address?.length === 0){
        return isValid = { valid: false, field:'apartment', role: 'empty', position: da.uuidActiveLocal };
      }
      const address = da.address.address[0];

      const vPermanentAddressApartment = ValidateLegal.apartment(address.apartment,"empty", "mailing_apartment");
      if (!vPermanentAddressApartment.valid) return isValid = {...vPermanentAddressApartment, position: da.uuidActiveLocal };

      const vProvince = ValidateLegal.province(address.province,"empty", "mailing_province");
      if (!vProvince.valid) return isValid = {...vProvince, position: da.uuidActiveLocal };

      const vDistrict = ValidateLegal.district(address.district,"empty", "mailing_district");
      if (!vDistrict.valid) return isValid = {...vDistrict, position: da.uuidActiveLocal };

      const vWard = ValidateLegal.ward(address.ward,"empty", "mailing_ward");
      if (!vWard.valid) return isValid = {...vWard, position: da.uuidActiveLocal };
    }

    return isValid;
  },

  other(data: ILOANNormalStorageLegalDeclareState[]){
    let isValid = { valid: true, field: '', role: '', position: ''};

    if(data.length === 0){
      return isValid;
    }

    for(let da of data){

      const vFullName = ValidateLegal.fullname(
        da.basic.fullname, 
        "empty_legal_ohter",
        da.uuidActiveLocal
      );
      if (!vFullName.valid) return isValid = {...vFullName, position: da.uuidActiveLocal };
      
      const vBirthday = ValidateLegal.birthday(da.basic.birthday, undefined ,da.uuidActiveLocal);
      if (!vBirthday.valid) return isValid = {...vBirthday, position: da.uuidActiveLocal };

      const vGender = ValidateLegal.gender(da.basic.gender, undefined ,da.uuidActiveLocal);
      if (!vGender.valid) return isValid = {...vGender, position: da.uuidActiveLocal };

      const vNational = ValidateLegal.national(da.basic.national ?? "", undefined ,da.uuidActiveLocal);
      if (!vNational.valid) return isValid = {...vNational, position: da.uuidActiveLocal };

      const vMobile = ValidateLegal.mobile(da.basic.mobile,[], undefined ,da.uuidActiveLocal);
      if (!vMobile.valid) return isValid = {...vMobile, position: da.uuidActiveLocal };

      const vtelephone = ValidateLegal.telephone(da.basic.telephone,undefined,da.uuidActiveLocal);
      if (!vtelephone.valid) return isValid = {...vtelephone, position: da.uuidActiveLocal }; 

      const vEmail= ValidateLegal.email(da.basic.email,da.uuidActiveLocal);
      if (!vEmail.valid) return isValid = {...vEmail,position: da.uuidActiveLocal };

      const vRelationship = ValidateLegal.relationship(da.basic.relationship, "empty" ,da.uuidActiveLocal);
      if (!vRelationship.valid) return isValid = {...vRelationship, position: da.uuidActiveLocal };

      const primaryIdentity = da.identity.find(d => d.primaryFlag);
      if (!primaryIdentity){
        return isValid = { valid: false, field: 'num', role: 'empty', position: da.uuidActiveLocal };
      }
      else{
        const vNum = ValidateLegal.num(primaryIdentity.num, primaryIdentity.type, [], undefined ,da.uuidActiveLocal);
        if (!vNum.valid) return  isValid = {...vNum, position: da.uuidActiveLocal };

        const vIssuedDate = ValidateLegal.issuedDate(primaryIdentity.issuedDate, undefined ,da.uuidActiveLocal);
        if (!vIssuedDate.valid) return  isValid = {...vIssuedDate, position: da.uuidActiveLocal };

        const vExpiredDate = ValidateLegal.expiredDate(primaryIdentity.expiredDate, primaryIdentity.issuedDate, undefined ,da.uuidActiveLocal);
        if (!vExpiredDate.valid) return  isValid = {...vExpiredDate, position: da.uuidActiveLocal };

        const vPlaceOfIssue = ValidateLegal.placeOfIssue(primaryIdentity.placeOfIssue, undefined ,da.uuidActiveLocal);
        if (!vPlaceOfIssue.valid) return  isValid = {...vPlaceOfIssue, position: da.uuidActiveLocal };
      }

      const address = da.address.address;
      if (address.length === 0){
        return isValid = { valid: false, field:'permanent_apartment', role: 'empty', position: da.uuidActiveLocal };
      }

      const permanentAddress = address.find(ad => ad.type === AddressType.PERMANENT && ad.primaryFlag);
      const tempAddress = address.find( ad => ad.type === AddressType.TEMP && ad.primaryFlag);

      if(!permanentAddress){
        return isValid = { valid: false, field:'permanent_apartment', role: 'empty', position: da.uuidActiveLocal};
      }
      else{
        const vPermanentAddressApartment = ValidateLegal.apartment(permanentAddress.apartment, "permanent_apartment");
        if (!vPermanentAddressApartment.valid) return isValid = {...vPermanentAddressApartment, position: da.uuidActiveLocal };

        const vProvince = ValidateLegal.province(permanentAddress.apartment, "permanent_province");
        if (!vProvince.valid) return isValid = {...vProvince, position: da.uuidActiveLocal };

        const vDistrict = ValidateLegal.district(permanentAddress.district, "permanent_district");
        if (!vDistrict.valid) return isValid = {...vDistrict, position: da.uuidActiveLocal };

        const vWard = ValidateLegal.ward(permanentAddress.ward, "permanent_ward");
        if (!vWard.valid) return isValid = {...vWard, position: da.uuidActiveLocal };
      }

      if(!tempAddress){
        return isValid = { valid: false, field:'mailing_apartment', role: 'empty', position: da.uuidActiveLocal};
      }
      else{
        const vMailingAddressApartment = ValidateLegal.apartment(tempAddress.apartment, "mailing_apartment");
        if (!vMailingAddressApartment.valid) return isValid = {...vMailingAddressApartment, position: da.uuidActiveLocal };

        const vMailingProvince = ValidateLegal.province(tempAddress.apartment, "mailing_province");
        if (!vMailingProvince.valid) return isValid = {...vMailingProvince, position: da.uuidActiveLocal };

        const vMailingDistrict = ValidateLegal.district(tempAddress.district, "mailing_district");
        if (!vMailingDistrict.valid) return isValid = {...vMailingDistrict, position: da.uuidActiveLocal};

        const vMailingWard = ValidateLegal.ward(tempAddress.ward, "mailing_ward");
        if (!vMailingWard.valid) return isValid = {...vMailingWard, position: da.uuidActiveLocal};
      }
    }

    return isValid;
  }
}