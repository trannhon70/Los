import { makeStyles } from "@mui/styles";

const CircleBoxStyle = makeStyles(() => ({
    root: {
        display: "flex",
        placeContent: "center",
        borderRadius: "50%",
        overflow: "hidden",
        maxWidth: "100%",
        width: "32px",
        height: "32px",
    }
}));
export default CircleBoxStyle;