import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary, ConfigOptions } from "cloudinary";
import envVariables from "../config";

cloudinary.config({
  cloud_name: envVariables.CLOUD_NAME, // Replace with your Cloudinary cloud name
  api_key: envVariables.API_KEY, // Replace with your Cloudinary API key
  api_secret: envVariables.API_SECRET, // Replace with your Cloudinary API secret
} as ConfigOptions);

const prisma = new PrismaClient();

export const seedRoomsData = async () => {
  await prisma.room.create({
    data: { name: "Tech" },
  });
};

export const allRooms = async () => {
  return await prisma.room.findMany({});
};

export const getChat = async (room: string) => {
  return await prisma.chat.findMany({
    where: {
      room: room,
    },
  });
};

export const createChat = async (
  room: string,
  message: string,
  uploadedFile: string,
  sender: string
) => {
  return await prisma.chat.create({
    data: {
      room,
      message,
      uploadedFile,
      sender,
    },
  });
};

interface CloudinaryDeleteResponse {
  result: "ok" | "not found";
}

// Function to delete a file
export const deleteFile = async (
  publicId: string
): Promise<CloudinaryDeleteResponse> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });

    return result as CloudinaryDeleteResponse;
  } catch (error) {
    throw new Error(`Failed to delete file with public ID ${publicId}`);
  }
};
