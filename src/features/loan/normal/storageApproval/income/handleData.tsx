import _, { get } from "lodash";
import { ILOANNormalConfigState } from "types/models/loan/normal/configs";
import * as IncomeApprovalType from "types/models/loan/normal/storageApproval/SourceIncomeForm";
import { generateUUID } from "utils";

export const calculateWithFrequency = (
  frequency_type: string,
  price: number | null
) => {
  return frequency_type === "FREQ" ? price ?? 0 : (price ?? 0) * 0.3;
};

export const handleDataSalary = (
  decla: IncomeApprovalType.ILOANNormalStorageIncomeDeclareSalary
) => {
  const permanent_income_amount =
    decla?.salary?.data
      ?.filter((it) => it.frequency === "FREQ")
      ?.map((it) => it.incomeFromSalary)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  const occasional_income_amount =
    decla?.salary?.data
      ?.filter((it) => it.frequency === "INFREQ")
      ?.map((it) => it.incomeFromSalary)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  const permanent_income_amount_nvtd =
    decla?.salary?.data
      ?.filter((it) => it.frequency === "FREQ")
      ?.map((it) => it.income_according_to_staff_rating)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  const occasional_income_amount_nvtd =
    decla?.salary?.data
      ?.filter((it) => it.frequency === "INFREQ")
      ?.map((it) => it.income_according_to_staff_rating)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  const total_income_amount = decla?.salary.data?.map((item) => item.income_according_to_staff_rating).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0
  return {
    permanent_income_amount,
    occasional_income_amount,
    permanent_income_amount_nvtd,
    occasional_income_amount_nvtd,
    total_income_amount
  };
};



export const handleDataAssentRent = (  // this function only S2 income
  decla: IncomeApprovalType.ILOANNormalStorageIncomeDeclareSalary
) => {
  let occasional_income_amount = 0;
  let permanent_income_amount = 0;
  let total_income_amount_NVTTD = 0;
  const data = decla.assetRent.data.map((asset) => {
    // calculate RealEstate
    const realEstate_per =
      asset?.assetDetailRealEstate?.data
        ?.filter((real) => real.frequency_type === "FREQ")
        ?.map((item) => item.income_from_real_estate)
        ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;
    const realEstate_occ =
      asset?.assetDetailRealEstate?.data
        ?.filter((real) => real.frequency_type === "INFREQ")
        ?.map((item) => item.income_from_real_estate)
        ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;


    const realEstate_per_nvtd =
      asset?.assetDetailRealEstate?.data
        ?.filter((real) => real.frequency_type === "FREQ")
        ?.map((item) => item.income_according_to_staff_rating)
        ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;
    const realEstate_occ_nvtd =
      asset?.assetDetailRealEstate?.data
        ?.filter((real) => real.frequency_type === "INFREQ")
        ?.map((item) => item.income_according_to_staff_rating)
        ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

    // calculate Transport
    const detailTransport_per =
      asset?.assetDetailTransport?.data
        ?.filter((real) => real.frequency_type === "FREQ")
        ?.map((item) => item.income_from_transport)
        ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;
    const detailTransport_occ =
      asset?.assetDetailTransport?.data
        ?.filter((real) => real.frequency_type === "INFREQ")
        ?.map((item) => item.income_from_transport)
        ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;


    const detailTransport_per_nvtd =
      asset?.assetDetailTransport?.data
        ?.filter((real) => real.frequency_type === "FREQ")
        ?.map((item) => item.income_according_to_staff_rating)
        ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;
    const detailTransport_occ_nvtd =
      asset?.assetDetailTransport?.data
        ?.filter((real) => real.frequency_type === "INFREQ")
        ?.map((item) => item.income_according_to_staff_rating)
        ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

    // calculate Other
    const detailOther_per =
      asset?.assetDetailOther?.data
        ?.filter((real) => real.frequency_type === "FREQ")
        ?.map((item) => item.income_from_other)
        ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;
    const detailOther_occ =
      asset?.assetDetailOther?.data
        ?.filter((real) => real.frequency_type === "INFREQ")
        ?.map((item) => item.income_from_other)
        ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

    const detailOther_per_nvtd =
      asset?.assetDetailOther?.data
        ?.filter((real) => real.frequency_type === "FREQ")
        ?.map((item) => item.income_according_to_staff_rating)
        ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;
    const detailOther_occ_nvtd =
      asset?.assetDetailOther?.data
        ?.filter((real) => real.frequency_type === "INFREQ")
        ?.map((item) => item.income_according_to_staff_rating)
        ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

    occasional_income_amount = occasional_income_amount + realEstate_occ_nvtd + detailTransport_occ_nvtd + detailOther_occ_nvtd;
    permanent_income_amount = permanent_income_amount + realEstate_per_nvtd + detailTransport_per_nvtd + detailOther_per_nvtd;


    const total_realEstate_NVTTD = asset?.assetDetailRealEstate?.data?.map((item) => item.income_according_to_staff_rating).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0
    const total_transport_NVTTD = asset?.assetDetailTransport?.data?.map((item) => item.income_according_to_staff_rating).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0
    const total_other_NVTTD = asset?.assetDetailOther?.data?.map((item) => item.income_according_to_staff_rating).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0
    total_income_amount_NVTTD += total_realEstate_NVTTD + total_transport_NVTTD + total_other_NVTTD;
    return {
      uuid: asset.uuid,
      realEstate: {
        permanent: realEstate_per,
        occasional: realEstate_occ,
        realEstate_per_nvtd: realEstate_per_nvtd,
        realEstate_occ_nvtd: realEstate_occ_nvtd,
        total_realEstate_NVTTD: total_realEstate_NVTTD
      },
      detailTransport: {
        permanent: detailTransport_per,
        occasional: detailTransport_occ,
        detailTransport_occ_nvtd: detailTransport_occ_nvtd,
        detailTransport_per_nvtd: detailTransport_per_nvtd,
        total_transport_NVTTD: total_transport_NVTTD
      },
      detailOther: {
        permanent: detailOther_per,
        occasional: detailOther_occ,
        detailOther_occ_nvtd: detailOther_occ_nvtd,
        detailOther_per_nvtd: detailOther_per_nvtd,
        total_other_NVTTD: total_other_NVTTD
      },
    };
  });
  return {
    permanent_income_amount,
    occasional_income_amount,
    total_income_amount_NVTTD,
    data,
  };
};

export const handleDataBusiness = (
  decla: IncomeApprovalType.ILOANNormalStorageIncomeDeclareSalary
) => {
  const permanent_income_amount =
    decla?.business?.data
      ?.filter((it) => it.frequency === "FREQ")
      ?.map((it) => it.income_business_activities)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  const occasional_income_amount =
    decla?.business?.data
      ?.filter((it) => it.frequency === "INFREQ")
      ?.map((it) => it.income_business_activities)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  const permanent_income_amount_nvtd =
    decla?.business?.data
      ?.filter((it) => it.frequency === "FREQ")
      ?.map((it) => it.income_according_to_staff_rating)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  const occasional_income_amount_nvtd =
    decla?.business?.data
      ?.filter((it) => it.frequency === "INFREQ")
      ?.map((it) => it.income_according_to_staff_rating)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;


  const total_income_amount = decla?.business?.data?.map((item) => item.income_according_to_staff_rating).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0

  return {
    permanent_income_amount,
    occasional_income_amount,
    permanent_income_amount_nvtd,
    occasional_income_amount_nvtd,
    total_income_amount
  };
};

export const handleDataCompany = (
  decla: IncomeApprovalType.ILOANNormalStorageIncomeDeclareSalary
) => {
  const permanent_income_amount =
    decla?.company?.data
      ?.filter((it) => it.frequency === "FREQ")
      ?.map((it) => it.business_income_from_business_activities)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  const occasional_income_amount =
    decla?.company?.data
      ?.filter((it) => it.frequency === "INFREQ")
      ?.map((it) => it.business_income_from_business_activities)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  const permanent_income_amount_nvtd =
    decla?.company?.data
      ?.filter((it) => it.frequency === "FREQ")
      ?.map((it) => it.income_according_to_staff_rating)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  const occasional_income_amount_nvtd =
    decla?.company?.data
      ?.filter((it) => it.frequency === "INFREQ")
      ?.map((it) => it.income_according_to_staff_rating)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  const total_income_amount = decla?.company?.data?.map((item) => item.income_according_to_staff_rating).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0
  return {
    permanent_income_amount,
    occasional_income_amount,
    permanent_income_amount_nvtd,
    occasional_income_amount_nvtd,
    total_income_amount
  };
};

export const handleDataStock = (
  decla: IncomeApprovalType.ILOANNormalStorageIncomeDeclareSalary
) => {
  const permanent_income_amount =
    decla?.stock?.data
      ?.filter((it) => it.frequency === "FREQ")
      ?.map((it) => it.income_from_stock)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  const occasional_income_amount =
    decla?.stock?.data
      ?.filter((it) => it.frequency === "INFREQ")
      ?.map((it) => it.income_from_stock)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  const permanent_income_amount_nvtd =
    decla?.stock?.data
      ?.filter((it) => it.frequency === "FREQ")
      ?.map((it) => it.income_according_to_staff_rating)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  const occasional_income_amount_nvtd =
    decla?.stock?.data
      ?.filter((it) => it.frequency === "INFREQ")
      ?.map((it) => it.income_according_to_staff_rating)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  return {
    permanent_income_amount,
    occasional_income_amount,
    permanent_income_amount_nvtd,
    occasional_income_amount_nvtd
  };
};

export const handleDataDeposit = (
  decla: IncomeApprovalType.ILOANNormalStorageIncomeDeclareSalary
) => {
  const permanent_income_amount =
    decla?.deposit?.data
      ?.filter((it) => it.frequency === "FREQ")
      ?.map((it) => it.income_from_deposits)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  const occasional_income_amount =
    decla?.deposit?.data
      ?.filter((it) => it.frequency === "INFREQ")
      ?.map((it) => it.income_from_deposits)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  const permanent_income_amount_nvtd =
    decla?.deposit?.data
      ?.filter((it) => it.frequency === "FREQ")
      ?.map((it) => it.income_according_to_staff_rating)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  const occasional_income_amount_nvtd =
    decla?.deposit?.data
      ?.filter((it) => it.frequency === "INFREQ")
      ?.map((it) => it.income_according_to_staff_rating)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  return {
    permanent_income_amount,
    occasional_income_amount,
    permanent_income_amount_nvtd,
    occasional_income_amount_nvtd
  };
};

export const handleDataOther = (
  decla: IncomeApprovalType.ILOANNormalStorageIncomeDeclareSalary
) => {
  const permanent_income_amount =
    decla?.other?.data
      ?.filter((it) => it.frequency === "FREQ")
      ?.map((it) => it.income_from_other_source)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  const occasional_income_amount =
    decla?.other?.data
      ?.filter((it) => it.frequency === "INFREQ")
      ?.map((it) => it.income_from_other_source)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  const permanent_income_amount_nvtd =
    decla?.other?.data
      ?.filter((it) => it.frequency === "FREQ")
      ?.map((it) => it.income_according_to_staff_rating)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  const occasional_income_amount_nvtd =
    decla?.other?.data
      ?.filter((it) => it.frequency === "INFREQ")
      ?.map((it) => it.income_according_to_staff_rating)
      ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

  return {
    permanent_income_amount,
    occasional_income_amount,
    permanent_income_amount_nvtd,
    occasional_income_amount_nvtd
  };
};


export const handleTotalNVTTD = (decla: IncomeApprovalType.ILOANNormalStorageIncomeDeclareSalary) => {
  let total_income_amount_all = 0;
  switch (decla.activeIncomeSource as string) {
    case "salary": {
      total_income_amount_all = decla?.salary?.data?.map((item) => item.income_according_to_staff_rating).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;
      break;
    }
    case "asset-rent": {  // ask leader KhoaLA
      const { total_income_amount_NVTTD } = handleDataAssentRent(decla);
      total_income_amount_all = total_income_amount_NVTTD;
      break;

    }
    case "assetRent": { // ask leader KhoaLA 
      const { total_income_amount_NVTTD } = handleDataAssentRent(decla);
      total_income_amount_all = total_income_amount_NVTTD;
      break;

    }
    case "business": {
      total_income_amount_all = decla?.business?.data?.map((item) => item.income_according_to_staff_rating).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

      // const {total_income_amount} = handleDataBusiness(decla);
      break;
    }
    case "company": {
      total_income_amount_all = decla?.company.data?.map((item) => item.income_according_to_staff_rating).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;
      break;
    }
    case "stock": {
      total_income_amount_all = decla?.stock.data?.map((item) => item.income_according_to_staff_rating).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;
      break;

    }
    case "deposit": {
      total_income_amount_all = decla?.deposit.data?.map((item) => item.income_according_to_staff_rating).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;
      break;
    }
    case "pension": {
      total_income_amount_all = decla?.pension.income_according_to_staff_rating ?? 0;
      break;
    }
    case "other": {
      total_income_amount_all = decla?.other.data?.map((item) => item.income_according_to_staff_rating).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;

      break;
    }
    default:
      break;
  }
  return {
    total_income_amount_all,
  }

}
const defaultEmptyUuid = (data: string | null | undefined) => data ? data : generateUUID();
const defaultEmptyString = (data: string | null | undefined) => data ?? "";
const defaultEmptyNumber = (data: number | null | undefined) => data ?? 0;

const generateEmptyDocument = (id: number, config: ILOANNormalConfigState) => {
  const incomeDocument:  IncomeApprovalType.Document[] = []
  const documentType = config.documentType.NGUON_THU_Loan;
  const child_list = documentType?.data?.find(d => d.id === id)?.child_list ?? [];
   child_list?.forEach(cl => {
    incomeDocument.push({
      data_file: [],
      document_id: Number(cl.id),
      document_name: cl.name.toString(),
      document_type: cl.type.toString()
    } )
  })
  return incomeDocument
};

const getDocuments = (documents: IncomeApprovalType.Document[]) => {
  if (!documents) return [] 
  return documents.map((doc) => {
    const result: IncomeApprovalType.Document = {
      document_id: defaultEmptyNumber(doc.document_id),
      document_name: defaultEmptyString(doc.document_name),
      // this  field document_type api not respone
      document_type: "",
      data_file: doc.data_file.map((file: IncomeApprovalType.DataFile, idx) => {
        const result = {
          uuid: file?.uuid ?? '',
          display_order: idx,
          create_at: +(file?.created_at ?? 0) * 1000,
          type: defaultEmptyString(file?.content_type),
          name: defaultEmptyString(file?.name),
          lastModified: file?.updated_by,
          size: null,
        };
        return result;
      }),
    };
    return result;
  });
};

const getAssertRentDocuments = (documents: IncomeApprovalType.Document[],  config : ILOANNormalConfigState) => {
  if (!documents || documents.length === 0) {
    return [...generateEmptyDocument(21, config)]
  }

  return documents.map((doc) => {
    const result: IncomeApprovalType.Document = {
      document_id: defaultEmptyNumber(doc.document_id),
      document_name: defaultEmptyString(doc.document_name),
      // this  field document_type api not respone
      document_type: "",
      data_file: doc.data_file.map((file: IncomeApprovalType.DataFile, idx) => {
        const result = {
          uuid: file?.uuid ?? '',
          display_order: idx,
          create_at: +(file?.created_at ?? 0) * 1000,
          type: defaultEmptyString(file?.content_type),
          name: defaultEmptyString(file?.name),
          lastModified: file?.updated_by,
          size: null,
        };
        return result;
      }),
    };
    return result;
  });
};

const getSalary = (salary: IncomeApprovalType.IIncomeResSalary) => {
  const result: IncomeApprovalType.ILOANNormalStorageIncomeSalaryActive = {
    activeSalary: salary?.salaries[0]?.uuid ?? "-",
    uuid: defaultEmptyUuid(salary?.uuid),
    data: salary?.salaries.map((sal) => {
      const info = sal.company_info;
      const documents = sal.documents ?? [];
      const result: IncomeApprovalType.ILOANNormalStorageIncomeSalary = {
        uuid: sal.uuid,
        name: sal.name,
        areaActivity: defaultEmptyString(info.business_group),
        career: defaultEmptyString(info.business_field),
        companyCate: defaultEmptyString(info.business_fullname),
        companyName: defaultEmptyString(info.business_name),
        companyType: defaultEmptyString(info.business_type),
        contractType: defaultEmptyString(info.contract_type),
        documents: getDocuments(documents),
        frequency: defaultEmptyString(info.frequency_type),
        incomeFromSalary: defaultEmptyNumber(info.income_from_salary),
        ratioIncome: defaultEmptyNumber(info.income_ratio),
        receivedMethod: defaultEmptyString(info.method_payment),
        salary: defaultEmptyNumber(info.salary),
        startDate: defaultEmptyNumber(info.start_working) * 1000,
        years: defaultEmptyNumber(info.work_experience),
        phone: defaultEmptyString(info.phone),
        startWorking: defaultEmptyNumber(info.start_working),
        tax: defaultEmptyString(info.tax),
        title: defaultEmptyString(info.title),
        description: defaultEmptyString(info.description),
        workExperience: defaultEmptyNumber(info.work_experience),
        income_according_to_staff_rating: defaultEmptyNumber(
          info.income_according_to_staff_rating
        ),
      };
      return result;
    }),
    occasional_income_amount: defaultEmptyNumber(salary?.occasional_income_amount),
    permanent_income_amount: defaultEmptyNumber(salary?.permanent_income_amount),
    total_income_from_salary_source: defaultEmptyNumber(salary?.total_income_from_salary),
    total_income_from_salary_NVTTD: salary?.salaries?.map((item) => item.company_info.income_according_to_staff_rating).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0
  };

  // result.activeSalary = _.get(_.last(result.data), "uuid", "");
  // let uuid = '';
  // if(result.data.length > 0){
  //   const last =  result.data[result.data.length -1];
  //   if(last){
  //     uuid = last.uuid;
  //   }
  // }
  // result.activeSalary = uuid;

  return result;
};

const getAssetRent = (assent_Rent: IncomeApprovalType.IIncomeResAssetRent,config: ILOANNormalConfigState) => {
  const total_realEstate_NVTTD = (assent_Rent?.rental_properties ?? []).map((assetRent) => (assetRent?.rental_property_info?.real_estates ?? [])?.map((item) => item?.real_estate_info?.income_according_to_staff_rating ?? 0));
  const total_Tranport_NVTTD = (assent_Rent?.rental_properties ?? []).map((assetRent) => (assetRent?.rental_property_info?.asset_transportations ?? [])?.map((item) => item?.transportation_info?.income_according_to_staff_rating ?? 0));
  const total_Other_NVTTD = (assent_Rent?.rental_properties ?? []).map((assetRent) => (assetRent?.rental_property_info?.other_assets ?? [])?.map((item) => item?.other_assets_info?.income_according_to_staff_rating ?? 0));
  const total_income_NVTTD = total_realEstate_NVTTD?.concat(total_Tranport_NVTTD, total_Other_NVTTD);
  const total_NVTTD = total_income_NVTTD?.flatMap((x) => x).reduce((a, b) => (a ?? 0) + (b ?? 0), 0);

  const result: IncomeApprovalType.ILOANNormalStorageIncomeAssetRentActive = {
    activeAssetRent: assent_Rent?.rental_properties[0]?.uuid ?? "-",
    uuid: defaultEmptyUuid(assent_Rent?.uuid),
    occasional_income_amount: defaultEmptyNumber(
      assent_Rent?.occasional_income_amount
    ),
    permanent_income_amount: defaultEmptyNumber(
      assent_Rent?.permanent_income_amount
    ),
    total_income_from_property_rental: defaultEmptyNumber(
      assent_Rent?.total_income_from_property_rental
    ),
    total_income_from_assentRent_NVTTD: total_NVTTD ?? 0,
    data: (assent_Rent?.rental_properties ?? [])?.map((rental) => {
      const info = rental?.rental_property_info;
      const totalAmount =
        defaultEmptyNumber(info?.total_income_from_other_assets) +
        defaultEmptyNumber(info?.total_income_from_rental_real_estate) +
        defaultEmptyNumber(info?.total_income_from_rental_vehicles);

      // case real
      const calculateIncomePerOcc = (
        key_type: "real_estates" | "asset_transportations" | "other_assets"
      ) => {
        let key_info:
          | ""
          | "real_estate_info"
          | "transportation_info"
          | "other_assets_info" = "";
        let key_value:
          | ""
          | "income_from_real_estate"
          | "income_from_rental_vehicles"
          | "income_from_other_assets" = "";
        switch (key_type) {
          case "real_estates": {
            key_info = "real_estate_info";
            key_value = "income_from_real_estate";
            break;
          }
          case "asset_transportations": {
            key_info = "transportation_info";
            key_value = "income_from_rental_vehicles";
            break;
          }
          case "other_assets": {
            key_info = "other_assets_info";
            key_value = "income_from_other_assets";
            break;
          }
        }
        const per =
          info[key_type]
            ?.filter(
              (item) => _.get(item, [key_info, "frequency_type"], "") === "FREQ"
            )
            ?.map((item2) => _.get(item2, [key_info, key_value], 0))
            ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;
        const occ =
          info[key_type]
            ?.filter(
              (item) =>
                _.get(item, [key_info, "frequency_type"], "") === "INFREQ"
            )
            ?.map((item2) => _.get(item2, [key_info, key_value], 0))
            ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;
        return { per, occ };
      };
      const realPerOcc = calculateIncomePerOcc("real_estates");
      const assetDetailRealEstate: IncomeApprovalType.ILOANNormalStorageIncomeAssetRentDetailRealEstateActive =
      {
        activeRealEstate: get(info, ["real_estates", '0', 'uuid'], '-'),
        data: _.get(info, "real_estates", [])?.map(
          (real: IncomeApprovalType.BusinessHouseholdElement) => {
            const info = real.real_estate_info;
            const result: IncomeApprovalType.ILOANNormalStorageIncomeAssetRentDetailRealEstate =
            {
              uuid: defaultEmptyUuid(real.uuid),
              location: defaultEmptyString(info?.address),
              province: defaultEmptyString(info?.province_id),
              district: defaultEmptyString(info?.district_id),
              ward: defaultEmptyString(info?.ward_id),
              owned_status: defaultEmptyString(info?.owned_status),
              description: defaultEmptyString(info?.note),
              frequency_type: defaultEmptyString(info?.frequency_type),
              income_ratio: defaultEmptyNumber(info?.income_ratio),
              price: defaultEmptyNumber(info?.price),
              income_from_real_estate: defaultEmptyNumber(
                info?.income_from_real_estate
              ),
              income_according_to_staff_rating: defaultEmptyNumber(
                info?.income_according_to_staff_rating
              ),
              documents: getAssertRentDocuments(real?.documents, config ),
            };
            return result;
          }
        ),
        occasional_income_from_rental_real_estate: defaultEmptyNumber(
          realPerOcc.occ
        ),
        permanent_income_from_rental_real_estate: defaultEmptyNumber(
          realPerOcc.per
        ),
        total_income_from_rental_real_estate: defaultEmptyNumber(
          info.total_income_from_rental_real_estate
        ),
      };
      // if (assetDetailRealEstate?.data?.length > 0) {
      //   assetDetailRealEstate.activeRealEstate =
      //     assetDetailRealEstate?.data[0]?.uuid ?? "";
      // }

      // case trans
      const transPerOcc = calculateIncomePerOcc("asset_transportations");
      const assetDetailTransport: IncomeApprovalType.ILOANNormalStorageIncomeAssetRentDetailTransportActive =
      {
        activeTransport: get(info, ["asset_transportations", '0', 'uuid'], '-'),
        data: _.get(info, "asset_transportations", []).map(
          (trans: IncomeApprovalType.BusinessHouseholdElement) => {
            const result: IncomeApprovalType.ILOANNormalStorageIncomeAssetRentDetailTransport =
            {
              uuid: defaultEmptyUuid(trans.uuid),
              registrationPlate: defaultEmptyString(
                trans?.transportation_info?.license_number
              ),
              owned_status: defaultEmptyString(
                trans?.transportation_info?.owned_status
              ),
              frequency_type: defaultEmptyString(
                trans?.transportation_info?.frequency_type
              ),
              income_ratio: defaultEmptyNumber(
                trans?.transportation_info?.income_ratio
              ),
              price: defaultEmptyNumber(trans?.transportation_info?.price),
              income_from_transport: defaultEmptyNumber(
                trans?.transportation_info?.income_from_rental_vehicles
              ),
              income_according_to_staff_rating: defaultEmptyNumber(
                trans?.transportation_info?.income_according_to_staff_rating
              ),
              documents: getAssertRentDocuments(trans?.documents, config ),
            };
            return result;
          }
        ),
        occasional_income_from_transport: defaultEmptyNumber(transPerOcc.occ),
        permanent_income_from_transport: defaultEmptyNumber(transPerOcc.per),
        total_income_from_transport: defaultEmptyNumber(
          info?.total_income_from_rental_vehicles
        ),
      };

      // if (assetDetailTransport?.data?.length > 0) {
      //   assetDetailTransport.activeTransport =
      //     assetDetailTransport.data[0]?.uuid ?? "";
      // }

      // case other
      const otherPerOcc = calculateIncomePerOcc("other_assets");
      const assetDetailOther: IncomeApprovalType.ILOANNormalStorageIncomeAssetRentDetailOtherActive =
      {
        activeOther: get(info, ["other_assets", '0', 'uuid'], '-'),
        data: _.get(info, "other_assets", []).map(
          (other: IncomeApprovalType.BusinessHouseholdElement) => {
            const result: IncomeApprovalType.ILOANNormalStorageIncomeAssetRentDetailOther =
            {
              uuid: defaultEmptyUuid(other?.uuid),
              idAssetRent: defaultEmptyString(
                other?.other_assets_info?.license_number
              ),
              owned_status: defaultEmptyString(
                other?.other_assets_info?.owned_status
              ),
              frequency_type: defaultEmptyString(
                other?.other_assets_info?.frequency_type
              ),
              income_ratio: defaultEmptyNumber(
                other?.other_assets_info?.income_ratio
              ),
              price: defaultEmptyNumber(other?.other_assets_info?.price),
              income_from_other: defaultEmptyNumber(
                other?.other_assets_info?.income_from_other_assets
              ),
              income_according_to_staff_rating: defaultEmptyNumber(
                other?.other_assets_info?.income_according_to_staff_rating
              ),
              documents: getAssertRentDocuments(other?.documents, config ),
            };
            return result;
          }
        ),
        occasional_income_from_other: defaultEmptyNumber(otherPerOcc.occ),
        permanent_income_from_other: defaultEmptyNumber(otherPerOcc.per),
        total_income_from_other: defaultEmptyNumber(
          info?.total_income_from_other_assets
        ),
      };
      // if (assetDetailOther?.data?.length > 0) {
      //   assetDetailOther.activeOther = assetDetailOther.data[0]?.uuid ?? "";
      // }

      const result: IncomeApprovalType.ILOANNormalStorageIncomeAssetRent = {
        uuid: defaultEmptyUuid(rental?.uuid),
        assetType: defaultEmptyString(info.asset_type),
        totalAmount,
        assetDetailOther,
        assetDetailRealEstate,
        assetDetailTransport,
      };
      return result;
    }) ?? [],
  };
  // result.activeAssetRent = _.get(_.last(result.data), "uuid", "");
  return result;
};

const getBusiness = (business: IncomeApprovalType.IncomeBusinessHousehold) => {
  const result: IncomeApprovalType.ILOANNormalStorageIncomeBusinessActive = {
    activeBusiness: get(business, ["business_households", '0', 'uuid'], '-'),
    uuid: defaultEmptyUuid(business?.uuid),
    total_income_from_business_activities: defaultEmptyNumber(
      business?.total_income_from_business_activities
    ),
    permanent_income_amount: defaultEmptyNumber(
      business?.permanent_income_amount
    ),
    occasional_income_amount: defaultEmptyNumber(
      business?.occasional_income_amount
    ),
    // total_income_from_business_NVTTD: 0,
    // salary?.salaries?.map((item) => item.company_info.income_according_to_staff_rating).reduce((a, b) => (a?? 0 ) + (b ?? 0), 0) ?? 0
    total_income_from_business_NVTTD: (business?.business_households ?? []).map((item) => item.business_household_info?.income_according_to_staff_rating).reduce((prev, current) => (prev ?? 0) + (current ?? 0), 0) ?? 0,
    data: _.get(business, "business_households", []).map(
      (buss: IncomeApprovalType.BusinessHouseholdElement, idx) => {
        return {
          uuid: defaultEmptyUuid(buss?.uuid),
          representative: defaultEmptyString(
            buss?.business_household_info?.business_household_type
          ),
          name: defaultEmptyString(
            buss?.business_household_info?.business_name
          ),
          workingTime: defaultEmptyNumber(
            buss?.business_household_info?.business_working_time
          ),
          frequency: defaultEmptyString(
            buss?.business_household_info?.frequency_type
          ),
          ratio: defaultEmptyNumber(
            buss?.business_household_info?.income_ratio
          ),
          turnover: defaultEmptyNumber(
            buss?.business_household_info?.gross_revenue
          ),
          cost: defaultEmptyNumber(buss?.business_household_info?.cost),
          profit: defaultEmptyNumber(buss?.business_household_info?.profit),
          income_business_activities: defaultEmptyNumber(
            buss?.business_household_info
              ?.income_from_household_business_activities
          ),
          income_according_to_staff_rating: defaultEmptyNumber(buss?.business_household_info?.income_according_to_staff_rating),

          documents: getDocuments(buss?.documents),
        };
      }
    ),
  };
  // result.activeBusiness = _.get(_.last(result.data), "uuid", "");
  return result;
};

const getCompany = (company: IncomeApprovalType.Companies) => {
  const result: IncomeApprovalType.ILOANNormalStorageIncomeCompanyActive = {
    activeCompany: get(company, ["companies", '0', 'uuid'], '-'),
    uuid: defaultEmptyUuid(company?.uuid),
    occasional_income_amount: defaultEmptyNumber(
      company?.occasional_income_amount
    ),
    permanent_income_amount: defaultEmptyNumber(
      company?.permanent_income_amount
    ),
    total_income_from_company: defaultEmptyNumber(
      company?.total_income_from_company
    ),
    total_income_from_company_NVTTD: (company?.companies ?? [])?.map((item) => item.company_info?.income_according_to_staff_rating).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0,
    data: _.get(company, "companies", []).map(
      (co: IncomeApprovalType.BusinessHouseholdElement, idx) => {
        return {
          uuid: defaultEmptyUuid(co?.uuid),
          type: defaultEmptyString(co?.company_info?.business_type_id),
          name: defaultEmptyString(co?.company_info?.business_name),
          tax: defaultEmptyString(co?.company_info?.business_tax),
          phone: defaultEmptyString(co?.company_info?.business_phone),
          licenseDate:
            defaultEmptyNumber(co?.company_info?.business_license_date) * 1000,
          profit: defaultEmptyNumber(co?.company_info?.profit),
          frequency: defaultEmptyString(co?.company_info?.frequency_type),
          income_ratio: defaultEmptyNumber(co?.company_info?.income_ratio),
          business_income_from_business_activities: defaultEmptyNumber(
            co?.company_info?.business_income_from_business_activities
          ),
          income_according_to_staff_rating: defaultEmptyNumber(
            co?.company_info?.income_according_to_staff_rating
          ),
          documents: getDocuments(co?.documents),
        };
      }
    ),
  };
  // result.activeCompany = _.get(_.last(result.data), "uuid", "");
  return result;
};

const getDeposit = (deposit: IncomeApprovalType.Deposit) => {
  const result: IncomeApprovalType.ILOANNormalStorageIncomeDepositActive = {
    activeDeposit: get(deposit, ["deposits", '0', 'uuid'], '-'),
    uuid: defaultEmptyUuid(deposit?.uuid),
    occasional_income_amount: defaultEmptyNumber(
      deposit?.occasional_income_amount
    ),
    permanent_income_amount: defaultEmptyNumber(
      deposit?.permanent_income_amount
    ),
    total_income_from_deposits: defaultEmptyNumber(
      deposit?.total_income_from_deposits
    ),
    total_income_from_deposits_NVTTD: (deposit?.deposits ?? [])?.map((item) => item.deposit_info?.income_according_to_staff_rating).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0,

    data: _.get(deposit, "deposits", []).map(
      (de: IncomeApprovalType.BusinessHouseholdElement, idx) => {
        const result: IncomeApprovalType.ILOANNormalStorageIncomeDeposit = {
          uuid: defaultEmptyUuid(de?.uuid),
          unit: "",
          publish_unit_id: defaultEmptyString(
            de?.deposit_info?.publish_unit_id + ""
          ),
          accept_blocked_account: defaultEmptyString(
            de?.deposit_info?.accept_blocked_account
          ),
          account: defaultEmptyString(de?.deposit_info?.account_number),
          currency: defaultEmptyString(de?.deposit_info?.currency_type_id),
          balance: defaultEmptyNumber(de?.deposit_info?.balance),
          blocked: defaultEmptyString(de?.deposit_info?.accept_blocked_account),
          term: defaultEmptyNumber(de?.deposit_info?.term),
          profit: defaultEmptyNumber(de?.deposit_info?.profit),
          frequency: defaultEmptyString(de?.deposit_info?.frequency_type),
          income_ratio: defaultEmptyNumber(de?.deposit_info?.income_ratio),
          income_from_deposits: defaultEmptyNumber(
            de?.deposit_info?.income_from_deposits
          ),
          income_according_to_staff_rating: defaultEmptyNumber(
            de?.deposit_info?.income_according_to_staff_rating
          ),
          description: defaultEmptyString(de?.deposit_info?.description),
          documents: getDocuments(de?.documents),
          update_at: de?.deposit_info?.update_at ?? null,
          update_by: de?.deposit_info?.update_by ?? null,
          full_name: de?.deposit_info?.full_name ?? null,
        };
        return result;
      }
    ),
  };
  // result.activeDeposit = _.get(_.last(result.data), "uuid", "");
  return result;
};

const getStock = (stock: IncomeApprovalType.Stocks) => {
  const result: IncomeApprovalType.ILOANNormalStorageIncomeStockActive = {
    activeStock: get(stock, ["source_income_stocks", '0', 'uuid'], '-'),
    uuid: defaultEmptyUuid(stock?.uuid),
    occasional_income_amount: defaultEmptyNumber(
      stock?.occasional_income_amount
    ),
    permanent_income_amount: defaultEmptyNumber(stock?.permanent_income_amount),
    total_income_from_stocks: defaultEmptyNumber(
      stock?.total_income_from_stocks
    ),
    total_income_from_stocks_NVTTD: (stock?.source_income_stocks ?? [])?.map((item) => item.stock_info?.income_according_to_staff_rating).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0,
    data: _.get(stock, "source_income_stocks", []).map(
      (sto: IncomeApprovalType.BusinessHouseholdElement, idx) => {
        const result: IncomeApprovalType.ILOANNormalStorageIncomeStock = {
          uuid: defaultEmptyUuid(sto?.uuid),
          year: defaultEmptyNumber(sto?.stock_info?.year),
          count: defaultEmptyNumber(sto?.stock_info?.count),
          frequency: defaultEmptyString(sto?.stock_info?.frequency_type),
          ratio: defaultEmptyNumber(sto?.stock_info?.income_ratio),
          profit: defaultEmptyNumber(sto?.stock_info?.profit),
          income_from_stock: defaultEmptyNumber(
            sto?.stock_info?.income_from_stock
          ),
          income_according_to_staff_rating: defaultEmptyNumber(
            sto?.stock_info?.income_according_to_staff_rating
          ),
          description: defaultEmptyString(sto?.stock_info?.description),
          description_source: defaultEmptyString(
            sto?.stock_info?.description_source
          ),
          documents: getDocuments(sto?.documents),
          update_at: sto?.stock_info?.update_at ?? null,
          update_by: sto?.stock_info?.update_by ?? null,
          full_name: sto?.stock_info?.full_name ?? null,
        };
        return result;
      }
    ),
  };
  // result.activeStock = _.get(_.last(result.data), "uuid", "");
  return result;
};

const getPention = (pention: IncomeApprovalType.Pension) => {
  const result: IncomeApprovalType.ILOANNormalStorageIncomePension = {
    uuid: defaultEmptyUuid(pention?.uuid),
    license: defaultEmptyString(pention?.pension_info?.license_number),
    startDate: defaultEmptyNumber(pention?.pension_info?.start_date) * 1000,
    insurance: defaultEmptyString(pention?.pension_info?.insurance_number),
    salary: defaultEmptyNumber(pention?.pension_info?.salary),
    frequency: defaultEmptyString(pention?.pension_info?.frequency_type),
    income_ratio: defaultEmptyNumber(pention?.pension_info?.income_ratio),
    income_from_pension: defaultEmptyNumber(pention?.total_income_from_pension),
    income_from_occ: defaultEmptyNumber(pention?.occasional_income_amount),
    income_from_per: defaultEmptyNumber(pention?.permanent_income_amount),
    income_according_to_staff_rating: defaultEmptyNumber(
      pention?.pension_info?.income_according_to_staff_rating
    ),
    documents: getDocuments(pention?.documents),
  };
  return result;
};

const getOther = (other: IncomeApprovalType.OtherIncome) => {
  const result: IncomeApprovalType.ILOANNormalStorageIncomeOtherActive = {
    activeOther: get(other, ["income_other", '0', 'uuid'], '-'),
    uuid: defaultEmptyUuid(other?.uuid),
    occasional_income_amount: defaultEmptyNumber(
      other?.occasional_income_amount
    ),
    permanent_income_amount: defaultEmptyNumber(other?.permanent_income_amount),
    total_income_from_other_sources: defaultEmptyNumber(
      other?.total_income_from_other_sources
    ),
    total_income_from_others_NVTTD: (other?.income_other ?? [])?.map((item) => item?.income_info?.income_according_to_staff_rating).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0,
    data: _.get(other, "income_other", []).map(
      (other: IncomeApprovalType.BusinessHouseholdElement) => {
        const result: IncomeApprovalType.ILOANNormalStorageIncomeOther = {
          uuid: defaultEmptyUuid(other?.uuid),
          frequencyYear: defaultEmptyNumber(other?.income_info?.frequency_year),
          paymentMethod: defaultEmptyString(other?.income_info?.payment_method),
          profit: defaultEmptyNumber(other?.income_info?.profit),
          note: defaultEmptyString(other?.income_info?.note),
          frequency: defaultEmptyString(other?.income_info?.frequency_type),
          income_ratio: defaultEmptyNumber(other?.income_info?.income_ratio),
          income_from_other_source: defaultEmptyNumber(
            other?.income_info?.income_from_other_source
          ),
          income_according_to_staff_rating: defaultEmptyNumber(
            other?.income_info?.income_according_to_staff_rating
          ),
          description: defaultEmptyString(other.income_info?.description),
          documents: getDocuments(other?.documents),
          update_at: other?.income_info?.update_at ?? null,
          update_by: other?.income_info?.update_by ?? null,
          full_name: other?.income_info?.full_name ?? null,
        };
        return result;
      }
    ),
  };
  // result.activeOther = _.get(_.last(result.data), "uuid", "");
  return result;
};

export const getPersonIncomeDataData = (
  data: IncomeApprovalType.IncomeDeclareRes,
  config: ILOANNormalConfigState
) => {
  const result: IncomeApprovalType.ILOANNormalStorageIncomeDeclareSalary = {
    salary: getSalary(data?.income?.salaries),
    assetRent: getAssetRent(data?.income?.asset_rent, config),
    business: getBusiness(data?.income?.business_household),
    company: getCompany(data?.income?.companies),
    deposit: getDeposit(data?.income?.deposit),
    stock: getStock(data?.income?.stocks),
    pension: getPention(data?.income?.pension),
    other: getOther(data?.income?.other_income),
  };
  
  return result;
};

export const getTotalIncomeNVTTD = (data: IncomeApprovalType.IncomeDeclareRes, config: ILOANNormalConfigState) => {
  let total = 0;
  const { total_income_from_salary_NVTTD } = getSalary(data?.income?.salaries);
  const { total_income_from_assentRent_NVTTD } = getAssetRent(data?.income?.asset_rent, config);
  const { total_income_from_business_NVTTD } = getBusiness(data?.income?.business_household);
  const { total_income_from_company_NVTTD } = getCompany(data?.income?.companies);
  const { total_income_from_deposits_NVTTD } = getDeposit(data?.income?.deposit);
  const { total_income_from_stocks_NVTTD } = getStock(data?.income?.stocks);
  const { income_according_to_staff_rating } = getPention(data?.income?.pension);
  const { total_income_from_others_NVTTD } = getOther(data?.income?.other_income);

  total = (total_income_from_salary_NVTTD ?? 0) + (total_income_from_assentRent_NVTTD ?? 0)
    + (total_income_from_business_NVTTD ?? 0) + (total_income_from_company_NVTTD ?? 0)
    + (total_income_from_stocks_NVTTD ?? 0) + (total_income_from_deposits_NVTTD ?? 0)
    + (income_according_to_staff_rating ?? 0) + (total_income_from_others_NVTTD ?? 0);
  return total;
}
/**
 * get empty balance income
 */
const generateEmptyBalanceIncomeStepData = () => ({
  value_by_business_household: 0,
  value_by_staff: 0,
  income_info: [],
});

export const getDataDeclareTotalIncome =
  (): IncomeApprovalType.TotalIncomeBalanceDeclare => ({
    name: "",
    customer_uuid: "",
    total_income_business: 0,
    total_income_staff: 0,
    income_salaries: generateEmptyBalanceIncomeStepData(),
    income_business_household: generateEmptyBalanceIncomeStepData(),
    income_companies: generateEmptyBalanceIncomeStepData(),
    income_asset_rent: generateEmptyBalanceIncomeStepData(),
    income_stock: generateEmptyBalanceIncomeStepData(),
    income_deposit: generateEmptyBalanceIncomeStepData(),
    income_pension: generateEmptyBalanceIncomeStepData(),
    income_other: generateEmptyBalanceIncomeStepData(),
  });
