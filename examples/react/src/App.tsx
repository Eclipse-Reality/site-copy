import {Routes,Route} from 'react-router-dom';
import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";

export const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='home' element={<Home/>}/>
      <Route path='catalog' element={<Catalog/>}/>
    </Routes>
  )
}