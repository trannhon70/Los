import * as IncomeApprovalType from "types/models/loan/normal/storageApproval/SourceIncomeForm";
export interface DeclareTotalCostProps {
    data: IncomeApprovalType.TotalCostDeclare | null | undefined;
    label?: string;
    input?: {
      onChange: (value: string) => void;
      value: string;
    } | null;
    node?: string;
    disabled?:boolean;
    declare: string;
  }