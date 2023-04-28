import { useSitecopy } from "./siteCopyProvider";

import {Routes,Route} from 'react-router-dom';
import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";

export const App = () => {

  const {sitecopy:sitecopyPages, isLoading, error} = useSitecopy();
  
  if(isLoading){return <p>...Loading </p>};
  if(error){return <p>Error getting site copy</p>};

  const {home,catalog} = sitecopyPages;
  return (
    <Routes>
      <Route path='/' element={<Home pageCopy={home} />}/>
      <Route path='home' element={<Home pageCopy={home} />}/>
      <Route path='catalog' element={<Catalog pageCopy={catalog} />}/>
    </Routes>
  )
}