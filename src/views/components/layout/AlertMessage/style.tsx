import { makeStyles } from "@mui/styles";

const alertMessageStyle = makeStyles(() => ({
    root: {

        '& .MuiPaper-root': {
            borderRadius: "3px",
            boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.25)",
            border: "solid 1px #1a9b06",
            backgroundColor: "#fff",
        },

    }
})) as Function;

export default alertMessageStyle;