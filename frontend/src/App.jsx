import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoutes'
import NewBook from './pages/NewBook'

function App() {
  const isAuthenticated = localStorage.getItem('token') ? true : false;
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/register"} element={<Register />} />
        <Route
          path="/newbook"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <NewBook />
            </PrivateRoute>
          }
        />
        <Route path={"/login"} element={<Login />} />

      </Routes>

    </Router>


  )
}

export default App
