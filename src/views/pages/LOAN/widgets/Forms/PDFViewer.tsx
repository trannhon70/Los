import Box from "@mui/material/Box";
import { Worker } from "@react-pdf-viewer/core";
import {
  fetchLOANNormalFormsData,
  getTemplateLOANNormal,
  postLOANNormalForm,
  setIsLoadDonePdfFile,
  setKeywordByClickingFormsData,
  setLOANNormalFormCurrentCodeContract,
} from "features/loan/normal/storage/forms/actions";
import { FC, useEffect, useRef, MutableRefObject, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import BasePDFView from "views/components/layout/BasePDFViewer";
import Empty from "views/components/layout/Empty";
import { ILOANURLParams } from "types/models/loan";
import {
  getLOANNormalActiveFile,
  getLOANNormalActiveTemplateCode,
  getLOANNormalFormsCurrentKeyword,
  getLOANNormalFormsFileURL,
  getLOANNormalFormsListMetadata,
} from "features/loan/normal/storage/forms/selectors";
import Input, { InputRef } from "views/components/base/Input";
import { Button, Typography } from "@mui/material";
import { IPostRequestForms } from "types/models/loan/normal/storage/Forms";
import Select, { SelectRef } from "views/components/base/Select";
import { showAppBackdrop } from "features/app/store/slice";
import { IQueryParamsFormData } from "features/loan/normal/storage/forms/api";

const FormsPDFViewer: FC = () => {
  const dispatch = useDispatch();
  const params = useParams() as ILOANURLParams;
  const fileURL = useSelector(getLOANNormalFormsFileURL);
  const currentKeyword = useSelector(getLOANNormalFormsCurrentKeyword);
  const listMetadata = useSelector(getLOANNormalFormsListMetadata);
  const templateType = useSelector(getLOANNormalActiveTemplateCode)
  const fileActive = useSelector(getLOANNormalActiveFile)

  const scrollWrapperYOffset = useRef<number>(0);
  const codeContractRef = useRef<InputRef>(null);
  const selectRef = useRef<SelectRef>(null);

  const scrolling = (item_id: string, scroll_id: string | HTMLElement, objectYOffset: MutableRefObject<number>) => {
    let listMetadataRef: HTMLElement | null = null;
    if (typeof scroll_id === 'string') {
      listMetadataRef = document.getElementById(scroll_id);
    }
    else {
      listMetadataRef = scroll_id;
    }
    const itemRef = document.getElementById(item_id);
    const itemRect = itemRef?.getBoundingClientRect();
    if (listMetadataRef) {
      for (let i = 0; i < listMetadataRef.children.length; i++) {
        const scrollWrapper = listMetadataRef.children[i];
        const style = window.getComputedStyle(scrollWrapper);
        const scroll = style.getPropertyValue('overflow') ? style.getPropertyValue('overflow-y') : undefined;
        if (scroll === 'scroll' || scroll === 'auto') {
          const scrollWrapperRect = scrollWrapper.getBoundingClientRect();
          scrollWrapper.addEventListener('scroll', (e: any) => {
            objectYOffset.current = e.target.scrollTop;
          });
          const absoluteItemTop = Number(itemRect?.top) + objectYOffset.current;
          const middle = absoluteItemTop - Number(scrollWrapperRect?.height) / 2;
          scrollWrapper.scrollTo(0, middle);
        }
      }
    }
  }

  const onGetTemplateField = () => {
    // Load done file pdf
    dispatch(setIsLoadDonePdfFile());
    // **************************************
    //      Click Highlight File PDF
    // **************************************
    setTimeout(() => {
      const elements = document.getElementsByClassName(
        "rpv-core__text-layer-text"
      );
      const length = elements.length;

      for (let i = 0; i < length; i++) {
        elements[i].addEventListener("click", () => {
          const textClicked = (elements[i] as HTMLElement).textContent;
          const text = textClicked?.substring(1, textClicked.length - 1) ?? "";
          const id = listMetadata?.find((item) => item.key === text)?.id;
          id
            // && dispatch(setCurrentKeywordFormsData({ key: text, id: id }))
            && dispatch(setKeywordByClickingFormsData({ key: text, id: id }))
            && scrolling(id.toString(), 'group-list-metadata', scrollWrapperYOffset);
        });
      }
    }, 1000);
  };

  const onClickSave = () => {
    dispatch(showAppBackdrop());
    const postRequest: IPostRequestForms = {
      los_uuid: params.id,
      template_type: templateType,
      fill_data_history_id: fileActive?.fill_data_history_id,
      template_uuid: fileActive?.id,
      actived_flag: fileActive?.actived_flag,
      approved_flag: fileActive?.approved_flag, 
      data_fill: listMetadata.reduce((result: typeof postRequest.data_fill, m) => {
        if (m.currentCodeContract)
          return {
            ...result,
            [`${m.key}`]: m.currentCodeContract || m.key
          };
        return { ...result };
      }, {})
    };
    dispatch(postLOANNormalForm(postRequest));
  };

  const changeInfoMetadata = (value: string, key: string, id: number) => {
    dispatch(setLOANNormalFormCurrentCodeContract({
      currentCodeContract: value,
      key: key,
      id: id
    }));
  };

  const changeSelect = (value: string | number, key: string, id: number) => {
    dispatch(setLOANNormalFormCurrentCodeContract({
      currentCodeContract: [value.toString()],
      key: key,
      id: id
    }));
  };

  const onClickDownloadPDF = () => {
    window.open(fileURL);
  };
  
  const handleHighlightText = (selectedText: string) => {
    const existed = listMetadata?.find(item => item.key === selectedText)?.id;
    if (existed) {
      dispatch(setKeywordByClickingFormsData({ key: selectedText, id: existed }))
    } else {
      // eslint-disable-next-line array-callback-return
      const existedDefaultDataId = listMetadata?.find(item => 
        (Array.isArray(item.currentCodeContract) && item.currentCodeContract[0] === selectedText) || item.currentCodeContract === selectedText
        )?.id;
      existedDefaultDataId && dispatch(setKeywordByClickingFormsData({ key: selectedText, id: existedDefaultDataId }))
    }
  }

  return (
    <Fragment>
      <Box
        className="pdf-viewer-container"
        sx={{ width: "55%", paddingTop: "30px" }}
      >
        <Worker workerUrl={process.env.PUBLIC_URL + "/assets/worker.js"}>
          {(() => {
            if (fileURL.length) {
              return (
                <Box sx={{ height: "650px", width: "100%" }} component="div">
                  <BasePDFView
                    current_keyword={Object.keys(currentKeyword)}
                    // fileUrl={'http://192.168.73.131:3031'+fileURL}
                    fileUrl={fileURL}
                    onDocumentLoadFinished={onGetTemplateField}
                    onClickDownload={onClickDownloadPDF}
                    onHighlightText={handleHighlightText}
                  />
                </Box>
              );
            } else {
              return (
                <Box
                  sx={{
                    height: "650px",
                    width: "100%",
                    border: "1px solid rgba(0, 0, 0, 0.3)",
                  }}
                  component="div"
                >
                  <Empty>Không có biểu mẫu</Empty>
                </Box>
              );
            }
          })()}
        </Worker>

        <Box component="div" className="metadata-info">
          <Typography className="title ellipsis bg-white text-upper text-primary">
            Thông tin
          </Typography>
          <Box component="div" className="row-line">
            <Box component="div" className="color-path"></Box>
          </Box>
          {(() => {
            if (!Object.values(currentKeyword).length) {
              return <Empty>Không có thông tin Metadata</Empty>;
            } else {
              return (
                <>
                  <Box component="div" className="input-info">
                    {/* {(() => {
                      const template = listMetadata.find(m => m.id === currentKeyword.id);
                      if (template) {
                        switch (template.input_type_id) {
                          case 1:
                            return <Input
                              type="text"
                              label={currentKeyword.key}
                              value={typeof template?.currentCodeContract === 'string'
                                ? template.currentCodeContract
                                : ''
                              }
                              ref={codeContractRef}
                              onDebounce={changeInfoMetadata}
                              timeout={300}
                            />;
                          case 2:
                            return <Select
                              options={template.extend_data.map(item => ({
                                value: item.value,
                                label: item.text
                              }))}
                              label={currentKeyword.key}
                              onChange={changeSelect}
                              ref={selectRef}
                              value={Array.isArray(template?.currentCodeContract)
                                ? template.currentCodeContract[0]
                                : undefined
                              }
                            />;
                        }
                      }
                    })()} */}
                    {
                      Object.values(currentKeyword).length &&
                      Object.values(currentKeyword).map(id => {
                        const template = listMetadata.find(metadata => metadata.id === id);
                        if (template) {
                          switch (template.input_type_id) {
                            case 1:
                              return <Input
                                type="text"
                                label={template.label}
                                value={typeof template?.currentCodeContract === 'string'
                                  ? template.currentCodeContract
                                  : ''
                                }
                                ref={codeContractRef}
                                key={id}
                                onDebounce={(value) => changeInfoMetadata(value, template.key, id)}
                                timeout={300}
                              />;
                            case 2:
                              return <Select
                                options={template.extend_data.map(item => ({
                                  value: item.value,
                                  label: item.text
                                }))}
                                label={template.label}
                                onChange={(value) => changeSelect(value, template.key, id)}
                                ref={selectRef}
                                value={Array.isArray(template?.currentCodeContract)
                                  ? template.currentCodeContract[0]
                                  : undefined
                                }
                                key={id}
                              />;
                          }
                        }
                        return null;
                      })
                    }
                  </Box>
                  <Box component="div" className="btn-save-info">
                    <Button
                      variant="contained"
                      className="rounded-0"
                      color="success"
                      onClick={onClickSave}
                    >
                      Áp dụng
                    </Button>
                  </Box>
                </>
              );
            }
          })()}
        </Box>
      </Box>
    </Fragment>
  );
};

export default FormsPDFViewer;
