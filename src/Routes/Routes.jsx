import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import CourseDetails from "../Pages/CourseDetails/CourseDetails";
import AllCourseCategories from "../Pages/AllCourseCategories/AllCourseCategories";
import SignIn from "../Pages/Authentication/SignIn/SignIn";
import SignUp from "../Pages/Authentication/SignUp/SignUp";
import Instructors from "../Pages/Instructors/Instructors/Instructors";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/courseDetails", // Define the path with parameters
        element: <CourseDetails ></CourseDetails>,
      },
      {
        path: "/courseCategories", // Define the path with parameters
        element: <AllCourseCategories></AllCourseCategories>,
      },
      {
        path: "/instructor",
        element: <Instructors></Instructors>
      },
      {
        path: "login",
        element:<SignIn></SignIn>
      },
      {
        path:"signup",
        element: <SignUp></SignUp>
      }
    ],
  },
]);

export default router;
