import './App.css';
import SignInWindow from './pages/SignIn';
import SignUpWindow from './pages/SignUp';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Cart from './pages/Cart';
import ErrorPage from './pages/Error';
import Pages from './pages';

function App() {
  return (
    <div className="App">
        <Pages/>
    </div>
  );
}

export default App;
