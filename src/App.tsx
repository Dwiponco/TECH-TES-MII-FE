import './App.css'
import { AuthContextProvider } from './store/auth'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { LayoutDashboard } from './components/layout/layout-dashboard';
import { AuthenticationPage } from './app/login';
import { NotFound } from './app/404/404.view';
import DashboardPage from './app/dashboard/dahsboard.view';
import MasterDataView from './app/master-data/master-data.view';

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <LayoutDashboard />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/dashboard/home",
        element: <DashboardPage />,
      },
      {
        path: "/dashboard/master-data",
        element: <MasterDataView />,
      }
    ],
  },
  {
    path: "/",
    element: <AuthenticationPage />,
    errorElement: <NotFound />,
  }
]);

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  )
}

export default App
