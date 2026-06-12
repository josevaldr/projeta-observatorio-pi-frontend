import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import { RouterProvider } from 'react-router-dom';

import { router } from './routes';

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}