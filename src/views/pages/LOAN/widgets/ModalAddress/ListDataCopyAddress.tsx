import { FunctionComponent, useEffect } from "react";
import { ILOANNormalStorageAddress } from "types/models/loan/normal/storage/Legal";
import { generateUUID, intToRoman } from 'utils';
import Typography from '@mui/material/Typography';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonIcon from '@mui/icons-material/RadioButtonUncheckedOutlined'
import TableSticky from 'views/components/layout/TableSticky';
import useMasterData from "app/hooks/useMasterData";
import Empty from "views/components/layout/Empty";
import useStorage from "../../screens/Normal/Initialize/Legal/useStorage";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";
import { useSelector } from "react-redux";

export interface IListDataAddressProps {
    dataAdress: ILOANNormalStorageAddress[];
    onChanePrimary?(val: string, type: string): void;
}

const ListDataCopyAddress: FunctionComponent<IListDataAddressProps> = (props) => {

    const { dataAdress, onChanePrimary } = props;
    const {Province, District, Ward, AddressType, register } = useMasterData();
      
  useEffect(() => {
    register('addressType')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
    const ruleDisabled = useSelector(getRuleDisbled)

    const MappingListAddress: Record<string, ILOANNormalStorageAddress[]> = {};

    const { allAddress } = useStorage("BORROWER");
    const { AllAddressCopy } = useStorage("BORROWER");

    allAddress.forEach(address => {
        if (!MappingListAddress[address.type]){
            MappingListAddress[address.type] = [ address ];
        }
        else{
            MappingListAddress[address.type].push(address);
        }
    });

    const clickPrimary = (val: string, type: string) => {
        onChanePrimary && onChanePrimary(val, type);
    }

    const emtyLayout = ()  => {
        return(
            <TableRow>
                <TableCell colSpan={7}>
                    <Empty> Không có dữ liệu </Empty>
                </TableCell>
            </TableRow>
        )
    }

    return (
        <Box>
            <Typography variant="h5" component="div" className="text-upper text-primary font-medium text-18 pb-3">
                Danh sách địa chỉ
            </Typography>
            <TableSticky className="mscb-table mscb-table-border">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ textAlign: 'center' }}>STT</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Họ tên</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Số định danh</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Loại địa chỉ</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Địa chỉ</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Chọn sao chép</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        (()=>{
                            if(dataAdress.length === 0 ){
                                return emtyLayout()
                            }
                            else{
                                return Object.keys(MappingListAddress)?.map((type, i) => {
                                    return [
                                        <TableRow key={generateUUID()}>
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <span className="text-upper text-primary font-medium">
                                                    {intToRoman(i + 1)}
                                                </span>
                                            </TableCell>
                                            <TableCell colSpan={6} >
                                                <span className="text-upper text-primary font-medium">
                                                    Địa chỉ {AddressType.find(a => a.code === type)?.name}
                                                </span>
                                            </TableCell>
                                        </TableRow>,
                                            ...MappingListAddress[type].map((address, index) => { 
                                                return <TableRow key={`${i}-${index}`} >
                                                    <TableCell sx={{ textAlign: 'center' }}>
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {address.apartment}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {Province.find(p => p.id === address.province)?.name}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {District[address.province]?.data?.find(d => d.code === address.district)?.name}
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        {Ward[address.district]?.data?.find(w => w.code === address.ward)?.name}
                                                    </TableCell>
                                                    <TableCell sx={{ textAlign: 'center', p: '0!important' }}>
                                                        <Radio
                                                            disabled = {ruleDisabled}
                                                            checkedIcon={<CheckCircleIcon sx={{ fontSize: '16px' }} />}
                                                            icon={<RadioButtonIcon sx={{ fontSize: '16px' }} />}
                                                            checked={address.primaryFlag}
                                                            onClick={() => clickPrimary(address?.uuid ?? "", address?.type ?? "")}
                                                            radioGroup={address.type}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            })
                                    ]
                                })
                            }
                        })()
                    }
                </TableBody>
            </TableSticky>
        </Box>
    )
}

export default ListDataCopyAddress;