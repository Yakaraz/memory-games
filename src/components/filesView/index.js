import { Container } from "@mui/material";
import React, { useContext } from "react";
import { db } from "../../db";
import { GameContext } from "../game";
import Description from "./description";
import FilesViewer from "./fileViewer";
import ImagesInput from "./imagesInput";

const FilesView = () => {
  const { setImages, setBoardSize, images } = useContext(GameContext);

  const deleteImage = async (id) => {
    await db.images.delete(id);

    const image = images.find((image) => image.uuid === id);
    URL.revokeObjectURL(image.url);
    setImages((images) => images.filter((image) => image.uuid !== id));
    setBoardSize(0);
  };
  const deleteAllImages = async () => {
    await db.images.clear();
    images.forEach((element) => {
      URL.revokeObjectURL(element.url);
    });
    setImages([]);
    setBoardSize(0);
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
