/* eslint-disable @typescript-eslint/no-unused-vars */
import { FunctionComponent, useEffect, useRef, useState } from "react";
import Modal from 'views/components/layout/Modal';
import CloseIcon from '@mui/icons-material/Close';
import ObjectList, { ObjectListOption, ObjectListRef } from 'views/components/layout/ObjectList';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CardInside from "views/components/layout/CardInside";
import Input from 'views/components/base/Input';
import InputDate from 'views/components/base/InputDate';
import SelectLocation from "views/components/widgets/SelectLocation";
import Divider from '@mui/material/Divider';
import Radio, { RadioRef } from "views/components/base/Radio";
import { ICollateral, MODAL_NAME, OWNER_WRAPPER_NAME } from "types/models/loan/normal/storage/Collateral";
import { useDispatch, useSelector } from "react-redux";
import { getLOANNormalStorageBorrower, getLOANNormalStorageModalCoOwner, getLOANNormalStorageModalOwner } from "features/loan/normal/storage/collateral/selector";
import { ILOANNormalStorageLegalDeclareState } from "types/models/loan/normal/storage/Legal";
import { FaUserAlt } from "react-icons/fa";
import AutocompleteMultiple, { AutocompleteMultipleOption, AutocompleteMultipleRef } from "views/components/base/AutocompleteMultiple";
import { setLOANNormalCollateralUserWrapper } from "features/loan/normal/storage/collateral/action";
import useNormalLoanMessage from "app/hooks/useNormalLoanMessage";
import useNormalCollateralMessage from "app/hooks/useNormalCollateralMessage";

export interface IListUser {
  [name: string]: IUser[]
}

export interface IUser {
  key: string,
  value: ILOANNormalStorageLegalDeclareState
}

export interface IModalInformationprops {
  isOpen?: boolean;
  title?: string;
  labelTitle?: string;
  labelLengthObjectList?: string;
  enableAdd?: boolean;
  isSpouse?: boolean;
  isSelect?: boolean;
  fullData: ICollateral;
  index: number;
  typeModal: string;
  onObjectAdd?(): void;
  onObjectDelete?(): void;
  onSave?(selectType: string, index: number): void;
  onClose?(): void;
}

const ModalInformation: FunctionComponent<IModalInformationprops> = (props) => {
  const {
    title = "",
    labelTitle = "",
    labelLengthObjectList = "",
    isSpouse,
    enableAdd,
    isOpen,
    isSelect,
    fullData,
    index = 0,
    typeModal,
    onObjectAdd,
    onObjectDelete,
    onSave,
    onClose
  } = props;

  const dispatch = useDispatch();
  const _ownerData = useSelector(getLOANNormalStorageModalOwner);
  const _coOwnerData = useSelector(getLOANNormalStorageModalCoOwner);
  const _borrowerData = useSelector(getLOANNormalStorageBorrower);

  const _thirtParty = _coOwnerData;

  const [CurrentValue, setCurrentValue] = useState<number>(0);

  const userRef = useRef<AutocompleteMultipleRef>(null);
  const objectListRef = useRef<ObjectListRef>(null);
  // handle ref radio Seperate Properties
  const seperateRef = useRef<RadioRef>(null);
  const declare = ['borrower', 'marriage', 'coborrower', 'copayer', 'legalRelated', 'contact'];

  let _listUser: IListUser = {};

  //autocomple state
  const [_userItem, setUserItem] = useState<IUser[]>([]);
  // object list state
  const [owners, setOwners] = useState<IUser[]>([]);

  //current active object list user
  const [_activeUserData, setActivetUserData] = useState<IUser>();

  useEffect(() => {
    setListUser(typeModal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeModal])

  useEffect(() => {
    if ((typeModal === MODAL_NAME.SELF || typeModal === MODAL_NAME.SEPARATE_PROPERTY ) && _userItem) {
      const activeUUID = _userItem[0]?.value.basic.person_uuid ?? 0
      const currentUser = _userItem?.find(x => x.value.basic.person_uuid === activeUUID)
      currentUser && setActivetUserData(currentUser);
      currentUser && setOwners([currentUser]);
      setCurrentValue(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_userItem])

  const setListUser = (key: string) => {
    switch (key) {
      case MODAL_NAME.SELF:
        _listUser[MODAL_NAME.SELF] = [
          // {
          //   key: declare[0], value: _borrowerData
          // },
          // {
          //   key: declare[1], value: _ownerData
          // },
        ]


        break;
      case MODAL_NAME.CO_BORROWER:
        _listUser[MODAL_NAME.CO_BORROWER] = [
          {
            key: declare[0], value: _borrowerData
          },
          {
            key: declare[2], value: _coOwnerData[0].coborrower[0]
          },
          {
            key: declare[3], value: _coOwnerData[0].copayer[0]
          },
          {
            key: declare[4], value: _coOwnerData[0].legalRelated[0]
          },
          {
            key: declare[5], value: _coOwnerData[0].contact[0]
          },
        ]

        break;
      case MODAL_NAME.THIRD_PARTY:
        _listUser[MODAL_NAME.THIRD_PARTY] = [
          {
            key: declare[2], value: _thirtParty[0].coborrower[0]
          },
          {
            key: declare[3], value: _thirtParty[0].copayer[0]
          },
          {
            key: declare[4], value: _thirtParty[0].legalRelated[0]
          },
          {
            key: declare[5], value: _thirtParty[0].contact[0]
          },
        ]

        break;
      case MODAL_NAME.SEPARATE_PROPERTY:
        _listUser[MODAL_NAME.SEPARATE_PROPERTY] = [
          {
            key: declare[0], value: _borrowerData
          },
          {
            key: declare[1], value: _ownerData
          },
        ]
        break;
      default:
        break;
    }
    setUserItem(_listUser[key]?.filter(x => x.value !== undefined));
  }

  const changeUser = () => {
    let selectOwnerValue = () => userRef.current?.getValue() ?? [];
    let result: IUser[] = []

    if (selectOwnerValue().length > 0) {
      for (let so of selectOwnerValue()) {
        for (let dos of _userItem) {
          if ((dos.value.basic.person_uuid ?? "") === so.value) {
            result.push(dos)
            break;
          }
        }
      }
    }
    setOwners(result);
    setCurrentValue(result.length - 1);

  }

  const optionSelectOwnerLegal: AutocompleteMultipleOption[] = _userItem?.map(dos => ({
    label: dos.value.basic?.fullname ?? "",
    value: dos.value.basic.person_uuid ?? ""
  }))

  const optionObjectList: ObjectListOption[] = owners?.map(o =>
  ({
    label: o.value.basic.fullname.length === 0 ? <em className="text-secondary empty-name">[vui lòng chọn giấy tờ]</em> : o.value.basic.fullname,
    circle: <FaUserAlt />,
  })
  );

  const optionObjectListSpouse: ObjectListOption[] = _userItem?.map(o =>
  ({
    label: o.value.basic.fullname.length === 0 ? <em className="text-secondary empty-name">[vui lòng chọn giấy tờ]</em> : o.value.basic.fullname,
    circle: <FaUserAlt />,
  })
  );

  const changeObjectList = (index: number) => {
    setCurrentValue(index)
  }

  useEffect(() => {

    const activeUUID = (typeModal !== MODAL_NAME.SELF ? (owners[CurrentValue]?.value?.basic.person_uuid) : (_userItem[CurrentValue]?.value.basic.person_uuid));

    setActivetUserData(_userItem?.find(x => x.value.basic.person_uuid === activeUUID))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CurrentValue]);

  const tempAddress = _activeUserData?.value.address.address.find(t => t.type === "TEMP");
  const permanentAddress = _activeUserData?.value.address.address.find(t => t.type === "PERMANENT");

  const handleSave = () => {
    _activeUserData && dispatch(setLOANNormalCollateralUserWrapper(typeModal !== MODAL_NAME.SELF ? owners : _userItem ,
      { i: index, type: typeModal, name: OWNER_WRAPPER_NAME[typeModal] }));
    onSave && onSave(typeModal, index);
  }

  const handleChangeRadioSeperate = () => {
    const refVal = seperateRef.current?.getValue().value ?? declare[0];
    const selectVal = _userItem?.find(x => x.key === refVal)
    selectVal && setOwners([selectVal]);
    setCurrentValue(0);
    const activeUUID = selectVal?.value.basic.person_uuid;
    setActivetUserData(_userItem?.find(x => x.value.basic.person_uuid === activeUUID))
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      isStatic
      footer={
        <Box className="pt-2 pb-2 pr-4">
          <Button
            variant="contained"
            color="error"
            className={`mr-3`}
            style={{ borderRadius: 'unset', width: '99px' }}
            onClick={onClose}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ borderRadius: 'unset', width: '99px' }}
            onClick={handleSave}
          >
            Lưu
          </Button>
        </Box>
      }
      sx={{
        '& .MuiPaper-root': {
          minWidth: '60%',
          position: 'relative',
          borderRadius: 0,
          border: 'unset'
        },
      }}
    >
      <IconButton onClick={onClose} color="error" sx={{ position: 'absolute', right: '0.8rem', top: '0.5rem' }}>
        <CloseIcon />
      </IconButton>

      <Box>
        <Typography variant="h5" component="div" className="text-upper text-primary font-medium text-18 pb-3">
          {title}
        </Typography>

        {
          isSelect ? <Grid container className="pl-0 pb-4">
            <Grid item xl={2.5} lg={2.5} md={2.5} sm={12} xs={12}>
              <Typography component="div" className="text-14 font-medium" color={"#eb0029"}>Xin vui lòng chọn từ danh sách</Typography>
              <Typography component="div" className="text-14 font-medium" color={"#eb0029"}>Hoặc tạo người liên hệ mới </Typography>
            </Grid>
            <Grid item xl={9.5} lg={9.5} md={9.5} sm={12} xs={12}>
              <AutocompleteMultiple
                onChange={changeUser}
                ref={userRef}
                tag
                options={optionSelectOwnerLegal}
              />
            </Grid>
          </Grid> : ""
        }

        {
          isSpouse ? <Radio
            label="1. Tài sản riêng của vợ hoặc chồng"
            options={[
              {
                label: "Chính chủ",
                value: declare[0],
                checked: true
              },
              {
                label: "Người hôn phối",
                value: declare[1],
                checked: false
              }
            ]}
            ref = {seperateRef}
            onChange={handleChangeRadioSeperate}
          /> : ""
        }

        <ObjectList
          avatar
          enableAdd={false}
          enableMenu={false}
          className="mb-6"
          labelLength={`${labelLengthObjectList}: ${typeModal !== MODAL_NAME.SELF ? optionObjectList?.length : optionObjectListSpouse?.length}`}
          enableNumber={true}
          options={typeModal !== MODAL_NAME.SELF ? optionObjectList : optionObjectListSpouse}
          sx={{
            '& .object-list-label-container': {
              border: 'unset',
              display: "flex",
              alignItems: "center",
              paddingLeft: '0',

              "& .object-list-label": {
                fontSize: '12px',
                color: "#1e1d27"
              },
              "& .object-list-number": {
                display: 'none'
              }
            }
          }}
          current={CurrentValue ?? 0}
          onChange={changeObjectList}
          ref={objectListRef}
        />

        <CardInside
          title="I. Thông tin cơ bản"
          sx={{
            "& legend": {
              fontSize: '16px'
            }
          }}
        >
          <Grid container spacing={3} className="pl-4 pb-4">
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label={`1. ${labelTitle}`}
                format
                disabled={true}
                value={_activeUserData?.value.basic.fullname}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <InputDate
                label="2. Ngày sinh"
                disabled={true}
                value={_activeUserData?.value.basic.birthday}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="3. Số điện thoại di động"
                disabled={true}
                value={_activeUserData?.value.basic.mobile}
              />
            </Grid>
          </Grid>
        </CardInside>

        <CardInside
          title="II. Giấy tờ định danh"
          sx={{
            "& legend": {
              fontSize: '16px'
            }
          }}
        >
          <Grid container spacing={3} className="pl-4 pb-4">
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                type="number"
                label="1. Số CMND/CCCD/Hộ chiếu"
                required
                disabled={true}
                value={_activeUserData?.value.identity.find(i => i.primaryFlag === true)?.num ?? ''}
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <InputDate
                label="2. Ngày cấp"
                disabled={true}
                value={_activeUserData?.value.identity.find(i => i.primaryFlag === true)?.issuedDate}
                required
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <InputDate
                label="3. Ngày hết hạn"
                value={_activeUserData?.value.identity.find(i => i.primaryFlag === true)?.expiredDate}
                disabled={true}
                required
              />
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
              <Input
                label="4. Nơi cấp"
                disabled={true}
                value={_activeUserData?.value.identity.find(i => i.primaryFlag === true)?.placeOfIssue ?? ''}
                required
              />
            </Grid>
          </Grid>
        </CardInside>

        <CardInside
          title="III. Thông tin địa chỉ"
          sx={{
            "& legend": {
              fontSize: '16px'
            }
          }}
        >
          <Grid container spacing={3} className="pl-4 pb-4">
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <SelectLocation
                col={3}
                before={
                  <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                    <Input
                      label="1. Địa chỉ thường trú"
                      format
                      disabled={true}
                      required
                      value={permanentAddress?.apartment ?? ''}
                    />
                  </Grid>
                }
                label={[
                  '2. Tỉnh/TP',
                  '3. Quận/huyện',
                  '4. Phường/xã'
                ]}
                value={{
                  country: 'VN',
                  province: permanentAddress?.province ?? '',
                  district: permanentAddress?.district ?? '',
                  ward: permanentAddress?.ward ?? '',
                }}
                disabled={true}
              />
            </Grid>

            <Grid item xl={12} md={12} xs={12}>
              <Divider />
            </Grid>

            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <SelectLocation
                col={3}
                before={
                  <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
                    <Input
                      label="1. Địa chỉ thường trú"
                      format
                      disabled={true}
                      required
                      value={tempAddress?.apartment ?? ''}
                    />
                  </Grid>
                }
                label={[
                  '2. Tỉnh/TP',
                  '3. Quận/huyện',
                  '4. Phường/xã'
                ]}
                value={{
                  country: 'VN',
                  province: tempAddress?.province ?? '',
                  district: tempAddress?.district ?? '',
                  ward: tempAddress?.ward ?? '',
                }}
                disabled={true}

              />
            </Grid>
          </Grid>
        </CardInside>

      </Box>
    </Modal>
  )
}

export default ModalInformation;