import { Button, Grid } from '@mui/material';
import {
  DocumentLoadEvent, Viewer
} from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import {
  highlightPlugin,
  RenderHighlightTargetProps
} from '@react-pdf-viewer/highlight';
import {
  // FlagKeyword, 
  searchPlugin
} from "@react-pdf-viewer/search";
import '@react-pdf-viewer/search/lib/styles/index.css';
import clsx from 'clsx';
import { FunctionComponent, useEffect, useState } from "react";
import {
  FaDownload
} from 'react-icons/fa';
import AttachmentModal from "views/pages/LOAN/widgets/AttachmentLegal";
import pdfViewStyle from "./style";

interface HighlightKeywordsExampleProps {
  fileUrl: string;
  current_keyword?: string[];
  onDocumentLoadFinished?(e: DocumentLoadEvent): void;
  onClickDownload?(): void;
  onHighlightText?(selectedText: string): void;
  isHideDownload?: boolean;
}

const BasePDFView: FunctionComponent<HighlightKeywordsExampleProps> = ({
  fileUrl,
  current_keyword,
  onDocumentLoadFinished,
  onClickDownload,
  onHighlightText,
  isHideDownload = false
}) => {
  // const [currentKeyword, setCurrentKeyword] = useState<FlagKeyword>({
  //   keyword: "",
  //   matchCase: false,
  //   wholeWords: false,
  // });
  const classes = pdfViewStyle();
  const searchPluginInstance = searchPlugin();
  const { highlight, clearHighlights } = searchPluginInstance;
  const [highlightText, setHighlightText] = useState<string>("");

  useEffect(() => {
    if (current_keyword && current_keyword.length) {
      // const newKeyword = {
      //   keyword: current_keyword ?? "",
      //   matchCase: currentKeyword.matchCase,
      //   wholeWords: currentKeyword.wholeWords,
      // };
      // setCurrentKeyword(newKeyword);
      const listKeyword = current_keyword.map(item => ({
        keyword: item,
        matchCase: false,
        wholeWords: false
      }))
      highlight(listKeyword);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current_keyword]);

  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenModal(!isOpenModal);
  }

  useEffect(() => {
    clearHighlights();
    if (highlightText.length) {
      onHighlightText && onHighlightText(highlightText)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightText])

  const renderHighlightTarget = (props: RenderHighlightTargetProps) => {
    if (highlightText !== props.selectedText) {
      setHighlightText(props.selectedText);
    }
    return <div></div>
  };

  const highlightPluginInstance = highlightPlugin({
      renderHighlightTarget,
  });

  return (
    <div className={clsx(classes.root, "own--rpv-core__viewer")} id="pdf-view">

      <div
        style={{
          flex: 1,
          overflow: "hidden",
        }}
      >
        <Grid container className={classes.toolbar}>
          {/* <Grid item xl={2} lg={2} md={3} xs={12}>
            <Typography className='border'>Tổng hợp hồ sơ</Typography>
            <Divider orientation="vertical" flexItem />
          </Grid> */}
          {/* <Grid item xl={2} lg={2} md={3} xs={12} className='folder'>
            <span> <FaFolder size="16px" color="#313fd2" /></span>
            <span className={clsx('folder-icon-text ellipsis bg-white')} onClick={handleOpenModal}>6 tập tin</span>
          </Grid> */}
          <Grid item xl={12} lg={12} md={12} xs={12} className='icon'>
            {!isHideDownload && <Button title="Tải xuống" className="function-button" onClick={onClickDownload}><FaDownload /></Button>}
            {/* <Divider orientation="vertical" flexItem className="divider" />
            <Button className="function-button"><FaExchangeAlt /></Button>
            <Divider orientation="vertical" flexItem className="divider" />
            <Button className="function-button"><FaShareAlt /></Button>
            <Divider orientation="vertical" flexItem className="divider" />
            <Button className="function-button"><FaLock /></Button>
            <Divider orientation="vertical" flexItem className="divider" />
            <Button className="function-button"><FaPrint /></Button>
            <Divider orientation="vertical" flexItem className="divider" />
            <Button className="function-button warning"><FaTrash color="#eb0029" /></Button> */}
          </Grid>
        </Grid>
        <Viewer
          fileUrl={fileUrl}
          onDocumentLoad={onDocumentLoadFinished}
          plugins={[highlightPluginInstance, searchPluginInstance ]}
        />
        <AttachmentModal open={isOpenModal} onClose={handleOpenModal} />
      </div>
    </div>
  );
};

export default BasePDFView;
