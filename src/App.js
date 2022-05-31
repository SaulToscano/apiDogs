import { Route, Routes } from 'react-router-dom';

import Nav from './components/Nav';
import Home from './components/Home';
import List from './components/List';
import Details from './components/Details';
import Creation from './components/Creation';

import './App.css';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/apiDogs' element={<Home/>}/>
        <Route path='/apiDogs/Dog_List' element={<List/>}/>
        <Route path='/apiDogs/Dog_List/:id' element={<Details/>}/>
        <Route path='/apiDogs/Create_Dog' element={<Creation/>}/>
      </Routes>
    </div>
  );
}

export default App;
