import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {routes} from './routes/index'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HeaderSearchComponent from './components/HeaderSearchComponent/HeaderSearchComponent';
import Layout from './components/Layout/Layout';

function App() {
  return(
    <Router>
      <Routes>
        {routes.map((route)=>{
          const Page = route.page
          return(
            <Route key={route.path} path={route.path} element = {
              <Layout>
               <Page />
              </Layout>
            }/>
          )
        })}
      </Routes>
    </Router>
  )
}


export default App;