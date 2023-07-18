import { Draft, PayloadAction } from '@reduxjs/toolkit';
import { ILOANNormalState } from 'types/models/loan/normal';
import { ILOANNormalData } from 'types/models/loan/normal/storage';
import { generateLoanLegalUser } from '../legal/generateEmptyLegal';

export const ProductCase = {
  setCategory(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    state.storage.product.category = action.payload;
    state.storage.product.type = '';
    state.storage.product.detail = '';
    state.storage.product.partnerCode = '';
    state.storage.product.partnerProduct = '';
  },
  setType(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    state.storage.product.type = action.payload;
    state.storage.product.detail = '';
    state.storage.product.partnerCode = '';
    state.storage.product.partnerProduct = '';
  },
  setDetail(state: Draft<ILOANNormalState>, action: PayloadAction<string>) {
    state.storage.product.detail = action.payload;
    state.storage.product.partnerCode = '';
    state.storage.product.partnerProduct = '';
  },
  setPartnerCode(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<string>
  ) {
    state.storage.product.partnerCode = action.payload;
    state.storage.product.partnerProduct = '';
  },
  setPartnerProduct(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<string>
  ) {
    state.storage.product.partnerProduct = action.payload;
  },
  setCollateral(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<boolean>
  ) {
    state.storage.product.collateral = action.payload;
  },
  setLinkProject(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<string>
  ) {
    state.storage.product.linkProject = action.payload;
  },
  setException(state: Draft<ILOANNormalState>, action: PayloadAction<boolean>) {
    state.storage.product.exception = action.payload;
  },
  saveProduct(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<boolean>
  ) {},
  clearProduct(state: Draft<ILOANNormalState>) {
    state.storage.full.data = null;
    state.storage.full.fetching = false;
    state.storage.full.fetched = false;
    state.storage.product.category = '';
    state.storage.product.type = '';
    state.storage.product.detail = '';
    state.storage.product.partnerCode = '';
    state.storage.product.partnerProduct = '';
  },
  clearStateGuide(state: Draft<ILOANNormalState>) {
    state.storageStateGuide.data = undefined;
  },

  clearLOANNormalStorageLegal(state: Draft<ILOANNormalState>) {
    state.storage.legal = {
      validate: {
        valid: true,
      },
      data: {
        BORROWER: {
          uuidActiveLocal: '',
          listContactPersonUUID: [],
          info: [
            {
              uuidActiveLocal: '',
              declare: ['RELATED'],
              basic: {
                person_uuid: '',
                fullname: '',
                customerType: '',
                birthday: null,
                placeOfBirth: '',
                gender: '',
                national: 'VN',
                marriageStatus: '',
                ownerProperty: '',
                under18: null,
                over18: null,
                telephone: '',
                mobile: '',
                email: '',
                education: '',
                ecomonic: '',
                relationship: '',
                tax: '',
                cif: '',
              },
              other: {
                fatca: '',
                career: '',
                income3Month: '',
                note: '',
              },
              identity: [],
              address: {
                resident: '',
                location: '',
                address: [],
              },
              uuidActiveFile: '',
              document_info_list: [],
            },
          ],
        },
        MARRIAGE: {
          uuidActiveLocal: '',
          listContactPersonUUID: [],
          info: [generateLoanLegalUser()],
        },
        CO_BRW: {
          uuidActiveLocal: '',
          listContactPersonUUID: [],
          info: [],
        },
        CO_PAYER: {
          uuidActiveLocal: '',
          listContactPersonUUID: [],
          info: [],
        },
        LAW_RLT: {
          uuidActiveLocal: '',
          listContactPersonUUID: [],
          info: [],
        },
        RELATED: {
          uuidActiveLocal: '',
          listContactPersonUUID: [],
          info: [],
        },
        OTHER: {
          uuidActiveLocal: '',
          listContactPersonUUID: [],
          info: [],
        },
      },
      blacklist: null,
    };
    // state.storage.collateral_v2.data = [] // hao
    // state.storage.collateral_v2.activeType = "" // hao
    // state.storage.collateral_v2.uuidActiveData = "" // hao
    // state.storage.collateral_v2.carousel = [] // hao
  },
  setStorageData(
    state: Draft<ILOANNormalState>,
    action: PayloadAction<ILOANNormalData | null>
  ) {
    state.storage.full.data = action.payload;

    state.storage.product.category =
      action.payload?.form.product_group_form.data.loan_product_info
        .loan_product_category_info.product_category_code ?? '';

    state.storage.product.type =
      action.payload?.form.product_group_form.data.loan_product_info
        .loan_product_type_info.product_type_code ?? '';

    state.storage.product.detail =
      action.payload?.form.product_group_form.data.loan_product_info
        .loan_product_detail_info.product_detail_code ?? '';

    state.storage.product.partnerCode =
      action.payload?.form.product_group_form.data
        .loan_product_affiliate_partner_info.loan_affiliate_partner_info
        ?.loan_affiliate_partner_id ?? '';

    state.storage.product.partnerProduct =
      action.payload?.form.product_group_form.data
        .loan_product_affiliate_partner_info
        .loan_affiliate_partner_product_category_info
        ?.loan_affiliate_partner_product_category_id ?? '';

    state.storage.product.collateral =
      action.payload?.form.product_group_form.data.loan_document_info
        .collateral_flag ?? true;

    state.storage.product.exception =
      action.payload?.form.product_group_form.data.loan_document_info
        .exception_document_flag ?? false;

    state.storage.product.linkProject =
      (action.payload?.form.product_group_form.data
        .loan_product_affiliate_partner_info.loan_affiliate_partner_info ===
        null &&
        action.payload?.form.product_group_form.data
          .loan_product_affiliate_partner_info
          .loan_affiliate_partner_product_category_info === null) ||
      action.payload?.form.product_group_form.data
        .loan_product_affiliate_partner_info === null
        ? 'N'
        : 'Y';

    state.storage.product.is_business =
      action.payload?.form?.product_group_form?.data?.is_business ?? null;
  },
};
