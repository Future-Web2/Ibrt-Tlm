import { createBrowserRouter } from 'react-router';
import Root from './components/Root.jsx';
import HomePage from './components/HomePage.jsx';
import CoursePage from './components/CoursePage.jsx';
import LoginPage from './components/LoginPage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'course/:id', Component: CoursePage },
    ],
  },
  {
    path: '/login',
    Component: LoginPage,
  }
]);
