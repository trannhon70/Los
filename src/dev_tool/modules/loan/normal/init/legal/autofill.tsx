import { generateUUID } from "utils";

const generate_phone = () => {
  let rs = '096';
  for (let i = 0; i < 7; ++i){
    rs += Math.random().toString().substr(2, 1)
  }

  return rs;
}

const generate_identity = (length = 9) => {
  let rs = '';
  for (let i = 0; i < length; ++i){
    rs += Math.random().toString().substr(2, 1)
  }
  return rs;
}

export const autofill = {
  borrower: {
    uuidRemote: '',
    uuid: generateUUID(),
    declare: [ 'MARRIAGE', 'CO_BRW', 'CO_PAYER', 'LAW_RLT', 'RELATED', 'OTHER' ],
    basic: {
      fullname: "NGUYỄN DUY PHƯƠNG",
      customerType: "I",
      birthday: -508049976679,
      placeOfBirth: "Việt Nam",
      gender: "M",
      national: "VN",
      marriageStatus: "SINGLE",
      ownerProperty: "OWNER",
      under18: 1,
      over18: 2,
      mobile: generate_phone(),
      telephone: generate_phone(),
      email: "phuongnd@gmail.com",
      education: "BELOW_INTERMEDIATE",
      ecomonic: "KA_0601",
      relationship: '',
      tax: '',
      cif: '',
      uuidRemote: ''
    },
    other: {
      fatca: "CO",
      career: "P",
      income3Month: "TNBQ_003",
      note: ''
    },
    identity: [
      {
        type: "CIF_ID_TYPE",
        num: generate_identity(),
        issuedDate: 1283713547000,
        expiredDate: 1793905569000,
        placeOfIssue: "Công An TP. Hồ Chí Minh",
        primaryFlag: true,
        uuid: generateUUID(),
        uuidRemote: ''
      }
    ],
    address: {
      resident: "R",
      location: "TP. Hồ Chí Minh",
      address: [
        {
          type: "PERMANENT",
          apartment: "123 Linh Trung",
          province: "79",
          district: "762",
          ward: "26800",
          primaryFlag: true,
          uuid: generateUUID(),
          uuidRemote: ''
        },
        {
          type: "TEMP",
          apartment: "456 Tên Lửa",
          province: "79",
          district: "777",
          ward: "27457",
          primaryFlag: true,
          uuid: generateUUID(),
          uuidRemote: ''
        }
      ]
    }
  },
  data: {
    marriage: {
      active: 0,
      info: [
        {
          uuidRemote: '',
          uuid: generateUUID(),
          declare: [],
          basic: {
            fullname: "NGUYỄN THỊ PHƯƠNG",
            customerType: "",
            birthday: 626415693000,
            placeOfBirth: "Việt Nam",
            gender: "F",
            national: "VN",
            marriageStatus: "",
            ownerProperty: "",
            under18: 0,
            over18: 0,
            mobile: generate_phone(),
            telephone: generate_phone(),
            email: "phuongnt@gmail.com",
            education: "",
            ecomonic: "",
            relationship: '',
            tax: '',
            cif: '',
            uuidRemote: ''
          },
          other: {
            fatca: "",
            career: "",
            income3Month: "",
            note: ''
          },
          identity: [
            {
              type: "CIF_ID_TYPE",
              num: generate_identity(),
              issuedDate: 1383625342000,
              expiredDate: 1762143744000,
              placeOfIssue: "TP. Hồ Chí Minh",
              primaryFlag: true,
              uuid: generateUUID(),
              uuidRemote: ''
            }
          ],
          address: {
            resident: '',
            location: '',
            address: [
              {
                type: "PERMANENT",
                apartment: "123 Tên Lửa",
                province: "79",
                district: "784",
                ward: "27592",
                primaryFlag: true,
                uuid: generateUUID(),
                uuidRemote: ''
              },
              {
                type: "TEMP",
                apartment: "456 Lê Quang Định",
                province: "79",
                district: "765",
                ward: "26935",
                primaryFlag: true,
                uuid: generateUUID(),
                uuidRemote: ''
              }
            ]
          }
        }
      ]
    },
    coborrower: {
      active: 0,
      info: [
        {
          uuidRemote: '',
          uuid: generateUUID(),
          declare: [],
          basic: {
            fullname: "PHẠM THÀNH ĐẠT",
            customerType: "",
            birthday: 500040297000,
            placeOfBirth: "Việt Nam",
            gender: "M",
            national: "VN",
            marriageStatus: "",
            ownerProperty: "",
            under18: 0,
            over18: 0,
            mobile: generate_phone(),
            telephone: generate_phone(),
            email: "phamthanhdat@gmail.com",
            education: "",
            ecomonic: "",
            relationship: 'SBILING',
            tax: '',
            cif: '',
            uuidRemote: ''
          },
          other: {
            fatca: "",
            career: "",
            income3Month: "",
            note: ''
          },
          identity: [
            {
              type: "CIF_ID_TYPE",
              num: generate_identity(),
              issuedDate: 752241931000,
              expiredDate: 1888229143000,
              placeOfIssue: "Công an TP. HCM",
              primaryFlag: true,
              uuid: generateUUID(),
              uuidRemote: ''
            },
            {
              type: "PASSPORT",
              num: generate_identity(),
              issuedDate: 1510488374000,
              expiredDate: 1793707580000,
              placeOfIssue: "Cục Xuất Nhập Cảnh TP. HCM",
              primaryFlag: false,
              uuid: generateUUID(),
              uuidRemote: ''
            }
          ],
          address: {
            resident: 'R',
            location: '',
            address: [
              {
                type: "PERMANENT",
                apartment: "342 Nguyễn Xí",
                province: "79",
                district: "765",
                ward: "26914",
                primaryFlag: true,
                uuid: generateUUID(),
                uuidRemote: ''
              },
              {
                type: "PERMANENT",
                apartment: "432 Tôn Đức Thắng",
                province: "79",
                district: "760",
                ward: "26740",
                primaryFlag: false,
                uuid: generateUUID(),
                uuidRemote: ''
              },
              {
                type: "TEMP",
                apartment: "123 Phạm Hùng",
                province: "79",
                district: "776",
                ward: "27388",
                primaryFlag: true,
                uuid: generateUUID(),
                uuidRemote: ''
              }
            ]
          }
        },
        {
          uuidRemote: '',
          uuid: generateUUID(),
          declare: [],
          basic: {
            fullname: "PHẠM PHƯƠNG HOA",
            customerType: "",
            birthday: 815832690000,
            placeOfBirth: "Việt Nam",
            gender: "F",
            national: "VN",
            marriageStatus: "",
            ownerProperty: "",
            under18: 0,
            over18: 0,
            mobile: generate_phone(),
            telephone: generate_phone(),
            email: "hoapp@email.com",
            education: "",
            ecomonic: "",
            relationship: 'CHILD',
            tax: '',
            cif: '',
            uuidRemote: ''
          },
          other: {
            fatca: "",
            career: "",
            income3Month: "",
            note: ''
          },
          identity: [
            {
              type: "CIF_ID_TYPE",
              num: generate_identity(),
              issuedDate: 1258459953000,
              expiredDate: 1793707960000,
              placeOfIssue: "Công An tỉnh Long An",
              primaryFlag: true,
              uuid: generateUUID(),
              uuidRemote: ''
            }
          ],
          address: {
            resident: 'R',
            location: '',
            address: [
              {
                type: "PERMANENT",
                apartment: "67 Lữ Gia",
                province: "79",
                district: "766",
                ward: "26974",
                primaryFlag: true,
                uuid: generateUUID(),
                uuidRemote: ''
              },
              {
                type: "TEMP",
                apartment: "23 Phạm Văn Đồng",
                province: "79",
                district: "762",
                ward: "26818",
                primaryFlag: true,
                uuid: generateUUID(),
                uuidRemote: ''
              }
            ]
          }
        }
      ]
    },
    copayer: {
      active: 0,
      info: [
        {
          uuidRemote: '',
          uuid: generateUUID(),
          declare: [],
          basic: {
            fullname: "DƯƠNG NỮ HUỲNH ANH",
            customerType: "",
            birthday: 594391014000,
            placeOfBirth: "Việt Nam",
            gender: "F",
            national: "VN",
            marriageStatus: "",
            ownerProperty: "",
            under18: 0,
            over18: 0,
            mobile: generate_phone(),
            telephone: generate_phone(),
            email: "anhdnh@gmail.com",
            education: "",
            ecomonic: "",
            relationship: "SBILING",
            tax: "",
            cif: "",
            uuidRemote: ''
          },
          other: {
            fatca: "",
            career: "",
            income3Month: "",
            note: ''
          },
          identity: [
            {
              type: "CIF_ID_TYPE",
              num: generate_identity(),
              issuedDate: 1505133469000,
              expiredDate: 1794400679000,
              placeOfIssue: "Công An TP. Hồ Chí Minh",
              primaryFlag: true,
              uuid: generateUUID(),
              uuidRemote: ''
            }
          ],
          address: {
            resident: 'R',
            location: '',
            address: [
              {
                type: "PERMANENT",
                apartment: "12 Nguyễn Thị Thập",
                province: "79",
                district: "778",
                ward: "27490",
                primaryFlag: true,
                uuid: generateUUID(),
                uuidRemote: ''
              },
              {
                type: "TEMP",
                apartment: "14 Phan Văn Trị",
                province: "79",
                district: "765",
                ward: "26959",
                primaryFlag: true,
                uuid: generateUUID(),
                uuidRemote: ''
              }
            ]
          }
        }
      ]
    },
    legalRelated: {
      active: 0,
      info: [
        {
          uuidRemote: '',
          uuid: generateUUID(),
          declare: [],
          basic: {
            fullname: "TRẦN THANH LONG",
            customerType: "I",
            birthday: null,
            placeOfBirth: "Việt Nam",
            gender: "",
            national: "VN",
            marriageStatus: "",
            ownerProperty: "",
            under18: 0,
            over18: 0,
            mobile: generate_phone(),
            telephone: "",
            email: "",
            education: "",
            ecomonic: "",
            relationship: "FMT_LAW",
            tax: generate_identity(),
            cif: generate_identity(7),
            uuidRemote: ''
          },
          other: {
            fatca: "",
            career: "",
            income3Month: "",
            note: `- Thông tin của người liên quan theo quyết định pháp luật chưa được kiểm định.
- Chưa liên hệ được theo số điện thoại đã cung cấp.`
          },
          identity: [],
          address: {
            resident: 'R',
            location: '',
            address: [
              {
                type: "TEMP",
                apartment: "60 Lê Đức Thọ",
                province: "79",
                district: "764",
                ward: "26869",
                primaryFlag: true,
                uuid: generateUUID(),
                uuidRemote: ''
              }
            ]
          }
        }
      ]
    },
    contact: {
      active: 0,
      info: [
        {
          uuidRemote: '',
          uuid: generateUUID(),
          declare: [],
          basic: {
            fullname: "BÙI XUÂN THỊNH",
            customerType: "",
            birthday: null,
            placeOfBirth: "Việt Nam",
            gender: "",
            national: "VN",
            marriageStatus: "",
            ownerProperty: "",
            under18: 0,
            over18: 0,
            mobile: generate_phone(),
            telephone: "",
            email: "thinhbx@gmail.com",
            education: "",
            ecomonic: "",
            relationship: "SBILING",
            tax: "",
            cif: "",
            uuidRemote: ''
          },
          other: {
            fatca: "",
            career: "",
            income3Month: "",
            note: ''
          },
          identity: [],
          address: {
            resident: 'R',
            location: '',
            address: [
              {
                type: "TEMP",
                apartment: "60 Nguyễn Văn Quá",
                province: "79",
                district: "761",
                ward: "26782",
                primaryFlag: true,
                uuid: generateUUID(),
                uuidRemote: ''
              }
            ]
          }
        }
      ]
    }
  }
}