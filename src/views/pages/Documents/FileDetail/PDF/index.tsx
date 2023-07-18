
import { FC, Fragment, useEffect } from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Box, Divider } from "@mui/material";
import { FileDetailParams } from "..";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLOANNormalCurrentFile } from "features/loan/normal/storage/ProfileDocument/selectors";
import { downloadDocumentFile } from "features/loan/normal/storage/ProfileDocument/action";
import Empty from 'views/components/layout/Empty';
import PDFViewFile from "views/pages/Documents/widgets/PDFViewFile";
export interface PDFProps {
    isIdentityPage?: boolean
}

const PDF: FC<PDFProps> = (props) => {
    const { isIdentityPage = false } = props
    const params = useParams() as FileDetailParams
    const curentFile = useSelector(getLOANNormalCurrentFile)
    const dispatch = useDispatch()

    useEffect(() => {
        if (params.file_id && curentFile?.uuid !== params.file_id) {
            dispatch(downloadDocumentFile({
                uuid: params.file_id,
                isDownload: false
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.file_id])
    
    return (
        <Fragment>

            <Worker workerUrl={process.env.PUBLIC_URL + "/assets/worker.js"}>
                {(() => {
                    // if (fileURL.length) {
                    return (
                        <Box
                            component="div"
                            sx={{ 
                                height: isIdentityPage ? 'calc(50vh - 100px)' : 'calc(100vh - 164px)', 
                                width: "100%",
                                display: params.type === 'image' ? "flex" : 'block',
                                justifyContent: params.type === 'image' ? "center" : 'initial',
                                alignItems: params.type === 'image' ? "center" : 'initial',
                                padding:'21px',
                                "& .rpv-core__viewer":{
                                    "& .rpv-core__inner-pages":{
                                        overflowX:"hidden !important",
                                    }
                                },
                                "& img":{
                                    objectFit:"contain",
                                    maxWidth:"100%",
                                    maxHeight:"100%"
                                }
                            }}
                        >
                            {
                                params.type === 'image'
                                    ?
                                    curentFile?.file_url?.length
                                    && <img 
                                            width='100%' 
                                            height="auto" 
                                            alt="file" 
                                            //hiển thị trên localhost
                                            // src={`${process.env.NODE_ENV === 'development' 
                                            //     ? 'https://los.minerva.vn' 
                                            //     : process.env.PUBLIC_URL}${curentFile.file_url}`} 
                                            
                                            //hiển thị trên domain
                                            src={curentFile.file_url}
                                            />
                                    :
                                    // eslint-disable-next-line react/jsx-no-undef
                                    curentFile?.file_url?.length 
                                    // eslint-disable-next-line react/jsx-no-undef
                                    && <PDFViewFile
                                            //hiển thị trên localhost
                                            // fileUrl={`${process.env.NODE_ENV === 'development' 
                                            //         ? 'https://los.minerva.vn' 
                                            //         : process.env.PUBLIC_URL}${curentFile.file_url}`
                                            // }

                                            //hiển thị trên domain
                                            fileUrl={curentFile.file_url}
                                        />
                            }
                        </Box>
                    );
                    // }
                })()}
            </Worker>
            
            {
                isIdentityPage && <Fragment>
                <Divider />
                <Box sx={{ height: "calc(50vh - 100px)", paddingTop: "20px" }}>
                    {/* <pre className='m-0' style={{
                        fontFamily: 'roboto',
                        color: "var(--mscb-secondary)",
                        whiteSpace: "pre-line"
                    }}>
                        Phụ lục số 01

                        (Ban hành kèm theo Thông tư số 18/2013/TT-BXD ngày 31 tháng 10 năm 2013 của bộ xây dựng - Mẫu Giấy xác nhận về hộ khẩu và thực trạng nhà ở của hộ gia đình, cá nhân khi vay vốn để
                        thuê, mua nhà ở thương mại có diện tích nhỏ hơn 70m2  , giá bán dưới 15 triệu đồng/m2)
                        Cộng hòa xã hội chủ nghĩa việt nam
                        Độc lập - tự do - hạnh phúc
                        Giấy xác nhận về hộ khẩu và thực trạng nhà ở của hộ gia đình, cá nhân khi vay vốn thuê, mua nhà ở thương mại có diện tích nhỏ hơn 70m2, giá bán dưới 15 triệu đồng/m2
                        Kính gửi
                        Họ và tên người đứng tên vay vốn
                        Nơi ở hiện tại:
                        Hộ khẩu thường trú (hoặc tạm trú) tại:
                        Số sổ hộ khẩu hoặc số sổ đăng ký tạm trú
                        Số thành viên trong hộ gia đình - người (kèm theo bản sao sổ hộ khẩu hoặc sổ đăng ký tạm trú của các thanh viên trong hộ có công chứng)
                        Tôi xin cam đoan về thực trạng nhà ở của hộ gia đình như sau:
                        1. Hộ gia đình tôi đang sinh sống tại địa chỉ nêu trên, diện tích sàn nhà ở bình quân của hộ gia đình hiện nhỏ hơn 8m2/người
                        2. Hộ gia đình tôi đang sinh sống cùng với bố mẹ và không có nhà ở thuộc sở hữu của mình tại địa chỉ nêu trên
                        3. Hộ gia đìn tôi đang ở nhờ và không có nhà ở thuộc sở hữu của mình tại địa chỉ nêu trên (đối với trường hợp ở nhờ của họ hàng hoặc cửa người thân)
                    </pre> */}
                    <Empty>Chưa có dữ liệu</Empty>
                </Box>
                </Fragment>
            }
        </Fragment>
    );
};

export default PDF;
