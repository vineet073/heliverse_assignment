import { Navigate, Route,Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import NavBar from "./components/Common/NavBar";
import Login from "./pages/Login";
import RestrictedRoute from "./components/Common/RestrictedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";
import Instructor from './components/Core/Dashboard/Instructor'
import AllInstructors from "./pages/AllInstructors";
import EditDetails from "./components/Core/Settings/EditDetails";
import AllStudents from "./pages/AllStudents";
import MyProfile from "./components/Core/Profile/MyProfile";
import Classroom from "./pages/Classroom";
import Classmates from "./components/Core/Classmates";
import TimeTable from "./components/Core/TimeTable";

function App() {

  const{token}=useSelector((state)=>state.auth)
  return (
    <div className="w-full min-h-screen bg-richblack-900 flex flex-col font-inter">
      <NavBar/>
      
      <Routes>
        <Route path="/" element={<Home/>}/>

        <Route path="/login" element={!token ? <Login/> : <Navigate to="/dashboard/my-profile" replace />}/>
        <Route path="/forgot-password" element={!token ? <ForgotPassword/> : <Navigate to="/dashboard/my-profile" replace />}/>
        <Route path="/update-password/:id" element={!token ? <ResetPassword/> : <Navigate to="/dashboard/my-profile" replace />}/>   


        <Route element={
          <RestrictedRoute>
            <Dashboard/>
          </RestrictedRoute>
        }>

          <Route path="dashboard/my-profile" element={<MyProfile/>} />
          <Route path="dashboard/classroom" element={<Classroom/>} />
          <Route path="dashboard/manage_instructors" element={<AllInstructors />}/>
          <Route path="dashboard/manage_students" element={< AllStudents/>}/>
          <Route path="dashboard/edit-instructor/:id" element={<EditDetails/>}/>           
          <Route path="dashboard/classmates" element={<Classmates/>}/>          
          <Route path="dashboard/instructor" element={<Instructor />} />
          <Route path="dashboard/timetable" element={<TimeTable/>} />
          
        </Route>



      </Routes>

    </div>
  );
}

export default App;
