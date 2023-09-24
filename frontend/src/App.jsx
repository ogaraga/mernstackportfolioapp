import './App.css'
import Register from './component/Register.jsx';
import Portfolio from './component/Portfolio.jsx';
import { Routes, Route } from 'react-router-dom';
import Login from './component/Login.jsx';

function App() {

  return (
    <Routes>
      <Route index element = {<Register/>}/>
      <Route path='/portfolio' element ={<Portfolio/>}/>
      <Route path='/login' element = {<Login/>}/>
      
    </Routes>
  )
}

export default App
