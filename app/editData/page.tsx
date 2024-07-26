"use client"

import FilePreview from "@/components/FilePreview";
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { useEffect, useState } from "react";
import { UploadProgress } from "../types/types";

export default function EditData() {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    useEffect(() => {
        // Retrieve data from sessionStorage
        const data = sessionStorage.getItem('uploadedFiles');
        if (data) {
          setUploadedFiles(JSON.parse(data));
        }
        sessionStorage.removeItem('uploadedFiles');
    }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className=" flex border-2 rounded-lg w-3/4 h-3/4">
      {/* Where photos will be clickable to adjust metadata */}
      {/* They should be retrieved from the cloudinary storage, only ones that match the uploaded files ideally. Transfer state of uploaded here */}
        <ScrollArea className="border-r-2 w-1/3 h-full">
        {uploadedFiles.map((fileInfo: UploadProgress, index) => (
            <FilePreview key={index} public_id={fileInfo.publicID} file_name={fileInfo.File.path} ></FilePreview>
        ))}
        </ScrollArea>

        {/* Where metadata is actually edited */}
        <div className="py-6"></div>
      </div>
    </div>
  );
}
