import './App.css';
import SignInWindow from './view/SignIn';
import SignUpWindow from './view/SignUp';
import Header from './view/Layout/main';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Header/>}/>
          <Route path="/user/dang-nhap" element={<SignInWindow/>}/>
          <Route path="/user/dang-ky" element={<SignUpWindow/>}/>
        </Routes>
    </div>
  );
}

export default App;
