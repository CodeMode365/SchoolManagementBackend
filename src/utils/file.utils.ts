import ImageKit from 'imagekit';
import { vars } from '@/config';

const ik = vars.ik;

const imagekit = new ImageKit({
  publicKey: ik.public_key,
  privateKey: ik.private_key,
  urlEndpoint: ik.url,
});

const uploadToImageKit = async (file: any, fileName: string) => {
  const d = await imagekit.upload({
    file,
    fileName,
    useUniqueFileName: true,
  });
  return d;
};

const generateThumbnailUrl = (path: string) => {
  const url = imagekit.url({
    path,
    transformation: [
      {
        height: ik.tn_height,
        width: ik.tn_width,
      },
    ],
  });
  return url;
};

const deleteFromImageKit = async (fileId: string) => {
  const res = await imagekit.deleteFile(fileId);
  return res;
};

export default { uploadToImageKit, generateThumbnailUrl, deleteFromImageKit };

// const cloudinary = require("cloudinary").v2;
// const { cloudinary: cd } = require("../config/vars.config");
// const bufferToReadableStream = require("./buffer.util");

// cloudinary.config({
//     cloud_name: cd.name,
//     api_key: cd.api_key,
//     api_secret: cd.api_secret,
// });

// const uploadImageToCloudinary = async (path) => {
//     try {
//         const result = await cloudinary.uploader.upload(path, {
//             folder: cd.upload_folder,
//         });
//         return result.secure_url; // Return the URL of the uploaded image
//     } catch (error) {
//         return null;
//     }
// };

// const uploadStreamToCloudinary = async (file) => {
//     return new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//             { folder: cd.upload_folder },
//             (error, result) => {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve(result);
//                 }
//             }
//         );
//         bufferToReadableStream(file).pipe(uploadStream);
//     });
// }

// module.exports = { uploadImageToCloudinary, uploadStreamToCloudinary };
