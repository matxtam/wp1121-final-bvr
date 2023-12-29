// "use client";
// import { useState } from "react";
// const photo = document.querySelector("#photo")
// const UploadPhoto = () => {
//   const [file, setFile] = useState<File | null>(null);
//   if (!photo) {
//     return;
//   }
//   const UploadPhoto = photo.files[0];
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files && e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//     }
//   };

//   console.log('file', file);
//   const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
//     const reader = new FileReader();
//             reader.onload = async function (e) {
//               const photo = e.target?.result;
//               try {
//                 console.log('photo', photo);
//                 } catch (error) {
//                   console.log(error);
//                 }
//             }    
//             reader.readAsDataURL(file);
//     }

//   return (
//     <>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         id="photo"
//         name="photo"
//       />
//     </>
//   );
//   };
  
//   export default UploadPhoto;