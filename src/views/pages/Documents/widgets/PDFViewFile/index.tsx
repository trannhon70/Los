import { FunctionComponent, useState, useEffect, ReactElement } from "react";
import { Viewer, DocumentLoadEvent, PageChangeEvent, LoadError } from "@react-pdf-viewer/core";
import { FlagKeyword, searchPlugin } from "@react-pdf-viewer/search";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import clsx from "clsx";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/search/lib/styles/index.css";
import pdfViewStyle from "./style";

interface HighlightKeywordsExampleProps {
  fileUrl: string;
  current_keyword?: string;
  onDocumentLoadFinished?(e: DocumentLoadEvent): void;
  onDocumentPageChange?(e: PageChangeEvent): void;
  renderError?(error: LoadError): ReactElement;
}

const PDFViewFile: FunctionComponent<HighlightKeywordsExampleProps> = ({
  fileUrl,
  current_keyword,
  onDocumentLoadFinished,
  onDocumentPageChange,
  renderError
}) => {
  const [currentKeyword, setCurrentKeyword] = useState<FlagKeyword>({
    keyword: "",
    matchCase: true,
    wholeWords: false,
  });

  const classes = pdfViewStyle();
  const searchPluginInstance = searchPlugin();
  const zoomPluginInstance = zoomPlugin({});
  const { CurrentScale } = zoomPluginInstance;
  const { highlight, clearHighlights } = searchPluginInstance;

  useEffect(() => {
    if (current_keyword !== "" && currentKeyword.keyword !== current_keyword) {
      const newKeyword = {
        keyword: current_keyword ?? "",
        matchCase: currentKeyword.matchCase,
        wholeWords: currentKeyword.wholeWords,
      };
      setCurrentKeyword(newKeyword);
      highlight(newKeyword);
    } else {
      clearHighlights();
    }
    CurrentScale({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current_keyword]);

  return (
    <div className={clsx(classes.root, "rpv-core__viewer")} id="pdf-view">
      <div
        style={{
          flex: 1,
          overflow: "hidden",
        }}
      >
        <Viewer
          fileUrl={fileUrl}
          plugins={[searchPluginInstance, zoomPluginInstance]}
          onDocumentLoad={onDocumentLoadFinished}
          // defaultScale={SpecialZoomLevel.PageWidth}
          // renderError={renderError}
        />
      </div>
    </div>
  );
};

export default PDFViewFile;
