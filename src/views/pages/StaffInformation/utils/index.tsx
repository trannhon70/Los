


export const tabNameStaffInfoVN = [
  "Hồ sơ công tác",
  "Sơ yếu lí lịch",
  "Thông tin trình độ",
  "Thông tin KPIs",
  "Thông tin khác"
]

export const pathStaffInformation = "/loan/profile/";

export const tabNameStaffInfo = ["workprofile", "curriculum-vitae", "level-information", "kpi-information", "other-information"];

export const steptNameWorkProfile = ["work-profile-info", "decision-contract-information", "working-info-process"];

export const steptNameWorkCurriculumVitae = ["personal-info", "contact-info"];

export const steptNameLevelInformation = ["education-level", "foreign-language-level", "office-information"];

export const steptNameOtherInformation = ["bonus", "discipline", "training", "extraInformation"];

export const pathWorkprofile = `${tabNameStaffInfo[0]}/`;

export const pathCurriculumVitae = `${tabNameStaffInfo[1]}/`;

export const pathLevelInformation = `${tabNameStaffInfo[2]}/`;

export const pathOtherInformation = `${tabNameStaffInfo[4]}/`;

export const findTabPosition = (tab: string) => {
  const pos = tabNameStaffInfo.indexOf(tab);
  return !!~pos ? pos : 0;
}

export const findSteptPositionWorkProfile = (stept: string) => {
  const pos = steptNameWorkProfile.indexOf(stept);
  return !!~pos ? pos : 0;
}

export const findSteptPositionCurriculumVitae = (stept: string) => {
  const pos = steptNameWorkCurriculumVitae.indexOf(stept);
  return !!~pos ? pos : 0;
}

export const findSteptPositionLevelInformation = (stept: string) => {
  const pos = steptNameLevelInformation.indexOf(stept);
  return !!~pos ? pos : 0;
}

export const findSteptPositionOtherInformation = (stept: string) => {
  const pos = steptNameOtherInformation.indexOf(stept);
  return !!~pos ? pos : 0;
}

export const COUNTRY_CODE_DEFAULT = "VN";


export interface IStaffInfomationParams {
  stage: string;
  cifId: string;
  steptArrow: string;
  tab: string;
  step: string;
  uuid?: string;
  "*": string;
}