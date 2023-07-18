import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { ILOANNormalState } from "types/models/loan/normal";

export const DevToolLegalCase = {
  __auto_fill_legal: {
    reducer(state: Draft<ILOANNormalState>, action: PayloadAction<string, string, string>){
      if (action.payload === 'all'){
        state.storage.legal = {
          ...state.storage.legal,
          // borrower: {
          //   ...state.storage.legal.borrower,
          //   declare: [ ...autofill.borrower.declare ],
          //   basic: {
          //     ...state.storage.legal.borrower.basic,
          //     ...autofill.borrower.basic,
          //     uuidRemote: state.storage.legal.borrower.basic.uuidRemote
          //   },
          //   other: {
          //     ...autofill.borrower.other,
          //   },
          //   identity: autofill.borrower.identity.map((id, i) => ({
          //     ...id,
          //     uuidRemote: state.storage.legal.borrower.identity[i]?.uuidRemote ?? ''
          //   })),
          //   address: {
          //     ...autofill.borrower.address,
          //     address: autofill.borrower.address.address.map((a, i) => ({
          //       ...a,
          //       uuidRemote: state.storage.legal.borrower.address.address[i]?.uuidRemote ?? ''
          //     }))
          //   }
          // },
          // data: {
          //   ...state.storage.legal.data,
          //   marriage: {
          //     ...state.storage.legal.data.marriage,
          //     info: autofill.data.marriage.info.map((info, index) => ({
          //       ...info,
          //       basic: {
          //         ...info.basic,
          //         uuidRemote: state.storage.legal.data.marriage.info[index]?.basic.uuidRemote ?? ''
          //       },
          //       other: {
          //         ...info.other,
          //       },
          //       identity: info.identity.map((id, i) => ({
          //         ...id,
          //         uuidRemote: state.storage.legal.data.marriage.info[index]?.identity[i]?.uuidRemote ?? ''
          //       })),
          //       address: {
          //         ...info.address,
          //         address: info.address.address.map((a, i) => ({
          //           ...a,
          //           uuidRemote: state.storage.legal.data.marriage.info[index]?.address.address[i]?.uuidRemote ?? ''
          //         }))
          //       }
          //     }))
          //   },
          //   coborrower: {
          //     ...state.storage.legal.data.coborrower,
          //     info: autofill.data.coborrower.info.map((info, index) => ({
          //       ...info,
          //       basic: {
          //         ...info.basic,
          //         uuidRemote: state.storage.legal.data.coborrower.info[index]?.basic.uuidRemote ?? ''
          //       },
          //       other: {
          //         ...info.other,
          //       },
          //       identity: info.identity.map((id, i) => ({
          //         ...id,
          //         uuidRemote: state.storage.legal.data.coborrower.info[index]?.identity[i]?.uuidRemote ?? ''
          //       })),
          //       address: {
          //         ...info.address,
          //         address: info.address.address.map((a, i) => ({
          //           ...a,
          //           uuidRemote: state.storage.legal.data.coborrower.info[index]?.address.address[i]?.uuidRemote ?? ''
          //         }))
          //       }
          //     }))
          //   },
          //   copayer: {
          //     ...state.storage.legal.data.copayer,
          //     info: autofill.data.copayer.info.map((info, index) => ({
          //       ...info,
          //       basic: {
          //         ...info.basic,
          //         uuidRemote: state.storage.legal.data.copayer.info[index]?.basic.uuidRemote ?? ''
          //       },
          //       other: {
          //         ...info.other,
          //       },
          //       identity: info.identity.map((id, i) => ({
          //         ...id,
          //         uuidRemote: state.storage.legal.data.copayer.info[index]?.identity[i]?.uuidRemote ?? ''
          //       })),
          //       address: {
          //         ...info.address,
          //         address: info.address.address.map((a, i) => ({
          //           ...a,
          //           uuidRemote: state.storage.legal.data.copayer.info[index]?.address.address[i]?.uuidRemote ?? ''
          //         }))
          //       }
          //     }))
          //   },
          //   legalRelated: {
          //     ...state.storage.legal.data.legalRelated,
          //     info: autofill.data.legalRelated.info.map((info, index) => ({
          //       ...info,
          //       basic: {
          //         ...info.basic,
          //         uuidRemote: state.storage.legal.data.legalRelated.info[index]?.basic.uuidRemote ?? ''
          //       },
          //       other: {
          //         ...info.other,
          //       },
          //       identity: [],
          //       address: {
          //         ...info.address,
          //         address: info.address.address.map((a, i) => ({
          //           ...a,
          //           uuidRemote: state.storage.legal.data.legalRelated.info[index]?.address.address[i]?.uuidRemote ?? ''
          //         }))
          //       }
          //     }))
          //   },
          //   contact: {
          //     ...state.storage.legal.data.contact,
          //     info: autofill.data.contact.info.map((info, index) => ({
          //       ...info,
          //       basic: {
          //         ...info.basic,
          //         uuidRemote: state.storage.legal.data.contact.info[index]?.basic.uuidRemote ?? ''
          //       },
          //       other: {
          //         ...info.other,
          //       },
          //       identity: [],
          //       address: {
          //         ...info.address,
          //         address: info.address.address.map((a, i) => ({
          //           ...a,
          //           uuidRemote: state.storage.legal.data.contact.info[index]?.address.address[i]?.uuidRemote ?? ''
          //         }))
          //       }
          //     }))
          //   }
          // }
        }
      }
      else if (action.payload === 'borrower'){
        state.storage.legal = {
          ...state.storage.legal,
          // borrower: {
          //   ...state.storage.legal.borrower,
          //   basic: {
          //     ...state.storage.legal.borrower.basic,
          //     ...autofill.borrower.basic
          //   },
          //   declare: [ ...state.storage.legal.borrower.declare ],
          //   other: {
          //     ...autofill.borrower.other,
          //   },
          //   identity: autofill.borrower.identity.map((id, i) => ({
          //     ...id,
          //     uuidRemote: state.storage.legal.borrower.identity[i]?.uuidRemote ?? ''
          //   })),
          //   address: {
          //     ...autofill.borrower.address,
          //     address: autofill.borrower.address.address.map((a, i) => ({
          //       ...a,
          //       uuidRemote: state.storage.legal.borrower.address.address[i]?.uuidRemote ?? ''
          //     }))
          //   }
          // }
        }
      }
      else{
        state.storage.legal = {
          ...state.storage.legal,
          // borrower: {
          //   ...state.storage.legal.borrower,
          //   declare: [  
          //     ...state.storage.legal.borrower.declare, action.meta 
          //   ].filter((n, i, s) => s.indexOf(n) === i)
          // },
        //   data: {
        //     ...state.storage.legal.data,
        //     [ action.payload ]: {
        //       ...state.storage.legal.data[action.payload as keyof typeof state.storage.legal.data],
        //       info: autofill.data[action.payload as keyof typeof autofill.data].info.map((info, index) => ({
        //         ...info,
        //         basic: {
        //           ...info.basic,
        //           uuidRemote: state.storage.legal.data[
        //             action.payload as keyof typeof state.storage.legal.data
        //           ].info[index]?.basic.uuidRemote ?? ''
        //         },
        //         other: {
        //           ...info.other,
        //         },
        //         identity: info.identity.map((id, i) => ({
        //           ...id,
        //           uuidRemote: state.storage.legal.data[action.payload].info[index]?.identity[i]?.uuidRemote ?? ''
        //         })),
        //         address: {
        //           ...info.address,
        //           address: info.address.address.map((a, i) => ({
        //             ...a,
        //             uuidRemote: state.storage.legal.data[action.payload].info[index]?.address.address[i]?.uuidRemote ?? ''
        //           }))
        //         }
        //       }))
        //     }
        //   }
        }
      }
    },
    prepare(payload: string, meta: string){
      return { payload, meta };
    }
  }
}