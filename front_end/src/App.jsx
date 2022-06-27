import './App.css';
import SignInWindow from './pages/SignIn';
import SignUpWindow from './pages/SignUp';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Cart from './pages/Cart';
import ErrorPage from './pages/Error';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/user/dang-nhap" element={<SignInWindow/>}/>
          <Route path="/user/dang-ky" element={<SignUpWindow/>}/>
          <Route path="/gio-hang" element={<Cart/>}/>
          <Route path="/error" element={<ErrorPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
