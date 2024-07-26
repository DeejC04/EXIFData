import axios, { CancelTokenSource } from "axios";
import { FileWithPath } from "react-dropzone";

export interface FileProps {
  fileName: string;
  uploadProgress?: number;
  fileExtension?: string;
  previewImage: string;
  removeFunction: any;
}

export interface FileWithPreview extends File {
  preview: string;
}

export interface UploadProgress {
  progress: number;
  File: FileWithPath;
  source: CancelTokenSource | null;
  publicID: string;
  previewBase64: string;
}
