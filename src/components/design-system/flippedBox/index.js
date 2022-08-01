import Box from "@mui/material/Box";
import { keyframes, styled } from "@mui/material/styles";

const flip = keyframes`
  0% {}
  20% {transform: scale(1.1);}
  100% {transform: rotateY(180deg);}`;

const FlippedBox = styled(Box)(({ theme, flipped }) => ({
  backgroundColor: "transparent",
  width: 90,
  height: 90,
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
    animation: `${flipped ? `${flip} 0.8s forwards` : ""}`,
  },
  "& .flip-card-front, .flip-card-back": {
    borderRadius: "5px",
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    "& img": {
      width: 90,
    },
    overflow: "hidden",
  },
  "& .flip-card-front": {
    transform: "rotateY(180deg)",
  },
  "& .flip-card-back": {
    backgroundColor: theme.palette.primary.transparent,
  },
}));

export default FlippedBox;
