import toast  from "react-hot-toast";
import { usePosts } from "../context/postContext";
import { useNavigate } from "react-router-dom";


export function PostCard({ post }) {

  const { deletePost }= usePosts()
  const navigate = useNavigate()

  const handleDelete = (id) => {
    toast((t) => (
      <div>
        <p className="text-white">Do you want to delete this post? <strong>{id}</strong></p>
        <div>
          <button className="bg-red-500 hover:bg-red-400 text-sm px-3 py-2 text-white mx-2 rounded-sm" onClick={() => {
            deletePost(id)
            toast.dismiss(t.id)
          }}>Delete</button>



          <button className="bg-slate-500 hover:bg-slate-400 px-3 py-2 text-white rounded-sm mx-2" onClick={() => toast.dismiss(t.id)}>Cancel</button>
        </div>
      </div>
    ),{
      style:{
        background: "#202020"
      }
    } )
  }
  return (
    <div className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-700 hover: cursor-pointer"
    onClick={() => navigate(`/posts/${post._id}`)}>




      
      <div className="px-4 py-6">
        <div className="flex justify-between">
          <h3>{post.title}</h3>
          <button className="bg-red-600 hover:bg-red-500 rounded-sm px-2 py-1 text-sm" onClick={ (e) => {
            e.stopPropagation()
            handleDelete(post._id)}}>
            Delete
          </button>
          
        </div>
        <p>{post.description}</p>
        </div>
          
        {post.image && <img src={post.image.url} className="w-full h-96 object-cover " />}

    </div>
  );
}
