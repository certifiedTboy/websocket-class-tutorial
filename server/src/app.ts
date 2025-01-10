import express from "express";
import cors from "cors";
import {
  getAllRooms,
  getAllChats,
  deleteChatFile,
} from "./controllers/chat.controllers";

const app = express();

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "server is live" });
});

app.get("/rooms", getAllRooms);
app.get("/chats/:room", getAllChats);
app.delete("/file/delete", deleteChatFile);

export default app;
