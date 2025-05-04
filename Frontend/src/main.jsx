import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Pages/HomePage/Home.jsx';
import Login from "./Pages/Auth/Login.jsx"
import Signup from "./Pages/Auth/Signup.jsx"
import { store } from './Store/store.js'
import { Provider } from 'react-redux'
import PrivateRoutes from './Pages/PrivateRoutes/PrivateRoutes.jsx';
const route = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoutes><Home /></PrivateRoutes>,
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />
  }

])

createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <RouterProvider router={route} />
      <App />
    </Provider>
  </>

)
