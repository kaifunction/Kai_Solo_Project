import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import GetPin from '../components/GetPin';
import GetAllPins from '../components/GetAllPins/GetAllPins';
import CreatePin from '../components/CreatePin/CreatePin';
import EditPin from '../components/EditPin/EditPin';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage';
import UserProfile from '../components/UserProfile';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
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
      },
      {
        path: "pin/:pinId/edit",
        element: <EditPin />
      },
      {
        path: "current-user",
        element: <UserProfile />,
      },
    ],
  },
]);
