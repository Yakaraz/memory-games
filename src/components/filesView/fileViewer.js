import React, { useContext } from "react";
import {
  Stack,
  Box,
  Grid,
  Button,
  Typography,
  Container,
  styled,
} from "@mui/material";
import { GameContext } from "../game";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "98%",
  maxHeight: "98%",
  "&:hover": {
    boxShadow: "0 0 0 1px white,0 0 0 3px #003986",
  },
});

const FilesViewer = ({ deleteImage }) => {
  const { images } = useContext(GameContext);
  return (
    <Container>
      <Typography
        fontFamily="Inter"
        fontStyle="normal"
        fontWeight="500"
        fontSize="16px"
        lineHeight="26px"
        color="primary"
      >
        Vos fichiers
      </Typography>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={0.5}
      >
        {images.map((file) => (
          <Box key={file.uuid} my="0.5em">
            <Grid container spacing={2}>
              <Grid item sx={{ maxWidth: "180px", maxHeight: "130px" }}>
                <Img alt="" src={file.url} />
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography
                      fontFamily="Inter"
                      fontStyle="normal"
                      fontWeight="500"
                      fontSize="16px"
                      lineHeight="26px"
                    >
                      {file.name}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="delete"
                    sx={{
                      borderRadius: "50%",
                      minWidth: "5px",
                      width: "30px",
                      height: "30px",
                      color: "white",
                    }}
                    onClick={() => deleteImage(file.uuid)}
                  >
                    X
                  </Button>
                  <Typography
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontSize="11px"
                    fontWeight="500"
                    lineHeight="26px"
                    color="rgba(0, 0, 0, 0.3);"
                  >
                    Supprimer
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default FilesViewer;
