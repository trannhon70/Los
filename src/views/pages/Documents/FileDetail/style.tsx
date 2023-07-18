
import { makeStyles } from "@mui/styles";

const FileDetailStyle = makeStyles(() => ({
    root:{
        height:"calc(100vh - 124px)",
        // height:'1000px',
        "& .mscb-outside-card-content":{
            height:"calc(100% - 40px)",
            padding:0
        }
    }
}))

export default FileDetailStyle