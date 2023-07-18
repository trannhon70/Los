import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, FormControlLabel, Grid, IconButton, styled, Switch, SwitchProps } from "@mui/material";
import useMasterData from "app/hooks/useMasterData";
import useNormalCICMessage from "app/hooks/useNormalCICMessage";
import useNotify from "app/hooks/useNotify";
import clsx from 'clsx';
import {
  addCICCreditOrgan, deleteAllCreditCIC, deleteCreditCIC, generateEmptyCreditSCB, setCICCreditActive,
  setCICCreditOrgan,
  setCICDebtGroup,
  setCICDeclarePosition,
  setCICIdentityActive,
  setHasCreditCIC
} from "features/loan/normal/storage/cic/actions";
import {
  getAttachmentCountCIC, getCheckHasNonCreditFile, getCurrentListIdentity,
  getDeclareData
} from "features/loan/normal/storage/cic/selectors";
import { generateTypeParams } from "features/loan/normal/storageGuide/generateTypeStateGuide";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { RiBankFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { ILOANURLParams } from "types/models/loan";
import {
  ICICDeclareAttachmentCount,
  ILOANNormalAllCreditDeleteInfo,
  ILOANNormalCreditDeleteInfo, ILOANNormalStorageCICDeclareDataDetail, ILOANNormalStorageCICOther
} from "types/models/loan/normal/storage/CIC";
import Input from "views/components/base/Input";
import Select from "views/components/base/Select";
import ModalAlert from "views/components/layout/ModalAlert";
import ModalConfirm from "views/components/layout/ModalConfirm";
import ObjectList, {
  ObjectListMenuItem
} from "views/components/layout/ObjectList";
import SelectDebtClassification from "views/components/widgets/SelectDebtClassification";
import SelectCreditInstitution, { SelectCreditInstitutionRef } from "views/components/widgets/SelectNoneSCBCreditInstitution";
import AttachmentModalCIC from "views/pages/LOAN/widgets/AttachmentCIC";
import CollaretalInfo from "../CollaretalInfo";
import CreditCard from "../CreditCard";
import CreditScoreInfoAB from "../CreditScoreInfoAB";
import ListDataIdentity from "../ListIdentity/ListDataIdentity";
import NormalLoan from "../NormalLoan";
import basicInfoStyle, { UserListSx } from "./style";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 36,
  height: 20,
  padding: 0,
  '& .MuiButtonBase-root:first-of-type':{
    marginLeft: 1
  },
  '& .MuiSwitch-switchBase': {
    padding: 1,
    margin: 1,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(14px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#069549',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 16,
    height: 16,
  },
  '& .MuiSwitch-track': {
    borderRadius: 20 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

interface BasicInfoProps {
  enableList?: boolean;
}

const MainPage: FC<BasicInfoProps> = (props) => {
  const { enableList } = props;

  const [deleteCredit, setDeleteCredit] = useState<ILOANNormalCreditDeleteInfo | null>(null);
  const [deleteAllCredit, setDeleteAllCredit] = useState<ILOANNormalAllCreditDeleteInfo | null>(null);

  const [warningBeforeAddCredit,setOpenModalWarningBeforeAddCredit] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState(false);
  const [openAttachModal,setOpenAttachModal] = useState<{
    open:boolean,
    declare:string,
    uuid:string
  }>({
    open:false,
    declare:'',
    uuid:'',
  });

  const classes = basicInfoStyle();
  const dispatch = useDispatch();
  const params = useParams() as unknown as ILOANURLParams;
  const getMessage =  useNormalCICMessage();
  const { CifIfType, CreditInstitution, register } = useMasterData();
    
  useEffect(() => {
    register('cifIfType')
    register('creditInstitution')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const notify = useNotify()
  const organ = params.organ as keyof ILOANNormalStorageCICOther;
  const declare = params.declare ;
  const getAttachmentCount = useSelector(getAttachmentCountCIC(organ))
  const selectCreditRef = useRef<SelectCreditInstitutionRef>(null)
  const ruleDisabled = useSelector(getRuleDisbled)
  const checkHasNonCreditFile = useSelector(getCheckHasNonCreditFile)
  const DeclareData = useSelector(getDeclareData)
  const dataPosition = generateTypeParams(`cic/${organ}/${declare}`) ?? ""

  const titleMain = () => {
    switch (declare) {
      case "borrower":
        return "Người vay";

      case "marriage":
        return "Người hôn phối";

      case "co-brw":
        return "Người đồng vay";

      case "co-payer":
        return "Người đồng trả nợ";

      case "law-rlt":
        return "Người liên quan";

      case "other":
        return "Đối tượng khác";
    }
  };
  const arrangeIdentity = (listIden? : ILOANNormalStorageCICDeclareDataDetail[]) => {
    if(listIden){
      return [...listIden.filter(e => e.is_primary), ...listIden.filter(e => !e.is_primary)]
    }
    else return []
  }
  const currentUserData = DeclareData?.data?.find(person => person.person_uuid === DeclareData.position) ?? null;
  
  const identityOptions = arrangeIdentity(currentUserData?.data)?.map(iden => ({
    value: iden.uuid,
    label: `${CifIfType.find(e => e.code === iden.identity_type)?.name} - ${iden.identity_num}` ?? iden.identity_num
  })) ?? []
  
  const currentIdentityData = currentUserData?.data.find(iden => iden.uuid === currentUserData.identityActive) ?? null
  const creditOptions = currentIdentityData?.credit.map(credit => ({
    label: CreditInstitution?.find((ci) => ci.code === credit.code)
      ?.short_name ?? (
      <em className="text-secondary text-lower pr-1 font-normal">
        [Chưa chọn <em className="text-upper">TCTD</em>]
      </em>
    ),
    circle: <RiBankFill />,
  })) ?? []
  
  const currentPersonIndex = DeclareData?.data?.findIndex((person) => person?.person_uuid === DeclareData?.position) !== -1 ?
                                DeclareData?.data?.findIndex((person) => person?.person_uuid === DeclareData?.position) : 0

  const currentCreditIndex = currentIdentityData?.credit?.findIndex((credit) => credit.uuid === currentIdentityData.activeCredit) !== -1 ?
                              currentIdentityData?.credit?.findIndex((credit) => credit.uuid === currentIdentityData.activeCredit) : 0

  const UserListIdentity = useSelector(getCurrentListIdentity)
  
  const currentCredit = currentIdentityData?.credit.find(credit => credit.uuid === currentIdentityData.activeCredit) ?? null
  // change user
  const handleChangePersonActive = (current: number) => {
    const nextUuid: string = DeclareData?.data[current]?.person_uuid ?? '';
    dispatch(setCICDeclarePosition(nextUuid, { organActive: organ , declareActive: declare ?? '' }))
  };

  // change identity main CIC
  const changeIdentity = (value: string) => {
    dispatch(setCICIdentityActive(value))
  };

  // change height debit group main CIC
  const handleChangeDebtGroup = (value: string) => {
    value && dispatch(setCICDebtGroup(value, organ));
  };

  // add new TCTD
  const handleAddCredit = () => {
    dispatch(addCICCreditOrgan(organ));
  };

  // change TCTD
  const changeActiveCredit = (current: number) => {
    const creditUuid: string = currentIdentityData?.credit[current]?.uuid ?? ''
    dispatch(setCICCreditActive(creditUuid, organ));
  };

  // change TCTD credit code
  const handleChangeCredit = (value: string) => {
    if(currentIdentityData?.credit.filter(c => c.code !== "").find(e => e.code === value)){
      // selectCreditRef.current?.setValue("")
      notify("Tổ chức tín dụng đã tồn tại", "warning")
      if(selectCreditRef.current?.getValue() !== ""){
        selectCreditRef.current?.setValue("")
      }
    }else {
      dispatch(setCICCreditOrgan(value, organ));
    }
  };

  //#region calculator total collateral and total loan
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const onCloseDeleteCredit = () => setDeleteCredit(null);

  const onConfirmDeleteCredit = async () => {
    if(deleteCredit){
      dispatch(deleteCreditCIC("",deleteCredit));
    }
    onCloseDeleteCredit();
  };

  const handleDeleteCredit = (menu: ObjectListMenuItem, position: number) => {
    let dataDelete = currentIdentityData?.credit[position]
    if (menu.value === "delete" && dataDelete) {
      setDeleteCredit({
        organ: organ,
        declare: declare ?? '',
        personUuid : currentUserData?.person_uuid ?? '',
        identityNum: currentIdentityData?.identity_num ?? '',
        creditUuid: dataDelete.uuid,
        creditId: dataDelete.id,
        index: position,
        position: dataPosition
      });
    }
  };

  const handleChangeDisableFormSCB = () => {
    if(!currentIdentityData?.credit.length){
      if(!!checkHasNonCreditFile){
        setOpenModalWarningBeforeAddCredit(true)
      }
      else {
        dispatch(generateEmptyCreditSCB())

      }
    } else {
      let dataDelete = currentIdentityData?.credit[0]
      setDeleteCredit({
        organ: organ,
        declare: declare ?? '',
        personUuid : currentUserData?.person_uuid ?? '',
        identityNum: currentIdentityData?.identity_num ?? '',
        creditUuid: dataDelete.uuid,
        creditId: dataDelete.id,
        index: 0,
        position: dataPosition
      });
    }
  }
  const handleChangeDisableFormOther = () => {
    if(!!currentIdentityData?.hasCredit){
      setDeleteAllCredit({
        organ: organ,
        declare: declare ?? '',
        personUuid : currentUserData?.person_uuid ?? '',
        identityNum: currentIdentityData?.uuid ?? '',
      });
    }
    else {
      if(!!checkHasNonCreditFile){
        setOpenModalWarningBeforeAddCredit(true)
      }
      else dispatch(setHasCreditCIC(true, organ))
    }
  }

  const onCloseDeleteAllCredit = () => setDeleteAllCredit(null);

  const onConfirmDeleteAllCredit = async () => {
    if(deleteAllCredit){
      dispatch(deleteAllCreditCIC("",deleteAllCredit));
    }
    onCloseDeleteAllCredit();
  };

  // const countAttachFile = (uuid:string)=>{
  //   const currentUser = DeclareData?.data?.find(it=>it.person_uuid === uuid);
  //   const document_info_list = _.get(currentUser,'document_info_list',[]);
  //   let count = 0;
  //   document_info_list?.forEach(parentDoc=>{
  //     parentDoc?.document_list?.forEach(doc=>{
  //       count += doc?.document_child_files?.filter(file=>!file.uuid.includes(PREFIX_LOCAL))?.length ?? 0;
  //     })
  //   })
  //   return count;
  // }
  const convertDeclaretoKey = declare?.replace("-", "_") ?? ""

  const optionsListData = useMemo(()=> DeclareData?.data?.map((d) => ({
    label: d?.full_name,
    circle: <AccountCircleIcon />,
    attachment: getAttachmentCount[convertDeclaretoKey as keyof ICICDeclareAttachmentCount]?.find(per => per.uuid === d.person_uuid)?.count ?? 0,
    value:`${declare}<PREFIX>${d?.person_uuid}`
  // eslint-disable-next-line react-hooks/exhaustive-deps
  })),[DeclareData]);

  const handleOpenAttach=(index:number)=>{
    if(!optionsListData[index]) return;
    const {value = ''} = optionsListData[index];
    const [declarePerson = '', personUuid = '' ] = value.split("<PREFIX>");
    setOpenAttachModal({open:true,declare:declarePerson,uuid:personUuid});
  }

  return (
    <div className="pt-5">
      {!enableList && DeclareData?.data?.length > 0 && (
        <ObjectList
          labelLength={`Chọn người ${titleMain()}`}
          options={optionsListData}
          enableAdd={false}
          className={`${classes.userListClass} mb-6 `}
          menuWidth="110px"
          enableMenu={false}
          current={currentPersonIndex}
          onChange={handleChangePersonActive}
          attachLabel="tập tin"
          onAttach={handleOpenAttach}
          sx={UserListSx}
        />
      )}
      <i className="tio-square fa-xs" style={{ color: '#1825aa' }}></i>
      <span className={classes.title}>THÔNG TIN CƠ BẢN</span>
      <Grid
        container
        columnSpacing="20"
        rowSpacing="20"
        className={classes.root}
      >
        <Grid item xl={12} md={12} xs={12}>
          <Grid
            container
            className={`basicInfo`}
            columnSpacing="20"
            rowSpacing="20"
          >
            <Grid item className={classes.inputLabel} md={12} xs={12}>
              <Input
                className="text-upper"
                label={`1. ${titleMain()}`}
                disabled
                value={currentUserData?.full_name.toUpperCase()}
              />
            </Grid>
            <Grid item className={classes.relative} md={12} xs={12}>
              <IconButton onClick={handleOpenModal} sx={{ zIndex: '1000' , fontSize: 14}}>
                <i className="fas fa-id-card text-danger fa-xs" />
              </IconButton>
              <Select
                label="2. Giấy tờ định danh"
                value={currentUserData?.identityActive}
                options={identityOptions}
                onChange={(value: string) => changeIdentity(value)}
              />
            </Grid>
            <Grid
              item
              className={clsx(classes.inputLabel, classes.disabledTextError)}
              md={12}
              xs={12}
            >
              <Input
                label="3. Tổng dư nợ (VND)"
                disabled
                type="number"
                format
                value={currentIdentityData?.totalLoan?.toString() ?? '0'}
              />
            </Grid>
            <Grid
              item
              className={clsx(classes.inputLabel, classes.disabledTextError)}
              md={12}
              xs={12}
            >
              <Input
                label="4. Tổng giá trị TSBĐ (VND)"
                format
                type="number"
                disabled
                value={currentIdentityData?.totalCollateral?.toString() ?? '0'}
              />
            </Grid>
            <Grid item className={classes.inputLabel} md={12} xs={12}>
              <SelectDebtClassification
                label="5. Nhóm nợ cao nhất"
                required={!!currentIdentityData && currentIdentityData?.credit?.length > 0}
                onChange={handleChangeDebtGroup}
                disabled={ruleDisabled}
                value={currentIdentityData?.debtGroup}
                message={getMessage('debtGroup', {
                  identity: currentIdentityData?.uuid ?? '',
                })}
              />
            </Grid>
          </Grid>
        </Grid>
        {organ === 'other' && (
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <FormControlLabel
              style={{ marginLeft: '-5px' }}
              control={<IOSSwitch sx={{ m: 1 }} />}
              label="Có quan hệ tín dụng tại các TCTD"
              checked={!!currentIdentityData?.hasCredit}
              disabled={ruleDisabled}
              onChange={handleChangeDisableFormOther}
              sx={{
                '& .MuiTypography-root': {
                  fontWeight: 500,
                  fontSize: 'var(--mscb-fontsize)',
                  color: 'var(--mscb-secondary) !important',
                  letterSpacing: '0.00938em',
                },
              }}
            />
            <ObjectList
              labelLength="Số lượng TCTD:"
              options={creditOptions}
              current={currentCreditIndex}
              onAdd={handleAddCredit}
              onChange={changeActiveCredit}
              enableMenu={!ruleDisabled}
              enableAdd={!ruleDisabled && !!currentIdentityData?.hasCredit}
              className={classes.listCredit}
              menuWidth="110px"
              menu={[{ value: 'delete', label: 'Xoá' }]}
              onClickMenu={handleDeleteCredit}
            />
          </Grid>
        )}
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12} className={classes.inputLabel} >
          {organ === 'scb' ? (
            <Input
              label="6. Tên tổ chức tín dụng"
              required
              disabled
              value={`${CreditInstitution.find(e => e.id === '106')?.code} - ${CreditInstitution.find(e => e.id === '106')?.name}`}
            />
          ) : (
            <SelectCreditInstitution
              label="6. Tên tổ chức tín dụng"
              ref={selectCreditRef}
              required
              disabled={!currentIdentityData?.credit?.length || ruleDisabled}
              value={currentCredit?.code}
              onChange={handleChangeCredit}
              message={getMessage('creditCode', {
                identity: currentIdentityData?.uuid ?? '',
                credit: currentCredit?.uuid ?? '',
              })}
            />
          )}
        </Grid>
        <Grid item xl={3} lg={12} md={12} sm={12} xs={12} className={classes.inputLabel} >
          <Input
            label="7. Mã tổ chức tín dụng"
            disabled
            value={
              organ === 'scb'
                ? CreditInstitution?.find((c) => c.short_name === 'SCB')?.code
                : currentCredit?.code
            }
          />
        </Grid>
        <Grid item xl={12} md={12} xs={12}>
          <i className="tio-square fa-xs" style={{ color: '#1825aa' }}></i>
          <span className={classes.title}>THÔNG TIN CHI TIẾT</span>
          <Box component="div">
            {organ === 'scb' && (
              <FormControlLabel
                style={{ marginLeft: '-5px' }}
                control={<IOSSwitch sx={{ m: 1 }} />}
                label="Có quan hệ tín dụng tại SCB"
                checked={!!currentIdentityData?.credit?.length}
                disabled={ruleDisabled}
                onChange={handleChangeDisableFormSCB}
                sx={{
                  '& .MuiTypography-root': {
                    fontWeight: 500,
                    fontSize: 'var(--mscb-fontsize)',
                    color: 'var(--mscb-secondary) !important',
                    letterSpacing: '0.00938em',
                  },
                }}
              />
            )}
          </Box>
          <Grid
            container
            rowSpacing="10px"
            columnSpacing="20px"
            className={`${classes.detailInfoWrap} mt-0`}
          >
            <Grid item xl={4} md={12} xs={12} >
              <NormalLoan />
            </Grid>
            <Grid item xl={4} md={12} xs={12} >
              <CreditCard />
            </Grid>
            <Grid item xl={4} md={12} xs={12} >
              <CollaretalInfo />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={12} md={12} xs={12}>
          <i className="tio-square fa-xs" style={{ color: '#1825aa' }}></i>
          <span className={classes.title}>THÔNG TIN ĐIỂM TÍN DỤNG</span>
          <CreditScoreInfoAB
            titleCard="Rủi ro tín dụng"
            // disabled={isDisableForm}
            declare={declare}
          />
        </Grid>
      </Grid>
      <ListDataIdentity
        open={openModal}
        onClose={handleOpenModal}
        dataIdentity={UserListIdentity}
      />
      <ModalConfirm
        open={deleteCredit !== null}
        onClose={onCloseDeleteCredit}
        onConfirm={onConfirmDeleteCredit}
      >
        <Box className="text-18 font-medium text-primary text-center">
          {`Bạn có chắc muốn xoá TCTD ${organ === 'scb' ? 'SCB' : ''} này ?`}
        </Box>
        <Box className="text-center">
          {`Các thông tin của TCTD ${
            organ === 'scb' ? 'SCB' : ''
          } này sẽ mất hoàn toàn!`}
        </Box>
      </ModalConfirm>
      <ModalConfirm
        open={deleteAllCredit !== null}
        onClose={onCloseDeleteAllCredit}
        onConfirm={onConfirmDeleteAllCredit}
      >
        <Box className="text-18 font-medium text-primary text-center">
          {`Bạn có chắc thay đổi thông tin này ?`}
        </Box>
        <Box className="text-center">
          {`Các thông tin TCTD của Giấy tờ định danh này sẽ mất hoàn toàn!`}
        </Box>
      </ModalConfirm>
      <ModalAlert 
        open={warningBeforeAddCredit}
        onClose={() => setOpenModalWarningBeforeAddCredit(false)}
        message="Thông tin KH đã xác nhận không có dữ liệu CIC, đề nghị xoá hồ sơ CIC đã nhập trước khi thay đổi"
      />
      {openAttachModal.open && (
        <AttachmentModalCIC
          open={openAttachModal.open}
          onClose={() =>
            setOpenAttachModal({ open: false, declare: '', uuid: '' })
          }
          uuidActive={openAttachModal.uuid}
          declareType={openAttachModal.declare}
          position={dataPosition}
        />
      )}
    </div>
  );
};

export default MainPage;