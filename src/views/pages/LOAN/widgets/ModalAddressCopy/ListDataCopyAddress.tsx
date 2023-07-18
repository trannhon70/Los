import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import useMasterData from "app/hooks/useMasterData";
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { ILOANNormalStorageAddress } from "types/models/loan/normal/storage/Legal";
import { generateUUID, intToRoman } from "utils";
import Empty from "views/components/layout/Empty";
import TableSticky from "views/components/layout/TableSticky";
import useStorage from "../../screens/Normal/Initialize/Legal/useStorage";
import { getRuleDisbled } from "features/loan/normal/storageGuide/selector";
import { useSelector } from "react-redux";

export interface IListDataAddressProps {
  dataAdress: ILOANNormalStorageAddress[];
  onChanePrimary?(val: any): void;
  isOpen?: boolean;
}

const ListDataCopyAddress: FunctionComponent<IListDataAddressProps> = (
  props
) => {
  const { onChanePrimary, isOpen } = props;
  const { Province, District, Ward, register } = useMasterData();

  const [checked, setChecked] = useState<string>("");
  const ruleDisabled = useSelector(getRuleDisbled)

  const clickPrimary = (data: any) => {
    onChanePrimary && onChanePrimary(data);
    setChecked(data.uuid);
  };

  const MappingListAddress: Record<string, ILOANNormalStorageAddress[]> = {};
  const nameDeclare = [
    {
      type: "BORROWER",
      name: "NGƯỜI VAY",
      id:"BORROWER_COPY_ADDRESS",
    },
    {
      type: "MARRIAGE",
      name: "NGƯỜI HÔN PHỐI",
      id:"MARRIAGE_COPY_ADDRESS",
    },
    {
      type: "CO_BRW",
      name: "NGƯỜI ĐỒNG VAY",
      id:"CO_BRW_COPY_ADDRESS",
    },
    {
      type: "CO_PAYER",
      name: "NGƯỜI ĐỒNG TRẢ NỢ",
      id:"CO_PAYER_COPY_ADDRESS",
    },
    {
      type: "LAW_RLT",
      name: "NGƯỜI LIÊN QUAN THEO QĐPL",
      id: "LAW_RLT_COPY_ADDRESS",
    },
    {
      type: "RELATED",
      name: "NGƯỜI LIÊN HỆ",
      id: "RELATED_COPY_ADDRESS",
    },
    {
      type: "OTHER",
      name: "ĐỐI TƯỢNG KHÁC",
      id: "OTHER_COPY_ADDRESS",
    },
  ];
  const { allAddress } = useStorage("BORROWER");
  const { AllAddressCopy } = useStorage("BORROWER");
  useEffect(() => {
    if (isOpen) {
      for (let i = 0; i < AllAddressCopy.length; i++) {
        for (let j = 0; j < AllAddressCopy[i].address.length; j++) {
          register("district", AllAddressCopy[i].address[j].province);
          register("ward", AllAddressCopy[i].address[j].district);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AllAddressCopy, isOpen]);

  allAddress.forEach((address) => {
    if (!MappingListAddress[address.type]) {
      MappingListAddress[address.type] = [address];
    } else {
      MappingListAddress[address.type].push(address);
    }
  });

  const emtyLayout = () => {
    return (
      <TableRow>
        <TableCell colSpan={7}>
          <Empty> Không có dữ liệu </Empty>
        </TableCell>
      </TableRow>
    );
  };

  const result = AllAddressCopy?.filter((x: any) => x.address[0].apartment)?.reduce((acc, d) => {
    const found = acc.find((a: any) => a.declare === d.declare);
    const value = { name: d.name, identity: d.identity, address: d.address };
    if (!found) {
      acc.push({ declare: d.declare, data: [value] });
    } else {
      found.data.push(value);
    }
    return acc;
  }, []);

  return (
    <Box>
      <Typography
        variant="h5"
        component="div"
        className="text-upper text-primary font-medium text-18 pb-3"
      >
        Danh sách địa chỉ
      </Typography>
      <TableSticky
        className="mscb-table mscb-table-border"
        sx={{ borderBottom: "solid 1px #353535" }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ textAlign: "center" }}>STT</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Họ tên</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Số định danh</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Loại địa chỉ</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Địa chỉ</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Chọn sao chép</TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            "& tr": {
              "&:last-child": {
                "& td": {
                  borderBottom: "none !important",
                },
              },
            },
          }}
        >
          {(() => {
            if (result?.length === 0) {
              return emtyLayout();
            } else {
              return result?.map((item: any, i: number) => {
                return (
                  <Fragment key={generateUUID()}>
                    <TableRow id={nameDeclare.find(a=>a.type === item.declare)?.id}>
                      <TableCell sx={{ textAlign: "center" }}>
                        <span className="text-upper text-primary font-medium">
                          {intToRoman(i + 1)}
                        </span>
                      </TableCell>
                      <TableCell colSpan={5}>
                        <span className="text-upper text-primary font-medium">
                          {
                            nameDeclare.find((a) => a.type === item.declare)
                              ?.name
                          }
                        </span>
                      </TableCell>
                    </TableRow>
                    {
                      item.data.map((add: any, idxAdd: number) => {
                        const prevLen = item.data.reduce((prev: any, cur: any, index: number) => {
                          if (index < idxAdd) {
                            return prev + cur.address.length;
                          } else {
                            return prev;
                          }
                        }, 0)
                        return (
                          <Fragment key={generateUUID()}>
                            <TableRow id={`${nameDeclare.find(a=>a.type === item.declare)?.id}_${idxAdd + 1}`}>
                              <TableCell sx={{ textAlign: "center" }}>
                                <span className="text-upper font-medium">{prevLen + 1}</span>
                              </TableCell>
                              <TableCell rowSpan={add.address.length} >
                                <span className="font-medium">{add.name.toUpperCase()}</span>
                              </TableCell>
                              <TableCell rowSpan={add.address.length}>
                                <span className="font-medium">{add.identity}</span>
                              </TableCell>
                              {add.address?.length && (
                                <>
                                  <TableCell>
                                    <span className="text-upper font-medium">
                                      {add.address[0]?.type === "PERMANENT"
                                        ? "địa chỉ thường trú"
                                        : "địa chỉ tạm trú"}
                                    </span>
                                  </TableCell>
                                  <TableCell>
                                    {add.address[0]?.apartment.toUpperCase()},{' '}
                                    {Ward[add.address[0]?.district]?.data?.find(w => w.code === add.address[0]?.ward)?.name},{' '}
                                    {District[add.address[0]?.province]?.data?.find(d => d.code === add.address[0]?.district)?.name},{' '}
                                    {Province.find(p => p.id === add.address[0]?.province)?.name}
                                  </TableCell>
                                  <TableCell sx={{ textAlign: "center" }}>
                                    <Radio
                                      disabled={ruleDisabled}
                                      checkedIcon={
                                        <CheckCircleIcon sx={{ fontSize: "16px" }} />
                                      }
                                      icon={
                                        <RadioButtonIcon sx={{ fontSize: "16px" }} />
                                      }
                                      checked={add.address[0]?.uuid === checked}
                                      onClick={() => {
                                        clickPrimary(add.address[0]);
                                      }}
                                    />
                                  </TableCell>
                                </>
                              )}
                            </TableRow>
                            {add.address?.length > 1 &&
                              add.address
                                .slice(1, add.address?.length)
                                .map((b: any, index: number) => {
                                  return (
                                    <TableRow key={index}>
                                      <TableCell sx={{ textAlign: "center" }}>
                                        <span className="text-upper font-medium">
                                          {prevLen + index + 2}
                                        </span>
                                      </TableCell>
                                      <TableCell >
                                        <span className="text-upper font-medium">
                                          {b?.type === "PERMANENT"
                                            ? "địa chỉ thường trú"
                                            : "địa chỉ tạm trú"}
                                        </span>
                                      </TableCell>
                                      <TableCell>
                                        {b?.apartment.toUpperCase()},{' '}
                                        {Ward[b?.district]?.data?.find(w => w.code === b?.ward)?.name},{' '}
                                        {District[b?.province]?.data?.find(d => d.code === b?.district)?.name},{' '}
                                        {Province.find(p => p.id === b?.province)?.name}
                                      </TableCell>
                                      <TableCell sx={{ textAlign: "center" }}>
                                        <Radio
                                          disabled={ruleDisabled}
                                          checkedIcon={
                                            <CheckCircleIcon
                                              sx={{ fontSize: "16px" }}
                                            />
                                          }
                                          icon={
                                            <RadioButtonIcon
                                              sx={{ fontSize: "16px" }}
                                            />
                                          }
                                          checked={b.uuid === checked}
                                          onClick={() => {
                                            clickPrimary(b);
                                          }}
                                        />
                                      </TableCell>
                                    </TableRow>
                                  );
                                })
                            }
                          </Fragment>
                        )
                      })
                    }
                  </Fragment>
                );
              });
            }
          })()}
        </TableBody>
      </TableSticky>
    </Box>
  );
};

export default ListDataCopyAddress;
