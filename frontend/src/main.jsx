import React from 'react'
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import HomePage from './pages/Homepage.jsx';
import CpuPage from './pages/CpuPage.jsx';
import CpuDetailPage from './pages/CpuDetailPage.jsx';
import ComparePage from './pages/ComparePage.jsx';
import GpuPage from './pages/GpuPage.jsx';
import GpuDetailPage from'./pages/GpuDetailPage.jsx';
import LaptopPage from'./pages/LaptopPage.jsx';
import LaptopDetailPage from'./pages/LaptopDetailPage.jsx';
import TelephonePage from './pages/TelephonePage.jsx';
import TelephoneDetailPage from './pages/TelephoneDetailPage.jsx';
import AdminPage from './pages/AdminPage.jsx';


import'./index.css';

const router= createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children:[

      {
        path: "/admin",
        element: <AdminPage />,
      },
      
      {
        path:"/",
        element:<HomePage/>,
      },
      {
        path: "/cpus",
        element:<CpuPage/>,

      },
      {path:"/gpus",
        element:<GpuPage/>,
      },
      {path:"/laptops",
        element:<LaptopPage/>,
      },
       {
        path:"/telephones",
        element:<TelephonePage/>,
      },
      
      {
        path:"/cpu/:id",
        element:<CpuDetailPage/>,
      },
      {
        path:"/gpu/:id",
        element:<GpuDetailPage/>,
      },
      {path:"/laptop/:id",
        element:<LaptopDetailPage/>,
      },
      { path: "/telephone/:id", 
        element: <TelephoneDetailPage /> 
      }, 
      
      {
        path:'/compare',
        element:<ComparePage/>,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
