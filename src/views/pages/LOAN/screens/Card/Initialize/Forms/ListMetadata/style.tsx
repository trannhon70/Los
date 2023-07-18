import { makeStyles } from "@mui/styles";

const MetaDataList = makeStyles(() => ({
    root: {
        "& .mscb-outside-card-content": {
            'padding': 'unset'
        },
        "& .MuiList-root ":{
            maxHeight:"unset"
        }
    }

}));

export default MetaDataList;