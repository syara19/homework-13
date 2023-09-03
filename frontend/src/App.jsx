import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoutes'
import NewBook from './pages/NewBook'
import BookDetails from './pages/BookDetails'
import EditBook from './pages/EditBook'

function App() {
  const isAuthenticated = localStorage.getItem('token') ? true : false;
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/login"} element={<Login />} />
        <Route path="/newbook" element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <NewBook />
          </PrivateRoute>
        }
        />
        <Route path={"/books/:id"} element={<BookDetails />} />
        <Route path={"/editbook/:id"} element={<EditBook />} />
      </Routes>

    </Router>


  )
}

export default App
