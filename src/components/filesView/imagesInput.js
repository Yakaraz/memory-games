import React, { useCallback, useContext } from "react";
import { Alert, Box, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../db";
import { GameContext } from "../game";

const ImagesInput = () => {
  const { setImages, setBoardSize } = useContext(GameContext);

  const uploadFiles = async (images) => {
    if (images.length) {
      const filteredImages = images.filter((image) =>
        ["image/jpeg", "image/png"].includes(image.type)
      );
      const newImages = [...filteredImages].map((file) => ({
        file,
        uuid: uuidv4(),
      }));

      let imagesIds = await db.images.bulkAdd(newImages, {
        allKeys: "true",
      });
      let uploadedImages = await db.images.bulkGet(imagesIds);
      setImages((oldImages) => [
        ...oldImages,
        ...uploadedImages.map((image) => ({
          uuid: image.uuid,
          name: image.file.name,
          url: URL.createObjectURL(image.file),
        })),
      ]);
      setBoardSize(0);
    }
  };
  const onDrop = useCallback((acceptedFiles) => {
    uploadFiles(acceptedFiles);
  }, []);
  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
  });

  return (
    <>
      <label htmlFor="raised-button-file">
        <div {...getRootProps()}>
          <input
            type="file"
            style={{ display: "none" }}
            id="raised-button-file"
            multiple
            onChange={(e) => uploadFiles(e.target.files)}
            {...getInputProps()}
          />
          {fileRejections.length > 0 && (
            <Alert severity="warning">
              Seules les images .jpg, .jpeg et .png sont prises en charge.
            </Alert>
          )}
          <Box
            sx={{
              height: "150px",
              backgroundColor: "rgba(95, 153, 231, 0.05)",
              border: "1.5px dashed #5F99E7",
              borderRadius: "3px",
              display: "grid",
              justifyItems: "center",
              alignContent: "center",
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
          </Box>
        </div>
      </label>
    </>
  );
};

export default ImagesInput;
