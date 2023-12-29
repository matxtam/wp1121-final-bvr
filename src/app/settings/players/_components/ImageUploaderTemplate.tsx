// import React, { useState } from 'react';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// const ImageUploader: React.FC = () => {
//   const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const selectedFile = e.target.files[0];

//       const reader = new FileReader();

//       reader.onloadend = () => {
//         // 'result' contains the data URL representing the file's data
//         const imageDataURL = reader.result;
//         // setEditPlayerphoto(imageDataURL as string);
//         setPreviewImage(imageDataURL);
//       };

//       reader.readAsDataURL(selectedFile);
//     }
//   };

//   //setPreviewImage(null);

//   return (
//     <div className="grid grid-cols-2 gap-20">
//         <div>
//             <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//             />
//         </div>
//         <div>
//             {previewImage && (
//                 <Avatar>
//                     <AvatarImage src={previewImage as string} alt="Preview" />
//                     <AvatarFallback>CN</AvatarFallback>
//                 </Avatar>
//             )}
//         </div>
//     </div>
//   );
// };

// export default ImageUploader;
