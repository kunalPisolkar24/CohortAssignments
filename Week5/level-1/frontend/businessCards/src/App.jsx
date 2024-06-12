import React from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./components/Login/Login"
import Signup from "./components/Signup/Signup"
import CardList from "./components/CardList/CardList"
import CreateCard from "./components/CreateCard/CreateCard"
import EditCard from "./components/EditCard/EditCard"

function App() {

  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/cards">Card App</Link>

            <ul className="navbar-nav ml-auto">

              <li className="nav-item">
                <Link className="nav-link" to="/cards">Cards</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/signup">Signup</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/create">Create Card (Admin)</Link>
              </li>

            </ul>

          </div>
        </nav>

        <Routes>
          
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path="/create" element={<CreateCard />} />
            <Route path="/edit/:id" element={<EditCard />} />
          </Route>

          <Route element={<ProtectedRoute />}> 
            <Route path="/cards" element={<CardList />} />
          </Route>

        </Routes>
      </div>

    </BrowserRouter>
  )
}

export default App
