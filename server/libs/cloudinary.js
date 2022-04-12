import {v2 as cloudinary} from "cloudinary";

cloudinary.config({ 
  cloud_name: 'dk305buid', 
  api_key: '555396426264181', 
  api_secret: '7pL9QLlqaJs28W-XlZywTe_c1OE' 
});


export const uploadImage = async filePath =>{
  return await cloudinary.uploader.upload(filePath, {
    folder: 'posts'
  })
}

export const deleteImage = async id => {
  return await cloudinary.uploader.destroy(id)
}