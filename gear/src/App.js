import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {routes} from './route/index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HeaderSearchComponent from './components/HeaderSearchComponent/HeaderSearchComponent';

const queryClient = new QueryClient();
function App() {
  return(
    <QueryClientProvider client={queryClient}>
    <Router>
    <HeaderSearchComponent />
      <Routes>
        {routes.map((route)=>{
          const Page = route.page
          return(
            <Route path={route.path} element = {<Page/>}/>
          )
        })}
      </Routes>
    </Router>
    </QueryClientProvider>
  )
}

export default App