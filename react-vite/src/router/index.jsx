import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import GetPin from '../components/GetPin';
import GetAllPins from '../components/GetAllPins/GetAllPins';
import CreatePin from '../components/CreatePin/CreatePin';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1></h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "pin/:pinId",
        element: <GetPin />,
      },
      {
        path: "pin",
        element: <GetAllPins />,
      },
      {
        path: "pin-creation-tool",
        element: <CreatePin />
      }
    ],
  },
]);
