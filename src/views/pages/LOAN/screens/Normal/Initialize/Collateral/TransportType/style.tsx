
import { makeStyles } from '@mui/styles';
const checboxListStyles = makeStyles(() => ({
    root:{
        "& .MuiBox-root":{

            "& label:first-child":{
                display:"block",
                marginLeft:"0"
            },
            "& label":{
                marginLeft:"20px"
            }
        }
    }
}))
export default checboxListStyles