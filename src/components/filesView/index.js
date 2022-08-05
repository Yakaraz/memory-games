import {
  styled,
  Container,
  Typography,
  Stack,
  Box,
  Grid,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { db } from "../../db";
import { v4 as uuidv4 } from "uuid";

const FilesView = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const images = await db.images.toArray();
      setFiles(
        images.map((image) => ({
          uuid: image.uuid,
          name: image.file.name,
          url: URL.createObjectURL(image.file),
        }))
      );
    };
    fetchData();
  }, []);

  const deleteImage = async (id) => {
    await db.images.delete(id);
    setFiles((files) => files.filter((file) => file.uuid !== id));
  };

  return (
    <Container>
      <StepOneDescription />
      <StepOneDnD files={files} setFiles={setFiles} />
      <FilesViewer files={files} deleteImage={deleteImage} />
    </Container>
  );
};

const StepOneDescription = () => (
  <Container ml="1em" sx={{ marginBottom: "1em" }}>
    <Typography
      component="h3"
      color="primary"
      fontFamily="Inter"
      fontStyle="normal"
      fontSize="24px"
      fontWeight="500"
      lineHeight="29px"
      mt="2em"
      mb="0.5em"
    >
      <Typography
        component="div"
        fontFamily="Inter"
        fontStyle="normal"
        fontSize="24px"
        fontWeight="700"
        lineHeight="36px"
        textAlign="center"
        mr="1em"
        sx={{
          display: "inline-block",
          borderRadius: "50%",
          height: "36px",
          width: "36px",
          color: "white",
          backgroundColor: "#003986",
        }}
      >
        1
      </Typography>
      Sélectionnez vos photos sur votre ordinateur ou votre tablette.
    </Typography>
    <Typography
      component="span"
      color="secondary"
      fontFamily="Inter"
      fontStyle="normal"
      fontSize="16px"
      fontWeight="400"
      lineHeight="26px"
    >
      <Typography
        component="span"
        fontFamily="Inter"
        fontStyle="normal"
        fontSize="16px"
        fontWeight="700"
        lineHeight="26px"
        sx={{ margin: "0.5ch" }}
      >
        Vous n’avez pas de photo ?
      </Typography>
      Pas de panique, nous allons en ajouter
      <Typography
        component="span"
        fontFamily="Inter"
        fontStyle="normal"
        fontSize="16px"
        fontWeight="700"
        lineHeight="26px"
        sx={{ margin: "0.5ch" }}
      >
        automatiquement
      </Typography>
      pour vous.
    </Typography>
  </Container>
);

const StepOneDnD = ({ setFiles }) => {
  const uploadFiles = async (files) => {
    //  let images = await db.images.toArray();

    if (files.length) {
      const newImages = [...files].map((file) => ({
        file,
        uuid: uuidv4(),
      }));

      let imagesIds = await db.images.bulkAdd(newImages, {
        allKeys: "true",
      });
      let images = await db.images.bulkGet(imagesIds);
      setFiles((oldFiles) => [
        ...oldFiles,
        ...images.map((image) => ({
          uuid: image.uuid,
          name: image.file.name,
          url: URL.createObjectURL(image.file),
        })),
      ]);
    }
  };

  return (
    <>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={(e) => uploadFiles(e.target.files)}
      />
      <label htmlFor="raised-button-file">
        <Container
          sx={{
            height: "150px",
            backgroundColor: "rgba(95, 153, 231, 0.05)",
            border: "1.5px dashed #5F99E7",
            borderRadius: "3px",
            display: "grid",
            justifyItems: "center",
            alignContent: "center",
            marginLeft: "1em",
            cursor: "pointer",
          }}
        >
          <Typography
            sx={{
              height: "25px",
              width: "25px",
              backgroundColor: "rgba(95, 153, 231, 0.2)",
              borderRadius: "50%",
              display: "grid",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="./img/upload.png" alt="upload" />
          </Typography>
          <Typography
            fontFamily="Inter"
            fontStyle="normal"
            fontSize="14px"
            fontWeight="500"
            lineHeight="17px"
            mt="1em"
            sx={{ maxWidth: "30ch" }}
            textAlign="center"
          >
            Faites{" "}
            <Typography
              component="span"
              fontStyle="normal"
              fontSize="14px"
              fontWeight="500"
              lineHeight="17px"
              color="secondary"
            >
              glissez vos photos{" "}
            </Typography>
            depuis votre appareils ou{" "}
            <Typography
              component="span"
              fontStyle="normal"
              fontSize="14px"
              fontWeight="500"
              lineHeight="17px"
              color="secondary"
            >
              chargez-les
            </Typography>
            .
          </Typography>
          <Typography
            fontFamily="Inter"
            fontStyle="normal"
            fontSize="10px"
            fontWeight="400"
            lineHeight="12px"
            color="#9AA3B0"
            mt="1em"
          >
            Choisissez entre 2 et 26 photos.
          </Typography>
        </Container>
      </label>
    </>
  );
};
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const FilesViewer = ({ files, deleteImage }) => (
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
      {files.map((file) => (
        <Box key={file.uuid}>
          <Grid container spacing={2}>
            <Grid item>
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
                  {/* <Typography
                    fontFamily="Inter"
                    fontStyle="normal"
                    fontSize="14px"
                    fontWeight="400"
                    lineHeight="26px"
                    color="rgba(0, 0, 0, 0.3)"
                    gutterBottom
                  >
                    {file.status === "loading"
                      ? "En cours de chargement"
                      : "Image chargée"}
                  </Typography> */}
                </Grid>
              </Grid>
              <Grid item sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#860000",
                    borderRadius: "50%",
                    minWidth: "5px",
                    width: "30px",
                    height: "30px",
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

export default FilesView;
