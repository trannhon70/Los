import { ILOANNormalStorageCICOrgan } from 'types/models/loan/normal/storage/CIC';
import { Iitems } from 'types/models/loan/normal/storage/Collateral';
import {
  ILOANNormalStorageLegalDeclareBasic,
  ILOANNormalStorageIdentity,
  ILOANNormalStorageLegalBorrowerOther,
  ILOANNormalStorageAddress,
  ILOANNormalStorageLegalDeclareAddress,
} from 'types/models/loan/normal/storage/Legal';
import {
  ILOANNormalStorageLOANFinanceMetadata,
  ILOANNormalStorageLOANInOutInfo,
  ILOANNormalStorageLOANLegalBusiness,
  ILOANNormalStorageLOANLegalBusinessStore,
  ILOANNormalStorageLOANNeedAndPlan,
  ILOANNormalStorageLOANProduct,
} from 'types/models/loan/normal/storage/LOAN';
import { compareTimestampOnlyDate, formatRoundNumber } from 'utils';
import { APP_VALIDATE_SKIP_WARD } from 'utils/constants';
import { AddressType, _calculateAge } from '.';
import { PhoneMobileVN } from './phoneVN';
import {
  ILOANNormalStorageExceptionState,
  ILOANNormalStorageRisksGroup,
  ILOANNormalStorageExceptionDetail,
} from 'types/models/loan/normal/storage/Other';

export interface valid {
  valid: boolean;
  field?: string;
  role?: string;
  message?: string;
  declare?: string;
  position?: number;
}

export const ProductValidate = {
  common: {
    partnerCode(value: string) {
      return { valid: !!value, field: 'partnerCode', role: 'empty' };
    },
    partnerProduct(value: string) {
      return { valid: !!value, field: 'partnerProduct', role: 'empty' };
    },
    collateral(value: string) {
      return { valid: !!value, field: 'collateral', role: 'empty' };
    },
    exception(value: string) {
      return { valid: !!value, field: 'exception', role: 'empty' };
    },
  },
};

export const LegalValidate = {
  common: {
    customerType(value: string) {
      return { valid: !!value, field: 'customerType', role: 'empty' };
    },
    fullname(value: string) {
      return { valid: !!value, field: 'fullname', role: 'empty' };
    },
    birthday(value: number | null) {
      if (value === null) {
        return { valid: false, field: 'birthday', role: 'empty' };
      }

      if (isNaN(value)) {
        return { valid: false, field: 'birthday', role: 'not_exist' };
      }

      return { valid: true };
    },
    gender(value: string) {
      return { valid: !!value, field: 'gender', role: 'empty' };
    },
    national(value: string) {
      return { valid: !!value, field: 'national', role: 'empty' };
    },
    telephone(value: string) {
      if (!value) return { valid: true };

      if (!value.match(/^0\d{9}$/g)) {
        return { valid: false, field: 'telephone', role: 'invalid_format' };
      }

      return { valid: true };
    },
    mobile(value: string) {
      if (!value) return { valid: false, field: 'mobile', role: 'empty' };
      if (!value.match(/^0\d{9}$/g)) {
        return { valid: false, field: 'mobile', role: 'invalid_format' };
      }
      if (!~PhoneMobileVN.indexOf(value.substr(0, 3))) {
        return { valid: false, field: 'mobile', role: 'invalid_phone_vn' };
      }
      return { valid: true };
    },
    email(value: string) {
      if (!value) return { valid: true };

      if (!value.match(/^[a-z\d_.-]+@([a-z\d_-]+\.){1,2}[a-z]{2,}$/gi)) {
        return { valid: false, field: 'email', role: 'invalid_format' };
      }

      return { valid: true };
    },
    relationship(value: string) {
      return { valid: !!value, field: 'relationship', role: 'empty' };
    },
    tax(value: string, type: string) {
      if (type === 'I') {
        const v = this.identity.num(value, '');
        return { ...v, field: 'tax', role: v.role + '_id' };
      } else {
        if (!value) return { valid: false, field: 'tax', role: 'empty_tax' };

        return {
          valid: !!value.match(/^\d{9}$/),
          field: 'tax',
          role: 'invalid_format_tax',
        };
      }
    },
    cif(value: string) {
      if (!value) return { valid: true };

      if (!value.match(/^\d{7}$/gi)) {
        return { valid: false, field: 'cif', role: 'invalid_format' };
      }

      return { valid: true };
    },
    identity: {
      type(value: string) {
        return { valid: !!value, field: 'identityType', role: 'empty' };
      },
      num(
        value: string,
        type: string,
        arrIdentity?: ILOANNormalStorageIdentity[]
      ) {
        const checkCharNumPassPort = (val: string): boolean => {
          if (!val.charAt(0).match(/[a-zA-Z]/)) {
            return false;
          } else {
            for (let i = 0; i < val.length; i++) {
              if (val.charAt(i + 1).match(/[a-zA-Z]/)) {
                return false;
              }
            }
          }
          return true;
        };
        if (!value) {
          return { valid: false, field: 'identityNum', role: 'empty' };
        }
        if (type === 'PASSPORT') {
          if (checkCharNumPassPort(value) === false && value.length === 8) {
            return {
              valid: false,
              field: 'identityNum',
              role: 'passport',
            };
          }

          if (value.length !== 8) {
            return {
              valid: false,
              field: 'identityNum',
              role: 'passport',
            };
          }
        }

        if (type !== 'PASSPORT' && !value.match(/^\d{9}(\d{3})?$/g)) {
          return { valid: false, field: 'identityNum', role: 'invalid_format' };
        }

        const existIdentity = arrIdentity?.find((ari) => ari.num === value);
        if (existIdentity) {
          return { valid: false, field: 'identityNum', role: 'exist' };
        }

        return { valid: true };
      },
      issuedDate(value: number | null, birthday?: number | null) {
        if (value === null) {
          return { valid: false, field: 'identityIssuedDate', role: 'empty' };
        }

        if (isNaN(value)) {
          return {
            valid: false,
            field: 'identityIssuedDate',
            role: 'not_exist',
          };
        }

        if (birthday !== undefined && birthday !== null) {
          const compare = compareTimestampOnlyDate(value, birthday);
          return {
            valid: compare > 0,
            field: 'identityIssuedDate',
            role: 'less_than_birthday',
          };
        }

        return { valid: true };
      },
      expiredDate(
        value: number | null,
        issuedDate?: number | null,
        isPrimary?: boolean
      ) {
        const today = Date.now();

        if (value === null) {
          return { valid: false, field: 'identityExpiredDate', role: 'empty' };
        }

        if (isNaN(value)) {
          return {
            valid: false,
            field: 'identityExpiredDate',
            role: 'not_exist',
          };
        }
        if (isPrimary && value < today) {
          return {
            valid: false,
            field: 'identityExpiredDate',
            role: 'bigger_than_today',
          };
        }

        if (issuedDate !== undefined && issuedDate !== null) {
          const compare = compareTimestampOnlyDate(value, issuedDate);
          return {
            valid: compare > 0,
            field: 'identityExpiredDate',
            role: 'less_than_issued_date',
          };
        }

        return { valid: true };
      },
      placeOfIssued(value: string) {
        return {
          valid: !!value,
          field: 'identityPlaceOfIssued',
          role: 'empty',
        };
      },
      group(
        data: ILOANNormalStorageIdentity,
        birthday?: number | null,
        arrIdentity?: ILOANNormalStorageIdentity[]
      ) {
        const vIdType = this.type(data.type);
        if (!vIdType.valid) return vIdType;

        const vIdNum = this.num(data.num, data.type);
        if (!vIdNum.valid) return vIdNum;

        const vIdIssued = this.issuedDate(data.issuedDate, birthday);
        if (!vIdIssued.valid) return vIdIssued;
        if (data.primaryFlag) {
          const vIdExpired = this.expiredDate(
            data.expiredDate,
            data.issuedDate,
            data.primaryFlag
          );
          if (!vIdExpired.valid) return vIdExpired;
        }

        return this.placeOfIssued(data.placeOfIssue);
      },
    },
    address: {
      type(value: string) {
        return { valid: !!value, field: 'addressType', role: 'empty' };
      },
      apartment(value: string) {
        return { valid: !!value, field: 'addressApartment', role: 'empty' };
      },
      province(value: string) {
        return { valid: !!value, field: 'addressProvince', role: 'empty' };
      },
      district(value: string) {
        return { valid: !!value, field: 'addressDistrict', role: 'empty' };
      },
      ward(value: string) {
        return { valid: !!value, field: 'addressWard', role: 'empty' };
      },
      group(data: ILOANNormalStorageAddress, skipType = false) {
        if (!skipType) {
          const vType = this.type(data.type);
          if (!vType.valid) return vType;
        }

        const vApartment = this.apartment(data.apartment);
        if (!vApartment.valid) return vApartment;

        const vProvince = this.province(data.province);
        if (!vProvince.valid) return vProvince;

        const vDistrict = this.district(data.district);
        if (!vDistrict.valid || APP_VALIDATE_SKIP_WARD) return vDistrict;

        return this.ward(data.ward);
      },
    },
  },
  borrower: {
    mariageStatus(value: string) {
      return { valid: !!value, field: 'marriageStatus', role: 'empty' };
    },
    ownerProperty(value: string) {
      return { valid: !!value, field: 'ownerProperty', role: 'empty' };
    },

    education(value: string) {
      return { valid: !!value, field: 'education', role: 'empty' };
    },
    economic(value: string) {
      return { valid: !!value, field: 'economic', role: 'empty' };
    },
    FATCA(value: string) {
      return { valid: !!value, field: 'FATCA', role: 'empty' };
    },
    career(value: string) {
      return { valid: !!value, field: 'career', role: 'empty' };
    },
    income3Month(value: string) {
      return { valid: !!value, field: 'income3month', role: 'empty' };
    },
    resident(value: string) {
      return { valid: !!value, field: 'addressResident', role: 'empty' };
    },
    location(value: string) {
      return { valid: !!value, field: 'addressLocation', role: 'empty' };
    },
    basic(data: ILOANNormalStorageLegalDeclareBasic) {
      const vFullName = LegalValidate.common.fullname(data.fullname);
      if (!vFullName.valid) return vFullName;

      const vCustomerType = LegalValidate.common.customerType(
        data.customerType
      );
      if (!vCustomerType.valid) return vCustomerType;

      const vBirthday = LegalValidate.common.birthday(data.birthday);
      if (!vBirthday.valid) return vBirthday;

      const vGender = LegalValidate.common.gender(data.gender);
      if (!vGender.valid) return vGender;

      const vNational = LegalValidate.common.national(data.national);
      if (!vNational.valid) return vNational;

      const vMarriageStatus = LegalValidate.borrower.mariageStatus(
        data.marriageStatus
      );
      if (!vMarriageStatus.valid) return vMarriageStatus;

      const vOwnerProperty = LegalValidate.borrower.ownerProperty(
        data.ownerProperty
      );
      if (!vOwnerProperty.valid) return vOwnerProperty;

      const vTelephone = LegalValidate.common.telephone(data.telephone);
      if (!vTelephone.valid) return vTelephone;

      const vMobile = LegalValidate.common.mobile(data.mobile);
      if (!vMobile.valid) return vMobile;

      const vEmail = LegalValidate.common.email(data.email);
      if (!vEmail.valid) return vEmail;

      const vEducation = LegalValidate.borrower.education(data.education);
      if (!vEducation.valid) return vEducation;

      return LegalValidate.borrower.economic(data.ecomonic);
    },
    other(data: ILOANNormalStorageLegalBorrowerOther) {
      const vFATCA = LegalValidate.borrower.FATCA(data.fatca);
      if (!vFATCA.valid) return vFATCA;

      const vCareer = LegalValidate.borrower.career(data.career);
      if (!vCareer.valid) return vCareer;

      return LegalValidate.borrower.income3Month(data.income3Month);
    },
    identity(data: ILOANNormalStorageIdentity[], birthday: number) {
      const primary = data.find((id) => id.primaryFlag);

      if (!primary) {
        return { valid: false, field: 'identityNum', role: 'empty' };
      }

      return LegalValidate.common.identity.group(primary, birthday);
    },
    address(data: ILOANNormalStorageLegalDeclareAddress, national: string) {
      if (national === 'VN') {
        const vResident = LegalValidate.borrower.resident(data.resident);
        if (!vResident.valid) return vResident;
      }

      const vLocation = LegalValidate.borrower.location(data.location);
      if (!vLocation.valid) return vLocation;

      if (national === 'VN') {
        const permanentPrimary = data.address.find(
          (a) => a.type === AddressType.PERMANENT && a.primaryFlag
        );
        if (!permanentPrimary) {
          return {
            valid: false,
            field: 'permanentAddressApartment',
            role: 'empty',
          };
        }

        const vPermanent = LegalValidate.common.address.group(
          permanentPrimary,
          true
        );
        if (!vPermanent.valid) {
          return {
            ...vPermanent,
            field: vPermanent.field.replace('address', 'permanentAddress'),
          };
        }
      }

      const primaryTemp = data.address.find(
        (a) => a.type === AddressType.TEMP && a.primaryFlag
      );

      if (!primaryTemp) {
        return { valid: false, field: 'tempAddressApartment', role: 'empty' };
      }

      const vTemp = LegalValidate.common.address.group(primaryTemp, true);
      return { ...vTemp, field: vTemp.field.replace('address', 'tempAddress') };
    },
  },
  marriage: {
    basic(data: ILOANNormalStorageLegalDeclareBasic) {
      const vFullName = LegalValidate.common.fullname(data.fullname);
      if (!vFullName.valid) return vFullName;

      const vBirthday = LegalValidate.common.birthday(data.birthday);
      if (!vBirthday.valid) return vBirthday;

      const vGender = LegalValidate.common.gender(data.gender);
      if (!vGender.valid) return vGender;

      const vNational = LegalValidate.common.national(data.national);
      if (!vNational.valid) return vNational;

      const vTelephone = LegalValidate.common.telephone(data.telephone);
      if (!vTelephone.valid) return vTelephone;

      const vMobile = LegalValidate.common.mobile(data.mobile);
      if (!vMobile.valid) return vMobile;

      return LegalValidate.common.email(data.email);
    },
    identity(data: ILOANNormalStorageIdentity[], birthday: number) {
      const primary = data.find((id) => id.primaryFlag);

      if (!primary) {
        return { valid: false, field: 'identityNum', role: 'empty' };
      }

      return LegalValidate.common.identity.group(primary, birthday);
    },
    address(data: ILOANNormalStorageLegalDeclareAddress, national: string) {
      if (national === 'VN') {
        const permanentPrimary = data.address.find(
          (a) => a.type === AddressType.PERMANENT && a.primaryFlag
        );
        if (!permanentPrimary) {
          return {
            valid: false,
            field: 'permanentAddressApartment',
            role: 'empty',
          };
        }

        const vPermanent = LegalValidate.common.address.group(
          permanentPrimary,
          true
        );
        if (!vPermanent.valid) {
          return {
            ...vPermanent,
            field: vPermanent.field.replace('address', 'permanentAddress'),
          };
        }
      }

      const primaryTemp = data.address.find(
        (a) => a.type === AddressType.TEMP && a.primaryFlag
      );

      if (!primaryTemp) {
        return { valid: false, field: 'tempAddressApartment', role: 'empty' };
      }

      const vTemp = LegalValidate.common.address.group(primaryTemp, true);
      return { ...vTemp, field: vTemp.field.replace('address', 'tempAddress') };
    },
  },
  coBorrower: {
    basic(data: ILOANNormalStorageLegalDeclareBasic) {
      const vFullName = LegalValidate.common.fullname(data.fullname);
      if (!vFullName.valid) return vFullName;

      const vBirthday = LegalValidate.common.birthday(data.birthday);
      if (!vBirthday.valid) return vBirthday;

      const vGender = LegalValidate.common.gender(data.gender);
      if (!vGender.valid) return vGender;

      const vNational = LegalValidate.common.national(data.national);
      if (!vNational.valid) return vNational;

      const vTelephone = LegalValidate.common.telephone(data.telephone);
      if (!vTelephone.valid) return vTelephone;

      const vMobile = LegalValidate.common.mobile(data.mobile);
      if (!vMobile.valid) return vMobile;

      const vEmail = LegalValidate.common.email(data.email);
      if (!vEmail.valid) return vEmail;

      return LegalValidate.common.relationship(data.relationship);
    },
    identity(data: ILOANNormalStorageIdentity[], birthday: number) {
      const primary = data.find((id) => id.primaryFlag);

      if (!primary) {
        return { valid: false, field: 'identityNum', role: 'empty' };
      }

      return LegalValidate.common.identity.group(primary, birthday);
    },
    address(data: ILOANNormalStorageLegalDeclareAddress, national: string) {
      if (national === 'VN') {
        const permanentPrimary = data.address.find(
          (a) => a.type === AddressType.PERMANENT && a.primaryFlag
        );
        if (!permanentPrimary) {
          return {
            valid: false,
            field: 'permanentAddressApartment',
            role: 'empty',
          };
        }

        const vPermanent = LegalValidate.common.address.group(
          permanentPrimary,
          true
        );
        if (!vPermanent.valid) {
          return {
            ...vPermanent,
            field: vPermanent.field.replace('address', 'permanentAddress'),
          };
        }
      }

      const primaryTemp = data.address.find(
        (a) => a.type === AddressType.TEMP && a.primaryFlag
      );

      if (!primaryTemp) {
        return { valid: false, field: 'tempAddressApartment', role: 'empty' };
      }

      const vTemp = LegalValidate.common.address.group(primaryTemp, true);
      return { ...vTemp, field: vTemp.field.replace('address', 'tempAddress') };
    },
  },
  coPayer: {
    basic(data: ILOANNormalStorageLegalDeclareBasic) {
      const vFullName = LegalValidate.common.fullname(data.fullname);
      if (!vFullName.valid) return vFullName;

      const vBirthday = LegalValidate.common.birthday(data.birthday);
      if (!vBirthday.valid) return vBirthday;

      const vGender = LegalValidate.common.gender(data.gender);
      if (!vGender.valid) return vGender;

      const vNational = LegalValidate.common.national(data.national);
      if (!vNational.valid) return vNational;

      const vTelephone = LegalValidate.common.telephone(data.telephone);
      if (!vTelephone.valid) return vTelephone;

      const vMobile = LegalValidate.common.mobile(data.mobile);
      if (!vMobile.valid) return vMobile;

      const vEmail = LegalValidate.common.email(data.email);
      if (!vEmail.valid) return vEmail;

      return LegalValidate.common.relationship(data.relationship);
    },
    identity(data: ILOANNormalStorageIdentity[], birthday: number) {
      const primary = data.find((id) => id.primaryFlag);

      if (!primary) {
        return { valid: false, field: 'identityNum', role: 'empty' };
      }

      return LegalValidate.common.identity.group(primary, birthday);
    },
    address(data: ILOANNormalStorageLegalDeclareAddress, national: string) {
      if (national === 'VN') {
        const permanentPrimary = data.address.find(
          (a) => a.type === AddressType.PERMANENT && a.primaryFlag
        );
        if (!permanentPrimary) {
          return {
            valid: false,
            field: 'permanentAddressApartment',
            role: 'empty',
          };
        }

        const vPermanent = LegalValidate.common.address.group(
          permanentPrimary,
          true
        );
        if (!vPermanent.valid) {
          return {
            ...vPermanent,
            field: vPermanent.field.replace('address', 'permanentAddress'),
          };
        }
      }

      const primaryTemp = data.address.find(
        (a) => a.type === AddressType.TEMP && a.primaryFlag
      );

      if (!primaryTemp) {
        return { valid: false, field: 'tempAddressApartment', role: 'empty' };
      }

      const vTemp = LegalValidate.common.address.group(primaryTemp, true);
      return { ...vTemp, field: vTemp.field.replace('address', 'tempAddress') };
    },
  },
  legalRelated: {
    basic(data: ILOANNormalStorageLegalDeclareBasic) {
      const vCustomerType = LegalValidate.common.customerType(
        data.customerType
      );
      if (!vCustomerType.valid) return vCustomerType;

      const vFullName = LegalValidate.common.fullname(data.fullname);
      if (!vFullName.valid) return vFullName;

      const vTax = LegalValidate.common.tax(data.tax, data.customerType);
      if (!vTax.valid) return vTax;

      const vRelationship = LegalValidate.common.relationship(
        data.relationship
      );
      if (!vRelationship.valid) return vRelationship;

      const vMobile = LegalValidate.common.mobile(data.mobile);
      if (!vMobile.valid) return vMobile;

      return LegalValidate.common.cif(data.cif);
    },
  },
  contact: {
    basic(data: ILOANNormalStorageLegalDeclareBasic) {
      const vFullName = LegalValidate.common.fullname(data.fullname);
      if (!vFullName.valid) return vFullName;

      const vRelationship = LegalValidate.common.relationship(
        data.relationship
      );
      if (!vRelationship.valid) return vRelationship;

      const vMobile = LegalValidate.common.mobile(data.mobile);
      if (!vMobile.valid) return vMobile;

      return LegalValidate.common.email(data.email);
    },
  },
};

export const LOANValidate = {
  common: {
    address: {
      type(value: string) {
        return { valid: !!value, field: 'addressType', role: 'empty' };
      },
      apartment(value: string) {
        return { valid: !!value, field: 'addressApartment', role: 'empty' };
      },
      province(value: string) {
        return { valid: !!value, field: 'addressProvince', role: 'empty' };
      },
      district(value: string) {
        return { valid: !!value, field: 'addressDistrict', role: 'empty' };
      },
      ward(value: string) {
        return { valid: !!value, field: 'addressWard', role: 'empty' };
      },
      group(data: ILOANNormalStorageAddress, skipType = false) {
        if (!skipType) {
          const vType = this.type(data.type);
          if (!vType.valid) return vType;
        }

        const vApartment = this.apartment(data.apartment);
        if (!vApartment.valid) return vApartment;

        const vProvince = this.province(data.province);
        if (!vProvince.valid) return vProvince;

        const vDistrict = this.district(data.district);
        if (!vDistrict.valid || APP_VALIDATE_SKIP_WARD) return vDistrict;

        return this.ward(data.ward);
      },
    },
    inAndOut: {
      info(value: string) {
        return { valid: !!value, field: 'info', role: 'empty' };
      },
    },
  },
  Product: {
    loanType(value: string) {
      return { valid: !!value, field: 'loanType', role: 'empty' };
    },
    productPurpose(value: string) {
      return { valid: !!value, field: 'productPurpose', role: 'empty' };
    },

    corePurpose(value: string) {
      return { valid: !!value, field: 'corePurpose', role: 'empty' };
    },
    realPurpose(value: string) {
      return { valid: !!value, field: 'realPurpose', role: 'empty' };
    },
    product(data: ILOANNormalStorageLOANProduct) {
      const vLoanType = LOANValidate.Product.loanType(data.loanType);
      if (!vLoanType.valid) return vLoanType;

      const vProductPurpose = LOANValidate.Product.productPurpose(
        data.productPurpose
      );
      if (!vProductPurpose.valid) return vProductPurpose;

      const vCorePurpose = LOANValidate.Product.corePurpose(data.corePurpose);
      if (!vCorePurpose.valid) return vCorePurpose;

      return LOANValidate.Product.realPurpose(data.realPurpose);
    },
  },
  LoanNeedAndPlan: {
    currency(value: string) {
      return { valid: !!value, field: 'currency', role: 'empty' };
    },
    need(value: number | null) {
      return { valid: !!value, field: 'need', role: 'empty' };
    },

    ownCaptital(value: number | null, loanType?: string, need?: number) {
      if (value === null) {
        return { valid: false, field: 'ownCaptital', role: 'empty' };
      }

      // if(loanType === 'SHORT' && need !== undefined){
      //   if(value < (need * 10)/100 ){
      //     return { valid: false, field: 'ownCaptital', role: 'role_short' };
      //   }
      // }else if(loanType === 'OTHER'){
      //   return { valid: true };
      // }else{
      //   if(need !== undefined && value < (need * 20)/100   ){
      //     return { valid: false, field: 'ownCaptital', role: 'role_long' };
      //   }
      // }
      return { valid: true };
    },
    method(value: string) {
      return { valid: !!value, field: 'method', role: 'empty' };
    },
    expiredCredit(value: number | null, loanType: string, date: string) {
      const expiredAge = _calculateAge(date) + (value ?? 0) / 12;
      console.log(expiredAge, 'expiredAge');

      switch (loanType) {
        case 'SHORT':
          if (value && value > 12) {
            return { valid: false, field: 'expiredCredit', role: 'short' };
          } else if (expiredAge > 70) {
            return { valid: false, field: 'expiredCredit', role: 'age' };
          } else {
            return { valid: !!value, field: 'expiredCredit', role: 'empty' };
          }
        case 'MEDIUM':
          if (value && (value < 12 || value > 60)) {
            return { valid: false, field: 'expiredCredit', role: 'medium' };
          } else if (expiredAge > 70) {
            return { valid: false, field: 'expiredCredit', role: 'age' };
          } else {
            return { valid: !!value, field: 'expiredCredit', role: 'empty' };
          }
        case 'LONG':
          if (value && value <= 60) {
            return { valid: false, field: 'expiredCredit', role: 'long' };
          } else if (expiredAge > 70) {
            return { valid: false, field: 'expiredCredit', role: 'age' };
          } else {
            return { valid: !!value, field: 'expiredCredit', role: 'empty' };
          }
        default:
          return { valid: !!value, field: 'expiredCredit', role: 'empty' };
      }
    },
    expiredWithdraw(value: number | null) {
      return { valid: !!value, field: 'expiredWithdraw', role: 'empty' };
    },
    graceOrigin(value: number | null) {
      return { valid: !!value, field: 'graceOrigin', role: 'empty' };
    },
    interestRate(value: number | null) {
      if (value === null) {
        return { valid: false, field: 'interestRate', role: 'empty' };
      }
      if (value > 100) {
        return { valid: false, field: 'interestRate', role: 'rate' };
      }
      return { valid: true };
    },
    periodAdjust(value: string) {
      return { valid: !!value, field: 'periodAdjust', role: 'empty' };
    },
    marginAdjust(value: number | null) {
      if (value && value < 0 && value > 100) {
        return { valid: false, field: 'marginAdjust', role: 'equal' };
      }
      return { valid: true, field: 'marginAdjust', role: 'empty' };
    },
    disbursementMethod(value: string) {
      return { valid: !!value, field: 'disbursementMethod', role: 'empty' };
    },
    repayOriginMethod(value: string) {
      return { valid: !!value, field: 'repayOriginMethod', role: 'empty' };
    },
    repayinterestMethod(value: string) {
      return { valid: !!value, field: 'repayinterestMethod', role: 'empty' };
    },
    amountPaidEachPeriod(
      value: number | null,
      need: number | null,
      captital: number | null,
      expiredCredit: number | null
    ) {
      if (!value) {
        return { valid: false, field: 'amountPaidEachPeriod', role: 'empty' };
      }
      if (
        need !== null &&
        captital !== null &&
        expiredCredit !== null &&
        value < formatRoundNumber((need - captital) / expiredCredit, 0)
      ) {
        return { valid: false, field: 'amountPaidEachPeriod', role: 'compare' };
      }
      return { valid: true };
    },
    totalAmount() {},
    loanNeed(
      data: ILOANNormalStorageLOANNeedAndPlan,
      loanType: string,
      borrowerDate: string
    ) {
      const vCurrency = LOANValidate.LoanNeedAndPlan.currency(data.currency);
      if (!vCurrency.valid) return vCurrency;

      const vNeed = LOANValidate.LoanNeedAndPlan.need(data.need);
      if (!vNeed.valid) return vNeed;

      const vOwnCaptital = LOANValidate.LoanNeedAndPlan.ownCaptital(
        data.ownCaptital,
        loanType,
        data.need as number
      );
      if (!vOwnCaptital.valid) return vOwnCaptital;

      const vMethod = LOANValidate.LoanNeedAndPlan.method(data.method);
      if (!vMethod.valid) return vMethod;

      const vExpiredCredit = LOANValidate.LoanNeedAndPlan.expiredCredit(
        data.expiredCredit,
        loanType,
        borrowerDate
      );
      if (!vExpiredCredit.valid) return vExpiredCredit;

      const vExpiredWithdraw = LOANValidate.LoanNeedAndPlan.expiredWithdraw(
        data.expiredWithdraw
      );
      if (!vExpiredWithdraw.valid) return vExpiredWithdraw;

      // const vGraceOrigin= LOANValidate.LoanNeedAndPlan.graceOrigin(data.graceOrigin)
      // if (!vGraceOrigin.valid) return vGraceOrigin;

      const vInterestRate = LOANValidate.LoanNeedAndPlan.interestRate(
        data.interestRate
      );
      if (!vInterestRate.valid) return vInterestRate;

      const vPeriodAdjust = LOANValidate.LoanNeedAndPlan.periodAdjust(
        data.periodAdjust
      );
      if (!vPeriodAdjust.valid) return vPeriodAdjust;

      const vMarginAdjust = LOANValidate.LoanNeedAndPlan.marginAdjust(
        data.marginAdjust
      );
      if (!vMarginAdjust.valid) return vMarginAdjust;

      const vDisbursementMethod =
        LOANValidate.LoanNeedAndPlan.disbursementMethod(
          data.disbursementMethod
        );
      if (!vDisbursementMethod.valid) return vDisbursementMethod;

      const vRepayOriginMethod = LOANValidate.LoanNeedAndPlan.repayOriginMethod(
        data.repayOriginMethod
      );
      if (!vRepayOriginMethod.valid) return vRepayOriginMethod;

      const vRepayinterestMethod =
        LOANValidate.LoanNeedAndPlan.repayinterestMethod(
          data.repayinterestMethod
        );
      if (!vRepayinterestMethod.valid) return vRepayinterestMethod;

      return LOANValidate.LoanNeedAndPlan.amountPaidEachPeriod(
        data.amountPaidEachPeriod,
        data.need,
        data.ownCaptital,
        data.expiredCredit
      );
    },
  },
  Business: {
    nameBusinessHouse(value: string) {
      return { valid: !!value, field: 'nameBusinessHouse', role: 'empty' };
    },
    career(value: string) {
      return { valid: !!value, field: 'careerReality', role: 'empty' };
    },
    numOfYear(value: number | null) {
      return { valid: !!value, field: 'numOfYear', role: 'empty' };
    },
    numConfirm(value: string) {
      return { valid: !!value, field: 'numConfirm', role: 'empty' };
    },
    issuedDate(value: number | null) {
      const today = Date.now();
      if (value && value > today) {
        return { valid: false, field: 'issuedDate', role: 'date' };
      } else {
        return { valid: !!value, field: 'issuedDate', role: 'empty' };
      }
    },
    placeOfIssued(value: string) {
      return { valid: !!value, field: 'placeOfIssued', role: 'empty' };
    },
    codeNameBusiness(value: string) {
      return { valid: !!value, field: 'codeNameBusiness', role: 'empty' };
    },
    ownership(value: string) {
      return { valid: !!value, field: 'ownership', role: 'empty' };
    },
    area(value: number | null) {
      return { valid: !!value, field: 'areaBussiness', role: 'empty' };
    },
    addressBusiness(value: string) {
      return { valid: !!value, field: 'addressBusiness', role: 'empty' };
    },
    province(value: string) {
      return { valid: !!value, field: 'addressProvince', role: 'empty' };
    },
    district(value: string) {
      return { valid: !!value, field: 'addressDistrict', role: 'empty' };
    },
    ward(value: string) {
      return { valid: !!value, field: 'addressWard', role: 'empty' };
    },
    emptyStores(value: string, field: string) {
      return { valid: !!value, field: field, role: 'warehouse' };
    },
    emptyStoresNumber(value: number | null, field: string) {
      return { valid: !!value, field: field, role: 'warehouse' };
    },
    businessHouse(data: ILOANNormalStorageLOANLegalBusiness) {
      const vNameBusinessHouse = LOANValidate.Business.nameBusinessHouse(
        data.name
      );
      if (!vNameBusinessHouse.valid) return vNameBusinessHouse;

      const vNumConfirm = LOANValidate.Business.numConfirm(data.num);
      if (!vNumConfirm.valid) return vNumConfirm;

      const vIssuedDate = LOANValidate.Business.issuedDate(data.issuedDate);
      if (!vIssuedDate.valid) return vIssuedDate;

      const vPlaceOfIssued = LOANValidate.Business.placeOfIssued(
        data.placeOfIssued
      );
      if (!vPlaceOfIssued.valid) return vPlaceOfIssued;

      const vNumOfYear = LOANValidate.Business.numOfYear(data.numOfYear);
      if (!vNumOfYear.valid) return vNumOfYear;

      const vCodeNameBusiness = LOANValidate.Business.codeNameBusiness(
        data.code
      );
      if (!vCodeNameBusiness.valid) return vCodeNameBusiness;

      const vCareer = LOANValidate.Business.career(data.career);
      if (!vCareer.valid) return vCareer;

      const vArea = LOANValidate.Business.area(data.area);
      if (!vArea.valid) return vArea;

      const vOwnership = LOANValidate.Business.ownership(data.ownership);
      if (!vOwnership.valid) return vOwnership;

      const vAddressBusiness = LOANValidate.Business.addressBusiness(
        data.apartment
      );
      if (!vAddressBusiness.valid) return vAddressBusiness;

      const vProvince = LOANValidate.Business.province(data.province);
      if (!vProvince.valid) return vProvince;

      const vDistrict = LOANValidate.Business.district(data.district);
      if (!vDistrict.valid) return vDistrict;

      // return LOANValidate.Business.ward(data.ward)
      const vWard = LOANValidate.Business.ward(data.ward);
      if (!vWard.valid) return vWard;

      if (data.stores.length > 0) {
        let valid = { valid: true, field: '', role: '' };
        for (let i of data.stores) {
          // const vArea = LOANValidate.Business.emptyStoresNumber(i.area,'area')

          // const vApa = LOANValidate.Business.emptyStores(i.apartment,'apartment')

          const vProvinceWare = LOANValidate.Business.emptyStores(
            i.province,
            'province'
          );

          const vDistrictWare = LOANValidate.Business.emptyStores(
            i.district,
            'district'
          );

          const vWardWare = LOANValidate.Business.emptyStores(i.ward, 'ward');
          // if(vArea.valid === false && vApa.valid=== false && vProvinceWare.valid === false && vDistrictWare.valid === false && vWardWare.valid === false){

          if (
            vProvinceWare.valid === false &&
            vDistrictWare.valid === false &&
            vWardWare.valid === false
          ) {
            return (valid = { valid: true, field: '', role: '' });
          }
          // if (!vArea.valid) return vArea;
          // if (!vApa.valid) return vApa;
          if (!vProvinceWare.valid) return vProvinceWare;
          if (!vDistrictWare.valid) return vDistrictWare;
          if (!vWardWare.valid) return vWardWare;
        }
        return valid;
      } else {
        return { valid: true };
      }
    },
  },
  Finance: {
    validateTableE(value: string, field: string) {
      return { valid: !!value, field: field, role: 'empty' };
    },
    revenueT(value: number | null) {
      if (value === null) {
        return { valid: !!value, field: 'revenueT', role: 'empty' };
      }
      return { valid: true };
    },
    revenueT1KH(value: number | null) {
      if (value === null) {
        return { valid: !!value, field: 'revenueKH', role: 'empty' };
      }
      return { valid: true };
    },
    revenueT1NVKD(value: number | null) {
      if (value === null) {
        return { valid: !!value, field: 'revenueNVKD', role: 'empty' };
      }
      return { valid: true };
    },
    validInputTable(value: number | null, id: string) {
      if (value === null) {
        return { valid: !!value, field: `${id}`, role: 'empty' };
      }
      return { valid: true };
    },
    InputOutputInfo: {
      info(value: string, field: string) {
        return { valid: !!value, field: `info${field}`, role: 'empty' };
      },
      group(data: ILOANNormalStorageLOANInOutInfo, field: string) {
        return this.info(data.info, field);
      },
    },
    commentC(value: string, field: string) {
      return { valid: !!value, field: `C${field}`, role: 'empty' };
    },

    finance(data: ILOANNormalStorageLOANFinanceMetadata) {
      const netRevenue = data.A.find((item) => item.id === 7);
      const vRevenueT = LOANValidate.Finance.revenueT(
        netRevenue?.data.T ?? null
      );
      if (!vRevenueT.valid) return vRevenueT;

      const vRevenueT1KH = LOANValidate.Finance.revenueT1KH(
        netRevenue?.data.KH ?? null
      );
      if (!vRevenueT1KH.valid) return vRevenueT1KH;

      const vRevenueT1NVKD = LOANValidate.Finance.revenueT1NVKD(
        netRevenue?.data.NVKD ?? null
      );
      if (!vRevenueT1NVKD.valid) return vRevenueT1NVKD;
      // Bang A
      const cost = data.A?.find((item) => item.id === 9);
      const vSoldAT = LOANValidate.Finance.validInputTable(
        cost?.data.T ?? 0,
        'T9'
      );
      if (!vSoldAT.valid) return vSoldAT;
      const vSoldAKH = LOANValidate.Finance.validInputTable(
        cost?.data.KH ?? null,
        'KH9'
      );
      if (!vSoldAKH.valid) return vSoldAKH;
      const vSoldANVKD = LOANValidate.Finance.validInputTable(
        cost?.data.NVKD ?? null,
        'NVKD9'
      );
      if (!vSoldANVKD.valid) return vSoldANVKD;

      const managementCosts = data.A?.find((item) => item.id === 10);
      const vManagementCostT = LOANValidate.Finance.validInputTable(
        managementCosts?.data.T ?? null,
        'T10'
      );
      if (!vManagementCostT.valid) return vManagementCostT;
      const vManagementCostKH = LOANValidate.Finance.validInputTable(
        managementCosts?.data.KH ?? null,
        'KH10'
      );
      if (!vManagementCostKH.valid) return vManagementCostKH;
      const vManagementCostNVKD = LOANValidate.Finance.validInputTable(
        managementCosts?.data.NVKD ?? null,
        'NVKD10'
      );
      if (!vManagementCostNVKD.valid) return vManagementCostNVKD;

      const interestExpenses = data.A?.find((item) => item.id === 11);
      const vInterestExpensesT = LOANValidate.Finance.validInputTable(
        interestExpenses?.data.T ?? null,
        'T11'
      );
      if (!vInterestExpensesT.valid) return vInterestExpensesT;
      const vInterestExpensesKH = LOANValidate.Finance.validInputTable(
        interestExpenses?.data.KH ?? null,
        'KH11'
      );
      if (!vInterestExpensesKH.valid) return vInterestExpensesKH;
      const vInterestExpensesNVKD = LOANValidate.Finance.validInputTable(
        interestExpenses?.data.NVKD ?? null,
        'NVKD11'
      );
      if (!vInterestExpensesNVKD.valid) return vInterestExpensesNVKD;

      const otherCosts = data.A?.find((item) => item.id === 12);
      const vOtherCostsT = LOANValidate.Finance.validInputTable(
        otherCosts?.data.T ?? null,
        'T12'
      );
      if (!vOtherCostsT.valid) return vOtherCostsT;
      const vOtherCostsKH = LOANValidate.Finance.validInputTable(
        otherCosts?.data.KH ?? null,
        'KH12'
      );
      if (!vOtherCostsKH.valid) return vOtherCostsKH;
      const vOtherCostsNVKD = LOANValidate.Finance.validInputTable(
        otherCosts?.data.NVKD ?? null,
        'NVKD12'
      );
      if (!vOtherCostsNVKD.valid) return vOtherCostsNVKD;

      // Bang B

      // const totalAssets = data.B?.find(item=>item.id === 14)
      // Tiền mặt / Tiền gửi ngân hàng
      const cash_bankDeposits = data.B?.find((item) => item.id === 15);
      const vCash_bankDepositsT = LOANValidate.Finance.validInputTable(
        cash_bankDeposits?.data.T ?? null,
        'T15'
      );
      if (!vCash_bankDepositsT.valid) return vCash_bankDepositsT;
      const vCash_bankDepositsKH = LOANValidate.Finance.validInputTable(
        cash_bankDeposits?.data.KH ?? null,
        'KH15'
      );
      if (!vCash_bankDepositsKH.valid) return vCash_bankDepositsKH;
      const vCash_bankDepositsNVKD = LOANValidate.Finance.validInputTable(
        cash_bankDeposits?.data.NVKD ?? null,
        'NVKD15'
      );
      if (!vCash_bankDepositsNVKD.valid) return vCash_bankDepositsNVKD;

      // Hàng tồn kho
      const inventory = data.B?.find((item) => item.id === 16);
      const vInventoryT = LOANValidate.Finance.validInputTable(
        inventory?.data.T ?? null,
        'T16'
      );
      if (!vInventoryT.valid) return vInventoryT;
      const vInventoryKH = LOANValidate.Finance.validInputTable(
        inventory?.data.KH ?? null,
        'KH16'
      );
      if (!vInventoryKH.valid) return vInventoryKH;
      const vInventoryNVKD = LOANValidate.Finance.validInputTable(
        inventory?.data.NVKD ?? null,
        'NVKD16'
      );
      if (!vInventoryNVKD.valid) return vInventoryNVKD;

      // Phải thu khách hàng
      const recievableCustomer = data.B?.find((item) => item.id === 17);
      const vRecievableCustomerT = LOANValidate.Finance.validInputTable(
        recievableCustomer?.data.T ?? null,
        'T17'
      );
      if (!vRecievableCustomerT.valid) return vRecievableCustomerT;
      const vRecievableCustomerKH = LOANValidate.Finance.validInputTable(
        recievableCustomer?.data.KH ?? null,
        'KH17'
      );
      if (!vRecievableCustomerKH.valid) return vRecievableCustomerKH;
      const vRecievableCustomerNVKD = LOANValidate.Finance.validInputTable(
        recievableCustomer?.data.NVKD ?? null,
        'NVKD17'
      );
      if (!vRecievableCustomerNVKD.valid) return vRecievableCustomerNVKD;

      // Tài sản cố định
      const fixedAssets = data.B?.find((item) => item.id === 18);
      const vFixedAssetsT = LOANValidate.Finance.validInputTable(
        fixedAssets?.data.T ?? null,
        'T18'
      );
      if (!vFixedAssetsT.valid) return vFixedAssetsT;
      const vFixedAssetsKH = LOANValidate.Finance.validInputTable(
        fixedAssets?.data.KH ?? null,
        'KH18'
      );
      if (!vFixedAssetsKH.valid) return vFixedAssetsKH;
      const vFixedAssetsNVKD = LOANValidate.Finance.validInputTable(
        fixedAssets?.data.NVKD ?? null,
        'NVKD18'
      );
      if (!vFixedAssetsNVKD.valid) return vFixedAssetsNVKD;

      // Nguồn vốn
      // const capital = data.B?.find(item=>item.id === 19)
      // Phải trả khách hàng
      const payableCustomer = data.B?.find((item) => item.id === 20);
      const vPayableCustomerT = LOANValidate.Finance.validInputTable(
        payableCustomer?.data.T ?? null,
        'T20'
      );
      if (!vPayableCustomerT.valid) return vPayableCustomerT;
      const vPayableCustomerKH = LOANValidate.Finance.validInputTable(
        payableCustomer?.data.KH ?? null,
        'KH20'
      );
      if (!vPayableCustomerKH.valid) return vPayableCustomerKH;
      const vPayableCustomerNVKD = LOANValidate.Finance.validInputTable(
        payableCustomer?.data.NVKD ?? null,
        'NVKD20'
      );
      if (!vPayableCustomerNVKD.valid) return vPayableCustomerNVKD;
      // Vay ngân hàng
      const bankLoan = data.B?.find((item) => item.id === 21);
      const vBankLoanT = LOANValidate.Finance.validInputTable(
        bankLoan?.data.T ?? null,
        'T21'
      );
      if (!vBankLoanT.valid) return vBankLoanT;
      const vBankLoanKH = LOANValidate.Finance.validInputTable(
        bankLoan?.data.KH ?? null,
        'KH21'
      );
      if (!vBankLoanKH.valid) return vBankLoanKH;
      const vBankLoanNVKD = LOANValidate.Finance.validInputTable(
        bankLoan?.data.NVKD ?? null,
        'NVKD21'
      );
      if (!vBankLoanNVKD.valid) return vBankLoanNVKD;
      // Vay khác
      const otherLoan = data.B?.find((item) => item.id === 22);
      const vOtherLoanT = LOANValidate.Finance.validInputTable(
        otherLoan?.data.T ?? null,
        'T22'
      );
      if (!vOtherLoanT.valid) return vOtherLoanT;
      const vOtherLoanKH = LOANValidate.Finance.validInputTable(
        otherLoan?.data.KH ?? null,
        'KH22'
      );
      if (!vOtherLoanKH.valid) return vOtherLoanKH;
      const vOtherLoanNVKD = LOANValidate.Finance.validInputTable(
        otherLoan?.data.NVKD ?? null,
        'NVKD22'
      );
      if (!vOtherLoanNVKD.valid) return vOtherLoanNVKD;
      // Vốn chủ sở hữu
      const quity = data.B?.find((item) => item.id === 23);
      const vQuityT = LOANValidate.Finance.validInputTable(
        quity?.data.T ?? null,
        'T23'
      );
      if (!vQuityT.valid) return vQuityT;
      const vQuityKH = LOANValidate.Finance.validInputTable(
        quity?.data.KH ?? null,
        'KH23'
      );
      if (!vQuityKH.valid) return vQuityKH;
      const vQuityNVKD = LOANValidate.Finance.validInputTable(
        quity?.data.NVKD ?? null,
        'NVKD23'
      );
      if (!vQuityNVKD.valid) return vQuityNVKD;

      /// BANG C
      const primaryInput = data.C.suppliers.find((id) => id.primary);
      if (!primaryInput) {
        return { valid: false, field: 'infoInput', role: 'empty' };
      }
      const vInputGroup = LOANValidate.Finance.InputOutputInfo.group(
        primaryInput,
        'Input'
      );
      if (!vInputGroup.valid) return vInputGroup;

      const primaryOut = data.C.purchasingPartner.find((id) => id.primary);
      if (!primaryOut) {
        return { valid: false, field: 'infoOutput', role: 'empty' };
      }
      const vOutGroup = LOANValidate.Finance.InputOutputInfo.group(
        primaryOut,
        'Output'
      );
      if (!vOutGroup.valid) return vOutGroup;

      const vNote = LOANValidate.Finance.commentC(data.C.note, 'Note');
      if (!vNote.valid) return vNote;
      const vSuggest = LOANValidate.Finance.commentC(data.C.suggest, 'Suggest');
      if (!vSuggest.valid) return vSuggest;

      // // BANG D
      // khấu hao tài sản
      const depreciation = data.D?.find((item) => item.id === 25);
      const vDepreciationT = LOANValidate.Finance.validInputTable(
        depreciation?.data.T ?? null,
        'T25'
      );
      if (!vDepreciationT.valid) return vDepreciationT;
      const vDepreciationKH = LOANValidate.Finance.validInputTable(
        depreciation?.data.KH ?? null,
        'KH25'
      );
      if (!vDepreciationKH.valid) return vDepreciationKH;
      const vDepreciationNVKD = LOANValidate.Finance.validInputTable(
        depreciation?.data.NVKD ?? null,
        'NVKD25'
      );
      if (!vDepreciationNVKD.valid) return vDepreciationNVKD;
      // thuế
      const tax = data.D.find((item) => item.id === 26);
      const vTaxT = LOANValidate.Finance.validInputTable(
        tax?.data.T ?? null,
        'T26'
      );
      if (!vTaxT.valid) return vTaxT;
      const vTaxKH = LOANValidate.Finance.validInputTable(
        tax?.data.KH ?? null,
        'KH26'
      );
      if (!vTaxKH.valid) return vTaxKH;
      const vTaxNVKD = LOANValidate.Finance.validInputTable(
        tax?.data.KH ?? null,
        'NVKD26'
      );
      if (!vTaxNVKD.valid) return vTaxNVKD;
      const vEvaluateInfo = LOANValidate.Finance.validateTableE(
        data.E.loan_evaluate_info,
        'evaluate_info'
      );
      if (!vEvaluateInfo.valid) return vEvaluateInfo;
      // return LOANValidate.Finance.validateTableE(data.E.loan_comment,'loan_comment')
      return { valid: true };
    },
  },
  WarehouseModal: {
    area(value: number | null) {
      return { valid: !!value, field: 'area', role: 'empty' };
    },
    address(value: string) {
      return { valid: !!value, field: 'address', role: 'empty' };
    },
    WareHouse(data: ILOANNormalStorageLOANLegalBusinessStore) {
      // const area = LOANValidate.WarehouseModal.area(data.area);
      // if (!area.valid) return area;

      // const address = LOANValidate.WarehouseModal.address(data.apartment);
      // if (!address.valid) return address;

      const province = LOANValidate.common.address.province(data.province);
      if (!province.valid) return province;

      const district = LOANValidate.common.address.district(data.district);
      if (!district.valid) return district;

      return LOANValidate.common.address.ward(data.ward);
    },
  },
};

export const CICValidate = {
  debGroup(value: string, type: string, message: string) {
    return { valid: !!value, message: message, role: 'empty', organ: type };
  },
  other(data: ILOANNormalStorageCICOrgan, organ: string) {
    // const debitGroup = ['borrower', 'marriage', 'coborrower', 'copayer'].forEach(c => {
    //   const debGroup = data.data[c]?.data.find(i => !!i.debtGroup)
    //   // const vdebGroup= CICValidate.debGroup(debGroup ?? '')
    //   // if (!vdebGroup.valid) return vdebGroup;
    //   if(debGroup === undefined){
    //     return { organ: c, value: data.data[c] };
    //   }

    //   return debGroup;
    // })

    // const vdebGroup = CICValidate.debGroup(debGroup?.debtGroup ?? '', organ, "Vui lòng chọn nhóm nợ cao nhất")
    // if (!vdebGroup.valid) return vdebGroup;

    return { valid: true };
  },
};

export const CollateralValidate = {
  address: {
    apartment(value: string) {
      return { valid: !!value, field: 'addressApartment', role: 'empty' };
    },
    province(value: string) {
      return { valid: !!value, field: 'addressProvince', role: 'empty' };
    },
    district(value: string) {
      return { valid: !!value, field: 'addressDistrict', role: 'empty' };
    },
    ward(value: string) {
      return { valid: !!value, field: 'addressWard', role: 'empty' };
    },
  },
  common: {
    certificateNumber(value: string) {
      return { valid: !!value, field: 'certificateNumber', role: 'empty' };
    },
    collateralSubType(value: string) {
      return { valid: !!value, field: 'collateralSubType', role: 'empty' };
    },
    collateralStatus(value: string) {
      return { valid: !!value, field: 'collateralStatus', role: 'empty' };
    },
    infoDetailString(value: string, field: string) {
      return { valid: !!value, field: field, role: 'empty' };
    },
    infoDetailNumber(value: number | null, field: string) {
      return { valid: !!value, field: field, role: 'empty' };
    },

    infoDetailLandAssetBuilding(
      value: number | null,
      field: string,
      address: string
    ) {
      if (address) {
        return { valid: !!value, field: field, role: 'empty' };
      }
      return { valid: true };
    },

    infoDetailLandAsset(
      value: number | null,
      field: string,
      building_area: number | null
    ) {
      if (building_area) {
        return { valid: !!value, field: field, role: 'empty' };
      }
      return { valid: true };
    },

    infoDetailLandAssetString(
      value: string,
      field: string,
      building_area: number | null
    ) {
      if (building_area) {
        return { valid: !!value, field: field, role: 'empty' };
      }
      return { valid: true };
    },
  },
  basic(data: Iitems[], national: string) {
    let validate = {} as unknown as valid;
    data?.forEach((x) => {
      if (x.basic_info.collateral_sub_type === 'LAND') {
        const vCertificateNumber = CollateralValidate.common.certificateNumber(
          x.basic_info.certificate_number
        );
        if (!vCertificateNumber.valid) return (validate = vCertificateNumber);

        const vcollateralSubType = CollateralValidate.common.collateralSubType(
          x.basic_info.collateral_sub_type
        );
        if (!vcollateralSubType.valid) return (validate = vcollateralSubType);

        const vcollateralStatus = CollateralValidate.common.collateralStatus(
          x.basic_info.collateral_status
        );
        if (!vcollateralStatus.valid) return (validate = vcollateralStatus);

        const vAddress = CollateralValidate.address.apartment(
          x.basic_info.address
        );
        if (!vAddress.valid) return (validate = vAddress);

        const vProvince = CollateralValidate.address.province(
          x.basic_info.province_info
        );
        if (!vProvince.valid) return (validate = vProvince);

        const vDistrict = CollateralValidate.address.district(
          x.basic_info.district_info
        );
        if (!vDistrict.valid) return (validate = vDistrict);
        return (validate = CollateralValidate.address.ward(
          x.basic_info.ward_info
        ));
      }
      if (x.basic_info.collateral_sub_type === 'MARK') {
        const vCertificateNumber = CollateralValidate.common.certificateNumber(
          x.basic_info.certificate_number
        );
        if (!vCertificateNumber.valid) return (validate = vCertificateNumber);

        const vcollateralSubType = CollateralValidate.common.collateralSubType(
          x.basic_info.collateral_sub_type
        );
        if (!vcollateralSubType.valid) return (validate = vcollateralSubType);

        const vcollateralStatus = CollateralValidate.common.collateralStatus(
          x.basic_info.collateral_status
        );
        if (!vcollateralStatus.valid) return (validate = vcollateralStatus);

        const vAddress = CollateralValidate.address.apartment(
          x.basic_info.address
        );
        if (!vAddress.valid) return (validate = vAddress);

        const vProvince = CollateralValidate.address.province(
          x.basic_info.province_info
        );
        if (!vProvince.valid) return (validate = vProvince);

        const vDistrict = CollateralValidate.address.district(
          x.basic_info.district_info
        );
        if (!vDistrict.valid) return (validate = vDistrict);
        return (validate = CollateralValidate.address.ward(
          x.basic_info.ward_info
        ));
      }
      if (x.basic_info.collateral_sub_type === 'APPA') {
        const vCertificateNumber = CollateralValidate.common.certificateNumber(
          x.basic_info.certificate_number
        );
        if (!vCertificateNumber.valid) return (validate = vCertificateNumber);

        const vcollateralSubType = CollateralValidate.common.collateralSubType(
          x.basic_info.collateral_sub_type
        );
        if (!vcollateralSubType.valid) return (validate = vcollateralSubType);

        const vcollateralStatus = CollateralValidate.common.collateralStatus(
          x.basic_info.collateral_status
        );
        if (!vcollateralStatus.valid) return (validate = vcollateralStatus);

        const vAddress = CollateralValidate.address.apartment(
          x.basic_info.address
        );
        if (!vAddress.valid) return (validate = vAddress);

        const vProvince = CollateralValidate.address.province(
          x.basic_info.province_info
        );
        if (!vProvince.valid) return (validate = vProvince);

        const vDistrict = CollateralValidate.address.district(
          x.basic_info.district_info
        );
        if (!vDistrict.valid) return (validate = vDistrict);
        return (validate = CollateralValidate.address.ward(
          x.basic_info.ward_info
        ));
      }
    });
    return validate;
  },
  infoDetail(data: Iitems[]) {
    /// Land
    // eslint-disable-next-line array-callback-return
    let validate = {} as unknown as valid;

    data.forEach((x) => {
      if (x.basic_info.collateral_sub_type === 'LAND') {
        /// Đất
        const vLandNumber = CollateralValidate.common.infoDetailString(
          x.details_info.collateral_land?.land_number ?? '',
          'landNumber'
        );
        if (!vLandNumber.valid) return (validate = vLandNumber);
        const vMapNumber = CollateralValidate.common.infoDetailString(
          x.details_info.collateral_land?.map_number ?? '',
          'mapNumber'
        );
        if (!vMapNumber.valid) return (validate = vMapNumber);

        const vArea = CollateralValidate.common.infoDetailNumber(
          x.details_info.collateral_land?.area ?? null,
          'area'
        );
        if (!vArea.valid) return (validate = vArea);
        const vRealArea = CollateralValidate.common.infoDetailNumber(
          x.details_info.collateral_land?.real_area ?? null,
          'realArea'
        );
        if (!vRealArea.valid) return (validate = vRealArea);

        /// CTXD
        const vBuildingArea =
          CollateralValidate.common.infoDetailLandAssetBuilding(
            x.details_info.collateral_land_asset?.building_area ?? null,
            'buildingArea',
            x.details_info.collateral_land_asset?.address ?? ''
          );
        if (!vBuildingArea.valid) return (validate = vBuildingArea);
        const vCertificateArea = CollateralValidate.common.infoDetailLandAsset(
          x.details_info.collateral_land_asset?.certificate_area ?? null,
          'certificateArea',
          x.details_info.collateral_land_asset?.building_area ?? null
        );
        if (!vCertificateArea.valid) return (validate = vCertificateArea);
        const vRealAreaAsset = CollateralValidate.common.infoDetailLandAsset(
          x.details_info.collateral_land_asset?.real_area ?? null,
          'realAreaAsset',
          x.details_info.collateral_land_asset?.building_area ?? null
        );
        if (!vRealAreaAsset.valid) return (validate = vRealAreaAsset);
        const vExpiryDate = CollateralValidate.common.infoDetailLandAsset(
          x.details_info.collateral_land_asset?.expiry_date ?? null,
          'expiryDate',
          x.details_info.collateral_land_asset?.building_area ?? null
        );
        if (!vExpiryDate.valid) return (validate = vExpiryDate);
        const vOwnerType = CollateralValidate.common.infoDetailLandAssetString(
          x.details_info.collateral_land_asset?.owner_type ?? '',
          'ownerType',
          x.details_info.collateral_land_asset?.building_area ?? null
        );
        if (!vOwnerType.valid) return (validate = vOwnerType);
      }

      ///Market
      if (x.basic_info.collateral_sub_type === 'MARK') {
        const vStartDate = CollateralValidate.common.infoDetailNumber(
          x.details_info.start_date ?? null,
          'startDate'
        );
        if (!vStartDate.valid) return (validate = vStartDate);
        const vEndDate = CollateralValidate.common.infoDetailNumber(
          x.details_info.end_date ?? null,
          'endDate'
        );
        if (!vEndDate.valid) return (validate = vEndDate);
        const vAreaMarket = CollateralValidate.common.infoDetailNumber(
          x.details_info.area ?? null,
          'areaMarket'
        );
        if (!vAreaMarket.valid) return (validate = vAreaMarket);
        const vPrice = CollateralValidate.common.infoDetailNumber(
          x.details_info.price ?? null,
          'Price'
        );
        if (!vPrice.valid) return (validate = vPrice);
        const vLoanRate = CollateralValidate.common.infoDetailNumber(
          x.details_info.loan_rate ?? null,
          'loanRate'
        );
        if (!vLoanRate.valid) return (validate = vLoanRate);
      }
      if (x.basic_info.collateral_sub_type === 'APPA') {
        const vLandNumber = CollateralValidate.common.infoDetailString(
          x.details_info.collateral_land?.land_number ?? '',
          'landNumberApartment'
        );
        if (!vLandNumber.valid) return (validate = vLandNumber);
        const vArea = CollateralValidate.common.infoDetailNumber(
          x.details_info.collateral_land?.area ?? null,
          'areaApartment'
        );
        if (!vArea.valid) return (validate = vArea);
        const vExpiryDate = CollateralValidate.common.infoDetailNumber(
          x.details_info.collateral_land?.expiry_date ?? null,
          'expiryDateApartment'
        );
        if (!vExpiryDate.valid) return (validate = vExpiryDate);
      }
    });
    return validate;
  },
};

export const OtherValidate = {
  exceptionName(value: string) {
    return { valid: !!value, field: 'exceptionName', role: 'empty' };
  },
  exceptionDetailCode(value: string) {
    return { valid: !!value, field: 'exceptionDetailCode', role: 'empty' };
  },
  // exceptionDetailCodeIsExist(){
  //   return { valid: false, field: 'exceptionDetailCode', role: 'isEsixt' }
  // },
  exceptionRealityDescription(value: string) {
    return {
      valid: !!value,
      field: 'exceptionRealityDescription',
      role: 'empty',
    };
  },
  exception(data: ILOANNormalStorageExceptionState) {
    const validateExceptionName = OtherValidate.exceptionName(
      data.exceptionName
    );
    if (!validateExceptionName.valid) return validateExceptionName;

    return { valid: true };
  },
  report(value: string | null) {
    if (value === null || value === '') {
      return { valid: false, field: 'report', role: 'empty' };
    }
    return { valid: true };
  },
  exceptionDetail(value: ILOANNormalStorageExceptionDetail) {
    const validateExceptionDetailCode = OtherValidate.exceptionDetailCode(
      value.exceptionDetailCode
    );
    if (!validateExceptionDetailCode.valid) return validateExceptionDetailCode;

    const validateExceptionRealityDescription =
      OtherValidate.exceptionRealityDescription(
        value.exceptionRealityDescription
      );
    if (!validateExceptionRealityDescription.valid)
      return validateExceptionRealityDescription;

    return { valid: true };
  },
  riskInfo(value: string) {
    return { valid: !!value, field: 'riskInfo', role: 'empty' };
  },
  measuresLimitRisk(value: string) {
    return { valid: !!value, field: 'measuresLimitRisk', role: 'empty' };
  },
  riskDetail(data: ILOANNormalStorageRisksGroup) {
    const validateRiskInfo = OtherValidate.riskInfo(data.riskInfo);
    if (!validateRiskInfo.valid) return validateRiskInfo;

    const validateMeasuresLimitRisk = OtherValidate.measuresLimitRisk(
      data.measuresLimitRisk
    );
    if (!validateMeasuresLimitRisk.valid) return validateMeasuresLimitRisk;

    return { valid: true };
  },
};
