import { Draft, PayloadAction } from '@reduxjs/toolkit';
import { remove, set } from 'lodash';
import { ILOANNormalState } from 'types/models/loan/normal';
import { IApprovalExceptionInfo, ILOANNormalApprovalAPIOther, ILOANNormalApprovalOtherValidate } from 'types/models/loan/normal/storageApproval/OtherProFile';
import { generateLOCALUUID, PREFIX_LOCAL } from 'utils';
import { METADATA_CONSTANT } from 'utils/constants';

export const otherApprovalCase = {
  saveApprovalOther(state: Draft<ILOANNormalState>,action: PayloadAction<number>) {},

  updateOtherApprovalStorage( state: Draft<ILOANNormalState>, action: PayloadAction<ILOANNormalApprovalAPIOther> ) {
		const listPolicyDetail = state.configs.metadataConstant.data[METADATA_CONSTANT.CONST_POLICY_GROUP_DETAIL]

    state.storageApproval.other = {
      exception_info: action.payload?.exception_info?.map((exc) => ({
        ...exc,
				detail_info_list: exc.detail_info_list.map(e => {
					if(exc.detail_info_list.length === 1 && e.exception_detail_id === null){
						return {
							...e,
							exception_detail_id: null,
							exception_detail_name:  "",
							exception_detail_code: "",
							description: "Khác"
						}
					}
					else return {
						...e
					}
				}),
        isLocal: false,
      })),
      unit_exception_report: action.payload.unit_exception_report,
      analysis_countermeasures: action.payload.analysis_countermeasures,
      validate: { valid: true },
    };
  },

	addNewApprovalException( state: Draft<ILOANNormalState> ){
		state.storageApproval.other.exception_info.push({
			exception_type_id: null,
			exception_type_name: "",
			detail_info_list: [],
			isLocal: true
		})
	},

	updateOtherApprovalStorageAfterSave( state: Draft<ILOANNormalState> , action : PayloadAction<IApprovalExceptionInfo[]>) {
		state.storageApproval.other.exception_info = action.payload?.map(exc => ({
			...exc,
			isLocal: false
		}))
	},
	setApprovalExceptionType: {
		reducer(
			state: Draft<ILOANNormalState>,
      action: PayloadAction<number, string, { index: number , name: string}>
			) {
				state.storageApproval.other.exception_info[action.meta.index].exception_type_id = action.payload
				state.storageApproval.other.exception_info[action.meta.index].exception_type_name = action.meta.name

				if(state.storageApproval.other.exception_info[action.meta.index]?.detail_info_list?.length === 0){
					state.storageApproval.other.exception_info[action.meta.index].detail_info_list.push({
						exception_detail_id: null,
						exception_detail_code: "",
						exception_detail_name: "",
						description: "",
						reality_description: "",
						uuid: generateLOCALUUID(),
						display_order: 0
					})
				}
			},
			prepare(payload: number, meta: { index: number , name: string}) {
				return { payload, meta };
			}
		},

	setApprovalRealityDescription: {
		reducer(
			state: Draft<ILOANNormalState>,
			action: PayloadAction<string, string, { groupIdx: number, dataIdx: number, }> ) {
				const { groupIdx , dataIdx } = action.meta
				set(state.storageApproval.other.exception_info, [groupIdx, 'detail_info_list' , dataIdx, 'reality_description'], action.payload)

			},
			prepare(payload: string, meta: { 
				groupIdx: number, 
				dataIdx: number,  
			}) {
				return { payload, meta };
			}
	},
	
	deleteAllApprovalException( state: Draft<ILOANNormalState>, ){ },
	deleteAllExceptionStorage( state: Draft<ILOANNormalState>, ){ 
		if(state.storageApproval.full.data){
			set(state.storageApproval.full.data, 'form.other_profile.exception_info', [])
		}

		set(state.storageApproval.other, 'exception_info', [])

	},
	deleteApprovalException( state: Draft<ILOANNormalState>, action: PayloadAction<{
		id: number | null,
		index: number,
		isLocal: boolean
	}> ){},

	deleteExceptionStorage( state: Draft<ILOANNormalState>, action: PayloadAction<{
		id: number | null,
		index: number,
		isLocal: boolean
	}> ){
		if(!action.payload.isLocal && state.storageApproval.full.data){
			remove(state.storageApproval.full.data?.form?.other_profile?.exception_info, function(_n, index) {
				return index === action.payload.index
			});
		}

		remove(state.storageApproval?.other?.exception_info, function(_n, index) {
			return index === action.payload.index
		});

	},
	deleteApprovalExceptionDetail( state: Draft<ILOANNormalState>, action: PayloadAction<{
		groupId: number | null,
		uuid: string,
		index: number, 
		groupIndex : number
	}> ){},

	deleteExceptionDetailStorage( state: Draft<ILOANNormalState>, action: PayloadAction<{
		groupId: number | null,
		uuid: string,
		index: number, 
		groupIndex : number
	}> ){

		if(state.storageApproval.other.exception_info[action.payload.groupIndex].detail_info_list){
			state.storageApproval.other.exception_info[action.payload.groupIndex].detail_info_list 
			= state.storageApproval.other?.exception_info[action.payload.groupIndex]?.detail_info_list?.filter(e => e.uuid !== action.payload.uuid)
		}

		if(!action.payload.uuid.includes(PREFIX_LOCAL) && state.storageApproval.full.data?.form.other_profile.exception_info[action.payload.groupIndex].detail_info_list){
			state.storageApproval.full.data.form.other_profile.exception_info[action.payload.groupIndex].detail_info_list 
			= state.storageApproval.full.data.form?.other_profile?.exception_info[action.payload.groupIndex]?.detail_info_list?.filter(e => e.uuid !== action.payload.uuid)
		}
	},
	setApprovalPolicyDetailType: {
		reducer(
			state: Draft<ILOANNormalState>,
      action: PayloadAction<number, string, {  
				groupIdx: number,
        dataIdx: number,
        name: string,
        description: string
			}>
			) {
				const {groupIdx, dataIdx, name, description} = action.meta
				
				set(state.storageApproval.other.exception_info, [groupIdx, 'detail_info_list', dataIdx, 'exception_detail_id'], action.payload)
				set(state.storageApproval.other.exception_info, [groupIdx, 'detail_info_list', dataIdx, 'exception_detail_code'], name)
				set(state.storageApproval.other.exception_info, [groupIdx, 'detail_info_list', dataIdx, 'exception_detail_name'], name)
				set(state.storageApproval.other.exception_info, [groupIdx, 'detail_info_list', dataIdx, 'description'], description)

			},
			prepare(payload: number, meta: { 
				groupIdx: number,
        dataIdx: number,
        name: string,
        description: string}) {
				return { payload, meta };
			}
		},
	addApprovalPolicyDetail( state: Draft<ILOANNormalState>, action: PayloadAction<number> ){
		state.storageApproval.other.exception_info[action.payload].detail_info_list.push({
			exception_detail_id: null,
			exception_detail_code: "",
			exception_detail_name: "",
			description: "",
			reality_description: "",
			uuid: generateLOCALUUID(),
			display_order: 0
		})

	},
	setOtherApprovalValidate( state: Draft<ILOANNormalState>, action: PayloadAction<ILOANNormalApprovalOtherValidate>){
		state.storageApproval.other.validate = action.payload
	}
};
