import Dexie from "dexie";

export const db = new Dexie("memory");
db.version(1).stores({
  images: "++uuid", // Primary key and indexed props
  scores: "++id",
});
