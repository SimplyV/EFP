import { useEffect, useState } from 'react';
import { useAuth } from './../contexts/AuthContext'
import { useApi } from './../contexts/ApiContext';

import Post from './../components/Post';

function DashboardPage() {
  const { currentUser } = useAuth();
  const { api } = useApi();
  const [postsList, setPostsList] = useState([]);
  const [phpMessage, setPhpMessage] = useState();

  const getSecrectMessage = async () => {
    const { data } = await api.get(`posts/author/${currentUser.uid}`);
    setPostsList(data)
  } 

  useEffect(() => {
    getSecrectMessage();
  }, [])

  return(
    <header aria-label="Page Header">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Welcome Back, {currentUser.email}!
            </h1>
          </div>
        </div>
      </div>
      
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8 flex flex-col gap-4">
        {postsList.map((post, i) => (<Post key={i} content={post.content} date={post.created_at} id={post.id} />))}
      </div>
    </header>
  )
}

export default DashboardPage;
