import axios, { CancelTokenSource } from "axios";

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
  File: File;
  source: CancelTokenSource | null;
  preview: any;
}
