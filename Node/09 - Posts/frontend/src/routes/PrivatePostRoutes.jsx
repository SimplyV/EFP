import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './../contexts/AuthContext'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApi } from '../contexts/ApiContext';

export default function PrivatePostRoutes() {
  const { currentUser } = useAuth();
  const { api } = useApi();
  const { id } = useParams();
  const [isAllowed, setIsAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState({});
  console.log(currentUser.uid);

  const getPostData = async() => {
    setIsLoading(true);
    await api.get('/posts/'+id).then((response) => {
      if(response.status === 200 || response.status === 201){
        setIsAllowed(response.data.author_id === currentUser.uid);
        setPost(response.data);
      }
    })
    setIsLoading(false);
  }

  useEffect(() => {
    getPostData();
  }, [])

  if(isLoading) return null;

  // return currentUser ? (<Outlet />) : 
  return  isAllowed  ? (<Outlet context={[post, setPost]}/>) : (<Navigate to="/unauthorized" />)
}
