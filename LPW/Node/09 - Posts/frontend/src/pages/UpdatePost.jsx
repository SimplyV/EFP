import PostForm from '../components/PostForm';
import { useOutletContext } from 'react-router-dom';

function UpdatePost() {
  const [post] = useOutletContext()

  return(
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Mettre à jour mon post</h1>
        </div>

        <PostForm method="put" title={post.title} content={post.content} />
      
      </div>
    </div>
  );
}


export default UpdatePost;