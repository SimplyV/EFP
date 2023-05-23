import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import FeedPage from './pages/FeedPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import GuestRoute from './components/GuestRoute';
import AuthContext from "./contexts/authContext";
import useAuth from "./services/useAuth";

function App() {

  const auth = useAuth();
  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <div className="App">
          <header><NavBar/></header>
          <main>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/profile" element={<PrivateRoute />} >
                <Route exact path="/profile" element={<ProfilePage />} />
              </Route>
              <Route exact path="/feed" element={<FeedPage />} />
              <Route path="/feed/:category" element={<FeedPage />} />
              <Route path="/login" element={<GuestRoute />}>
                <Route exact path="/login" element={<LoginPage />} />
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
