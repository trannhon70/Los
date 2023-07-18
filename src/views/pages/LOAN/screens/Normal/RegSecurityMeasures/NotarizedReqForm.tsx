import { Box } from "@mui/system"
import { FC } from "react"
import FormsCategory from "views/pages/LOAN/widgets/Forms/Category"
import FormsMetadata from "views/pages/LOAN/widgets/Forms/Metadata"
import FormsPDFViewer from "views/pages/LOAN/widgets/Forms/PDFViewer"

const NotarizedReqForm: FC = () => {
  return <Box className='mt-6'>
    <Box className="flex justify-between">
      <FormsCategory />
      <FormsPDFViewer />
      <FormsMetadata />
    </Box>
  </Box>
}
export default NotarizedReqForm