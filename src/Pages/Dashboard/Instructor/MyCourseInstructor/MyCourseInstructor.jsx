import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import ChatRequest from "./chatRequest";
const MyCourseInstructor = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [instructorCourses, setInstructorCourses] = useState([]);

  console.log(user?.email);
  useEffect(() => {
    fetch(
      `https://cm-academy-test-server-production.up.railway.app/categories/instructor/${user?.email} `
    )
      .then((response) => response.json())
      .then((data) => {
        setInstructorCourses(data);
      })

      .catch((error) => {
        console.error("Error fetching instructor courses:", error);
      });
  }, [user?.email]);

  const handleDetailsClick = (course) => {
    navigate("/courseDetailsDynamic", { state: { course } });

    console.log(course._id);
  };

  const handleMsgReq = (courseId) => {
    navigate("/dashboard/msg-request", { state: { courseId } });
  };

  console.log(instructorCourses[1]?._id);
  return (
    <div className="border p-4">
      <div className=" my-4 mt-4">
        <h1 className=" text-lg font-bold">My Courses</h1>
        <p className="text-base mb-4">All my courses</p>
        <hr />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {instructorCourses.map((category) => (
          <div
            key={category._id}
            className="card  bg-base-100 shadow-xl  mx-auto"
          >
            <figure>
              <img
                className="h-48 w-full"
                src={category.courseThumbnail}
                alt=""
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title mb-2">
                {category.title} - {category.courseCategory}
                <div className="badge badge-warning">New</div>
              </h2>
              <p className="text-xs tracking-wider">
                Learn the basics of web development, including HTML, CSS, and
                JavaScript.
              </p>
              <div className="flex justify-between mt-2 font-semibold text-sm text-gray-500">
                <h1>Price:tk {category.coursePrice}</h1>
              </div>

              <div className="divider"></div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleDetailsClick(category)}
                  className="btn btn-sm bg-[#edfffc] 
                border-2 border-[#12C29F] text-[#12C29F]
                "
                >
                  Details
                </button>
                <button
                  onClick={() => handleMsgReq(category._id)}
                  className="btn btn-sm bg-[#edfffc] 
                border-2 border-[#12C29F] text-[#12C29F]
                "
                >
                  View Message Request
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourseInstructor;
