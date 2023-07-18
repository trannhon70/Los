import { getLOANApprovalLoanProgramFull } from "features/loan/normal/storageApproval/loan/selectors";
import { FC } from "react";
import { useSelector } from "react-redux";
import Empty from "views/components/layout/Empty";
import TableCredit1 from "./TableCredit1";
import TableCredit2 from "./TableCredit2";
import TableNoCollateral from "./TableNoCollateral";
// import { useNavigate, useParams } from 'react-router';
// import { ILOANURLParams } from 'types/models/loan';
// import useNotify from "app/hooks/useNotify";

const TableLoan: FC = () => {

    const dataTypeTable = useSelector(getLOANApprovalLoanProgramFull);
    // const notify = useNotify();
    // const params = useParams() as ILOANURLParams;
    // const navigate = useNavigate();
    // useEffect(() =>{
    //     if(!dataTypeTable.evaluation_analysis_table){
    //         navigate(`/loan/normal/appraisal-approval/${ params.id }/loan/product`);
    //         notify('Vui lòng chọn loại bảng','warning')
    //     }
    // },[dataTypeTable.evaluation_analysis_table])
    const renderTable = (type: string) => {
        switch (type) {
            case 'OPTION_1':
                return <TableCredit1 />
            case 'OPTION_2':
                return <TableCredit2 />
            case 'OPTION_3':
                return <TableNoCollateral />
            default:
                return <Empty sx={{
                    "& img": {
                        width: "23%"
                    },
                    fontSize: '20px',
                    fontWeight: 300,
                    // fontStyle: 'italic',
                }}>Vui lòng chọn loại bảng</Empty>
        }
    }
    return renderTable(dataTypeTable?.evaluation_analysis_table ?? "")
};

export default TableLoan;
