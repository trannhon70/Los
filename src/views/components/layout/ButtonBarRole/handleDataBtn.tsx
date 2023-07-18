import { ETypeButton } from "features/loan/normal/storageControl/case"
import _ from "lodash"
import { IStatePassPositon } from "types/models/loan/normal/storageGuide"

export const disablePassPositionLog = (data: IStatePassPositon[], code: string): boolean => {
  for(let i = 0 ; i< data.length;i++){
    let res : boolean = false;
    if(data[i].code === code){
      res = false;
      return res;
    }
    if(data[i].children){
      for(let j =0 ;j<data[i].children.length;j++){
        let resJ:boolean = false;
        resJ = disablePassPositionLog(data[i].children,code)
        if(resJ){
          break;
        }
        return resJ;
      }
    }
  }
  return true;
}

export const generateTitleButton = (title: string) => {
  switch (title) {
    case ETypeButton.apply:
      return {
        title: "Trình hồ sơ",
        color: "#069549",
        id: "apply",
        checkWidth: (document.getElementById("apply")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.apply_approve:
      return {
        title: "Trình hồ sơ",
        color: "#069549",
        id: "apply_approve",
        checkWidth: (document.getElementById("apply_approve")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.apply_headquarter_official:
      return {
        title: "Trình hồ sơ thẩm định phê duyệt",
        color: "#069549",
        id: "apply_headquarter_official",
        checkWidth: (document.getElementById("apply_headquarter_official")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.apply_headquarter_unofficial:
      return {
        title: "Trình hồ sơ thẩm định phê duyệt",
        color: "#069549",
        id: "apply_headquarter_unofficial",
        checkWidth: (document.getElementById("apply_headquarter_unofficial")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.close:
      return {
        title: "Đóng hồ sơ",
        color: "#f26b04",
        id: "close",
        checkWidth: (document.getElementById("close")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.save:
      return {
        title: "Lưu",
        color: "#069549",
        id: "save",
        checkWidth: (document.getElementById("save")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.apply_control:
      return {
        title: "Trình hồ sơ",
        color: "#069549",
        id: "apply_control",
        checkWidth: (document.getElementById("apply_control")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.apply_control1:
      return {
        title: "Trình hồ sơ KS1",
        color: "#069549",
        id: "apply_control1",
        checkWidth: (document.getElementById("apply_control1")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.apply_control2:
      return {
        title: "Trình hồ sơ KS2",
        color: "#069549",
        id: "apply_control2",
        checkWidth: (document.getElementById("apply_control2")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.reject:
      return {
        title: "Từ chối xử lý",
        color: "#eb0029",
        id: "reject",
        checkWidth: (document.getElementById("reject")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.disconfirm:
      return {
        title: "Hủy kiểm soát",
        color: "#eb0029",
        id: "disconfirm",
        checkWidth: 110 + "px"
      }
    case ETypeButton.disapprove:
      return {
        title: "Hủy phê duyệt",
        color: "#eb0029",
        id: "disapprove",
        checkWidth: 110 + "px"
      }
    case ETypeButton.complaint:
      return {
        title: "Khiếu nại",
        color: "#eb0029",
        id: "complaint",
        checkWidth: (document.getElementById("complaint")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.return_init:
      return {
        title: "Chuyển trả hồ sơ về NVKD",
        color: "#f26b04",
        id: "return_init",
        checkWidth: (document.getElementById("return_init")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.confirm:
      return {
        title: "Kiểm soát",
        color: "#069549",
        id: "confirm",
        checkWidth: 110 + "px"
      }
    case ETypeButton.accept_unofficial:
      return {
        title: "NULL",
        color: "#1825aa",
        id: "accept_unofficial",
        checkWidth: (document.getElementById("accept_unofficial")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.accept_official:
      return {
        title: "NULL",
        color: "#1825aa",
        id: "accept_official",
        checkWidth: (document.getElementById("accept_official")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.deny_official:
      return {
        title: "NULL",
        color: "#1825aa",
        id: "deny_official",
        checkWidth: (document.getElementById("deny_official")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.deny_unofficial:
      return {
        title: "NULL",
        color: "#1825aa",
        id: "deny_unofficial",
        checkWidth: (document.getElementById("deny_unofficial")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.approve:
      return {
        title: "Duyệt",
        color: "#069549",
        id: "approve",
        checkWidth: 110 + "px"
      }
    case ETypeButton.modify_notification:
      return {
        title: "Thay đổi nội dung CTD",
        color: "#069549",
        id: "modify_notification",
        checkWidth: (document.getElementById("modify_notification")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.modify_credit_info:
      return {
        title: "Điều chỉnh TBPD",
        color: "#069549",
        id: "modify_credit_info",
        checkWidth: (document.getElementById("modify_credit_info")?.clientWidth ?? 0) + 1 + "px"

      }
    case ETypeButton.freeze:
      return {
        title: "Phong tỏa hồ sơ",
        color: "#eb0029",
        id: "freeze",
        checkWidth: (document.getElementById("freeze")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.return_pre_control:
      return {
        title: "Chuyển trả hồ sơ về KS",
        color: "#f26b04",
        id: "return_control",
        checkWidth: (document.getElementById("return_control")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.appraise:
      return {
        title: "Xử lý thẩm định",
        color: "#069549",
        id: "appraise",
        checkWidth: (document.getElementById("appraise")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.return_moderator:
      return {
        title: "Trả hồ sơ về ĐPV",
        color: "#f26b04",
        id: "return_moderator",
        checkWidth: (document.getElementById("return_moderator")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.return_reappraise:
      return {
        title: "Trả hồ sơ về TTĐ",
        color: "#f26b04",
        id: "return_reappraise",
        checkWidth: (document.getElementById("return_reappraise")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.return_pre_control2:
      return {
        title: "Trả hồ sơ về CKS2",
        color: "#f26b04",
        id: "return_pre_control2",
        checkWidth: (document.getElementById("return_pre_control2")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.behalf_return:
      return {
        title: "Trả thay KQPD",
        color: "#069549",
        id: "behalf_return",
        checkWidth: (document.getElementById("behalf_return")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.apply_approve_hq:
      return {
        title: "Trình hồ sơ",
        color: "#069549",
        id: "apply_approve_hq",
        checkWidth: (document.getElementById("apply_approve_hq")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.apply_control_hq:
      return {
        title: "Trình hồ sơ",
        color: "#069549",
        id: "apply_approve_hq",
        checkWidth: (document.getElementById("apply_approve_hq")?.clientWidth ?? 0) + 1 + "px"
      }
    case ETypeButton.return_control_hq:
      return {
        title: "Trả hồ sơ KS",
        color: "#f26b04",
        id: "return_control_hq",
        checkWidth: (document.getElementById("return_control_hq")?.clientWidth ?? 0) + 1 + "px"
      }
  }
}