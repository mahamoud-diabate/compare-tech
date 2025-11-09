import React from 'react'
import ReactDom from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from './App.jsx';
import Homepage from './pages/Homepage.jsx';
import CpuDetailPage from './pages/CpuDetailPage.jsx';
import ComparePage from './pages/ComparePage.jsx';
import GpuPage from './pages/GpuPage.jsx';
import GpuDetailPage from'./pages/GpuDetailPage.jsx';
import LaptopPage from'./pages/LaptopPage.jsx';
import LaptopDetailPage from'./pages/LaptopDetailPage.jsx';
import TelephonePage from './pages/TelephonePage.jsx';
import TelephoneDetailPage from './pages/TelephoneDetailPage.jsx';

import'./index.css';

const router= createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children:[
      {
        path: "/",
        element:<Homepage/>,

      },
      {path:"/gpus",
        element:<GpuPage/>,
      },
      {path:"laptops",
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

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
