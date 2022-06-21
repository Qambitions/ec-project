import './App.css';
import SignInWindow from './view/SignIn';
import SignUpWindow from './view/SignUp';
import Header from './view/Layout/main';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Header/>}/>
          <Route path="/user/dang-nhap" element={<SignInWindow/>}/>
          <Route path="/user/dang-ky" element={<SignUpWindow/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
