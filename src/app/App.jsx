import { RouterProvider } from 'react-router';
import { router } from './routes.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}
