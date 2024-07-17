"use client";

import { UploadCloud } from "lucide-react";
import FilePreview from "./FilePreview";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { UploadProgress } from "@/app/types/types";
import { Button } from "./ui/button";
import axios, { AxiosProgressEvent, CancelTokenSource } from "axios";

export default function FileUpload() {
  const [filesToUpload, setFilesToUpload] = useState<UploadProgress[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadProgress[]>([]);

  const filesInQueue: boolean = filesToUpload?.length > 0;

  const onUploadProgress = (
    progressEvent: AxiosProgressEvent,
    file: File,
    cancelSource: CancelTokenSource
  ) => {
    const progress = Math.round(
      (progressEvent.loaded / (progressEvent.total ?? 0)) * 100
    );

    // if (progress === 100) {
    //   setUploadedFiles((prevUploadedFiles) => {
    //     return [...prevUploadedFiles, file] as UploadProgress[];
    //   });

    if (progress === 100) {
      setFilesToUpload((prevFilesToUpload) => {
        return prevFilesToUpload.filter((item) => item.File !== file);
      });

      setUploadedFiles((prevUploadedFiles) => {
        const completedFile = filesToUpload.find((item) => item.File === file);
        return completedFile ? [...prevUploadedFiles, { ...completedFile, progress }] : prevUploadedFiles;
      });
    }

    setFilesToUpload((prevFilesToUpload) => {
      return prevFilesToUpload.map((item) => {
        if (item.File.name === file.name) {
          return {
            ...item,
            progress,
            source: cancelSource,
          };
        } else {
          return item;
        }
      });
    });
  };


  
  const uploadImageToCloudinary = async (
    formData: FormData,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
    cancelSource: CancelTokenSource
  ) => {
    return axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      formData,
      {
        onUploadProgress,
        cancelToken: cancelSource.token,
      }
    );
  };

  const removeFile = (file: File) => {
    setFilesToUpload((prevFilesToUpload) => {
      return prevFilesToUpload.filter((item) => item.File !== file);
    });

    setUploadedFiles((prevUploadedFiles) => {
      return prevUploadedFiles.filter((item) => item.File !== file);
    });
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFilesToUpload((prevFilesToUpload) => {
      return [
        ...prevFilesToUpload,
        ...acceptedFiles.map((file) => {
          return {
            progress: 0,
            File: file,
            source: null,
            previewBase64: ""
          };
        }),
      ];
    });

    acceptedFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = () => {
        setFilesToUpload((prevFilesToUpload) => {
          return prevFilesToUpload.map((item => {
            if (item.File === file) {
              return {
                ...item,
                previewBase64: reader.result as string,
              }
            } else {
              return item
            }
          }))
        })
      }
      reader.readAsDataURL(file)
    })
  }, []);

  const handleUploadClick = async () => {
    const fileUploadBatch = filesToUpload.map((fileInfo) => {
      const formData = new FormData();
      formData.append("file", fileInfo.File);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_UPLOAD_PRESET as string
      );
      const cancelSource = axios.CancelToken.source();
      return uploadImageToCloudinary(
        formData,
        (progressEvent) =>
          onUploadProgress(progressEvent, fileInfo.File, cancelSource),
        cancelSource
      );
    });

    try {
      await Promise.all(fileUploadBatch);
      alert("All files uploaded successfully");
    } catch (error) {
      console.error("Error uploading files: ", error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div className="container flex justify-center p-4 sm:p-6 mx-auto">
      <Card
        className={`w-full max-w-full sm:max-w-lg transition-all duration-300 ease-in-out overflow-hidden ${
          filesToUpload.length > 0 || uploadedFiles.length > 0 ? "max-h-[930px]" : "max-h-[250px]"
        } ${isDragActive ? "bg-accent" : ""}`}
      >
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
          {/* Clean this conditional area up */}
          {filesInQueue && (
            <>
              <h2 className="mt-4 font-semibold">File(s) to be uploaded</h2>
              <ScrollArea className="h-48">
                <div>
                  <div className="z-50 bg-gradient-to-b from-neutral-950 via-neutral-950 h-10 w-full -mb-24 -mt-6 absolute"></div>
                  <div className="z-50 bg-gradient-to-b from-neutral-950 via-neutral-950 h-10 w-full -mb-24 -mt-6 absolute"></div>
                </div>
                {filesToUpload.map((fileInfo, index) => (
                  <FilePreview
                    key={index}
                    fileName={fileInfo.File.name}
                    uploadProgress={fileInfo.progress}
                    previewImage={fileInfo.previewBase64}
                    removeFunction={() => removeFile(fileInfo.File)}
                  />
                ))}
              </ScrollArea>
            </>
          )}
          {/* This doesn't display the image preview. I think it's because the URL.createObjectURL function. Also, revoke all URLs. There's a memoryleak*/}
          {uploadedFiles.length > 0 && (
            <>
              <h2 className="mt-4 font-semibold">Uploaded file(s)</h2>
              <ScrollArea className="h-48">
                <div>
                  <div className="z-50 bg-gradient-to-b from-neutral-950 via-neutral-950 h-10 w-full -mb-24 -mt-6 absolute"></div>
                  <div className="z-50 bg-gradient-to-b from-neutral-950 via-neutral-950 h-10 w-full -mb-24 -mt-6 absolute"></div>
                </div>
                {uploadedFiles.map((fileInfo, index) => (
                  <FilePreview
                    key={index}
                    fileName={fileInfo.File.name}
                    uploadProgress={fileInfo.progress}
                    previewImage={fileInfo.previewBase64}
                    removeFunction={() => removeFile(fileInfo.File)}
                  />
                ))}
              </ScrollArea>
            </>
          )}
        </CardContent>
        {filesInQueue && (
          <CardFooter>
            <Button className="w-full" onClick={handleUploadClick}>
              Upload Images
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
