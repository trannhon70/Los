import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import useMasterData from "app/hooks/useMasterData";
import { FunctionComponent, useEffect } from "react";
import { BsPencil } from 'react-icons/bs';
import { IoTrashOutline } from 'react-icons/io5';
import { ILOANNormalStorageAddress } from "types/models/loan/normal/storage/Legal";
import { generateUUID, intToRoman } from 'utils';
import Empty from "views/components/layout/Empty";
import TableSticky from 'views/components/layout/TableSticky';
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";
import { useSelector } from 'react-redux';


export interface IListDataAddressProps {
    dataAdress: ILOANNormalStorageAddress[];
    onEdit?(val: string): void;
    onDelete?(val: string, type: string): void;
    onChanePrimary?(val: string, type: string): void;
    isCoppy?: boolean;
}

const ListDataAddress: FunctionComponent<IListDataAddressProps> = (props) => {

    const { dataAdress, onEdit, onDelete, onChanePrimary, isCoppy } = props;
    const {Province, District, Ward, AddressType, register } = useMasterData();
      
    useEffect(() => {
        register('addressType')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const ruleDisabled = useSelector(getRuleDisbled)

    const MappingListAddress: Record<string, ILOANNormalStorageAddress[]> = {};
    dataAdress.forEach(address => {
        if (!MappingListAddress[address.type]){
            MappingListAddress[address.type] = [ address ];
        }
        else{
            MappingListAddress[address.type].push(address);
        }
    });

    const onHandleClickEdit = (val: string) => {
        onEdit && onEdit(val);
    }

    const onHandleClickDelete = (val: string, type: string) => {
        onDelete && onDelete(val, type);
    }

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
                        <TableCell sx={{ textAlign: 'center' }}>Địa chỉ</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Tỉnh/TP</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Quận/huyện</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Phường/xã</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>Địa chỉ chính</TableCell>
                        {!isCoppy && <TableCell sx={{ textAlign: 'center' }}>Thao tác</TableCell>}
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
                                            <TableCell colSpan={6}>
                                                <span className="text-upper text-primary font-medium">
                                                    Địa chỉ {AddressType.find(a => a.code === type)?.name}
                                                </span>
                                            </TableCell>
                                        </TableRow>,
                                            ...MappingListAddress[type].map((address, index) => { 
                                                return <TableRow key={`${i}-${index}`}>
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
                                                            disabled={ruleDisabled}
                                                            checkedIcon={<CheckCircleIcon sx={{ fontSize: '16px' }} />}
                                                            icon={<RadioButtonIcon sx={{ fontSize: '16px' }} />}
                                                            checked={address.primaryFlag}
                                                            onClick={() => clickPrimary(address?.uuid ?? "", address?.type ?? "")}
                                                            radioGroup={address.type}
                                                        />
                                                    </TableCell>
                                                    {
                                                        !isCoppy &&
                                                        <TableCell sx={{ textAlign: 'center', p: '0!important' }}>
                                                            <IconButton 
                                                                color="primary" 
                                                                onClick={() => onHandleClickEdit(address?.uuid ?? "")} 
                                                                size="small"
                                                                disabled={isCoppy || ruleDisabled}
                                                            >
                                                                <BsPencil style={{fontSize: '1.3rem'}}/>
                                                            </IconButton>
                                                            <IconButton
                                                                color={address.primaryFlag ? 'secondary' : 'primary'}
                                                                disabled={address.primaryFlag || isCoppy || ruleDisabled}
                                                                onClick={ () => onHandleClickDelete(address?.uuid ?? "", address.type)}
                                                                size="small"
                                                            >
                                                                <IoTrashOutline style={{fontSize: '1.5rem'}}/>
                                                            </IconButton>
                                                        </TableCell>
                                                    }
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

export default ListDataAddress;