import { FileProps } from "@/app/types/types";
import { Progress } from "./ui/progress";
import Image from "next/image";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export default function FilePreview({
  fileName,
  uploadProgress,
  previewImage,
  removeFunction,
}: FileProps) {
  return (
    <div className="flex border rounded-lg justify-between mt-2 animate-fadeIn p-2">
      <div className="relative h-12 w-12 rounded-lg flex-none">
        <Image
          onLoad={() => URL.revokeObjectURL(previewImage)}
          src={previewImage}
          alt={fileName}
          className="rounded-lg object-cover"
          fill={true}
        />
        <Button
          onClick={removeFunction}
          className="absolute w-5 h-5 top-0 right-0 p-0.5 rounded-full -m-1"
          variant="destructive"
        >
          <X size={12} />
        </Button>
      </div>
      <div className="flex-1 ml-2">
        <div className="flex justify-between">
          <p className="truncate w-2/3">{fileName}</p>
          <p>{uploadProgress}%</p>
        </div>
        <Progress value={uploadProgress} className="h-2 mt-3"></Progress>
      </div>
    </div>
  );
}
