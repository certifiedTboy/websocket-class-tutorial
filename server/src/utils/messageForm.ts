class MessageFormat {
  sender: string;
  message?: string;
  uploadedFile?: string;
  constructor(sender: string, message: string, uploadedFile?: string) {
    this.sender = sender;
    this.message = message;
    this.uploadedFile = uploadedFile;
  }
}

export default MessageFormat;
