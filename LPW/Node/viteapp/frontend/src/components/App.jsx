import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoutes from './../guards/PrivateRoutes';

import LoginPage from './../pages/LoginPage';
import DashboardPage from './../pages/DashboardPage';

function App(){
  return(
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<LoginPage />} path="/login"/>
          <Route element={<PrivateRoutes />}>
            <Route element={<DashboardPage />} path="/" exact />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;