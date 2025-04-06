import React from 'react';
import Sidebar from './components/Slidebar/Slidebar';
import Main from './components/Main/Main';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import{
  createBrowserRouter,
  RouterProvider,
}from "react-router-dom";
import Login from './components/Login/Login';
// import RegisterPage from './components/Registration/Registration';
import HelpPage from './components/Help/Help';
import Registration from './components/Registration/Registration';
import Login_page from './components/Login/Login';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
        <Sidebar/>
        <Main/>
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
        {/* <Sidebar/> */}
        <Login_page/>
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
        {/* <Sidebar/> */}
        <Registration/>
        </>
      ),
    },
    {
      path: "/help",
      element: (
        <>
        {/* <Sidebar/> */}
        <HelpPage/>
        </>
      ),
    },
  ])
  return(
    <RouterProvider router={router}/>
  )
}

export default App