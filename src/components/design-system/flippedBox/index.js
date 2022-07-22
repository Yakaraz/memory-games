import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const FlippedBox = styled(Box)(({ theme, flipped }) => ({
  backgroundColor: "transparent",
  width: 90,
  height: 90,
  border: "1px solid #f1f1f1",
  perspective: 1000,
  cursor: `${flipped ? "auto" : "pointer"}`,

  "& .flip-card-inner": {
    position: "relative",
    width: "100%",
    height: "100%",
    textAlign: "center",
    transition: "transform 0.8s",
    transformStyle: "preserve-3d",
    //
    transform: `${flipped ? "rotateY(180deg)" : ""}`,
  },
  "& .flip-card-front, .flip-card-back": {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    "& img": {
      width: 90,
    },
  },
  "& .flip-card-front": {
    transform: "rotateY(180deg)",
  },
  "& .flip-card-back": {
    backgroundColor: "blueviolet",
  },
}));

export default FlippedBox;
