import { Grid } from "@mui/material";
import { FC } from "react";
import ObjectList from "views/components/layout/ObjectList";
import Address from "./Address";
import Basic from "./Basic";
import Identity from "./Identity";

interface BasicInfoProps {
  enableList?: boolean;
}

const MainPage: FC<BasicInfoProps> = (props) => {
  const { enableList } = props;

  return (
    <>
      {!enableList && (
        <ObjectList
          labelLength="Chọn người đồng vay:&nbsp;"
          options={[
            { label: "laaaaaaaa" },
            { label: "laaaaaaaa111" },
            { label: "laaaaaaaa2222" },
          ]}
          enableAdd={false}
          // className={`${classes.userListClass} mb-6 `}
          menuWidth="110px"
          enableMenu={false}
          // current={currentUser ?? 0}
          // onChange={changeDeclarePosition}
          attachLabel="tập tin"
          // onAttach={handleOpenAttach}
          sx={{
            "& .object-list-label-container": {
              display: "flex",
              alignItems: "center",
              borderColor: "transparent",
              marginTop: "unset !important",
              paddingLeft: "unset !important",
              color: "#1e1d27",
              "& .object-list-label": {
                textDecoration: "underline",
              },
              "& .object-list-number": {
                mt: 0,
                fontSize: "var(--mscb-fontsize)",
                color: "#1e1d27",
                fontWeight: 400,
                textDecoration: "underline",
              },
            },
            "& .ObjectListContent": {
              width: "100%",
              "& .MuiTabs-root": {
                width: "100%",
                "& .MuiTabs-flexContainer": {
                  width: "100%",
                  transform: "unset !important",
                },
              },
            },
            "& .object-list-box": {
              flexDirection: "row",
              width: "215px",
              justifyContent: "flex-start",
              border: "1px solid #707070",
              pt: 0,
              px: 2,
              "& div:last-child": {
                marginLeft: "57px",
                marginBottom: "13px",
              },
              '& .object-list-box-name': {
                '& div:last-child':{
                  marginLeft:"0px !important",
                  marginBottom:"0px !important"
                },
              },
            },
            "& .object-list-box-name": {
              ml: 2,
              marginBottom: "18px",
            },
            "& .Mui-selected": {
              "& .object-list-box": {
                borderColor: "var(--mscb-danger)",
              },
            },

            "& .object-list-add": {
              maxWidth: "230px",
              minWidth: "230px",
              justifyContent: "center",
              "& .object-list-box": {
                width: "100%",
                justifyContent: "center",
                borderColor: "var(--mscb-primary)",
              },
              "& .object-list-box-name": {
                display: "none",
              },
              "& .object-list-circle": {
                backgroundColor: "transparent!important",
                borderColor: "transparent!important",
                "& svg": {
                  color: "var(--mscb-primary)",
                },
              },
            },
          }}
        />
      )}
      <Grid container spacing={3} className="mt-0">
        <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
          <Basic />
        </Grid>
        <Grid item xl={4} lg={6} md={12} sm={12} xs={12}>
          <Identity />
        </Grid>
        <Grid item xl={4} lg={12} md={12} sm={12} xs={12}>
          <Address />
        </Grid>
      </Grid>
    </>
  );
};

export default MainPage;
