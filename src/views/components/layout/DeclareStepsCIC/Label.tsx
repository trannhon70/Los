import { FC, memo } from "react";
import clsx from "clsx";
import labelStyle from "./style";
// import { useTranslation } from "react-i18next";

export interface LabelProps {
  name: string;
  fileSub?: string;
}

const Label: FC<LabelProps> = (props) => {

  const classes = labelStyle();
  const { 
    name, 
    // fileSub 
  } = props;

  return (
    <div className={classes.stepLabel}>
      <div className={clsx(classes.stepLabelText, "font-bold")}>
        {name}
      </div>
      {/* <div className="title-folder-step">
        {fileSub === "Income" ? null : (
          <Link to="#">
            <img src={IconFolder} alt={t("icon folder")} />
          </Link>
        )}
      </div> */}
    </div>
  );
};

export default memo(Label);
