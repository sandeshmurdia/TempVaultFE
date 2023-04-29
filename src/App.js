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
            <Route exact path='/senddata' element={< FileCreate />}></Route>
            <Route exact path='/' element={<Mainpage/>}></Route>
            <Route exact path='/download/text/:id' element={< Retrieve />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App;