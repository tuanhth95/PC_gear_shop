import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {routes} from './route/index'
function App() {
  return(
    <Router>
      <Routes>
        {routes.map((route)=>{
          const Page = route.page
          return(
            <Route path={route.path} element = {<Page/>}/>
          )
        })}
      </Routes>
    </Router>
  )
}

export default App