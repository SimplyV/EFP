import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppContextProviders from '../contexts/AppContextProvider';
import { AuthProvider } from '../contexts/AuthContext';
import { ApiProvider } from '../contexts/ApiContext';
import { ScrollProvider } from '../contexts/ScrollContext';

import PrivateRoute from './../routes/PrivateRoutes';
import PrivatePostRoutes from '../routes/PrivatePostRoutes';

import LoginPage from './../pages/LoginPage';
import Dashboard from './../pages/Dashboard';
import SinglePost from '../pages/SinglePost';
import PostsPage from './../pages/PostsPage';
import CreatePost from '../pages/CreatePost';
import UpdatePost from '../pages/UpdatePost';
import Unauthorized from '../pages/Unauthorized';

import NavBar from './NavBar';

function App() {
  const providers = [AuthProvider, ApiProvider, ScrollProvider];

  return (
    <AppContextProviders components={providers}>
      <Router>
        <NavBar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Dashboard/>} path="/" />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/single/:id" element={<SinglePost />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route element={<PrivatePostRoutes />} >
            <Route path="/update-post/:id" element={<UpdatePost />} />
          </Route>
          
        </Routes>
      </Router>
    </AppContextProviders>
  )
}

export default App
