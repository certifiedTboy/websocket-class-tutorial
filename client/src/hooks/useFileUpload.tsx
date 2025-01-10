import { useState } from "react";
const useFileUpload = () => {
  const [uploadedFile, setUploadedFile] = useState("");
  const [fileUploadError, setFileUploadError] = useState("");
  const [filePublicId, setFiePublicId] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const cloudName = "dmdnusfre";
  const unsignedUploadPreset = "class_chat_app";

  const uploadFile = async (file: File) => {
    const fd = new FormData();
    fd.append("upload_preset", unsignedUploadPreset);
    fd.append("tags", "browser_upload"); // Optional - add tags for image admin in Cloudinary
    fd.append("file", file);

    try {
      setIsUploading(true);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        { method: "POST", body: fd }
      );

      const data = await response.json();

      if (!response.ok) {
        setIsUploading(false);
        throw new Error("Something went wrong!");
      }

      setIsUploading(false);

      setUploadedFile(data?.secure_url);
      setFiePublicId(data?.public_id);
    } catch (error: any) {
      return setFileUploadError(error.message);
    }
  };

  const clearUploadedFile = async () => {
    return setUploadedFile("");
  };

  const deleteFile = async () => {
    if (filePublicId) {
      const response = await fetch(
        `http://localhost:3001/file/delete?publicId=${filePublicId}`,
        { method: "DELETE" }
      );

      const data = await response.json();

      if (!response.ok) {
        return;
      }

      return setUploadedFile("");
    }
  };

  return [
    uploadFile,
    uploadedFile,
    fileUploadError,
    isUploading,
    clearUploadedFile,
    deleteFile,
  ];
};

export default useFileUpload;
