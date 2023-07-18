
export interface ILOANStorageGuideState {
  fetched: boolean;
  fetching: boolean;
  starting: boolean;
  data: IStateStorageGuide | undefined;
}

// export interface IStateStorageGuide{
//     current_state_id:string;
//     last_lag:any;
//     guide:any;
//     roles:any;
// }

export interface IStateStorageGuide {
  current_state_id: string;
  current_state_group: string;
  last_log: IStateStorageLastLag;
  guide: IStateStorageTypeGuide | {};
  is_satisfied:boolean;
  roles: IStateStorageRoles; // check full json data BE 
  prev_allocate: IStateStorageRoles; // check full json data BE 
}
export interface IStateStorageGuidePrev {
  initializer: IStateStorageUserName
}
export interface IStateStorageUserName {
  username: string;
}

export interface IStateStorageLastLag {
  los_id: string;
  position_group_id: string;
  node_link_id: string;
  position_id: string;
  position_detail_id: string;
  position_name: string;
  action_id: string;
  status_out: string;
  status_out_message: string;
  created_at: number | null;
  updated_at: number | null;
  sequence: number | null;
  passed_positions: IStatePassPositon[];
  passed_positions_count: number
  passed_positions_limit: number
}
export interface IStatePassPositon {
  code: string;
  node1: string;
  node2: string;
  node3: string;
  node4: string;
  label: string;
  parent_id: string;
  level: number | null;
  fullname: string
  created_by: string
  updated_by: number | null;
  updated_at: number;
  created_at: string
  children: IStatePassPositon[];
  is_passed: boolean;
  is_filled:boolean;

}

export interface IStateParamsControlGuide {
  los_id: string;
  position: string;
}

export interface IStateStorageRoles { // check json BE
  initializer: {
    username: string;
  },
  controller_branch: {
    username: string;
  },
  approver_branch: {
    username: string;
  },
  reappraise_headquarter:{
    username:string;
  },
  controller_headquarter:{
    username:string;
  },
  approver_headquarter:{
    username:string;
  }
}

export interface IStateStorageTypeGuide {
  apply: IStateStorageQuyeyPath;
  accept_official: IStateStorageQuyeyPath;
  accept_unofficial: IStateStorageQuyeyPath;
  approve: IStateStorageQuyeyPath;
  close: IStateStorageQuyeyPath;
  complaint: IStateStorageQuyeyPath;
  confirm: IStateStorageQuyeyPath;
  deny_official: IStateStorageQuyeyPath;
  deny_unofficial: IStateStorageQuyeyPath;
  freeze: IStateStorageQuyeyPath;
  modify_credit_info: IStateStorageQuyeyPath;
  modify_notification: IStateStorageQuyeyPath;
  reject: IStateStorageQuyeyPath;
  return_init: IStateStorageQuyeyPath;
  return_pre_control: IStateStorageQuyeyPath;
  save: IStateStorageQuyeyPath;
}
export interface IStateStorageQuyeyPath {
  id: string;
  path: string;
  query: string | null;
}
