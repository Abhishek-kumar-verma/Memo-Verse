import express from 'express';
import { getPosts, getPost , getPostBySearch,createPost , updatePost, deletePost , likePost, commentPost} from '../controllers/posts.js';
import auth from '../middlewares/auth.js';
const router = express.Router();


router.get("/",getPosts);
router.get("/search",getPostBySearch);
router.get('/:id', getPost);

router.post("/createPost",auth, createPost);
router.patch("/:id", auth,updatePost);
router.delete("/:id" ,auth, deletePost);
router.patch('/:id/likePost',auth, likePost);
router.post(`/:id/commentPost`, auth, commentPost)

export default router;