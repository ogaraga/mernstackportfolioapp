import './App.css'
import Register from './component/Register';
import Portfolio from './component/Portfolio';
import { Routes, Route } from 'react-router-dom';
import Login from './component/Login';

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
