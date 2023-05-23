import { useState, useEffect } from 'react'
import { useApi } from './../contexts/ApiContext';
import Post from './../components/Post';
import { Link } from 'react-router-dom';
import { useScroll } from '../contexts/ScrollContext';

const PostsPage = () => {
  const { api } = useApi();
  const { isScrollReachEnd } = useScroll();
  const [isPostsLoading, setIsPostsLoading] = useState(true)
  const [postsList, setPostslist] = useState([]);
  const [page, setPage] = useState(1);

  const getPosts = async (toPage = 1) => {
    setIsPostsLoading(true)
    const { data } = await api.get(`posts/?page=${toPage}`);
    setPage(data.page);
    setPostslist([...postsList, ...data.results])
    setIsPostsLoading(false)
  } 

  useEffect(() => {
    if(isScrollReachEnd && !isPostsLoading){
      getPosts(page+1);
    }
  }, [isScrollReachEnd]);

  useEffect(() => {
    getPosts()
  }, [])

  return <>
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
      {isPostsLoading ? 'loading...' : (<ul className='flex-col flex gap-4'>
        {postsList.map((post, i) => (<li key={i}>
          {i}
          <Link to={"/single/"+post.id}>
            <Post content={post.content} date={post.created_at} id={post.id} authorId={post.author_id} />
          </Link>
        </li>))}
      </ul>)}
    </div>
  </>
}

export default PostsPage