import { Request, Response } from "express";
import { allRooms, getChat, deleteFile } from "../services/chatServices";

export const getAllChats = async (req: Request, res: Response) => {
  const { room } = req.params;
  try {
    const chats = await getChat(room);
    res.status(200).json(chats);
  } catch (error: any) {
    res.json({ error: error.message });
  }
};

export const getAllRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await allRooms();

    return res.status(200).json(rooms);
  } catch (error: any) {
    res.json({ error: error.message });
  }
};

export const deleteChatFile = async (req: Request, res: Response) => {
  const { publicId } = req.query;

  try {
    const result = await deleteFile(publicId as string);

    if (result.result !== "ok") {
      return res.status(400).json({ error: "delete failed" });
    } else {
      return res.status(200).json({ message: "file deleted successfully" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "something went wrong" });
  }
};
