import { FC, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ILOANURLParams } from 'types/models/loan';
import { ILOANNormalStorageCICState } from 'types/models/loan/normal/storage/CIC';
import ObjectList from 'views/components/layout/ObjectList';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TitleSquare from 'views/components/layout/TitleSquare';
import Input from 'views/components/base/Input';
import Select from 'views/components/base/Select';
import SelectCreditInstitution, { SelectCreditInstitutionRef } from '../../../../components/widgets/SelectCreditInstitution';
import SelectDebtClassification from 'views/components/widgets/SelectDebtClassification';
import clsx from 'clsx';
import cicFormStyle from './style';
export interface CICBasicProps{
  label: string;
  enableList?: boolean;
}

const CICBasic: FC<CICBasicProps> = props => {

  const { label, enableList } = props;

  const selectCreditRef = useRef<SelectCreditInstitutionRef>(null);
  // const { CifIfType } = useMasterData();
  // const { CreditInstitution } = useMasterData();
  const params = useParams() as ILOANURLParams;
  // const dispatch = useDispatch();
  // const notify = useNotify();
  const classes = cicFormStyle();

  const declareURL = params['*'];
  // const { message } = useNormalCICMessage("other");
  const organ = params.organ as keyof ILOANNormalStorageCICState;
  // const position = useSelector(getLOANNormalStorageCICPosition(organ, declare));
  // const currentIdentity = useSelector(getLOANNormalStorageCICIdentityActive(organ, declare));
  // // const CurrentDeclare = useSelector(getLOANNormalStorageLegalDeclareByIdentity(declare, currentIdentity));
  // const CurrentDeclareName = useSelector(getLOANNormalStorageCurrentDeclare(organ));
  // const CurrentCreditGroup = useSelector(getLOANNormalStorageCICCurrentCreditGroup(organ, declare, currentIdentity));
  // const DeclareInfo = useSelector(getLOANNormalStorageLegalDeclare(declare));

  // const enabled = useSelector(containLOANNormalStorageDeclare(declare));
  // useEffect(() => {
  //   // if(position !== 0){
  //   //   dispatch(setLOANNormalStorageCICDeclarePosition(position, organ));
  //   // }
  //   // CurrentDeclareName !== declare && dispatch(setLOANNormalStorageCICDeclareActive(declare, organ));
  //   // if (currentIdentity){
  //   //   dispatch(setLOANNormalStorageCICDeclarePosition(position, organ));
  //   //   // DeclareInfo[position]?.identity?.length
  //   //   // && !DeclareInfo[position].identity?.find(id => id.num === currentIdentity)
  //   //   // && changeIdentity(DeclareInfo[position].identity[0].num)
  //   // }
  //   // else{
  //   //   // DeclareInfo[position]?.identity?.length && changeIdentity(DeclareInfo[position].identity[0].num);
  //   // }

  //   // if (organ === 'scb' && !CurrentCreditGroup?.credit?.length){
  //   //   // dispatch(setLOANNormalStorageCICDeclarePosition(position, organ));
  //   //   dispatch(addLOANNormalStorageCICCreditOrgan(organ));
  //   // }
  // });

  // const CreditPosition = CurrentCreditGroup
  //   ?.credit?.findIndex(c => c.uuid === CurrentCreditGroup.activeCredit) ?? 0;

  // const CreditObjList: ObjectListOption[] = CurrentCreditGroup?.credit?.map(c => ({
  //   label: CreditInstitution
  //     ?.find(ci => ci.credit_institution_code === c.basic.code)
  //       ?.credit_institution_short_name ??
  //         <em className="text-secondary text-lower pr-1 font-normal">
  //           [Chưa chọn <em className="text-upper">TCTD</em>]
  //         </em>,
  //   circle: <RiBankFill />,
  // })) ?? []

  // const CurrentCreditOrgan = CreditInstitution?.find(
  //   ci => ci.credit_institution_code === CurrentCreditGroup?.credit?.find(
  //     c => c.uuid === CurrentCreditGroup.activeCredit
  //   )?.basic.code
  // );

  // const changeIdentity = (value: string) => {
  //   value && dispatch(setLOANNormalStorageCICActive(value, organ));
  // }

  // const changeDebtGroup = (value: string) => {
  //   value && dispatch(setLOANNormalStorageCICDeclareDebtGroup(value, organ));
  // }

  // const clickAddCreditOrgan = () => {
  //   // enabled && currentIdentity && dispatch(addLOANNormalStorageCICCreditOrgan(organ));
  // }

  // const changeCredit = (value: string) => {
  //   const index = CurrentCreditGroup?.credit?.findIndex(c => c.basic.code === value) ?? -1;
    
  //   if (index > -1){
  //     selectCreditRef.current?.setValue(CurrentCreditOrgan?.credit_institution_code ?? '');
      
  //     if (index !== CreditPosition){
  //       notify('TCTD đã tồn tại', 'warning');
  //     }
      
  //     return;
  //   }

  //   dispatch(setLOANNormalStorageCICCreditOrgan(value, organ));
  // }

  //   dispatch(setLOANNormalStorageCICActiveCredit(uuid, organ));
  // }
  //   const SUMCollateral = c.detail.collateral.list?.map(l => l.value).reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0;
  //   return [ SUMLoan + SUMCard, SUMCollateral ];
  // })

  // const TotalBalance = Total?.map(t => t[0]).reduce((a, b) => a + b, 0) ?? 0;
  // const TotalCollateral = Total?.map(t => t[1]).reduce((a, b) => a + b, 0) ?? 0;

  return <Box className={clsx("mt-6", classes.root)}>
    {
      !!enableList &&
      <ObjectList
        labelLength={ `Chọn ${ label }` }
        enableAdd={ false }
        className='mb-6'
        // enableMenu={ false }
        // current={ position }
        // onChange={ changeDeclarePosition }
        // options={DeclareInfo?.map(d => ({
        //   label: d.basic.fullname,
        //   circle: <AccountCircleIcon />
        // }))}
      />
    }
    <TitleSquare>Thông tin cơ bản</TitleSquare>
    <Grid 
      container 
      spacing={ 3 }
      sx={{
        '&>.MuiGrid-item': {
          width: '20%'
        }
      }}
    >
      <Grid item>
        <Input
          label={ `1. ${ label }` }
          // value={ CurrentDeclare?.basic.fullname }
          disabled
        />
      </Grid>
      <Grid item>
        <Select
          label="2. Giấy tờ định danh"
          // value={ enabled ? currentIdentity : '' }
          // options={DeclareInfo[position]?.identity.filter(id => id.num)?.map(id => ({
          //   value: id.num,
          //   label: `${ CifIfType?.find(c => c.id === id.type)?.name } - ${ id.num }` 
          // })) ?? []}
          options={[]}
          // onChange={ changeIdentity }
          // disabled={ !enabled }
        />
      </Grid>
      <Grid item>
        <Input
          label="3. Tổng dư nợ (VNĐ)"
          disabled
          className= "input-red"
          sx={{ 
            '& input': { 
              fontWeight: 'bold'
            } 
          }}
          format
          // value={ TotalBalance > 0 ? TotalBalance.toString() : '' }
        />
      </Grid>
      <Grid item>
        <Input
          label="4. Tổng giá trị TSBĐ (VNĐ)"
          disabled
          className= "input-red"
          sx={{ 
            '& input': { 
              fontWeight: 'bold'
            } 
          }}
          format
          // value={ TotalCollateral > 0 ? TotalCollateral.toString(): '' }
        />
      </Grid>
      <Grid item>
        <SelectDebtClassification
          label="5. Nhóm nợ cao nhất"
          // disabled={ !enabled && !currentIdentity }
          // value={ CurrentCreditGroup?.debtGroup }
          // onChange={ changeDebtGroup }

        />
      </Grid>
    </Grid>
    {
      organ === 'other' &&
      <ObjectList
        className="mt-6"
        labelLength="Số lượng TCTD khác"
        // current={ !!~CreditPosition ? CreditPosition : 0 }
        // onAdd={ clickAddCreditOrgan }
        // onChange={ changeActiveCredit }
        // options={ CreditObjList }
        sx={{
          '& .object-list-add': {
            '& .object-list-circle': {
              bgcolor: 'rgba(24, 37, 170, 0.19)!important',
              border: '1px solid transparent!important',
              '& svg': {
                color: 'var(--mscb-primary)!important'
              }
            }
          },
        }}
      />
    }
    <Grid container spacing={ 3 } className="mt-0">
      <Grid item xl={ 3 } lg={ 3 } md={ 12 } sm={ 12 } xs={ 12 }>
        <SelectCreditInstitution
          label="6. Mã tài chính tín dụng"
          // disabled={ !CurrentCreditGroup?.credit?.length || organ === 'scb' }
          // value={ 
          //   organ === 'scb' ? 'SCB' : 
          //   CurrentCreditOrgan?.credit_institution_code 
          // }
          // onChange={ changeCredit }
          ref={ selectCreditRef }
        />
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 12 } sm={ 12 } xs={ 12 }>
        <Input
          label="7. Tên tài chính tín dụng"
          disabled
          // value={ 
          //   organ === 'scb' 
          //   ? CreditInstitution?.find(c => c.credit_institution_short_name === 'SCB')?.credit_institution_name
          //   : CurrentCreditOrgan?.credit_institution_name
          // }
        />
      </Grid>
    </Grid>
  </Box>

}

export default CICBasic;