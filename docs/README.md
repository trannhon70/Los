# Cấu trúc thư mục dự án

Dự án được viết bằng `TypeScript` và các file của dự án yêu cầu phải được đặt tên với phần mở rộng là `.tsx`.

Sử dụng thư viện `Material UI` để cấu hình giao diện và xây dựng component.

Sử dụng `@reduxjs/toolkit` để quản lý dữ liệu và `redux-saga` để quản lý middleware action của redux.

Ở tập tin `tsconfig.json` đã khai báo thuộc tính `baseURL` là `./src`. Do đó các đường dẫn `import` trong quá trình phát triển dự án hạn chế sử dụng cú pháp `../`.

- [app](#app)
  - [hooks](#app--hooks)
  - [navigations](#app--navigations)
  - [stores](#app--store)
- [assets](#assets)
  - [css](#css)
  - [images](#images)
- [features](#features)
- [types](#types)
- [views](#views)
  - [components](#components)
  - [includes](#includes)
  - [pages](#pages)

## app

Thư mục `app` để chứa các cấu hình chung của dự án. File `App.tsx` chạy chính cũng được đặt ở thư mục này.

- `app/App.tsx`: Tập tin chứa component chính của dự án.
- `app/history.tsx`: Tập tin chứa đối tượng `history` của trình duyệt được tạo từ `react-router-dom`. Đối tượng này hỗ trợ quản lý lịch sử trình duyệt với `react-router-dom` verson `5.x` trở về trước. Hiện tại đang sử dụng `react-router-dom@6.x` nên đối tượng `history` không được sử dụng nữa, thay vào đó là sử dụng hook `useNavigation()`.
- `app/i18n.tsx`: Tập tin cấu hình song ngữ cho dự án.
- `app/PageURL.tsx`: Tập tin xuất ra một đối tượng chứa các đường dẫn của dự án.
- `app/theme.tsx`: Tập tin chứa cấu hình của theme của dự dán được khởi tạo từ thư viện Material UI.

### app / hooks

Trong quá trình phát triển dự án, các `hooks` được viết ở thư mục này.

### app / navigations

Các đường dẫn được cấu hình cho `react-router-dom` sẽ được khai báo ở đây theo dạng một mảng các `Route`.

Các `route` được khai báo tuân thủ theo interface `IRoute` định nghĩa ở tập tin `types/route.tsx`.

```ts
export interface IRoute {
  path?: string;
  icon?: ReactNode;
  iconText?: string;
  name?: string;
  label?: string;
  component?: ComponentType<any> | null;
  badge?: IBadge;
  auth?: string[];
  children?: IRoute[];
  type?: string;
  exact?: boolean;
  isRoute?: boolean;
}
```

Thuộc tính `isRoute` nếu được khai báo là `true` thì `route` này sẽ không xuất hiện ở menu Sidebar.

Nếu `path` và `element` không được khai báo thì sẽ không được config bởi `react-router-dom`.

- `app/navigations/auth.tsx`: Chứa các route trước khi được đăng nhập.
- `app/navigations/sidebar.tsx`: Chứa các route sau khi đăng nhập và các route này cũng sẽ dùng để tạo sidebar.

### app / store

Thư mục chứa các cấu hình cho `redux`.

- `app/store/reducer.tsx`: Tập tin tạo reducer tổng của sự án, các reducer con được tạo từ thư mục `features`.
- `app/store/saga.tsx`: Tập tin tạo các hàm saga cho các reducer và được tạo từ thư mục `features`.
- `app/store/store.tsx`: Tạo store tổng cho dự án, các cấu hình của store cũng được thực hiện ở đây. Nhận `reducer` và `rootSaga` từ tập tin `reducer.tsx` và `saga.tsx`.

Trong quá trình phát triển dự án, các reducer và saga được khởi tạo từ `features` chỉ cần nhúng thêm vào tập tin `reducer.tsx` và `saga.tsx` là đủ.

Reducer nhận `state` tổng với `state` có interface là `RootState` được khai báo ở tập tin `types/reducer.tsx`. Trong quá trình phát triển dự án, các state con được khai báo thêm ở interface và reducer.

## assets

Thư mục chứa các tiện ích CSS và hình ảnh cho dự án.

- `assets/css`: Thư mục chứa các hàm hook tạo các CSS global cho dự án và được khởi tạo bởi hook `makeStyle()` của thư viện Material UI. Cú pháp CSS được viết như SCSS. Các hook CSS được sinh ra phải được gọi ở tập tin `views/includes/GlobalCss.tsx` thì các CSS mới được áp dụng.
- `assets/images`: Thư mục chứa các hình ảnh tĩnh mà được import bên trong các component của dự án. Các hình ảnh khác phải được đặt ở thưc mục `public` của dự án.

## features

Thư mục để chứa các store con trong quá trình phát triển dự án.

Với mỗi thư mục được tạo trực tiếp bên trong `features` nên là một store con. Nếu store quá lớn cho một tính năng thì có thể chia nhỏ thưc mục bên trong nữa.

Cách thức tạo store bên trong nên tạo theo cấu trúc như sau:

```
<store_folder>
    actions.tsx       // Chứa các hàm action cho các hooks hoặc component sử dụng qua useDispatch()().
    api.tsx           // Chứa các hàm cơ bản gọi API.
    case.tsx          // Chứa các case reducer
    saga.tsx          // Chứa các hàm saga của store, xuất ra root saga của store.
    selectors.tsx     // Chứa các hàm selector để các hook hoặc component sử dụng qua useSelector().
    slice.tsx         // Chứa slice của store, xuất ra Reducer và Action
    state.tsx         // Chứa đối tượng state giá trị khởi tạo ban đầu của store
```

## types

Đây là thư mục định nghĩa kiểu dữ liệu cho `Typescript`. Không được viết bất kỳ code xử lý hoặc biến hoặc hàm gì ở đây.

Trong quá trình biên dịch hoặc render, thư mục này bị typescript bỏ qua cho nên code được viết thêm ở đây sẽ không làm render lại dự án. Do đó nếu có code mới ở đây cần phải tải lại dự án bằng cách Refresh browser.

Các interface hoặc type định nghĩa cho các API phải được viết ở thư mục `types/models`.

## utils

Chứa các tiện ích của dự án. Trong quá trình phát triển các tiện ích được viết thêm phải viết trong thư mục này.

- `utils/api.tsx`: Tập tin chứa các hàm hỗ trợ gọi API ([Chi tiết](utils/api.md)).
- `utils/constants.tsx`: Tập tin chứa các hằng hỗ trợ cấu hình dự án bao gồm các Enum ([Chi tiết](utils/constants.md)).
- `utils/date.tsx`: Tập tin chứa các hàm hỗ trợ về date ([Chi tiết](utils/date.md)).
- `utils/error.tsx`: Tập tin chứa các hàm và hằng hỗ trợ xử lý lỗi từ API ([Chi tiết](utils/error.md)).
- `utils/phoneVN.tsx`: Tập tin chứa các tiện tích về số điện thoại VN ([Chi tiết](utils/phoneVN.md)).
- `utils/validate.tsx`: Tập tin chứa các tiện tích validate dữ liệu ([Chi tiết](utils/validate.md)).

## views

Thư mục chứa các giao diện của dự án.
### components

Thư mục chứa các component.

- `base`: Chứa các component cơ bản được cấu hình từ thư viện Material UI hoặc được phát triển thêm.
- `layout`: Chứa các component được phát triển dựa theo design.
- `widgets`: Chứa các component được phát triển theo một tính năng tổng thể của dự án.

### includes

Chứa các component tổng của dự án, chỉ được gọi một lần ở `app/App.tsx`.

### pages

Chứa các trang chính sẽ được phát triển của dự án.