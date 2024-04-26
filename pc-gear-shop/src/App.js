import axios from 'axios';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {routes} from './routes'; 
import DefaultComponent from './components/Layout/Layout';
import { useQuery } from '@tanstack/react-query';
import HeaderSearchComponent from './components/HeaderSearchComponent/HeaderSearchComponent';

function App() {
  // useEffect(() => {
  //   fetchApi()
  // },[]);
  const fetchApi = async() => {
    const res = await axios.get(`http://localhost:3001/cart?all=true`)
    return res.data
  }
  const query = useQuery({queryKey: ['todos'], queryFn: fetchApi});
  //console.log('query', query)

  return (
    <div>
      <Router>
      <HeaderSearchComponent />
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
                  <Page/>
                </Layout>
              }/>
            )
          })}
        </Routes>
      </Router>
    </div>
  )
}
export default App;