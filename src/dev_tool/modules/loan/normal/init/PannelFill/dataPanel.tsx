
export interface IDataFillPanel {
  id: string;
  name: string;
  type: string;
  code:string;
  content:boolean;
  children: IDataFillPanel[]
}


export const dataFillPanelInit: IDataFillPanel[] = [
  {
    id: "LOAN_NORMAL",
    name: "Khởi tạo hồ sơ",
    type: "S1_init",
    code:"S1",
    content:false,
    children: [
      {
        id: "Product", 
        name: "Thông Tin Pháp Lý",
        type: "S1_init",
        code:"S1",
        content:false,
        children: [
          {
            id: "Product", 
            name: "Nhập Người Vay Chính",
            type: "S1_init",
            code:"LEGAL_BORROWER",
            content:true,
            children: []
          },
          {
            id: "Product", 
            name: "Nhập Full Dữ Liệu",
            type: "S1_init",
            code:"LEGAL_FULL",
            content:true,
            children: []
          },
        ]
      },
      {
        id: "CIC",
        name: "Thông Tin CIC",
        type: "S1_init",
        code:"S1",
        content:false,
        children: [
          {
            id: "CIC", 
            name: "Nhập Full CIC OTHER",
            type: "S1_init",
            code:"CIC_FULL",
            content:true,
            children: []
          },
          {
            id: "CIC", 
            name: "Nhập Full CIC SCB",
            type: "S1_init",
            code:"CIC_FULL_SCB",
            content:true,
            children: []
          },
        ]
      },
      {
        id: "Product",
        name: "Thông Tin Khoản Vay",
        type: "S1_init",
        code:"S1",
        content:false,
        children: [
          {
            id: "CIC", 
            name: "Thông tin sản phẩm chương trình vay",
            type: "S1_init",
            code:"LOAN_A",
            content:true,
            children: []
          },
          {
            id: "CIC", 
            name: "Nhu cầu và phương án vay vốn",
            type: "S1_init",
            code:"LOAN_B",
            content:true,
            children: []
          },
          {
            id: "CIC", 
            name: "Pháp lý hộ kinh doanh",
            type: "S1_init",
            code:"LOAN_C",
            content:true,
            children: []
          },
          {
            id: "CIC", 
            name: "Phân tích tài chính",
            type: "S1_init",
            code:"LOAN_D",
            content:true,
            children: []
          },
        ]
      },
      {
        id: "Product",
        name: "Nguồn Thu Nhập",
        type: "S1_init",
        code:"S1",
        content:false,
        children: [
          {
            id: "CIC", 
            name: "Full Nguồn Thu Nhập",
            type: "S1_init",
            code:"FULL_INCOME",
            content:true,
            children: []
          },
        ]
      },
      {
        id: "Product",
        name: "Tài Sản Đảm bảo",
        type: "S1_init",
        code:"S1",
        content:false,
        children: [
          {
            id: "CIC", 
            name: "BDS Đất",
            type: "S1_init",
            code:"COLLATERAL_LAND",
            content:true,
            children: []
          },
          {
            id: "CIC", 
            name: "BDS Chung Cư",
            type: "S1_init",
            code:"COLLATERAL_DEPARTMENT",
            content:true,
            children: []
          },
          {
            id: "CIC", 
            name: "BDS Chợ",
            type: "S1_init",
            code:"COLLATERAL_MARKET",
            content:true,
            children: []
          },
          {
            id: "CIC", 
            name: "PTVT",
            type: "S1_init",
            code:"MEST",
            content:true,
            children: []
          },
          {
            id: "CIC", 
            name: "Máy Móc",
            type: "S1_init",
            code:"MACHINE",
            content:true,
            children: []
          },
          {
            id: "CIC", 
            name: "Vật Tư Hàng Hóa",
            type: "S1_init",
            code:"GODS",
            content:true,
            children: []
          },
          {
            id: "CIC", 
            name: "Tài Sản Khác",
            type: "S1_init",
            code:"OTHER",
            content:true,
            children: []
          },
          {
            id: "CIC", 
            name: "Quyền TS",
            type: "S1_init",
            code:"PROPERTY",
            content:true,
            children: []
          },
          {
            id: "CIC", 
            name: "Chứng Khoán",
            type: "S1_init",
            code:"STOCK",
            content:true,
            children: []
          },
          {
            id: "CIC", 
            name: "Số Dư Tiền Gửi",
            type: "S1_init",
            code:"DEPOSIT",
            content:true,
            children: []
          },
        ]
      },
      {
        id: "Product",
        name: "Hồ Sơ Khác",
        type: "S1_init",
        code:"S1",
        content:false,
        children: [
          {
            id: "CIC", 
            name: "Full HSK",
            type: "S1_init",
            code:"S1",
            content:true,
            children: []
          },
        ]
      },
      {
        id: "Product",
        name: "XHTDNB",
        type: "S1_init",
        code:"S1",
        content:false,
        children: [
          {
            id: "CIC", 
            name: "Full HSK",
            type: "S1_init",
            code:"S1",
            content:true,
            children: []
          },
        ]
      },
      {
        id: "Product",
        name: "Kiểm Soát Nội Nộ",
        type: "S1_init",
        code:"S1",
        content:false,
        children: [
          {
            id: "CIC", 
            name: "S1 to S2",
            type: "S1_init",
            code:"S1",
            content:true,
            children: []
          },
        ]
      }
    ]
  },
  {
    id: "LOAN_NORMAL111",
    name: "Thẩm định phê duyệt",
    type: "S1_init",
    code:"S1",
    content:false,
    children: []
  },


]