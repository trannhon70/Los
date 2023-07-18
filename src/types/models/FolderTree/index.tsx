

export interface IListChildTemplate{
  id: number;
  name: string;
  template_folder_id: number;
}

export interface IListChild{
  id: number;
  name: string;
  child_template: IListChildTemplate[];
}

export interface IListTemplate{
  id: number;
  name: string;
  child: IListChild[];
  child_template: IListChildTemplate[];
}




export interface IListTemplateForCreateGroup{
  template_fields: IListTemplateForCreateGroupItem[]
}

export interface IListTemplateForCreateGroupItem{
  id: number,
  key: string
}