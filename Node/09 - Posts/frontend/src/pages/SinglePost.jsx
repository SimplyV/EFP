import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useApi } from "../contexts/ApiContext";
import { useEffect, useState } from "react";

const SinglePost = () => {

  const { currentUser } = useAuth();
  const { id } = useParams();
  const { api } = useApi();
  const [post, setPost] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState('');

  const getPostData = async () => { 
    const { data } = await api.get(`posts/${id}`);
    setPost(data)
  }

  const getCommentsPost = async () => {
    const { data } = await api.get(`comments/post/${id}/`);
    setComments([data])
    
  }

  const sendComment = (e) => {
    e.preventDefault();
    api.post('comments', {
      post_id: id,
      content: comment,
      author_id: currentUser.author_id
    })
    .then((res) => {
      if(res.status === 201){
        let newComments = comments;
        newComments[0].push({id: res.data.id, content: comment})
        setComments(newComments)
        setComment('');
      }
    })
  }

  useEffect(() => {
    getPostData();
    getCommentsPost();
  }, []);

  return(
    <div className="mx-auto px-6">
      <header>
        <h1 className="text-2xl font-bold"> {post.title} </h1>
        <p> {post.content} </p>
      </header>
      {currentUser !== null ? 
        <section className="mt-16">
          <form onSubmit={sendComment}>
            <textarea
              onChange={(e) => setComment(e.target.value)}
              defaultValue={comment}
              className="border-indigo-600 border-2 rounded w-96 h-32 p-2"
            ></textarea>
            <button className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"> Send my commentaire </button>
          </form>
        </section>
      : ''}
      <div className="mt-8">
        <h2 className="font-bold text-lg underline-indigo-600"> Commentaires. </h2>
        {comments[0]?.map((c, i) => {
          return (<p key={i}> {c.content}</p>);
        })}
      </div>
    </div>
  );



}

export default SinglePost;