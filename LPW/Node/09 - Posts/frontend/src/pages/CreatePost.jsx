import { useEffect, useState, useContext } from 'react';
import { useAuth } from './../contexts/AuthContext'
import { useApi } from './../contexts/ApiContext';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';

function CreatePost() {
  const { api } = useApi();
  const navigate = useNavigate();

  return(
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Créer un nouveau post</h1>
        </div>

        <PostForm method="post"/>
      
      </div>
    </div>
  );
}


export default CreatePost;