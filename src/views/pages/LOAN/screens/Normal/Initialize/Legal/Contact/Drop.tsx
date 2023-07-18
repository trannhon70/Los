import { FC, useRef } from "react";
import Box from "@mui/material/Box";
import AutocompleteMultiple, {
  AutocompleteMultipleRef,
} from "views/components/base/AutocompleteMultiple";

const ContactDrop: FC = () => {
  const userRef = useRef<AutocompleteMultipleRef>(null);

  return (
    <Box className="flex">
      <Box className="pr-6 font-bold text-danger">
        <span>Xin vui lòng chọn từ danh sách</span>
        <br />
        <span>Hoặc tạo người liên hệ mới</span>
      </Box>
      <Box sx={{ flex: 1 }}>
        <AutocompleteMultiple ref={userRef} tag />
      </Box>
    </Box>
  );
};

export default ContactDrop;
