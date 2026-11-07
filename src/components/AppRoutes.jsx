import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Route, Routes, useLocation } from "react-router-dom"
import { fetchProjects } from "../redux/projects.slice"
import { fetchTasks } from "../redux/tasks.slice"
import AddProject from "./AddProject.jsx"
import ShowProjects from "./ShowProjects.jsx"
import Login from "./Login.jsx"
import ProjectDetails from "./ProjectDetails.jsx"
import Navbar from "./Navbar.jsx"



const AppRoutes = () => {
  const dispatch = useDispatch()
  const location = useLocation();

  // load the data from the server once, when the app starts
  useEffect(() => {
    dispatch(fetchProjects())
    dispatch(fetchTasks())
  }, [dispatch])

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