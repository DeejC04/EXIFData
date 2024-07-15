"use client"

import { UploadCloud } from "lucide-react";
import FilePreview from "./FilePreview";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { FileWithPreview } from "@/app/types/types";

export default function FileUpload() {
    const [uploadedfiles, setUploadedFiles] = useState<FileWithPreview[]>([])
    // const [rejected, setRejected] = useState([])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setUploadedFiles(prevUploadedFiles => [
            ...prevUploadedFiles,
            ...acceptedFiles.map((file) => {
                // Cast to FileWithPreview to add the preview property
                const fileWithPreview = file as FileWithPreview;
                fileWithPreview.preview = URL.createObjectURL(file);
                return fileWithPreview;
            })
        ]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": []
        }
    })

    return (
        <Card className={`w-1/4 transition-all duration-300 ease-in-out overflow-hidden ${uploadedfiles.length > 0 ? 'max-h-[930px]' : 'max-h-[250px]'} ${isDragActive ? 'bg-accent' : ''
            }`}>
            <CardHeader>
                <CardTitle>Upload some images</CardTitle>
                <CardDescription>Drag and drop images here</CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    <div
                        {...getRootProps()}
                        className="flex flex-col items-center justify-center w-full py-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent 
                        hover:text-accent-foreground hover:ring-ring hover:ring-1 transition-colors min-h-32"
                    >
                        <input {...getInputProps()} />
                        <div className="text-center">
                            <div className="max-w-min mx-auto">
                                <UploadCloud />
                            </div>
                            <p className="mt-2 text-sm">
                                <span className="font-semibold">
                                    {isDragActive ? "Drop here!" : "Drag and drop files"}
                                </span>
                            </p>
                            {!isDragActive && <p className="text-xs">or click to upload</p>}
                        </div>
                    </div>
                </div>

                {uploadedfiles?.length > 0 && (
                    <>
                        <h2 className="mt-4 font-semibold">
                            Uploaded files
                        </h2>
                        <ScrollArea className="h-48">
                            <div>
                                <div className="z-50 bg-gradient-to-b from-neutral-950 via-neutral-950 h-10 w-full -mb-24 -mt-6 absolute"></div>
                                <div className="z-50 bg-gradient-to-b from-neutral-950 via-neutral-950 h-10 w-full -mb-24 -mt-6 absolute"></div>
                            </div>
                                {
                                    uploadedfiles.map((fileInfo, index) =>
                                        <FilePreview
                                            key={fileInfo.name}
                                            fileName={fileInfo.name}
                                            uploadProgress={100}
                                            previewImage={fileInfo.preview}
                                        />
                                    )}
                        </ScrollArea>
                    </>
                )}
            </CardContent>
        </Card>
    )
}