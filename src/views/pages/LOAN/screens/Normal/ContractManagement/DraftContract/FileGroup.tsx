import { Check } from "@mui/icons-material";
import { Box, Collapse, Divider, Grid } from "@mui/material";
import { FC, useState } from "react";
import { AiOutlineDownCircle, AiOutlineUpCircle } from "react-icons/ai";
import { BsArrowRight } from 'react-icons/bs';
import Input from "views/components/base/Input";
import Label from "views/components/base/Label";
import Radio from "views/components/base/Radio";
import OptionList, { OptionItem } from "views/components/layout/OptionList";
import Scrollbar from "views/components/layout/Scrollbar";

export const FileGroup: FC = () => {
  const [cate, setSelectCate] = useState<number>(1);
  const [expands, setExpands] = useState<boolean>(true)

  const cates: OptionItem[] = [
    { value: 1, label: '1. Hồ sơ mới' },
    { value: 2, label: '2. Hồ sơ mới và BKRV/TTCV ngắn hạn cụ thể' },
    { value: 3, label: '3. BKRV hoặc TTCV ngắn hạn cụ thể' },
    { value: 4, label: '4. Thay đổi thông tin tài sản hiện hữu' },
    { value: 5, label: '5. Hoán đổi hoặc bổ sung tài sản' },
    { value: 6, label: '6. Soạn cơ cấu nợ' },
    { value: 7, label: '7. Soạn khác' },
  ]

  const handleClick = () => {
    setExpands(!expands);
  };
  return <>
    <Box >
      <Grid container spacing={3} rowSpacing={2} sx={{
        "& input": {
          fontWeight: "500",
          textTransform: "uppercase",
          '-webkit-text-fill-color': '#353535 !important'
        },
      }}>
        <Grid item xl={3} md={3} sm={4}>
          <Input className='font-medium' label='1. Mã LOS (ID LOS)' value='001_03042021_00000001' disabled />
        </Grid>
        <Grid item xl={3} md={3} sm={4}>
          <Input label='2. Mã soạn thảo (ID ST)' value='ST001' disabled />
        </Grid>
        <Grid item xl={3} md={3} sm={4}>
          <Input label='3. Mã đơn vị' value='001 - Chi nhánh Trần Hưng Đạo' disabled />
        </Grid>
      </Grid>
    </Box>
    <Box className='mt-8'>
      <Grid container spacing={6} >
        <Grid item xl={6} md={6} sm={6}>
          <Label required bold>I. Yêu cầu soạn thảo</Label>
          <Box
            sx={{
              marginTop: '6px',
              height: '286px', width: '100%',
              position: 'relative',
              bgcolor: '#f2f3f9',
              '& .MuiList-root': {
                bgcolor: 'transparent'
              },
              '& .product-arrow-icon': {
                right: '-40px'
              }
            }}
          >
            <Scrollbar>
              <div className="px-4">
                <OptionList
                  checkIcon={<></>}
                  checkedIcon={<Check />}
                  disabled={true}
                  value={1}
                  options={cates}
                />
              </div>
            </Scrollbar>
            <BsArrowRight className="text-primary absolute y-center text-30 product-arrow-icon" />

          </Box>
        </Grid>
        <Grid item xl={6} md={6} xs={6} >
          <Label required bold>II. Danh mục hồ sơ</Label>
          <Box
            sx={{
              marginTop: '6px',
              height: '286px', width: '100%',
              bgcolor: '#f2f3f9',
              '& .MuiList-root': {
                bgcolor: 'transparent'
              }
            }}
          >

            <Scrollbar>
              <div className="px-4">
                <Box className="py-3">
                  <Box className='flex justify-between'>
                    <Label className='font-medium text-danger'>1. Thỏa thuận cho vay</Label>
                    {expands ? <AiOutlineDownCircle color="#1825aa" size="24px" onClick={handleClick} className='mscb-pointer'/> :
                      <AiOutlineUpCircle color="#1825aa" size="24px" onClick={handleClick} className='mscb-pointer'/>}
                  </Box>
                  <Collapse in={expands}>
                    <Radio
                      options={[
                        {
                          label: "Đang đảm bảo",
                          value: "Y",
                        },
                      ]}
                      variant="checkbox"
                      required />
                    <Box className='child-radio ml-3'>
                      <Radio
                        options={[
                          {
                            label: "Biểu mẫu A1",
                            value: "Y",
                          },
                          {
                            label: "Khác mẫu",
                            value: "N",
                          },
                        ]}
                        variant="checkbox"
                        required />
                    </Box>
                    <Radio
                      options={[
                        {
                          label: "Từng lần",
                          value: "Y",
                        },
                      ]}
                      variant="checkbox"
                      required />
                    <Radio
                      options={[
                        {
                          label: "Phụ lục",
                          value: "Y",
                        },
                      ]}
                      variant="checkbox"
                      required />
                  </Collapse>
                  <Divider></Divider>
                  <Box className='flex justify-between pt-2'>
                    <Label className='font-medium text-danger'>2. Khế ước nhận nợ</Label>
                    {expands ? <AiOutlineDownCircle color="#1825aa" size="24px" onClick={handleClick} className='mscb-pointer' /> :
                      <AiOutlineUpCircle color="#1825aa" size="24px" onClick={handleClick} className='mscb-pointer' />}
                  </Box>
                  <Collapse in={expands}>
                    <Radio
                      options={[
                        {
                          label: "Bảng kê rút vốn",
                          value: "Y",
                        },
                      ]}
                      variant="checkbox"
                      required />
                    <Radio
                      options={[
                        {
                          label: "Thỏa thuận cho vay ngắn hạn cụ thể",
                          value: "Y",
                        },
                      ]}
                      variant="checkbox"
                      required />

                    <Box className='child-radio ml-3'>
                      <Radio
                        options={[
                          {
                            label: "Biểu mẫu B1",
                            value: "Y",
                          },
                          {
                            label: "Khác mẫu",
                            value: "N",
                          },
                        ]}
                        variant="checkbox"
                        required />
                    </Box>

                  </Collapse>
                </Box>
              </div>
            </Scrollbar>
          </Box>
        </Grid>
      </Grid>
    </Box>
  </>
}
export default FileGroup;