import Box from "@mui/system/Box";
import clsx from 'clsx';
import { FC } from "react";
import FormsCategory from "views/pages/LOAN/widgets/Forms/Category";
import FormsMetadata from "views/pages/LOAN/widgets/Forms/Metadata";
import FormsPDFViewer from "views/pages/LOAN/widgets/Forms/PDFViewer";
import formsStyle from "./style";
const ReportDoc: FC = () => {
  const classes = formsStyle();

  return <Box className={clsx(classes.root, 'mt-6')}>
    <Box className="flex justify-between">
      <FormsCategory />
      <FormsPDFViewer />
      <FormsMetadata existFileInfo={false}/>
    </Box>
  </Box>
}
export default ReportDoc;