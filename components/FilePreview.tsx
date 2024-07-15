import { FileProps } from "@/app/types/types";
import { Progress } from "./ui/progress";
import Image from "next/image";

export default function FilePreview({ fileName, uploadProgress, previewImage }: FileProps) {
    return (
        <div className={"flex border rounded-lg justify-between mt-2 animate-fadeIn mr-4"}>
            <div className="flex flex-1 p-2">
                <div className="relative h-12 w-12 rounded-lg flex-none">
                    <Image src={previewImage} alt={fileName} className="rounded-lg object-cover" fill={true}/>
                </div>
                <div className="w-full ml-2 space-y-1">
                    <div className="flex justify-between">
                        <p>{fileName}</p>
                        <p>{uploadProgress}%</p>
                    </div>
                    <Progress value={uploadProgress} className="h-2"></Progress>
                </div>
            </div>
        </div>
        
    )
}