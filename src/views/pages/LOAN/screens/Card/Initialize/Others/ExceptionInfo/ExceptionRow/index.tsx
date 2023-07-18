import {
    useRef,
    useState, forwardRef,
    ForwardRefRenderFunction
} from 'react';
import { IoTrashOutline } from 'react-icons/io5'
import { MdRemoveCircleOutline } from 'react-icons/md';
import { RiAddBoxLine, RiAddCircleLine, RiCloseCircleLine, RiCheckFill } from 'react-icons/ri';
import Input, { InputRef } from "views/components/base/Input";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import clsx from "clsx";
import Collapse from '@mui/material/Collapse';
import Typography from "@mui/material/Typography";
import exceptionRowStyle from "./style";
import ExceptionInfoItem from './ExceptionItem';
import InputAdornment from '@mui/material/InputAdornment';
import Select, { SelectRef } from 'views/components/base/Select';

export interface ExceptionInfoProps {
    stt: number;
    documentException: any;
}

export interface IFormAddIdentitficationRef { }

const ExceptionInfoRow: ForwardRefRenderFunction<IFormAddIdentitficationRef, ExceptionInfoProps> = (props, ref) => {
    const { stt, documentException } = props
    const classes = exceptionRowStyle();
    const exceptionTypeRef = useRef<SelectRef>(null);
    const quantityRef = useRef<InputRef>(null);
    const [expands, setExpands] = useState<boolean>(true)
    const exceptionRowClass = clsx(classes.root, "mscb-exception-info-row");
    const labelAddNew = "Thêm mới";


    const handleOnchangeExceptionType = () => {

    }

    const handleExpands = () => {
        setExpands(!expands);
    }

    const handleAddPolicyDetail = () => {

    }

    const handleDeleteException = () => {

    }
    return (
        <Box component="div" className={`${exceptionRowClass} pt-0`}>
            <Grid container className="mscb-exception-row-grid"sx={{ marginTop:`${ stt === 1 ? '0px': '20px'}`}} >
                <Grid item xl={12} xs={12} >
                    <Grid container>
                        <Grid item xl={6} xs={6} className="mscb-exception-row-left">
                            <Box component="div" className="exception-stt-label">
                                <Typography variant='subtitle2' color='var(--mscb-black)'>
                                    {stt}
                                </Typography>
                            </Box>
                            <Box component="div" className="exception-type-label">
                                <Select
                                    onChange={handleOnchangeExceptionType}
                                    ref={exceptionTypeRef}
                                    disabled={true}
                                    className="exception-legal-select"
                                    options={[]}
                                    value={documentException?.exception_name}
                                />
                                <Box component="div" className="exception-add-new-label">
                                    <Typography variant='body2' color='var(--mscb-primary)'>
                                        {labelAddNew}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box component="div" className="exception-quantity-label">
                                <Input
                                    ref={quantityRef}
                                    type={"number"}
                                    className="exception-quantity-input"
                                    placeholder={'0'}
                                    suffix={
                                        <InputAdornment position="end">
                                            <RiCheckFill
                                                size="18px"
                                                color='#1A9B06'
                                                className="icon-check"
                                                cursor="pointer"
                                            />
                                            <RiCloseCircleLine
                                                size="18px"
                                                color='var(--mscb-danger)'
                                                className="icon-delete"
                                                cursor="pointer"
                                            />
                                        </InputAdornment>
                                    }
                                />
                            </Box>
                        </Grid>
                        <Grid item xl={6} xs={6} className="mscb-exception-row-right justify-end">
                            <Box component="div" className="exception-action-box">
                                <Box component="div" className="icon-add-box" onClick={handleAddPolicyDetail}>
                                    <RiAddBoxLine
                                        size="20px"
                                        color="var(--mscb-primary)"
                                        cursor="pointer"
                                    />
                                </Box>
                                <Box component="div" className="icon-trash-box" onClick={handleDeleteException}>
                                    <IoTrashOutline
                                        size="1rem"
                                        color="var(--mscb-primary)"
                                        cursor="pointer"
                                    />
                                </Box>
                                <Box component="div" className="icon-collapse-box">
                                    {expands ? <MdRemoveCircleOutline
                                        size="20px"
                                        color="var(--mscb-primary)"
                                        cursor="pointer"
                                        onClick={handleExpands}
                                    /> :
                                        <RiAddCircleLine
                                            size="20px"
                                            color="var(--mscb-primary)"
                                            cursor="pointer"
                                            onClick={handleExpands}
                                        />}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xl={12} xs={12}>
                    <Collapse in={expands} >
                        {documentException?.exception_item.map((item: any, index: number) => {
                            return (
                                <ExceptionInfoItem
                                    key={index}
                                    name={`${item.name}`}
                                    exceptionType={item}
                                />
                            )
                        })}

                    </Collapse>
                </Grid>
            </Grid>
        </Box>
    )

}

export default forwardRef(ExceptionInfoRow);
