/* eslint-disable array-callback-return */
import { current, Draft, PayloadAction } from "@reduxjs/toolkit"
import { ILOANNormalState } from "types/models/loan/normal"
import { IBasicInfo, ICollateral, ICollateralAPIState, IDashboard, IDetailInfo, Iitems, ILOANNormalStorageCollateralValidate, IOwnerItem, IOwnerItemIdentityInfo } from "types/models/loan/normal/storage/Collateral"
import { ILOANNormalStorageAddress } from "types/models/loan/normal/storage/Legal"
import { IUser } from "views/pages/LOAN/screens/Normal/Initialize/Collateral/ModalInfomation"
import { generateEmty, generateEmtyCollateral, generateEmtyCollateralItems } from "views/pages/LOAN/utils"
import { autofillCollaretalDetails, autofillcollateralApt, autofillcollateralLand, autofillcollateralLandAsset } from "./autofill"

export const CollateralCase = {
  addCollateral(state: Draft<ILOANNormalState>) {
    let dashboard = [...state.storage.collateral.dashboard].find(d => d.id === "REST");
    if (!dashboard) {
      state.storage.collateral.dashboard.push(generateEmty());
    }
    state.storage.collateral.collaterals.push(generateEmtyCollateral());
  },
  addNewItem(state: Draft<ILOANNormalState>, action: PayloadAction<IBasicInfo>) {
    let collateralCurrent = [...state.storage.collateral.collaterals];
    let lenghtItems = (collateralCurrent[0]?.items.length ?? 0) + 1;

    let generaData = generateEmtyCollateralItems();
    let BasicInfo: IBasicInfo = {
      collateral_sub_type: "",
      certificate_number: "",
      collateral_status: "",
      address: "",
      province_info: "",
      district_info: "",
      ward_info: ""
    }

    generaData.item_name = `Tài sản đảm bảo ${lenghtItems}`;
    generaData.item_order = lenghtItems;
    generaData.basic_info = BasicInfo;


    state.storage.collateral.dashboard.map(d => {
      if (d.id === "REST") {
        d.quantity = d.quantity + 1
      }
      return d;
    })
    state.storage.collateral.collaterals[0].items.push(generaData);
  },

  setCollateralItems: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string | number | null | boolean, string, { key: keyof Iitems, index: number }>) {
      state.storage.collateral.collaterals[0].items[action.meta.index] =
      {
        ...state.storage.collateral.collaterals[0].items[action.meta.index],
        [action.meta.key]: action.payload
      }
    },

    prepare(payload: string | number | null | boolean, meta: { key: keyof Iitems, index: number }) {
      return { payload, meta }
    }
  },

  setCollateralItemsDetail: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string | number | null, string, { key: keyof IDetailInfo, index: number }>) {
      state.storage.collateral.collaterals[0].items[action.meta.index].details_info =
      {
        ...state.storage.collateral.collaterals[0].items[action.meta.index].details_info,
        [action.meta.key]: action.payload
      }
    },

    prepare(payload: string | number | null, meta: { key: keyof IDetailInfo, index: number }) {
      return { payload, meta }
    }
  },



  ////auto fill
  ///////////

  autofillDetails: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string | number | null, string, number>) {
      state.storage.collateral.collaterals[0].items[action.meta].details_info = {
        ...autofillCollaretalDetails()
      }

    },

    prepare(payload: string | number | null, meta: number) {
      return { payload, meta }
    }
  },

  autofillCollaretalLand: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string | number | null, string, { key: string, i: number, type: string }>) {
      if (action.meta.type === "collateral_land") {
        state.storage.collateral.collaterals[0].items[action.meta.i].details_info =
        {
          ...state.storage.collateral.collaterals[0].items[action.meta.i].details_info,
          ...autofillCollaretalDetails(),
          collateral_land: {...autofillcollateralLand()},
          collateral_land_asset: {
            ...autofillcollateralLandAsset(),
          }
        }
      }

      else {
        state.storage.collateral.collaterals[0].items[action.meta.i].details_info =
        {
          ...state.storage.collateral.collaterals[0].items[action.meta.i].details_info,
          ...autofillCollaretalDetails(),
          collateral_land: {...autofillcollateralLand()},
          collateral_apartment: {
            ...autofillcollateralApt()
          }
        }
      }
    },
    prepare(payload: string | number | null, meta: { key: string, i: number, type: string }) {
      return { payload, meta }
    }
  },
  autofillCollaretalLandAddress: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<Pick<ILOANNormalStorageAddress, 'province' | 'district' | 'ward'>, string, { i: number, type: string }>) {
      let data = current(state.storage.collateral.collaterals[0].items[action.meta.i]);
      switch (action.meta.type) {
        case 'collateral_land':
          data = {
            ...data,
            details_info: {
              ...data.details_info,
              collateral_land: {
                ...data.details_info.collateral_land,
                province_code: action.payload.province,
                district_code: action.payload.district,
                ward_code: action.payload.ward,
              }
            }

          }
          state.storage.collateral.collaterals[0].items[action.meta.i] = data;
          break;
        case 'collateral_land_asset':
          data = {
            ...data,
            details_info: {
              ...data.details_info,
              collateral_land_asset: {
                ...data.details_info.collateral_land_asset,
                province_code: action.payload.province,
                district_code: action.payload.district,
                ward_code: action.payload.ward,
              }
            }

          }
          state.storage.collateral.collaterals[0].items[action.meta.i] = data;

          break;
        case 'collateral_apartment':
          data = {
            ...data,
            details_info: {
              ...data.details_info,
              collateral_apartment: {
                ...data.details_info.collateral_apartment,
                province_code: action.payload.province,
                district_code: action.payload.district,
                ward_code: action.payload.ward,
              }
            }
          }
          state.storage.collateral.collaterals[0].items[action.meta.i] = data;

          break;

        case 'basic_info':
          data = {
            ...data,
            basic_info: {
              ...data.basic_info,
              province_info: action.payload.province,
              district_info: action.payload.district,
              ward_info: action.payload.ward,
            }
          }
          state.storage.collateral.collaterals[0].items[action.meta.i] = data;
          break;
        default:
          break;
      }
    },
    prepare(payload: Pick<ILOANNormalStorageAddress, 'province' | 'district' | 'ward'>, meta: { i: number, type: string }) {
      return { payload, meta };
    }
  },

/////////////
  setCollateralDetailLand: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string | number | null, string, { key: string, i: number, type: string }>) {
      if (action.meta.type === "collateral_land") {
        state.storage.collateral.collaterals[0].items[action.meta.i].details_info =
        {
          ...state.storage.collateral.collaterals[0].items[action.meta.i].details_info,
          collateral_land: {
            ...state.storage.collateral.collaterals[0].items[action.meta.i].details_info.collateral_land,
            [action.meta.key]: action.payload
          }
        }
      }
      else if (action.meta.type === "collateral_land_asset") {
        state.storage.collateral.collaterals[0].items[action.meta.i].details_info =
        {
          ...state.storage.collateral.collaterals[0].items[action.meta.i].details_info,
          collateral_land_asset: {
            ...state.storage.collateral.collaterals[0].items[action.meta.i].details_info.collateral_land_asset,
            [action.meta.key]: action.payload
          }
        }
      } else {
        state.storage.collateral.collaterals[0].items[action.meta.i].details_info =
        {
          ...state.storage.collateral.collaterals[0].items[action.meta.i].details_info,
          collateral_apartment: {
            ...state.storage.collateral.collaterals[0].items[action.meta.i].details_info.collateral_apartment,
            [action.meta.key]: action.payload
          }
        }
      }
    },
    prepare(payload: string | number | null, meta: { key: string, i: number, type: string }) {
      return { payload, meta }
    }
  },

  setCollateralDetailAddressLand: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<Pick<ILOANNormalStorageAddress, 'province' | 'district' | 'ward'>, string, { i: number, type: string }>) {
      let data = current(state.storage.collateral.collaterals[0].items[action.meta.i]);
      switch (action.meta.type) {
        case 'collateral_land':
          data = {
            ...data,
            details_info: {
              ...data.details_info,
              collateral_land: {
                ...data.details_info.collateral_land,
                province_code: action.payload.province,
                district_code: action.payload.district,
                ward_code: action.payload.ward,
              }
            }

          }
          state.storage.collateral.collaterals[0].items[action.meta.i] = data;
          break;
        case 'collateral_land_asset':
          data = {
            ...data,
            details_info: {
              ...data.details_info,
              collateral_land_asset: {
                ...data.details_info.collateral_land_asset,
                province_code: action.payload.province,
                district_code: action.payload.district,
                ward_code: action.payload.ward,
              }
            }

          }
          state.storage.collateral.collaterals[0].items[action.meta.i] = data;

          break;
        case 'collateral_apartment':
          data = {
            ...data,
            details_info: {
              ...data.details_info,
              collateral_apartment: {
                ...data.details_info.collateral_apartment,
                province_code: action.payload.province,
                district_code: action.payload.district,
                ward_code: action.payload.ward,
              }
            }
          }
          state.storage.collateral.collaterals[0].items[action.meta.i] = data;

          break;

        case 'basic_info':
          data = {
            ...data,
            basic_info: {
              ...data.basic_info,
              province_info: action.payload.province,
              district_info: action.payload.district,
              ward_info: action.payload.ward,
            }
          }
          state.storage.collateral.collaterals[0].items[action.meta.i] = data;
          break;
        default:
          break;
      }
    },
    prepare(payload: Pick<ILOANNormalStorageAddress, 'province' | 'district' | 'ward'>, meta: { i: number, type: string }) {
      return { payload, meta };
    }
  },
  setLOANNormalCollateralUserWrapper: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<IUser[], string, { i: number, type: string, name: string}>) {
      const existUUID: string[] = state.storage.collateral.collaterals[0].items[action.meta.i].owner_wrapper.owner_item.map(x => {
        return x?.uuid;
      });

      const dataMap = action.payload.map((ow, idx) => {
        if (!existUUID.includes(ow.value.basic.person_uuid)) {
          return {
            address_info: ow.value.address.address.map(ad => {
              return {
                contact_address: {
                  address: ad.apartment,
                  province_code: ad.province,
                  district_code: ad.district,
                  ward_code: ad.ward,
                },
                permanent_address: {
                  address: ad.apartment,
                  province_code: ad.province,
                  district_code: ad.district,
                  ward_code: ad.ward,
                }
              }
            }),
            basic_info: {
              uuid: ow.value.basic.person_uuid,
              full_name: ow.value.basic.fullname,
              date_of_birth: ow.value.basic.birthday,
              mobile_num: ow.value.basic.mobile,
            },
            // eslint-disable-next-line array-callback-return
            identity_info: ow.value.identity && ow.value.identity.map(i => {
              if (i.primaryFlag) {
                return {
                  uuid: i.uuid,
                  identity_num: i.num,
                  identity_type: i.type,
                  expired_dates: i.expiredDate,
                  issued_date: i.issuedDate,
                  place_of_issue: i.placeOfIssue,
                  primary_flag: true,
                }
              }
            }).filter(a => !!a) as unknown as IOwnerItemIdentityInfo[],
            uuid: ow.value.basic.person_uuid
          }
        }
      }).filter(x=> !!x);

      state.storage.collateral.collaterals[0].items[action.meta.i].owner_wrapper = {
        code: action.meta.type,
        name: action.meta.name,
        owner_item: [
          ...state.storage.collateral.collaterals[0].items[action.meta.i].owner_wrapper.owner_item,
          ...dataMap,
        ] as unknown as IOwnerItem[]
      }
    },
    prepare(payload: IUser[], meta: { i: number, type: string, name: string }) {
      return { payload, meta };
    }
  },
  saveCollateral(state: Draft<ILOANNormalState>, action: PayloadAction<boolean>) {
  },

  setCollateralCode: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string, string, number>) {
      state.storage.collateral.collaterals[0].items[action.meta].code = action.payload;
    },
    prepare(payload: string, meta: number) {
      return { payload, meta };
    }
  },

  setCollateralBasicInfo: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string, string, { index: number, key: string }>) {
      state.storage.collateral.collaterals[0].items[action.meta.index].basic_info = {
        ...state.storage.collateral.collaterals[0].items[action.meta.index].basic_info,
        [action.meta.key]: action.payload
      }
    },
    prepare(payload: string, meta: { index: number, key: string }) {
      return { payload, meta };
    }
  },

  setLOANNormalStorageCollateralValidate(state: Draft<ILOANNormalState>, action: PayloadAction<ILOANNormalStorageCollateralValidate>) {
    state.storage.collateral.validate = action.payload;
  },

  updateLOANNormalStorageCollateralAPI(state: Draft<ILOANNormalState>, action: PayloadAction<ICollateralAPIState>) {
    console.log('action-> PAYLOAD', action.payload);

    state.storage.collateral = {
        validate: {} as ILOANNormalStorageCollateralValidate,
        dashboard: action.payload.data.dashboard?.map(x => {
          return {
            id: x.id,
            name: x.name,
            quantity: x.quantity,
          }
        }) ?? [] as unknown as IDashboard[],
        collaterals: action.payload.data.collaterals?.map(c => {
          return {
            ...c,
            collateral_type: {
              collateral_type: c.collateral_type?.collateral_type ?? '',
              collateral_type_desc:  c.collateral_type?.collateral_type_desc ?? ''
            },
            items: c.items?.map(i => {
              console.log('collateral_apartment:::::::', i.details_info.collateral_apartment);

              return {
                ...i,
                basic_info: {
                  address: i.basic_info.address ?? '',
                  certificate_number: i.basic_info.certificate_number ?? '',
                  province_info: i.basic_info.province?.province_code ?? '',
                  district_info: i.basic_info.district?.district_code ?? '',
                  ward_info: i.basic_info.ward?.ward_code ?? '',
                  collateral_status: i.basic_info.collateral_status.id ?? '',
                  collateral_sub_type: i.basic_info.collateral_sub_type.collateral_sub_type ?? '',
                },
                code: i.collateral_code ?? '',
                details_info: {
                  description: i.details_info.description ?? '',
                  market_name: i.details_info.market_name ?? '',
                  block: i.details_info.block ?? '',
                  floor: i.details_info.floor ?? '',
                  brand_name: i.details_info.brand_name ?? '',
                  start_date: i.details_info.start_date ?? null,
                  end_date: i.details_info.end_date ?? null,
                  used_rest: i.details_info.used_rest?.value ?? null,
                  area: i.details_info.area?.value ?? null,
                  price: i.details_info.price.value ?? null,
                  loan_rate: i.details_info.loan_rate?.value ?? null,
                  collateral_land: {
                    address: i.details_info.collateral_land[0]?.address ?? '',
                    province_code: i.details_info.collateral_land[0]?.province.province_code ?? '',
                    district_code: i.details_info.collateral_land[0]?.district.district_code ?? '',
                    ward_code: i.details_info.collateral_land[0]?.ward.ward_code ?? '',
                    land_number: i.details_info.collateral_land[0]?.land_number ?? '',
                    map_number: i.details_info.collateral_land[0]?.map_number ?? '',
                    area: i.details_info.collateral_land[0]?.area.value ?? 0,
                    real_area: i.details_info.collateral_land[0]?.real_area.value ?? 0,
                    expiry_date: i.details_info.collateral_land[0]?.expiry_date.value ?? 0,
                    land_source: i.details_info.collateral_land[0]?.land_source ?? '',
                    price: i.details_info.collateral_land[0]?.price?.value ?? 0,
                  } ?? {},
                  collateral_land_asset: {
                    address: i.details_info.collateral_land_asset[0]?.address ?? '',
                    province_code: i.details_info.collateral_land_asset[0]?.province.province_code ?? '',
                    district_code: i.details_info.collateral_land_asset[0]?.district.district_code ?? '',
                    ward_code: i.details_info.collateral_land_asset[0]?.ward.ward_code ?? '',
                    building_area: i.details_info.collateral_land_asset[0]?.building_area.value ?? 0,
                    certificate_area: i.details_info.collateral_land_asset[0]?.certificate_area.value ?? 0,
                    real_area: i.details_info.collateral_land_asset[0]?.real_area.value ?? '',
                    expiry_date: i.details_info.collateral_land_asset[0]?.expiry_date.value ?? 0,
                    owner_type: i.details_info.collateral_land_asset[0]?.owner_type ?? '',
                    price: i.details_info.collateral_land_asset[0]?.price.value ?? 0,
                  } ?? {},
                  collateral_apartment: {
                    address: i.details_info.collateral_apartment[0]?.address ?? '',
                    province_code: i.details_info.collateral_apartment[0]?.province.province_code ?? '',
                    district_code: i.details_info.collateral_apartment[0]?.district.district_code ?? '',
                    ward_code: i.details_info.collateral_apartment[0]?.ward.ward_code ?? '',
                    apartment_number: i.details_info.collateral_apartment[0]?.apartment_number ?? '',
                    block: i.details_info.collateral_apartment[0]?.block ?? '',
                    floor: i.details_info.collateral_apartment[0]?.floor ?? '',
                    contract_number: i.details_info.collateral_apartment[0]?.contract_number ?? '',
                    contract_name: i.details_info.collateral_apartment[0]?.contract_name ?? '',
                    contract_date: i.details_info.collateral_apartment[0]?.contract_date ?? 0,
                    expiration_date: i.details_info.collateral_apartment[0]?.expiration_date.value ?? 0,
                    area: i.details_info.collateral_apartment[0]?.area.value ?? 0,
                    carpet_area: i.details_info.collateral_apartment[0]?.carpet_area.value ?? 0,
                    price: i.details_info.collateral_apartment[0]?.price.value ?? 0,
                  } ?? {},
                },
                item_name: i.item_name,
                item_order: i.item_order,
                owner_wrapper: {
                  code: i.owner_wrapper.relationship_type,
                  name: i.owner_wrapper.relationship_type_desc,
                  owner_item: i.owner_wrapper.owners?.map(x => {
                    return {
                      basic_info: {
                        full_name: x.basic_info.fullname,
                        date_of_birth: (x.basic_info.date_of_birth as number) * 1000,
                        mobile_num: x.basic_info.mobile,
                      },
                      identity_info: x.identity_info?.map(id => {
                          return {
                            uuid: id.uuid,
                            identity_type: id.identity_type.code,
                            identity_num: id.identity_num,
                            issued_date: id.issued_date ?? null,
                            expired_dates: id.expired_dates ?? null,
                            place_of_issue: id.place_of_issue,
                            primary_flag: id.primary_flag,
                          }
                      }).filter(flag => flag.primary_flag),
                      address_info: x.address_info?.map(a => {
                        return {
                          permanent_address: {
                            address: a.permanent_address.address,
                            province_code: a.permanent_address.province_info.province_code,
                            district_code: a.permanent_address.district_info.district_code,
                            ward_code: a.permanent_address.ward_info.ward_code,
                          },
                          contact_address: {
                            address: a.contact_address.address,
                            province_code: a.contact_address.province_info.province_code,
                            district_code: a.contact_address.district_info.district_code,
                            ward_code: a.contact_address.ward_info.ward_code,
                          }
                        }
                      }),
                      uuid: x.uuid,
                    }
                  })
                },
                used_other_contract_flag: i.additional_info.used_other_contract_flag,

              }
            })
          }
        }) ?? [] as unknown as ICollateral[],
      }
    console.log('STATETETETET', state.storage.collateral);

  }
}