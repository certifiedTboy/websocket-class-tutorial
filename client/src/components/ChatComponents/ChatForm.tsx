import { useContext, useState, useRef } from "react";
import { ChatContext } from "../../store/chat-context";
import useFileUpload from "../../hooks/useFileUpload";
import Loader from "../ui/Loader";
// import styles from "./Chat.module.css";

const ChatForm = () => {
  const chatCtx = useContext(ChatContext);
  const [message, setMessage] = useState<string>("");

  const [
    uploadFile,
    uploadedFile,
    fileUploadError,
    isUploading,
    clearUploadedFile,
    deleteFile,
  ] = useFileUpload();

  const focusInput = useRef<HTMLInputElement>(null);

  const sendMessageHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!message && !uploadedFile) return;

    const chatData = {
      message: message || null,
      currentUser: chatCtx.currentUser || null,
      uploadedFile: typeof uploadedFile === "string" ? uploadedFile : null,
    };

    chatCtx.sendMessage(chatData);

    setMessage("");

    if (typeof clearUploadedFile === "function") {
      clearUploadedFile(new File([], ""));
    }

    focusInput?.current?.focus();
  };

  const onSelectFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileType = event.target.files[0].type;

      if (
        fileType !== "image/png" &&
        fileType !== "image/jpg" &&
        fileType !== "image/jpeg"
      ) {
        // setPrevImage("");
        return;
      }

      if (typeof uploadFile === "function") {
        await uploadFile(event.target.files[0]);
      }
    }
  };

  return (
    <form onSubmit={sendMessageHandler}>
      {isUploading && (
        <div className="relative flex flex-col w-fit md:ml-3 rounded-md mb-1 ">
          <div className="ml-10">
            <Loader />
          </div>
        </div>
      )}
      {!isUploading && uploadedFile && (
        <div className="relative flex flex-col -mt-[150px]  w-fit md:ml-3 rounded-md mb-1 bg-[#333] ">
          <div className="ml-2">
            <i
              className="fa-regular  z-50 cursor-pointer text-white fa-trash-can"
              onClick={async () =>
                typeof deleteFile === "function" &&
                (await deleteFile(new File([], "")))
              }
            ></i>
          </div>
          {uploadFile && typeof uploadedFile === "string" && (
            <img
              src={uploadedFile}
              alt="preview"
              className="h-[150px] mx-auto"
            />
          )}
        </div>
      )}
      <div className={`flex items-end py-2 px-3`}>
        <button
          type="button"
          className="inline-flex z-10 -mr-10 justify-center p-2 text-gray-500 rounded-lg cursor-pointer "
        >
          <label
            htmlFor="logo"
            className="flex items-center justify-center w-full cursor-pointer"
          >
            <input
              id="logo"
              type="file"
              className="hidden"
              accept="image/*, video/*, application/pdf"
              onInput={onSelectFile}
            />
            <svg
              fill="currentColor"
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z" />
            </svg>
          </label>
        </button>
        <div className="form-group w-full">
          <input
            className="form-control w-full"
            placeholder="Type message..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            ref={focusInput}
            style={{ paddingLeft: "45px" }}
          />
        </div>
      </div>
    </form>
  );
};

export default ChatForm;
