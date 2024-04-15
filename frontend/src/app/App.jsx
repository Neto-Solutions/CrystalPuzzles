import './App.scss';
import { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom'
import createRouter from '../routes';
import { useSelector } from 'react-redux';

export default function App() {
  const role = useSelector(state => state.user.role)

  const router = useMemo(() => {
    return (
      createRouter(role)
    )
  }, [role]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>

  )
}
