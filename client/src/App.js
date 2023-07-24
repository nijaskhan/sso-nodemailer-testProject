import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="1088689129534-i1mqntif6h93conom7klrn5huvkm5m87.apps.googleusercontent.com">
        <BrowserRouter>
          <Routes>
            <Route path={'/login'} element={<Login />} />
            <Route path={'/'} element={<Home />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;