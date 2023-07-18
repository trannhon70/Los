import { Box, Grid } from "@mui/material";
import {
  ECheckType,
  ETypeLand,
} from "features/loan/normal/storage/collateralV2/case";
import {
  getLOANormalStoreColalteralLandAssessmentApproval,
  getLoanNormalSubTypeItemsActiveApproval,
  getLOANormalStoreColalteralLandCTXDGcnQshCurrentIndex,
  getLOANormalStoreColalteralLandCTXDGcnQshDataApproval,
} from "features/loan/normal/storageApproval/collateral/selector";
import { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { MdHomeWork } from "react-icons/md";
import { useSelector } from "react-redux";
import Checkbox, { CheckboxRef } from "views/components/base/Checkbox";
import HorizontalList from "views/components/layout/HorizontalList";
import { ObjectListOption } from "views/components/layout/ObjectList";
import ButtonAttachmentModalCollateral from "../../../ButtonAttachmentModalCollateral";
import { useDispatch } from "react-redux";
import { setUuidActiveLandGcnQshApproval } from "features/loan/normal/storageApproval/collateral/actions";
import { getCountAttachment } from "views/pages/LOAN/widgets/AttachmentCommon/AttachmentDynamic/hook";
import * as _ from "lodash";
import ButtonAttachFile from "views/components/base/ButtonAttachFile";
import AttachmentCTXDGCN from "./AttachmentCTXDGCN";
export interface IActionTypeLand {
  currentType?: number;
  uuidActiveData?: string;
  uuIdSubType?: string;
}

const ActionTypeLand: FunctionComponent<IActionTypeLand> = (props) => {
  // done
  const dispatch = useDispatch();
  const { currentType = 0, uuidActiveData = "", uuIdSubType = "" } = props;
  const [currentTypeDefault, setCurrentTypeDefault] =
    useState<number>(currentType);
  const [openAttachModal, setOpenAttachModal] = useState<{
    open: boolean;
    uuid: string;
  }>({ open: false, uuid: "" });
  useEffect(() => {
    if (currentTypeDefault !== currentType) {
      setCurrentTypeDefault(currentType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentType]);

  const checkBoxTypeInfoRef = useRef<CheckboxRef>(null);

  const SubTypeItemsActive = useSelector(
    getLoanNormalSubTypeItemsActiveApproval(uuidActiveData, uuIdSubType ?? "")
  );
  const dataItems = useSelector(
    getLOANormalStoreColalteralLandAssessmentApproval(
      uuidActiveData,
      uuIdSubType ?? "",
      SubTypeItemsActive ?? ""
    )
  );
  const LandCTXDGcnQshCurrentIndex = useSelector(
    getLOANormalStoreColalteralLandCTXDGcnQshCurrentIndex(
      uuidActiveData,
      uuIdSubType ?? ""
    )
  );
  const LandCTXDGcnQshData = useSelector(
    getLOANormalStoreColalteralLandCTXDGcnQshDataApproval(
      uuidActiveData,
      uuIdSubType ?? ""
    )
  );

  const optionsLandCTXDGcnQsh: ObjectListOption[] = LandCTXDGcnQshData
    ? LandCTXDGcnQshData.map((d, i) => ({
        label: `GCN QSH CTXD ${i + 1}`,
        circle: <MdHomeWork />,
      }))
    : [];


  const currentCTXDGCNDocument =
    LandCTXDGcnQshCurrentIndex !== undefined
      ? _.get(LandCTXDGcnQshData, [LandCTXDGcnQshCurrentIndex, "documents"], [])
      : [];

  const onHandleChangeCtxdOfGcnQsh = (current: number) => {
    const currentActive =
      LandCTXDGcnQshData && LandCTXDGcnQshData[current].uuIdCtxdGcnQsh;
    currentActive &&
      dispatch(
        setUuidActiveLandGcnQshApproval(currentActive, {
          uuidData: uuidActiveData,
          uuidSubType: uuIdSubType,
        })
      );
  };
  return (
    <>
      {(() => {
        if (currentTypeDefault === ETypeLand.LAND) {
          return (
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Box className="flex items-center">
                <span className="text-14 font-medium text-secondary pr-5">
                  Chọn loại tài sản khai báo thông tin
                </span>
                <Checkbox
                  ref={checkBoxTypeInfoRef}
                  disabled={true}
                  options={[
                    {
                      label: "CTXD trên đất",
                      value: ECheckType.CTXD_LAND,
                      checked: dataItems
                        ? dataItems?.has_land_asset === "Y"
                          ? true
                          : false
                        : false,
                    },
                    {
                      label: "CTXD GCN riêng",
                      value: ECheckType.CTXD_GCN,
                      checked: dataItems
                        ? dataItems?.has_certificated_land_asset === "Y"
                          ? true
                          : false
                        : false,
                    },
                  ]}
                />
              </Box>
            </Grid>
          );
        }

        if (currentTypeDefault === ETypeLand.CTXD_GCN) {
          return (
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <HorizontalList
                className="mb-2"
                enableAdd={false}
                enableMenu={false}
                current={LandCTXDGcnQshCurrentIndex}
                options={optionsLandCTXDGcnQsh}
                onChange={onHandleChangeCtxdOfGcnQsh}
              />
              {/* <ButtonAttachmentModalCollateral data={[]} /> */}
              {optionsLandCTXDGcnQsh.length > 0 && (
                <ButtonAttachFile
                  onClick={() => {
                    setOpenAttachModal({ uuid: "", open: true });
                  }}
                  attachment={getCountAttachment(currentCTXDGCNDocument)}
                />
              )}
              </Grid>
            )
          }
        })()
      }
      <Fragment>
        {openAttachModal.open && (
          <AttachmentCTXDGCN
            open={openAttachModal.open}
            onClose={() => setOpenAttachModal({ uuid: "", open: false })}
            data={currentCTXDGCNDocument}
            masterData={{
              uuid: uuidActiveData,
              uuidActive: uuIdSubType,
            }}
            // onChange={(newData) => {
            //   dispatch(
            //     setCollaretalAssessmentInfomation(newData, {
            //       uuid: uuidActiveData,
            //       uuidActive: uuIdSubType,
            //       key: "documents",
            //     })
            //   );
            // }}
          />
        )}
      </Fragment>
    </>
  );
};

export default ActionTypeLand;
