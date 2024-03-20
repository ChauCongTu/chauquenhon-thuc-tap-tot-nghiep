import { Toaster } from 'react-hot-toast';
import './App.css';
import { AuthProvider } from './providers/AuthProvider';
import { RouterProvider } from "react-router-dom";
import { router } from './routes/config';

const App = () => {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <div>
        <Toaster />
      </div>
    </>
  )
}

export default App;
