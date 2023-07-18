import { Collapse } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import useNotify from "app/hooks/useNotify";
import { Fragment, FunctionComponent, useState } from "react";
import { BiChevronDownCircle } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";
import GroupListBase, {
  IGroupListBase
} from "views/components/layout/GroupListBase";
import SelectTypeRealEstate from "views/components/widgets/SelectTypeRealEstate";
import collateralStyle, { SxCollateralQSH } from "../style";
import Department from "./Department";
import Market from "./Market";
import OwnershipLand from "./OwnershipLand";


const TableRightToUseLand: FunctionComponent = (
) => {

  const classes = collateralStyle();
  const notify = useNotify();

  const [isSubType, setIsSubType] = useState<boolean>(false); // Check is exist subType

  const handleChangeSubtype = (subType: string) => {
    setIsSubType(true);
  };

  const toggleTable = () => {
    if (!isSubType) {
      notify("Vui lòng chọn loại", "warning");
      return;
    }
  };

  const generateSelectSubTpe = () => {
    return (
      <SelectTypeRealEstate
        className={classes.typeRealEstate}
        sx={SxCollateralQSH}
        onChange={(value) => handleChangeSubtype(value)}
      />
    );

  };

  const onHandleAddGroupList = () => {
  };

  const onHandleSelectGroupList = (value: IGroupListBase) => {
  };

  const optionGroupList: IGroupListBase[] = [{
    key: 1,
    value: '1',
    label: `BĐS1`,
    valueMoney: 1000000
  },
  {
    key: 2,
    value: '2',
    label: `BĐS2`,
    valueMoney: 2000000
  },
  {
    key: 3,
    value: '3',
    label: `BĐS3`,
    valueMoney: 3000000
  }];


  const onHandleDeleteSubType = () => {
  };

  const onHandleDeleteGroupList = (val: IGroupListBase) => {
  };

  return (
    <Fragment>
      <TableRow>
        <TableCell
          rowSpan={2}
          align="center"
          width={"2%"}
          sx={{ verticalAlign: "top", fontSize: "16px", border: "none" }}
        >
          1
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
            <IconButton onClick={onHandleDeleteSubType}>
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
          <Collapse in={true}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Grid container spacing={3}>
                      <Grid item xs={2} className={classes.groupListBase}>
                        <GroupListBase
                          className="group-list"
                          labelAdd='Thêm GCN hợp khối'
                          isDelete
                          isValueMoney={true}
                          onDelete={(val) => onHandleDeleteGroupList(val)}
                          onAdd={onHandleAddGroupList}
                          onSelected={onHandleSelectGroupList}
                          options={optionGroupList}
                          activeId={1}
                        />
                      </Grid>

                      <Grid item xs={10}>
                        <h3 color="red">DEPARTMENT</h3>
                        <Department
                          key={1}
                        />
                        <h3 color="red">Đất / nhà riêng lẻ</h3>
                        <OwnershipLand
                          key={1}
                        />
                        <h3 color="red">Sạp chợ</h3>
                        <Market
                          key={1}
                        />
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default TableRightToUseLand;
