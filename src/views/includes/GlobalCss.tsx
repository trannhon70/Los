import { FC, memo } from "react";
import commonStyle from "assets/css/common";
import positionStyle from "assets/css/position";
import spacingStyle from "assets/css/spacing";
import colorStyle from "assets/css/color";
import variablesStyle from "assets/css/variables";
import mscbStyle from "assets/css/mscb";
import textStyle from "assets/css/text";
import typographyStyle from "assets/css/typography";
import 'assets/css/vendor';

const GlobalCss: FC = () => {
  variablesStyle();
  commonStyle();
  positionStyle();
  spacingStyle();
  colorStyle();
  textStyle();
  typographyStyle();
  mscbStyle();

  return null;
};

export default memo(GlobalCss);