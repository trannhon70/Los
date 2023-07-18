import { IIdCodeName } from "types/base";

export interface ILOANMixed{
  display_order: number;
  document: IIdCodeName<string, string, string | null>;
  customer_name: string;
  status: IIdCodeName;
  business_unit: IIdCodeName;
  update_date: number;
}

export interface DocumentStatusColor {
  [key: string] : string;
} 
export enum Color {
  Init = '#1a9b06',
  Pending = '#ec9600',
  Cancel = '#eb0029',
  Closed = '#353535',
  Lockdown = '#b11ab7'
}

export const DocumentStatusColor : DocumentStatusColor = ({
    "s2_a1_1_pre_appraise" : Color.Init,
    "s1_a1_approving" : Color.Init,
    "s1_a1_controlling" : Color.Init,
    "s1_a1_init" : Color.Init,
    "s1_a1_pre_approval" : Color.Init,
    "s1_a1_pre_control" : Color.Init,
    "s1_a1_start_event" :Color.Init,
    "s1_a2_approving" : Color.Pending,
    "s1_a2_controlling" : Color.Pending,
    "s1_a2_init" : Color.Pending,
    "s1_a2_pre_approval" : Color.Pending,
    "s1_a2_pre_control" : Color.Pending,
    "s1_a3_init" : Color.Pending,
    "s1_a4_init" : Color.Pending,
    "s1_b_init" : Color.Pending,
    "s1_b_processing" :  Color.Pending,
    "s1_b1_approving" : Color.Pending,
    "s1_b1_controlling" : Color.Pending,
    "s1_b1_pre_approval" : Color.Pending,
    "s1_b1_pre_control" : Color.Pending,
    "s1_b2_pre_approval" : Color.Pending,
    "s1_b2_pre_control" : Color.Pending,
    "s1_c1_approving" : Color.Closed,
    "s1_c1_controlling" : Color.Closed,
    "s1_c1_init" : Color.Closed,
    "s1_c1_pre_approval" : Color.Closed,
    "s1_c1_pre_control" : Color.Closed,
    "s1_c1_processing" :  Color.Closed,
    "s1_c2_approving" : Color.Closed,
    "s1_c2_controlling" : Color.Closed,
    "s1_c2_init" : Color.Closed,
    "s1_c2_pre_approval" : Color.Closed,
    "s1_c2_pre_control" : Color.Closed,
    "s1_c2_processing" : Color.Closed,
    "s1_c3_approving" : Color.Closed,
    "s1_c3_controlling" : Color.Closed,
    "s1_c3_init" : Color.Closed,
    "s1_c3_pre_approval" : Color.Closed,
    "s1_c3_pre_control" : Color.Closed,
    "s1_c3_processing" : Color.Closed,
    "s1_c4_init" : Color.Closed,
    "s1_c5_init" : Color.Closed,
    "s1_c6_init" : Color.Closed,
    "s1_c7_init" : Color.Closed,
    "s1_d2_approving" : Color.Lockdown,
    "s1_d2_controlling" : Color.Lockdown,
    "s1_d2_init" : Color.Lockdown,
    "s1_d2_post_approval" : Color.Lockdown,
    "s1_d2_pre_approval" : Color.Lockdown,
    "s1_d2_pre_control" : Color.Lockdown,
    "closed" : Color.Closed,
    "TODO" : Color.Cancel,
    "TODO1" : Color.Cancel,
    "TODO2" : Color.Cancel,
})