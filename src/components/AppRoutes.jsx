import { Route, Routes, useLocation } from "react-router-dom"
import AddProject from "./AddProject.jsx"
import ShowProjects from "./ShowProjects.jsx"
import Login from "./Login.jsx"
import ProjectDetails from "./ProjectDetails.jsx"
import Navbar from "./Navbar.jsx"



const AppRoutes = () => {
  const location = useLocation();
  const showNav = location.pathname !== '/';

  return (
    <>
      {showNav && <Navbar />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/new-project' element={<AddProject />} />
        <Route path='/show-projects' element={<ShowProjects />} />
        <Route path='/show-projects/:id' element={<ProjectDetails />} />
      </Routes>
    </>
  )
}

export default AppRoutes