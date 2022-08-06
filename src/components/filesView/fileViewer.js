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
  boxShadow: "1px 1px 1px 0 rgba(0,39,86,0.5)",
  "&:hover": {
    boxShadow: "2px 1px 2px 1px rgba(0,39,86,0.5)",
  },
});

const FilesViewer = ({ deleteImage, deleteAllImages }) => {
  const { images } = useContext(GameContext);
  return (
    <Container>
      {images && images.length > 0 && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "end",
          }}
          my="1.5em"
        >
          <Typography
            fontFamily="Inter"
            fontStyle="normal"
            fontWeight="500"
            fontSize="16px"
            lineHeight="26px"
            color="primary"
            marginRight="auto"
          >
            Vos fichiers
          </Typography>
          <Button
            variant="contained"
            color="delete"
            sx={{
              color: "white",
            }}
            onClick={() => deleteAllImages()}
          >
            Tout supprimer
          </Button>
        </Box>
      )}
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
