import { Box, Button, Collapse, Divider, Grid, IconButton, Typography } from "@mui/material";
import { FC, useState } from "react";
import { AiOutlineDownCircle, AiOutlineUpCircle } from "react-icons/ai";
import { VscSearch } from "react-icons/vsc";
import Input from "views/components/base/Input";
import ObjectList, { ObjectListOption } from "views/components/layout/ObjectList";
import SelectCollateralType from "views/components/widgets/SelectCollateralType";
import CollateralRealEstate from "../../CollateralCommon/RealEstate";
import { SxCollateralType } from "./style";
interface CollateralCommonProps {
  labelTitle1: string;
  labelTitle2: string;
  labelInputItem1: string;
  labelInputItem2?: string;
  labelInputItem3?: string;
  labelInputItem4?: string;
  labelObjList: string;
  options: ObjectListOption[];
  labelAmoutUnit: string
}
const CollateralCommon: FC<CollateralCommonProps> = (props) => {
  const { labelTitle1, labelTitle2, labelInputItem1, labelInputItem2, labelInputItem3, labelInputItem4, labelObjList, labelAmoutUnit, options } = props;
  const [current, setCurrentValue] = useState<number>(0);
  const changeObjList = (val: number) => { setCurrentValue(val) }
  const [toggleMain, setToggelMain] = useState<boolean>(false);
  const [toggleChild, setToggelChild] = useState<boolean>(false);
  const toggleTable = () => {
    setToggelMain(!toggleMain);
    setToggelChild(false);

  }
  const onClicktoggleChild = () => {
    setToggelChild(!toggleChild);
  }
  return <><Typography className='text-upper font-bold'>
    {labelTitle1}
  </Typography>
    <Box>
      <Box>
        <ObjectList
          className='obj-list-draft'
          labelLength={labelObjList}
          enableNumber
          enableAdd
          current={current}
          enableMenu
          onChange={changeObjList}
          menu={[{ value: 'DELETE', label: 'Xóa', isDanger: true }]}
          options={options}
          sx={{
            "& .object-list-add": {
              marginLeft: "6px!important",
            },
            '& .MuiTabs-root': {
              width: '100%',
              border: 'none !important',
            },
            "& .MuiTabs-flexContainer": {
              justifyContent: "space-between !important",
              transform: 'unset!important'
            },
            '& .object-list-box-name': {
              textDecoration: 'none !important',
              width: "100%",
              '& .text-secondary.font-normal': {
                fontSize: '10px',
              }
            },
            "& .object-list-box": {
              "&.active .MuiAvatar-root": {
                border: 'none',
                backgroundColor: 'var(--mscb-primary)'
              }
            },
            "& .MuiButtonBase-root": {
              borderBottom: 'none'
            },
            "& button": {
              display: 'flex',
              'align-items': 'flex-start'
            }
          }}
        />
      </Box>
      <Box className='pt-3 pb-3'>
        <Grid container spacing={3}>
          <Grid item xl={4} md={4} xs={12}>
            <Input className='font-medium'
              label={labelInputItem1}
              suffix={
                <Box
                  className="flex tbl-ipt-toolbar"
                  sx={{
                    height: '36px',
                    fontSize: '0.5rem',
                    '& .MuiSvgIcon-root': {
                      '&.done': { color: 'var(--mscb-primary)!important' },
                      '&.cancel': { color: 'var(--mscb-primary)!important' }
                    }
                  }}
                >
                  <IconButton
                    className="done-wrapper"
                    color="primary"
                  >
                    <VscSearch fontSize='1.25rem' />
                  </IconButton>
                </Box>
              }

            />
          </Grid>
          <Grid item xl={4} md={4} xs={12} sx={{ position: 'relative' }} >
            <Grid container
              sx={{
                position: 'relative',
                '&::after': {
                  content: "''",
                  position: "absolute",
                  zIndex: 1,
                  width: "24px",
                  height: "1px",
                  top: "72%",
                  left: "-48px",
                  transform: "translate(24px, -40%)",
                  backgroundColor: "#353535",
                },
                '&::before': {
                  content: "''",
                  position: "absolute",
                  zIndex: 1,
                  width: "24px",
                  height: "1px",
                  top: "72%",
                  left: "76px",
                  transform: "translate(24px, -40%)",
                  backgroundColor: "#353535",
                }
              }}
            >
              <Grid item xl={3} md={3} xs={3} sx={{
                alignSelf: 'flex-end',
              }}>
                <Button
                  variant="contained"
                  className="text-13 rounded-0 font-medium btn-primary"
                  sx={{ height: '36px', padding: '10px' }}
                >
                  Tạo dữ liệu
                </Button>
              </Grid>
              <Grid item xl={9} md={9} xs={9} sx={{


              }}>
                <Input label={labelInputItem2} value='TTCV-545841.01' disabled />
              </Grid>
            </Grid>
          </Grid>
          <>
            {
              (labelInputItem3 && !labelInputItem4) ? (<Grid item xl={4} md={4} xs={12}>
                <Input label={labelInputItem3} value='HDTC-545841' disabled />
              </Grid>) : <Grid item xl={4} md={4} xs={12}></Grid>
            }
          </>
          <>
            {
              labelInputItem4 ? (
                <>
                  <Grid item xl={8} md={8} xs={12}>
                    <Input label={labelInputItem3} value=' HỢP ĐỒNG SỬA ĐỔI, BỔ SUNG HỢP ĐỒNG THẾ CHẤP QUYỀN SỬ DỤNG ĐẤT VÀ QUYỀN SỞ HỮU TÀI SẢN GẮN LIỀN VỚI ĐẤT' disabled />

                  </Grid>
                  <Grid item xl={4} md={4} xs={12}>
                    <Input label={labelInputItem4} value='Hợp đồng thế chấp tài sản khác' disabled />

                  </Grid>
                </>
              ) : null
            }
          </>

        </Grid>
      </Box>
      <Box className='pt-3 pb-3'>
        <Typography className='text-upper font-bold'>
          {labelTitle2}
        </Typography>
      </Box>
      <Box className='flex '>
        <Box className='text-danger font-medium flex-center'>
          {labelAmoutUnit}
        </Box>
        <Input type='number'
          format
          fullWidth={false}
          className='ml-3'
          sx={{
            '& .MuiInputBase-input': {
              backgroundColor: 'var(--mscb-bg-input-disabled)!important',
              color: 'var(--mscb-danger)!important',
            }
          }} />
      </Box>
    </Box>
    <Box>

      <Box className='flex mt-6' sx={{ width: "100%" }}>
        <Box width='5%'>
          <label className='font-medium text-18'>STT</label>
        </Box>
        <Box width='85%'>
          <label className='font-medium text-18'>TÀI SẢN BẢO ĐẢM</label>
        </Box>
        <Box width='10%' sx={{ textAlign: 'end' }}>
          <IconButton onClick={toggleTable}>
            {toggleMain ? <AiOutlineDownCircle color="
            #eb0029" size="24px" className='mscb-pointer' /> :
              <AiOutlineUpCircle color="
            #eb0029" size="24px" className='mscb-pointer' />}
          </IconButton>
        </Box>
      </Box>
      <Divider className="mt-2 mb-2" sx={{ border: 'solid 1px #353535' }} />
      <Collapse in={toggleMain}>
        <Box className='real-estate'>
          <Collapse in={toggleMain}>
            <Box className='flex-center' sx={{ width: "100%" }}>
              <Box width='3%' className='font-medium text-16'>I</Box>
              <Box width='87%' className='text-upper' >
                <SelectCollateralType sx={SxCollateralType} />
              </Box>
              <Box width='10%' sx={{ textAlign: 'end' }}>
                <IconButton onClick={onClicktoggleChild}>
                  {toggleChild ? <AiOutlineDownCircle color="#1825aa" size="24px" className='mscb-pointer' /> :
                    <AiOutlineUpCircle color="#1825aa" size="24px" className='mscb-pointer' />}
                </IconButton>
              </Box>
            </Box>
          </Collapse>
          <Divider className="mt-3 mb-3" />
          <Collapse in={toggleChild}>
            <CollateralRealEstate />
          </Collapse>

        </Box>

      </Collapse>
    </Box >
  </>
}
export default CollateralCommon;