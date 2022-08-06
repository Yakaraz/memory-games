import { Container } from "@mui/material";
import React, { useContext } from "react";
import { db } from "../../db";
import { GameContext } from "../game";
import Description from "./description";
import FilesViewer from "./fileViewer";
import ImagesInput from "./imagesInput";

const FilesView = () => {
  const { setImages } = useContext(GameContext);

  const deleteImage = async (id) => {
    await db.images.delete(id);
    setImages((images) => images.filter((image) => image.uuid !== id));
  };
  const deleteAllImages = async () => {
    await db.images.clear();
    setImages([]);
  };

  return (
    <Container>
      <Description />
      <ImagesInput />
      <FilesViewer
        deleteImage={deleteImage}
        deleteAllImages={deleteAllImages}
      />
    </Container>
  );
};

export default FilesView;
