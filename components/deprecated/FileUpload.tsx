// "use client"

// import PreviousMap from "postcss/lib/previous-map";
// import { useCallback, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import Image from 'next/image'
// import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
// import { Button } from "./ui/button";
// import { X } from  "lucide-react";
// import { Alert } from "./ui/alert";

// // For fixing an annoying typescript error that does nothing but annoy me.
// interface PrevFile extends File {
//     preview: string
// }

// export default function FileUpload() {
//     const [files, setFiles] = useState<PrevFile[]>([])
//     const [rejectedFiles, setRejectedFiles] = useState<PrevFile[]>([])

//     const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any) => { // will fix rejectedfiles being typed as "any", temp fix for testing rn
//         if (acceptedFiles?.length) {
//             setFiles((previousFiles) => [
//                 ...previousFiles,
//                 ...acceptedFiles.map((file: File) =>
//                     Object.assign(file, { preview: URL.createObjectURL(file) })
//                 )
//             ])
//         }
    
//         if (rejectedFiles?.length) {
//             setRejectedFiles(previousFiles => [...previousFiles, ...rejectedFiles])
//         }
//     }, [])

//     const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
//         onDrop,
//         accept: {
//             "image/*": []
//         },
//         maxSize: 10240000 // 10 mb 
//     })

//     const removeFile = (fileName: string) => {
//         setFiles(files => files.filter(file => file.name !== fileName))
//     }

//     return (
//         <form>
//             <div {...getRootProps({})}>
//                 <input {...getInputProps()} />
//                 <Card className={isDragActive ? "h-52 w-80 bg-accent text-accent-foreground transition-colors" : "h-52 w-80 transition:colors hover:bg-accent hover:text-accent-foreground"}>
//                     <CardHeader>
//                         <CardTitle>
//                             Upload some images
//                         </CardTitle>
//                             {isDragActive ? <CardDescription>Drop the files here..."</CardDescription> : <CardDescription>Drag and drop some files here, or click to select them</CardDescription>}
//                     </CardHeader>
//                 </Card>
//             </div>
//             <Card>
//                 <CardHeader>
//                     <CardTitle>
//                         Image(s) previews
//                     </CardTitle>
//                     {files?.length ? <CardDescription>Here are your images:</CardDescription> : <CardDescription>Upload some images to preview them!</CardDescription>}
//                 </CardHeader>
//                 <ul>
//                     {files.map(file => (
//                         <li key={file.name}>
//                             <div className="relative w-[100px]">
//                             <Image
//                                 src={file.preview}
//                                 alt={file.name}
//                                 width={100}
//                                 height={100}
//                                 onLoad={() => {
//                                     URL.revokeObjectURL(file.preview)
//                                 }}
//                                 className="rounded-lg"
//                             />
//                             <Button className="hover:bg-destructive hover:text-destructive-foreground right-0 top-0 absolute" onClick={() => removeFile(file.name)}>
//                               <X />
//                             </Button>
//                             </div>
//                             <p>{file.name}</p>
//                         </li>
//                     ))}
//                 </ul>

//                 {rejectedFiles?.length ? 
//                 <div>
//                 <Alert variant="destructive">The following files could not be uploaded (file size limit 10mb and images only)</Alert>
//                 <ul>
//                     {rejectedFiles.map(({file, errors}) => (
//                         <li key={file.name}><p>{file.name}</p></li>
//                     ))} 
//                 </ul></div> : 
//                 null }
//             </Card>
//         </form>
//     )
// }

// // ring-2 ring-ring ring-offset-2