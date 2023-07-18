
import { makeStyles } from '@mui/styles';
const pdfViewStyle = makeStyles(()=>({
    root:{
        display: 'flex',
        flexDirection: 'column',
        height:"100%",
        "& .rpv-core__viewer":{
            "& >div":{
                "& >div":{
                    '&::-webkit-scrollbar': {
                        width: '5px',
                        height: '5px'
                    },
                    '&::-webkit-scrollbar-track': {
                        borderRadius: '20px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        borderRadius: '20px',
                        backgroundColor: '#d5d5d5',
                    }
                }
            }
        },
       
        
       
    }
}))
export default pdfViewStyle