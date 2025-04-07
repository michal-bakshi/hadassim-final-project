import logo from './logo.svg';
import './App.css';
import { Login } from './components/login';
import { BrowserRouter } from 'react-router-dom';
import { Routing } from './components/routing';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import { NavBar } from './components/navBar';
import { useEffect } from 'react';



function App() {
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.removeItem("user");
      console.log("💨 נמחק מה-localStorage");
    }, 60 * 60 * 1000); 
    return () => clearInterval(interval);
  }, [])
  return (
    <Provider store={store}>
    <BrowserRouter>
    <div className="App">
      
      <NavBar></NavBar>
  <Routing></Routing>
  </div>
  </BrowserRouter>
  </Provider> 
  );
}

export default App;
