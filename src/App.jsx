
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import SinglePost from './Countries'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/countries/:id',
      element: <SinglePost />
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App