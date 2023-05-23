import { useEffect, useState } from "react";
import { useApi } from "../contexts/ApiContext";
import { useParams } from "react-router-dom";

const PostForm = (props) => {

  const { api } = useApi();
  const { id:postId } = useParams()
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(!['post', 'put'].includes(props.method)){
     return;
    } 

    api[props.method]?.(`posts${props.method === 'put' ? `/${postId}`: ''}`, {
      title: title,
      content: content
    })
    .then((res) => {
      if(res.status === 201){
        navigate('/single/'+res.data.id)
      }
    })

  }

  useEffect(() => {
    if(props.title !=='' ) setTitle(props.title);
    if(props.content !=='' ) setContent(props.content);
  }, [props]);


  return(
    <form action="" className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={handleSubmit}>
    <div>
      <label htmlFor="title" className="sr-only">Titre</label>

      <div className="relative">
        <input
          type="text"
          className="w-full rounded-lg border-black-800 border-2 p-4 pe-12 text-sm shadow-sm"
          placeholder="Entrez le titre de votre post"
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />

      </div>
    </div>

    <div>
      <label htmlFor="content" className="sr-only">Contenu</label>

      <div className="relative">
        <textarea
          className="w-full rounded-lg border-black-800 border-2 p-4 pe-12 text-sm shadow-sm h-32"
          placeholder="Entrez le contenu de l'article"
          onChange={(e) => setContent(e.target.value)}
          defaultValue={content}
        />
      </div>
    </div>

    <div className="flex items-center justify-end">
      <button
        type="submit"
        className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
      >
        Créer
      </button>
    </div>
  </form>
  );
}

export default PostForm;