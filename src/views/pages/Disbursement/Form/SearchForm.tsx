
import { Box, Button, Grid } from '@mui/material';
import { FC } from 'react';
import Select from 'views/components/base/Select';
import CardOutside from 'views/components/layout/CardOutside';
import SelectLocation from 'views/components/widgets/SelectLocation';

export interface SearchFormProps {
  className?: string;
}

const SearchForm: FC<SearchFormProps> = props => {

  const { className } = props;

  return <CardOutside label="Tìm kiếm" className='search-form'>

    <Grid container spacing={3}>
      <Grid item xl={6} sm={12} >
        <SelectLocation label={['1. Theo tỉnh/thành', '2. Theo quận/huyện']} isWard={false} col={6} />
      </Grid>
      <Grid item xl={3} sm={12}>
        <Select label='3. Theo chi nhánh' options={[]} />
      </Grid>
      <Grid item xl={3} sm={12}>
        <Select label='4. Theo trạng thái hồ sơ' options={[]} />
      </Grid>
    </Grid>
    <Box className='flex justify-end mt-3'>
      <Button className='btn-primary' sx={{ width: '120px', height: '36', color: '#fff', borderRadius:0 }} > Tìm kiếm </Button>
    </Box>
  </CardOutside>

}

export default SearchForm;
