import React from "react";
import { Container } from "@mui/material";
import Title from "../Title";
import Rules from "../Rules";

const Header = () => (
  <Container sx={{ position: "relative" }}>
    <Title />
    <Rules />
  </Container>
);

export default Header;
