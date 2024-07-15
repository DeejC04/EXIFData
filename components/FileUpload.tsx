"use client"

import { UploadCloud } from "lucide-react";
import FilePreview from "./FilePreview";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { UploadProgress } from "@/app/types/types"
import { Button } from "./ui/button";

export default function FileUpload() {
    const [filesToUpload, setFilesToUpload] = useState<UploadProgress[]>([])
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
    const [inProgress, setInProgress] = useState<UploadProgress[]>([])

    const filesInQueue: boolean = filesToUpload?.length > 0

    const removeFile = (file: File) => {
        setFilesToUpload((prevUploadProgress) => {
            return prevUploadProgress.filter((item) => item !== file);
        });

        // setUploadedFiles((prevUploadedFiles) => {
        //   return prevUploadedFiles.filter((item) => item !== file);
        // });
    };

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setFilesToUpload((prevFilesToUpload) => {
            return [
                ...prevFilesToUpload,
                ...acceptedFiles.map((file) => {
                    return {
                        progress: 0,
                        File: file,
                        source: null,
                        preview: URL.createObjectURL(file)
                    };
                }),
            ];
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": []
        }
    })

    return (
        <Card className={`w-1/4 transition-all duration-300 ease-in-out overflow-hidden ${filesToUpload.length > 0 ? 'max-h-[930px]' : 'max-h-[250px]'} ${isDragActive ? 'bg-accent' : ''
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

                {filesInQueue && (
                    <>
                        <h2 className="mt-4 font-semibold">
                            Uploaded files
                        </h2>
                        <ScrollArea className="h-48 mb-4">
                            <div>
                                <div className="z-50 bg-gradient-to-b from-neutral-950 via-neutral-950 h-10 w-full -mb-24 -mt-6 absolute"></div>
                                <div className="z-50 bg-gradient-to-b from-neutral-950 via-neutral-950 h-10 w-full -mb-24 -mt-6 absolute"></div>
                            </div>
                            {
                                filesToUpload.map((fileInfo, index) =>
                                    <FilePreview
                                        key={index}
                                        fileName={fileInfo.File.name}
                                        uploadProgress={100}
                                        previewImage={fileInfo.preview}
                                        removeFunction={() => removeFile(fileInfo)}
                                    />
                                )}
                        </ScrollArea>
                    </>
                )}
            </CardContent>
            {/* Have to use this conditional twice due to the way the shadcn card is structured */}
            {filesInQueue && (
                <CardFooter>
                    <Button className="w-full">Upload Images</Button>
                </CardFooter>
            )}
        </Card>
    )
}