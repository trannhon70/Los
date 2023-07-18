import * as IncomeType from "types/models/loan/normal/storage/Income";
import _ from "lodash";
export const calculateWithFrequency = (frequency_type: string,price:number | null)=>{
    return frequency_type ==='FREQ'?(price??0):(price??0)*0.3;
}

export const handleDataSalary= (decla:IncomeType.ILOANNormalStorageIncomeDeclareSalary) => {
    const permanent_income_amount = decla?.salary
        ?.data                
        ?.filter(it=>it.frequency === "FREQ")
        ?.map(it=>it.incomeFromSalary)
        ?.reduce((a,b) => (a??0)+(b??0), 0) ?? 0;
    
    const occasional_income_amount = decla?.salary
        ?.data                
        ?.filter(it=>it.frequency === "INFREQ")
        ?.map(it=>it.incomeFromSalary)
        ?.reduce((a,b) => (a??0)+(b??0), 0) ?? 0;
    
        return ({
            permanent_income_amount,
            occasional_income_amount
        })
}

export const handleDataAssentRent=(decla:IncomeType.ILOANNormalStorageIncomeDeclareSalary) =>{
    let occasional_income_amount = 0;
    let permanent_income_amount = 0;
    const data = decla.assetRent.data.map((asset) => {
      // calculate RealEstate
      const realEstate_per = asset?.assetDetailRealEstate?.data
      ?.filter(real=>real.frequency_type === "FREQ")
      ?.map(item=>item.income_from_real_estate)
      ?.reduce((a,b)=>(a??0)+(b??0),0)??0;
      const realEstate_occ = asset?.assetDetailRealEstate?.data
      ?.filter(real=>real.frequency_type === "INFREQ")
      ?.map(item=>item.income_from_real_estate)
      ?.reduce((a,b)=>(a??0)+(b??0),0)??0;
      
  
      // calculate Transport
      const detailTransport_per = asset?.assetDetailTransport?.data
      ?.filter(real=>real.frequency_type === "FREQ")
      ?.map(item=>item.income_from_transport)
      ?.reduce((a,b)=>(a??0)+(b??0),0)??0;
      const detailTransport_occ = asset?.assetDetailTransport?.data
      ?.filter(real=>real.frequency_type === "INFREQ")
      ?.map(item=>item.income_from_transport)
      ?.reduce((a,b)=>(a??0)+(b??0),0)??0;
  
      // calculate Other
      const detailOther_per = asset?.assetDetailOther?.data
      ?.filter(real=>real.frequency_type === "FREQ")
      ?.map(item=>item.income_from_other)
      ?.reduce((a,b)=>(a??0)+(b??0),0)??0;
      const detailOther_occ = asset?.assetDetailOther?.data
      ?.filter(real=>real.frequency_type === "INFREQ")
      ?.map(item=>item.income_from_other)
      ?.reduce((a,b)=>(a??0)+(b??0),0)??0;
  
      occasional_income_amount = occasional_income_amount + realEstate_occ + detailTransport_occ + detailOther_occ;
      permanent_income_amount =permanent_income_amount + realEstate_per + detailTransport_per + detailOther_per;
        return ({
            uuid:asset.uuid,
            realEstate:{ 
                permanent:realEstate_per,
                occasional:realEstate_occ,
            },
            detailTransport:{
                permanent:detailTransport_per,
                occasional:detailTransport_occ,
            },
            detailOther:{
                permanent:detailOther_per,
                occasional:detailOther_occ,
            }
        });
    });
    return (
        {
            permanent_income_amount,
            occasional_income_amount,
            data,
        }
    )
}

export const handleDataBusiness = (decla:IncomeType.ILOANNormalStorageIncomeDeclareSalary) => {
    const permanent_income_amount = decla?.business
        ?.data                
        ?.filter(it=>it.frequency === "FREQ")
        ?.map(it=>it.income_business_activities)
        ?.reduce((a,b) => (a??0)+(b??0), 0) ?? 0;
    
    const occasional_income_amount = decla?.business
        ?.data                
        ?.filter(it=>it.frequency === "INFREQ")
        ?.map(it=>it.income_business_activities)
        ?.reduce((a,b) => (a??0)+(b??0), 0) ?? 0;
    
        return ({
            permanent_income_amount,
            occasional_income_amount
        })

}

export const handleDataCompany = (decla:IncomeType.ILOANNormalStorageIncomeDeclareSalary) => {
    const permanent_income_amount = decla?.company
        ?.data                
        ?.filter(it=>it.frequency === "FREQ")
        ?.map(it=>it.business_income_from_business_activities)
        ?.reduce((a,b) => (a??0)+(b??0), 0) ?? 0;
    
    const occasional_income_amount = decla?.company
        ?.data                
        ?.filter(it=>it.frequency === "INFREQ")
        ?.map(it=>it.business_income_from_business_activities)
        ?.reduce((a,b) => (a??0)+(b??0), 0) ?? 0;
    
        return ({
            permanent_income_amount,
            occasional_income_amount
        })
}

export const handleDataStock = (decla:IncomeType.ILOANNormalStorageIncomeDeclareSalary) => {
    const permanent_income_amount = decla?.stock
        ?.data                
        ?.filter(it=>it.frequency === "FREQ")
        ?.map(it=>it.income_from_stock)
        ?.reduce((a,b) => (a??0)+(b??0), 0) ?? 0;
    
    const occasional_income_amount = decla?.stock
        ?.data                
        ?.filter(it=>it.frequency === "INFREQ")
        ?.map(it=>it.income_from_stock)
        ?.reduce((a,b) => (a??0)+(b??0), 0) ?? 0;
    
        return ({
            permanent_income_amount,
            occasional_income_amount
        })
}

export const handleDataDeposit = (decla:IncomeType.ILOANNormalStorageIncomeDeclareSalary) => {
    const permanent_income_amount = decla?.deposit
        ?.data                
        ?.filter(it=>it.frequency === "FREQ")
        ?.map(it=>it.income_from_deposits)
        ?.reduce((a,b) => (a??0)+(b??0), 0) ?? 0;
    
    const occasional_income_amount = decla?.deposit
        ?.data                
        ?.filter(it=>it.frequency === "INFREQ")
        ?.map(it=>it.income_from_deposits)
        ?.reduce((a,b) => (a??0)+(b??0), 0) ?? 0;
    
        return ({
            permanent_income_amount,
            occasional_income_amount
        })
}

export const handleDataOther = (decla:IncomeType.ILOANNormalStorageIncomeDeclareSalary) => {
    const permanent_income_amount = decla?.other
        ?.data                
        ?.filter(it=>it.frequency === "FREQ")
        ?.map(it=>it.income_from_other_source)
        ?.reduce((a,b) => (a??0)+(b??0), 0) ?? 0;
    
    const occasional_income_amount = decla?.other
        ?.data                
        ?.filter(it=>it.frequency === "INFREQ")
        ?.map(it=>it.income_from_other_source)
        ?.reduce((a,b) => (a??0)+(b??0), 0) ?? 0;
    
        return ({
            permanent_income_amount,
            occasional_income_amount
        })
}