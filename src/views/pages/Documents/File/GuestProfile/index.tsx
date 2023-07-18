import { Avatar, Box, Grid, Skeleton, Typography } from "@mui/material";
import { getProfileDocumentCustomerInfo } from "features/loan/normal/storage/ProfileDocument/action";
import { getLOANNormalProfileDocumentCustomerInfo } from "features/loan/normal/storage/ProfileDocument/selectors";
import { FC, Fragment, useEffect } from "react";
import { MdEmail, MdPhone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { FileDetailParams } from "../../FileDetail";
import { root } from "./style";

const GuestProfile: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams() as FileDetailParams

    const customerInfo = useSelector(getLOANNormalProfileDocumentCustomerInfo)

    useEffect(() => {
        if (id !== "") {
            dispatch(getProfileDocumentCustomerInfo(id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleClickPrev = () => {
        navigate(`/loan/normal/init/${customerInfo?.los_uuid ?? '-'}/product`);
    }

    const customerInfoFullName = () =>{
        if(!customerInfo.full_name){
            return  <Skeleton  width="100%" >
                 <Typography>.</Typography>
            </Skeleton>                                 
        }else{
            return <Fragment>{customerInfo.full_name ? customerInfo.full_name : "-"}</Fragment>
        }
    } 

    const customerInfoEmail = () =>{
        if(!customerInfo.email){
            return  <Skeleton  width="100%" >
                        <Typography>.</Typography>
                    </Skeleton>  
        }else{
            return <Fragment>
                <MdEmail className="icon color-primary" size={14} />
                <span className="emailAddress">
                    {customerInfo.email ? customerInfo.email : "-"}
                </span>
            </Fragment>
        }
    }

    const customerInfoTelephone = () =>{
        if(!customerInfo.telephone){
            return <Skeleton  width="100%" >
                        <Typography>.</Typography>
                    </Skeleton>  
        }else{
            return <Fragment>
                        <MdPhone className="icon color-primary" size={14} />
                        <span className="telephone">
                            {customerInfo.telephone ? customerInfo.telephone : "-"}
                        </span>
                    </Fragment>
        }
    }
   
    return (
        <div onClick={() => { handleClickPrev() }} style={{ cursor: 'pointer' }}>
            <Grid container spacing={3} sx={root}>
                <Grid item xs={12} sm={12} lg={3} className="Avatar_GuestProfile_container">
                    <Avatar
                        alt="avatar"
                        className="Avatar_GuestProfile"
                    />
                </Grid>
                <Grid item xs={12} sm={12} lg={9} className="use_GuestProfile">
                    <Grid container >
                        <Grid item xs={12} className="text-16 text-danger font-medium">
                            {
                                customerInfoFullName()
                            }
                        </Grid>
                    </Grid>
                    <Box className="">
                        {
                            customerInfoEmail()
                        }                        
                    </Box>
                    <Box className="">
                        {
                            customerInfoTelephone()
                        }
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default GuestProfile;
