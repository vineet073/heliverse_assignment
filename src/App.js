import { Navigate, Route,Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import NavBar from "./components/Common/NavBar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RestrictedRoute from "./components/Common/RestrictedRoute";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/Core/Profile/MyProfile";
import { ACCOUNT_TYPE } from "./data/constants";
import EnrolledCourses from "./components/Core/EnrolledCourses/EnrolledCourses";
import { useSelector } from "react-redux";
import Instructor from './components/Core/Dashboard/Instructor'
import InstructorCourses from "./components/Core/InstructorCourses/InstructorCourses";
import AddCourses from "./components/Core/AddCourse/AddCourses";
import Settings from "./components/Core/Settings/Settings";
import EditCourse from "./components/Core/EditCourse/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/Core/ViewCourse/VideoDetails";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import AllInstructors from "./pages/AllInstructors";
import ChatBot from "./components/Core/Chatbot/Chatbot";


function App() {
  const{user}=useSelector((state)=>state.profile)
  const{token}=useSelector((state)=>state.auth)
  return (
    <div className="w-full min-h-screen bg-richblack-900 flex flex-col font-inter">
      <NavBar/>
      
      <Routes>
        <Route path="/" element={<Home/>}/>

        <Route path="/login" element={!token ? <Login/> : <Navigate to="/dashboard/my-profile" replace />}/>
        <Route path="/signup" element={!token ? <Signup/> : <Navigate to="/dashboard/my-profile" replace />}/>
        <Route path="/verify-email" element={!token ? <VerifyEmail/> : <Navigate to="/dashboard/my-profile" replace />}/>
        <Route path="/forgot-password" element={!token ? <ForgotPassword/> : <Navigate to="/dashboard/my-profile" replace />}/>
        <Route path="/update-password/:id" element={!token ? <ResetPassword/> : <Navigate to="/dashboard/my-profile" replace />}/>   

        <Route path="/catalog/:catalogName" element={<Catalog/>}/>
        <Route path="/courses/:courseID" element={<CourseDetails/>}/>

        <Route element={
          <RestrictedRoute>
            <Dashboard/>
          </RestrictedRoute>
        }>
          <Route path="dashboard/my-profile" element={<MyProfile/>}/>
          <Route path="dashboard/settings" element={<Settings/>}/>

          <Route path="dashboard/category" element={<Category />} />
          <Route path="dashboard/manage_instructors" element={<AllInstructors />}/>

          <Route path="dashboard/cart" element={<Cart/>} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />

          
          <Route path="dashboard/instructor" element={<Instructor />} />
          <Route path="dashboard/my-courses" element={<InstructorCourses/>} />
          <Route path="dashboard/add-course" element={<AddCourses />} />      
          <Route path="dashboard/edit-course/:courseID" element={<EditCourse/>}/> 

        </Route>

        <Route element={<RestrictedRoute><ViewCourse/></RestrictedRoute>}>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT &&(
              <Route
                path="view-course/:courseID/section/:sectionID/sub-section/:subSectionID"
                element={<VideoDetails/>}
              />
            )
          }
        </Route>        

        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/contact" element={<ContactUs/>}/>

      </Routes>

    </div>
  );
}

export default App;
