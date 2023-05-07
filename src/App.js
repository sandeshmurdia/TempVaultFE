import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import FileCreate from './components/FileCreate';
import Retrieve from './components/Retrieve';
import Mainpage from './components/Mainpage.tsx';
const App = () => {
  return (
    <div>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path='/app' element={< FileCreate />}></Route>
            <Route exact path='/' element={<Mainpage/>}></Route>
            <Route exact path='/:id' element={< Retrieve />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App;