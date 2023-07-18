
const useBranchGeojson = () => {

  // const fetching = useSelector(branchGeojsonFetching);
  // const fetched = useSelector(branchGeojsonFetched);
  // const data = useSelector(getBranchGeojsonList);
  // const dispatch = useDispatch();
  
  // useEffect(() => {
  //   !fetched && !fetching && dispatch(branchGeojsonFetchData());
  // });

  const branchList: GeoJSON.FeatureCollection = {
    "type": "FeatureCollection",
    "features": [
      {
        "id": "033",
        "type": "Feature",
        "properties": {
          "id": "033",
          "name": "CN Gia Định-PGD Nguyễn Thái Sơn",
          "code": "033",
          "address": "",
          "zone_id": "V06",
          "zone_name": "Vùng 06",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.690493,
            10.82722615,
            0
          ]
        }
      },
      {
        "id": "041",
        "type": "Feature",
        "properties": {
          "id": "041",
          "name": "CN Hóc Môn-PGD An Hội",
          "code": "041",
          "address": "",
          "zone_id": "V06",
          "zone_name": "Vùng 06",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.644247,
            10.841711,
            0
          ]
        }
      },
      {
        "id": "048",
        "type": "Feature",
        "properties": {
          "id": "048",
          "name": "CN Hai Bà Trưng-PGD Thanh Nhàn",
          "code": "048",
          "address": "",
          "zone_id": "V12",
          "zone_name": "Vùng 12",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.862388,
            20.997765,
            0
          ]
        }
      },
      {
        "id": "063",
        "type": "Feature",
        "properties": {
          "id": "063",
          "name": "CN Bình Định-PGD Ngô Mây",
          "code": "063",
          "address": "",
          "zone_id": "V10",
          "zone_name": "Vùng 10",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            109.2162701,
            13.76363987,
            0
          ]
        }
      },
      {
        "id": "087",
        "type": "Feature",
        "properties": {
          "id": "087",
          "name": "CN Bình Dương-PGD Bến Cát",
          "code": "087",
          "address": "",
          "zone_id": "V09",
          "zone_name": "Vùng 09",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.589053,
            11.152495,
            0
          ]
        }
      },
      {
        "id": "089",
        "type": "Feature",
        "properties": {
          "id": "089",
          "name": "CN Nghệ An",
          "code": "089",
          "address": "",
          "zone_id": "V11",
          "zone_name": "Vùng 11",
          "area_id": "K04",
          "area_name": "KV DUYÊN HẢI BẮC BỘ",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.678024,
            18.68664837,
            0
          ]
        }
      },
      {
        "id": "105",
        "type": "Feature",
        "properties": {
          "id": "105",
          "name": "CN Long An-PGD Bến Lức",
          "code": "105",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.485967,
            10.64070355,
            0
          ]
        }
      },
      {
        "id": "136",
        "type": "Feature",
        "properties": {
          "id": "136",
          "name": "CN Trà Vinh-PGD Nguyễn Đáng",
          "code": "136",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.3332655,
            9.9269592,
            0
          ]
        }
      },
      {
        "id": "143",
        "type": "Feature",
        "properties": {
          "id": "143",
          "name": "CN Bến Thành",
          "code": "143",
          "address": "",
          "zone_id": "V01",
          "zone_name": "Vùng 01",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "SCNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6945055,
            10.77131117,
            0
          ]
        }
      },
      {
        "id": "146",
        "type": "Feature",
        "properties": {
          "id": "146",
          "name": "CN Phú Đông-PGD Phú Nhuận",
          "code": "146",
          "address": "",
          "zone_id": "V01",
          "zone_name": "Vùng 01",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6826391,
            10.795046,
            0
          ]
        }
      },
      {
        "id": "172",
        "type": "Feature",
        "properties": {
          "id": "172",
          "name": "CN Thống Nhất-PGD Âu Lạc",
          "code": "172",
          "address": "",
          "zone_id": "V05",
          "zone_name": "Vùng 05",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6448557,
            10.77066375,
            0
          ]
        }
      },
      {
        "id": "140",
        "type": "Feature",
        "properties": {
          "id": "140",
          "name": "CN Sài Gòn-PGD Trần Hưng Đạo",
          "code": "140",
          "address": "",
          "zone_id": "V02",
          "zone_name": "Vùng 02",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6834655,
            10.75560645,
            0
          ]
        }
      },
      {
        "id": "229",
        "type": "Feature",
        "properties": {
          "id": "229",
          "name": "CN Cần Giuộc-PGD Đức Hòa",
          "code": "229",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.4960557,
            10.79948248,
            0
          ]
        }
      },
      {
        "id": "092",
        "type": "Feature",
        "properties": {
          "id": "092",
          "name": "CN Hồng Bàng-PGD Lạch Tray",
          "code": "092",
          "address": "",
          "zone_id": "V11",
          "zone_name": "Vùng 11",
          "area_id": "K04",
          "area_name": "KV DUYÊN HẢI BẮC BỘ",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6960926,
            20.8353914,
            0
          ]
        }
      },
      {
        "id": "111",
        "type": "Feature",
        "properties": {
          "id": "111",
          "name": "CN Đồng Nai",
          "code": "111",
          "address": "",
          "zone_id": "V09",
          "zone_name": "Vùng 09",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.8355628,
            10.96240006,
            0
          ]
        }
      },
      {
        "id": "113",
        "type": "Feature",
        "properties": {
          "id": "113",
          "name": "CN Bến Tre",
          "code": "113",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.3748681,
            10.24621134,
            0
          ]
        }
      },
      {
        "id": "116",
        "type": "Feature",
        "properties": {
          "id": "116",
          "name": "CN Bắc Ninh",
          "code": "116",
          "address": "",
          "zone_id": "V11",
          "zone_name": "Vùng 11",
          "area_id": "K04",
          "area_name": "KV DUYÊN HẢI BẮC BỘ",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.0737664,
            21.17683333,
            0
          ]
        }
      },
      {
        "id": "153",
        "type": "Feature",
        "properties": {
          "id": "153",
          "name": "CN Gia Định-PGD Nguyễn Oanh",
          "code": "153",
          "address": "",
          "zone_id": "V06",
          "zone_name": "Vùng 06",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6777221,
            10.83040159,
            0
          ]
        }
      },
      {
        "id": "195",
        "type": "Feature",
        "properties": {
          "id": "195",
          "name": "CN Hai Bà Trưng-PGD Trần Khát Chân",
          "code": "195",
          "address": "",
          "zone_id": "V12",
          "zone_name": "Vùng 12",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8536168,
            21.00857495,
            0
          ]
        }
      },
      {
        "id": "204",
        "type": "Feature",
        "properties": {
          "id": "204",
          "name": "CN Bình Tây",
          "code": "204",
          "address": "",
          "zone_id": "V03",
          "zone_name": "Vùng 03",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "SCNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6501609,
            10.75118024,
            0
          ]
        }
      },
      {
        "id": "005",
        "type": "Feature",
        "properties": {
          "id": "005",
          "name": "CN Chợ Lớn-PGD Quận 8",
          "code": "005",
          "address": "",
          "zone_id": "V03",
          "zone_name": "Vùng 03",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.656879,
            10.744433,
            0
          ]
        }
      },
      {
        "id": "026",
        "type": "Feature",
        "properties": {
          "id": "026",
          "name": "CN Phạm Ngọc Thạch-PGD Nguyễn Thông",
          "code": "026",
          "address": "",
          "zone_id": "V02",
          "zone_name": "Vùng 02",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6804239,
            10.78054389,
            0
          ]
        }
      },
      {
        "id": "028",
        "type": "Feature",
        "properties": {
          "id": "028",
          "name": "CN Gia Định-PGD Bà Chiểu",
          "code": "028",
          "address": "",
          "zone_id": "V06",
          "zone_name": "Vùng 06",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.686437,
            10.804423,
            0
          ]
        }
      },
      {
        "id": "037",
        "type": "Feature",
        "properties": {
          "id": "037",
          "name": "CN Thống Nhất-PGD Lý Thường Kiệt",
          "code": "037",
          "address": "",
          "zone_id": "V06",
          "zone_name": "Vùng 06",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6539752,
            10.78590949,
            0
          ]
        }
      },
      {
        "id": "039",
        "type": "Feature",
        "properties": {
          "id": "039",
          "name": "CN Tân Bình-PGD An Sương",
          "code": "039",
          "address": "",
          "zone_id": "V05",
          "zone_name": "Vùng 05",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6195161,
            10.83553461,
            0
          ]
        }
      },
      {
        "id": "042",
        "type": "Feature",
        "properties": {
          "id": "042",
          "name": "CN Tân Bình-PGD Tân Sơn Nhất",
          "code": "042",
          "address": "",
          "zone_id": "V06",
          "zone_name": "Vùng 06",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.671087,
            10.809024,
            0
          ]
        }
      },
      {
        "id": "064",
        "type": "Feature",
        "properties": {
          "id": "064",
          "name": "CN Đà Nẵng",
          "code": "064",
          "address": "",
          "zone_id": "V10",
          "zone_name": "Vùng 10",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            108.2232821,
            16.0625009,
            0
          ]
        }
      },
      {
        "id": "066",
        "type": "Feature",
        "properties": {
          "id": "066",
          "name": "CN Đà Nẵng-PGD Hàm Nghi",
          "code": "066",
          "address": "",
          "zone_id": "V10",
          "zone_name": "Vùng 10",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            108.210952,
            16.06207394,
            0
          ]
        }
      },
      {
        "id": "067",
        "type": "Feature",
        "properties": {
          "id": "067",
          "name": "CN Đà Nẵng-PGD Phan Đăng Lưu",
          "code": "067",
          "address": "",
          "zone_id": "V10",
          "zone_name": "Vùng 10",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            108.2162547,
            16.03618807,
            0
          ]
        }
      },
      {
        "id": "069",
        "type": "Feature",
        "properties": {
          "id": "069",
          "name": "CN Đà Nẵng-PGD Sơn Trà",
          "code": "069",
          "address": "",
          "zone_id": "V10",
          "zone_name": "Vùng 10",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            108.2323265,
            16.06768154,
            0
          ]
        }
      },
      {
        "id": "071",
        "type": "Feature",
        "properties": {
          "id": "071",
          "name": "CN Cần Thơ",
          "code": "071",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.7674117,
            10.01836765,
            0
          ]
        }
      },
      {
        "id": "073",
        "type": "Feature",
        "properties": {
          "id": "073",
          "name": "CN Cần Thơ-PGD An Hòa",
          "code": "073",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.7749745,
            10.0484243,
            0
          ]
        }
      },
      {
        "id": "074",
        "type": "Feature",
        "properties": {
          "id": "074",
          "name": "CN Quảng Ninh",
          "code": "074",
          "address": "",
          "zone_id": "V11",
          "zone_name": "Vùng 11",
          "area_id": "K04",
          "area_name": "KV DUYÊN HẢI BẮC BỘ",
          "type": "SCNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            107.0854192,
            20.95806826,
            0
          ]
        }
      },
      {
        "id": "084",
        "type": "Feature",
        "properties": {
          "id": "084",
          "name": "CN Vũng Tàu-PGD Thắng Nhất",
          "code": "084",
          "address": "",
          "zone_id": "V09",
          "zone_name": "Vùng 09",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            107.0834291,
            10.36486762,
            0
          ]
        }
      },
      {
        "id": "096",
        "type": "Feature",
        "properties": {
          "id": "096",
          "name": "CN Đồng Tháp-PGD Sa Đéc",
          "code": "096",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.7674455,
            10.29148188,
            0
          ]
        }
      },
      {
        "id": "099",
        "type": "Feature",
        "properties": {
          "id": "099",
          "name": "CN Tiền Giang-PGD Gò Công",
          "code": "099",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.674221,
            10.36014068,
            0
          ]
        }
      },
      {
        "id": "107",
        "type": "Feature",
        "properties": {
          "id": "107",
          "name": "CN Đaklak",
          "code": "107",
          "address": "",
          "zone_id": "V09",
          "zone_name": "Vùng 09",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            108.042857,
            12.68350498,
            0
          ]
        }
      },
      {
        "id": "108",
        "type": "Feature",
        "properties": {
          "id": "108",
          "name": "CN Đaklak-PGD Nguyễn Tất Thành",
          "code": "108",
          "address": "",
          "zone_id": "V09",
          "zone_name": "Vùng 09",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            108.0545175,
            12.68971484,
            0
          ]
        }
      },
      {
        "id": "114",
        "type": "Feature",
        "properties": {
          "id": "114",
          "name": "CN Trà Vinh",
          "code": "114",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.341172,
            9.9348,
            0
          ]
        }
      },
      {
        "id": "133",
        "type": "Feature",
        "properties": {
          "id": "133",
          "name": "CN Cầu Giấy",
          "code": "133",
          "address": "",
          "zone_id": "V15",
          "zone_name": "Vùng 15",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "SCNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8009691,
            21.01512501,
            0
          ]
        }
      },
      {
        "id": "158",
        "type": "Feature",
        "properties": {
          "id": "158",
          "name": "CN Bến Thành-PGD Trần Não",
          "code": "158",
          "address": "",
          "zone_id": "V07",
          "zone_name": "Vùng 07",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.7309897,
            10.79614615,
            0
          ]
        }
      },
      {
        "id": "159",
        "type": "Feature",
        "properties": {
          "id": "159",
          "name": "CN Tân Định-PGD Trần Quang Khải",
          "code": "159",
          "address": "",
          "zone_id": "V01",
          "zone_name": "Vùng 01",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6901314,
            10.79183757,
            0
          ]
        }
      },
      {
        "id": "162",
        "type": "Feature",
        "properties": {
          "id": "162",
          "name": "CN Phạm Ngọc Thạch-PGD Hoàng Sa",
          "code": "162",
          "address": "",
          "zone_id": "V06",
          "zone_name": "Vùng 06",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6750472,
            10.7856548,
            0
          ]
        }
      },
      {
        "id": "218",
        "type": "Feature",
        "properties": {
          "id": "218",
          "name": "CN Hải Phòng-PGD An Biên",
          "code": "218",
          "address": "",
          "zone_id": "V11",
          "zone_name": "Vùng 11",
          "area_id": "K04",
          "area_name": "KV DUYÊN HẢI BẮC BỘ",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.675136,
            20.8556419,
            0
          ]
        }
      },
      {
        "id": "237",
        "type": "Feature",
        "properties": {
          "id": "237",
          "name": "CN Bà Rịa Vũng Tàu-PGD Đại An",
          "code": "237",
          "address": "",
          "zone_id": "V09",
          "zone_name": "Vùng 09",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            107.0931946,
            10.3832897,
            0
          ]
        }
      },
      {
        "id": "239",
        "type": "Feature",
        "properties": {
          "id": "239",
          "name": "CN Kiên Giang-PGD Rạch Sỏi",
          "code": "239",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.1264838,
            9.946968,
            0
          ]
        }
      },
      {
        "id": "240",
        "type": "Feature",
        "properties": {
          "id": "240",
          "name": "CN Đồng Nai-PGD Long Thành",
          "code": "240",
          "address": "",
          "zone_id": "V09",
          "zone_name": "Vùng 09",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.9494701,
            10.7853156,
            0
          ]
        }
      },
      {
        "id": "106",
        "type": "Feature",
        "properties": {
          "id": "106",
          "name": "CN Gia Lai",
          "code": "106",
          "address": "",
          "zone_id": "V09",
          "zone_name": "Vùng 09",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            107.9939928,
            13.97954642,
            0
          ]
        }
      },
      {
        "id": "109",
        "type": "Feature",
        "properties": {
          "id": "109",
          "name": "CN Bình Thuận",
          "code": "109",
          "address": "",
          "zone_id": "V09",
          "zone_name": "Vùng 09",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            108.103893,
            10.935637,
            0
          ]
        }
      },
      {
        "id": "142",
        "type": "Feature",
        "properties": {
          "id": "142",
          "name": "CN Bà Rịa Vũng Tàu",
          "code": "142",
          "address": "",
          "zone_id": "V09",
          "zone_name": "Vùng 09",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            107.0748777,
            10.35550249,
            0
          ]
        }
      },
      {
        "id": "145",
        "type": "Feature",
        "properties": {
          "id": "145",
          "name": "CN Phú Đông-PGD Phan Xích Long",
          "code": "145",
          "address": "",
          "zone_id": "V07",
          "zone_name": "Vùng 07",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6888225,
            10.79782894,
            0
          ]
        }
      },
      {
        "id": "157",
        "type": "Feature",
        "properties": {
          "id": "157",
          "name": "CN Bến Thành-PGD Nam Kỳ Khởi Nghĩa",
          "code": "157",
          "address": "",
          "zone_id": "V01",
          "zone_name": "Vùng 01",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.685015,
            10.7885709,
            0
          ]
        }
      },
      {
        "id": "196",
        "type": "Feature",
        "properties": {
          "id": "196",
          "name": "CN Thăng Long-PGD Lý Nam Đế",
          "code": "196",
          "address": "",
          "zone_id": "V14",
          "zone_name": "Vùng 14",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8482199,
            21.03175012,
            0
          ]
        }
      },
      {
        "id": "199",
        "type": "Feature",
        "properties": {
          "id": "199",
          "name": "CN Thăng Long-PGD Bạch Đằng",
          "code": "199",
          "address": "",
          "zone_id": "V14",
          "zone_name": "Vùng 14",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.862629,
            21.014321,
            0
          ]
        }
      },
      {
        "id": "008",
        "type": "Feature",
        "properties": {
          "id": "008",
          "name": "CN Chợ Lớn-PGD Kinh Dương Vương",
          "code": "008",
          "address": "",
          "zone_id": "V03",
          "zone_name": "Vùng 03",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6328994,
            10.75255915,
            0
          ]
        }
      },
      {
        "id": "015",
        "type": "Feature",
        "properties": {
          "id": "015",
          "name": "CN Phạm Ngọc Thạch-PGD Quận 10",
          "code": "015",
          "address": "",
          "zone_id": "V02",
          "zone_name": "Vùng 02",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6766044,
            10.77247054,
            0
          ]
        }
      },
      {
        "id": "019",
        "type": "Feature",
        "properties": {
          "id": "019",
          "name": "CN Hóc Môn-PGD Lam Sơn",
          "code": "019",
          "address": "",
          "zone_id": "V05",
          "zone_name": "Vùng 05",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.5935791,
            10.88780773,
            0
          ]
        }
      },
      {
        "id": "020",
        "type": "Feature",
        "properties": {
          "id": "020",
          "name": "CN Hóc Môn-PGD Nguyễn Ảnh Thủ",
          "code": "020",
          "address": "",
          "zone_id": "V05",
          "zone_name": "Vùng 05",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6207446,
            10.87279329,
            0
          ]
        }
      },
      {
        "id": "027",
        "type": "Feature",
        "properties": {
          "id": "027",
          "name": "CN Gia Định",
          "code": "027",
          "address": "",
          "zone_id": "V06",
          "zone_name": "Vùng 06",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.67705,
            10.799585,
            0
          ]
        }
      },
      {
        "id": "029",
        "type": "Feature",
        "properties": {
          "id": "029",
          "name": "CN Hóc Môn-PGD Gò Vấp",
          "code": "029",
          "address": "",
          "zone_id": "V06",
          "zone_name": "Vùng 06",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6607022,
            10.8362987,
            0
          ]
        }
      },
      {
        "id": "070",
        "type": "Feature",
        "properties": {
          "id": "070",
          "name": "CN Sông Hàn-PGD Liên Chiểu",
          "code": "070",
          "address": "",
          "zone_id": "V10",
          "zone_name": "Vùng 10",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            108.1509166,
            16.07049009,
            0
          ]
        }
      },
      {
        "id": "080",
        "type": "Feature",
        "properties": {
          "id": "080",
          "name": "CN 20 tháng 10-PGD Phú Mỹ",
          "code": "080",
          "address": "",
          "zone_id": "V01",
          "zone_name": "Vùng 01",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.730693,
            10.737103,
            0
          ]
        }
      },
      {
        "id": "081",
        "type": "Feature",
        "properties": {
          "id": "081",
          "name": "CN 20 tháng 10-PGD Quận 7",
          "code": "081",
          "address": "",
          "zone_id": "V01",
          "zone_name": "Vùng 01",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.7065722,
            10.73953025,
            0
          ]
        }
      },
      {
        "id": "091",
        "type": "Feature",
        "properties": {
          "id": "091",
          "name": "CN Hồng Bàng",
          "code": "091",
          "address": "",
          "zone_id": "V11",
          "zone_name": "Vùng 11",
          "area_id": "K04",
          "area_name": "KV DUYÊN HẢI BẮC BỘ",
          "type": "SCNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.68315,
            20.86135,
            0
          ]
        }
      },
      {
        "id": "101",
        "type": "Feature",
        "properties": {
          "id": "101",
          "name": "CN Kiên Giang",
          "code": "101",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.0809053,
            10.0162472,
            0
          ]
        }
      },
      {
        "id": "117",
        "type": "Feature",
        "properties": {
          "id": "117",
          "name": "CN Hải Dương",
          "code": "117",
          "address": "",
          "zone_id": "V11",
          "zone_name": "Vùng 11",
          "area_id": "K04",
          "area_name": "KV DUYÊN HẢI BẮC BỘ",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.3354219,
            20.9300722,
            0
          ]
        }
      },
      {
        "id": "125",
        "type": "Feature",
        "properties": {
          "id": "125",
          "name": "CN Tân Phú",
          "code": "125",
          "address": "",
          "zone_id": "V05",
          "zone_name": "Vùng 05",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.63204,
            10.770583,
            0
          ]
        }
      },
      {
        "id": "147",
        "type": "Feature",
        "properties": {
          "id": "147",
          "name": "CN Gia Định-PGD Nơ Trang Long",
          "code": "147",
          "address": "",
          "zone_id": "V07",
          "zone_name": "Vùng 07",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.696235,
            10.81197,
            0
          ]
        }
      },
      {
        "id": "155",
        "type": "Feature",
        "properties": {
          "id": "155",
          "name": "CN Hóc Môn-PGD Lê Đức Thọ",
          "code": "155",
          "address": "",
          "zone_id": "V06",
          "zone_name": "Vùng 06",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6683143,
            10.84775267,
            0
          ]
        }
      },
      {
        "id": "160",
        "type": "Feature",
        "properties": {
          "id": "160",
          "name": "CN Bến Thành-PGD Nguyễn Công Trứ",
          "code": "160",
          "address": "",
          "zone_id": "V01",
          "zone_name": "Vùng 01",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.7018654,
            10.76963533,
            0
          ]
        }
      },
      {
        "id": "164",
        "type": "Feature",
        "properties": {
          "id": "164",
          "name": "CN Tân Định-PGD Thị Nghè",
          "code": "164",
          "address": "",
          "zone_id": "V07",
          "zone_name": "Vùng 07",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.709402,
            10.795068,
            0
          ]
        }
      },
      {
        "id": "167",
        "type": "Feature",
        "properties": {
          "id": "167",
          "name": "CN Bến Thành-PGD Nguyễn Duy Trinh",
          "code": "167",
          "address": "",
          "zone_id": "V07",
          "zone_name": "Vùng 07",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.761768,
            10.788033,
            0
          ]
        }
      },
      {
        "id": "177",
        "type": "Feature",
        "properties": {
          "id": "177",
          "name": "CN Phạm Ngọc Thạch-PGD 3 tháng 2",
          "code": "177",
          "address": "",
          "zone_id": "V02",
          "zone_name": "Vùng 02",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.671233,
            10.770232,
            0
          ]
        }
      },
      {
        "id": "180",
        "type": "Feature",
        "properties": {
          "id": "180",
          "name": "CN Tân Bình-PGD Trương Vĩnh Ký",
          "code": "180",
          "address": "",
          "zone_id": "V05",
          "zone_name": "Vùng 05",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.631729,
            10.79422995,
            0
          ]
        }
      },
      {
        "id": "183",
        "type": "Feature",
        "properties": {
          "id": "183",
          "name": "CN Hà Nội",
          "code": "183",
          "address": "",
          "zone_id": "V12",
          "zone_name": "Vùng 12",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "SCNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8192418,
            21.01364755,
            0
          ]
        }
      },
      {
        "id": "187",
        "type": "Feature",
        "properties": {
          "id": "187",
          "name": "CN Cầu Giấy-PGD Nguyễn Khánh Toàn",
          "code": "187",
          "address": "",
          "zone_id": "V15",
          "zone_name": "Vùng 15",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8038765,
            21.03563613,
            0
          ]
        }
      },
      {
        "id": "208",
        "type": "Feature",
        "properties": {
          "id": "208",
          "name": "CN Tân Bình-PGD Nguyễn Sơn",
          "code": "208",
          "address": "",
          "zone_id": "V05",
          "zone_name": "Vùng 05",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.623163,
            10.784149,
            0
          ]
        }
      },
      {
        "id": "210",
        "type": "Feature",
        "properties": {
          "id": "210",
          "name": "CN 20 tháng 10-PGD Trung Sơn",
          "code": "210",
          "address": "",
          "zone_id": "V01",
          "zone_name": "Vùng 01",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6889902,
            10.72927108,
            0
          ]
        }
      },
      {
        "id": "217",
        "type": "Feature",
        "properties": {
          "id": "217",
          "name": "CN Hải Phòng-PGD Hàng Kênh",
          "code": "217",
          "address": "",
          "zone_id": "V11",
          "zone_name": "Vùng 11",
          "area_id": "K04",
          "area_name": "KV DUYÊN HẢI BẮC BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6805502,
            20.85086662,
            0
          ]
        }
      },
      {
        "id": "220",
        "type": "Feature",
        "properties": {
          "id": "220",
          "name": "CN Sông Hàn",
          "code": "220",
          "address": "",
          "zone_id": "V10",
          "zone_name": "Vùng 10",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            108.224956,
            16.068715,
            0
          ]
        }
      },
      {
        "id": "221",
        "type": "Feature",
        "properties": {
          "id": "221",
          "name": "CN Đà Nẵng-PGD Núi Thành",
          "code": "221",
          "address": "",
          "zone_id": "V10",
          "zone_name": "Vùng 10",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            108.2212445,
            16.04621621,
            0
          ]
        }
      },
      {
        "id": "223",
        "type": "Feature",
        "properties": {
          "id": "223",
          "name": "CN Sông Hàn-PGD Hòa Khê",
          "code": "223",
          "address": "",
          "zone_id": "V10",
          "zone_name": "Vùng 10",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            108.1924516,
            16.06565752,
            0
          ]
        }
      },
      {
        "id": "225",
        "type": "Feature",
        "properties": {
          "id": "225",
          "name": "CN Cần Thơ-PGD Hưng Lợi",
          "code": "225",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.7594156,
            10.01499676,
            0
          ]
        }
      },
      {
        "id": "227",
        "type": "Feature",
        "properties": {
          "id": "227",
          "name": "CN Cần Thơ-PGD Thốt Nốt",
          "code": "227",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.7805096,
            10.0458842,
            0
          ]
        }
      },
      {
        "id": "228",
        "type": "Feature",
        "properties": {
          "id": "228",
          "name": "CN Đồng Nai-PGD Biên Hòa",
          "code": "228",
          "address": "",
          "zone_id": "V09",
          "zone_name": "Vùng 09",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.8134319,
            10.94943621,
            0
          ]
        }
      },
      {
        "id": "234",
        "type": "Feature",
        "properties": {
          "id": "234",
          "name": "CN Thái Bình",
          "code": "234",
          "address": "",
          "zone_id": "V11",
          "zone_name": "Vùng 11",
          "area_id": "K04",
          "area_name": "KV DUYÊN HẢI BẮC BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.3365945,
            20.4445139,
            0
          ]
        }
      },
      {
        "id": "100",
        "type": "Feature",
        "properties": {
          "id": "100",
          "name": "CN Tiền Giang-PGD Cái Bè",
          "code": "100",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.0333496,
            10.337877,
            0
          ]
        }
      },
      {
        "id": "123",
        "type": "Feature",
        "properties": {
          "id": "123",
          "name": "CN Chợ Lớn-PGD Châu Văn Liêm",
          "code": "123",
          "address": "",
          "zone_id": "V02",
          "zone_name": "Vùng 02",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.659147,
            10.752197,
            0
          ]
        }
      },
      {
        "id": "135",
        "type": "Feature",
        "properties": {
          "id": "135",
          "name": "CN Hà Nội-PGD Ngọc Hà",
          "code": "135",
          "address": "",
          "zone_id": "V14",
          "zone_name": "Vùng 14",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.830168,
            21.034496,
            0
          ]
        }
      },
      {
        "id": "188",
        "type": "Feature",
        "properties": {
          "id": "188",
          "name": "CN Hà Nội-PGD Kim Liên",
          "code": "188",
          "address": "",
          "zone_id": "V12",
          "zone_name": "Vùng 12",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8351301,
            21.0134603,
            0
          ]
        }
      },
      {
        "id": "194",
        "type": "Feature",
        "properties": {
          "id": "194",
          "name": "CN Cầu Giấy-PGD Mỹ Đình",
          "code": "194",
          "address": "",
          "zone_id": "V15",
          "zone_name": "Vùng 15",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.7635214,
            21.04100712,
            0
          ]
        }
      },
      {
        "id": "006",
        "type": "Feature",
        "properties": {
          "id": "006",
          "name": "CN Bình Tây-PGD Phạm Phú Thứ",
          "code": "006",
          "address": "",
          "zone_id": "V03",
          "zone_name": "Vùng 03",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6443964,
            10.74328825,
            0
          ]
        }
      },
      {
        "id": "014",
        "type": "Feature",
        "properties": {
          "id": "014",
          "name": "CN Hóc Môn-PGD Hiệp Thành",
          "code": "014",
          "address": "",
          "zone_id": "V05",
          "zone_name": "Vùng 05",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.644424,
            10.8766352,
            0
          ]
        }
      },
      {
        "id": "018",
        "type": "Feature",
        "properties": {
          "id": "018",
          "name": "CN Củ Chi-PGD Tây Sài Gòn",
          "code": "018",
          "address": "",
          "zone_id": "V05",
          "zone_name": "Vùng 05",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.4845164,
            10.96965361,
            0
          ]
        }
      },
      {
        "id": "030",
        "type": "Feature",
        "properties": {
          "id": "030",
          "name": "CN Đông Sài Gòn -PGD Thủ Đức",
          "code": "030",
          "address": "",
          "zone_id": "V07",
          "zone_name": "Vùng 07",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.754539,
            10.851704,
            0
          ]
        }
      },
      {
        "id": "034",
        "type": "Feature",
        "properties": {
          "id": "034",
          "name": "CN Đông Sài Gòn-PGD Quận 9",
          "code": "034",
          "address": "",
          "zone_id": "V07",
          "zone_name": "Vùng 07",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.7838642,
            10.84393948,
            0
          ]
        }
      },
      {
        "id": "038",
        "type": "Feature",
        "properties": {
          "id": "038",
          "name": "CN Tân Bình-PGD Phạm Văn Hai",
          "code": "038",
          "address": "",
          "zone_id": "V06",
          "zone_name": "Vùng 06",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6632396,
            10.794309,
            0
          ]
        }
      },
      {
        "id": "040",
        "type": "Feature",
        "properties": {
          "id": "040",
          "name": "CN Tân Bình-PGD Tân Sơn Nhì",
          "code": "040",
          "address": "",
          "zone_id": "V05",
          "zone_name": "Vùng 05",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6322136,
            10.79867769,
            0
          ]
        }
      },
      {
        "id": "044",
        "type": "Feature",
        "properties": {
          "id": "044",
          "name": "CN Hà Nội-PGD Tây Sơn",
          "code": "044",
          "address": "",
          "zone_id": "V12",
          "zone_name": "Vùng 12",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8263837,
            21.01308047,
            0
          ]
        }
      },
      {
        "id": "046",
        "type": "Feature",
        "properties": {
          "id": "046",
          "name": "CN Thăng Long-PGD Ba Đình",
          "code": "046",
          "address": "",
          "zone_id": "V14",
          "zone_name": "Vùng 14",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.840233,
            21.041729,
            0
          ]
        }
      },
      {
        "id": "051",
        "type": "Feature",
        "properties": {
          "id": "051",
          "name": "CN Hai Bà Trưng-PGD Trần Quốc Tuấn",
          "code": "051",
          "address": "",
          "zone_id": "V14",
          "zone_name": "Vùng 14",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8426604,
            21.01891176,
            0
          ]
        }
      },
      {
        "id": "058",
        "type": "Feature",
        "properties": {
          "id": "058",
          "name": "CN An Giang-PGD Châu Đốc",
          "code": "058",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.1306834,
            10.70429925,
            0
          ]
        }
      },
      {
        "id": "059",
        "type": "Feature",
        "properties": {
          "id": "059",
          "name": "CN An Giang-PGD Phú Hòa",
          "code": "059",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.375142,
            10.369808,
            0
          ]
        }
      },
      {
        "id": "062",
        "type": "Feature",
        "properties": {
          "id": "062",
          "name": "CN Bình Định-PGD An Nhơn",
          "code": "062",
          "address": "",
          "zone_id": "V10",
          "zone_name": "Vùng 10",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            109.113257,
            13.890847,
            0
          ]
        }
      },
      {
        "id": "077",
        "type": "Feature",
        "properties": {
          "id": "077",
          "name": "CN Quảng Ninh-PGD Bãi Cháy",
          "code": "077",
          "address": "",
          "zone_id": "V11",
          "zone_name": "Vùng 11",
          "area_id": "K04",
          "area_name": "KV DUYÊN HẢI BẮC BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            107.0606534,
            20.9604879,
            0
          ]
        }
      },
      {
        "id": "078",
        "type": "Feature",
        "properties": {
          "id": "078",
          "name": "CN 20 tháng 10",
          "code": "078",
          "address": "",
          "zone_id": "V01",
          "zone_name": "Vùng 01",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6992293,
            10.75830451,
            0
          ]
        }
      },
      {
        "id": "083",
        "type": "Feature",
        "properties": {
          "id": "083",
          "name": "CN Vũng Tàu-PGD Tân Thành",
          "code": "083",
          "address": "",
          "zone_id": "V09",
          "zone_name": "Vùng 09",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            107.0543453,
            10.59714353,
            0
          ]
        }
      },
      {
        "id": "090",
        "type": "Feature",
        "properties": {
          "id": "090",
          "name": "CN Nghệ An-PGD Quang Trung",
          "code": "090",
          "address": "",
          "zone_id": "V11",
          "zone_name": "Vùng 11",
          "area_id": "K04",
          "area_name": "KV DUYÊN HẢI BẮC BỘ",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.6740042,
            18.66959998,
            0
          ]
        }
      },
      {
        "id": "151",
        "type": "Feature",
        "properties": {
          "id": "151",
          "name": "CN Gia Định-PGD Văn Lang",
          "code": "151",
          "address": "",
          "zone_id": "V06",
          "zone_name": "Vùng 06",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6747435,
            10.82777365,
            0
          ]
        }
      },
      {
        "id": "163",
        "type": "Feature",
        "properties": {
          "id": "163",
          "name": "CN Cống Quỳnh-PGD Minh Khai",
          "code": "163",
          "address": "",
          "zone_id": "V02",
          "zone_name": "Vùng 02",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.686264,
            10.7745476,
            0
          ]
        }
      },
      {
        "id": "178",
        "type": "Feature",
        "properties": {
          "id": "178",
          "name": "CN Tân Phú-PGD Lữ Gia",
          "code": "178",
          "address": "",
          "zone_id": "V05",
          "zone_name": "Vùng 05",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6528031,
            10.77133569,
            0
          ]
        }
      },
      {
        "id": "181",
        "type": "Feature",
        "properties": {
          "id": "181",
          "name": "CN Phạm Ngọc Thạch-PGD Thành Thái",
          "code": "181",
          "address": "",
          "zone_id": "V06",
          "zone_name": "Vùng 06",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6670772,
            10.77839383,
            0
          ]
        }
      },
      {
        "id": "182",
        "type": "Feature",
        "properties": {
          "id": "182",
          "name": "CN Thống Nhất-PGD Chí Linh",
          "code": "182",
          "address": "",
          "zone_id": "V06",
          "zone_name": "Vùng 06",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6550615,
            10.79180725,
            0
          ]
        }
      },
      {
        "id": "185",
        "type": "Feature",
        "properties": {
          "id": "185",
          "name": "CN Hai Bà Trưng-PGD Ngô Thì Nhậm",
          "code": "185",
          "address": "",
          "zone_id": "V12",
          "zone_name": "Vùng 12",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8527242,
            21.01779997,
            0
          ]
        }
      },
      {
        "id": "139",
        "type": "Feature",
        "properties": {
          "id": "139",
          "name": "CN Đông Sài Gòn-PGD Đỗ Xuân hợp",
          "code": "139",
          "address": "",
          "zone_id": "V07",
          "zone_name": "Vùng 07",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.7702141,
            10.8211785,
            0
          ]
        }
      },
      {
        "id": "222",
        "type": "Feature",
        "properties": {
          "id": "222",
          "name": "CN Sông Hàn-PGD Đống Đa",
          "code": "222",
          "address": "",
          "zone_id": "V10",
          "zone_name": "Vùng 10",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            108.2133749,
            16.0725659,
            0
          ]
        }
      },
      {
        "id": "231",
        "type": "Feature",
        "properties": {
          "id": "231",
          "name": "CN Bình Dương-PGD Thuận An",
          "code": "231",
          "address": "",
          "zone_id": "V09",
          "zone_name": "Vùng 09",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6991521,
            10.90069606,
            0
          ]
        }
      },
      {
        "id": "235",
        "type": "Feature",
        "properties": {
          "id": "235",
          "name": "CN Gia Lai-PGD Đắk Đoa",
          "code": "235",
          "address": "",
          "zone_id": "V09",
          "zone_name": "Vùng 09",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            108.1217805,
            13.994907,
            0
          ]
        }
      },
      {
        "id": "238",
        "type": "Feature",
        "properties": {
          "id": "238",
          "name": "CN Vĩnh Long-PGD Trà Ôn",
          "code": "238",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.9235191,
            9.9637843,
            0
          ]
        }
      },
      {
        "id": "097",
        "type": "Feature",
        "properties": {
          "id": "097",
          "name": "CN Tiền Giang",
          "code": "097",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.3724722,
            10.35474201,
            0
          ]
        }
      },
      {
        "id": "127",
        "type": "Feature",
        "properties": {
          "id": "127",
          "name": "CN Tân Phú-PGD Tân Phước",
          "code": "127",
          "address": "",
          "zone_id": "V02",
          "zone_name": "Vùng 02",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6601209,
            10.76258705,
            0
          ]
        }
      },
      {
        "id": "130",
        "type": "Feature",
        "properties": {
          "id": "130",
          "name": "CN Tân Định-PGD Xô Viết Nghệ Tĩnh",
          "code": "130",
          "address": "",
          "zone_id": "V07",
          "zone_name": "Vùng 07",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.7113477,
            10.80020015,
            0
          ]
        }
      },
      {
        "id": "165",
        "type": "Feature",
        "properties": {
          "id": "165",
          "name": "CN Thống Nhất-PGD Bảy Hiền",
          "code": "165",
          "address": "",
          "zone_id": "V06",
          "zone_name": "Vùng 06",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6507482,
            10.78291156,
            0
          ]
        }
      },
      {
        "id": "198",
        "type": "Feature",
        "properties": {
          "id": "198",
          "name": "CN Thăng Long-PGD Chương Dương",
          "code": "198",
          "address": "",
          "zone_id": "V14",
          "zone_name": "Vùng 14",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8693926,
            21.04077095,
            0
          ]
        }
      },
      {
        "id": "203",
        "type": "Feature",
        "properties": {
          "id": "203",
          "name": "CN Hà Nội-PGD Nguyễn Thái Học",
          "code": "203",
          "address": "",
          "zone_id": "V14",
          "zone_name": "Vùng 14",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8335357,
            21.0312495,
            0
          ]
        }
      },
      {
        "id": "205",
        "type": "Feature",
        "properties": {
          "id": "205",
          "name": "CN 20 tháng 10-PGD Mỹ Toàn",
          "code": "205",
          "address": "",
          "zone_id": "V01",
          "zone_name": "Vùng 01",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.7072748,
            10.72944624,
            0
          ]
        }
      },
      {
        "id": "207",
        "type": "Feature",
        "properties": {
          "id": "207",
          "name": "CN Chợ Lớn-PGD Phạm Hùng",
          "code": "207",
          "address": "",
          "zone_id": "V03",
          "zone_name": "Vùng 03",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6711837,
            10.73648535,
            0
          ]
        }
      },
      {
        "id": "000",
        "type": "Feature",
        "properties": {
          "id": "000",
          "name": "Hội sở",
          "code": "000",
          "address": "",
          "zone_id": "V00",
          "zone_name": "HỘI SỞ",
          "area_id": "K00",
          "area_name": "HỘI SỞ",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.7056191972,
            10.7718735068,
            0
          ]
        }
      },
      {
        "id": "002",
        "type": "Feature",
        "properties": {
          "id": "002",
          "name": "CN Cống Quỳnh-PGD Cô Giang",
          "code": "002",
          "address": "",
          "zone_id": "V02",
          "zone_name": "Vùng 02",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.693418,
            10.76551956,
            0
          ]
        }
      },
      {
        "id": "017",
        "type": "Feature",
        "properties": {
          "id": "017",
          "name": "CN Củ Chi",
          "code": "017",
          "address": "",
          "zone_id": "V05",
          "zone_name": "Vùng 05",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.4991766,
            10.97541323,
            0
          ]
        }
      },
      {
        "id": "023",
        "type": "Feature",
        "properties": {
          "id": "023",
          "name": "CN Phú Đông-PGD Lê Văn Sỹ",
          "code": "023",
          "address": "",
          "zone_id": "V06",
          "zone_name": "Vùng 06",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6705084,
            10.79234338,
            0
          ]
        }
      },
      {
        "id": "035",
        "type": "Feature",
        "properties": {
          "id": "035",
          "name": "CN Tân Bình",
          "code": "035",
          "address": "",
          "zone_id": "V05",
          "zone_name": "Vùng 05",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6428094,
            10.80198048,
            0
          ]
        }
      },
      {
        "id": "045",
        "type": "Feature",
        "properties": {
          "id": "045",
          "name": "CN Thăng Long-PGD Hoàn Kiếm",
          "code": "045",
          "address": "",
          "zone_id": "V14",
          "zone_name": "Vùng 14",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.847008,
            21.0313969,
            0
          ]
        }
      },
      {
        "id": "047",
        "type": "Feature",
        "properties": {
          "id": "047",
          "name": "CN Hà Nội-PGD Thanh Xuân",
          "code": "047",
          "address": "",
          "zone_id": "V12",
          "zone_name": "Vùng 12",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8262859,
            20.9973485,
            0
          ]
        }
      },
      {
        "id": "049",
        "type": "Feature",
        "properties": {
          "id": "049",
          "name": "CN Cầu Giấy-PGD Tây Cầu Giấy",
          "code": "049",
          "address": "",
          "zone_id": "V15",
          "zone_name": "Vùng 15",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.7963731,
            21.03427792,
            0
          ]
        }
      },
      {
        "id": "052",
        "type": "Feature",
        "properties": {
          "id": "052",
          "name": "CN Thăng Long-PGD Long Biên",
          "code": "052",
          "address": "",
          "zone_id": "V14",
          "zone_name": "Vùng 14",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8783146,
            21.04697003,
            0
          ]
        }
      },
      {
        "id": "053",
        "type": "Feature",
        "properties": {
          "id": "053",
          "name": "CN Hà Nội-PGD Văn Cao",
          "code": "053",
          "address": "",
          "zone_id": "V15",
          "zone_name": "Vùng 15",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8162677,
            21.04026284,
            0
          ]
        }
      },
      {
        "id": "054",
        "type": "Feature",
        "properties": {
          "id": "054",
          "name": "CN Hai Bà Trưng-PGD Thành Công",
          "code": "054",
          "address": "",
          "zone_id": "V15",
          "zone_name": "Vùng 15",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.812837,
            21.013077,
            0
          ]
        }
      },
      {
        "id": "057",
        "type": "Feature",
        "properties": {
          "id": "057",
          "name": "CN An Giang",
          "code": "057",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.4357823,
            10.3778912,
            0
          ]
        }
      },
      {
        "id": "060",
        "type": "Feature",
        "properties": {
          "id": "060",
          "name": "CN Bình Định",
          "code": "060",
          "address": "",
          "zone_id": "V10",
          "zone_name": "Vùng 10",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            109.2224247,
            13.77712331,
            0
          ]
        }
      },
      {
        "id": "065",
        "type": "Feature",
        "properties": {
          "id": "065",
          "name": "CN Sông Hàn-PGD Lê Duẩn",
          "code": "065",
          "address": "",
          "zone_id": "V10",
          "zone_name": "Vùng 10",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            108.2113838,
            16.06984144,
            0
          ]
        }
      },
      {
        "id": "075",
        "type": "Feature",
        "properties": {
          "id": "075",
          "name": "CN Quảng Ninh-PGD Hạ Long",
          "code": "075",
          "address": "",
          "zone_id": "V11",
          "zone_name": "Vùng 11",
          "area_id": "K04",
          "area_name": "KV DUYÊN HẢI BẮC BỘ",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            107.0418672,
            20.97112757,
            0
          ]
        }
      },
      {
        "id": "076",
        "type": "Feature",
        "properties": {
          "id": "076",
          "name": "CN Quảng Ninh-PGD Uông Bí",
          "code": "076",
          "address": "",
          "zone_id": "V11",
          "zone_name": "Vùng 11",
          "area_id": "K04",
          "area_name": "KV DUYÊN HẢI BẮC BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.7808652,
            21.03698742,
            0
          ]
        }
      },
      {
        "id": "079",
        "type": "Feature",
        "properties": {
          "id": "079",
          "name": "CN 20 tháng 10-PGD Phú Mỹ Hưng",
          "code": "079",
          "address": "",
          "zone_id": "V01",
          "zone_name": "Vùng 01",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.7080358,
            10.72821199,
            0
          ]
        }
      },
      {
        "id": "088",
        "type": "Feature",
        "properties": {
          "id": "088",
          "name": "CN Bình Dương-PGD Dĩ An",
          "code": "088",
          "address": "",
          "zone_id": "V09",
          "zone_name": "Vùng 09",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.767863,
            10.900464,
            0
          ]
        }
      },
      {
        "id": "093",
        "type": "Feature",
        "properties": {
          "id": "093",
          "name": "CN Hồng Bàng-PGD Trần Nguyên Hãn",
          "code": "093",
          "address": "",
          "zone_id": "V11",
          "zone_name": "Vùng 11",
          "area_id": "K04",
          "area_name": "KV DUYÊN HẢI BẮC BỘ",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6704064,
            20.84476011,
            0
          ]
        }
      },
      {
        "id": "110",
        "type": "Feature",
        "properties": {
          "id": "110",
          "name": "CN Bình Thuận-PGD Mũi Né",
          "code": "110",
          "address": "",
          "zone_id": "V09",
          "zone_name": "Vùng 09",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            108.2867318,
            10.93423595,
            0
          ]
        }
      },
      {
        "id": "118",
        "type": "Feature",
        "properties": {
          "id": "118",
          "name": "CN Đông Sài Gòn",
          "code": "118",
          "address": "",
          "zone_id": "V07",
          "zone_name": "Vùng 07",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.7588076,
            10.8584811,
            0
          ]
        }
      },
      {
        "id": "120",
        "type": "Feature",
        "properties": {
          "id": "120",
          "name": "CN Bình Tây-PGD Minh Phụng",
          "code": "120",
          "address": "",
          "zone_id": "V03",
          "zone_name": "Vùng 03",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6446202,
            10.76136748,
            0
          ]
        }
      },
      {
        "id": "134",
        "type": "Feature",
        "properties": {
          "id": "134",
          "name": "CN Cầu Giấy-PGD Vũ Trọng Phụng",
          "code": "134",
          "address": "",
          "zone_id": "V15",
          "zone_name": "Vùng 15",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.807367,
            21.0009421,
            0
          ]
        }
      },
      {
        "id": "137",
        "type": "Feature",
        "properties": {
          "id": "137",
          "name": "CN Sài Gòn",
          "code": "137",
          "address": "",
          "zone_id": "V02",
          "zone_name": "Vùng 02",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "SCNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6788011,
            10.75428363,
            0
          ]
        }
      },
      {
        "id": "170",
        "type": "Feature",
        "properties": {
          "id": "170",
          "name": "CN Thống Nhất",
          "code": "170",
          "address": "",
          "zone_id": "V06",
          "zone_name": "Vùng 06",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6572777,
            10.79716303,
            0
          ]
        }
      },
      {
        "id": "174",
        "type": "Feature",
        "properties": {
          "id": "174",
          "name": "CN Thống Nhất-PGD Lũy Bán Bích",
          "code": "174",
          "address": "",
          "zone_id": "V05",
          "zone_name": "Vùng 05",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.635299,
            10.779055,
            0
          ]
        }
      },
      {
        "id": "176",
        "type": "Feature",
        "properties": {
          "id": "176",
          "name": "CN Tân Bình-PGD Tây Thạnh",
          "code": "176",
          "address": "",
          "zone_id": "V05",
          "zone_name": "Vùng 05",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6257412,
            10.80685645,
            0
          ]
        }
      },
      {
        "id": "216",
        "type": "Feature",
        "properties": {
          "id": "216",
          "name": "CN Hải Phòng",
          "code": "216",
          "address": "",
          "zone_id": "V11",
          "zone_name": "Vùng 11",
          "area_id": "K04",
          "area_name": "KV DUYÊN HẢI BẮC BỘ",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6889855,
            20.86071087,
            0
          ]
        }
      },
      {
        "id": "149",
        "type": "Feature",
        "properties": {
          "id": "149",
          "name": "CN Gia Định-PGD Bình Thạnh",
          "code": "149",
          "address": "",
          "zone_id": "V07",
          "zone_name": "Vùng 07",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6901383,
            10.81217185,
            0
          ]
        }
      },
      {
        "id": "169",
        "type": "Feature",
        "properties": {
          "id": "169",
          "name": "CN Tân Định-PGD Hàng Xanh",
          "code": "169",
          "address": "",
          "zone_id": "V01",
          "zone_name": "Vùng 01",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.701024,
            10.794173,
            0
          ]
        }
      },
      {
        "id": "190",
        "type": "Feature",
        "properties": {
          "id": "190",
          "name": "CN Cầu Giấy-PGD Lạc Long Quân",
          "code": "190",
          "address": "",
          "zone_id": "V15",
          "zone_name": "Vùng 15",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8081803,
            21.05155915,
            0
          ]
        }
      },
      {
        "id": "206",
        "type": "Feature",
        "properties": {
          "id": "206",
          "name": "CN Bình Tây-PGD An Lạc",
          "code": "206",
          "address": "",
          "zone_id": "V05",
          "zone_name": "Vùng 05",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.623638,
            10.745918,
            0
          ]
        }
      },
      {
        "id": "003",
        "type": "Feature",
        "properties": {
          "id": "003",
          "name": "CN Chợ Lớn",
          "code": "003",
          "address": "",
          "zone_id": "V03",
          "zone_name": "Vùng 03",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "SCNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6625925,
            10.75107406,
            0
          ]
        }
      },
      {
        "id": "009",
        "type": "Feature",
        "properties": {
          "id": "009",
          "name": "CN Chợ Lớn-PGD Tân Tạo",
          "code": "009",
          "address": "",
          "zone_id": "V03",
          "zone_name": "Vùng 03",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6117144,
            10.75157025,
            0
          ]
        }
      },
      {
        "id": "021",
        "type": "Feature",
        "properties": {
          "id": "021",
          "name": "CN Tân Định",
          "code": "021",
          "address": "",
          "zone_id": "V01",
          "zone_name": "Vùng 01",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "SCNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6891518,
            10.79021898,
            0
          ]
        }
      },
      {
        "id": "025",
        "type": "Feature",
        "properties": {
          "id": "025",
          "name": "CN Phú Đông-PGD Bắc Hải",
          "code": "025",
          "address": "",
          "zone_id": "V06",
          "zone_name": "Vùng 06",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6626492,
            10.78774948,
            0
          ]
        }
      },
      {
        "id": "056",
        "type": "Feature",
        "properties": {
          "id": "056",
          "name": "CN Vĩnh Long-PGD Vũng Liêm",
          "code": "056",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.1875626,
            10.09143912,
            0
          ]
        }
      },
      {
        "id": "082",
        "type": "Feature",
        "properties": {
          "id": "082",
          "name": "CN Vũng Tàu",
          "code": "082",
          "address": "",
          "zone_id": "V09",
          "zone_name": "Vùng 09",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            107.0839676,
            10.34572302,
            0
          ]
        }
      },
      {
        "id": "102",
        "type": "Feature",
        "properties": {
          "id": "102",
          "name": "CN Khánh Hòa",
          "code": "102",
          "address": "",
          "zone_id": "V10",
          "zone_name": "Vùng 10",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            109.189596,
            12.247906,
            0
          ]
        }
      },
      {
        "id": "121",
        "type": "Feature",
        "properties": {
          "id": "121",
          "name": "CN Chợ Lớn-PGD Hậu Giang",
          "code": "121",
          "address": "",
          "zone_id": "V03",
          "zone_name": "Vùng 03",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.624074,
            10.7452406,
            0
          ]
        }
      },
      {
        "id": "126",
        "type": "Feature",
        "properties": {
          "id": "126",
          "name": "CN Tân Phú-PGD Nguyễn Chí Thanh",
          "code": "126",
          "address": "",
          "zone_id": "V03",
          "zone_name": "Vùng 03",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6517028,
            10.75652346,
            0
          ]
        }
      },
      {
        "id": "132",
        "type": "Feature",
        "properties": {
          "id": "132",
          "name": "CN Phú Đông-PGD Huỳnh Văn Bánh",
          "code": "132",
          "address": "",
          "zone_id": "V06",
          "zone_name": "Vùng 06",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6746332,
            10.7915326,
            0
          ]
        }
      },
      {
        "id": "148",
        "type": "Feature",
        "properties": {
          "id": "148",
          "name": "CN Gia Định-PGD Hoàng Minh Giám",
          "code": "148",
          "address": "",
          "zone_id": "V06",
          "zone_name": "Vùng 06",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.676976,
            10.814917,
            0
          ]
        }
      },
      {
        "id": "150",
        "type": "Feature",
        "properties": {
          "id": "150",
          "name": "CN Đông Sài Gòn-PGD Võ Văn Ngân",
          "code": "150",
          "address": "",
          "zone_id": "V07",
          "zone_name": "Vùng 07",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.7601451,
            10.85039789,
            0
          ]
        }
      },
      {
        "id": "152",
        "type": "Feature",
        "properties": {
          "id": "152",
          "name": "CN Tân Định-PGD Đinh Bộ Lĩnh",
          "code": "152",
          "address": "",
          "zone_id": "V07",
          "zone_name": "Vùng 07",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.7053133,
            10.80309638,
            0
          ]
        }
      },
      {
        "id": "154",
        "type": "Feature",
        "properties": {
          "id": "154",
          "name": "CN Tân Định-PGD Văn Thánh",
          "code": "154",
          "address": "",
          "zone_id": "V07",
          "zone_name": "Vùng 07",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.7159987,
            10.80369381,
            0
          ]
        }
      },
      {
        "id": "179",
        "type": "Feature",
        "properties": {
          "id": "179",
          "name": "CN Bình Tây-PGD Bà Hom",
          "code": "179",
          "address": "",
          "zone_id": "V03",
          "zone_name": "Vùng 03",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.628674,
            10.7553647,
            0
          ]
        }
      },
      {
        "id": "212",
        "type": "Feature",
        "properties": {
          "id": "212",
          "name": "CN Bình Tây-PGD Cây Gõ",
          "code": "212",
          "address": "",
          "zone_id": "V03",
          "zone_name": "Vùng 03",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6437767,
            10.7495523,
            0
          ]
        }
      },
      {
        "id": "215",
        "type": "Feature",
        "properties": {
          "id": "215",
          "name": "CN Chợ Lớn-PGD Tên Lửa",
          "code": "215",
          "address": "",
          "zone_id": "V03",
          "zone_name": "Vùng 03",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6206537,
            10.74851335,
            0
          ]
        }
      },
      {
        "id": "219",
        "type": "Feature",
        "properties": {
          "id": "219",
          "name": "CN Hải Phòng-PGD Tô Hiệu",
          "code": "219",
          "address": "",
          "zone_id": "V11",
          "zone_name": "Vùng 11",
          "area_id": "K04",
          "area_name": "KV DUYÊN HẢI BẮC BỘ",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.671446,
            20.849591,
            0
          ]
        }
      },
      {
        "id": "226",
        "type": "Feature",
        "properties": {
          "id": "226",
          "name": "CN Cần Thơ-PGD Ninh Kiều",
          "code": "226",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.7660177,
            10.04292661,
            0
          ]
        }
      },
      {
        "id": "233",
        "type": "Feature",
        "properties": {
          "id": "233",
          "name": "CN Nghệ An-PGD Hưng Dũng",
          "code": "233",
          "address": "",
          "zone_id": "V11",
          "zone_name": "Vùng 11",
          "area_id": "K04",
          "area_name": "KV DUYÊN HẢI BẮC BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.6996774,
            18.6857851,
            0
          ]
        }
      },
      {
        "id": "236",
        "type": "Feature",
        "properties": {
          "id": "236",
          "name": "CN Bắc Ninh-PGD Từ Sơn",
          "code": "236",
          "address": "",
          "zone_id": "V11",
          "zone_name": "Vùng 11",
          "area_id": "K04",
          "area_name": "KV DUYÊN HẢI BẮC BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.9525079,
            21.114146,
            0
          ]
        }
      },
      {
        "id": "095",
        "type": "Feature",
        "properties": {
          "id": "095",
          "name": "CN Đồng Tháp",
          "code": "095",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.6361407,
            10.45380786,
            0
          ]
        }
      },
      {
        "id": "119",
        "type": "Feature",
        "properties": {
          "id": "119",
          "name": "CN Tân Phú-PGD Lê Đại Hành",
          "code": "119",
          "address": "",
          "zone_id": "V03",
          "zone_name": "Vùng 03",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.655792,
            10.763587,
            0
          ]
        }
      },
      {
        "id": "192",
        "type": "Feature",
        "properties": {
          "id": "192",
          "name": "CN Hà Nội-PGD Tôn Đức Thắng",
          "code": "192",
          "address": "",
          "zone_id": "V14",
          "zone_name": "Vùng 14",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.833333,
            21.026002,
            0
          ]
        }
      },
      {
        "id": "193",
        "type": "Feature",
        "properties": {
          "id": "193",
          "name": "CN Cầu Giấy-PGD Nguyễn Thị Định",
          "code": "193",
          "address": "",
          "zone_id": "V15",
          "zone_name": "Vùng 15",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8046949,
            21.01028838,
            0
          ]
        }
      },
      {
        "id": "197",
        "type": "Feature",
        "properties": {
          "id": "197",
          "name": "CN Thăng Long-PGD Hàng Gà",
          "code": "197",
          "address": "",
          "zone_id": "V14",
          "zone_name": "Vùng 14",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8471413,
            21.03501596,
            0
          ]
        }
      },
      {
        "id": "001",
        "type": "Feature",
        "properties": {
          "id": "001",
          "name": "CN Cống Quỳnh",
          "code": "001",
          "address": "",
          "zone_id": "V02",
          "zone_name": "Vùng 02",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "SCNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6878053,
            10.76707414,
            0
          ]
        }
      },
      {
        "id": "010",
        "type": "Feature",
        "properties": {
          "id": "010",
          "name": "CN Sài Gòn-PGD Ngô Gia Tự",
          "code": "010",
          "address": "",
          "zone_id": "V02",
          "zone_name": "Vùng 02",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.671736,
            10.764205,
            0
          ]
        }
      },
      {
        "id": "011",
        "type": "Feature",
        "properties": {
          "id": "011",
          "name": "CN Sài Gòn-PGD An Đông Plaza",
          "code": "011",
          "address": "",
          "zone_id": "V02",
          "zone_name": "Vùng 02",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.673397,
            10.75758263,
            0
          ]
        }
      },
      {
        "id": "013",
        "type": "Feature",
        "properties": {
          "id": "013",
          "name": "CN Chợ Lớn-PGD Quận 6",
          "code": "013",
          "address": "",
          "zone_id": "V03",
          "zone_name": "Vùng 03",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6319195,
            10.739956,
            0
          ]
        }
      },
      {
        "id": "016",
        "type": "Feature",
        "properties": {
          "id": "016",
          "name": "CN Bến Thành-PGD Quận 2",
          "code": "016",
          "address": "",
          "zone_id": "V07",
          "zone_name": "Vùng 07",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.7324977,
            10.80309767,
            0
          ]
        }
      },
      {
        "id": "032",
        "type": "Feature",
        "properties": {
          "id": "032",
          "name": "CN Tân Định-PGD Thanh Đa",
          "code": "032",
          "address": "",
          "zone_id": "V07",
          "zone_name": "Vùng 07",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.715514,
            10.81258,
            0
          ]
        }
      },
      {
        "id": "036",
        "type": "Feature",
        "properties": {
          "id": "036",
          "name": "CN Tân Bình-PGD Trường Chinh",
          "code": "036",
          "address": "",
          "zone_id": "V05",
          "zone_name": "Vùng 05",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6436573,
            10.79828234,
            0
          ]
        }
      },
      {
        "id": "043",
        "type": "Feature",
        "properties": {
          "id": "043",
          "name": "CN Hai Bà Trưng",
          "code": "043",
          "address": "",
          "zone_id": "V12",
          "zone_name": "Vùng 12",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "SCNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8470456,
            21.01439995,
            0
          ]
        }
      },
      {
        "id": "068",
        "type": "Feature",
        "properties": {
          "id": "068",
          "name": "CN Đà Nẵng-PGD Hoàng Diệu",
          "code": "068",
          "address": "",
          "zone_id": "V10",
          "zone_name": "Vùng 10",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            108.2170631,
            16.05712975,
            0
          ]
        }
      },
      {
        "id": "086",
        "type": "Feature",
        "properties": {
          "id": "086",
          "name": "CN Bình Dương",
          "code": "086",
          "address": "",
          "zone_id": "V09",
          "zone_name": "Vùng 09",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6645278,
            10.9885775,
            0
          ]
        }
      },
      {
        "id": "094",
        "type": "Feature",
        "properties": {
          "id": "094",
          "name": "CN Hồng Bàng-PGD Lạc Viên",
          "code": "094",
          "address": "",
          "zone_id": "V11",
          "zone_name": "Vùng 11",
          "area_id": "K04",
          "area_name": "KV DUYÊN HẢI BẮC BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.707117,
            20.847543,
            0
          ]
        }
      },
      {
        "id": "112",
        "type": "Feature",
        "properties": {
          "id": "112",
          "name": "CN Đồng Nai-PGD Tân Biên",
          "code": "112",
          "address": "",
          "zone_id": "V09",
          "zone_name": "Vùng 09",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.8909604,
            10.96966942,
            0
          ]
        }
      },
      {
        "id": "122",
        "type": "Feature",
        "properties": {
          "id": "122",
          "name": "CN Tân Định-PGD Đinh Tiên Hoàng",
          "code": "122",
          "address": "",
          "zone_id": "V01",
          "zone_name": "Vùng 01",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6962563,
            10.79492011,
            0
          ]
        }
      },
      {
        "id": "128",
        "type": "Feature",
        "properties": {
          "id": "128",
          "name": "CN Bình Tây-PGD Tạ Uyên",
          "code": "128",
          "address": "",
          "zone_id": "V03",
          "zone_name": "Vùng 03",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.653371,
            10.758079,
            0
          ]
        }
      },
      {
        "id": "141",
        "type": "Feature",
        "properties": {
          "id": "141",
          "name": "CN Thăng Long",
          "code": "141",
          "address": "",
          "zone_id": "V14",
          "zone_name": "Vùng 14",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "SCNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8554197,
            21.02999302,
            0
          ]
        }
      },
      {
        "id": "166",
        "type": "Feature",
        "properties": {
          "id": "166",
          "name": "CN 20 tháng 10-PGD Quận 4",
          "code": "166",
          "address": "",
          "zone_id": "V01",
          "zone_name": "Vùng 01",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.706478,
            10.764582,
            0
          ]
        }
      },
      {
        "id": "186",
        "type": "Feature",
        "properties": {
          "id": "186",
          "name": "CN Hà Nội-PGD Nguyễn Trãi",
          "code": "186",
          "address": "",
          "zone_id": "V15",
          "zone_name": "Vùng 15",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8138045,
            20.99830162,
            0
          ]
        }
      },
      {
        "id": "209",
        "type": "Feature",
        "properties": {
          "id": "209",
          "name": "CN Chợ Lớn-PGD Bình Chánh",
          "code": "209",
          "address": "",
          "zone_id": "V03",
          "zone_name": "Vùng 03",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6556167,
            10.72719795,
            0
          ]
        }
      },
      {
        "id": "211",
        "type": "Feature",
        "properties": {
          "id": "211",
          "name": "CN Tân Phú-PGD Lê Văn Quới",
          "code": "211",
          "address": "",
          "zone_id": "V05",
          "zone_name": "Vùng 05",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.613645,
            10.776441,
            0
          ]
        }
      },
      {
        "id": "213",
        "type": "Feature",
        "properties": {
          "id": "213",
          "name": "CN Tân Phú-PGD Nhật Tảo",
          "code": "213",
          "address": "",
          "zone_id": "V02",
          "zone_name": "Vùng 02",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6681438,
            10.76248512,
            0
          ]
        }
      },
      {
        "id": "214",
        "type": "Feature",
        "properties": {
          "id": "214",
          "name": "CN Chợ Lớn-PGD Bình Phú",
          "code": "214",
          "address": "",
          "zone_id": "V03",
          "zone_name": "Vùng 03",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6318537,
            10.74700084,
            0
          ]
        }
      },
      {
        "id": "241",
        "type": "Feature",
        "properties": {
          "id": "241",
          "name": "CN Hải Dương-PGD Nguyễn Lương Bằng",
          "code": "241",
          "address": "",
          "zone_id": "V11",
          "zone_name": "Vùng 11",
          "area_id": "K04",
          "area_name": "KV DUYÊN HẢI BẮC BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.3153041,
            20.9374557,
            0
          ]
        }
      },
      {
        "id": "173",
        "type": "Feature",
        "properties": {
          "id": "173",
          "name": "CN Thống Nhất-PGD Bàu Cát",
          "code": "173",
          "address": "",
          "zone_id": "V05",
          "zone_name": "Vùng 05",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.638658,
            10.79517783,
            0
          ]
        }
      },
      {
        "id": "189",
        "type": "Feature",
        "properties": {
          "id": "189",
          "name": "CN Hai Bà Trưng-PGD Bạch Mai",
          "code": "189",
          "address": "",
          "zone_id": "V12",
          "zone_name": "Vùng 12",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8499886,
            20.99802411,
            0
          ]
        }
      },
      {
        "id": "191",
        "type": "Feature",
        "properties": {
          "id": "191",
          "name": "CN Cầu Giấy-PGD Hà Ðông",
          "code": "191",
          "address": "",
          "zone_id": "V15",
          "zone_name": "Vùng 15",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNC2"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8155534,
            21.04411309,
            0
          ]
        }
      },
      {
        "id": "201",
        "type": "Feature",
        "properties": {
          "id": "201",
          "name": "CN Hà Nội-PGD Lê Trọng Tấn",
          "code": "201",
          "address": "",
          "zone_id": "V12",
          "zone_name": "Vùng 12",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8280426,
            21.00070318,
            0
          ]
        }
      },
      {
        "id": "022",
        "type": "Feature",
        "properties": {
          "id": "022",
          "name": "CN Tân Định-PGD Điện Biên Phủ",
          "code": "022",
          "address": "",
          "zone_id": "V07",
          "zone_name": "Vùng 07",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.7078501,
            10.8008273,
            0
          ]
        }
      },
      {
        "id": "024",
        "type": "Feature",
        "properties": {
          "id": "024",
          "name": "CN Cống Quỳnh-PGD Võ Văn Tần",
          "code": "024",
          "address": "",
          "zone_id": "V02",
          "zone_name": "Vùng 02",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6837052,
            10.76964116,
            0
          ]
        }
      },
      {
        "id": "031",
        "type": "Feature",
        "properties": {
          "id": "031",
          "name": "CN Gia Định-PGD Lê Quang Định",
          "code": "031",
          "address": "",
          "zone_id": "V07",
          "zone_name": "Vùng 07",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6977958,
            10.80515095,
            0
          ]
        }
      },
      {
        "id": "050",
        "type": "Feature",
        "properties": {
          "id": "050",
          "name": "CN Hà Nội-PGD Láng Hạ",
          "code": "050",
          "address": "",
          "zone_id": "V15",
          "zone_name": "Vùng 15",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8108651,
            21.01835,
            0
          ]
        }
      },
      {
        "id": "055",
        "type": "Feature",
        "properties": {
          "id": "055",
          "name": "CN Vĩnh Long",
          "code": "055",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.9750673,
            10.24918817,
            0
          ]
        }
      },
      {
        "id": "061",
        "type": "Feature",
        "properties": {
          "id": "061",
          "name": "CN Bình Định-PGD Quy Nhơn",
          "code": "061",
          "address": "",
          "zone_id": "V10",
          "zone_name": "Vùng 10",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            109.2301103,
            13.77637369,
            0
          ]
        }
      },
      {
        "id": "072",
        "type": "Feature",
        "properties": {
          "id": "072",
          "name": "CN Cần Thơ-PGD An Phú",
          "code": "072",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.7776177,
            10.0364228,
            0
          ]
        }
      },
      {
        "id": "085",
        "type": "Feature",
        "properties": {
          "id": "085",
          "name": "CN Vũng Tàu-PGD Bà Rịa",
          "code": "085",
          "address": "",
          "zone_id": "V09",
          "zone_name": "Vùng 09",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            107.170155,
            10.49355263,
            0
          ]
        }
      },
      {
        "id": "098",
        "type": "Feature",
        "properties": {
          "id": "098",
          "name": "CN Tiền Giang-PGD Cai Lậy",
          "code": "098",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.11931,
            10.408712,
            0
          ]
        }
      },
      {
        "id": "104",
        "type": "Feature",
        "properties": {
          "id": "104",
          "name": "CN Long An",
          "code": "104",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.4099116,
            10.53901311,
            0
          ]
        }
      },
      {
        "id": "115",
        "type": "Feature",
        "properties": {
          "id": "115",
          "name": "CN Cà Mau",
          "code": "115",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.1457114,
            9.168953099,
            0
          ]
        }
      },
      {
        "id": "124",
        "type": "Feature",
        "properties": {
          "id": "124",
          "name": "CN Cần Giuộc",
          "code": "124",
          "address": "",
          "zone_id": "V08",
          "zone_name": "Vùng 08",
          "area_id": "K06",
          "area_name": "KV MIỀN TÂY",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6708504,
            10.6046565,
            0
          ]
        }
      },
      {
        "id": "129",
        "type": "Feature",
        "properties": {
          "id": "129",
          "name": "CN Chợ Lớn-PGD Ngô Quyền",
          "code": "129",
          "address": "",
          "zone_id": "V02",
          "zone_name": "Vùng 02",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6667875,
            10.75334027,
            0
          ]
        }
      },
      {
        "id": "131",
        "type": "Feature",
        "properties": {
          "id": "131",
          "name": "CN Gia Định-PGD Nguyễn Kiệm",
          "code": "131",
          "address": "",
          "zone_id": "V06",
          "zone_name": "Vùng 06",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6787856,
            10.81153155,
            0
          ]
        }
      },
      {
        "id": "144",
        "type": "Feature",
        "properties": {
          "id": "144",
          "name": "CN Phú Đông",
          "code": "144",
          "address": "",
          "zone_id": "V07",
          "zone_name": "Vùng 07",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.673942,
            10.797144,
            0
          ]
        }
      },
      {
        "id": "156",
        "type": "Feature",
        "properties": {
          "id": "156",
          "name": "CN Phạm Ngọc Thạch",
          "code": "156",
          "address": "",
          "zone_id": "V01",
          "zone_name": "Vùng 01",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "SCNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6928218,
            10.78527062,
            0
          ]
        }
      },
      {
        "id": "168",
        "type": "Feature",
        "properties": {
          "id": "168",
          "name": "CN Phạm Ngọc Thạch-PGD Quận 3",
          "code": "168",
          "address": "",
          "zone_id": "V02",
          "zone_name": "Vùng 02",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6788919,
            10.77934651,
            0
          ]
        }
      },
      {
        "id": "171",
        "type": "Feature",
        "properties": {
          "id": "171",
          "name": "CN Thống Nhất-PGD Tân Hương",
          "code": "171",
          "address": "",
          "zone_id": "V03",
          "zone_name": "Vùng 03",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.620787,
            10.790257,
            0
          ]
        }
      },
      {
        "id": "175",
        "type": "Feature",
        "properties": {
          "id": "175",
          "name": "CN Cống Quỳnh-PGD Lý Thái Tổ",
          "code": "175",
          "address": "",
          "zone_id": "V02",
          "zone_name": "Vùng 02",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.677248,
            10.76661182,
            0
          ]
        }
      },
      {
        "id": "184",
        "type": "Feature",
        "properties": {
          "id": "184",
          "name": "CN Hai Bà Trưng-PGD Phương Mai",
          "code": "184",
          "address": "",
          "zone_id": "V12",
          "zone_name": "Vùng 12",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.836604,
            21.003437,
            0
          ]
        }
      },
      {
        "id": "232",
        "type": "Feature",
        "properties": {
          "id": "232",
          "name": "CN Thanh Hóa",
          "code": "232",
          "address": "",
          "zone_id": "V11",
          "zone_name": "Vùng 11",
          "area_id": "K04",
          "area_name": "KV DUYÊN HẢI BẮC BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.779943,
            19.8108419,
            0
          ]
        }
      },
      {
        "id": "103",
        "type": "Feature",
        "properties": {
          "id": "103",
          "name": "CN Khánh Hòa-PGD Vĩnh Phước",
          "code": "103",
          "address": "",
          "zone_id": "V10",
          "zone_name": "Vùng 10",
          "area_id": "K05",
          "area_name": "KV MIỀN TRUNG TÂY NGUYÊN - ĐÔNG NAM BỘ",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            109.197799,
            12.27481533,
            0
          ]
        }
      },
      {
        "id": "138",
        "type": "Feature",
        "properties": {
          "id": "138",
          "name": "CN Sài Gòn-PGD Nhà Rồng",
          "code": "138",
          "address": "",
          "zone_id": "V02",
          "zone_name": "Vùng 02",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.696654,
            10.767852,
            0
          ]
        }
      },
      {
        "id": "161",
        "type": "Feature",
        "properties": {
          "id": "161",
          "name": "CN 20 tháng 10-PGD Nam Sài Gòn",
          "code": "161",
          "address": "",
          "zone_id": "V01",
          "zone_name": "Vùng 01",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.712851,
            10.706252,
            0
          ]
        }
      },
      {
        "id": "200",
        "type": "Feature",
        "properties": {
          "id": "200",
          "name": "CN Hai Bà Trưng-PGD Kim Đồng",
          "code": "200",
          "address": "",
          "zone_id": "V12",
          "zone_name": "Vùng 12",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.8420196,
            20.98365492,
            0
          ]
        }
      },
      {
        "id": "202",
        "type": "Feature",
        "properties": {
          "id": "202",
          "name": "CN Cầu Giấy-PGD Hoàng Quốc Việt",
          "code": "202",
          "address": "",
          "zone_id": "V15",
          "zone_name": "Vùng 15",
          "area_id": "K03",
          "area_name": "KV HÀ NỘI",
          "type": "CNDN"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.789496,
            21.04629415,
            0
          ]
        }
      },
      {
        "id": "004",
        "type": "Feature",
        "properties": {
          "id": "004",
          "name": "CN Tân Phú-PGD Quận 11",
          "code": "004",
          "address": "",
          "zone_id": "V03",
          "zone_name": "Vùng 03",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6494155,
            10.75783652,
            0
          ]
        }
      },
      {
        "id": "007",
        "type": "Feature",
        "properties": {
          "id": "007",
          "name": "CN Thống Nhất-PGD Âu Cơ",
          "code": "007",
          "address": "",
          "zone_id": "V05",
          "zone_name": "Vùng 05",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC1"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.645072,
            10.7786042,
            0
          ]
        }
      },
      {
        "id": "012",
        "type": "Feature",
        "properties": {
          "id": "012",
          "name": "CN Hóc Môn",
          "code": "012",
          "address": "",
          "zone_id": "V05",
          "zone_name": "Vùng 05",
          "area_id": "K07",
          "area_name": "KV HCM",
          "type": "CNC"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            106.6086224,
            10.85761041,
            0
          ]
        }
      }
    ]
  }

  return {
    fetching: false,
    fetched: true,
    branchGeojson: branchList,
  }
}

export default useBranchGeojson;