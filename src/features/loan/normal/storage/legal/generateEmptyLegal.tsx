
export const generateLoanLegalUser = () =>({
    uuidActiveLocal: "",
    declare:[],
    basic: {
        person_uuid:"",
        fullname: "",
        customerType: "",
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
        cif: "",
    },
    other: {
        fatca: "",
        career: "",
        income3Month: "",
        note: "",
    }, 
    identity: [],
    address: {
        resident: "",
        location: "",
        address: [],
    },
    uuidActiveFile:"",
    document_info_list:[]
  })

  export const generateEmptyFile = () =>({
    uuidActiveFile:"",
    document_id:"",  
    document_name:"",
    child_files:[]
  })

  export const generateEmptyChildFile = () =>({
    file_id: 0,
    uuid: "",
    name: "",
    display_order: 0,
    description: "",
    content_type: "",
    created_by: "",
    created_by_name: "",
    updated_at: null,
    updated_by: "",
    updated_by_name: "",
    created_at: null,
    file_upload: ""
  })