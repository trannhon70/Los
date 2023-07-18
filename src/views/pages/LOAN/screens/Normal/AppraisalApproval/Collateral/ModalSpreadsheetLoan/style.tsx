import { SxBaseApp } from "types/app";

export const SxSelectModal: SxBaseApp = {
  height: "36px",
  // width:"180px",
  boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.16) !important",
  backgroundColor: 'rgba(94, 191, 255, 0.14) !important',
  "& .MuiSelect-select": {
    fontWeight: 500,
    backgroundColor: 'rgba(94, 191, 255, 0.14) !important',
  }
}

export const SxInputModal: SxBaseApp = {
  "& input": {
    boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.16) !important",
    backgroundColor: 'rgba(94, 191, 255, 0.14) !important',
    fontWeight: 500
  }
}

export const SxInputRightModal: SxBaseApp = {
  "& input": {
    boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.16) !important",
    backgroundColor: 'rgba(94, 191, 255, 0.14) !important',
    textAlign: "right",
    fontWeight: 500
  }
}

export const SxActiveRow: SxBaseApp = {
  '& .MuiTableCell-root':{
    color: "var(--mscb-primary)"
  }
}

export const SxRow: SxBaseApp = {
  '& .MuiTableCell-root':{
    color: "var(--mscb-secondary)"
  }
}