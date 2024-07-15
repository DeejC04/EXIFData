export interface FileProps {
    fileName: string,
    uploadProgress?: number,
    fileExtension?: string,
    previewImage: string
}

export interface FileWithPreview extends File {
    preview: string
}