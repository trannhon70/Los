import { FC, Fragment } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';
import OptionList from 'views/components/layout/OptionList';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#e6f4ea',
    color: '#137333'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const DevelopOptionList: FC = () => {

  return <Fragment>
    <Grid container spacing={ 3 }>
      <Grid item xl={ 4 }>
        <Paper sx={{ width: '100%', pb: 3 }}>
          <Typography component="h4" variant="h6" className="p-3">
            After Checked
          </Typography>
          <Divider />
          <Paper sx={{ borderRadius: 0, mx: 3, mt: 3 }}>
            <OptionList 
              value="product1"
              options={[
                { value: 'product1', label: 'Product 1' },
                { value: 'product2', label: 'Product 2' },
                { value: 'product3', label: 'Product 3' },
              ]} 
            />
          </Paper>
        </Paper>
        <Paper sx={{ width: '100%', pb: 3 }} className="mt-4">
          <Typography component="h4" variant="h6" className="p-3">
            Before Checked
          </Typography>
          <Divider />
          <Paper sx={{ borderRadius: 0, mx: 3, mt: 3 }}>
            <OptionList 
              before
              value="product1"
              options={[
                { value: 'product1', label: 'Product 1' },
                { value: 'product2', label: 'Product 2' },
                { value: 'product3', label: 'Product 3' },
              ]} 
            />
          </Paper>
        </Paper>
        <Paper sx={{ width: '100%', pb: 3 }} className="mt-4">
          <Typography component="h4" variant="h6" className="p-3">
            Disabled
          </Typography>
          <Divider />
          <Paper sx={{ borderRadius: 0, mx: 3, mt: 3 }}>
            <OptionList 
              value="product1"
              disabled
              options={[
                { value: 'product1', label: 'Product 1' },
                { value: 'product2', label: 'Product 2' },
                { value: 'product3', label: 'Product 3' },
              ]} 
            />
          </Paper>
        </Paper>
        <Paper sx={{ width: '100%', pb: 3 }} className="mt-4">
          <Typography component="h4" variant="h6" className="p-3">
            Before Checked background
          </Typography>
          <Divider />
          <Paper sx={{ borderRadius: 0, mx: 3, mt: 3 }}>
            <OptionList 
              before
              checkedBg
              value="product1"
              options={[
                { value: 'product1', label: 'Product 1' },
                { value: 'product2', label: 'Product 2' },
                { value: 'product3', label: 'Product 3' },
              ]} 
            />
          </Paper>
        </Paper>
        <Paper sx={{ width: '100%', pb: 3 }} className="mt-4">
          <Typography component="h4" variant="h6" className="p-3">
            After Checked background
          </Typography>
          <Divider />
          <Paper sx={{ borderRadius: 0, mx: 3, mt: 3 }}>
            <OptionList 
              checkedBg
              value="product1"
              options={[
                { value: 'product1', label: 'Product 1' },
                { value: 'product2', label: 'Product 2' },
                { value: 'product3', label: 'Product 3' },
              ]} 
            />
          </Paper>
          
        </Paper>
        <Paper sx={{ width: '100%', pb: 3 }} className="mt-4">
          <Typography component="h4" variant="h6" className="p-3">
            Custom icon checked
          </Typography>
          <Divider />
          <Paper sx={{ borderRadius: 0, mx: 3, mt: 3 }}>
            <OptionList 
              value="product1"
              checkIcon={ <></> }
              checkedIcon={ <CheckIcon /> }
              options={[
                { value: 'product1', label: 'Product 1' },
                { value: 'product2', label: 'Product 2' },
                { value: 'product3', label: 'Product 3' },
              ]} 
            />
          </Paper>
        </Paper>
        <Paper sx={{ width: '100%', pb: 3 }} className="mt-4">
          <Typography component="h4" variant="h6" className="p-3">
            Long text label
          </Typography>
          <Divider />
          <Paper sx={{ borderRadius: 0, mx: 3, mt: 3 }}>
            <OptionList 
              value="product1"
              options={[
                { value: 'product1', label: 'Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 Product 1  Product 1' },
                { value: 'product2', label: 'Product 2' },
                { value: 'product3', label: 'Product 3' },
              ]} 
            />
          </Paper>
          
        </Paper>
        <Paper sx={{ width: '100%', pb: 3 }} className="mt-4">
          <Typography component="h4" variant="h6" className="p-3">
            Long text label center icon
          </Typography>
          <Divider />
          <Paper sx={{ borderRadius: 0, mx: 3, mt: 3 }}>
            <OptionList 
              value="product1"
              center
              options={[
                { value: 'product1', label: 'Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 Product 1  Product 1 Product 1 Product 1 Product 1 Product 1 Product 1  Product 1 Product 1 Product 1 Product 1 Product 1 Product 1  Product 1' },
                { value: 'product2', label: 'Product 2' },
                { value: 'product3', label: 'Product 3' },
              ]} 
            />
          </Paper>
        </Paper>
      </Grid>
      <Grid item xl={ 8 }>
        <Paper sx={{ width: '100%', px: 3, pb: 3 }}>
          <Typography component="h4" variant="h6" className="py-3">
            Props
          </Typography>
          <Divider className="mb-3" />
          <TableContainer component={ Paper }>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Tên</StyledTableCell>
                  <StyledTableCell>Kiểu</StyledTableCell>
                  <StyledTableCell>Mặc định</StyledTableCell>
                  <StyledTableCell>Bắt buộc</StyledTableCell>
                  <StyledTableCell>Mô tả</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    before
                  </StyledTableCell>
                  <StyledTableCell>
                    boolean
                  </StyledTableCell>
                  <StyledTableCell>
                    false
                  </StyledTableCell>
                  <StyledTableCell>
                    
                  </StyledTableCell>
                  <StyledTableCell>
                    Icon check nằm trước hay sau label. true sẽ nằm trước label
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    center
                  </StyledTableCell>
                  <StyledTableCell>
                    boolean
                  </StyledTableCell>
                  <StyledTableCell>
                    false
                  </StyledTableCell>
                  <StyledTableCell>
                    
                  </StyledTableCell>
                  <StyledTableCell>
                    Icon check sẽ canh giữa chiều dọc hay nằm phía trên nếu label dài rớt nhiều dòng
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    checkIcon
                  </StyledTableCell>
                  <StyledTableCell>
                    ReactNode
                  </StyledTableCell>
                  <StyledTableCell>
                    { '<RadioButtonUncheckedIcon />' }
                  </StyledTableCell>
                  <StyledTableCell>
                    
                  </StyledTableCell>
                  <StyledTableCell>
                    Custom icon khi chưa được check.
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    checkedBg
                  </StyledTableCell>
                  <StyledTableCell>
                    boolean
                  </StyledTableCell>
                  <StyledTableCell>
                    false
                  </StyledTableCell>
                  <StyledTableCell>
                    
                  </StyledTableCell>
                  <StyledTableCell>
                    Màu nền của item khi đã check có hay không.
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    checkedIcon
                  </StyledTableCell>
                  <StyledTableCell>
                    ReactNode
                  </StyledTableCell>
                  <StyledTableCell>
                    { '<CheckCircleIcon />' }
                  </StyledTableCell>
                  <StyledTableCell>
                    
                  </StyledTableCell>
                  <StyledTableCell>
                    Custom icon khi đã check.
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    className
                  </StyledTableCell>
                  <StyledTableCell>
                    string
                  </StyledTableCell>
                  <StyledTableCell>
                    
                  </StyledTableCell>
                  <StyledTableCell>
                    
                  </StyledTableCell>
                  <StyledTableCell>
                    Truyền class custom từ bên ngoài.
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    disabled
                  </StyledTableCell>
                  <StyledTableCell>
                    boolean
                  </StyledTableCell>
                  <StyledTableCell>
                    false
                  </StyledTableCell>
                  <StyledTableCell>
                    
                  </StyledTableCell>
                  <StyledTableCell>
                    Vô hiệu hoá không thể click và thay đổi giá trị được.
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    disableRipple
                  </StyledTableCell>
                  <StyledTableCell>
                    boolean
                  </StyledTableCell>
                  <StyledTableCell>
                    true
                  </StyledTableCell>
                  <StyledTableCell>
                    
                  </StyledTableCell>
                  <StyledTableCell>
                    Tắt hiệu ứng vòng tròn xung quanh của icon.
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    maxWidth
                  </StyledTableCell>
                  <StyledTableCell>
                    number
                  </StyledTableCell>
                  <StyledTableCell>
                    
                  </StyledTableCell>
                  <StyledTableCell>
                    
                  </StyledTableCell>
                  <StyledTableCell>
                    Chiều rộng tối đa của danh sách.
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    onChange
                  </StyledTableCell>
                  <StyledTableCell>
                    Function
                  </StyledTableCell>
                  <StyledTableCell>
                    
                  </StyledTableCell>
                  <StyledTableCell>
                    
                  </StyledTableCell>
                  <StyledTableCell>
                    Hàm truyền vào để nhận sự kiện khi giá trị thay đổi. Hàm này sẽ nhận vào giá trị mới.
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    options
                  </StyledTableCell>
                  <StyledTableCell>
                    OptionItem[]
                  </StyledTableCell>
                  <StyledTableCell>
                    
                  </StyledTableCell>
                  <StyledTableCell>
                    <span className="text-danger">Có</span>
                  </StyledTableCell>
                  <StyledTableCell>
                    Một mảng các danh sách option.
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    value
                  </StyledTableCell>
                  <StyledTableCell>
                    string | number
                  </StyledTableCell>
                  <StyledTableCell>
                    
                  </StyledTableCell>
                  <StyledTableCell>
                    
                  </StyledTableCell>
                  <StyledTableCell>
                    Giá trị mặc định sẽ được check khi mới vừa render xong.
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    wrap
                  </StyledTableCell>
                  <StyledTableCell>
                    boolean
                  </StyledTableCell>
                  <StyledTableCell>
                    true
                  </StyledTableCell>
                  <StyledTableCell>
                    
                  </StyledTableCell>
                  <StyledTableCell>
                    Khi label quá dài có được phép rớt dòng hay không.
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Paper sx={{ width: '100%', px: 3, pb: 3 }} className="mt-4">
          <Typography component="h4" variant="h6" className="py-3">
            Refs
          </Typography>
          <Divider className="mb-3" />
          <TableContainer component={ Paper }>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Tên</StyledTableCell>
                  <StyledTableCell>Mô tả</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    getValue(): string | number | undefined
                  </StyledTableCell>
                  <StyledTableCell>
                    Get về giá trị hiện tại của OptionList
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    setValue(value: string | number): void
                  </StyledTableCell>
                  <StyledTableCell>
                    Set một giá trị mới từ bên ngoài vào bên trong cho OptionList
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  </Fragment>

}

export default DevelopOptionList;