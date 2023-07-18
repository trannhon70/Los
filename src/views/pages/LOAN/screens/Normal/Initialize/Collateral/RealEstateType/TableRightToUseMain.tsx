import { Collapse } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import useNotify from "app/hooks/useNotify";
import clsx from 'clsx';
import {
  addCollaretalRPRO,
  deleleteItem,
  deleleteSubItem,
  onChangeCollaretalRPRO, setChildSubType, setCollapseSubType,
  setSubType
} from "features/loan/normal/storage/collateralV2/actions";
import {
  ESubtypeRest,
  ETypeCollateral
} from "features/loan/normal/storage/collateralV2/case";
import {
  getLOANNormalCollapseSubType,
  getLoanNormalSubTypeByUUIDData,
  getLoanNormalSubTypeItems,
  getLoanNormalSubTypeItemsActive
} from "features/loan/normal/storage/collateralV2/selector";
import {
  Fragment, FunctionComponent, useEffect,
  useState
} from "react";
import { BiChevronDownCircle } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  ILOANNormalCollateralData,
  ISubItems,
  ISubtype
} from "types/models/loan/normal/storage/CollaretalV2";
import { formatNumber } from "utils";
import Empty from "views/components/layout/Empty";
import GroupListBase, {
  IGroupListBase
} from "views/components/layout/GroupListBase";
import ModalConfirm from "views/components/layout/ModalConfirm";
import SelectTypeRealEstate from "views/components/widgets/SelectTypeRealEstate";
import { SxCollateralQSH } from "views/pages/LOAN/screens/Card/Initialize/Collateral/style";
import {
  TTypeCollateralChildRestMark,
  TypeCollateralChildRestAppa,
  TypeCollateralChildRestLand
} from "views/pages/LOAN/utils";
import collateralStyle from "../style";
import Department from "./Department";
import Market from "./Market";
import OwnershipLand from "./OwnershipLand";
export interface TableRightToUseLandProps {
  type?: string;
  keyIndex?: string;
  subTypeData?: ISubtype;
  collateral?: ILOANNormalCollateralData;
}

const TableRightToUseLand: FunctionComponent<TableRightToUseLandProps> = (
  props
) => {
  const { type = "", keyIndex, subTypeData, collateral } = props;

  const classes = collateralStyle();
  const dispatch = useDispatch();
  const notify = useNotify();

  const uuidActiveData = collateral?.uuidActiveData ?? "";
  const uuidActiveSubtype = subTypeData?.uuidActiveSubtype ?? "";

  const SubTypeItems =
    useSelector(getLoanNormalSubTypeItems(uuidActiveData, uuidActiveSubtype)) ??
    [];

  const SubType =
    useSelector(getLoanNormalSubTypeByUUIDData(uuidActiveData)) ?? [];

  const SubTypeItemsActive = useSelector(
    getLoanNormalSubTypeItemsActive(uuidActiveData, uuidActiveSubtype)
  );
  const isCollapSubType = useSelector(
    getLOANNormalCollapseSubType(uuidActiveData, uuidActiveSubtype)
  );

  const [isSubType, setIsSubType] = useState<boolean>(false); // Check is exist subType

  const [isModalConfirm, setIsModalConfirm] = useState<boolean>(false);
  const [isModalSubConfirm, setIsModalSubConfirm] = useState<boolean>(false);


  const [uuidItem, setUuidItem] = useState<string>(); // Check is exist subType



  useEffect(() => {
    if (subTypeData && subTypeData.id) {
      setIsSubType(true);
    }
  }, [subTypeData]);

  const handleChangeSubtype = (childType: string) => {
    // let isRest = TypeCollateralChildRestLand.indexOf("");
    let subType: string = "";
    
    /**
     * Check child type 
     * Return Sub Type
     * 
     */
    if (TypeCollateralChildRestLand.indexOf(childType) >= 0){
      subType = ESubtypeRest.LAND
    } 
    else if (TypeCollateralChildRestAppa.indexOf(childType) >= 0){
      subType = ESubtypeRest.APPA
    }
    else if (TTypeCollateralChildRestMark.indexOf(childType) >= 0){
      subType = ESubtypeRest.MARK
    }

    setTimeout(() => {
      setIsSubType(true);
      dispatch(
        setSubType(subType, {
          uuidSubType: uuidActiveSubtype,
          uuidData: uuidActiveData,
        })
      );
  
      dispatch(
        setChildSubType(childType, {
          uuidSubType: uuidActiveSubtype,
          uuidData: uuidActiveData,
        })
      )
      
      dispatch(
        setCollapseSubType(uuidActiveData, {
          uuidSubTypeActive: uuidActiveSubtype,
        })
      );
    }, 0.3)
  };

  const toggleTable = () => {
    if (!isSubType) {
      notify("Vui lòng chọn loại", "warning");
      return;
    }
    setTimeout(() => {
      dispatch(
        setCollapseSubType(uuidActiveData, {
          uuidSubTypeActive: uuidActiveSubtype,
        })
      );
    }, 0.2)
  };

  const generateSelectSubTpe = () => {
    switch (type) {
      case ETypeCollateral.REST:
        return (
          <SelectTypeRealEstate
            className={clsx(classes.typeRealEstate)}
            value={subTypeData?.child_sub_type ?? ""}
            sx={ SxCollateralQSH }
            onChange={(value) => handleChangeSubtype(value)}
            disabled={ !subTypeData ? false : (subTypeData?.child_sub_type?.length > 0 ? true : false)}
          />
        );
      default:
        return "";
    }
  };

  const onHandleAddGroupList = () => {
    // dispatch(
    //   // addCollaretalRPRO("", {
    //   //   uuid: collateral?.uuidActiveData ?? "",
    //   //   uuidActive: subTypeData?.uuidActiveSubtype ?? "",
    //   // })
    // );
  };

  const onHandleSelectGroupList = (value: IGroupListBase) => {
    const current = +value.key - 1;
    const currentActive = SubTypeItems[current].activeUUID ?? "";
    dispatch(
      onChangeCollaretalRPRO(currentActive, {
        uuid: collateral?.uuidActiveData ?? "",
        uuidActive: subTypeData?.uuidActiveSubtype ?? "",
      })
    );
  };

  const totalValueMoney = (sty: ISubItems): number => {
    let subTypeId = SubType.find(s => s.uuidActiveSubtype === uuidActiveSubtype)?.id ?? "";
    let total: Number = 0;
    if (ESubtypeRest.LAND === subTypeId){
      total =  Number(sty?.land.land_wrapper?.value_of_land ?? 0) +
            Number (sty?.ctxd_land?.ctx_land_wrapper?.value_of_land ?? 0) +
            Number(sty?.ctxd_gcn_qsh?.ctxd_gcn_qsh_data?.map(
            gcn => gcn?.ctxd_gcn_qsh_land_info?.ctx_land_wrapper?.value_of_land ?? 0)
              .reduce((a, b) => (a ?? 0) + (b ?? 0), 0) ?? 0)
    }
    else if ( ESubtypeRest.MARK === subTypeId){
      total = Number(sty?.market?.maket_wrapper?.value_of_land ?? 0)
    }
    else if ( ESubtypeRest.APPA === subTypeId){
      total = Number(sty?.department?.department_wrapper?.value_of_land ?? 0)
    }
    else {
      total = 0
    }

    return Number(total);
  }

  const optionGroupList: IGroupListBase[] = SubTypeItems
    ? SubTypeItems?.map((sty, index) => ({
        key: index + 1,
        value: sty.activeUUID,
        label: `BĐS${index + 1}`,
        valueMoney: formatNumber(totalValueMoney(sty).toString())
      }))
    : [];
    
  const onHandleDeleteSubType = () => {
    dispatch(deleleteSubItem(subTypeData?.uuidActiveSubtype ?? "", { uuidData: subTypeData?.uuidActiveSubtype ?? "" }))
    notify("Xóa thành công","success")
    onHandleCancelSubConfirm()
  };

  const onHandleDeleteGroupList = (val: IGroupListBase) => {
    setUuidItem(val.value.toString()) ;
    setIsModalConfirm(!isModalConfirm);
  };
  const onHandleOpenModalSub = () =>{
    setIsModalSubConfirm(!isModalSubConfirm);
  }

const onHandleCancelConfirm = () => {
  setIsModalConfirm(!isModalConfirm);
}
const onHandleCancelSubConfirm = () => {
  setIsModalSubConfirm(!isModalSubConfirm);
}
const onHandleConfirm = () => {
  dispatch(
    deleleteItem(uuidItem ?? '', {
      uuidData: uuidActiveData,
      uuidSubType: uuidActiveSubtype,
    })
  );
  setIsModalConfirm(!isModalConfirm);
}


  return (
    <Fragment>
      <TableRow>
        <TableCell
          rowSpan={2}
          align="center"
          width={"2%"}
          sx={{ verticalAlign: "top", fontSize: "16px", border: "none" }}
        >
          {keyIndex}
        </TableCell>

        <TableCell width={"20%"}>{generateSelectSubTpe()}</TableCell>

        <TableCell></TableCell>
        <TableCell className="pl-4"></TableCell>
        <TableCell
          className="text-right pr-0 py-2"
          width="140px"
          sx={{ "& svg": { color: "var(--mscb-primary)" } }}
        >
          <Box>
            <IconButton onClick={onHandleOpenModalSub}>
              <IoTrashOutline style={{ fontSize: "1.5rem" }} />
            </IconButton>
            <IconButton onClick={toggleTable}>
              <BiChevronDownCircle style={{ fontSize: "1.5rem" }} />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={5} className="p-0" sx={{ border: "none" }}>
          <Collapse in={isCollapSubType} unmountOnExit>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Grid container spacing={3}>
                      <Grid item xs={1.9} className={classes.groupListBase}>
                        <GroupListBase
                          className="group-list"
                          labelAdd='Thêm GCN hợp khối'
                          isDelete
                          isValueMoney={true}
                          onDelete={(val) => onHandleDeleteGroupList(val)}
                          onAdd={onHandleAddGroupList}
                          onSelected={onHandleSelectGroupList}
                          options={optionGroupList}
                          activeId={
                            (SubTypeItems?.findIndex(
                              (d) => d.activeUUID === SubTypeItemsActive
                            ) ?? 0) + 1
                          }
                        />
                      </Grid>
                      <Grid item xs={10.1}>
                        {SubTypeItems.length === 0 ? (
                          <Empty>Không có dữ liệu hiển thị</Empty>
                        ) : (
                          SubType?.map((item, index) => {
                            if (item.id === ESubtypeRest.APPA) {
                              return (
                                <Department
                                  key={index}
                                  uuIdSubType={
                                    subTypeData?.uuidActiveSubtype ?? ""
                                  }
                                  collateral={collateral}
                                />
                              );
                            } else if (item.id === ESubtypeRest.LAND ) {
                              return (
                                <OwnershipLand
                                  uuIdSubType={
                                    subTypeData?.uuidActiveSubtype ?? ""
                                  }
                                  collateral={collateral}
                                  key={index}
                                />
                              );
                            } else if (item.id === ESubtypeRest.MARK) {
                              return (
                                <Market
                                  uuIdSubType={
                                    subTypeData?.uuidActiveSubtype ?? ""
                                  }
                                  collateral={collateral}
                                  key={index}
                                />
                              );
                            } else {
                              return null;
                            }
                          })
                        )}
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
      <ModalConfirm
        open={isModalConfirm}
        children="Bạn có chắc chắn muốn xóa GCN hợp khối này"
        labelConfirm="Xác nhận"
        labelCancel="Hủy"
        onClose={onHandleCancelConfirm}
        onConfirm={onHandleConfirm}
      />
       <ModalConfirm
        open={isModalSubConfirm}
        children="Bạn có chắc chắn muốn xóa"
        labelConfirm="Xác nhận"
        labelCancel="Hủy"
        onClose={onHandleCancelSubConfirm}
        onConfirm={onHandleDeleteSubType}
      />
    </Fragment>
  );
};

export default TableRightToUseLand;
