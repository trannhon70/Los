import { Button, Collapse, Divider, Grid, IconButton } from "@mui/material"
import Box from "@mui/system/Box"
import { FC, useState } from "react"
import { AiOutlineDownCircle, AiOutlineUpCircle } from "react-icons/ai"
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { IoTrashOutline } from "react-icons/io5"
import { VscSearch } from "react-icons/vsc"
import Input from "views/components/base/Input"
import Select from "views/components/base/Select"
const DraftInfo: FC = () => {
  const [toggleMain, setToggelMain] = useState<boolean>(false);
  const [toggleChild, setToggelChild] = useState<boolean>(false);
  const toggleTable = () => {
    setToggelMain(!toggleMain);
    setToggelChild(false);

  }
  const onClicktoggleChild = () => {
    setToggelChild(!toggleChild);
  }
  return <>
    <Box className='flex mt-6' sx={{ width: "100%" }}>
      <Box width='5%'>
        <label className='font-medium text-18'>STT</label>
      </Box>
      <Box width='85%'>
        <label className='font-medium text-18'>HỒ SƠ</label>
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
    {/* //#region I Thỏa thuận cho vay */}
    <Box className='Loan-deal'>
      <Collapse in={toggleMain}>
        <Box className='flex-center' sx={{ width: "100%" }}>
          <Box width='5%' className='font-medium text-16 pl-3'>I</Box>
          <Box width='85%' className='text-upper' >
            <Box sx={{
              display: 'inline-block',
              width: '396px',
              padding: '10px',
              fontSize: '16px',
              backgroundColor: '#1825aa', color: '#ffffff'
            }}>THỎA THUẬN CHO VAY</Box>
          </Box>
          <Box width='10%' sx={{ textAlign: 'end' }}>
            <IconButton onClick={onClicktoggleChild}>
              {toggleChild ? <AiOutlineDownCircle color="
            #1825aa" size="24px" className='mscb-pointer' /> :
                <AiOutlineUpCircle color="
            #1825aa" size="24px" className='mscb-pointer' />}
            </IconButton>
          </Box>
        </Box>
      </Collapse>
      <Divider className="mt-3 mb-3" />

      <Collapse in={toggleChild}>
        <Box className='flex-center' sx={{ width: "100%" }}>
          <Box width='5%' className='font-medium text-16 pl-3'>1</Box>
          <Box width='95%' >
            <Box className='text-danger text-16' sx={{
              display: 'inline-block',
              width: '185px',
              padding: '10px',
              fontSize: '16px',
              border: 'solid 1px #eb0029'
            }}>TTCV Hạn mức</Box>
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' >
            <Divider className="mt-3 mb-3" />
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' className='flex' >
            <Box width='15%' className='text-upper text-primary font-medium mr-3' >Thông tin TTCV hạn mức</Box>
            <Box width='85%' >
              <Grid container spacing={3}>
                <Grid item xl={4} md={4} xs={12}>
                  <Input label='1. Số thỏa thuận cho vay' value='TTCV-545841' disabled />
                </Grid>
                <Grid item xl={4} md={4} xs={12}>
                  <Input label='2. Tên thoả thuận cho vay' value='Thoả thuận cho vay' disabled />
                </Grid>
                <Grid item xl={4} md={4} xs={12}>
                  <Input label='3. Phương thức đề nghị cấp tín dụng' value='Hạn mức tín dụng' disabled />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Divider className="mt-3 mb-3" />

      </Collapse>
      <Collapse in={toggleChild}>
        <Box className='flex-center' sx={{ width: "100%" }}>
          <Box width='5%' className='font-medium text-16 pl-3'>2</Box>
          <Box width='85%' >
            <Box className='text-danger text-16' sx={{
              display: 'inline-block',
              width: '185px',
              padding: '10px',
              fontSize: '16px',
              border: 'solid 1px #eb0029'
            }}>Phụ lục TTCV</Box>
          </Box>
          <Box width='10%' sx={{ textAlign: 'end' }} >
            <IconButton>
              <IoTrashOutline style={{ fontSize: '1.5rem' }} className='text-primary' />
            </IconButton>

            <IconButton>
              <AiOutlinePlusSquare style={{ fontSize: '1.5rem' }} className='text-primary' />
            </IconButton>
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' >
            <Divider className="mt-3 mb-3" />
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' className='flex' >
            <Box width='15%' className='text-upper text-primary font-medium mr-3' >Thông tin phụ lục TTCV 1</Box>
            <Box width='85%' >
              <Grid container spacing={3}>
                <Grid item xl={4} md={4} xs={12}>
                  <Input
                    label='1. Số thỏa thuận cho vay'
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
                        width: "30px",
                        height: "1px",
                        top: "72%",
                        left: "77px",
                        transform: "translate(24px, -40%)",
                        backgroundColor: "#353535",
                      }
                    }}
                  >
                    <Grid item xl={4} md={4} xs={4} sx={{
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
                    <Grid item xl={8} md={8} xs={8} sx={{


                    }}>
                      <Input label='2. Số phụ lục thỏa thuận cho vay' value='TTCV-545841.01' disabled />

                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' >
            <Divider className="mt-3 mb-3" />
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' className='flex' >
            <Box width='15%' className='text-upper text-primary font-medium mr-3' >Thông tin phụ lục TTCV 2</Box>
            <Box width='85%' >
              <Grid container spacing={3}>
                <Grid item xl={4} md={4} xs={12}>
                  <Input
                    label='1. Số thỏa thuận cho vay'
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
                        width: "30px",
                        height: "1px",
                        top: "72%",
                        left: "77px",
                        transform: "translate(24px, -40%)",
                        backgroundColor: "#353535",
                      }
                    }}
                  >
                    <Grid item xl={4} md={4} xs={4} sx={{
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
                    <Grid item xl={8} md={8} xs={8} sx={{


                    }}>
                      <Input label='2. Số phụ lục thỏa thuận cho vay' value='TTCV-545841.01' disabled />

                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Divider className="mt-3 mb-3" />
      </Collapse >
    </Box>

    {/* //#region I Thỏa thuận cho vay */}

    {/* //#region II Khế ước nhận nợ*/}
    <Box className='khe-uoc'>
      <Collapse in={toggleMain}>
        <Box className='flex-center' sx={{ width: "100%" }}>
          <Box width='5%' className='font-medium text-16 pl-3'>II</Box>
          <Box width='85%' className='text-upper' >
            <Box sx={{
              display: 'inline-block',
              width: '396px',
              padding: '10px',
              fontSize: '16px',
              backgroundColor: '#1825aa', color: '#ffffff'
            }}>KHẾ ƯỚC NHẬN NỢ</Box>
          </Box>
          <Box width='10%' sx={{ textAlign: 'end' }}>
            <IconButton onClick={onClicktoggleChild}>
              {toggleChild ? <AiOutlineDownCircle color="
            #1825aa" size="24px" className='mscb-pointer' /> :
                <AiOutlineUpCircle color="
            #1825aa" size="24px" className='mscb-pointer' />}
            </IconButton>
          </Box>
        </Box>
        <Divider className="mt-3 mb-3" />
      </Collapse>
      <Collapse in={toggleChild}>
        <Box className='flex-center' sx={{ width: "100%" }}>
          <Box width='5%' className='font-medium text-16 pl-3'></Box>
          <Box width='95%' >
            <Box className='text-danger text-16' sx={{
              display: 'inline-block',
              width: '185px',
              padding: '10px',
              fontSize: '16px',
              border: 'solid 1px #eb0029'
            }}>TTCV Ngắn hạn cụ thể</Box>
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' >
            <Divider className="mt-3 mb-3" />
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' className='flex' >
            <Box width='15%' className='text-upper text-primary font-medium mr-3' >Thông tin TTCV ngắn hạn cụ thể</Box>
            <Box width='85%' >
              <Grid container spacing={3}>
                <Grid item xl={4} md={4} xs={12}>
                  <Input
                    label='1. Số thỏa thuận cho vay'
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
                <Grid item xl={4} md={4} xs={12}>
                  <Input label='2. Số thoả thuận cho vay ngắn hạn cụ thể' value='TTCV-545841.01' disabled />
                </Grid>
                <Grid item xl={4} md={4} xs={12}>
                </Grid>
                <Grid item xl={4} md={4} xs={12}>
                  <Box className='flex justify-end'>
                    <Select label='3. Công thức tính lãi' options={[]} value='Công thức tính lãi add-on (vay món)' disabled />
                    <Box sx={{ position: 'absolute', fontSize: '13px' }} className='mscb-pointer text-primary'>Xem công thức</Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Divider className="mt-3 mb-3" />
      </Collapse>
    </Box>
    {/* //#region II Khế ước nhận nợ*/}
    {/* mortgage-contract */}
    <Box className='mortgage-contract'>
      <Collapse in={toggleMain}>
        <Box className='flex-center' sx={{ width: "100%" }}>
          <Box width='5%' className='font-medium text-16 pl-3'>III</Box>
          <Box width='85%' className='text-upper' >
            <Box sx={{
              display: 'inline-block',
              width: '396px',
              padding: '10px',
              fontSize: '16px',
              backgroundColor: '#1825aa', color: '#ffffff'
            }}>HỢP ĐỒNG THẾ CHẤP</Box>
          </Box>
          <Box width='10%' sx={{ textAlign: 'end' }}>
            <IconButton onClick={onClicktoggleChild}>
              {toggleChild ? <AiOutlineDownCircle color="
            #1825aa" size="24px" className='mscb-pointer' /> :
                <AiOutlineUpCircle color="
            #1825aa" size="24px" className='mscb-pointer' />}
            </IconButton>
          </Box>
        </Box>
        <Divider className="mt-3 mb-3" />
      </Collapse>
      <Collapse in={toggleChild}>
        <Box className='flex-center' sx={{ width: "100%" }}>
          <Box width='5%' className='font-medium text-16 pl-3'>1</Box>
          <Box width='95%' >
            <Box className='text-danger text-16' sx={{
              display: 'inline-block',
              width: '185px',
              padding: '10px',
              fontSize: '16px',
              border: 'solid 1px #eb0029'
            }}>Bất động sản</Box>
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' >
            <Divider className="mt-3 mb-3" />
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' className='flex' >
            <Box width='15%' className='text-upper text-primary font-medium mr-3' >Thông tin HĐTC bđs 1</Box>
            <Box width='85%' >
              <Grid container spacing={3}>
                <Grid item xl={4} md={4} xs={12}>
                  <Select label='1. Tên hợp đồng thế chấp' options={[]} value='Khác' disabled />
                </Grid>
                <Grid item xl={4} md={4} xs={12}>
                  <Input label='2. Tên hợp đồng thế chấp khác' value='TTCV-545841.01' disabled />
                </Grid>
                <Grid item xl={4} md={4} xs={12}>
                  <Input label='3. Số hợp đồng thế chấp' value='Công thức tính lãi add-on (vay món)' disabled />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' >
            <Divider className="mt-3 mb-3" />
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' className='flex' >
            <Box width='15%' className='text-upper text-primary font-medium mr-3' >Thông tin HĐTC bđs 1</Box>
            <Box width='85%' >
              <Grid container spacing={3}>
                <Grid item xl={4} md={4} xs={12}>
                  <Select label='1. Tên hợp đồng thế chấp' options={[]} value='Khác' disabled />
                </Grid>
                <Grid item xl={4} md={4} xs={12}>
                  <Input label='2. Tên hợp đồng thế chấp khác' value='TTCV-545841.01' disabled />
                </Grid>
                <Grid item xl={4} md={4} xs={12}>
                  <Input label='3. Số hợp đồng thế chấp' value='Công thức tính lãi add-on (vay món)' disabled />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Divider className="mt-3 mb-3" />
      </Collapse>
      <Collapse in={toggleChild}>
        <Box className='flex-center' sx={{ width: "100%" }}>
          <Box width='5%' className='font-medium text-16 pl-3'>2</Box>
          <Box width='95%' >
            <Box className='text-danger text-16' sx={{
              display: 'inline-block',
              width: '185px',
              padding: '10px',
              fontSize: '16px',
              border: 'solid 1px #eb0029'
            }}>Sạp chợ</Box>
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' >
            <Divider className="mt-3 mb-3" />
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' className='flex' >
            <Box width='15%' className='text-upper text-primary font-medium mr-3' >Thông tin HĐTC sạp chợ 1</Box>
            <Box width='85%' >
              <Grid container spacing={3}>
                <Grid item xl={4} md={4} xs={12}>
                  <Input label='1. Số hợp đồng thế chấp' value='TTCV-545841' disabled />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Divider className="mt-3 mb-3" />
      </Collapse>
    </Box>

    {/* mortgage-contract */}
    {/* register-form */}
    <Box className='register-form'>
      <Collapse in={toggleMain}>
        <Box className='flex-center' sx={{ width: "100%" }}>
          <Box width='5%' className='font-medium text-16 pl-3'>IV</Box>
          <Box width='85%' className='text-upper'>
            <Box sx={{
              display: 'inline-block',
              width: '396px',
              padding: '10px',
              fontSize: '16px',
              backgroundColor: '#1825aa', color: '#ffffff'
            }}>Đơn đăng ký</Box>
          </Box>
          <Box width='10%' sx={{ textAlign: 'end' }}>
            <IconButton onClick={onClicktoggleChild}>
              {toggleChild ? <AiOutlineDownCircle color="
            #1825aa" size="24px" className='mscb-pointer' /> :
                <AiOutlineUpCircle color="
            #1825aa" size="24px" className='mscb-pointer' />}
            </IconButton>
          </Box>
        </Box>
        <Divider className="mt-3 mb-3" />
      </Collapse>
      <Collapse in={toggleChild}>
        <Box className='flex-center' sx={{ width: "100%" }}>
          <Box width='5%' className='font-medium text-16 pl-3'>1</Box>
          <Box width='95%' >
            <Box className='text-danger text-16' sx={{
              display: 'inline-block',
              width: '185px',
              padding: '10px',
              fontSize: '16px',
              border: 'solid 1px #eb0029'
            }}>Bất động sản</Box>
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' >
            <Divider className="mt-3 mb-3" />
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' className='flex' >
            <Box width='15%' className='text-upper text-primary font-medium mr-3' >Thông tin đđk bđs 1</Box>
            <Box width='85%' >
              <Grid container spacing={3}>
                <Grid item xl={4} md={4} xs={12}>
                  <Input label='1. Số HĐTC/Phụ lục HĐTC' value='TTCV-545841' disabled />
                </Grid>
                <Grid item xl={4} md={4} xs={12}>
                  <Input label='2. Mã đơn đăng ký' value='TTCV-545841.01' disabled />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' >
            <Divider className="mt-3 mb-3" />
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' className='flex' >
            <Box width='15%' className='text-upper text-primary font-medium mr-3' >Thông tin đđk bđs 2</Box>
            <Box width='85%' >
              <Grid container spacing={3}>
                <Grid item xl={4} md={4} xs={12}>
                  <Input label='1. Số HĐTC/Phụ lục HĐTC' value='TTCV-545841' disabled />
                </Grid>
                <Grid item xl={4} md={4} xs={12}>
                  <Input label='2. Mã đơn đăng ký' value='TTCV-545841.01' disabled />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Divider className="mt-3 mb-3" />
      </Collapse>
      <Collapse in={toggleChild}>
        <Box className='flex-center' sx={{ width: "100%" }}>
          <Box width='5%' className='font-medium text-16 pl-3'>2</Box>
          <Box width='95%' >
            <Box className='text-danger text-16' sx={{
              display: 'inline-block',
              width: '185px',
              padding: '10px',
              fontSize: '16px',
              border: 'solid 1px #eb0029'
            }}>Sửa đổi bất động sản</Box>
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' >
            <Divider className="mt-3 mb-3" />
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' className='flex' >
            <Box width='15%' className='text-upper text-primary font-medium mr-3' >thông tin đđk sửa đổi bđs 1</Box>
            <Box width='85%' >
              <Grid container spacing={3}>
                <Grid item xl={4} md={4} xs={12}>
                  <Input label='1. Mã đơn đăng ký bất động sản' value='TTCV-545841' disabled />
                </Grid>
                <Grid item xl={4} md={4} xs={12}>
                  <Input label='2. Mã đơn đăng ký sửa đổi/Bổ sung' value='TTCV-545841' disabled />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Divider className="mt-3 mb-3" />
      </Collapse>
    </Box>
    {/* register-form*/}

    {/* receipt-record*/}
    <Box className='receipt-record'>
      <Collapse in={toggleMain}>
        <Box className='flex-center' sx={{ width: "100%" }}>
          <Box width='5%' className='font-medium text-16 pl-3'>V</Box>
          <Box width='85%' className='text-upper' >
            <Box sx={{
              display: 'inline-block',
              width: '396px',
              padding: '10px',
              fontSize: '16px',
              backgroundColor: '#1825aa', color: '#ffffff'
            }}>Biên bản giao nhận</Box>
          </Box>
          <Box width='10%' sx={{ textAlign: 'end' }}>
            <IconButton onClick={onClicktoggleChild}>
              {toggleChild ? <AiOutlineDownCircle color="
            #1825aa" size="24px" className='mscb-pointer' /> :
                <AiOutlineUpCircle color="
            #1825aa" size="24px" className='mscb-pointer' />}
            </IconButton>
          </Box>
        </Box>
        <Divider className="mt-3 mb-3" />
      </Collapse>
      <Collapse in={toggleChild}>
        <Box className='flex-center' sx={{ width: "100%" }}>
          <Box width='5%' className='font-medium text-16 pl-3'>1</Box>
          <Box width='95%' >
            <Box className='text-danger text-16' sx={{
              display: 'inline-block',
              width: '185px',
              padding: '10px',
              fontSize: '16px',
              border: 'solid 1px #eb0029'
            }}>Biên bản giao nhận 1</Box>
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' >
            <Divider className="mt-3 mb-3" />
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' className='flex' >
            <Box width='15%' className='text-upper text-primary font-medium mr-3' >thông tin biên bản giao nhận</Box>
            <Box width='85%' >
              <Grid container spacing={3}>
                <Grid item xl={4} md={4} xs={12}>
                  <Input label='1. Số hợp đồng thế chấp' value='TTCV-545841' disabled />
                </Grid>
                <Grid item xl={4} md={4} xs={12}>
                  <Input label='2. Mã biên bản giao nhận' value='TTCV-545841.01' disabled />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Divider className="mt-3 mb-3" />
      </Collapse>
    </Box>
    {/* receipt-record*/}
    {/* commitment*/}
    <Box className='commitment'>
      <Collapse in={toggleMain}>
        <Box className='flex-center' sx={{ width: "100%" }}>
          <Box width='5%' className='font-medium text-16 pl-3'>VI</Box>
          <Box width='85%' className='text-upper'>
            <Box sx={{
              display: 'inline-block',
              width: '396px',
              padding: '10px',
              fontSize: '16px',
              backgroundColor: '#1825aa', color: '#ffffff'
            }}>Cam kết công trình xây dựng</Box>
          </Box>
          <Box width='10%' sx={{ textAlign: 'end' }}>
            <IconButton onClick={onClicktoggleChild}>
              {toggleChild ? <AiOutlineDownCircle color="
            #1825aa" size="24px" className='mscb-pointer' /> :
                <AiOutlineUpCircle color="
            #1825aa" size="24px" className='mscb-pointer' />}
            </IconButton>
          </Box>
        </Box>
        <Divider className="mt-3 mb-3" />
      </Collapse>
      <Collapse in={toggleChild}>
        <Box className='flex-center' sx={{ width: "100%" }}>
          <Box width='5%' className='font-medium text-16 pl-3'>1</Box>
          <Box width='95%' >
            <Box className='text-danger text-16' sx={{
              display: 'inline-block',
              width: '185px',
              padding: '10px',
              fontSize: '16px',
              border: 'solid 1px #eb0029'
            }}>Cam kết CTXD 1</Box>
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' >
            <Divider className="mt-3 mb-3" />
          </Box>
        </Box>
        <Box className='flex' sx={{ width: "100%" }}>
          <Box width='5%' ></Box>
          <Box width='95%' className='flex' >
            <Box width='15%' className='text-upper text-primary font-medium mr-3' >thông tin cam kết ctxd</Box>
            <Box width='85%' >
              <Grid container spacing={3}>
                <Grid item xl={4} md={4} xs={12}>
                  <Input label='1. Số HĐTC/Phụ lục HĐTC' value='TTCV-545841' disabled />
                </Grid>
                <Grid item xl={4} md={4} xs={12}>
                  <Input label='2. Mã cam kết công trình xây dựng' value='TTCV-545841.01' disabled />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Divider className="mt-3 mb-3" />
      </Collapse>
    </Box>
    {/* commitment*/}


  </>

}
export default DraftInfo

function useToggle(): [any, any] {
  throw new Error("Function not implemented.")
}
