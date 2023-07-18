import { makeStyles } from "@mui/styles";

const cicFormStyle = makeStyles(() => ({
  root: {
    "& .input-red": {
      "& input": {
        // '-webkit-text-fill-color': 'var(--mscb-danger) !important',
        '-webkit-text-fill-color': 'var(--mscb-red) !important',
        fontWeight: 'bold'
      }
    }
  }
}));

export default cicFormStyle;