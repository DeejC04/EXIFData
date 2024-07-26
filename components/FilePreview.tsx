// Shows similar info to UploadPreview, but this is for the scrollarea where files are clicked and metadata is adjusted

import { CldImage } from "next-cloudinary";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export default function FilePreview({
  key,
  public_id,
  file_name
}: {
  key: number;
  public_id: string;
  file_name: any
}) {
  return (
    <div className="flex border-b-2 justify-between p-2">
      <div className="relative h-16 w-16 rounded-lg flex-none">
        <CldImage
          fill={true}
          src={public_id}
          sizes="100vw"
          alt="Description of my image"
        />
        <Button
          className="absolute w-5 h-5 top-0 right-0 p-0.5 rounded-full -m-1"
          variant="destructive">
          <X size={12} />
        </Button>
      </div>
      {file_name}
    </div>
  );
}
