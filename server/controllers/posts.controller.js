import Post from "../models/Post.js"
import { uploadImage, deleteImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const getPosts = async (req, res) => {
  try {
    //throw new Error('Error getting posts')
    const posts = await Post.find()
    res.send(posts)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

//mostras los datos de la bd
export const createPost = async(req, res) => {
  try {
    const {title, description} = req.body
    let image;

    if (req.files?.image){
      const result = await uploadImage(req.files.image.tempFilePath)
      await fs.remove(req.files.image.tempFilePath)
      image = {
        url: result.secure_url,
        public_id: result.public_id      
      }
      
    }
    const newPost = new Post ({title, description, image })
    await newPost.save()  //método que hace un escrito en la base de batos, por tanto es asíncrono
     return res.json(newPost)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const updatePost = async(req, res) => {
  try {
      const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
      return res.send(updatedPost)
  } catch (error) {
     return res.status(500).json({message: error.message})
  }
}


export const deletePost = async(req, res) => {
  try {
    const postDeleted = await Post.findByIdAndDelete(req.params.id)
    if (!postDeleted) return res.sendStatus(404)

    if (postDeleted.image.public_id){
      await deleteImage (postDeleted.image.public_id)
    }
    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }

}
export const getPost = async(req, res) => {
try {
  const post = await Post.findById(req.params.id)
  if (!post) return res.sendStatus(404)
  return res.json(post)
} catch (error) {
  return res.status(500).json({message: error.message})  
}
}