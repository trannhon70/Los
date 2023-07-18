
import { IProfile } from "types/models/loan/normal/storage/ProfileDocument";

export const ProfileDocumentState: IProfile = {
    data: [],
    structure:[],
    getFile:[],
    getFilePage:{
        los_id:'',
        document_type_id :1,
        name:'',
        date_start: '',
        date_end:'',
        page:1,
        limit:10,
        fetching: false,
        fetched: false,
        total_page:0,
        total_item:0,
    },
    current_page:1,
    total_items:0,
    total_page:0,
    currentFile: null,
    file_extenstion: '',
    customerInfo:{},
    breadcrumb:[]
}