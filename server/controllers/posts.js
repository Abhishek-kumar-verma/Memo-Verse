import mongoose from "mongoose";
import PostMessage from "../models/PostMessage.js";

export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 6;
    const startIndex = (Number(page) - 1)*LIMIT //get starting index of given page
    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find().sort({ _id : -1 }).limit(LIMIT).skip(startIndex);
    res.status(200).json({ data : posts , currentPage: Number(page) , numberOfPages:Math.ceil(total/LIMIT)});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => { 
  const { id } = req.params;

  try {
      const post = await PostMessage.findById(id);
      // console.log(post);
      res.status(200).json(post);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}


export const getPostBySearch = async ( req ,res) =>{
  const { searchQuery , tags } = req.query;
  try{
    const title = new RegExp( searchQuery,"i") // ignoring the case -> Test,test ,TEST - sameSearch result
    const posts = await PostMessage.find({ $or:[{title} , {tags:{$in:tags.split(',')}}]});
    res.status(200).json({data:posts});
  }catch(error){
    res.status(404).json({ message: error.message });
  }

}
export const createPost = async (req, res) => {
  const post = req.body;
  console.log(post);
  const newPostMessage = new PostMessage({
    ...post ,creator : req.userId
  });

  try {
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async( req , res) =>{
    try{
        const { id : _id} = req.params;
        const post = req.body;
        if( !mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).send('No post with this id');
        }
        const updatedPost = await PostMessage.findByIdAndUpdate( _id, { ...post , _id},{new: true});
        // console.log(updatedPost);
        res.json(updatedPost);

    }catch(error){
        res.status(404).json({message : error.message});
    }
}

export const deletePost = async( req , res) =>{
  try{
    const {id} = req.params;
    if( !mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).send('No post with this id');
    }
    await PostMessage.findByIdAndRemove(id);
    res.json({message : 'Post deleted sucessfully'});

  }catch(error){
    res.status(404).json({message : error.message});
  }
}
export const likePost= async( req , res) =>{
  const { id } = req.params;

  try{
      if( !req.userId) return res.status(404).json({ message : "Unauthenticated"});
      if( !mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post with this id");
      const post = await PostMessage.findById(id);
      const index = post.likes.findIndex((id) => id === String(req.userId));
      if( index === -1 ){
        // like the post because in likes id's array this user id not exist
        post.likes.push(String(req.userId));
      }else{
        // remove your likes
        post.likes = post.likes.filter((id) => id !== String(req.userId))
      }
      const updatedPost = await PostMessage.findByIdAndUpdate( id, post,{new: true});
      // console.log(updatedPost);
      res.json(updatedPost);

  }catch(error){
      res.status(404).json({message : error.message});
  }
}
export const commentPost = async( req , res) =>{
  const { id} = req.params;
  const { value } = req.body;
  try{
    const post = await PostMessage.findById(id);
    post.comments.push(value);
    const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new : true});
    res.json(updatedPost);
  }catch(error){
    res.status(404).json({message : error.message});
  }
}