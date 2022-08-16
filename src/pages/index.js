import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Header from "../components/header";
import Game from "../components/game";

const IndexPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => setIsMobile(window.innerWidth < 700);
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container>
      {isMobile ? (
        <h2> Ce site n'est pas optimisé pour les petits écrans.</h2>
      ) : (
        <>
          <Header />
          <Game />
        </>
      )}
    </Container>
  );
};

export default IndexPage;
