import { Rating, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import StarIcon from "@mui/icons-material/Star";

const labels: { [index: string]: string } = {
  0.5: "1",
  1: "2",
  1.5: "3",
  2: "4",
  2.5: "5",
  3: "6",
  3.5: "7",
  4: "8",
  4.5: "9",
  5: "10",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const FormManageRating: FC = () => {
  const [value, setValue] = useState<number | null>(2);
  const [hover, setHover] = useState(-1);

  return (
    <Box className="flex items-center">
      <Typography
        variant="subtitle2"
        color="black"
        fontSize={14}
        fontWeight={500}
        marginRight={1}
      >
        1. Đánh giá
      </Typography>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 1, color: "#353535", fontSize: "14px" }}>
          ({labels[hover !== -1 ? hover : value]}/10)
        </Box>
      )}
    </Box>
  );
};

export default FormManageRating;
